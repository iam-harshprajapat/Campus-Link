import React, { useEffect } from 'react'
import './ConnectionDisplayModal.css'
import { RxCross2 } from 'react-icons/rx'
import API from '../../Services/API'
const ConnectionDisplayModal = ({ closeModal, user }) => {
    const fetchConnections = async () => {
        const response = await API.get('/connections');
        console.log(response)
    }
    useEffect(() => {
        fetchConnections()
    }, [])
    return (
        <div className='c-connections-container'>
            <RxCross2 className='c-cross' />
            <div className="c-headers">
                <div className="c-profile"></div>
                <p></p>
                <p></p>
            </div>
        </div>
    )
}

export default ConnectionDisplayModal
