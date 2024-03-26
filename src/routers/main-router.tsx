import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../routes/MainPage';
import MainLayout from '../routes/MainLayout';
import LoginPage from '../routes/user/LoginPage';
import SignupPage from '../routes/user/SignupPage';
import StockDetailPage from '../routes/stockDetail/StockDetailPage';
import PortfolioPage from '../routes/portfolioDetail/PortfolioPage';
import PortfolioEdit from '../routes/portfolioDetail/PortfolioEdit';
import QuizTestPage from '../routes/quiz/QuizTestPage';
import QuizMainPage from '../routes/quiz/QuizMainPage';
import StockPage from '../routes/stock/StockPage';
import CommunityPage from '../routes/stockDetail/CommunityPage';
import MyPage from '../routes/user/MyPage';
import { Provider } from 'react-redux';
import stockDetailStore from '../store/stockDetailStore';
import MainRenewPage from '../routes/MainRenewPage';

export const mainRouter = [
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <MainRenewPage />,
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
                path: '/my',
                element: <MyPage />,
                index: true,
            },
            {
                path: '/quiz',
                element: <QuizMainPage />,
                index: true,
            },
            {
                path: '/stocks',
                element: <StockPage />,
                index: true,
            },
            {
                path: '/portfolio',
                children: [
                    {
                        path: '',
                        element: <PortfolioPage />,
                        index: true,
                    },
                    {
                        path: 'edit',
                        element: <PortfolioEdit />,
                        index: true,
                    },
                    {
                        path: 'create',
                        element: <PortfolioEdit />,
                        // index: true,
                    },
                ],
            },
            {
                path: '/stocks',
                children: [
                    {
                        path: ':id',
                        element: (
                            <Provider store={stockDetailStore}>
                                <StockDetailPage />
                            </Provider>
                        ),
                        index: true,
                    },
                    {
                        path: ':id/community',
                        element: <CommunityPage />,
                        index: true,
                    },
                ],
            },
        ],
    },
    {
        path: '/quiztest',
        element: <QuizTestPage />,
        index: true,
    },
];

const router = createBrowserRouter(mainRouter);

export default router;
