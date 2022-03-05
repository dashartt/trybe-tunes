import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import './styles/Album.css';
import Header from '../components/Header';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
    .then((data) => {
    this.setState({ musics: data });
    });
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  render() {
    const { musics } = this.state;
    return (
      <>
        <Header />
        <main>
          <section className="album-screen">
            <section className="album-container container">

              <div className='row'>
                <div className='col-12'>
                  <Link to="/search">Voltar para todos albuns</Link>
                </div>
                <div className='col-12 col-md-4 mt-3'>
                  {musics.length > 0 && (
                    <div className='row'>
                      <div className='col-12'>
                        <img src={musics[0].artworkUrl100} width="100%" alt="capa do album" />
                      </div>
                      <div className='col-12 d-flex flex-column'>
                        <span className='fs-3'>{musics[0].artistName}</span>
                        <span className='fs-4'>{musics[0].collectionName}</span>
                      </div>
                    </div>
                  )}
                </div>
                {musics.length > 0 && (

                  <section className="col-12 col-md-8 px-lg-4">
                    {musics
                      .filter((music) => music.kind)
                      .map((music) => (
                        <div className='px-lg-4' key={music.trackId}>
                          <MusicCard
                            music={music}
                            page="album"
                          />
                        </div>
                      ))}
                  </section>

                )}
              </div>
            </section>
          </section>
        </main>
      </>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
