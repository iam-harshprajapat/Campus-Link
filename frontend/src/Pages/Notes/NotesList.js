// NotesList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesBySubject } from '../../redux/features/notes/noteAction';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteFile from '../../Components/NoteFile'; // Adjust the import path as needed
import FloatingUploadButton from './FloatingUploadButton';

const NotesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId, semesterId, subjectId } = useParams(); // Extract parameters from URL

    const { loading, error, notes } = useSelector((state) => state.note);

    // Fetch notes on component mount
    useEffect(() => {
        if (courseId && semesterId && subjectId) {
            dispatch(getNotesBySubject({ course: courseId, semester: semesterId, subject: subjectId }));
        } else {
            toast.error('Course, Semester, or Subject not selected');
            navigate('/notes');
        }
    }, [dispatch, courseId, semesterId, subjectId, navigate]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(`Error loading notes: ${error}`);
        }
    }, [error]);

    return (
        <>
            <button className='note-back-btn' onClick={() => navigate(-1)}>← Back</button> {/* Back button */}
            <section className='note-section' style={loading ? { cursor: 'wait' } : { cursor: 'default' }}>
                <div className='notes-row'>
                    {loading && <p>Loading notes...</p>}
                    {notes && notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteFile key={note._id} note={note} />
                        ))
                    ) : (
                        !loading && <p>No Notes available</p>
                    )}
                </div>
            </section>
            <FloatingUploadButton />
        </>
    );
};

export default NotesList;
