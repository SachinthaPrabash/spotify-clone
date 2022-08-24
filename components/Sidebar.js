import React, { useEffect, useState } from 'react'
import { HeartIcon, HomeIcon, LibraryIcon, LogoutIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil';
import { playlistsIdState } from '../atoms/playlistAtom'



function Sidebar() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [Playlists, setPlaylists] = useState([]);
    const [playlistsId, setPlaylistsId] = useRecoilState(playlistsIdState);



    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    // console.log(Playlists)
    console.log("picked by " + playlistsId);

    return (
        <div className='text-gray-500 p-5 text-xm border-r border-gray-900
         overflow-y-scroll h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem]
         lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4' >

                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'></hr>


                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900'></hr>

                {/* platlist */}

                {Playlists.map((Playlists) => (
                    <p key={Playlists.id} onClick={() => setPlaylistsId(Playlists.id)} className='cursor-pointer hover:text-white'>
                        {Playlists.name}</p>
                ))}



            </div>
        </div>
    )
}

export default Sidebar;
