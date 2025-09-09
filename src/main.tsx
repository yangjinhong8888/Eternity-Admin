import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router";
import router from "./config/router.tsx";
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
