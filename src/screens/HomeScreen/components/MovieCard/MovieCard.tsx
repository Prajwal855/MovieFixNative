import {Box, Image, Text} from '../../../../../components';
import React from 'react';
import {Genre, Movie} from '../../type';

const getGenres = (genreIds: number[], genres: Genre[]) => {
  const genreNames = genreIds.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre?.name;
  });
  return genreNames.join(' - ');
};

export const MovieCard = ({item, genres}: {item: Movie; genres: Genre[]}) => {
  return (
    <Box
      backgroundColor="lightGray"
      marginVertical={8}
      width={'48%'}
      marginRight={8}>
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
        }}
        style={{width: '100%', height: 250}}
        resizeMode="stretch"
        alt={item.title}
      />
      <Box padding={8}>
        <Box
          marginBottom={8}
          flexDirection="row"
          justifyContent="space-between">
          <Box width={'78%'}>
            <Text color="white" fontWeight="700" fontSize={14}>
              {`${item.title}`}
            </Text>
          </Box>
          <Text color="yellow" fontWeight="700" fontSize={14}>
            {`${item.vote_average}`}
          </Text>
        </Box>
        <Text color="dimGray" textAlign="center" fontSize={12} marginBottom={8}>
          {getGenres(item.genre_ids, genres)}
        </Text>
        <Text color="dimGray" numberOfLines={3} marginBottom={2}>
          {`${item.overview}`}
        </Text>
      </Box>
    </Box>
  );
};
