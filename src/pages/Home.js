import React from 'react'
import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Home = () => {
       const navigate = useNavigate();
       const [roomId, setRoomId] = useState('');
       const [username, setUsername] = useState('');
       const createNewRoom = (e) => {
              e.preventDefault();
              const id = uuidV4();
              setRoomId(id);
              toast.success('Room Id Created successfully');
       };
       const joinRoom = () => {
              if (!roomId || !username) {
                     toast.error('ROOM ID & usernames are required');
                     return;
              }

              // Redircet 
              navigate(`/editor/${roomId}`, {
                     state: {
                            username,
                     }
              });
       }
       const handelInputEnter = (e) => {
              if (e.code === 'Enter') {
                     joinRoom();
              }
       };

       return (
              <div className="homePageWrapper">
                     <div className="formWrapper">
                            <img src="/code-sync.png" alt="logo" />
                            <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
                            <div className="inputGroup">
                                   <input type="text" className="inputBox" placeholder='ROOM ID'
                                          value={roomId}
                                          onChange={(e) => setRoomId(e.target.value)}
                                          onKeyUp={handelInputEnter} />

                                   <input type="text" className="inputBox" placeholder='USERNAME'
                                          onChange={(e) => setUsername(e.target.value)} onKeyUp={handelInputEnter} />

                                   <button className="btn joinBtn" onClick={joinRoom}>Join</button>
                                   <span className="createInfo">
                                          If you don't have an invite then create &nbsp;
                                          <a onClick={createNewRoom} href="createNewBtn">new room</a>
                                   </span>

                            </div>
                     </div>
                     <footer>
                            <h4>
                                   Built with 💛 &nbsp; by &nbsp;
                                   <a href="https://github.com/raj1828">DefLO</a>
                            </h4>
                     </footer>
              </div>
       )
}

export default Home