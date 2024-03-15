import Navbar from '../components/common/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';

export default function MainLayout() {
    return (
        <>
            <AppShell header={{ height: 1 }} navbar={{ width: '200px', breakpoint: 'sm' }}>
                <AppShell.Navbar component={Navbar} />
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </>
    );
}
