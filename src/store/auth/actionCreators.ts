import { Dispatch } from "@reduxjs/toolkit"
import api from "../../api"
import {ILoginRequest, ILoginResponse, IRegistryRequest} from "../../api/auth/types"
import {loginStart, loginSuccess, loginFailure, registryStart, logoutSuccess, registrySuccess} from "./authReduce"
import { history } from '../../utils/history'
import { store } from ".."
import { AxiosPromise } from "axios"
import {useState} from "react";
// import { isTokenExpired } from "../../utils/jwt"

export const loginUser =
    (data: ILoginRequest) =>
        async (dispatch: Dispatch<any>): Promise<void> => {
            try {
                dispatch(loginStart())

                const res = await api.auth.login(data)

                localStorage.setItem('access_token', res.data.access_token);

                dispatch(loginSuccess(res.data.access_token))
                // dispatch(getProfile())

                //navigation.push("/", {replace: true})

                history.push('/');
                // const [update, setUpdate] = useState(false);
                // setUpdate(prevUpdate => !prevUpdate);
                window.location.reload();
                // alert(1);


            } catch (e: any) {
                console.error(e)

                dispatch(loginFailure(e.message))
            }
        }

export const registryUser =
    (data: IRegistryRequest) =>
        async (dispatch: Dispatch<any>): Promise<void> => {
            try {
                dispatch(registryStart())

                const res = await api.auth.registry(data)

                localStorage.setItem('access_token', res.data.access_token);

                dispatch(registrySuccess(res.data.access_token))
                // dispatch(getProfile())

                //navigation.push("/", {replace: true})

                history.push('/');
                // const [update, setUpdate] = useState(false);
                // setUpdate(prevUpdate => !prevUpdate);
                window.location.reload();
                // alert(1);


            } catch (e: any) {
                console.error(e)

                dispatch(loginFailure(e.message))
            }
        }

export const logoutUser =
    () =>
        async (dispatch: Dispatch): Promise<void> => {
            try {
                // await api.auth.logout()

                localStorage.removeItem("access_token");

                dispatch(logoutSuccess())

                history.push('/')
                window.location.reload();
            } catch (e) {
                console.error(e)
            }
        }

// export const getProfile = () =>
//     async (dispatch: Dispatch<any>): Promise<void> => {
//         try {
//             dispatch(loadProfileStart())
//
//             const res = await api.auth.getProfile()
//
//             dispatch(loadProfileSucess(res.data))
//         } catch (e: any) {
//             console.error(e)
//
//             dispatch(loadProfileFailure(e.message))
//         }
//     }
//
// // переменная для хранения запроса токена (для избежания race condition)
// let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null
//
// export const getAccessToken =
//     () =>
//         async (dispatch: Dispatch<any>): Promise<string | null> => {
//             try {
//                 const accessToken = store.getState().auth.authData.accessToken
//
//                 if (!accessToken || isTokenExpired(accessToken)) {
//                     if (refreshTokenRequest === null) {
//                         refreshTokenRequest = api.auth.refreshToken()
//                     }
//
//                     const res = await refreshTokenRequest
//                     refreshTokenRequest = null
//
//                     dispatch(loginSucess(res.data.accessToken))
//
//                     return res.data.accessToken
//                 }
//
//                 return accessToken
//             } catch (e) {
//                 console.error(e)
//
//                 return null
//             }
//         }