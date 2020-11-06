import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import CreateUser from "./CreateUser";
import ListUser from "./ListUser";
import Chat from "./Chat";
import io from 'socket.io-client';

function App() {
  const ENDPOINT = 'http://localhost:3000/';
  const [activeTab, setActiveTab] = useState("1");
  const socketId = io(ENDPOINT);
  socketId.emit('USER_IDENTIFICATION', { data: '0' });
  localStorage.debug = '*';
  return (
    <div>
      <Nav
        variant="pills"
        defaultActiveKey="1"
        onSelect={(e) => {
          setActiveTab(e);
        }}
        className="flex-rows pt-3 pb-2 pl-5 border"
      >
        <Nav.Link eventKey="1">Create</Nav.Link>
        <Nav.Link eventKey="2">List</Nav.Link>
        <Nav.Link eventKey="3">Chat</Nav.Link>
      </Nav>
      {activeTab === "1" ? (
        <CreateUser />
      ) : activeTab === "2" ? (
        <ListUser />
      ) : activeTab === "3" ? (
        <Chat socket={socketId} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App; 
