import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_PROFILE } from "../gqlOperations/queries.js";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  if (loading) return <h1>Profile is Loading...</h1>;
  if (error) {
    console.log(error);
  }
  return (
    <div className="container my-container">
      {data && data.profile && (
        <>
          <div className="center-align">
            <img
              style={{ border: "2px solid", margin: "20px" }}
              src={`https://robohash.org/${data.profile.firstName}.png?size=300x300`}
              alt="pic"
            />
            <h5>
              {data.profile.firstName} {data.profile.lastName}
            </h5>
            <h6>Email - {data.profile.email}</h6>
          </div>
          <h4>Your Quotes</h4>
          {data &&
            data.profile &&
            data.profile.quotes &&
            data.profile.quotes.map((quote) => {
              return (
                <blockquote>
                  <h6>{quote.name}</h6>
                  <p className="right-align">
                    {data.profile.firstName} {data.profile.lastName}
                  </p>
                </blockquote>
              );
            })}
        </>
      )}
    </div>
  );
};
