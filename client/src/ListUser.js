import React, { useEffect, useState } from "react";
import {Table,Button,Image} from 'react-bootstrap';
import { BASE_URL } from './config';

function ListUser(props) {
  const [users,setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     await fetch(`${BASE_URL}users`)
     .then(res=>res.json())
        .then((res) => {
          setUsers(res.data)
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div className="w-75 pt-5 m-auto">
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Profile Picture</th>
            <th colSpan='2'></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(val=>(
              <tr>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.salary}</td>
              <td> <Image src={BASE_URL+val.profile_pic} style={{width:"50px"}} roundedCircle /></td>
              <td> <Button variant="outline-info" className="mr-2">Edit</Button>
               <Button variant="outline-danger" className="ml-2">Delete</Button></td>
            </tr>
            ))
          }       
        </tbody>
      </Table>
    </div>
  );
}

export default ListUser;
