import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Movie from './pages/movieDetail/movie';
import Person from './pages/person/person';
import PersonDetail from './pages/personDetail/personDetail';
import { Error } from './pages/error/error';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="person" element={<Person />}></Route>
          <Route path="person/:id" element={<PersonDetail />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
