import { useState, useEffect } from 'react'
import MiniBar from './components/MiniBar'
import NavBar from './components/NavBar'
import Categories from './components/Categories'
import { BrowserRouter } from 'react-router-dom'
import Deals from './components/Deals'
import BestDeal from './components/FurnitureDeal'
import BeautyDeals from './components/BeautyDeals'
import FragrancesDeals from './components/FragrancesDeals'
import GroceriesDeals from './components/GroceriesDeals'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <MiniBar />
        <NavBar />
        <Categories />
        <Deals />
        <BestDeal />
        <BeautyDeals />
        <FragrancesDeals/>
        <GroceriesDeals />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
