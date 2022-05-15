import clsx from 'clsx';
import Button from '../components/Button/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppStore, RequestState } from '../store/types';
import { episodeGetOne } from '../store/episodes/actions';

export const humanizeString = (value: string) => {
  return value.split('_').join(' ')
}

const EpisodePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentEpisode, episodeByIdGetState } = useSelector((store: AppStore) => store.episodes);

  useEffect(() => {
    if (id) {
      dispatch(episodeGetOne(Number(id)))
    }
  }, [dispatch, id]);

  if (episodeByIdGetState === RequestState.Loading || !currentEpisode) {
    return <>Loading in progress</>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-2xl mx-auto mt-16">
      <div className="px-4 py-2 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">Episode info</h3>
        <Button onClick={() => navigate('/')}>Go To Season List</Button>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {Object.entries(currentEpisode)
            .filter(([key, val]) => key !== 'characters' && key !== 'episode_id')
            .map(([key, value], index) => (
              <div
                className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
                key={key}
              >
                <dt className="text-sm font-medium text-gray-500">{humanizeString(key)}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
              </div>
            ))}
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Characters</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="rounded-md">
                {currentEpisode.characters.map((character) => (
                  <li
                    className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    key={character}
                  >
                    <div className="w-0 flex-1 flex items-center">
                      <Link
                          to={`/character/${character}`}
                          className="font-medium text-indigo-600"
                      >
                        <span className="ml-2">{character}</span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default EpisodePage;
