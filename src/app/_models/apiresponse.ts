export interface APIResponse<T> {
    statusCode: number,
    result: T,
    isSuccess: boolean,
    errorMessages: Array<string>
}