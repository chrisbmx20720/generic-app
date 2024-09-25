import { BrowserRouter } from "react-router-dom"
import {Routing} from './routes/Routing'
import MyNavbar from "./components/navbar/Navbar"
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer} from 'react-toastify';

function App() {
 
  return (
    <>
    <BrowserRouter>
      <MyNavbar/>
      <Routing/>
      <ToastContainer position="top-center" />
    </BrowserRouter>
    </>
  )
}

export default App
