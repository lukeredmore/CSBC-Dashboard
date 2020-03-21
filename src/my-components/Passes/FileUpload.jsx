import React from "react"

const FileUpload = ({onChange, fileName, required, accept}) => (
  <div className="custom-file mb-3">
    <input type="file" required={required} accept={accept} className="custom-file-input" id="customFile2" onChange={onChange}/>
    <label className="custom-file-label" htmlFor="customFile2">
      {fileName ? fileName : 'Choose file...'}
    </label>
  </div>
)

export default FileUpload
