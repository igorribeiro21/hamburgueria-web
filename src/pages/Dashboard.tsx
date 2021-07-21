import React, { useContext } from 'react';
import { AllContext } from '../components/contexts/AllContext';
import SideMenu from '../components/SideMenu';
import User from '../components/User';
import '../styles/pages/Dashboard.css';

export function Dashboard() {

    const { token } = useContext(AllContext);

    return (
        <div className='DashboardContainer'>
            <div>
                <SideMenu />
            </div>
            <div>
                <User />
            </div>
        </div>
    )
}


export default Dashboard;