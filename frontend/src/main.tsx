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
import './styles/App.css'
import PersonPage from './pages/PersonPage.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    

    <BrowserRouter>
    
    <Routes>

      <Route element={<App />}>
      
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/person/:id" element={<Person />} />

        {/* Once personpage has been wired up and styling complete, this will need to be removed */}

        <Route path="/personpage" element={<PersonPage />} /> 

      
      </Route>



    </Routes>
    
    
    
    </BrowserRouter>



  </StrictMode>,
)
