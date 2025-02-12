import axios from 'axios'

export interface Response<T> {
    code: number
    message: string
    data: T
}

// 创建 Axios 实例
const api = axios.create({
  baseURL: '/webapi', // 后端 API 地址
  timeout: 10000, // 超时时间 10s
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器（在请求发送前做处理）
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器（在返回数据前做处理）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export default api
