import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqlOperations/mutations.js";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [signupUser, { loading, data, error }] = useMutation(SIGNUP_USER);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  if(loading) return <h1>Loading...</h1>
  return (
    <div className="container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.user && (
        <div className="green card-panel">
          {data.user.firstName} {data.user.lastName} is signup. You can login now.
        </div>
      )}
      <h5>Sign Up!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
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
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
