import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchPosts} from "../../actions/postActions";
import PropTypes from "prop-types";
// import PosstForm from "./postform";
import {Link} from 'react-router-dom';
// import {loadingAnimation} from "./post";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.newPost) {
  //     this.props.posts.unshift(newProps.newPost);
  //   }
  // }

  render() {
    const {posts} = this.props;
    // const {posts, loading} = this.props;
    const postList = posts.map(post => (
        <div className="card m-5" key={post.id}>
          <div className="card-body">
            <h4 className="card-title"><Link to={`posts/${post.id}`}>{post.title}</Link></h4>
            {/*<p className="card-text">{post.body}</p>*/}
          </div>
        </div>
    ));
    return (
        <div>
          {/*<PosstForm/>*/}
          <div className="w-100"></div>
          <h1>Post class</h1>
          {/*{loading ? loadingAnimation : postList}*/}
          {postList}
        </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  // newPost: PropTypes.object
};
const mapStateToProps = state => ({
  posts: state.posts.items,
  // newPost: state.posts.item
});
const actionCreator = {
  fetchPosts
};
export default connect(
    mapStateToProps,
    actionCreator
)(Posts);