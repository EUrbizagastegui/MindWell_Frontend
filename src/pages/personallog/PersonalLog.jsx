import React, { useState, useEffect } from 'react';
import APIGatewayService from '../../shared/services/api-gateway-service';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent';
import './Personallog.css';

const PersonalLogs = () => {
    const [personalLogs, setPersonalLogs] = useState([]);
    const [newThought, setNewThought] = useState('');
    const [editThought, setEditThought] = useState('');
    const [editDate, setEditDate] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchPersonalLogs = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user.id : null;

            if (!userId) {
                setError('User ID not found.');
                return;
            }

            setLoading(true);

            const response = await APIGatewayService.getAllPersonalLogsByUserId(userId);
            setPersonalLogs(response.data);

            setLoading(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error loading personal logs. Please try again later.';
            setError(errorMessage);
            console.error('Error loading personal logs:', error);

            setLoading(false);
        }
    };

    const createPersonalLog = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user.id : null;

            if (!userId) {
                setError('User ID not found.');
                return;
            }

            setLoading(true);

            const currentDate = new Date().toISOString();
            const newLog = {
                thought: newThought,
                date: currentDate,
                users_Id: userId
            };

            const response = await APIGatewayService.createPersonalLog(newLog);
            console.log('New personal log created:', response.data);

            await fetchPersonalLogs();
            setNewThought('');

            setLoading(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error creating personal log. Please try again later.';
            setError(errorMessage);
            console.error('Error creating personal log:', error);

            setLoading(false);
        }
    };

    const editPersonalLog = async () => {
        try {
            setLoading(true);

            const updatedLog = {
                thought: editThought,
                date: editDate
            };

            const response = await APIGatewayService.updatePersonalLog(editId, updatedLog);
            console.log('Personal log updated:', response.data);

            setEditMode(false);
            setEditId(null);
            setEditThought('');
            setEditDate('');

            await fetchPersonalLogs();

            setLoading(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error updating personal log. Please try again later.';
            setError(errorMessage);
            console.error('Error updating personal log:', error);

            setLoading(false);
        }
    };

    const deletePersonalLog = async (id) => {
        try {
            setLoading(true);

            await APIGatewayService.deletePersonalLog(id);
            console.log('Personal log deleted:', id);

            await fetchPersonalLogs();

            setLoading(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error deleting personal log. Please try again later.';
            setError(errorMessage);
            console.error('Error deleting personal log:', error);

            setLoading(false);
        }
    };

    const enterEditMode = (log) => {
        setEditMode(true);
        setEditId(log.id);
        setEditThought(log.thought);
        setEditDate(log.date);
    };

    const cancelEditMode = () => {
        setEditMode(false);
        setEditId(null);
        setEditThought('');
        setEditDate('');
    };

    useEffect(() => {
        fetchPersonalLogs();
    }, []);

    return (
        <div className="personal-logs-page">
            <div className='bitacora-nav'>
                <NavBarComponent/>
            </div>
            <div className="personal-logs-container">
                <h2>Personal Logs</h2>

                <div className="new-log-form">
                    <textarea
                        placeholder="Write your thought..."
                        value={newThought}
                        onChange={(e) => setNewThought(e.target.value)}
                        required
                    ></textarea>
                    <button onClick={createPersonalLog} disabled={loading}>
                        {loading ? 'Adding...' : 'Add Log'}
                    </button>
                </div>

                {error && <p className="error">{error}</p>}

                {personalLogs.length === 0 && !loading && (
                    <p className="no-logs-message">No logs available. Please add a new log.</p>
                )}

                <ul className="personal-logs-list">
                    {personalLogs.map(log => (
                        <li key={log.id} className="log-item">
                            {editMode && editId === log.id ? (
                                <div className="edit-log-form">
                                    <textarea
                                        value={editThought}
                                        onChange={(e) => setEditThought(e.target.value)}
                                        required
                                    ></textarea>
                                    <input
                                        type="datetime-local"
                                        value={editDate.slice(0, 16)}
                                        onChange={(e) => setEditDate(e.target.value + ':00.000Z')}
                                        required
                                    />
                                    <div className="edit-log-buttons">
                                        <button onClick={editPersonalLog} disabled={loading} className="update-button">
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                        <button onClick={cancelEditMode} className="cancel-edit-button">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="log-details">
                                    <p>{log.thought}</p>
                                    <p>{new Date(log.date).toLocaleString()}</p>
                                    <div className="log-actions">
                                        <button onClick={() => enterEditMode(log)} className="edit-button">Edit</button>
                                        <button onClick={() => deletePersonalLog(log.id)} disabled={loading}
                                                className="delete-button">
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PersonalLogs;
