import { useCallback } from "react";
import { Handle, Position, useNodeId } from "reactflow";

import { useArticle } from "../contexts/ArticleContext";

export default function CustomNode(data) {
  const { getNodeID } = useArticle();
  const nodeId = useNodeId();
  const handleClick = (e) => {
    console.log("need to open side Menu " + nodeId);
    getNodeID(nodeId);
  };

  return (
    <div
      className=""
      style={{
        border: "1px solid #777",
        padding: 10,
        backgroundColor: "#69db7c",
        borderRadius: "5px",
        fontSize: 24,
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16) 0 3px 6px rgba(0, 0, 0, 0.23)",
      }}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />

      <p>{data.data.label}</p>
      {/*
        <div className="btn-position">
          <button
            className="nodrag"
            type="button"
            onClick={() => console.log("clicked close button")}
            style={{
              border: "none",
              background: "#ff8787",
              borderRadius: 50,
            }}
          >
            +
          </button>
        </div>
        */}

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
