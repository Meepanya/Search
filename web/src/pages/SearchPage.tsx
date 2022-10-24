import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from 'src/components/cookies';
import { AUTH_BASIC_ENDPOINT, GET_MOVIES_BY_SEARCH } from '../config';
import '../styles/SearchPage.css';

import Movie from '../components/MovieCard';

const firstMovieEverYear = 1888;
const thisYear = new Date().getFullYear();

const SearchPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState('');
  const [type, setType] = useState(null);
  const [year, setYear] = useState(null);

  const [isFetcing, setFetching] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = getCookie('user');

    const authBasic = async (user) => {
      const token = JSON.parse(user)?.token;

      const authPayload = await fetch(AUTH_BASIC_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const authResult = await authPayload.json();

      if (authResult?.Error) {
        setCookie('user', null, 1);
        return;
      }

      setUser(authResult);
    };

    if (user) {
      authBasic(user);
    }
  }, []);

  const years = useCallback(() => {
    const options = [];

    for (let i = 0; i <= thisYear - firstMovieEverYear; i++) {
      options.push(
        <option
          key={thisYear - i}
          id={(thisYear - i).toString()}
          value={thisYear - i}
        >
          {thisYear - i}
        </option>,
      );
    }

    return options;
  }, []);

  useEffect(() => {
    if (error !== '' && search !== '') {
      setError('');
    }
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMovies([]);
    setError('');
    setFetching(true);

    if (!user) {
      setFetching(false);
      setError('Unauthorized.');
      return;
    }

    if (search === '') {
      setError("The movie title shouldn't be empty");
      return;
    }

    let endpoint = GET_MOVIES_BY_SEARCH;

    endpoint += `?s=${search}`;

    if (type && type !== 'Type') {
      endpoint += `&type=${type}`;
    }

    if (year && year !== 'Year') {
      endpoint += `&y=${year}`;
    }

    const moviesPayload = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const moviesResult = await moviesPayload.json();

    setFetching(false);

    if (moviesResult?.Error) {
      setError(moviesResult.Error);
      return;
    }

    if (moviesResult) {
      setMovies(moviesResult?.Search || [moviesResult]);
      return;
    }
  };

  return (
    <div className="Background">
      <div className="Navigation">
        <div className="Empty" />
        <p className="WelcomeTitle">
          {user ? `Welcome ${user?.username}!` : ''}
        </p>
        <div>
          {user ? (
            <button
              type="button"
              className="LogInButton"
              onClick={() => {
                setCookie('user', null, 1);
                setUser(null);
                setMovies([]);
              }}
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                type="button"
                className="LogInButton"
                onClick={() => navigate('log-in')}
              >
                Log In
              </button>
              <button
                type="button"
                className="SignUpButton"
                onClick={() => navigate('sign-up')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <div className="Search">
        <p className="SearchTitle">
          {user ? 'Movie Search' : 'Please login to use Movie Search'}
        </p>

        <form onSubmit={handleSubmit} className="SearchForm">
          <input
            className="SearchInput"
            type="text"
            name="search"
            value={search}
            disabled={isDisabled}
            onChange={(e) => {
              if (!user) {
                setDisabled(true);
                return;
              }

              setSearch(e.target.value);
            }}
          />

          <select
            className="SearchSelect"
            id="type"
            name="type"
            disabled={isDisabled}
            onChange={(e) => {
              if (!user) {
                setDisabled(true);
                return;
              }

              setType(e.target.value);
            }}
          >
            <option id="type">Type</option>
            <option id="movie" value="movie">
              Movie
            </option>
            <option id="series" value="series">
              Series
            </option>
            <option id="episode" value="episode">
              Episode
            </option>
          </select>

          <select
            className="SearchSelect"
            id="year"
            name="year"
            onChange={(e) => {
              if (!user) {
                setDisabled(true);
                return;
              }

              setYear(e.target.value);
            }}
            disabled={isDisabled}
          >
            <option id="year" value="year">
              Year
            </option>
            {(years() || []).map((year) => year)}
          </select>

          <button type="submit" className="SearchButton">
            <img className="SearchImage" src="/search.png" alt="Search" />
          </button>
        </form>

        {error && <p className="ErrorText">{error}</p>}

        <div className="MovieGrid">
          {isFetcing && (
            <div className="lds-ellipsis-blue">
              <div />
              <div />
              <div />
              <div />
            </div>
          )}

          {!isFetcing &&
            movies.map((movie, idx) => <Movie key={idx} {...movie} />)}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
