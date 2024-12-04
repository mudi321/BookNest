
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'



function App() {
 
  return (
    <>
    <AuthProvider>
      <div className='bg-offWhite min-h-screen'>
        <Navbar/>
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet/>
        </main>
        {/* Have the fix the footer */}
        <Footer/>
      </div>
    </AuthProvider>
    
    </>
  )
}

export default App
