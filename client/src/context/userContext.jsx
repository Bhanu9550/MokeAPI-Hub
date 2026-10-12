import { createContext, useState, useEffect } from "react";
import api from "../configure/axiosInstance";

const UserContext = createContext(null)

const UserProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function getUser(){
            try{
                const response = await api.get('/me')
                setUser(response.data)
            }catch{
                setUser(null)
            }finally{
                setLoading(false)
            }
        }
        getUser()
    },[])

    return (
        <UserContext.Provider value={{ user , setUser, loading}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext;
export {UserProvider}