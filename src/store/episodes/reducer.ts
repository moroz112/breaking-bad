import {
  IEpisodesState,
  EpisodesActionTypes,
  EPISODES_GET,
  EPISODES_GET_ERROR,
  EPISODES_GET_SUCCESS,
  EPISODE_GET_ONE,
  EPISODE_GET_ONE_ERROR,
  EPISODE_GET_ONE_SUCCESS,
} from './types';
import { RequestState } from '../types';

const initialState: IEpisodesState = {
  episodes: [],
  episodesGetState: null,
  episodesGetError: null,

  currentEpisode: null,
  episodeByIdGetState: null,
  episodeByIdGetError: null,
};

const CountryReducer = (state = initialState, action: EpisodesActionTypes) => {
    switch (action.type) {
      case EPISODES_GET:
        return {
          ...state,
          episodesGetState: RequestState.Loading
        }

      case EPISODES_GET_ERROR:
        return {
          ...state,
          episodesGetState: RequestState.Error,
          episodesGetError: action.payload
        }

      case EPISODES_GET_SUCCESS:
        return {
          ...state,
          episodesGetState: RequestState.Success,
          episodesGetError: null,
          episodes: action.payload
        }

      case EPISODE_GET_ONE:
        return {
          ...state,
          episodeByIdGetState: RequestState.Loading
        }

      case EPISODE_GET_ONE_ERROR:
        return {
          ...state,
          episodeByIdGetState: RequestState.Error,
          episodeByIdGetError: action.payload,
        }

      case EPISODE_GET_ONE_SUCCESS:
        return {
          ...state,
          episodeByIdGetState: RequestState.Success,
          episodeByIdGetError: null,
          currentEpisode: action.payload,
        }

      default:
        return initialState;
    }
};

export default CountryReducer;
