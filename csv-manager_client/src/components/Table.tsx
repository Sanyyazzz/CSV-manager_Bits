import React, {useEffect, useRef, useState} from "react";
import {ContactType} from "../types/ContactType";
import {SortParamsEnum} from "../types/SortParamsType";
import {deleteCSV, getListOfCSV, updateCSV} from "../sideEffectFunction/fetchRequest";
import TableRow from "./TableRow";
import {ConvertToFormatDate} from "../helper/ConvertToFormatDate";

const Table = () => {
    const [listOfCSV, setListOfCSV] = useState<ContactType[] | any>();

    const[sort, setSort] = useState("null")
    const[method, setMethod] = useState(SortParamsEnum.null)
    const[activeTabOfSort, setActiveTabOfSort] = useState<number>(-1)
    const[activeEditRow, setActiveEditRow] = useState(false)
    const headRow = useRef<any>()

    //method that change style for active sort tab
    const onRowTableHandler = (event : React.MouseEvent<HTMLTableRowElement>) => {
        const element = event.target as HTMLTableHeaderCellElement;
        if(activeTabOfSort != element.cellIndex
            && element.cellIndex != 3
            && element.cellIndex != 5
        ){
            headRow.current.childNodes.forEach(
                (c : any)=>c.classList.remove("orderBy", "orderByDesc")
            )
            setActiveTabOfSort(element.cellIndex)
            element.classList.add("orderBy")
        }else if(method == SortParamsEnum.orderBy){
            element.classList.add("orderByDesc")
        }else if(method == SortParamsEnum.orderByDesc){
            element.classList.remove("orderBy", "orderByDesc")
            setActiveTabOfSort(-1)
        }
    }

    const onSortTableByName = () => {
        if(sort != "name"){
            setSort("name")
            setMethod(SortParamsEnum.orderBy)
        }else if(method == SortParamsEnum.orderBy){
            setMethod(SortParamsEnum.orderByDesc)
        }else {
            setSort("")
            setMethod(SortParamsEnum.null)
        }
    }
    const onSortTableByDate = () => {
        if(sort != "dateOfBirth"){
            setSort("dateOfBirth")
            setMethod(SortParamsEnum.orderBy)
        }else if(method == SortParamsEnum.orderBy){
            setMethod(SortParamsEnum.orderByDesc)
        }else {
            setSort("")
            setMethod(SortParamsEnum.null)
        }
    }
    const onSortTableByIsMarried = () => {
        if(sort != "isMarried"){
            setSort("isMarried")
            setMethod(SortParamsEnum.orderBy)
        }else if(method == SortParamsEnum.orderBy){
            setMethod(SortParamsEnum.orderByDesc)
        }else {
            setSort("")
            setMethod(SortParamsEnum.null)
        }
    }
    const onSortTableBySalary = () => {
        if(sort != "salary"){
            setSort("salary")
            setMethod(SortParamsEnum.orderBy)
        }else if(method == SortParamsEnum.orderBy){
            setMethod(SortParamsEnum.orderByDesc)
        }else {
            setSort("")
            setMethod(SortParamsEnum.null)
        }
    }


    const onSaveCsv = (contact : ContactType) => {
        updateCSV("https://localhost:7007/ContactManager", contact)
        let newList = [...listOfCSV]
        let index = listOfCSV.findIndex((c:ContactType)=>c.id == contact.id)
        newList.splice(index, 1, contact)
        setListOfCSV(newList)
        setActiveEditRow(false);
    }

    const onDeleteCsv = (id : number) => {
        let index = listOfCSV.find((c:ContactType)=>c.id == id)

        if(window.confirm("Delete CSV: "+ index.name +"?")){
            deleteCSV(`https://localhost:7007/ContactManager/${id}`)
            let newList = [...listOfCSV]
            newList.splice(index, 1)
            setListOfCSV(newList)
        }
    }

    let tableRows = listOfCSV && listOfCSV.map((contact : ContactType)=>{
        return <TableRow
            contact={contact}
            onSaveCvs={onSaveCsv}
            onDeleteCvs={onDeleteCsv}
            activeEditRow={activeEditRow}
            setActiveEditRow={setActiveEditRow}
        />
    });

    useEffect(()=>{
        getListOfCSV(`https://localhost:7007/ContactManager/contacts/sort?sort=${sort}&method=${SortParamsEnum[method]}`)
            .then(data => ConvertToFormatDate(data))
            .then(data => setListOfCSV(data))
        //setListOfCSV( [{id:1, name: 'Oleksandr', dateOfBirthday: "2022-10-05", isMarried: true, phoneNumber: "+3809526565", salary: 500}])
    }, [sort, method])

    return(
        <table>
            <thead>
                <tr key={0} onClick={(e)=>onRowTableHandler(e)} ref={headRow}>
                    <th onClick={onSortTableByName}>Name</th>
                    <th onClick={onSortTableByDate}>Date of birth</th>
                    <th onClick={onSortTableByIsMarried}>Married</th>
                    <th>Phone</th>
                    <th onClick={onSortTableBySalary}>Salary ($)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
};

export default Table;