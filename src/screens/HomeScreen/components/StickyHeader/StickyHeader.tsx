import React from 'react';
import { Text, Box } from '../../../../../components';
import { GenreFilter } from '..';
import { Genre } from '../../type';
import { TextInput } from 'react-native';

export const StickyHeader = ({
  genres,
  headerText,
  selectedGenres,
  handleGenreChange,
  handleSearchChange,
  searchQuery,
}: {
  genres: Genre[];
  headerText: string;
  selectedGenres: number[];
  handleGenreChange: (genreArr: number[]) => void;
  handleSearchChange: (query: string) => void;
  searchQuery: string;
}) => {
  return (
    <Box
      flexDirection="column"
      left={0}
      right={0}
      paddingVertical={12}
      paddingLeft={16}
      width="100%"
      backgroundColor="darkGray"
    >
      <Text fontSize={24} fontWeight={'700'} letterSpacing={1} color="red">
        {headerText}
      </Text>
      <TextInput
        placeholder="Search for a movie..."
        value={searchQuery}
        onChangeText={handleSearchChange}
        style={{ padding: 5, margin: 5,marginLeft:0, backgroundColor: 'grey' }}
      />
      {genres && genres.length > 0 ? (
        <Box marginTop={12}>
          <GenreFilter
            genres={genres}
            selectedGenres={selectedGenres}
            handleGenreChange={handleGenreChange}
          />
        </Box>
      ) : null}
    </Box>
  );
};
