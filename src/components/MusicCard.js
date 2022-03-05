import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import './styles/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((data) => {
        this.setState(
          { favoriteMusics: data },
          this.recoverFavoriteSongs,
        );
      });
  }

  toggleFavorite = () => {
    this.setState((prevState) => ({ isFavorite: !prevState.isFavorite }),
      () => {
        const { isFavorite } = this.state;
        const { music, sendUpdateFromFavorite } = this.props;

        if (isFavorite) {
          addSong(music);
        } else {
          removeSong(music);
        }
        if (sendUpdateFromFavorite) sendUpdateFromFavorite();
      });
  }

  recoverFavoriteSongs = () => {
    const { favoriteMusics } = this.state;
    const { music } = this.props;
    const wasFavorite = favoriteMusics.some((_music) => _music.trackId === music.trackId);

    if (wasFavorite) {
      this.setState({
        isFavorite: wasFavorite,
      });
    }
  }

  render() {
    const { music, page } = this.props;
    const { isFavorite } = this.state;
    return (
      <div
        className="music-card animate__animated animate__flipInX"
      >
        <div className='row position-relative' style={{ display: 'flex', alignItems: 'center' }}>
          {page !== 'album' && (
            <div className='col-12 col-sm-4'>
              <img
                src={music.artworkUrl100}
                alt={`capa do album ${music.collectionName} - ${music.artistName}`}
                className="music-artwork d-none d-sm-block"
              />
            </div>
          )}
          <div className={`col-12 ${page !== 'album' ? 'col-sm-8':''} d-flex flex-column align-items-start`}>
            <span className="music-title-artist">{music.trackName} - {music.artistName}</span>
            <audio className="w-100 border" src={music.previewUrl} controls>
              <track kind="captions" />
            </audio>

            <button
              type="button"
              aria-label="favorite music"
              className="fa-solid fa-heart border-0 fav-icon position-absolute end-0 bottom-0"
              onClick={this.toggleFavorite}
              style={{ color: isFavorite ? 'red' : 'white' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string,
  preview: PropTypes.string,
  sendUpdateFromFavorite: PropTypes.func,
}.isRequired;

export default MusicCard;
