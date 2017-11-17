import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import * as API from '../utils/api.js'
import {getSelectedPost, deletePost, upVotePost, downVotePost, commentParentDeleted, editPostTitle, editPostBody} from '../actions/posts'
import sortBy from 'sort-by'
import {RIETextArea} from 'riek'
import _ from 'lodash'

const DisplayAllPosts = (props) => {
  return (props.posts.map((post) => <div key={post.id}>
    <RIETextArea
      value={post.title}
      change={(value) => props.editPostTitle({id: post.id, timestamp: Date.now(), newValue: value})}
      propName='title'
      validate={_.isString}
      className='col-lg-12'/> {props.showBody && (<RIETextArea
      value={post.body}
      change={(value) => props.editPostBody({id: post.id, timestamp: Date.now(), newValue: value})}
      propName='body'
      validate={_.isString}
      className='col-lg-12'/>)}
    <p className="col-md-12">
      Comments : {props.getNumOfComments(post.id)}</p>
    <p className="col-md-12">
      Votes:{post.voteScore}
    </p>
    <p className="col-md-12">
      Author: {post.author}
    </p>
    <p className="col-md-12">
      Time: {post.timestamp}
    </p>
    {props.showMoreLink && (
      <Link to={`/${post.category}/${post.id}`}>
        <p className="col-md-12">
          More
        </p>
      </Link>
    )}
    <button className="btn btn-primary" onClick={() => props.upVotePost(post.id)}>Upvote</button>
    <button className="btn btn-warning" onClick={() => props.downVotePost(post.id)}>Downvote</button>
    <button className="btn btn-danger" onClick={() => props.deletePost(post.id)}>Delete Post</button>
  </div>))
}

class Posts extends Component {
  getNumOfComments = (postid) => {
    const comments = this.props.comments
    return comments.filter((comment) => comment.parentId === postid && comment.deleted === false).length
  }


  getNumOfComments = (postid) => {
    const comments = this.props.comments
    return comments.filter((comment) => comment.parentId === postid && comment.deleted === false).length
  }

  getPostsSorted = (posts, sort) => {
    switch (sort) {
      case "BY_TIMESTAMP":
        return posts
          .slice()
          .sort(sortBy('-timestamp'))
        case "BY_HIGHESTVOTE":
        return posts
          .slice()
          .sort(sortBy('-voteScore'))
        default:
        return posts
          .slice()
          .sort(sortBy('-voteScore'))
    }
  }

  getByPostsCategory = (posts, filter) => {
    //console.log(filter)
    switch (filter) {
      case 'SHOW_ALL':
        return posts.filter((post) => post.deleted === false)
      default:
        return posts.filter((post) => post.category === filter && post.deleted === false)
    }
  }

  getPostById = (posts, id) => {
    return posts.filter((post) => post.id === id && post.deleted === false)
  }

  render() {
    let posts = []
    let showBody = false
    let showMoreLink = true
    if (this.props.match.params.id) {
      let id = this.props.match.params.id
      let category = this.props.match.params.category
      posts = this.getPostById(this.getByPostsCategory(this.props.posts, category), id)
      showBody = true
      showMoreLink = false
    } else if (this.props.match.params.category) {
      let category = this.props.match.params.category
      posts = this.getPostsSorted(this.getByPostsCategory(this.props.posts, category), this.props.postsSortBy)
    } else {
      posts = this.getPostsSorted(this.getByPostsCategory(this.props.posts, 'SHOW_ALL'), this.props.postsSortBy)
    }
    return (
      <div>
        {posts.length > 0 && (<DisplayAllPosts
          posts={posts}
          getNumOfComments={this.getNumOfComments}
          showBody={showBody}
          showMoreLink={showMoreLink}
          upVotePost={this.props.upVotePost}
          downVotePost={this.props.downVotePost}
          deletePost={this.props.deletePost}
          editPostTitle={this.props.editPostTitle}
          editPostBody={this.props.editPostBody}/>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {posts: state.posts, comments: state.comments, postsSortBy: state.postsSortBy}
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPost: (data) => dispatch(getSelectedPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    downVotePost: (data) => dispatch(downVotePost(data)),
    upVotePost: (data) => dispatch(upVotePost(data)),
    editPostTitle: (data) => dispatch(editPostTitle(data)),
    editPostBody: (data) => dispatch(editPostBody(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
