import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../routes/MainPage';


export const mainRouter = ([
    {
        path: '/',
        element: <MainPage />,
        index: true
    }
])

const router = createBrowserRouter(mainRouter);

export default router;