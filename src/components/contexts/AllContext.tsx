import { createContext, ReactNode, useState } from 'react';

interface AllContextData {
    token: string;
    updateToken:(token:string) => void;
}

interface AllProviderProps {
    children: ReactNode;        
}



export const AllContext = createContext({} as AllContextData);

export function AllProvider({ children }: AllProviderProps) {
    const [token, setToken] = useState('');

    function updateToken(token: string){        
        setToken(token);
    }

    return (
        <AllContext.Provider
            value={{
                token,
                updateToken                
            }}            
        >
            {children}
        </AllContext.Provider>
    )
}