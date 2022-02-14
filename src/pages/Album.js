import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import './styles/Album.css';

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
    this.setState = () => {}
  }

  render() {
    const { musics } = this.state;
    return (
      <main>
        <section className="album-screen">
          <section className="album-container container">
            <Link to="/search">Voltar para todos albuns</Link>
            {musics.length > 0 && (

              <section className="row">
                {musics
                  .filter((music) => music.kind)
                  .map((music) => (
                    <div className="col-12 col-lg-6" key={ music.trackId }>
                      <MusicCard
                        music={ music }
                      />
                    </div>
                  ))}
              </section>

            )}
          </section>
        </section>
      </main>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
