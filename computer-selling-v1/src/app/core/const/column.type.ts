export interface Column {
    arr: string;
    id?: string;
    fieldName: string;
    type?: string;
    width?: string;
    listOfAction?: ListOfAction[];
}


export interface ListOfAction {
    actionName: string,
    icon: string,
    keyName: string,
}