// Semesters.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemesters } from '../../redux/features/notes/noteAction';
import { FaFolder } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { toast } from 'react-toastify'; // Import toast for notifications
import FloatingUploadButton from './FloatingUploadButton';

const Semesters = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams(); // Extract courseId from route parameters

    const { loading, error, semesters } = useSelector((state) => state.note);

    // Dispatch the action to fetch semesters for the selected course
    useEffect(() => {
        if (courseId) {
            dispatch(getSemesters({ course: courseId }));
        } else {
            toast.error('No course selected');
            navigate('/notes'); // Redirect back if no course is selected
        }
    }, [dispatch, courseId, navigate]);

    // Handle error via toast notifications
    useEffect(() => {
        if (error) {
            toast.error(`Error loading semesters: ${error}`); // Show toast on error
        }
    }, [error]);

    // Handle click on semester folder
    const handleFolderClick = (semester) => {
        navigate(`/notes/courses/${encodeURIComponent(courseId)}/semesters/${encodeURIComponent(semester)}/subjects`);
    };

    return (
        <>
            <button className='note-back-btn' onClick={() => navigate(-1)}>← Back</button> {/* Back button */}
            <section className='note-section' style={loading ? { cursor: 'wait' } : { cursor: 'default' }}>
                <div className='notes-row'>
                    {loading && <p>Loading semesters...</p>}
                    {semesters && semesters.length > 0 ? (
                        semesters.map((semester, index) => (
                            <div
                                key={index}
                                className='notes-folder'
                                onClick={() => handleFolderClick(semester)} // Changed to onClick
                                style={{ userSelect: 'none' }}
                            >
                                <FaFolder style={{ color: '#2b3467', fontSize: '80px', cursor: 'pointer' }} />
                                <h5>{semester}</h5> {/* Display semester name */}
                            </div>
                        ))
                    ) : (
                        !loading && <p>No Semesters available</p>
                    )}
                </div>
            </section>
            <FloatingUploadButton />
        </>
    );
};

export default Semesters;
