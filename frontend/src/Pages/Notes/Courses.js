// Notes.js
import React, { useEffect } from 'react';
import '../../styles/notes.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../redux/features/notes/noteAction';
import { FaFolder } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FloatingUploadButton from './FloatingUploadButton';

const Courses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, courses } = useSelector((state) => state.note);

    // Fetch courses on component mount
    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    // Handling error states
    useEffect(() => {
        if (error) {
            toast.error(`Error loading courses: ${error}`);
        }
    }, [error]);

    // Handle click on course folder
    const handleFolderClick = (course) => {
        // Navigate to the parameterized route with courseId
        navigate(`/notes/courses/${encodeURIComponent(course)}/semesters`);
    };

    return (
        <>
            <section className='note-section' style={loading ? { cursor: 'wait' } : { cursor: 'default' }}>
                <div className='notes-row'>
                    {loading && <p>Loading courses...</p>}
                    {courses && courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div
                                key={index}
                                className='notes-folder'
                                onClick={() => handleFolderClick(course)} // Changed to onClick
                                style={{ userSelect: 'none' }}
                            >
                                <FaFolder style={{ color: '#2b3467', fontSize: '80px', cursor: 'pointer' }} />
                                <h5>{course}</h5> {/* Display course name */}
                            </div>
                        ))
                    ) : (
                        !loading && <p>No courses available</p>
                    )}
                </div>
                <FloatingUploadButton />
            </section>
        </>
    );
};

export default Courses;
