import { TOKEN_NAME } from 'global/varible'
import { useMount } from 'hook/useMount'
import { Platform } from 'pages/PublishPage'
import { useLocation, useNavigate } from 'react-router-dom'
import cache from 'util/cache'
import './App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  useMount(() => {
    if (location.pathname == '/') {
      navigate(location.pathname)
      return
    } else {
      !cache.getCache(TOKEN_NAME) ? navigate('/login') : navigate(location.pathname)
    }
  })

  return (
    <div className="App">
      <Platform />
    </div>
  )
}

export default App
