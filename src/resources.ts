export interface QueryParams {
    toArray(): string[]
}

export interface MainResponseObject {
    success: boolean
    message: string
    data: any[]
}

export interface Params {
    toArray(): string[]
}