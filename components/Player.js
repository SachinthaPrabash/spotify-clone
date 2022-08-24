import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import React, { useCallback, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { CurrentTrackIdState, IsPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { SwitchHorizontalIcon, RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';

function Player() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentIdTrack, SetCurrentIdTrack] = useRecoilState(CurrentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(IsPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now Playing", data.body?.item);
                SetCurrentIdTrack(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data => {

                    setIsPlaying(data.body?.is_playing);
                }))
            });

        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentIdTrack) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [CurrentTrackIdState, spotifyApi, session]);


    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => { });
        }, 500),
        []
    );

    return (
        <div className='h-24 bg-gradient-to-b
         from-black to-gray-900 text-white grid grid-cols-3
          text-xs md:text-base px-2 md:px-8'>
            {/* left section */}
            <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-10 w-10 '
                    src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
                <HeartIcon className='button hover:scale-125 ' />
            </div>

            {/* center section */}
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='button hover:scale-125 ' />
                <RewindIcon className='button hover:scale-125 ' />

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className='button w-10 h-10 hover:scale-125' />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className='button w-10 h-10 hover:scale-125' />
                )}

                <FastForwardIcon className='button hover:scale-125 ' />

                <ReplyIcon className='button hover:scale-125 ' />

            </div>

            {/* Right section */}

            <div className='flex items-center space-x-3 
            md:space-x-4 justify-end pr-5'>
                <VolumeDownIcon
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className='button hover:scale-125 ' />
                <input type='range'
                    className='w-14 md:w-28'
                    onChange={(e) => setVolume(Number(e.target.value))}
                    value={volume} min={0} max={100} />
                <VolumeUpIcon
                    className='button hover:scale-125 '
                    onClick={() => volume < 100 && setVolume(volume + 10)} />
            </div>
        </div>
    )
}

export default Player
