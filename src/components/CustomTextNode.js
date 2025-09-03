import React from "react";
import { Handle, Position } from "reactflow";
import { FaWhatsapp } from "react-icons/fa";

function CustomTextNode({ data }) {
  return (
    <div className="text-node">
      <FaWhatsapp className="wa-icon" />
      <div className="text-content">{data.label}</div>
      <button className="send-btn">➤</button>

      {/* Handles for connecting edges */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomTextNode;