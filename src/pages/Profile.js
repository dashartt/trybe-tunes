/*
  Imagem de perfil padrão gratuita disponivel no site abaixo
  Source Link: https://www.pngitem.com/middle/mJiimi_my-profile-icon-blank-profile-picture-circle-hd/
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './styles/Profile.css';
import perfilImage from '../image/empty-image-perfil.png';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userInfo: {
        name: '',
        image: '',
        email: '',
        description: ''
      },
    };
  }

  componentDidMount() {
    const userInfo = getUser()
    const objUser = {
      name: userInfo.name,
      image: userInfo.image || perfilImage,
      email: userInfo.email || 'ainda não preencheu? Vá até "editar perfil"',
      description: userInfo.description || 'coloque aqui sobre você, conte um pouco do que gosta de assistir, ouvir, fazer nos tempos vagos e por ai vai :)',
    }
    this.setState({ userInfo: objUser });
  }

  componentWillUnmount() {
    this.setState = () => {}
  }

  render() {
    const { userInfo } = this.state;
    return (
      <main>
        <section className="profile-scren container">
          <div className="page-profile">
            <h1>Perfil </h1>
            <Link to="/profile/edit">Editar perfil</Link>
            {userInfo && (
              <section className="info-container row mx-auto">
                <section className="col-12 col-md-4 d-flex justify-content-center">
                  <img
                    src={userInfo.image}
                    width="100px"
                    alt={userInfo.name}
                    data-testid="profile-image"
                  />
                </section>
                <section className="col-12 col-md-8">
                  <div className="info-content">
                    <p className="info-text">Nome</p>
                    <p>{userInfo.name}</p>
                  </div>
                  <div className="email-content info-content">
                    <p className="info-text">Email</p>
                    <p>{userInfo.email}</p>
                  </div>
                  <div className="description-content info-content">
                    <p className="info-text">Descrição</p>
                    <textarea
                      className="description"
                      disabled
                      value={userInfo.description}
                    />
                  </div>
                </section>
              </section>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default Profile;
