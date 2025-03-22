export interface CommonResponse<T> {
    code: number;
    message: string;
    result: T;
}