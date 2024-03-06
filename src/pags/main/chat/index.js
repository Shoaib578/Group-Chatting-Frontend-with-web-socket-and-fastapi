import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Chat({ws}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate()
  const current_user_id = localStorage.getItem('user') 


  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages");
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };


  const DeleteMessage = async(message_id)=>{
    
    try {
      const response = await axios.delete(`http://localhost:8000/message/${message_id}`);
      ws.send("")
    } catch (error) {
      alert("Something Went Wrong While Deleting")
    }

  }

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const user = localStorage.getItem('user')
    try {
      const response = await axios.post("http://localhost:8000/messages", {
        user_id: user, // Assuming user_id is hardcoded for demo purposes
        content: newMessage,
      });
      setMessages([...messages, { content: newMessage, sender: "You" }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const sendMessage = () => {
    ws.send(newMessage);
   
    
  };


  useEffect(()=>{
    ws.onmessage = (e) => {
      console.log("new messages arrive")
      fetchMessages()
    };
  },[ws])
  
  return (
    <div className="container">
      <h1 className="mt-4">Chat Room</h1>
      <button className="btn btn-danger" onClick={()=>{
        localStorage.removeItem('user')
        navigate('/login')
      }
    }>Logout</button>
      <div className="card mt-4">
        <div className="card-body">
          <div className="overflow-auto" style={{ height: 400 }}>
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>{message.sender_id == current_user_id || message.sender == "You"?'You':message.sender+ ' '} <b style={{color:message.online?'green':'red'}}>{message.online?'Online':'Offline'}</b> :</strong> {message.content} {message.sender_id == current_user_id?<button className="btn btn-danger" onClick={()=>DeleteMessage(message.id)}>Delete</button>:null}

              </div>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-warning"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
