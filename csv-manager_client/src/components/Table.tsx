import React from "react";
import Button from "./Button";

const Table = () => {
    return(
        <table>
            <tr>
                <th>Name</th>
                <th>Date of birth</th>
                <th>Married</th>
                <th>Phone</th>
                <th>Salary ($)</th>
                <th></th>
            </tr>
            <tr>
                <td>Sasha</td>
                <td>06.03.2004</td>
                <td>No</td>
                <td>+380950137179</td>
                <td>3400</td>
                <td>
                    <button className="myButton">Edit</button>
                    <button className="myButton">Delete</button>
                </td>
            </tr>
        </table>
    )
};

export default Table;