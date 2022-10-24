import React from 'react';
import '../styles/MovieCard.css';

type Rating = {
  Source: string;
  Value: string;
};

interface IMovieCard {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Ratings: Rating[];
  Response: boolean;
}

const MovieCard: React.FunctionComponent<IMovieCard> = ({
  Title,
  Poster,
  Year,
  Type,
}: IMovieCard) => (
  <div>
    <div className="MovieCard">
      <img
        className="MovieImage"
        src={Poster === 'N/A' ? 'poster-not-found.png' : Poster}
        alt={Title}
      />
      <div className="MovieContent">
        <p className="MovieTitle">{Title}</p>

        <div className="MovieTitleRow">
          <p className="MovieYear">{Year}</p>
          <p className="MovieType">{Type[0].toUpperCase() + Type.slice(1)}</p>
        </div>
      </div>
    </div>
  </div>
);

export default MovieCard;
