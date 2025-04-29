import { Pageable, Sort2 } from "./pagable.response";

export interface CommonResponse<T> {
    code: number;
    message: string;
    result: Result<T>;
}
export interface Result<T> {
    content: T[]
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: Sort2
    first: boolean
    numberOfElements: number
    empty: boolean
}
export interface CommonGetByIdResponse<T> {
    code: number;
    message: string;
    result: T;
}