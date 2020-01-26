import React from "react";
import { css } from "@emotion/core";
import PropTypes from "prop-types";
import { fetchMainPosts } from "../utils/api";
import HashLoader from "react-spinners/HashLoader";
import PostsList from "./PostsList";

const override = css`
  display: block;
  margin: 0 auto;
`;

export default class Posts extends React.Component {
  state = {
    posts: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetch();
    }
  }

  handleFetch() {
    this.setState({
      posts: null,
      error: null,
      loading: true
    });

    fetchMainPosts(this.props.type)
      .then(posts =>
        this.setState({
          posts,
          loading: false,
          error: null
        })
      )
      .catch(({ message }) =>
        this.setState({
          error: message,
          loading: false
        })
      );
  }

  render() {
    const { posts, error, loading } = this.state;

    if (loading) {
      return <HashLoader css={override} />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return <PostsList posts={posts} />;
  }
}

Posts.propTypes = {
  type: PropTypes.oneOf(["top", "new"])
};
