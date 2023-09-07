interface ICalculateString {
    calculate ( expression: string ): number;
}


type PriorityKeys = '+' | '-' | '*' | '/'
type Priority = Record<PriorityKeys, number>



export { ICalculateString, Priority, PriorityKeys };