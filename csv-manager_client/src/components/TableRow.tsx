import {ContactType} from "../types/ContactType";
import React from "react";

type TableRowType = {
    contact : ContactType
}

const TableRow = (props : TableRowType) => {
    return(
        <tr key={props.contact.ID}>
            <td>{props.contact.name}</td>
            <td>{props.contact.dateOfBirthday.toString()}</td>
            <td>{props.contact.isMarried ? "Yes" : "No"}</td>
            <td>{props.contact.phoneNumber}</td>
            <td>{props.contact.salary}</td>
            <td>
                <div className="buttons">
                    <button className="edit">Edit</button>
                    <button className="myButton"><img src={"../../public/delete.png"} width={40}/></button>
                </div>

            </td>
        </tr>
    )
}

export default TableRow;