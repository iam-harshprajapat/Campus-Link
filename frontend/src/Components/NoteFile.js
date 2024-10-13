// NoteFile.js
import React from 'react';
import { FaFileWord, FaFilePdf, FaFileExcel, FaFilePowerpoint } from "react-icons/fa";
import { BiSolidFileJpg, BiSolidFilePng } from "react-icons/bi";

const NoteFile = ({ note }) => {
    // Function to select the appropriate icon based on file type
    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'application/pdf':
                return <FaFilePdf style={{ color: '#e74c3c', fontSize: '40px' }} />;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FaFileWord style={{ color: '#3498db', fontSize: '40px' }} />;
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return <FaFileExcel style={{ color: '#27ae60', fontSize: '40px' }} />;
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return <FaFilePowerpoint style={{ color: '#f1c40f', fontSize: '40px' }} />;
            case 'image/jpeg':
                return <BiSolidFileJpg style={{ color: '#f39c12', fontSize: '40px' }} />;
            case 'image/png':
                return <BiSolidFilePng style={{ color: '#2980b9', fontSize: '40px' }} />;
            default:
                return <FaFilePdf style={{ color: '#95a5a6', fontSize: '40px' }} />; // Default icon
        }
    };

    // Function to get the download URL
    const getDownloadUrl = (filePath) => {
        return `${process.env.REACT_APP_BASEURL}/${filePath.replace(/\\/g, '/')}`;
    };

    return (
        <div className='notes-folder'>
            <div className='file-icon'>
                {getFileIcon(note.fileType)}
            </div>
            <h5>{note.title}</h5>
            <a href={getDownloadUrl(note.file)} download>
                Download
            </a>
        </div>
    );
};

export default NoteFile;
