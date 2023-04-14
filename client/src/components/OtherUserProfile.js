import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_BY_ID, GET_USER_PROFILE } from "../gqlOperations/queries.js";
import { useNavigate, useParams } from "react-router-dom";

export const OtherUserProfile = () => {
    const { userId } = useParams();
    console.log(userId);
  const { loading, error, data } = useQuery(GET_USER_BY_ID,{
    variables:{
        userId
    }
  });
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
  }
  return (
    <div className="container my-container">
      {data && data.user && (
        <>
          <div className="center-align">
            <img
              style={{ border: "2px solid", margin: "20px" }}
              src={`https://robohash.org/${data.user.firstName}.png?size=300x300`}
              alt="pic"
            />
            <h5>
              {data.user.firstName} {data.user.lastName}
            </h5>
            <h6>Email - {data.user.email}</h6>
          </div>
          <h4>Your Quotes</h4>
          {data &&
            data.user &&
            data.user.quotes &&
            data.user.quotes.map((quote) => {
              return (
                <blockquote>
                  <h6>{quote.name}</h6>
                  <p className="right-align">
                    {data.user.firstName} {data.user.lastName}
                  </p>
                </blockquote>
              );
            })}
        </>
      )}
    </div>
  );
};
