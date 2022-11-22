import { useMount } from 'hook/useMount'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import cache from './util/cache'
import { registerFormulaModule } from 'util/registerEditor'

function App() {
  const navigate = useNavigate()
  useMount(registerFormulaModule) // 注册富文本编辑器的公式插件
  const location = useLocation()

  useMount(() => {
    !cache.getCache('token')
      ? navigate('/login')
      : location.pathname === '/'
      ? navigate('/home/teach')
      : navigate(location.pathname)
  })

  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App
