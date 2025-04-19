import './App.css'
import { ProfileImgProvider } from './context/contextImg'
import { AppRouter } from './routes'

function App() {

  return (
    <>
    <ProfileImgProvider>
     <AppRouter/>
     </ProfileImgProvider>
    </>
  )
}

export default App
