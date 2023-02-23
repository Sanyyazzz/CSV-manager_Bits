import {useState} from "react";
import {postCSV} from "../sideEffectFunction/fetchRequest";

const InputCSV = () => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isMarried, setIsMarried] = useState<boolean>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [salary, setSalary] = useState("");

    const onChangeName = (e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onChangeDateOfBirth = (e : React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)
    const onChangeIsMarried = (e : React.ChangeEvent<HTMLInputElement>) => setIsMarried(e.target.checked)
    const onChangePhoneNum = (e : React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)
    const onChangeSalary = (e : React.ChangeEvent<HTMLInputElement>) => setSalary(e.target.value)

    const onAddCsv = () => {
        let newContact = {
            name: name,
            dateOfBirthday: dateOfBirth,
            isMarried: isMarried,
            phoneNumber: phoneNumber,
            salary: salary
        }

       postCSV("https://localhost:7007/ContactManager", newContact)
    }

    return(
        <form>
            <div>
                <label>Name:</label>
                <input type="text" id="name" onChange={onChangeName}/><br/>
            </div>
            <div>
                <label>Date of birth:</label>
                <input type="date" id="dateOfBirth" onChange={onChangeDateOfBirth}/><br/>
            </div>
            <div>
                <label>Married:</label>
                <input type="checkbox" id="isMarried" onChange={onChangeIsMarried}/><br/>
            </div>
            <div>
                <label>Phone:</label>
                <input type="tel" id="phoneNumber" onChange={onChangePhoneNum} /><br/>
            </div>
            <div>
                <label>Salary:</label>
                <input type="number" id="salary" step={100} onChange={onChangeSalary} /><br/>
            </div>
            <button onClick={onAddCsv}>Add CSV</button>
        </form>
    )
}

export default InputCSV;