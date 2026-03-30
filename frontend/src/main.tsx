/* ===== DEPENDENCIES ===== */


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'





/* ===== COMPONENTS ===== */

import App from './App.tsx'
import Home from './pages/Home.tsx'
import Person from './pages/Person.tsx'
import Search from './pages/Search.tsx'


/* ===== STYLING ===== */


import './styles/index.css'
import './styles/reset.css'
import './styles/App.css'


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
