// import React from 'react'

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./Component/CityList"
import { useEffect, useState } from "react"

const BASE_URL = 'http://localhost:9000'

const App = () => {
  const [cities,setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    async function fetchCities(){
      try{
        setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`)
      const data = await res.json()
      setCities(data)
    }
    catch{
      alert('There was an error fetching data...')
    }
    finally{
      setIsLoading(false)
    }
  }

    fetchCities()

  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="app" element={<AppLayout/>}>
        <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
        <Route path="countries" element={<p>List of Countries</p>}/>
        <Route path="form" element={<p>Form</p>}/>
      </Route>

      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App