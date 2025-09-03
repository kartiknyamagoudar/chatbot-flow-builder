import React from "react";

function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="nodes-panel">
      <div
        className="node-item"
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
      >
        + Message Node
      </div>
    </div>
  );
}

export default NodesPanel;