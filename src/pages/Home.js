import React from 'react'
import SideButton from '../components/SideButton'
import { faHouse, faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import TextBar from '../components/TextBar';
import PlayList from '../components/PlayList';
import TextBarSmall from '../components/TextBarSmall';
import image1 from '../images/1.jpg'
import image2 from '../images/2.jpg'
import image3 from '../images/3.jpg'
import AlbumCard1 from '../components/AlbumCard1';
import a1 from '../images/a1.jpg';
import a2 from '../images/a2.jpg';
import a3 from '../images/a3.jpg';
import a4 from '../images/a4.jpg';
import AlbumCard2 from '../components/AlbumCard2';
import c1 from '../images/c1.jpg';
import c2 from '../images/c2.jpg';
import c3 from '../images/c3.jpg';
import c4 from '../images/c4.jpg';
import c5 from '../images/c5.jpg';
import c6 from '../images/c6.jpg';
import BottomBar from '../components/BottomBar';

export default function Home() {
    return (
        <div className='bg-black-bg'>
            <div className='container w-screen mx-auto'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-2 p-5'>
                        <SideButton iconType={faHouse} name={'Home'} />
                        <SideButton iconType={faMagnifyingGlass} name={'Search'} />
                        <SideButton iconType={faList} name={'Library'} />
                        <TextBar title={'PLAYLIST'} size={'text-xl'} />
                        <PlayList name={'Random'} imageName={image1} />
                        <PlayList name={'Best 2023'} imageName={image2} />
                        <PlayList name={'Metal'} imageName={image3} />
                        <div style={{ height: '50px' }}></div>
                        <TextBarSmall title={'Blues'} />
                        <TextBarSmall title={'Classic'} />
                        <TextBarSmall title={'Indie'} />
                        <TextBarSmall title={'Folk'} />
                        <TextBarSmall title={'Pop'} />
                    </div>
                    <div className='col-span-10 bg-[rgb(2,0,36)] custom-gradient'>
                        <div className='grid'>
                            <div className='text-white py-6'>
                                <TextBar title={'Good Morning'} size={'text-5xl'} />
                            </div>
                            <div className='grid lg:grid-cols-3'>
                                <AlbumCard1 imageName={a1} name={'Mashup'} />
                                <AlbumCard1 imageName={a2} name={'Mixed'} />
                                <AlbumCard1 imageName={a3} name={'New Release'} />
                                <AlbumCard1 imageName={a4} name={'Crimetown'} />
                                <AlbumCard1 imageName={a1} name={'Daily Mix 1'} />
                                <AlbumCard1 imageName={a2} name={'Daily Mix 2'} />
                            </div>
                            <div className='text-white'>
                                <TextBar title={'Heavy Rotation'} size={'text-xl'} />
                                <div className='grid lg:grid-cols-5' >
                                    <AlbumCard2 imageName={c1} name={'Owe Me'} desc={'The Chainsmoker'} />
                                    <AlbumCard2 imageName={c2} name={'Owe Me'} desc={'The Chainsmoker'} />
                                    <AlbumCard2 imageName={c3} name={'Owe Me'} desc={'The Chainsmoker'} />
                                    <AlbumCard2 imageName={c4} name={'Owe Me'} desc={'The Chainsmoker'} />
                                    <AlbumCard2 imageName={c5} name={'Owe Me'} desc={'The Chainsmoker'} />
                                    <AlbumCard2 imageName={c6} name={'Owe Me'} desc={'The Chainsmoker'} />
                                    <AlbumCard2 imageName={c1} name={'Owe Me'} desc={'The Chainsmoker'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-navbar-bg'>
                    <BottomBar imageName={c1} />
                </div>
            </div>
        </div>


    )
}
