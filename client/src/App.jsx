import { BrowserRouter, Router } from 'react-router-dom'
import AppRouter from './utils/AppRouter'


function App() {

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
