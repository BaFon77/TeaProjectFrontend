import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const storedToken = localStorage.getItem('access_token');

export interface AuthState {
    authData: {
        access_token: string | null
        isLoading: boolean
        error:  string | null,
    }
    profileData: {
        profile: string | null,
        isLoading: boolean
        error:  string | null,
    }
}

const initialState: AuthState = {
    authData: {
        access_token: storedToken || null,
        isLoading: false,
        error:  null,
    },
    profileData: {
        profile: null,
        isLoading: false,
        error:  null,
    }
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        loginSuccess: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                access_token: action.payload,
                isLoading: false,
                error:  null,
            }
        }),
        loginFailure: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error:  action.payload,
            }
        }),
        registryStart: (state): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        registrySuccess: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                access_token: action.payload,
                isLoading: false,
                error:  null,
            }
        }),
        registryFailure: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error:  action.payload,
            }
        }),
        // loadProfileStart: (state): AuthState => ({
        //     ...state,
        //     profileData: {
        //         ...state.profileData,
        //         isLoading: true,
        //     }
        // }),
        // loadProfileSuccess: (state, action: PayloadAction<string>): AuthState => ({
        //     ...state,
        //     profileData: {
        //         ...state.profileData,
        //         profile: action.payload,
        //         isLoading: false,
        //         error:  null,
        //     }
        // }),
        // loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
        //     ...state,
        //     profileData: {
        //         ...state.profileData,
        //         isLoading: false,
        //         error:  action.payload,
        //     }
        // }),
        logoutSuccess: (): AuthState => initialState,
    },
})

export const { loginStart, loginSuccess, registryStart, registrySuccess, registryFailure, loginFailure, logoutSuccess } = authReducer.actions

export default authReducer.reducer