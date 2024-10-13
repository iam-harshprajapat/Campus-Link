// Subjects.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjects } from '../../redux/features/notes/noteAction';
import { FaFolder } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { toast } from 'react-toastify'; // Import toast for notifications
import FloatingUploadButton from './FloatingUploadButton';

const Subjects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId, semesterId } = useParams(); // Extract parameters from URL

    const { loading, error, subjects } = useSelector((state) => state.note);

    // Fetch subjects on component mount
    useEffect(() => {
        if (courseId && semesterId) {
            dispatch(getSubjects({ course: courseId, semester: semesterId }));
        } else {
            toast.error('Course or Semester not selected');
            navigate('/notes');
        }
    }, [dispatch, courseId, semesterId, navigate]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(`Error loading subjects: ${error}`);
        }
    }, [error]);

    // Handle click on subject folder
    const handleFolderClick = (subject) => {
        navigate(`/notes/courses/${encodeURIComponent(courseId)}/semesters/${encodeURIComponent(semesterId)}/subjects/${encodeURIComponent(subject)}/notes`);
    };

    return (
        <>
            <button className='note-back-btn' onClick={() => navigate(-1)}>← Back</button> {/* Back button */}
            <section className='note-section' style={loading ? { cursor: 'wait' } : { cursor: 'default' }}>
                <div className='notes-row'>
                    {loading && <p>Loading subjects...</p>}
                    {subjects && subjects.length > 0 ? (
                        subjects.map((subject, index) => (
                            <div
                                key={index}
                                className='notes-folder'
                                onClick={() => handleFolderClick(subject)} // onClick handler
                                style={{ userSelect: 'none' }}
                            >
                                <FaFolder style={{ color: '#2b3467', fontSize: '80px', cursor: 'pointer' }} />
                                <h5>{subject}</h5> {/* Display subject name */}
                            </div>
                        ))
                    ) : (
                        !loading && <p>No Subjects available</p>
                    )}
                </div>
            </section>
            <FloatingUploadButton />
        </>
    );
};

export default Subjects;
