import getMovieByTitleEndpoint from "./get/movies-by-search";

export const moviesServiceName: string = "movies";

const connectMoviesAPI = ({ app }) => {
  getMovieByTitleEndpoint({ app });
};

export default connectMoviesAPI;
