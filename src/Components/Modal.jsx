import { useState, useRef } from "react";

import { useNode, useNodeDispatch } from "../contexts/NodeContexts";
import { useEdge, useEdgeDispatch } from "../contexts/EdgeContext";
import { useArticle } from "../contexts/ArticleContext";

export default function Modal({ SetModelOpen, modelOpen, notify }) {
  const { state: nodes, addNode } = useNode();
  const { state: edges, updateEdge } = useEdge();
  const { getArticles } = useArticle();
  const [label, setLabel] = useState(null);
  const [heading, setHeading] = useState(null);
  const [description, setDescription] = useState(null);
  const [errorSample, setErrorSample] = useState(null);
  const [links, setLinks] = useState([
    {
      linklabel: "",
      url: "",
    },
  ]);

  const [state, setState] = useState({
    linklabel: "",
    url: "",
  });

  const [urldata, setUrldata] = useState([{}]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const selectNode = (e) => {
    let getSelectedNode = nodes.nodes.find((obj) => {
      return obj.id === e.target.value;
    });

    setSelectedNode(getSelectedNode);

    let getSelectedNodeEdge = edges.edges.filter((obj) => {
      return obj.target === e.target.value;
    });

    setSelectedEdge(getSelectedNodeEdge);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const node = {
      nodetype: "textUpdater",
      label: label,
      heading: heading,
      description: description,
      errorSample: errorSample,
      urls: links,
      source: selectedNode?.id,
      animated: false,
    };

    await addNode(node);
    await updateEdge();
    await getArticles();
    SetModelOpen(!modelOpen);
    notify();
  };

  let options = [];
  nodes.nodes.map((item, id) => {
    options.push({
      id: item.id,
      label: item?.data?.label,
      value: item?.data?.label,
    });
  });

  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...links];
    onChangeVal[i][name] = value;
    setLinks(onChangeVal);
  };

  const handleDelete = (i) => {
    const deleteVal = [...links];
    deleteVal.splice(i, 1);
    setLinks(deleteVal);
  };

  const handleClick = () => {
    setLinks([
      ...links,
      {
        linklabel: "",
        url: "",
      },
    ]);
  };

  return (
    <>
      <div className="model">
        <div className="">
          <h3>Add Node</h3>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <p>Select Parent node </p>
            <select
              name="label"
              className="form-input"
              onChange={(e) => selectNode(e)}
              defaultValue={options[0]?.id}
            >
              {console.log(options[0]?.id)}
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Add node Label"
              onChange={(e) => setLabel(e.target.value)}
            />
            <input
              required
              type="text"
              className="form-input"
              placeholder="Heading"
              onChange={(e) => setHeading(e.target.value)}
            />
            <label>
              Description:
              <textarea
                className="textarea"
                name="postContent"
                rows={12}
                cols={55}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Sample error:
              <textarea
                className="textarea"
                name="postContent"
                rows={12}
                cols={55}
                onChange={(e) => setErrorSample(e.target.value)}
              />
            </label>
            <LinkInput
              handleClick={handleClick}
              links={links}
              setUrldata={setUrldata}
              handleInputChange={handleInputChange}
              handleDelete={handleDelete}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const LinkInput = ({ handleClick, links, handleInputChange, handleDelete }) => {
  const urls = links;
  return (
    <>
      {urls.length > 1 ? <div>hi</div> : ""}
      {urls.map((item, id) => {
        return (
          <div key={id} className="url-card">
            <div>
              <div className="div">
                <input
                  required
                  type="text"
                  name="linklabel"
                  className="form-input"
                  value={item.linklabel}
                  placeholder="Link Label"
                  onChange={(e) => handleInputChange(e, id)}
                />
                <input
                  required
                  type="text"
                  name="url"
                  value={item.url}
                  className="form-input"
                  placeholder="URL"
                  onChange={(e) => handleInputChange(e, id)}
                />
                <button
                  className="btn-small"
                  type="button"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <button type="button" className="btn-small" onClick={handleClick}>
        Add Links
      </button>
    </>
  );
};
