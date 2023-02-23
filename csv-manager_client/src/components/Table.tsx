import React, {useEffect, useRef, useState} from "react";
import {ContactType} from "../types/ContactType";
import {SortParamsEnum} from "../types/SortParamsType";
import {getListOfCSV} from "../sideEffectFunction/fetchRequest";
import TableRow from "./TableRow";

const Table = () => {
    const [listOfCSV, setListOfCSV] = useState<ContactType[] | any>();

    const[sort, setSort] = useState("null")
    const[method, setMethod] = useState(SortParamsEnum.null)
    const[activeTabOfSort, setActiveTabOfSort] = useState<number>(-1)
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

    const onSortTableByName = (event : React.MouseEvent<HTMLTableHeaderCellElement>) => {
        const element = event.target as HTMLTableHeaderCellElement;

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
    const onSortTableByDate = (event : React.MouseEvent<HTMLTableHeaderCellElement>) => {
        const element = event.target as HTMLTableHeaderCellElement;

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
    const onSortTableByIsMarried = (event : React.MouseEvent<HTMLTableHeaderCellElement>) => {
        const element = event.target as HTMLTableHeaderCellElement;

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
    const onSortTableBySalary = (event : React.MouseEvent<HTMLTableHeaderCellElement>) => {
        const element = event.target as HTMLTableHeaderCellElement;

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

    useEffect(()=>{
        getListOfCSV(`https://localhost:7007/ContactManager/contacts/sort?sort=${sort}&method=${SortParamsEnum[method]}`)
            .then(data => setListOfCSV(data))
    }, [sort, method])

    let tableRows = listOfCSV && listOfCSV.map((contact : ContactType)=>{
            return <TableRow contact={contact}/>
        })

    return(
        <table>
            <thead>
                <tr key={0} onClick={(e)=>onRowTableHandler(e)} ref={headRow}>
                    <th onClick={(e)=>onSortTableByName(e)}>Name</th>
                    <th onClick={(e)=>onSortTableByDate(e)}>Date of birth</th>
                    <th onClick={(e)=>onSortTableByIsMarried(e)}>Married</th>
                    <th>Phone</th>
                    <th onClick={(e)=>onSortTableBySalary(e)}>Salary ($)</th>
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