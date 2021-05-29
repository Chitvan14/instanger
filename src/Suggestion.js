import React from "react";
import "./Suggestion.css";
import Avatar from "@material-ui/core/Avatar";

function Suggestion({ suggestionUsername }) {
  return (
    <>
    <div className="suggestion">
      <Avatar
        className="suggestion__avatar"
        alt={suggestionUsername}
        src={`https://avatars.dicebear.com/api/human/${suggestionUsername}.svg?mood[]=happy`}
      />
      <h5>{suggestionUsername}</h5>
      <p>Follow</p>
    
    </div>
     
    </>
  );
}

export default Suggestion;
