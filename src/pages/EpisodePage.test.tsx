import React from 'react';
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState } from '../store/types';
import { useParams } from 'react-router-dom';
import EpisodePage, {
  humanizeString
} from './EpisodePage';

jest.mock('react-redux');
jest.mock('react-router');

const mockData = {
  episodeByIdGetState: RequestState.Success,
  currentEpisode: {
    air_date: '03-02-2015',
    characters: [
      'Jimmy McGill',
      'Mike Erhmantraut',
      'Kim Wexler',
      'Howard Hamlin',
      'Chuck McGill',
      'Nacho Varga',
    ],
    episode: '5',
    episode_id: 67,
    season: '1',
    series: 'Better Call Saul',
    title: 'Alpine Shepherd Boy',
  },
};

test('EpisodePage must render loading', () => {
  (useSelector as any).mockImplementationOnce(() => ({ episodeByIdGetState: RequestState.Loading }));
  (useParams as any).mockImplementationOnce(() => ({ id: '1' }));
  (useDispatch as any).mockImplementationOnce(() => () => {});
  const component = renderer.create(<EpisodePage />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('EpisodePage must render data', async () => {
  (useSelector as any).mockImplementationOnce(() => mockData);
  (useParams as any).mockImplementationOnce(() => ({ id: '1' }));
  (useDispatch as any).mockImplementationOnce(() => () => {});
  const component = renderer.create(<EpisodePage />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('humanize string works correctly', () => {
  const val = 'some_value';
  const result = humanizeString(val);
  const expected = 'some value';

  expect(expected).toEqual(result);
})
