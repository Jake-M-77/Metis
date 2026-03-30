import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      
      <Navbar />
      <Outlet />

      <div className="p-10 text-3xl font-bold text-blue-500">
      Tailwind is working 🚀
    </div>


    </>
  )
}

export default App
