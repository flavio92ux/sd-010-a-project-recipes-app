import React from 'react';
import { string } from 'prop-types';

function YoutubePlayer({ url, title }) {
  return (
    <iframe
      data-testid="video"
      width="360"
      height="200"
      title={ title }
      src={ url && `https://www.youtube.com/embed/${url.split('=')[1]}` }
      frameBorder="0"
      allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
      allowFullScreen
    />
  );
}

YoutubePlayer.propTypes = { url: string, title: string }.isRequired;

export default YoutubePlayer;
