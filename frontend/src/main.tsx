import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Person from './pages/Person.tsx'
import Search from './pages/Search.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    

    <BrowserRouter>
    
    <Routes>

      <Route element={<App />}>
      
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/person/:id" element={<Person />} />

      
      </Route>



    </Routes>
    
    
    
    </BrowserRouter>



  </StrictMode>,
)
