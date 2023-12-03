export interface ILoginRequest {
    username: string
    password: string
}

export interface ILoginResponse {
    access_token: string
}

export interface IRegistryRequest {
    username: string
    password: string
    email: string
}

export interface IRegistryResponse {
    access_token: string
}