import React from "react";
import PostMetaInfo from "./PostMetaInfo";

const commentStyle = depth => {
  const paddingLeft = 10 * depth;
  return {
    background: "rgba(128, 128, 128, 0.1411764705882353)",
    padding: "10px",
    margin: `10px 10px 10px ${paddingLeft}px`,
    "border-radius": "5px"
  };
};

export default function Comment({ comment }) {
  console.log("Comment", comment);
  const nestedComments = (comment.children || []).map(comment => {
    return <Comment key={comment.id} comment={comment} />;
  });
  return (
    <React.Fragment>
      <div className="comments" style={commentStyle(comment.depth)}>
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
