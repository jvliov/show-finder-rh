import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home'
import LoginPage from './pages/login';
import SettingsPage from './pages/settings';
import WatchlistPage from './pages/watchlist';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/home" element={<HomePage/>}></Route>
       <Route path="/" element={<LoginPage/>}></Route>
       <Route path="/settings" element={<SettingsPage/>}></Route>
       <Route path="/watchlist" element={<WatchlistPage/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
