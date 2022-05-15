import { EpisodeSeries } from '../store/episodes/types';
import axios from 'axios';

const BASE_URL = 'https://www.breakingbadapi.com/api';

const getCharacterById = async (name: string) => {
    return axios(`${BASE_URL}/characters`, {
        params: {
            name,
        },
    });
};

const getEpisodes = async (series: EpisodeSeries) => {
    return axios(`${BASE_URL}/episodes`, {
        params: {
            series,
        },
    });
};

const getEpisodeById = async (id: number) => {
    return axios(`${BASE_URL}/episodes/${id}`);
};

export {
    getEpisodes,
    getEpisodeById,
    getCharacterById
};
