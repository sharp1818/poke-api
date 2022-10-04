import './App.scss';
import { Navigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Header from './layout';
import ButtonComponent from './components/buttonComponent';
import AllPokemons from './pages/all-pokemons';
import FavPokemons from './pages/fav-pokemons';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="App">
      <Header />
      <Box>
        <Link to="/all">
          <ButtonComponent pathname="/all" currentpath={currentPath} text="All" />
        </Link>
        <Link to="/my-faves">
          <ButtonComponent pathname="/my-faves" currentpath={currentPath} text="My faves" />
        </Link>
      </Box>
      <Routes>
        <Route path="/" element={<Navigate replace to="/all" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/all" element={<AllPokemons />} />
        <Route path="/my-faves" element={<FavPokemons />} />
      </Routes>
    </div>
  );
}

export default App;
