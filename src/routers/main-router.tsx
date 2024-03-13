import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../routes/MainPage';
import MainLayout from '../routes/MainLayout';


export const mainRouter = ([
    {
        path: '',
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <MainPage />,
                index: true,
            }
        ]
    }
])

const router = createBrowserRouter(mainRouter);

export default router;