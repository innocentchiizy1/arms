import "./FilesManager.css";

function FilesManager() {
  return (
    <div className="files-manager">
      <div className="files-manager-header">
        <h2>Files Manager</h2>
        <p>Upload, organize, and manage company files</p>
      </div>
      <div className="files-manager-content">
        <h3>Recent Files</h3>
        <ul className="files-list">
          <li>
            Employee_Handbook.pdf{" "}
            <span className="file-meta">(2.1MB, uploaded 2024-07-01)</span>
          </li>
          <li>
            Payroll_June.xlsx{" "}
            <span className="file-meta">(350KB, uploaded 2024-07-02)</span>
          </li>
          <li>
            Safety_Guidelines.pdf{" "}
            <span className="file-meta">(1.5MB, uploaded 2024-07-03)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FilesManager;
