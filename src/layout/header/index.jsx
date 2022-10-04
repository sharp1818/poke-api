/* eslint-disable global-require */
import './header.scss';
import Background from '../../images/background.jpg';

function Header() {
  return (
    <header className="header-container">
      <img src={Background} alt="background" />
      <div className="text-container">
        <div className="text">
          <h1>Poke Api</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
