import axios from 'axios'

const baseUrl = '/api/blogs'

const getCommentsFromBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.body
}

const addCommentTo = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,{ comment })
  return response.data
}

export default { getCommentsFromBlog, addCommentTo }