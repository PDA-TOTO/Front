import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../routes/MainPage';
import MainLayout from '../routes/MainLayout';
import LoginPage from '../routes/user/LoginPage';
import SignupPage from '../routes/user/SignupPage';


export const mainRouter = ([
    {
        path: '',
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <MainPage />,
                index: true,
            },
            {
                path: '/login',
                element: <LoginPage />,
                index: true,
            },
            {
                path: '/signup',
                element: <SignupPage />,
                index: true
            }
        ]
    }
])

const router = createBrowserRouter(mainRouter);

export default router;