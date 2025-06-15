import React, {useRef, useState} from 'react';
import {updateStockDetail} from "../externalCalls/ApiAction";

const FileUploader = ({adminId}) => {
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    const handleRemove = () => {
        setFile(null);
        if (inputRef.current) inputRef.current.value = '';
    }

    const updateStockList = () => {
        updateStockDetail(file, adminId).then((res)=> {
            if(res.success){
                alert("Stocks Successfully Updated");
                handleRemove();
            } else {
                alert("Error Occurred. Try Again!");
            }
        }
        )
    }

    return (
        <div style={styles.container}>
            <label style={styles.uploadBox}>
                <input
                    type="file"
                    accept=".xls, .xlsx"
                    ref={inputRef}
                    style={styles.input}
                    onChange={handleFileChange}
                />
                <div style={styles.uploadContent}>
                    <div style={styles.plusIcon}>+</div>
                    <div style={styles.uploadText}>Click to upload Excel file</div>
                    <div style={styles.supportText}>(.xls, .xlsx)</div>
                </div>
            </label>

            {file && (
                <>
                    <div style={styles.preview}>
                        <div style={styles.previewInfo}>
                            <div style={styles.fileName}>{file.name}</div>
                            <div style={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</div>
                        </div>
                        <button style={styles.removeButton} onClick={handleRemove}>
                            Remove
                        </button>
                    </div>
                    <button style={styles.updateButton} onClick={updateStockList}>Update Your Stock List</button>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: 400,
        margin: '40px auto',
        padding: 16,
        fontFamily: 'Arial, sans-serif',
    },
    uploadBox: {
        // border: '2px dashed #007bff',
        borderRadius: 8,
        padding: 40,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    input: {
        display: 'none',
    },
    uploadContent: {
        color: '#555',
    },
    plusIcon: {
        fontSize: 32,
        color: '#007bff',
        marginBottom: 8,
    },
    uploadText: {
        fontSize: 16,
        marginBottom: 4,
    },
    supportText: {
        fontSize: 12,
        color: '#888',
    },
    preview: {
        marginTop: 20,
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
    },
    previewInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    fileName: {
        fontWeight: 600,
        fontSize: 14,
        color: '#333',
    },
    fileSize: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    removeButton: {
        background: 'transparent',
        border: 'none',
        color: '#ff4d4f',
        cursor: 'pointer',
        fontSize: 14,
    },
    updateButton: {
        marginTop: 50,
        width: '100%',
        height: 59,
        background: '#fc8e8e',
        borderRadius: 30,
        color: 'white',
        fontSize: 20,
        fontWeight: 900,
        cursor: 'pointer'
    }
};

export default FileUploader;
