import { BrowserRouter } from 'react-router-dom'
import AppRouter from './utils/AppRouter'
import { CartProvider } from './utils/CartContext'

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
