import React from 'react'
import '../styles/Home.css'
import logo from '../assets/images/graduation-cap.png'
import search from '../assets/images/search.png'
import message from '../assets/images/message.png'
import notification from '../assets/images/notification.png'
import home from '../assets/images/home.png'
import book from '../assets/images/book-pages.png'
import speaker from '../assets/images/speaker.png'
import live from '../assets/images/live-stream.png'
import link from '../assets/images/link.png'
import user from '../assets/images/profile.png'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div className='container-fluid h-container'>
                <div className='h-navbar'>
                    <div className='h-logo'>
                        <img src={logo} alt='logo-image' />
                        <h5>CAMPUS LINK</h5>
                    </div>
                    <div className='h-search-bar'>
                        <img alt='search-icon' src={search} />
                        <input type='text' placeholder='search'></input>
                    </div>
                    <div className='h-other-icons'>
                        <div className='h-other-img'>
                            <img alt='notification' src={notification} />
                        </div>
                        <div className='h-other-img'>
                            <img alt='message' src={message} />
                        </div>
                    </div>
                </div>

                <div className='h-sidebar'>
                    <div className='h-menu'>
                        <img alt='menu-img' src={home} />
                        <h3>Home</h3>
                    </div>
                    <div className='h-menu'>
                        <img alt='menu-img' src={user} />
                        <h3>Profile</h3>
                    </div>
                    <Link to={'/notes/courses'}>
                        <div className='h-menu'>
                            <img alt='menu-img' src={book} />
                            <h3>Notes</h3>
                        </div>
                    </Link>
                    <div className='h-menu'>
                        <img alt='menu-img' src={link} />
                        <h3>Connect</h3>
                    </div>
                    <div className='h-menu'>
                        <img alt='menu-img' src={speaker} />
                        <h3>Events & Announcement</h3>
                    </div>
                    <div className='h-menu'>
                        <img alt='menu-img' src={live} />
                        <h3>Live Feed</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage