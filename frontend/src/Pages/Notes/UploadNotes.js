import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadNote } from '../../redux/features/notes/noteAction';
import { toast } from 'react-toastify';

const UploadNotes = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.note);

    const [noteData, setNoteData] = useState({
        course: '',
        semester: '',
        subject: '',
        title: '',
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            toast.alert('Please select a file!');
            return;
        }
        dispatch(uploadNote({ noteData, file })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                closeModal();  // Close modal on successful upload
                toast.success('Notes uploaded successfully')
            }
        });
    };
    // useEffect(() => {
    //     if (success)
    //         toast.success('Notes was successfully uploaded')
    //     if (error)
    //         toast.error(error)
    // }, [success, error])
    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} >
                <div className='note-upload-box'>
                    <label>Course:</label>
                    <input
                        type="text"
                        name="course"
                        value={noteData.course}
                        onChange={handleChange}
                        required
                    />
                </div >

                <div className='note-upload-box'>
                    <label>Semester:</label>
                    <input
                        type="text"
                        name="semester"
                        value={noteData.semester}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='note-upload-box'>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={noteData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='note-upload-box'>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={noteData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='note-upload-box'>
                    <label>File:</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} style={{ border: 'none', backgroundColor: '#2B3467', color: 'white', fontSize: '18px', borderRadius: '5px' }}>
                    {loading ? 'Uploading...' : 'Upload Note'}
                </button>
            </form>
        </div>
    );
};

export default UploadNotes;
