import {Box, Text} from '../../../../../components';
import {Movie} from '../../type';
import React from 'react';

export const FooterLoader = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: {title: string; data: {list: Movie[]}[]}[];
}) => {
  return <>{isLoading && data.length > 0 ? <Loader /> : null}</>;
};

export const Loader = () => (
  <Box
    backgroundColor="black"
    flex={1}
    width={'100%'}
    height={'100%'}
    justifyContent="center"
    padding={16}>
    <Text color="red" textAlign="center" fontSize={24}>
      Loading...
    </Text>
  </Box>
);
