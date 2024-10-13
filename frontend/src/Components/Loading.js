import Lottie from 'lottie-react'
import React, { useRef } from 'react'
import LoadingAnimation from '../assets/images/loading.json'
const Loading = () => {
    const animation = useRef(null)
    return (
        <>
            <div className='container'>
                <div className='loadingAnimation' style={{ height: '400px', width: '400px' }}>
                    <Lottie lottieRef={animation} animationData={LoadingAnimation} />
                </div>
            </div>
        </>
    )
}

export default Loading
