// fetchMovies 
import axios from "axios";
import { type TMDBResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesParams {
  query: string;
  page: number;
}

export default async function fetchMovies({ query, page }: FetchMoviesParams): Promise<TMDBResponse> {
  const { data } = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    }
  });
  return data;
}
