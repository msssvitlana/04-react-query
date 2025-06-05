// fetchMovies 
import axios, { type AxiosResponse } from "axios";
import { type Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesParams {
  query: string;
}

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies({ query }: FetchMoviesParams): Promise<Movie[]> {
  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  const response: AxiosResponse<TMDBResponse> = await axios.get(BASE_URL, config);
  return response.data.results;
}
