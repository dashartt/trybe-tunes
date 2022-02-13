/*
  Regex de email e a sintaxe para entender como é o processo por trás
  Source Link: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  Correção do erro Can't perform a React state update on an unmounted component
  Créditos à Rodrigo Augusto Turma 13 Tribo C, Summer de Instrução Turma 17
  Source Link: https://trybecourse.slack.com/archives/C02EZT1EJSY/p1642174981051300?thread_ts=1642101209.289600&cid=C02EZT1EJSY
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import './styles/ProfileEdit.css';
import perfilImage from '../image/empty-image-perfil.png';

const EMAIL_SHOULD_CONTAIN = /[a-z0-9]+@+[a-z]+.+[a-z]/;

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      isLoading: true,
      isDisabled: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    getUser()
      .then(({ name, email, description, image }) => {
        this.setState({ name, email, description, image, isLoading: false });
      });
  }

  componentWillUnmount() {
    this.setState = () => { };
  }

  validations = () => {
    const { name, email, description, image, isDisabled } = this.state;
    let canDisable = isDisabled;
    if (name === ''
      || email === ''
      || !EMAIL_SHOULD_CONTAIN.test(email)
      || description === ''
      || image === '') canDisable = true;
    else canDisable = false;

    this.setState({ isDisabled: canDisable });
  }

  handleInput = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, this.validations);
  }

  updateInfoUser = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true },
      () => {
        const { name, email, description, image } = this.state;
        updateUser({ name, email, description, image })
          .then(() => this.setState({ isLoading: false, redirect: true }));
      });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      isDisabled,
      redirect } = this.state;
    return (
      <main>
        {redirect && <Redirect to="/profile" />}
        <section className="profile-edit-screen container">
          <h1>Editar perfil</h1>
          <section className="row mx-auto">
            <section
              className="image-container col-12 col-sm-6 d-flex justify-content-center"
            >
              <img src={ image || perfilImage } alt="imagem de perfil" />
              {/* {isLoading && <Loading />} */}
            </section>
            <form className="col-12 col-sm-6">
              <label htmlFor="name">
                Name
                <input
                  autoComplete="off"
                  type="text"
                  id="name"
                  value={ name }
                  data-testid="edit-input-name"
                  onChange={ this.handleInput }
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  autoComplete="off"
                  type="text"
                  id="email"
                  value={ email }
                  data-testid="edit-input-email"
                  onChange={ this.handleInput }
                />
              </label>
              <label htmlFor="description">
                Descrição
                <textarea
                  id="description"
                  value={ description }
                  data-testid="edit-input-description"
                  onChange={ this.handleInput }
                />
              </label>
              <label htmlFor="image">
                Imagem de perfil

                <input
                  autoComplete="off"
                  id="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleInput }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.updateInfoUser }
              >
                Salvar
              </button>
            </form>
          </section>
        </section>
      </main>
    );
  }
}

export default ProfileEdit;
