import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { Error } from './pages/error/error';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader } from './components/Loader/Loader';

const PersonDetail = lazy(() => import('./pages/personDetail/personDetail'));
const Movie = lazy(() => import('./pages/movieDetail/movie'));
const Home = lazy(() => import('./pages/home/home'));
const Person = lazy(() => import('./pages/person/person'));

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="movie/:id"
            element={
              <ErrorBoundary>
                <Suspense>
                  <Movie />
                </Suspense>
              </ErrorBoundary>
            }
          ></Route>
          <Route
            path="person"
            element={
              <Suspense fallback={<Loader />}>
                <Person />
              </Suspense>
            }
          ></Route>
          <Route
            path="person/:id"
            element={
              <ErrorBoundary>
                <Suspense>
                  <PersonDetail />
                </Suspense>
              </ErrorBoundary>
            }
          ></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
