export interface TransactionDTO{
    id: number,
    periodId: number,
    value: number,
    transactionType: number,
    description: string,
    dateOfMovement: Date
}