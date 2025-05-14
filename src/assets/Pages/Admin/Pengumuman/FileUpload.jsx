"use client";
import React from "react";

function FileUpload() {
  return (
    <div className="input-group mt-3" style={{ maxWidth: "705px" }}>
      <label className="input-group-text bg-light text-muted border">
        Choose File
      </label>
      <input type="file" className="form-control" id="inputGroupFile" hidden />
      <label className="form-control text-muted" htmlFor="inputGroupFile">
        No file selected
      </label>
    </div>
  );
}

export default FileUpload;
