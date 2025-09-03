import React from "react";

function SettingsPanel({ selectedNode, updateNodeText }) {
  return (
    <div className="settings-panel">
      <h4>Edit Message</h4>
      <input
        type="text"
        value={selectedNode.data.label}
        onChange={(e) => updateNodeText(e.target.value)}
      />
    </div>
  );
}

export default SettingsPanel;