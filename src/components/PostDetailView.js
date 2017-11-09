import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api.js'
import { getSelectedPost, addComment, deleteComment, deletePost, commentParentDeleted, editPost, editComment, updatePostVotes, updateCommentVotes} from '../actions/'
import sortBy from 'sort-by'
import ClickToEdit from 'react-click-to-edit'
import serializeForm from 'form-serialize'
import { v4 } from 'uuid'


function AddComment(props){
  return (
  <form  id="comment-data" onSubmit={props.handleSubmit}>
      <input type="text" name="body" placeholder="Type a comment..."></input>
      <input type="text" name="author" placeholder="author"></input>
      <input type="submit" value="Submit" />
  </form>
)
}


class PostDetailView extends Component {
  getPath = (id) => {
    return id.slice(7,)
  }

  componentDidMount(){
    let id = this.getPath(this.props.id)
    this.props.selectedPost(id)
    API.getComments(id).then((comments) => (
      comments.map((comment) => this.props.addComment(comment))
    ))
  }

  deletePost = (id) => {
    API.deletePost(id).then((post) => (
      this.props.deletePost({id: post.id, deleted: post.deleted})
      &&
      this.props.commentParentDeleted({id: post.id, parentDeleted: post.deleted})
    ))
  }

  deleteComment = (id) => {
    API.deleteComment(id).then((comment) => (
      this.props.deleteComment({id: comment.id, deleted: comment.deleted})
    ))
  }

  editPostBody = ({postid,newValue}) => {
    API.updatePost(postid,{'body':newValue}).then((data) =>
    this.props.editPost({
      id: data.id,
      attribute: 'BODY',
      value: data.body
    }))
  }

  editCommentBody = ({id,newValue}) => {
    console.log(id,newValue)
    API.updateComment(id,{'timestamp':Date.now(),'body':newValue}).then((data) =>
    this.props.editComment({
      id: data.id,
      attribute: 'BODY',
      value: data.body,
      timestamp: data.timestamp,
    }))
  }


  upVotePost = (postid) => {
    const upVote = {'option':'upVote'}
    API.updatePostVote(postid,upVote).then((data) => (
      this.props.updatePostVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  downVotePost = (postid) => {
    const downVote = {'option':'downVote'}
    API.updatePostVote(postid,downVote).then((data) => (
      this.props.updatePostVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  upVoteComment = (postid) => {
    const upVote = {'option':'upVote'}
    API.updateCommentVote(postid,upVote).then((data) => (
      this.props.updateCommentVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  downVoteComment = (postid) => {
    const downVote = {'option':'downVote'}
    API.updateCommentVote(postid,downVote).then((data) => (
      this.props.updateCommentVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv4 = v4
    const values = serializeForm(event.target, {hash: true})
    values["timestamp"] = Date.now()
    values["id"] = uuidv4()
    values["parentId"] = this.props.post[0].id
    API.addComment(values).then((d) =>
      (this.props.addComment(d))
    )
  }

  render(){
    console.log(this.props)
    return(
      <div>
        {
          this.props.post.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <ClickToEdit
                endEditing={(value) => this.editPostBody({
                  postid: post.id,
                  newValue: value
                })}
                >
                {post.body}
                </ClickToEdit>
              <h5> Author: {post.author} Votes:{post.voteScore} Time: {post.timestamp} </h5>
              <a onClick={() => this.upVotePost(post.id)}>Upvote</a>
              <a onClick={() => this.downVotePost(post.id)}>Downvote</a>
              <a onClick={() => this.deletePost(post.id)}>Delete</a>
            </div>
          ))
        }
        <h3>All Comments</h3>
        {
          this.props.comments.map((comment) => (
            <div key={comment.id}>
            <ClickToEdit
              endEditing={(value) => this.editCommentBody({
                id: comment.id,
                newValue: value
              })}
              >
              {comment.body}
              </ClickToEdit>
            <h5> Author: {comment.author} Votes:{comment.voteScore} Time: {comment.timestamp} </h5>
              <a onClick={() => this.upVoteComment(comment.id)}>Upvote</a>
              <a onClick={() => this.downVoteComment(comment.id)}>Downvote</a>
            <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
            </div>
          ))
        }
        <AddComment handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

const getByPostsId = (posts,filter) => {
  switch(filter){
    default:
      return posts.filter((post) => post.id === filter && post.deleted == false)
  }
}

const sortComments = (comments, sort) => {
  switch(sort){
    case "BY_TIMESTAMP":
      return comments
    default:
      return comments.slice().sort(sortBy('-voteScore'))
  }
}

const filterComments = (comments,postId) => {
  return comments.filter((comment) => comment.parentId === postId && comment.deleted === false)
}

const mapStateToProps = (state) => {
  return {
    post: getByPostsId(state.posts,state.selectedPost),
    comments: sortComments(filterComments(state.comments,state.selectedPost),state.commentsSortMethod),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPost: (data) => dispatch(getSelectedPost(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    commentParentDeleted: (data) => dispatch(commentParentDeleted(data)),
    editPost: (data) => dispatch(editPost(data)),
    editComment: (data) => dispatch(editComment(data)),
    updatePostVotes: (data) => dispatch(updatePostVotes(data)),
    updateCommentVotes: (data) => dispatch(updateCommentVotes(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView)
