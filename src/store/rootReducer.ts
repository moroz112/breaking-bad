import { combineReducers } from 'redux';
import EpisodesReducer from './episodes/reducer';
import CharactersReducer from './characters/reducer';

const rootReducer = combineReducers({
  episodes: EpisodesReducer,
  characters: CharactersReducer,
});

export default rootReducer;
