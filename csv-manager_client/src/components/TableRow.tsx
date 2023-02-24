import {ContactType} from "../types/ContactType";
import React, { useState} from "react";

type TableRowType = {
    contact : ContactType
    onSaveCvs : Function
    onDeleteCvs : Function
    activeEditRow: boolean
    setActiveEditRow: Function
}

const TableRow = (props : TableRowType) => {
    const [rowIsEdit, setRowIsEdit] = useState(false);

    const [name, setName] = useState(props.contact.name);
    const [dateOfBirth, setDateOfBirth] = useState<string | any>(props.contact.dateOfBirthday);
    const [isMarried, setIsMarried] = useState<boolean>(props.contact.isMarried);
    const [phoneNumber, setPhoneNumber] = useState(props.contact.phoneNumber);
    const [salary, setSalary] = useState<number | any>(props.contact.salary);

    const onChangeName = (e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onChangeDateOfBirth = (e : React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)
    const onChangeIsMarried = (e : React.ChangeEvent<HTMLInputElement>) => setIsMarried(e.target.checked)
    const onChangePhoneNum = (e : React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)
    const onChangeSalary = (e : React.ChangeEvent<HTMLInputElement>) => setSalary(e.target.value)

    const onEditRow = () => {
        if(props.activeEditRow){
            alert("You edit another CSV");
        }else{
            setRowIsEdit(true)
            props.setActiveEditRow(true)
        }
    }

    const onCancelEditRow = () => {
        setRowIsEdit(false)
        props.setActiveEditRow(false)
    }

    const onSaveCvsHandle = () => {
        setRowIsEdit(false)
        props.onSaveCvs({
            id: props.contact.id,
            name: name,
            dateOfBirthday: dateOfBirth,
            isMarried: isMarried,
            phoneNumber: phoneNumber,
            salary: salary
        });
    }

    return(
        rowIsEdit ?
            <tr key={props.contact.id}>
                <td><input type="text" id="name" onChange={onChangeName} value={name}/></td>
                <td><input type="date" id="dateOfBirth" onChange={onChangeDateOfBirth} defaultValue={dateOfBirth.toString()}/></td>
                <td><input type="checkbox" id="isMarried" onChange={onChangeIsMarried} checked={isMarried}/></td>
                <td><input type="tel" id="phoneNumber" onChange={onChangePhoneNum}  value={phoneNumber} maxLength={13}/></td>
                <td><input type="number" id="salary" step={100} onChange={onChangeSalary}  value={salary} /></td>
                <td>
                    <div className="buttons">
                        <button className="save" onClick={onSaveCvsHandle}>Save</button>
                        <button className="cancel" onClick={onCancelEditRow}>Cancel</button>
                    </div>
                </td>
            </tr>
            :
        <tr key={props.contact.id}>
            <td>{props.contact.name}</td>
            <td>{props.contact.dateOfBirthday.toString()}</td>
            <td>{props.contact.isMarried ? "Yes" : "No"}</td>
            <td>{props.contact.phoneNumber}</td>
            <td>{props.contact.salary}</td>
            <td>
                <div className="buttons">
                    <button className="edit" onClick={onEditRow}>Edit</button>
                    <button className="delete" onClick={()=>props.onDeleteCvs(props.contact.id)}><img src={"./images/delete.png"} width={20} alt={"DeleteIcon"}/></button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow;