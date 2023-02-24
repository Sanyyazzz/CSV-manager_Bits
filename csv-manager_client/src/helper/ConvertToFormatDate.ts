import {ContactType} from "../types/ContactType";

export const ConvertToFormatDate = (contacts : ContactType[]) => {
    contacts.map((c)=>{
        c.dateOfBirthday = new Date(c.dateOfBirthday).toISOString().split('T')[0]
    })
    return contacts;
}