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
import Overview from './PersonOverviewPage/Components/Overview.tsx'
import WarningMarkers from './PersonOverviewPage/Components/WarningMarkers.tsx'
import BailConditions from './PersonOverviewPage/Components/BailConditions.tsx'
import Description from './PersonOverviewPage/Components/Descriptions.tsx'
import AliasDetails from './PersonOverviewPage/Components/AliasDetails.tsx'
import CustodyPhotos from './PersonOverviewPage/Components/CustodyPhotos.tsx'
import Documents from './PersonOverviewPage/Components/Documents.tsx'
import Info from './PersonOverviewPage/Components/Info.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <BrowserRouter>

      <Routes>

        <Route element={<App />}>

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/person/:id" element={<Person />} />


          <Route path='/personpage' element={<PersonPage />}>


            <Route path='/personpage/overview' element={<Overview />} />
            <Route path='/personpage/warningmarkers' element={<WarningMarkers />} />
            <Route path='/personpage/bailconditions' element={<BailConditions />} />
            <Route path='/personpage/descriptions' element={<Description />} />
            <Route path='/personpage/details' element={<AliasDetails />} />
            <Route path='/personpage/custodyphotos' element={<CustodyPhotos />} />
            <Route path='/personpage/Docs' element={<Documents />} />
            <Route path='/personpage/info' element={<Info />} />

           


            {/* Overview, warning markers, bail conditions, etc */}


            {/* Default component */}
            <Route index element={<Overview />} />



          </Route>

        </Route>





      </Routes>



    </BrowserRouter>



  </StrictMode>,
)
