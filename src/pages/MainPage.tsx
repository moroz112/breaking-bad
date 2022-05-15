import clsx from 'clsx';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppStore, RequestState } from '../store/types';
import { episodesGet } from '../store/episodes/actions';
import { EpisodeSeries, IEpisode } from '../store/episodes/types';

const episodesColumns = [
  {
    key: 'episode',
    dataIndex: 'episode',
    title: 'Episode Number',
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Title',
  },
];

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { episodes, episodesGetState } = useSelector((store: AppStore) => store.episodes);
  const [series, setSeries] = useState<EpisodeSeries>(EpisodeSeries.BreakingBad);
  const [season, setSeason] = useState(1);
  const [seasonsCount, setSeasonsCount] = useState(1);
  const isLoading = episodesGetState === RequestState.Loading;

  useEffect(() => {
    dispatch(episodesGet(series));
    setSeason(1);
  }, [dispatch, series]);

  useEffect(() => {
    setSeasonsCount(
      episodes?.reduce(
        (acc, currentValue) =>
          Number(currentValue.season) > acc ? Number(currentValue.season) : acc,
        0,
      ) || 1
    );
  }, [episodes]);

  const filteredEpisodes = episodes?.filter((episode) => Number(episode.season) === season)

  const onRowCLick = (entity: IEpisode) => {
    navigate(`/episode/${entity.episode_id}`);
  };

  return (
    <main className="max-w-2xl mx-auto mt-16">
      <div className="flex justify-between mt-8 mb-2">
        <h2 className="text-2xl font-bold leading-7 text-gray-900">Episodes</h2>
        <nav className="flex">
          <div
              className={clsx('cursor-pointer ml-8 px-4', {
                'text-red-600': series === EpisodeSeries.BetterCallSaul,
              })}
              onClick={() => setSeries(EpisodeSeries.BetterCallSaul)}
          >
            Better Call Saul
          </div>
          <div
            className={clsx('cursor-pointer', {
              'text-red-600': series === EpisodeSeries.BreakingBad,
            })}
            onClick={() => setSeries(EpisodeSeries.BreakingBad)}
          >
            Breaking Bad
          </div>
        </nav>
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="flex py-4">
            {Array.from(Array(seasonsCount).keys()).map((index) => (
                <div
                    className={clsx('px-2 cursor-pointer', {'text-red-600': index + 1 === season})}
                    key={index}
                    onClick={() => setSeason(index + 1)}
                >
                  {index + 1}
                </div>
            ))}
          </div>

          {!!episodes.length && (
            <Table
              columns={episodesColumns}
              data={filteredEpisodes}
              keyIndex="episode_id"
              onRowCLick={onRowCLick}
            />
          )}
        </>
      )}
    </main>
  );
};

export default MainPage;
