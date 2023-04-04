import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Reservation = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div style={{marginLeft: 50, marginTop: 20}}>
            <Calendar onChange={setDate} value={date}/>
            <span className='bold'>Date selectionnée: {date.toLocaleDateString()}</span>
        </div>
    );
}

export default Reservation;