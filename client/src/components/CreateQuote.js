import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlOperations/mutations.js";
import { GET_ALL_QUOTES } from "../gqlOperations/queries.js";

export const CreateQuote = () => {
  const [quote, setQuote] = useState("");
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getUserProfile"], //This second parameter is to remove caching and call api
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quote);
    createQuote({
      variables: {
        quote,
      },
    });
  };
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.quote && (
        <div className="green card-panel">{data.quote}</div>
      )}
      <h5>Your Quote</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn #673ab7 deep-purple" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
