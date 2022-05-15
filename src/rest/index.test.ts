import axios from 'axios';
import {getEpisodes, getEpisodeById, getCharacterById} from './index';
import {EpisodeSeries} from '../store/episodes/types';

const axiosMock = (axios as unknown) as jest.Mock;
jest.mock('axios');

describe('rest', () => {
   test('getEpisodes', async () => {
      const get = jest.fn();
      const expected = [
         `https://www.breakingbadapi.com/api/episodes`,
          {
            params: {
               series: EpisodeSeries.BreakingBad
            }
          }
      ]

      axiosMock.mockImplementationOnce(get);

      await getEpisodes(EpisodeSeries.BreakingBad);

      expect(axiosMock).toHaveBeenCalledWith(...expected);
   });

   test('getEpisodeId', async () => {
       const get = jest.fn();
       const expected = [
           `https://www.breakingbadapi.com/api/episodes/22`,
       ]

       axiosMock.mockImplementationOnce(get);

       await getEpisodeById(22);

       expect(axiosMock).toHaveBeenCalledWith(...expected);
   });

    test('getCharacterById', async () => {
        const get = jest.fn();
        const expected = [
            `https://www.breakingbadapi.com/api/characters`,
            {
                params: {
                    name: 'Walter White'
                }
            }
        ]

        axiosMock.mockImplementationOnce(get);

        await getCharacterById('Walter White');

        expect(axiosMock).toHaveBeenCalledWith(...expected);
    });
});