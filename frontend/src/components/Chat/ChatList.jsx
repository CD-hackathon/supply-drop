/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';

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

    return (
        <div>
            {groupMessages.map((groupMessage, index) => (
                <React.Fragment key={index}>
                    <div
                        key={index}
                        onClick={() => {
                            embiggen(index, true);
                        }}
                    >
                        <h4>{groupMessage.name}</h4>
                        <p>
                            Coversation with:
                            {groupMessage.users.map((user) => (
                                <span>
                                    {user.firstName} {user.lastName},
                                </span>
                            ))}
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
                </React.Fragment>
            ))}
        </div>
    );
}

export default ChatList;
