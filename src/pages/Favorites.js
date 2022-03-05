import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import './styles/Favorites.css';
import Header from '../components/Header';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.getUpdateFromMusicCard();
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  getUpdateFromMusicCard = () => {
    getFavoriteSongs()
      .then((data) => {
        this.setState({ favoriteMusics: data },
          this.recoverFavoriteSongs);
      });
  }

  render() {
    const { favoriteMusics } = this.state;
    console.log(favoriteMusics);
    return (
      <>
        <Header />
        <main>
          <div
            data-testid="page-favorites"
            style={{backgroundColor: favoriteMusics.length > 0 ? "":"#333"}}
            className="favorites-screen container mt-5"
          >
            <section className="favorite-container row">
              <h1>Favoritas</h1>
              {
                favoriteMusics.length > 0 ? (
                  favoriteMusics.map((music) => (
                    <section
                      key={`${music.collectionId}-${music.trackCount}-${Math.random() * 100}`}
                      className="col-12 col-lg-6"
                    >
                      <MusicCard
                        music={music}
                        sendUpdateFromFavorite={this.getUpdateFromMusicCard}
                      />
                      {console.log(music)}
                    </section>
                  ))
                ) : (
                  <p style={{color: 'whitesmoke', fontSize: '1.7rem'}}>Nenhuma música adicionada como favorito</p>
                )
              }
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default Favorites;
