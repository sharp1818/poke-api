import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from 'usehooks-ts';
import Button from '@mui/joy/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ModalComponent from '../modalComponent/index';

import { AddFav, CheckFav } from '../../utils/helper';

interface Pokemon {
  pokemonName: string | any;
  url: string | any;
}

function CardComponent({ pokemonName, url }: Pokemon) {
  const [favs, setFavs] = useLocalStorage('favs', null);
  const [open, setOpen] = useState(false);
  const [pokemonId, setPokemonId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [err, setErr] = useState(true);
  const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const fetchpokemon = async () => {
    try {
      const res = await axios.get(`${url}`);
      setPokemonId(res.data.id);
      if (res.data.sprites.other.home.front_default !== null) {
        setImageUrl(res.data.sprites.other.dream_world.front_default);
      } else {
        setImageUrl(res.data.sprites.other.home.front_default);
      }
      setErr(true);
    } catch (error) {
      setErr(false);
    }
  };

  useEffect(() => {
    fetchpokemon();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        border: '1px solid #979797',
        borderRadius: '6px',
        ':hover': { background: 'none', outline: 'none', borderColor: '#979797' }
      }}>
      <Stack
        sx={{
          borderRadius: '6px 0px 0px 6px',
          opacity: '0.8',
          width: '100%',
          minHeight: '5.625rem',
          padding: '10px'
        }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            sx={{
              fontSize: '1rem',
              textTransform: 'capitalize',
              color: '#767676',
              display: 'flex',
              justifyContent: 'center'
            }}>
            {pokemonName}
          </Typography>
          <Box
            sx={{
              height: 150,
              width: 150
            }}
            component="img"
            src={pokemonId !== '' && err ? IMAGE_URL : imageUrl}
            alt={pokemonName}
          />
          <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
            Ver Detalles
          </Button>
        </Box>
      </Stack>
      <IconButton
        variant="soft"
        color="neutral"
        onClick={() => {
          AddFav(pokemonName, url, favs, setFavs);
        }}
        sx={{
          borderRadius: '0px 6px 6px 0px',
          width: '4.25rem',
          opacity: '0.8'
        }}>
        {CheckFav(pokemonName, favs) ? (
          <FavoriteIcon sx={{ color: '#DD0031' }} />
        ) : (
          <FavoriteBorder sx={{ color: '#DD0031' }} />
        )}
      </IconButton>
      <ModalComponent open={open} setOpen={setOpen} pokemonId={pokemonId} />
    </Stack>
  );
}

export default CardComponent;
