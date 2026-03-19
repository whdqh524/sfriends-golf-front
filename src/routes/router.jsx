import {createBrowserRouter, Navigate} from "react-router-dom";
import {PATH} from "./paths";
import {lazy} from "react";


const Root = lazy(() => import("@/layouts/Root"));
const Home = lazy(() => import("@/pages/Home"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage.jsx"));
const Login = lazy(() => import("@/pages/Login"));
const Field = lazy(() => import("@/pages/Field.jsx"))
const Screen = lazy(() => import("@/pages/Screen.jsx"))



export const router = createBrowserRouter([
    {
        path: PATH.HOME,
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: '/error',
                element: <ErrorPage/>,
            },
            {
                path: '/field',
                element: <Field/>
            },
            {
                path: '/screen',
                element: <Screen/>
            }
        ],
    },
    {
        path: '/login',
        element: <Login/>,
    },
]);
