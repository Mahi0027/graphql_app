import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../gqlOperations/queries.js";
import { Link } from "react-router-dom";

export const Home = () => {
  const {loading, error, data} = useQuery(GET_ALL_QUOTES);
  if(loading) return <h1>Loading...</h1>
  if(error) {
    console.log(error);
    return <h1>Error: {error}</h1>
  }
  if(data.quotes.length === 0) {
    return <h3>No Quotes Available</h3>
  }
  // useEffect(() => {
  //   fetch("http://localhost:4000/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `query getAllQuotes{
  //                 quotes{
  //                   name
  //                   by
  //                 }
  //               }`,
  //       // variable: {
  //       //   userId:"sdfsd"
  //       // }
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // });
  return (
    <div className="container my-container">
        {data.quotes.map(quote => {
          return (
            <blockquote key={quote.by}>
              <h6>{quote.name}</h6>
              <Link to={`/profile/${quote.by}`}>
                <p className="right-align">
                  ~{quote.creator.firstName} {quote.creator.lastName}
                </p>
              </Link>
            </blockquote>
          );
        })}

    </div>
  );
};
