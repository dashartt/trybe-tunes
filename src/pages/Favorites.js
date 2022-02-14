import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import './styles/Favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      // isLoading: false,
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.getUpdateFromMusicCard();
  }

  componentWillUnmount() {
    this.setState = () => {}
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
    return (
      <main>
        <div
          data-testid="page-favorites"
          className="favorites-screen animate__animated animate__zoomIn container"
        >
          <section className="favorite-container row">
            <h1>Favoritas</h1>
            {
              favoriteMusics.length > 0 && (
                favoriteMusics.map((music) => (
                  <section
                    key={ `${music.collectionId}-${music.trackCount}-${Math.random() * 100}` }
                    className="col-12 col-lg-6"
                  >
                    <MusicCard
                      music={ music }
                      sendUpdateFromFavorite={ this.getUpdateFromMusicCard }
                    />
                    {console.log(music)}
                  </section>
                ))
              )
            }
          </section>
        </div>
      </main>
    );
  }
}

export default Favorites;
