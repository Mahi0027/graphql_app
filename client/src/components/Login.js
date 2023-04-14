import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqlOperations/mutations.js";
import { GET_USER_PROFILE } from "../gqlOperations/queries.js";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { loading, data, error }] = useMutation(LOGIN_USER, {
    refetchQueries: ["getAllQuotes", "getUserProfile"],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signinUser({
      variables: {
        userCredential: formData,
      },
    });
  };
  if (loading) return <h1>Loading...</h1>;
  if (data) {
    localStorage.setItem("token", data.user.token);
    navigate("/");
  }
  return (
    <div className="container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Don't have an account?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
