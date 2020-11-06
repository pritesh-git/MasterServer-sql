import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, ListGroup, Image,InputGroup,FormControl,Button } from "react-bootstrap";
import { BASE_URL } from "./config";
import Axios from 'axios';
import io from 'socket.io-client';
let socket = io.connect('http://localhost');

function Chat(props) {
  const [users, setUsers] = useState([]);
  const [mySelf,setMyself] = useState(null);
  const [other,setOther] = useState({});
  const [flag,setFlag] = useState(false);
  const [msg,setMsg] = useState('');
  const [chatList,setChatList] = useState([]);
  
  // const ENDPOINT = 'localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${BASE_URL}users`)
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.data);
          setOther(res.data[0])
          setFlag(true)
        })
        .catch((err) => console.log(err));  
    };
    fetchData();
    setMyself(prompt('Enter Id'))
    
    // socket = io(ENDPOINT);

    socket.emit('join', { name:mySelf, room:'1' }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [mySelf]);
   // this useEffect is used for handling messages
   useEffect(()=>{
    socket.on('message', msg => {
      setChatList(chatList => [ ...chatList, msg ]);
    });
}, []);

  const getChatList =()=>{
    Axios.post(`${BASE_URL}allChat`,{toUser:mySelf,fromUser:other.id})
    .then((res=>{setChatList(res.data.data)}))
    .catch(err=>console.log(err))
  }

const handleMsg=(e)=>{
  e.preventDefault();
  setMsg(e.target.value);
}
const handleSubmit=()=>{
  console.log(mySelf,'=send=>',msg,'=to=>',other.id);
  var chats ={
    fromUser:mySelf,
    toUser:other.id,
    msg:msg,
  }
  Axios.post(`${BASE_URL}createChat`,chats)
    .then((res=>{getChatList(); setMsg('')}))
    .catch((err=>console.log(err)));

    // socket.emit('sendMessage', msg);

    }

  const handleClick=(val)=>{
    if(mySelf==null) setMyself(prompt('Enter Name'))
    else {
      setOther(val)
      console.log(mySelf,'==>', val)}
      getChatList();
  }
  return (
    <div>
      <Container fluid>
        <Row>
          <Col
            sm={3}
            style={{ height: "90vh", overflow: "auto" }}
            className="border p-3"
          >
            <ListGroup>
              {users.map((val) => (
                <ListGroup.Item onClick={()=>handleClick(val)}>
                  <Image
                    src={BASE_URL + val.profile_pic}
                    style={{ width: "50px", marginRight: "10px" }}
                    roundedCircle
                  />
                  {val.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={9} style={{ height: "90vh" }} className="border p-4">
           {flag ?
            <Container className="border">
              <Row><Col style={{width:"100px"}} className="p-2 bg-primary rounded-lg"> <Image
                    src={BASE_URL + other.profile_pic}
                    style={{ width: "50px", marginRight: "10px" }}
                    roundedCircle
                  />
                  <b style={{fontSize:"25px"}}>{other.name}</b></Col></Row>
              <Row>
                <Col style={{ width: "100%", maxHeight: "70vh",overflow:'auto' }}>
                  <ListGroup className="w-100">
                    {chatList.map((val) => (
                      <>
                        <ListGroup.Item
                          className={val.fromUserId != mySelf?"text-left":"text-right"}
                          style={{ border: "none" }}
                        >
                          <b className="border p-2 bg-info rounded-lg">
                           {val.msg}
                          </b>
                        </ListGroup.Item>
                      </>
                    ))}{" "}
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                {" "}
                <InputGroup className="m-3">
                  <FormControl
                    placeholder="Type your message here."
                    aria-label="Type your message here."
                    aria-describedby="basic-addon2"
                    value={msg}
                    onChange={handleMsg}
                  />
                  <InputGroup.Append>
                    <Button variant="info" onClick={handleSubmit}>Send</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Row>
            </Container>:''}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
