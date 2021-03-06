/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';
import './Chat.css'

function ChatList({ userId }) {
    const [groupMessages, setGroupMessages] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/message/self', {
                withCredentials: true,
            })
            .then((res) => {
                let data = res.data;
                data.forEach((item) => {
                    item.bigChat = false;
                });
                setGroupMessages(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function embiggen(index, active) {
        let tempGroupMessages = [...groupMessages];

        tempGroupMessages[index].bigChat = active;
        setGroupMessages(tempGroupMessages);
    }
    
    function getOtherUser(groupMessage) {
        const user = groupMessage.users.find((user) => userId !== user._id);
        return user.firstName + ' ' + user.lastName;
    }

    return (
        <div className='chatlist'>
            <h3>Your Messages:</h3>
            {groupMessages.map((groupMessage, index) => (
                <>
                    <div
                        key={index}
                        onClick={() => {
                            embiggen(index, true);
                        }}
                        className='onechat'
                    >
                        <p>
                            Conversation with: {getOtherUser(groupMessage)}
                        </p>
                    </div>
                    {groupMessage.bigChat && (
                        <ChatBox
                            groupId={groupMessage._id}
                            userId={userId}
                            index={index}
                            embiggenChat={embiggen}
                        />
                    )}
                </>
            ))}
        </div>
    );
}

export default ChatList;
