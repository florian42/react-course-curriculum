import React from "react";
import PropTypes from "prop-types";
import PostMetaInfo from "./PostMetaInfo";

// TODO: Make this recursive
export default function Comment({ comment }) {
  console.log("Comment", comment);
  const nestedComments = (comment.children || []).map(comment => {
    return <Comment comment={comment} />;
  });
  return (
    <React.Fragment>
      <div className="comment">
        <PostMetaInfo
          comment={true}
          by={comment.by}
          time={comment.time}
          id={comment.id}
          descendants={comment.descendants}
        />
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
      </div>
      {nestedComments}
    </React.Fragment>
  );
}
