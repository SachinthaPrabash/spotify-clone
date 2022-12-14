import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from "lodash"
import { playlistsIdState, playlistState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs';



const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
]

function Center() {

    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistsIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);


    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => console.log("something went wrong", err));
    }, [spotifyApi, playlistId]);


    // console.log(playlist);

    return (

        <div className='flex-grow h-screen overflow-scroll scrollbar-hide'>
            <header className='absolute top-5 right-8'>

                <div className='flex items-center bg-red-200 space-x-3 
                opacity-90 hover:opacity-80 cursor-pointer rounded-full
                p-1 pr-2' onClick={signOut}>
                    <img className='rounded-full w-10 h-10 border border-black'
                        src={session?.user.image} alt='' />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b
             to-black ${color} text-white padding-8 h-80 p-8`} >
                <img src={playlist?.images?.[0]?.url} alt={playlist?.name}
                    className="h-44 w-44 shadow-2xl" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>

        </div >

    );
};

export default Center


