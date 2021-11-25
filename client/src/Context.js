import React, { createContext, useContext, useState } from "react"

  
export const GlobalStateContext = createContext()

export function useGlobalState() {
    return useContext(GlobalStateContext)
}

export function GlobalStateProvider({children}) {
    const [contractAddress, setContractAddress] = useState('Loading...')
    const [showLoading, setShowLoading] = useState(false)

    return (
        <GlobalStateContext.Provider value={{contractAddress, setContractAddress, showLoading, setShowLoading}}>
            {children}
        </GlobalStateContext.Provider>
    )
}
  