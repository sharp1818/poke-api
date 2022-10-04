/* eslint-disable dot-notation */
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocalStorage } from 'usehooks-ts';
import { CSVLink } from 'react-csv';
import Button from '@mui/joy/Button';
import CardComponent from '../../components/cardComponent';
import { chunckArrayInGroups } from '../../utils/helper';
import './styles.scss';

function FavPokemons() {
  const [favs] = useLocalStorage('favs', null);
  const [listFav, setListFav] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [digit, setDigit] = useState(0);
  const csvData = favs;

  const fetchData = () => {
    const favsArray = chunckArrayInGroups(favs, 10);
    if (favsArray.length === digit + 1) {
      setHasMore(false);
    } else {
      setDigit(digit + 1);
    }
  };

  useEffect(() => {
    const fetchpokemons = async () => {
      const favsArray = chunckArrayInGroups(favs, 10);
      const totalFavs = listFav.concat(favsArray[digit]);
      setListFav(totalFavs);
    };
    if (favs === null) {
      setListFav([]);
      setHasMore(false);
    } else if (favs.length === 0) {
      setListFav([]);
      setHasMore(false);
    } else {
      fetchpokemons();
    }
  }, [digit]);

  return (
    <div>
      <div className="download-button-container">
        <CSVLink data={csvData} filename="pokemon-list.csv">
          <Button color="neutral" size="lg" variant="outlined">
            Download Favs
          </Button>
        </CSVLink>
      </div>
      <InfiniteScroll
        className="fav-container"
        dataLength={listFav.length}
        next={() => fetchData()}
        scrollableTarget="scrollableDiv"
        hasMore={hasMore}
        loader={<h3 className="infinite-scroll-message">Loading...</h3>}
        endMessage={<h3 className="infinite-scroll-message">You have seen it all</h3>}>
        <div className="pokemons-container">
          {listFav.map((pokemon) => (
            <CardComponent
              key={pokemon['name']}
              pokemonName={pokemon['name']}
              url={pokemon['url']}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default FavPokemons;
