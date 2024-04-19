import { useState, useMemo, useEffect } from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";
import dagre from "dagre";

import CustomNode from "./custom-node";
import SideWindow from "./SideWindow";

//Import Necessary context functions here
import { useNode } from "../contexts/NodeContexts";
import { useEdge } from "../contexts/EdgeContext";

import Loading from "./Loading";
//dagre code
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 130;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  console.log("-----------Get layoutted nodes---------");
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 200, ranksep: 200 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

function Flow() {
  const { state: nodeslist } = useNode();
  const { state: edgeslist } = useEdge();
  console.log("-----------node list-------------");
  console.log(nodeslist);
  console.log(edgeslist);
  console.log("-----------node list-------------");
  const onInit = (reactFlowInstance) => reactFlowInstance.zoomOut(-3);

  const [sidewin, setSidewin] = useState(false);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodeslist.nodes,
    edgeslist.edges
  );

  // const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const [nodeId, setNodeID] = useState();
  const nodeTypes = useMemo(() => ({ textUpdater: CustomNode }), []);

  const handleNodeClick = (e) => {
    setNodeID(e.target);
    setSidewin(!sidewin);
  };

  return (
    <>
      <div className="container">
        {sidewin ? (
          <SideWindow
            setSidewin={setSidewin}
            sidewin={sidewin}
            nodeId={nodeId}
          />
        ) : (
          ""
        )}
        <div style={{ width: "", height: "100vh" }}>
          <div className="flow">
            {(nodeslist.status === "loading" ||
              edgeslist.status === "loading") && <Loading />}
            {nodeslist.status === "ready" && edgeslist.status === "ready" && (
              <ReactFlow
                nodes={layoutedNodes}
                edges={layoutedEdges}
                zoomOnScroll={false}
                preventScrolling={false}
                nodeTypes={nodeTypes}
                fitView
                onNodeClick={handleNodeClick}
                onInit={onInit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Flow;
