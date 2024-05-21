import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

export default function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();

    // call api lấy ra playlist (hiện thị bên Sidebar)
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            });

            const { items } = response.data;
            const playlists = items.map(({ name, id, images, type }) => {
                return {
                    name: name,
                    id: id,
                    type: type,
                    images: images[0].url,
                };
            });

            console.log(playlists);
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        };

        getPlaylistData();
    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLISTS_ID, selectedPlaylistId });
    };

    return (
        <Container>
            <ul>
                {playlists.map(({ name, id, images, type }) => {
                    return (
                        <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                            <div className="img">
                                <img src={images} alt="images" />
                            </div>
                            <div className="info">
                                <span>{name}</span>
                                <span>{type}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    overflow: hidden;
    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 1rem 1rem 1rem;
        height: 52vh;
        max-height: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.5rem;
            &-thumb {
                background-color: rgba(255, 255, 255, 0.6);
            }
        }

        li {
            display: flex;
            gap: 1rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;

            &:hover {
                color: white;
            }

            .img {
                width: 48px;
                height: 48px;
                img {
                    height: 100%;
                    object-fit: cover;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
            }
        }
    }
`;
