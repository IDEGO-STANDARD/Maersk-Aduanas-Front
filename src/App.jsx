import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import PasswordResetMain from "./components/PasswordResetMain/PasswordResetMain"
import PasswordResetNewPass from "./components/PasswordResetNewPass/PasswordResetNewPass"
import OrdersList from "./components/OrdersList/OrdersList"
import OrderDetails from './components/OrderDetails/OrderDetails'
import OrderDetailsDetails from './components/OrderDetailsDetails/OrderDetailsDetails'
import OrderDocuments from './components/OrderDocuments/OrderDocuments'
import OrderParent from './components/OrderParent/OrderParent'
import ControlTowerInfo from './components/ControlTowerInfo/ControlTowerInfo'
import ControlTowerSearch from './components/ControlTowerSearch/ControlTowerSearch'
import ConfigUsuarios from './components/ConfigUsuarios/ConfigUsuarios'
import ConfigRoles from './components/ConfigRoles/ConfigRoles'

import './App.css'

function App() {

  return (
    <div className='App'>
      <Toaster success={4000}/>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<div></div>} />
          <Route path="/administracion/usuarios" element={<ConfigUsuarios />} />
          <Route path="/administracion/roles" element={<ConfigRoles />} />
          <Route path="/control" element={<ControlTowerSearch />}>
            <Route path="/control/:ordnumber" element={<ControlTowerInfo />} />
          </Route>
          <Route path="/ordenes/:ordtype/" element={<OrdersList />} />
          <Route path="/ordenes/:ordtype/detalles/:ordnumber" element={<OrderDetailsDetails />} />
          <Route path="/ordenes/:ordtype/:ordnumber" element={<OrderParent />}>
            <Route path="/ordenes/:ordtype/:ordnumber/validacion" element={<OrderDetails />} />
            <Route path="/ordenes/:ordtype/:ordnumber/:docutype" element={<OrderDocuments />} />
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
