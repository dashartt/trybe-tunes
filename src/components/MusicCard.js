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
    const { music } = this.props;
    const { isFavorite } = this.state;
    return (
      <div
        className="music-card animate__animated animate__flipInX"
      >
        <span>{music.trackName} - {music.artistName}</span>
        <div style={ { display: 'flex', alignItems: 'center' } }>
          <img
            src={ music.artworkUrl100 }
            alt={ `capa do album ${music.collectionName} - ${music.artistName}` } 
            className="music-artwork"
          />

          <audio className="w-100" src={ music.previewUrl } controls>
            <track kind="captions" />
          </audio>

          <button
            type="button"
            aria-label="favorite music"
            className="fa-solid fa-heart border-0"
            onClick={ this.toggleFavorite }
            style={ { color: isFavorite ? 'red' : 'black' } }
          />
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
