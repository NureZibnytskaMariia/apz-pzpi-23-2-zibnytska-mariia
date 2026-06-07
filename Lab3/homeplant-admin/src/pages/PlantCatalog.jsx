import { useEffect, useState } from 'react';
import api from '../api';

const PlantCatalog = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        api.get('plant-types/').then(res => {
            // Перевіряємо, чи дані є масивом, якщо ні — беремо res.data.results або інший ключ
            console.log("Дані API:", res.data);
            setTypes(Array.isArray(res.data) ? res.data : res.data.results || []);
        });
    }, []);

    return (
        <div>
            <h1>Каталог типів рослин</h1>
            <table style={{ width: '100%', background: '#fff', borderRadius: '8px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Назва</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Опис</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(type => (
                        <tr key={type.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{type.name}</td>
                            <td style={{ padding: '10px' }}>{type.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PlantCatalog;