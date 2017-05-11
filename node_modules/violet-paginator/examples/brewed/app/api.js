import axios from 'axios'
import PubSub from 'pubsub-js'

const API_BASE = 'https://brewed-dev.herokuapp.com/v1'

function api() {
  const adapter = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'X-Api-Key': 'b780aac581de488cf77a629517ac999b',
      Accept: 'application/json'
    }
  })

  adapter.interceptors.response.use(
    undefined,
    (error) => {
      if (error.response.status === 403) {
        PubSub.publish('session.expired')
      }

      return Promise.reject(error)
    }
  )

  return adapter
}

export default {
  sessions: {
    create: (username, password) =>
      api().post('/users/authenticate', {
        user_agent: navigator.userAgent,
        username,
        password
      }).then(resp => {
        localStorage.setItem('refresh', resp.data.refresh_token)
        return resp
      })
  },
  users: {
    create: (username, email, password) =>
      api().post('/users', {
        user: {
          username,
          email,
          password
        }
      })
  },
  recipes: {
    index: (filters={}) =>
      api().get('/recipes', { params: { ...filters } }),
    show: (id) =>
      api().get(`/recipes/${id}`)
  }
}
