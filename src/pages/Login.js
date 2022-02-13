/*
  Como tirar autocomplete no input
  Source Link: https://gist.github.com/niksumeiko/360164708c3b326bd1c8

  Retirei essa image usando printscreen no figma dispobilidado no README do projeto
  Source Link: https://www.figma.com/file/BDQgAJvOe4KNUjmrYh5t68/TrybeTunes-Figma

  Correção do erro Can't perform a React state update on an unmounted component
  Créditos à Rodrigo Augusto Turma 13 Tribo C, Summer de Instrução Turma 17
  Source Link: https://trybecourse.slack.com/archives/C02EZT1EJSY/p1642174981051300?thread_ts=1642101209.289600&cid=C02EZT1EJSY
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './styles/Login.css';
import logo from '../image/trybetunes-logo.png';

const MIN_USER_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      user: '',
      isLoading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    document.querySelector('.body__header').style.display = 'none';
  }

  componentWillUnmount() {
    this.setState = () => { };
    document.querySelector('.body__header').style.display = 'block';
  }

  controllButton = ({ target: { value } }) => {
    let letDisabled = true;
    if (value.length >= MIN_USER_LENGTH) letDisabled = false;
    this.setState({
      isDisabled: letDisabled,
      user: value,
    });
  }

  validadeLogin = (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: user })
      .then(() => this.setState({ isLoading: false, redirect: true }));
  }

  render() {
    const { isDisabled, isLoading, redirect } = this.state;

    return (
      <main data-testid="page-login" className="main__login container">

        {redirect && <Redirect to="/search" />}

        <section className="login-screen-logo">
          <img
            src={ logo }
            alt="logo"
            className="animate__animated animate__flipInX"
          />
        </section>

        <section
          className={ `
                      login__input
                      py-5
                      animate__animated
                      animate__bounceInUp
                      animate__delay-1s` }
        >
          {isLoading ? (
            <Loading />
          ) : (

            <form className="row">
              <div className="col-12">
                <label htmlFor="user" className="username-label form-label w-100">
                  Login
                  <input
                    data-testid="login-name-input form-control p-3"
                    type="text"
                    id="user"
                    className="username-input"
                    onChange={ this.controllButton }
                    autoComplete="off"
                    placeholder="usuario"
                  />
                </label>
              </div>
              <div className="col-12">
                <button
                  className="login-button btn btn-success p-2"
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ isDisabled }
                  onClick={ this.validadeLogin }
                >
                  Entrar
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
