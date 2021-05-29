import React, {forwardRef } from 'react'
import './Story.css';
import Avatar from "@material-ui/core/Avatar";

const Story = forwardRef(
    ({username}, ref) => {
    return (
        <div className="story" ref={ref}>
           
          <Avatar
            className="story__avatar"
            alt={username}
            src={`https://avatars.dicebear.com/api/human/${username}.svg?mood[]=happy`}
          />
          <p>{username}</p>

        </div>
    )
    })

export default Story
