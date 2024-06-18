import { useRoutes } from "react-router-dom";

import HomePage from "./routes/home";
import BeatPage from "./routes/beat";
import LoginPage from "./routes/login";
import RegisterPage from "./routes/regitser";
import UserPage from "./routes/user";
import PayPage from "./routes/payPage";




function AppRoutes(){
    const routes = useRoutes([
        {path: '/', element: <HomePage/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/register', element: <RegisterPage/>},
        {path: '/beat/:id', element: <BeatPage/>},
        {path: '/user/:section', element: <UserPage/>},
        {path: '/checkout', element: <PayPage/>},
        {path: '/*', element: <HomePage/>}
    ])

    return routes
}

export default AppRoutes