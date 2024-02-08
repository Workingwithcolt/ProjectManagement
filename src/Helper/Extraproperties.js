
export const SchemaTypes = {
    Number: "Number",
    String: "String",
    DATE: "date",
    radio: "radio",
    file: "file",
    EMAIL: "email",
    DROP_DOWN: "dropdown",
    headline: "Headline",
    PASSWORD: "password",
    Password: "password",
    STD_DROPDOWN: "standarddropdown",
    checkbox: "checkbox",
    DIV_DROPDOWN: "divisiondropdown",
    PHONE_NUMBER: "PHONE_NUMBER",
    USER_LEVEL_DROPDOWN: "userleveldropdown",
    TextArea: "TextArea",
}

export const known_Custom_Types = {
    KN_PAN: "^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$",
    KN_PIN: "^[1-9]{1}[0-9]{5}$",
    KN_GSTIN: "^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1}[1-9a-zA-Z]{1})([zZ]{1})([0-9a-zA-Z]{1})+$",
    date: "d{2}-d{2}-d{4}",
    ADHAR_CARD_FIRST: "[2-9]{1}[0-9]{3}",
    ADHAR_CARD_SECOND: "[0-9]{4}",
    ADHAR_CARD_THIRD: "[0-9]{4}",
    PHONE_NUMBER: "[0-9]{10}",
    IFSC_CODE: "^[A-Za-z]{4}[a-zA-Z0-9]{7}$",
    ESTD: "[0-9][0-9][0-9][0-9]",
    UDISE: "\\d{11}"
}

export const propertyList = {
    Full_Name: {
        displayName: "Full Name",
        name: "Full Name",
        type: SchemaTypes.String,
        required: true
    },
    Email: {
        displayName: "Enter Email",
        name: "Email",
        type: SchemaTypes.EMAIL,
        required: true
    },
    UniqueID: {
        displayName: "Enter Company Id",
        name: "UniqueId",
        type: SchemaTypes.String,
        required: true
    },
    ProjectName:{
        displayName:"Enter Project Name",
        name:"project",
        type:SchemaTypes.String,
        required:true
    },
    ProjectDetail:{
        displayName:"Enter Project Detail",
        name:"projectDetail",
        type:SchemaTypes.TextArea,
        required:true
    },
    TaskName:{
        displayName:"Enter Task Name",
        name:"Task",
        type:SchemaTypes.String,
        required:true
    },
    TaskDetail:{
        displayName:"Enter Task Detail",
        name:"taskDetail",
        type:SchemaTypes.TextArea,
        required:true
    }
}

export const createCompany =[
    {
        item:propertyList.Full_Name
    },
    {
        item:propertyList.Email
    },
    {
        item:propertyList.UniqueID
    }
] 

export const userForm = [
    {
        item:propertyList.Full_Name
    },
    {
        item:propertyList.Email
    }
]

export const JoinForm = [
   {
    item:propertyList.UniqueID
   }
]

export const Projects = [
    {
        item:propertyList.ProjectName
    },
    {
        item:propertyList.ProjectDetail
    }
]

export const Task = [
    {
        item:propertyList.TaskName
    },
    {
        item:propertyList.TaskDetail
    }
]