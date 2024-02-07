import { CARS, ROOMS } from "../FirebaseHelpers/ApiInterface"

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
    Room_Name: {
        displayName: "Room Number",
        name: "RoomName",
        type: SchemaTypes.String,
        required: true
    },
    Room_ExtraBed: {
        displayName: "Extra Beds",
        name: "extrabeds",
        type: SchemaTypes.Number,
        min: 0,
        required: true
    },
    Room_Bed: {
        displayName: "Beds",
        name: "RoomBed",
        type: SchemaTypes.Number,
        min: 0,
        required: true
    },
    Car_Number: {
        displayName: "Car Number",
        name: "carNumber",
        type: SchemaTypes.String,
        required: true
    },
    Car_Name: {
        displayName: "Car Name",
        name: "carName",
        type: SchemaTypes.String,
        required: true
    },
    Car_Capacity: {
        displayName: "Car Capacity",
        name: "capacity",
        type: SchemaTypes.Number,
        required: true,
        min: 0
    },
    People_Name: {
        displayName: "Name",
        name: "peopleName",
        type: SchemaTypes.String,
        required: true,
    },
    People_Tag: {
        displayName: "Group",
        name: "peopletag",
        type: SchemaTypes.String,
        required: true,
    },
    People_Room: {
        displayName: "Select Room",
        name: "RoomName",
        type: SchemaTypes.DROP_DOWN,
        queryKey: ROOMS,
        DatabaseKey: "RoomName",
        required: true
    },
    People_Car: {
        displayName: "Select Car",
        name: "carNumber",
        type: SchemaTypes.DROP_DOWN,
        DatabaseKey: "carNumber",
        queryKey: CARS,
        required: true
    },
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

export const Room = [
    {
        item: propertyList.Room_Name,
    },
    {
        item: propertyList.Room_Bed,
    },
    {
        item: propertyList.Room_ExtraBed
    }
]

export const CarProps = [
    {
        item: propertyList.Car_Name
    },
    {
        item: propertyList.Car_Number
    },
    {
        item: propertyList.Car_Capacity
    }
]

export const PeopleProps = [
    {
        item: propertyList.People_Name
    },
    {
        item: propertyList.People_Tag
    },
    {
        item: propertyList.People_Room,
    },
    {
        item: propertyList.People_Car
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