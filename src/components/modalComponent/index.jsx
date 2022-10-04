/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
import { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import Box from '@mui/joy/Box';
import './modalComponent.scss';

function ModalComponent({ open, setOpen, pokemonId }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const fetchUrl = `${apiUrl}/${pokemonId}/`;
  const [info, setInfo] = useState({
    name: '',
    height: '',
    weight: '',
    types: [{}]
  });
  const fetchpokemoninfo = async () => {
    try {
      const res = await axios.get(`${fetchUrl}`);
      const pokemonData = {
        name: res.data.name,
        height: res.data.height,
        weight: res.data.weight,
        types: res.data.types.map((type) => type.type),
        sprites: res.data.sprites
      };
      setInfo(pokemonData);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (pokemonId && open === true) {
      fetchpokemoninfo();
    }
  }, [open]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg'
        }}>
        <ModalClose
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body'
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          textTransform="capitalize"
          mb={1}>
          {info['name']}
        </Typography>
        <Box
          className="image-container"
          component="img"
          src={pokemonId !== '' && IMAGE_URL}
          alt={pokemonId}
        />
        <Typography id="modal-desc" textColor="text.tertiary" fontSize="18px">
          Height: {info['height']}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" fontSize="18px">
          Weight: {info['weight']}
        </Typography>
        <Typography
          id="modal-desc"
          textColor="text.tertiary"
          textTransform="capitalize"
          fontSize="18px">
          Types:
          {info['types'].map((type) => (
            <div className="types-container" key={type['slot']}>
              <KeyboardArrowRightIcon />
              {type['name']}
            </div>
          ))}
        </Typography>
      </Sheet>
    </Modal>
  );
}

export default ModalComponent;
