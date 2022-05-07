import { Outlet } from 'react-router-dom';
import React from 'react';

const MainLayout = () => {
    return (
        <div className="In main Layout">
            <Outlet />
        </div>
    );
};

export default MainLayout;