import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    const userInfo = getUser();
    this.setState({userName: userInfo.name })
      // .then((userInfo) => this.setState({ userInfo }));
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component" className="body__header container-fluid">
        <div className="row header__content mx-auto">
          <div className="header__item col-12 col-lg-4 header__username">
            <span data-testid="header-user-name py-5">
              { !userName && <Loading /> }
              { userName }
            </span>
          </div>

          <nav className="header__item col-12 col-lg-8">
            <Link to="/search">Pesquisar</Link>
            <Link to="/favorites"> Favoritas </Link>
            <Link to="/profile">Perfil</Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
