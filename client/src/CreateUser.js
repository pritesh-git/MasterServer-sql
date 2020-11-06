import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { BASE_URL } from "./config";

function CreateUser(props) {
  const [data, setData] = useState({});
  const [file,setFile] = useState(null);

  const handleChange = (e) => {
    var temp = data;
    temp[e.target.name] = e.target.value;
    setData(temp);
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
if(data.name && data.email && data.password && data.salary && file)
    {    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("salary", data.salary);

    Axios.post(`${BASE_URL}newUser`, formData)
      .then((res) =>{alert("Data Inserted")})
      .catch((err) => console.log(err));}
      else{
        alert("Fill All Inputs!!!")
      }
  };

  return (
    <div className="pt-5">
      <Form className="w-50 m-auto shadow-lg p-3 rounded-lg">
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            onChange={handleChange}
            value={data.name}
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={handleChange}
            value={data.password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Salary</Form.Label>
          <Form.Control
            name="salary"
            type="text"
            onChange={handleChange}
            value={data.salary}
            placeholder="Salary"
          />
        </Form.Group>
        <Form.Group>
          <Form.File id="imageFile" name="profile_pic" onChange={handleFile} label="Profile Picture" />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateUser;
