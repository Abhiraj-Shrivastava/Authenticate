import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';


import WatchlistHome from './Component/WatchlistHome';
import { Login } from './Component/Login';


function App() {
  return (
    <Router>
      <Routes>
      <Route element={<WatchlistHome/>} path="/" />
      <Route element={<Login/>} path="/login" />
      
     
      </Routes>
    </Router>
  );
}

export default App;
