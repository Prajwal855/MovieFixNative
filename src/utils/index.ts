import axios from 'axios';
import {constants} from '../constants';

export const fireNetworkRequest = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const getMoviesAPIUrl = (yearVal: number, genresArr: number[], searchQuery: string = '') => {
  const baseUrl = `${constants.baseUrl}discover/movie?api_key=${constants.apiKey}&sort_by=popularity.desc&primary_release_year=${yearVal}&page=1&vote_count.gte=${constants.popularityCount}`;

  let url = baseUrl;
  
  if (genresArr.length > 0) {
    const genresStr = genresArr.join('|');
    url += `&with_genres=${genresStr}`;
  }

  if (searchQuery) {
    url = `${constants.baseUrl}search/movie?api_key=${constants.apiKey}&query=${encodeURIComponent(searchQuery)}&page=1`;
  }

  return url;
};


export const getGenresAPIUrl = () =>
  `${constants.baseUrl}genre/movie/list?api_key=${constants.apiKey}`;
