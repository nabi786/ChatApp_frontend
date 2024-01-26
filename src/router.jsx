
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

import Login from './component/login'
import Chat from './component/Chat'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "chat",
        element: <Chat/>,
    },
    {
        path: "*",
        element: (
            <h1>Page Not Found</h1>
        ),
    },
]);



export default router
