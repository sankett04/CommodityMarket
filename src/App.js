
import './App.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import AuthProvider from './components/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/footer';

import Login from './components/Login'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Mandiprice from './components/mandiprice'
import PersonalInformation from './components/personalinformation'
import ProductDetailsWheat from './components/ProductDetailsWheat'
import Mandipricealert from './components/pricing'
import Listitempay from './components/listitempay'
import Payment from './components/PaymentForm'
import BuyersSection from './components/BuyersSection';
import SellerListPage from './components/SellersListPage'
import SellersSection from './components/SellersSection'
import Sidebar from './components/sidebar';
import Additem from './components/additem';
import ListItemDesc from './components/listitemdesc';
import ListItem from './components/ListItem'

function App() {
  return(
    <AuthProvider>
  <BrowserRouter>
  <></>
  <Navbar />
  <Routes>
  
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/additem" element={<Additem />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/mandiprice" element={<Mandiprice/>}/>
        <Route path="/personalinformation" element={<PersonalInformation/>}/>
        <Route path='/productdetailswheat' element={<ProductDetailsWheat/>}/>
        <Route path='/pricing' element={<Mandipricealert/>}/>
        <Route path='/listitempay' element={<Listitempay/>}/>
        <Route path='/BuyersSection' element={<BuyersSection/>}/>
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/listitemdesc" element={<ListItemDesc />} />
        <Route path="/ListItem" element={<ListItem />} />
        <Route  path='/SellersSection' element={<SellersSection/>}/>
        
      </Routes>
  <Footer/>
  </BrowserRouter>
  </AuthProvider>
    
  );
}

export default App;
