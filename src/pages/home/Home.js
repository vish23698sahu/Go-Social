import React, { useContext } from 'react';
import HomeCard from '../../components/homeCard/HomeCard';
import HomeLogged from '../../components/homeLogged/HomeLogged';
import { UserContext } from '../../contexts/user';
import './Home.css';

export default function Home() {
    const [user] = useContext(UserContext).user;

    return (
        <div className='home'>
            <h1 className='home__line' >Showcase your Work</h1><br />
            {
                user ?
                    <HomeLogged />
                    : <HomeCard />
            }
        </div>
    );
}
