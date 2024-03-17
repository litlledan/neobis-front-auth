import { Route,Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Letter from './components/Letter-email/Letter';
import Welcom from './components/Welcom/Welcom';

function App() {
  return (
   <>
    <Routes>
    <Route path='/' element={<Login/>}/>  
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/letter' element={<Letter/>}/>
    <Route path='/welcom' element={<Welcom/>}/>
    </Routes>
   </>
  );
}

export default App;