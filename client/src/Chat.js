import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Image,InputGroup,FormControl,Button } from "react-bootstrap";
import { BASE_URL } from "./config";

function Chat(props) {
  const [users, setUsers] = useState([]);
  const [mySelf,setMyself] = useState(null);
  const [other,setOther] = useState({});
  const [flag,setFlag] = useState(false);
  // const [line,setLine] = useState();
  // const [chatList,setChatList] = useState({});
  // const { socket } = props;

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
  }, []);

  const getChatList =()=>{
    Axios.post(`${BASE_URL}allChat`,{toUser:'1',fromUser:'2'})
    .then((res=>console.log(res)))
    .catch(err=>console.log(err))
  }

  // socket.emit('USER_IDENTIFICATION', { data: mySelf });
  // socket.emit('LIST_ONLINE_USERS', data => {});
  // socket.on('LIST_ONLINE_USERS', data => {
  //   let onlineUsers = data.data.users,
  //     isOnline = '';
  //   for (let i = 0, len = onlineUsers.length; i < len; i++) {
  //     onlineUsersMapping[onlineUsers[i].userId] = 'Online';
  //     if (onlineUsers[i].userId == other.id) {
  //       isOnline = 'Online';
  //     }
  //   }
  //   setLine(isOnline);
  // });

  // socket.on('MESSAGE_' + mySelf, response => {
  //   if (response.data.userId != mySelf || other.id == mySelf) return;
  //   let chats =chatList;
  //   chats.push({
  //     direction: this.state.messageDirection == 'R2C' ? 'C2R' : 'R2C',
  //     message: response.data.message,
  //     type: 'text',
  //   });
  //   Axios.post(`${BASE_URL}createChat`,chats)
  //   .then((res=>console.log(res)))
  //   .catch((err=>console.log(err)))
  // });

  const handleClick=(val)=>{
    if(mySelf==null) setMyself(prompt('Enter Name'))
    else {
      setOther(val)
      console.log(mySelf,"to==>", val)}
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
                    {Array.from({ length: 40 }).map((_, index) => (
                      <>
                        <ListGroup.Item
                          className="text-left"
                          style={{ border: "none" }}
                        >
                          <b className="border p-2 bg-info rounded-lg">
                            {" "}
                            test msg {index}{" "}
                          </b>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className="text-right"
                          style={{ border: "none" }}
                        >
                          <b className="border p-2 bg-info rounded-lg">
                            {" "}
                            test msg {index}{" "}
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
                  />
                  <InputGroup.Append>
                    <Button variant="info">Send</Button>
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
