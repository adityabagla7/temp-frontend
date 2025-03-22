import React, { useState } from 'react';
import './patient.scss';
const PatientHome = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        console.log('Message sent:', message);
        setMessage('');
    };

    return (
        <div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows="7"
                cols="50"
            />
            <br />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default PatientHome;