import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

interface PaginationState {
  count: number;
  page: number;
  setPage: any;
}

function PaginationComponent({ count, page, setPage }: PaginationState) {
  const matches = useMediaQuery('(min-width:500px)');
  const handleChange = (e: any, value: number) => {
    setPage(value);
  };
  return (
    <Stack
      spacing={0}
      direction="row"
      justifyContent="center"
      sx={{ p: `${matches ? '3rem 0rem 3rem 0rem' : '2rem 1.8rem 2rem 1.8rem'}` }}>
      <Pagination
        size={matches ? 'medium' : 'small'}
        count={count}
        page={page}
        onChange={handleChange}
        boundaryCount={matches ? 2 : 0}
        variant="outlined"
        color="primary"
        shape="rounded"
        hideNextButton={count === 0 && true}
        hidePrevButton={count === 0 && true}
      />
    </Stack>
  );
}

export default PaginationComponent;
