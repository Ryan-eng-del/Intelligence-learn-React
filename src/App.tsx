import { Platform } from 'pages/PublishPage'
import './App.css'

function App() {
  // const navigate = useNavigate()
  // const location = useLocation()
  // useMount(() => {
  //   !cache.getCache(TOKEN_NAME)
  //     ? navigate('/login')
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
