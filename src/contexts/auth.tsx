import { createContext, ReactNode, useState, useEffect } from "react";
import api from "../components/api";
import io from "socket.io-client"

type User = {
    id: number,
    nome: string,
    email: string
}

type AuthContextData = {
    user: User | null,
    Register: Function,
    Login: Function,
    Send: Function
}

export const AuthContext = createContext({} as AuthContextData)

const socket = io("https://chat-applicationback.herokuapp.com/", { transports: ["websocket"]})

type AuthProvider = {
    children: ReactNode
}

interface IRegisterProps{
    nome: string,
    senha: string,
    email: string
}
interface ILoginProps{
    email: string,
    senha: string,
}

export function AuthProvider(props: AuthProvider){
    const [ user, setUser ] = useState<User | null>(null)

    async function Register({nome, email, senha}: IRegisterProps){
        const response = await api.post("/Register", {
            nome, email, senha
        })

        if (response.data){
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("nome", response.data.user.nome)
            setUser(response.data.user)
            return true
        }
        return false
    }

    async function Login({ email, senha }: ILoginProps){
        const response = await api.post("/Authenticate", {
            email, senha
        })

        if (response.data){
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("nome", response.data.user.nome)
            setUser(response.data.user)
            return true
        }
        return false
    }

    async function Send(message: string){
        if (message){
            socket.emit("message_front", [message, user ? user.nome : ""])

            api.post("/SendMessage", {
                username: user ? user.nome : "", message: message
            })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error.response))  
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token){
            api.post("TokenVerify", {
                token: token
            })
            .then((response => {
                setUser(response.data.user)
            }))
            .catch((error) => console.log(error.response.data.error))
        }
    }, []) 

    return (
        <AuthContext.Provider value={{ user, Register, Login, Send }}>
            {props.children}
        </AuthContext.Provider>
    )
}