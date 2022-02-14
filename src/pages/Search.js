/*
  Deixar texto do album somente em uma linha, mesmo que corte
  Source Link: https://medium.com/@ronal2do/como-fazer-substring-apenas-com-css-ebd6a227ac75

  No results found image gratuita disponível no site abaixo
  Source Link: https://www.clipartmax.com/middle/m2H7H7H7H7b1i8b1_search-results-are-finished-no-results-found-cartoon/
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './styles/Search.css';

const MIN_ARTIST_LENGTH = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      isLoading: false,
      wasSearched: false,
      searchFor: '',
      artistAlbums: [],
      artistName: '',
    };
  }

  componentWillUnmount() {
    this.setState = () => {}
  }

  componentDidUpdate(prevProps, prevState) {
    const { wasSearched } = this.state;
    if ((prevState.wasSearched !== wasSearched)) {
      searchAlbumsAPI(prevState.searchFor)
        .then((data) => {
          this.setState({
            isLoading: false,
            artistAlbums: data,
            artistName: prevState.searchFor,
          });
        });
    }
  }

  controllButton = ({ target: { value } }) => {
    let letDisabled = true;
    if (value.length >= MIN_ARTIST_LENGTH) letDisabled = false;
    this.setState({
      isDisabled: letDisabled,
      searchFor: value,
      wasSearched: false,
    });
  }

  searchArtist = (event) => {
    event.preventDefault();
    this.setState({
      searchFor: '',
      wasSearched: true,
      isLoading: true,
    });
  }

  render() {
    const {
      isDisabled,
      searchFor,
      isLoading,
      artistAlbums,
      artistName,
      wasSearched,
    } = this.state;

    return (
      <main>
        <section
          data-testid="page-search"
          className="search-container animate__animated animate__flipInX container"
        >
          <form className="row">
            <div className="col">
              <input
                type="text"
                data-testid="search-artist-input"
                id="search-artist"
                value={searchFor}
                onChange={this.controllButton}
                placeholder="Artista ou banda"
                autoComplete="off"
              />

            </div>
            <div className="col">
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={isDisabled}
                onClick={this.searchArtist}
              >
                Pesquisar
              </button>
            </div>
          </form>
        </section>

        <section className="container">
          <div className="row mx-auto">
            {isLoading && <Loading />}
            {artistAlbums.length > 0 && (
              <p className="search-result">{`Albuns de: ${artistName}`}</p>
            )}
            {wasSearched && artistAlbums.length === 0 && (
              <section className="no-results animate__animated animate__flipInX">
                <p className="search-result">Nenhum álbum foi encontrado</p>
                {/* <img src={noResults} alt="not found anything" /> */}
              </section>
            )}
          </div>
        </section>

        <section className="container">
          {artistAlbums.length > 0 ? (
            <section className="animate__animated">
              <div className="albums-container row ">
                {artistAlbums.map((album) => (
                  <section
                    key={album.collectionId}
                    className="album-card animate__animated animate__zoomIn"
                  >
                    <Link
                      to={`/album/${album.collectionId}`}
                      data-testid={`link-to-album-${album.collectionId}`}
                    >
                      <p>{album.collectionName}</p>
                      <img
                        src={album.artworkUrl100}
                        width="100%"
                        alt={album.artistName}
                      />
                    </Link>
                  </section>
                ))}
              </div>
            </section>
          ) : (
            <div className="row">
              <section className="search-nothing" />
            </div>
          )}
        </section>
      </main>
    );
  }
}

export default Search;
