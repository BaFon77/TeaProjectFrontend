import {LOGIN_ROUTE, PROFILE, REGISTRATION_ROUTE} from "../utils/consts";
import Login from "../pages/Main/Components/Login/Login";
import Profile from "../pages/Profile";

export const authRoutes = [

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Login
    },
    {
        path: PROFILE,
        Component: Profile
    }
]