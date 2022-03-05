const searchAlbumsAPI = async (artist) => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI, { 
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
    // cache: 'default' 
    }
  );

  const { results } = await APIResponse.json();

  const response = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default searchAlbumsAPI;
