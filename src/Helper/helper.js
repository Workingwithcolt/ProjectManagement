export const ADMIN_USER_LEVEL_ID = "AdminLevelID";
export const ADMIN_USER_LEVEL_NAME = "Admin";

export const USER_USER_LEVEL_ID = "UserLevelID";
export const USER_USER_LEVEL_NAME = "User";

export const MANAGER_LEVEL_ID = "ManagerLevelID";
export const MANAGER_LEVEL_NAME = "Manager";

export const DEVELOPER_LEVEL_ID = "DeveloperLevelID"
export const DEVELOPER_LEVEL_NAME = "Developer"

export const ACCEPTED = "accepted";
export const PENDING = "pending";
export const REJECTED = "Rejected";

export const positions = [{ label: MANAGER_LEVEL_ID, value: MANAGER_LEVEL_ID }, { label: DEVELOPER_LEVEL_ID, value: DEVELOPER_LEVEL_ID }]

export function deepCopyObject(fromObject) {
    return JSON.parse(JSON.stringify(fromObject));
}

export function getCapacity(item) {
    var returnVal = 0;

    returnVal = item.capacity ?
        parseInt(item.capacity) :
        parseInt(item.RoomBed) + parseInt(item.extrabeds);

    return isNaN(returnVal) ? 0 : returnVal;
}

export const returnCurrentCompany = async (endpoints, uid) => {
    try {
        let CompanyInfo = await endpoints.Company.getDocument(uid);
        return CompanyInfo;
    } catch (e) {
        //
        // return {}
    }
}

export const checkAdmin = (currentAcces) => {
    return currentAcces.some(item => item.levelID === ADMIN_USER_LEVEL_ID)
}

export const checkManager = (currentAcces) => {
    return (currentAcces[0]?.position?.Projects?.length > 0) ? true : false
}

export const checkDeveloper = (currentAcces, companyId) => {
    let exist = false 
    currentAcces[companyId].some(element => {
        if (element?.position?.position === DEVELOPER_LEVEL_ID) {
            exist = true;
        }
    })
    return exist;
}