import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../routes/MainPage';
import MainLayout from '../routes/MainLayout';
import LoginPage from '../routes/user/LoginPage';
import SignupPage from '../routes/user/SignupPage';
import StockDetailPage from '../routes/stockDetail/StockDetailPage';
import PortfolioPage from '../routes/portfolioDetail/PortfolioPage';

export const mainRouter = [
    {
        path: '',
        element: <MainLayout />,
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
                index: true,
            },
            {
                path: '/portfolio',
                element: <PortfolioPage/>,
                index: true,
            },
            {
                path: '/stocks',
                children: [
                    {
                        path: ':id',
                        element: <StockDetailPage />,
                        index: true,
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(mainRouter);

export default router;
