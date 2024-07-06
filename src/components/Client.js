import React from 'react'
import Avatar from 'react-avatar';
const Client = ({ username }) => {
       return (
              <div className="client">
                     <Avatar username={username} size={50} round="15px" />
                     <span className="userName">{username}</span>
              </div>
       )
}

export default Client