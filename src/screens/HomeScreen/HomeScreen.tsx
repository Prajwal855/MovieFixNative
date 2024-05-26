import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Box, Text, SectionList, FlatList } from '../../../components';
import { constants } from '../../constants';
import { UseQueryResult, useQuery } from '../../../services/network';
import { APIKeys } from '../../../services/apis';
import { MovieListApiResponse, Movie, GenreListApiResponse, Genre } from './type';
import { groupBy } from 'lodash';
import { FooterLoader, Loader, MovieCard, StickyHeader } from './components';
import {
  fireNetworkRequest,
  getGenresAPIUrl,
  getMoviesAPIUrl,
} from '../../utils';
import { TextInput } from 'react-native';

export const HomeScreen = () => {
  const movieListRef = useRef<SectionList>(null);
  const [year, setYear] = useState(constants.defaultYear);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGenreChange = useCallback((genreArr: number[]) => {
    setSelectedGenres(genreArr);
    setYear(constants.defaultYear);
    setMovies([]);
    movieListRef.current?.scrollToLocation({
      animated: false,
      itemIndex: 0,
      sectionIndex: 0,
      viewOffset: 0,
    });
  }, []);

  const {
    data,
    isLoading,
    error,
    isSuccess,
  }: UseQueryResult<MovieListApiResponse> = useQuery({
    queryKey: [APIKeys.MOVIE_LIST, year, selectedGenres, searchQuery],
    queryFn: () => fireNetworkRequest(getMoviesAPIUrl(year, selectedGenres, searchQuery)),
  });

  const {
    data: genresData,
    error: genresError,
    isSuccess: isGenresSuccess,
  }: UseQueryResult<GenreListApiResponse> = useQuery({
    queryKey: [APIKeys.GENRES_LIST],
    queryFn: () => fireNetworkRequest(getGenresAPIUrl()),
  });

  useEffect(() => {
    if (isSuccess) {
      const responseData = data.results;

      if (year === constants.defaultYear) {
        setMovies(responseData);
      } else if (year < constants.defaultYear) {
        setMovies((prevData: Movie[]) => [...responseData, ...prevData]);
      } else {
        setMovies((prevData: Movie[]) => [...prevData, ...responseData]);
      }
    }
  }, [data, isSuccess, year]);

  useEffect(() => {
    if (isGenresSuccess) {
      const responseData = genresData.genres;
      setGenres(responseData);
    }
  }, [isGenresSuccess, genresData]);

  const groupedMovies = useMemo(() => {
    const groupedMoviesByDate = groupBy(movies, (movie: Movie) =>
      new Date(movie.release_date).getFullYear()
    );
    const sectionData = Object.entries(groupedMoviesByDate).map(
      ([key, value]) => ({
        title: key,
        data: [{ list: value }],
      })
    );
    return sectionData;
  }, [movies]);

  const onEndReached = useCallback(() => {
    if (year < constants.currentYear) {
      setYear((prevYear) => prevYear + 1);
    }
  }, [year]);

  const handleSearchChange = (query:string) => {
    setSearchQuery(query);
    setYear(constants.defaultYear);
    setMovies([]);
    movieListRef.current?.scrollToLocation({
      animated: false,
      itemIndex: 0,
      sectionIndex: 0,
      viewOffset: 0,
    });
  };

  const renderListItem = ({ item }: { item: Movie }) => (
    <MovieCard key={item.id.toString()} item={item} genres={genres} />
  );

  const renderSection = ({ item }: { item: { list: Movie[] } }) => (
    <FlatList
      data={item.list}
      numColumns={2}
      renderItem={renderListItem}
      keyExtractor={(item, index) => `section-${index}-movie-${item.id}`} 
      ListFooterComponent={
        <FooterLoader isLoading={isLoading} data={groupedMovies} />
      }
    />
  );

  return (
    <Box backgroundColor="black" width={'100%'} height={'100%'}>
      <StickyHeader
      headerText="MOVIEFIX"
      genres={genres}
      selectedGenres={selectedGenres}
      handleGenreChange={handleGenreChange}
      handleSearchChange={handleSearchChange}
      searchQuery={searchQuery}
    />
      {error || genresError ? (
        <Box
          backgroundColor="black"
          flex={1}
          justifyContent="center"
          padding={16}>
          <Text color="white" textAlign="center" fontSize={24}>
            Something went wrong, please try again later!
          </Text>
        </Box>
      ) : groupedMovies && groupedMovies.length === 0 && isLoading ? (
        <Loader />
      ) : groupedMovies && groupedMovies.length > 0 ? (
        <Box paddingHorizontal={16} marginBottom={96}>
          <SectionList
            ref={movieListRef}
            sections={groupedMovies}
            renderItem={renderSection}
            keyExtractor={(item, index) => `section-${index}`}  
            renderSectionHeader={({ section: { title } }) => (
              <Box marginTop={24}>
                <Text fontSize={20} fontWeight="700" color="white">
                  {title}
                </Text>
              </Box>
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
          />
        </Box>
      ) : null}
    </Box>
  );
};
