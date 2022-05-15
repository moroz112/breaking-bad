import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { characterGetOne } from '../store/characters/actions';
import { AppStore, RequestState } from '../store/types';

const CharacterPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCharacter, characterByIdGetState } = useSelector(
    (store: AppStore) => store.characters,
  );

  useEffect(() => {
    id && dispatch(characterGetOne(id));
  }, [dispatch, id]);

  if (characterByIdGetState === RequestState.Loading || !currentCharacter) {
    return <>Loading...</>;
  }

  return (
    <div className="max-w-xs mx-auto mt-16">
        <div className="photo-wrapper p-2">
          <img
            className="w-80 h-80 mx-auto object-cover"
            src={currentCharacter.img}
            alt={currentCharacter.nickname}
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
            {currentCharacter.name}
          </h3>
          <div className="text-center text-gray-400 text-xs">
            <p>{currentCharacter.status}</p>
          </div>
          <table className="text-xs">
            <tbody>
              <tr>
                <td className="px-4 py-4 font-bold">Birth</td>
                <td className="px-4 py-4">{currentCharacter.birthday}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-bold">Nickname</td>
                <td className="px-4 py-4">{currentCharacter.nickname}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-bold">Occupations</td>
                <td className="px-4 py-4">{currentCharacter.occupation.join(', ')}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            <Link
              to="/"
              className="text-xs text-indigo-500 hover:underline hover:text-indigo-600 font-medium"
            >
              Episodes character appears in
            </Link>
          </div>
        </div>
    </div>
  );
};

export default CharacterPage;
