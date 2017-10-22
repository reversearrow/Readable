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
