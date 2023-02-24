import React from 'react';
import "./style.scss";
import Table from "./components/Table";
import InputCSV from "./components/InputCSV";

function App() {
  return (
    <div className="App">
        <InputCSV />
        <Table />
    </div>
  );
}

export default App;
