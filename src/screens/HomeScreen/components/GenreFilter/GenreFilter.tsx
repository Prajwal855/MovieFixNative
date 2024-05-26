import React, {useRef} from 'react';
import {
  Box,
  FlatList,
  Button,
  Text,
  FlatListType,
} from '../../../../../components';
import {Genre} from '../../type';

type FilterProps = {
  index: number;
  value: string;
  label: string;
  isActive: boolean;
  handleChange: (value: string, index: number) => void;
};

const Filter = ({value, label, isActive, handleChange, index}: FilterProps) => {
  const handlePress = () => {
    handleChange(value, index);
  };
  return (
    <Button
      paddingHorizontal={16}
      paddingVertical={8}
      borderRadius={8}
      marginRight={8}
      backgroundColor={isActive ? 'red' : 'lightGray'}
      onPress={handlePress}>
      <Text color="white">{label}</Text>
    </Button>
  );
};

export const GenreFilter = ({
  genres,
  selectedGenres,
  handleGenreChange,
}: {
  genres: Genre[];
  selectedGenres: number[];
  handleGenreChange: (genreArr: number[]) => void;
}) => {
  const flatlistRef = useRef<FlatListType>(null);

  const handleFilterSelect = (value: string, index: number) => {
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });

    const parsedValue = parseInt(value, 10);
    const genreArr = [...selectedGenres];
    if (genreArr.includes(parsedValue)) {
      const genreIndex = genreArr.indexOf(parsedValue);
      genreArr.splice(genreIndex, 1);
    } else {
      genreArr.push(parsedValue);
    }

    handleGenreChange(genreArr);
  };

  const renderItem = ({item, index}: {item: unknown; index: number}) => {
    const listItem = item as Genre;
    return (
      <Filter
        index={index}
        key={`${listItem.id}`}
        label={listItem.name}
        value={`${listItem.id}`}
        isActive={selectedGenres.includes(listItem.id)}
        handleChange={handleFilterSelect}
      />
    );
  };

  const handleKeys = (item: unknown) => {
    const listItem = item as Genre;
    return listItem.id.toString();
  };

  return (
    <Box zIndex={1}>
      <FlatList
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        data={genres}
        horizontal={true}
        keyExtractor={handleKeys}
        renderItem={renderItem}
      />
    </Box>
  );
};
