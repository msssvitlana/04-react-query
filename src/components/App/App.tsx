import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import fetchMovies from "../../services/movieService";
import { useQuery } from "@tanstack/react-query";
import PaginatedItems from "../ReactPaginate/ReactPaginate";
import type { Movie } from "../../types/movie";
import type { TMDBResponse } from '../../types/movie';

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const { data, isLoading, isError } = useQuery<TMDBResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: !!query,
    // keepPreviousData: true,
    // onError: () => toast.error('Error fetching movies'),
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setPage(1); // Скидаємо на першу сторінку при новому запиті
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies.length === 0 && query && (
        <p>No movies found.</p>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          {totalPages > 1 && (
            <PaginatedItems
              pageCount={totalPages}
              currentPage={page}
              onPageChange={(selectedPage) => setPage(selectedPage)}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Toaster position="top-right" />
    </>
  );
}
