import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';
import {getEpisodes as axiosGetEpisodes, getEpisodeById} from '../../rest';
import {
    getEpisodes,
    getOneEpisode,
} from './sagas';
import {
    episodesGetSuccess,
    episodesGetError,
    episodeGetOneSuccess,
    episodeGetOneError
} from './actions';
import {EpisodeSeries, IEpisode} from './types';

describe('episodes sagas workers', () => {

    test('getEpisodes succeed', () => {
        expectSaga(getEpisodes, [] as any)
            .provide([[matchers.call.fn(axiosGetEpisodes), {data: []}]])
            .put(episodesGetSuccess([]))
            .run();
    });

    test('getEpisodes fail', () => {
        const error = new Error('Network Error');
        expectSaga(getEpisodes, [] as any)
            .provide([
                [matchers.call.fn(axiosGetEpisodes), throwError(error)],
            ])
            .put(episodesGetError('Network Error'))
            .run();
    });

    test('getOneEpisode succeed', () => {
        const episodeItem = {
            episode_id: 2,
            title: 'Episode title',
            season: 2,
            episode: 4,
            air_date: '22-10-2018',
            characters: [],
            series: EpisodeSeries.BreakingBad
        };

        expectSaga(getOneEpisode, [] as any)
            .provide([[matchers.call.fn(getEpisodeById), {data: [episodeItem]}]])
            .put(episodeGetOneSuccess(episodeItem))
            .run();
    });

    test('getOneEpisode fail', () => {
        const error = new Error('Network Error');
        expectSaga(getOneEpisode, [] as any)
            .provide([
                [matchers.call.fn(getEpisodeById), throwError(error)],
            ])
            .put(episodeGetOneError('Network Error'))
            .run();
    });
})