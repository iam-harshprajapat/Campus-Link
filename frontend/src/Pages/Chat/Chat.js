import React, { useEffect, useState } from 'react'
import './Chat.css'
import API from './../../Services/API';
const Chat = () => {
    const [connections, setConnections] = useState([])
    const getConnections = async () => {
        const res = await API.get('/connections')
        if (res.data.success) {
            setConnections(res.data.connections)
        }
    }
    useEffect(() => {
        getConnections();
    }, [])
    return (
        <>
            <div className="chatContainer">
                <div className="chatNames">
                    {
                        connections.map((connection) => (
                            <div className="userChat">

                            </div>
                        ))
                    }
                </div>
                <div className="chats">
                    COMMING SOON...
                    <div className="inputSent">
                        <input type="text" />
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
