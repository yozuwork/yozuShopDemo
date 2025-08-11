
import { Routes , Route } from 'react-router-dom'
import Login from './pages/login'
import './App.css'

function App() {
  return (
    <>
       <div className="App">
          <Routes>
             <Route path="/login" element={<Login/>}></Route>
          </Routes>
       </div>
    </>
  )
}

export default App
