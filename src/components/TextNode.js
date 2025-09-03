import React from "react";
import { Handle, Position } from "reactflow";

function TextNode({ data }) {
  return (
    <div className="text-node">
      <strong>Send Message</strong>
      <div className="text-content">{data.label || "Empty message"}</div>

      {/* Target handle - multiple allowed */}
      <Handle type="target" position={Position.Top} />

      {/* Source handle - only one allowed */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default TextNode;