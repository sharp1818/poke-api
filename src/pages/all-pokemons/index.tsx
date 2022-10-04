/* eslint-disable dot-notation */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles.scss';
import PaginationComponent from '../../components/paginationComponent/index';
import InputComponent from '../../components/inputComponent/index';
import CardComponent from '../../components/cardComponent/index';

function AllPokemons() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const pokemonName = useRef('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 20;
  const pokemonPerPage = 20;

  const fetchpokemons = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/${pokemonName.current}?offset=${offset}&limit=${pokemonPerPage}`
      );
      if (res.data.count) {
        setData(res.data.results);
        setCount(Math.round(res.data.count / 20));
      } else if (res.data.name) {
        const obj: any = [
          { name: `${res.data.name}`, url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/` }
        ];
        setData(obj);
      } else if (res) {
        setData(res.data);
        setCount(0);
      }
      setErrorMessage('');
    } catch (error) {
      setCount(0);
      setErrorMessage('Is not found');
    }
  };

  useEffect(() => {
    fetchpokemons();
  }, [page]);

  return (
    <div>
      <InputComponent pokemonName={pokemonName} fetch={fetchpokemons} />
      {errorMessage === '' ? (
        <div className="pokemons-container">
          {data.map((pokemon) => (
            <CardComponent
              key={pokemon['name']}
              pokemonName={pokemon['name']}
              url={pokemon['url']}
            />
          ))}
        </div>
      ) : (
        <div className="message-error">{errorMessage}</div>
      )}
      <PaginationComponent count={count} page={page} setPage={setPage} />
    </div>
  );
}

export default AllPokemons;
