import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Person from './pages/person/person';
import { Error } from './pages/error/error';

const PersonDetail = lazy(() => import('./pages/personDetail/personDetail'));
const Movie = lazy(() => import('./pages/movieDetail/movie'));

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route
            path="movie/:id"
            element={
              <Suspense>
                <Movie />
              </Suspense>
            }
          ></Route>
          <Route path="person" element={<Person />}></Route>
          <Route
            path="person/:id"
            element={
              <Suspense>
                <PersonDetail />
              </Suspense>
            }
          ></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
