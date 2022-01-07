import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Navigate } from 'react-router'
import styles from "./style.module.css"
import Message from '../../components/message/Message'
import api from '../../components/api'
import io from "socket.io-client"

type IMessage = {
    username: string,
    message: string,
    id: number
}

function chat() {
    const { user, Send } = useContext(AuthContext)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        if(!user){
            <Navigate to="/"/>
        }

        const list: IMessage[] = []

        api.get("/GetMessages")
        .then((response) => {
            setMessages(response.data.messages)
            response.data.messages.map((message: IMessage) => list.push({id: message.id, username: message.username, message: message.message}))
        })

        const socket = io("https://chat-applicationback.herokuapp.com/", { transports: ["websocket"]})

        socket.on("message_back", (data) => {
            list.push({id: Number(Math.random() * 100000), username: data[1], message: data[0]})
            setMessages([])
            setMessages(list)
            document.getElementById(styles.messages)?.scrollTo(0, Number(document.getElementById(styles.messages)?.scrollHeight) + 100)
        })
    }, [])

    function SendMessage(){
        if (message){
            Send(message)
            setMessage("")
        }
    }

    return (
        <main>
            <div id={styles.conteudo}>
                <div id={styles.messages}>
                    {messages.map((message: IMessage) => <Message key={message.id} from={user? user.nome : ''} user={message.username} message={message.message}/>)}
                </div>
                <div id={styles.input}>
                    <input type="text" id={styles.message} onChange={(e) => setMessage(e.target.value)} value={message}/>
                    <button onClick={SendMessage}>Send</button>
                </div>
            </div>
        </main>
    )
}

export default chat
