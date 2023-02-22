const InputCSV = () => {
    return(
        <form>
            <label>Name:</label>
            <input type="text" id="name" /><br/>
            <label>Date of birth:</label>
            <input type="date" id="dateOfBirth" /><br/>
            <label>Married:</label>
            <input type="checkbox" id="isMarried" /><br/>
            <label>Phone:</label>
            <input type="tel" id="phoneNumber" /><br/>
            <label>Salary:</label>
            <input type="number" id="salary" step={100} /><br/>
            <button>Add CSV</button>
        </form>
    )
}

export default InputCSV;