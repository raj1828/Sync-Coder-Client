import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
       const location = useLocation();
       const { roomId } = useParams;
       const socketRef = useRef(null)
       const reactNavigator = useNavigate();
       const [clients, setClients] = useState([


       ]);

       useEffect(() => {
              const init = async () => {
                     socketRef.current = await initSocket();
                     socketRef.current.on('connect_error', (err) => handleErrors(err));
                     socketRef.current.on('connect_failed', (err) => handleErrors(err));

                     function handleErrors(e) {
                            console.log('socket error', e);
                            toast.error('Socket connection failed, try again later.');
                            reactNavigator('/');
                     }
                     socketRef.current.emit(ACTIONS.JOIN, {
                            roomId,
                            username: location.state?.username,
                     });

                     // Listening for joined event
                     socketRef.current.on(
                            ACTIONS.JOINED,
                            ({ clients, username, socketId }) => {
                                   if (username !== location.state?.username) {
                                          toast.success(`${username} joined the room.`);
                                          console.log(`${username} joined`);
                                   }
                                   setClients(clients);

                            }
                     );
              };
              init();
       }, [])



       if (!location.state) {
              return <Navigate to="/" />;
       }

       return (
              <div className="mainWrap">
                     <div className="aside">
                            <div className="asideInner">
                                   <div className="logo">
                                          <img src="/code-sync.png" alt="" className="logoImage" />
                                   </div>
                                   <h3>Connected</h3>
                                   <div className="clientList">
                                          {
                                                 clients.map((client) => (<Client key={client.socketId} username={client.username} />))
                                          }
                                   </div>
                            </div>
                            <button className='btn copyBtn'>Copy ROOM ID</button>
                            <button className='btn leaveBtn'>Leave</button>
                     </div>
                     <div className="editorWrap">
                            <Editor />
                     </div>
              </div>
       )
}

export default EditorPage