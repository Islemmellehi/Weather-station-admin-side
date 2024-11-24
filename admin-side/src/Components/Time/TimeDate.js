import React, { useEffect, useState } from 'react';
import './TimeDate.css';

const TimeDate = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="time-date">
            <div className="date">
                 <h2>{formatTime(currentTime)}</h2>

                <h5>{formatDate(currentTime)}</h5> 
            </div>
            
        </div>
    );
};

export default TimeDate;
