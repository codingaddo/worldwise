import { Suspense, lazy } from "react"

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { CityProvider } from "./context/CityContext"
import { AuthenticationProvider } from "./context/FakeAuthContextAPI"
import ProtectedRout from "./pages/ProtectedRout"

// import HomePage from "./pages/HomePage"
// import Pricing from "./pages/Pricing"
// import Product from "./pages/Product"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"
// import Login from "./pages/Login"

import CityList from "./Component/CityList"
import CountryList from "./Component/CountryList"
import City from "./Component/City"
import Form from "./Component/Form"
import SpinnerFullPage from "./Component/SpinnerFullPage"

const HomePage = lazy(()=>import('./pages/HomePage'))
const Pricing = lazy(()=>import('./pages/Pricing'))
const Login = lazy(()=>import('./pages/Login'))
const Product = lazy(()=>import('./pages/Product'))
const AppLayout = lazy(()=>import('./pages/AppLayout'))
const PageNotFound = lazy(()=>import('./pages/PageNotFound'))



const App = () => {

  return (
    <>

    <AuthenticationProvider>
    <CityProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage/>}>

    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="app" element={
        <ProtectedRout>
          <AppLayout/>
        </ProtectedRout>
      }>
        <Route index element={<Navigate replace to='cities'/>}/>
        <Route path="cities" element={<CityList />}/>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList/>}/>
        <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </Suspense>
    </BrowserRouter>
    </CityProvider>
    </AuthenticationProvider>

    </>


  )
}

export default App