import React from 'react';
import { AllProvider } from './components/contexts/AllContext';
import Routes from './routes';

export default function App(){
    return (
        <AllProvider>
            <Routes />
        </AllProvider>
    )
}