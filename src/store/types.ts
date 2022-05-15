import { ICharactersState } from './characters/types';
import { IEpisodesState } from './episodes/types';

export enum RequestState {
  Loading,
  Saving,
  Success,
  Error,
}

export interface AppStore {
  episodes: IEpisodesState;
  characters: ICharactersState;
}
