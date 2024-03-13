import React from 'react';
import { Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import CategoryMaster from './components/CategoryMaster';
import ProductsPage from './components/ProductsPage';
import Home from './components/Home';

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/categories' element={<CategoryMaster/>}/>
       <Route path='/products' element={<ProductsPage/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
