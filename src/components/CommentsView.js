import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../utils/api.js'
import {withRouter} from 'react-router-dom';
import {addNewComment, deleteComment, editComment, upVoteComment, downVoteComment} from '../actions/comments'
import serializeForm from 'form-serialize'
import {v4} from 'uuid'
import sortBy from 'sort-by'
import {RIETextArea} from 'riek'
import _ from 'lodash'

const DisplayAllComments = (props) => {
  return (props.comments.map((comment) => (
    <div key={comment.id}>
      <RIETextArea
        value={comment.body}
        change={(value) => props.editComment({id: comment.id, newValue: value})}
        propName='body'
        validate={_.isString}
        className='col-md-12'/>
      <p className="col-md-12">
        Votes:{comment.voteScore}
      </p>
      <p className="col-md-12">
        Author: {comment.author}
      </p>
      <p className="col-md-12">
        Time: {comment.timestamp}
      </p>
      <button
        className="btn btn-primary"
        onClick={() => props.upVoteComment(comment.id)}>Upvote</button>
      <button
        className="btn btn-warning"
        onClick={() => props.downVoteComment(comment.id)}>Downvote</button>
      <button
        className="btn btn-danger"
        onClick={() => props.deleteComment(comment.id)}>Delete Comment</button>
    </div>
  )))
}

const AddComment = (props) => {
  return (
    <form className="form-inline" id="comment-data" onSubmit={props.handleSubmit}>
      <input type="text" name="body" placeholder="Type a comment..."></input>
      <input type="text" name="author" placeholder="author"></input>
      <input type="submit" value="Submit"/>
    </form>
  )
}

class Comments extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv4 = v4
    const values = serializeForm(event.target, {hash: true})
    values["timestamp"] = Date.now()
    values["id"] = uuidv4()
    values["parentId"] = this.getPostById(this.props.posts, this.props.match.params.id)[0].id
    this.props.addComment(values)
  }

  filterCommentsByPost = (comments, postId) => {
    return comments.filter((comment) => comment.parentId === postId && comment.deleted === false && comment.parentDeleted === false)
  }

  getPostById = (posts, id) => {
    return posts.filter((post) => post.id === id && post.deleted === false)
  }

  sortCommentsByHighScore = (comments) => {
    return comments
      .slice()
      .sort(sortBy('-voteScore'))
  }

  render() {
    let post = this.getPostById(this.props.posts, this.props.match.params.id)
    let comments = []
    if (post.length > 0) {
      comments = this.sortCommentsByHighScore(this.filterCommentsByPost(this.props.comments, this.props.match.params.id))
    }
    return (
      <div className="row">
        {post.length > 0 && (
          <div className="col-lg-12">
            <h3>
              Comments
            </h3>
            <DisplayAllComments
              comments={comments}
              editComment={this.editComment}
              upVoteComment={this.props.upVoteComment}
              downVoteComment={this.props.downVoteComment}
              deleteComment={this.props.deleteComment}/>
            <AddComment handleSubmit={this.handleSubmit}/>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {comments: state.comments, posts: state.posts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => dispatch(addNewComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    upVoteComment: (data) => dispatch(upVoteComment(data)),
    downVoteComment: (data) => dispatch(downVoteComment(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))
