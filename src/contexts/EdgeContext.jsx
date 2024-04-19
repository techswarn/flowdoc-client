import { createContext, useContext, useReducer, useEffect } from "react";
const edgeType = "smoothstep";
const EdgeContext = createContext(null);
const EdgeDispatchContext = createContext(null);

export function EdgeProvider({ children }) {
  const [state, dispatch] = useReducer(edgeReducer, initialEdges);

  useEffect(function () {
    fetch("https://flowdoc-api-bsclg.ondigitalocean.app/api/v1/edge")
      .then((res) => res.json())
      .then((data) => {
        const edgeData = [];
        data.Data.map((item) => {
          edgeData.push({
            id: item.id,
            source: item.source,
            target: item.target,
            type: item.type,
            animated: item.animated,
          });
        });
        dispatch({ type: "datareceived", payload: edgeData, status: "ready" });
      })
      .catch((err) => console.log(err));
  }, []);

  //Define async actions here

  async function updateEdge() {
    dispatch({
      type: "loading",
      status: "loading",
    });
    fetch("https://flowdoc-api-bsclg.ondigitalocean.app/api/v1/edge")
      .then((res) => res.json())
      .then((data) => {
        const edgeData = [];
        data.Data.map((item) => {
          edgeData.push({
            id: item.id,
            source: item.source,
            target: item.target,
            type: item.type,
            animated: item.animated,
          });
        });
        dispatch({ type: "insert", payload: edgeData, status: "ready" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <EdgeContext.Provider value={{ state, updateEdge }}>
      <EdgeDispatchContext.Provider value={dispatch}>
        {children}
      </EdgeDispatchContext.Provider>
    </EdgeContext.Provider>
  );
}
export function useEdge() {
  return useContext(EdgeContext);
}

export function useEdgeDispatch() {
  return useContext(EdgeDispatchContext);
}

function edgeReducer(state, action) {
  switch (action.type) {
    case "datareceived": {
      return { ...state, edges: action.payload, status: "ready" };
    }
    case "insert": {
      return { ...state, edges: action.payload, status: "ready" };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const initialEdges = { edges: [], status: "loading" };

export default EdgeProvider;
