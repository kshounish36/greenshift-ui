// Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LoginCard = styled.div`
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: white;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

export const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setLoggedIn(true);
      navigate("/price-details");
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Log In</Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};
