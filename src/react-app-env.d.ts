/// <reference types="react-scripts" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Fix for Spotify types
interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: Array<{
      url: string;
    }>;
  };
  artists: Array<{
    name: string;
  }>;
  external_urls: {
    spotify: string;
  };
}
