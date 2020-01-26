import queryString from "query-string";
import { css } from "@emotion/core";
import React from "react";
import { fetchComments, fetchItem } from "../utils/api";
import Comment from "./Comment";
import HashLoader from "react-spinners/HashLoader";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";

const override = css`
  display: block;
  margin: 0 auto;
`;

export default class Post extends React.Component {
  state = {
    post: null,
    loadingPost: true,
    comments: null,
    loadingComments: true,
    error: null
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchItem(id)
      .then(post => {
        this.setState({ post, loadingPost: false });

        return fetchComments(post.kids || []);
      })
      .then(comments =>
        this.setState({
          comments,
          loadingComments: false
        })
      )
      .catch(({ message }) =>
        this.setState({
          error: message,
          loadingPost: false,
          loadingComments: false
        })
      );
  }

  render() {
    const { post, loadingPost, comments, loadingComments, error } = this.state;

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    console.log("comments in post", comments);
    return (
      <React.Fragment>
        {loadingPost === true ? (
          <HashLoader css={override} />
        ) : (
          <React.Fragment>
            <h1 className="header">
              <Title url={post.url} title={post.title} id={post.id} />
            </h1>
            <PostMetaInfo
              by={post.by}
              time={post.time}
              id={post.id}
              descendants={post.descendants}
            />
            <p dangerouslySetInnerHTML={{ __html: post.text }} />
          </React.Fragment>
        )}
        {loadingComments === true ? (
          loadingPost === false && <HashLoader css={override} />
        ) : (
          <React.Fragment>
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
