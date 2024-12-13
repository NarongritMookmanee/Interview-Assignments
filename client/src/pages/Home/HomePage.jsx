import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect, use, useRef } from 'react';
import style from './HomePage.module.css'
import './Chat.css'
import Headers from '../../components/Header/Headers.jsx';
import { getUsers } from '../../services/userServices.js';

function HomePage() {
    const navigate = useNavigate()
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const credential = useRef(JSON.parse(localStorage.getItem('usrCredential')))
    const [text, setText] = useState("")
    const chatBoxRef = useRef(null);

    useEffect(() => {
        // connect to ws server
        const socket = new WebSocket(`ws://localhost:${process.env.REACT_APP_WS_PORT}`);
        socket.onopen = () => {
            console.log("WebSocket connection established");
            if (socket.readyState === WebSocket.OPEN) {
                console.log("WebSocket is open and ready to use.");
            }
        };

        // listen msg from server
        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, pushBroadcast(event.data)]);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error observed:", error);
        };

        setWs(socket);


        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        _init_getusr()

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages])

    const _init_getusr = async () => {
        let data = await getUsers()
        data = await data.map((element) => {
            return (
                <a href="#" class="list-group-item list-group-item-action border-0">
                    <div class="d-flex align-items-start">
                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                        <div class="flex-grow-1 ml-3">
                            {element.username}
                            <div class="small"><span class="fas fa-circle chat-online"></span> { }</div>
                        </div>
                    </div>
                </a>
            )
        })
        setUsersList(data);
    }

    const sendMessage = () => {
        if (ws) {
            if (text.trim() !== "") {
                ws.send(JSON.stringify({
                    userId: credential.current.id,
                    username: credential.current.username,
                    text
                }))
            }
            setText("")
        }
    };

    const pushBroadcast = (payload) => {
        const { userId, username, text } = JSON.parse(payload)
        if (userId === credential.current.id) {
            return (
                <div class="chat-message-right pb-4">
                    <div>
                        <div class="container">
                            <div class="rows text-muted small text-nowrap mt-2 chat-message-right">
                                Me
                            </div>
                            <div class="rows flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="chat-message-left pb-4">
                    <div>
                        <div class="container">
                            <div class="rows text-muted small text-nowrap mt-2 chat-message-left">
                                {username}
                            </div>
                            <div class="rows flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (text.trim() !== "") {
                event.preventDefault();
                sendMessage()
            } else {
                setText("")
            }
        }
    }

    return (
        <div>
            <Headers home={true} edituser={false} />
            <div className={style.main}>
                <div className='mainbodychat'>
                    <main class="content">
                        <div class="container p-0">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-12 col-lg-5 col-xl-3 border-right scrollable-div">
                                        {
                                            usersList ? usersList : <p>Loading...</p>
                                        }
                                        <hr class="d-block d-lg-none mt-1 mb-0" />
                                    </div>
                                    <div class="col-12 col-lg-7 col-xl-9">
                                        <div class="py-2 px-4 border-bottom d-none d-lg-block">
                                            <div class="d-flex align-items-center py-1">
                                                <div class="flex-grow-1 pl-3">
                                                    <strong>Chat room</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="position-relative">
                                            <div class="chat-messages p-4" ref={chatBoxRef}>
                                                {messages}
                                            </div>
                                        </div>
                                        <div class="flex-grow-0 py-3 px-4 border-top">
                                            <div class="input-group">
                                                <input type="text"
                                                    class="form-control"
                                                    placeholder="Type your message"
                                                    onChange={(e) => setText(e.target.value)}
                                                    value={text}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <button class="btn btn-primary" onClick={sendMessage}>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default HomePage;