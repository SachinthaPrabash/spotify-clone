import { read } from "fs";
import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    'user-read-private',
    'user-read-email',
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-follow-modify",
    "user-follow-read",
    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "app-remote-control",
    "streaming",
    // "user-library-modify",
    "user-library-read"
].join(',');

const params = {
    scope: scopes,
};

const queryParamsString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi;

export { LOGIN_URL }; 