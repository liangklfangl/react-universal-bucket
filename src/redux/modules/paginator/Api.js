import axios from 'axios'
import PubSub from 'pubsub-js'
// https://github.com/liangklfang/pubsub-js
const API_BASE = 'https://brewed-dev.herokuapp.com/v1'

// https://github.com/liangklfang/axios
function api() {
  //通过自定义的配置来产生一个axios实例
  const adapter = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'X-Api-Key': 'b780aac581de488cf77a629517ac999b',
      Accept: 'application/json'
    }
  })
  //拦截response请求
  adapter.interceptors.response.use(
    undefined,
    //对response数据做一些处理
    (error) => {
      if (error.response.status === 403) {
        //如果response有错误，那么我们从服务端publish一个错误
        PubSub.publish('session.expired')
      }
      return Promise.reject(error)
    }
    //如果response有错误那么我们做一些处理
  )
  return adapter
}

export default {
  //浏览器session处理
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
  //发送post请求到/users这个URL下
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
  //发送get请求
  recipes: {
    index: function(filters={}){
      console.log("API接收到数据为:",filters);
      //此处filter类型为:
      //{
      // page:1,
      // results_per_page:15
      //}
      return api().get('/recipes', { params: { ...filters } })
    },
    show: (id) =>
      api().get(`/recipes/${id}`)
  }
}
