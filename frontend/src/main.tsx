/* ===== DEPENDENCIES ===== */


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'





/* ===== COMPONENTS ===== */

import App from './App.tsx'
import Home from './pages/Home.tsx'
import Person from './pages/Person.tsx'
import Search from './pages/Search.tsx'


/* ===== STYLING ===== */


import './styles/index.css'
import './styles/App.css'
import PersonPage from './pages/PersonPage.tsx'
import Overview from './PersonOverviewPage/Components/Overview.tsx'
import WarningMarkers from './PersonOverviewPage/Components/WarningMarkers.tsx'
import BailConditions from './PersonOverviewPage/Components/BailConditions.tsx'
import Description from './PersonOverviewPage/Components/Descriptions.tsx'
import AliasDetails from './PersonOverviewPage/Components/AliasDetails.tsx'
import CustodyPhotos from './PersonOverviewPage/Components/CustodyPhotos.tsx'
import Documents from './PersonOverviewPage/Components/Documents.tsx'
import Info from './PersonOverviewPage/Components/Info.tsx'
import PersonOverviewPage from './PersonOverviewPage/PersonOverviewPage.tsx'
import People from './pages/People.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <BrowserRouter>

      <Routes>

        <Route element={<App />}>

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />


          <Route path='/person/:id' element={<PersonPage />}>
          {/* Navigates to overview/home when loading person */}
            <Route index element={<Navigate to='overview/home' replace />} />

            {/* people page */}
            <Route path='people' element={<People />}>
            
            
            </Route>



            {/* Overview Page */}
            <Route path='overview' element={<PersonOverviewPage />}>

              <Route path='home' element={<Overview />} />
              <Route path='warningmarkers' element={<WarningMarkers />} />
              <Route path='bailconditions' element={<BailConditions />} />
              <Route path='descriptions' element={<Description />} />
              <Route path='details' element={<AliasDetails />} />
              <Route path='custodyphotos' element={<CustodyPhotos />} />
              <Route path='Docs' element={<Documents />} />
              <Route path='info' element={<Info />} />

              {/* Default component */}
              <Route index element={<Overview />} />


            </Route>





           

          </Route>

        </Route>





      </Routes>



    </BrowserRouter>



  </StrictMode >,
)
