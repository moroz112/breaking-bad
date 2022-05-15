import {
  CHARACTER_GET_ONE,
  CHARACTER_GET_ONE_ERROR,
  CHARACTER_GET_ONE_SUCCESS,
  CharactersActionTypes,
  ICharactersState,
} from './types';
import { RequestState } from '../types';

const initialState: ICharactersState = {
  currentCharacter: null,
  characterByIdGetState: null,
  characterByIdGetError: null,
};

const CountryReducer = (state = initialState, action: CharactersActionTypes) => {
    switch (action.type) {
      case CHARACTER_GET_ONE:
        return {
          ...state,
          characterByIdGetState: RequestState.Loading
        }

      case CHARACTER_GET_ONE_ERROR:
        return {
          ...state,
          characterByIdGetState: RequestState.Error,
          characterByIdGetError: action.payload
        }

      case CHARACTER_GET_ONE_SUCCESS:
        return {
          ...state,
          characterByIdGetState: RequestState.Success,
          characterByIdGetError: null,
          currentCharacter: action.payload
        }

      default: return initialState;
    }
};

export default CountryReducer;
