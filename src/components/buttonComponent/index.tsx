import Button from '@mui/joy/Button';
import './buttonComponent.scss';

interface Location {
  currentpath: string;
  pathname: string;
  text: string;
}

function ButtonComponent({ currentpath, pathname, text }: Location) {
  return (
    <div className="button-container">
      <Button
        variant="outlined"
        color={currentpath === pathname ? 'primary' : 'neutral'}
        sx={{
          borderRadius: '2px',
          minWidth: '6.125rem',
          maxHeight: '2.6rem',
          minHeight: '2.6rem'
        }}>
        <span className="text-container">{text}</span>
      </Button>
    </div>
  );
}

export default ButtonComponent;
