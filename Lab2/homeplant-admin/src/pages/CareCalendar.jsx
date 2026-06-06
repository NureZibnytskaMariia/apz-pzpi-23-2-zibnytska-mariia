import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import api from '../api';

const CareCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [selectedDateTasks, setSelectedDateTasks] = useState([]);

    // Завантаження завдань при зміні місяця
    useEffect(() => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        api.get(`care/monthly/?year=${year}&month=${month}`)
           .then(res => setTasks(res.data));
    }, [date]);

    // Обробка вибору дати
    const onDateChange = (newDate) => {
        setDate(newDate);
        const formattedDate = newDate.toISOString().split('T')[0];
        api.get(`care/by_date/?date=${formattedDate}`)
           .then(res => setSelectedDateTasks(res.data));
    };

    const handleComplete = async (taskId) => {
        await api.post(`care/${taskId}/complete/`);
        // Оновлюємо стан після успішного виконання
        onDateChange(date); 
    };

    return (
        <div style={{ padding: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <Calendar 
                onChange={onDateChange} 
                value={date}
                tileContent={({ date, view }) => {
                    // Показуємо крапку, якщо на цей день є завдання
                    const dayTasks = tasks.filter(t => t.scheduled_date === date.toISOString().split('T')[0]);
                    return dayTasks.length > 0 ? <div style={{ background: 'green', borderRadius: '50%', width: '6px', height: '6px', margin: 'auto' }} /> : null;
                }}
            />

            <div style={{ flex: 1, minWidth: '300px' }}>
                <h3>Завдання на {date.toLocaleDateString()}</h3>
                {selectedDateTasks.map(task => (
                    <div key={task.id} style={{ background: '#f9f9f9', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
                        <p><strong>{task.plant_name}</strong> - {task.task_type_display}</p>
                        {task.is_completed ? 
                            <span style={{ color: 'green' }}>✓ Виконано</span> :
                            <button onClick={() => handleComplete(task.id)}>Відмітити як виконане</button>
                        }
                        {task.is_overdue && <p style={{ color: 'red' }}>Прострочено!</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CareCalendar;