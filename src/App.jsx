// import React from 'react'

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./Component/CityList"
import CountryList from "./Component/CountryList"
import City from "./Component/City"
import Form from "./Component/Form"
import { CityProvider } from "./context/CityContext"


const App = () => {

  return (
    <CityProvider>

    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="login" element={<Login/>}/>

      <Route path="app" element={<AppLayout/>}>
        <Route index element={<Navigate replace to='cities'/>}/>
        <Route path="cities" element={<CityList />}/>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList/>}/>
        <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </CityProvider>

  )
}

export default App