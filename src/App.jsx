import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import PasswordResetMain from "./components/PasswordResetMain/PasswordResetMain"
import PasswordResetNewPass from "./components/PasswordResetNewPass/PasswordResetNewPass"
import OrdersList from "./components/OrdersList/OrdersList"
import OrderDetails from './components/OrderDetails/OrderDetails'
import OrderDocuments from './components/OrderDocuments/OrderDocuments'
import OrderParent from './components/OrderParent/OrderParent'
import './App.css'

function App() {

  return (
    <div className='App'>
      <Toaster success={4000}/>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<div></div>} />
          <Route path="/ordenes/importacion" element={<OrdersList />} />
          <Route path="/ordenes/importacion/:ordnumber" element={<OrderParent />}>
            <Route path="/ordenes/importacion/:ordnumber" element={<OrderDetails />} />
            <Route path="/ordenes/importacion/:ordnumber/:docutype" element={<OrderDocuments />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/passwordreset" element={<PasswordResetMain />}/>
        <Route path="/passwordreset/:resetpassid" element={<PasswordResetNewPass />} />
      </Routes>
    </div>
  )
}

export default App
