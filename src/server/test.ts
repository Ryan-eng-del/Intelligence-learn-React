import { client } from './index'
// HTTP
client.get({
  url: '18795596',
  params: {
    name: 'kobe'
  }
})
client.post<{ token: string }>({
  url: '',
  data: {
    name: '',
    password: ''
  }
})
