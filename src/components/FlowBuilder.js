import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomTextNode from "./CustomTextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

let id = 0;
const getId = () => `node_${id++}`;

const nodeTypes = { textNode: CustomTextNode };

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [savedNodes, setSavedNodes] = useState([]);

  // ✅ Allow multiple edges per source (no restriction)
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // ✅ Allow drop
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // ✅ Drop handler
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = { x: event.clientX - 250, y: event.clientY - 50 };
      const newNode = {
        id: getId(),
        type: "textNode",
        position,
        data: { label: "New Message" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodeClick = (_, node) => setSelectedNode(node);

  // ✅ Update node text
  const updateNodeText = (newText) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, label: newText } } : n
      )
    );
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, label: newText },
    }));
  };

  // ✅ Save Flow
  const onSave = () => {
    setSavedNodes(nodes);
    alert("Flow Saved!");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT PANEL */}
      <div
        style={{
          width: 200,
          borderRight: "1px solid #ddd",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>🧩 Nodes</h3>
          <NodesPanel />

          {selectedNode && (
            <SettingsPanel
              selectedNode={selectedNode}
              updateNodeText={updateNodeText}
            />
          )}
        </div>

        {/* ✅ Save button at bottom center */}
        <div style={{ textAlign: "center", marginTop: "auto" }}>
          <button onClick={onSave} className="save-btn">
            Save Flow
          </button>
        </div>
      </div>

      {/* MIDDLE CANVAS */}
      <div style={{ flex: 1 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: 250, borderLeft: "1px solid #ddd", padding: 10 }}>
        <h3>📌 Saved Nodes</h3>
        {savedNodes.length === 0 ? (
          <p>No saved nodes yet.</p>
        ) : (
          <ul>
            {savedNodes.map((n) => (
              <li key={n.id}>{n.data.label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FlowBuilder;

// https://chatbot-flow-builder-sv6gt3ah1-kartik-nyamagoudars-projects.vercel.app