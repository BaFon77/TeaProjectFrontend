import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {ILoginRequest, ILoginResponse, IRegistryRequest} from "./types";
import {AxiosPromise} from "axios";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
    axiosInstance.post(Endpoints.AUTH.LOGIN, params)

export const logout = (): AxiosPromise => axiosInstance.get(Endpoints.AUTH.LOGOUT)

export const registry = (params: IRegistryRequest): AxiosPromise => axiosInstance.post(Endpoints.AUTH.REGISTRY, params)