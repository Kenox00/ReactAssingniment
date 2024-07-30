import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListOfUsers from './ListOfUsers';
import EditUser from './EditUser';
import Login from './login';
import Register from './register';
import Home from './home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/listOfUsers" element={<ListOfUsers />} />
        <Route path="/edit/:index" element={<EditUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
