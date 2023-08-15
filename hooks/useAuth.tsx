import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "@/types/user.types";
import {useAuth as useUser} from "@clerk/nextjs";

export const useAuth = () => {
    const {userId} = useUser()
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const currentUser = async() => {
            if(userId){
                const {data} = await axios.get<User>("/api/user")
                setUser(data)
            }
            setIsLoading(false)
        }
        currentUser()
    }, [userId])
    return {user, isLoading, userId}
}