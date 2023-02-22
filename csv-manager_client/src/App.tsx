import React, {useEffect} from 'react';
import "./style.scss";
import Table from "./components/Table";
import InputCSV from "./components/InputCSV";

function App() {

    useEffect(()=>{
        fetch("https://deliveryservice.somee.com/api/DeliveryService")
            .then((response) => response.json())
            .then((data) => console.log(data));
    },[])

  return (
    <div className="App">
        <InputCSV />
        <Table />
    </div>
  );
}

export default App;
