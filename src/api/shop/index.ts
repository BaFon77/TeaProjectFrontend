import {shopAxios} from "../instance";
// import jwt_decode from "jwt-decode";

export const createType = async (type: any) => {
    const {data} = await shopAxios.post('api/category', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await shopAxios.get('api/category')
    return data
}

export const createBrand = async (brand: any) => {
    const {data} = await shopAxios.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await shopAxios.get('api/brand', )
    return data
}

export const createDevice = async (device: any) => {
    const {data} = await shopAxios.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId: any, brandId: any, page: any, limit= 5) => {
    const {data} = await shopAxios.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id: string) => {
    const {data} = await shopAxios.get('api/device/' + id)
    return data
}