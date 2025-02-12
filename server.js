const http = require('http')

// 模拟用户数据
const mockUserProfile = {
  id: 1,
  name: 'alvin',
  email: 'alvinhtml@gmail.com',
}

const server = http.createServer((req, res) => {
  // 只处理 /webapi/profile 路径的 GET 请求
  if (req.method === 'GET' && req.url === '/webapi/profile') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      code: 0,
      message: 'success',
      data: mockUserProfile
    }))
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

const PORT = 3081
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})