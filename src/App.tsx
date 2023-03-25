import { Platform } from 'pages/PublishPage'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  // useMount(() => {
  //   !cache.getCache(TOKEN_NAME)
  //     ? navigate('/')
  //     : location.pathname === '/'
  //     ? navigate('/home/teach')
  //     : navigate(location.pathname)
  // })

  return (
    <div className="App">
      <Platform />
    </div>
  )
}

export default App
