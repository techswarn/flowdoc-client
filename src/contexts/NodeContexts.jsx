import { createContext, useContext, useReducer, useEffect } from "react";
import fetchData from "../../api/fetch";
import useAxios from "../../hooks/useAxios";

const position = { x: 0, y: 0 };

const edgeType = "smoothstep";
const NodeContext = createContext(null);
const NodeDispatchContext = createContext(null);

async function postData(url, data) {
  // Default options are marked with *
  let response = [];

  try {
    response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  } catch (err) {
    console.log("API error" + err);
    return err;
  }

  // parses JSON response into native JavaScript objects
}

async function getData(url) {
  let response = [];

  try {
    response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  } catch (err) {
    console.log("API error" + err);
    return err;
  }
}

export function NodeProvider({ children }) {
  const [state, dispatch] = useReducer(nodeReducer, initialNodes);
  console.log(state);

  useEffect(function () {
    fetch("http://127.0.0.1:3000/api/v1/node")
      .then((res) => res.json())
      .then((data) => {
        const nodeData = [];
        data.Data.map((item) => {
          nodeData.push({
            id: item.id,
            type: item.nodetype,
            data: { label: item.subject },
            style: { border: "1px solid #777" },
            position,
          });
        });
        console.log(nodeData);
        dispatch({ type: "datareceived", payload: nodeData, status: "ready" });
      })
      .catch((err) => console.log(err));
  }, []);

  //DEFINE async actions here

  //Async Action here like GETNDOES, INSERTNODES
  async function addNode(node) {
    console.log("----------Add node-----------");
    console.log(node);
    console.log(node.urls);
    let urls = [];
    node.urls.map((el, id) => {
      if (el.linklabel !== undefined) {
        urls.push(el);
      }
    });
    console.log("----------Add node-----------");

    const data = {
      nodetype: node.nodetype,
      label: node.label,
      source: node.source,
      edgetype: "bezier",
      animated: node.animated,
      heading: node.heading,
      description: node.description,
      error: node.errorSample,
      links: urls,
    };
    dispatch({
      type: "loading",
      status: "loading",
    });

    const res = await postData("http://127.0.0.1:3000/api/v1/node", data);

    if (res?.success === true) {
      //Fetch nodes again and set state
      fetch("http://127.0.0.1:3000/api/v1/node")
        .then((res) => res.json())
        .then((data) => {
          const nodeData = [];
          data.Data.map((item) => {
            nodeData.push({
              id: item.id,
              type: item.nodetype,
              data: { label: item.subject },
              style: { border: "1px solid #777" },
              position,
            });
          });
          console.log(nodeData);
          dispatch({
            type: "insert",
            payload: nodeData,
            status: "ready",
          });
        })
        .catch((err) => console.log(err));
    }
    console.log("add node");
  }
  return (
    <NodeContext.Provider value={{ state, addNode }}>
      <NodeDispatchContext.Provider value={dispatch}>
        {children}
      </NodeDispatchContext.Provider>
    </NodeContext.Provider>
  );
}
export function useNode() {
  return useContext(NodeContext);
}

export function useNodeDispatch() {
  return useContext(NodeDispatchContext);
}

function nodeReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "datareceived": {
      //  return [...action.payload];
      return { ...state, nodes: action.payload, status: "ready" };
    }
    case "insert": {
      return { ...state, nodes: action.payload, status: "ready" };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const initialNodes = { nodes: [], status: "loading" };
