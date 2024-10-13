import React from 'react'
import Lottie from 'lottie-react'
import Error from '../assets/images/404.json'
import '../styles/404.css'
import { Link } from 'react-router-dom';

const InvalidRoute = () => {
    return (
        <>
            <section className='innerContainer'>
                <div className='box1'>
                    <h1>Campus Link</h1>
                    <p>It seems the page you're looking for doesn't exist or has been moved. Please check the URL or go back to the <Link to={'/feed'}>Homepage</Link> <br />We're sorry for any inconvenience.</p>
                </div>
                <div className='box2'>
                    <Lottie animationData={Error} />
                </div>
            </section>
        </>
    )
}

export default InvalidRoute
