import React from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData()
    data.append('file', selectedFile);
    axios.post("http://localhost:3001/upload", data, {})
      .then(res => {
        console.log(res.statusText)
      });
  };

  return (
    <div className="container App">
      <div className="row mt-5">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">Upload Your File</label>
            <input type="file" className="form-control" id="fileInput" name="file" onChange={onChangeHandler} />
            <div id="fileHelp" className="form-text">please upload one file each time</div>
            <button className="btn btn-primary mt-3" onClick={onClickHandler}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;