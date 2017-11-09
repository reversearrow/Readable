const api = "http://localhost:3001"

let token = "1234"

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCatagories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())
    .then(data => data)

export const addPost = (post) =>
fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
}).then(res => res.json())
  .then(data => data)

export const getComments = (postid) =>
  fetch(`${api}/posts/${postid}/comments`, {headers})
    .then(res => res.json())
    .then(data => data)

export const addComment = (comment) =>
fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(comment)
}).then(res => res.json())
  .then(data => data)

export const updatePostVote = (id,option) =>
fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(option)
}).then(res => res.json())
  .then(data => data)

  export const updateCommentVote = (id,option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json())
    .then(data => data)


export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(data => data)


  export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => data)

export const updatePost = (id,update) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(update)
  }).then(res => res.json())
    .then(data => data)

export const updateComment = (id,update) =>
      fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      }).then(res => res.json())
        .then(data => data)
