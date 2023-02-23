import React, {useEffect, useState} from 'react';
import "./style.scss";
import Table from "./components/Table";
import InputCSV from "./components/InputCSV";
import {ContactType} from "./types/ContactType";

function App() {



  return (
    <div className="App">
        <InputCSV />
        <Table />
    </div>
  );
}

export default App;
