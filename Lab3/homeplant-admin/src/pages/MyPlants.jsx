import { useEffect, useState } from 'react';
import api from '../api';

const MyPlants = () => {
    const [plants, setPlants] = useState([]);
    const [plantTypes, setPlantTypes] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Додаємо поля для дат, які вимагає бекенд
    const [formData, setFormData] = useState({ 
        custom_name: '', 
        location: '', 
        plant_type: '', 
        last_watered_date: '', 
        last_fertilized_date: '' 
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPlants();
        fetchPlantTypes();
    }, []);

    const fetchPlants = () => {
        api.get('plants/').then(res => setPlants(res.data.results || res.data || []));
    };

    const fetchPlantTypes = () => {
        api.get('plant-types/').then(res => setPlantTypes(res.data.results || res.data || []));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Видалити цю рослину?")) {
            await api.delete(`plants/${id}/`);
            fetchPlants();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.patch(`plants/${editingId}/`, formData);
            } else {
                await api.post('plants/', formData);
            }
            setIsFormOpen(false);
            setEditingId(null);
            setFormData({ custom_name: '', location: '', plant_type: '', last_watered_date: '', last_fertilized_date: '' });
            fetchPlants();
        } catch (error) {
            console.error(error.response?.data);
            alert("Помилка: перевірте заповненість полів та формат дат.");
        }
    };

    const openEdit = (plant) => {
        setEditingId(plant.id);
        setFormData({ 
            custom_name: plant.custom_name, 
            location: plant.location, 
            plant_type: plant.plant_type,
            last_watered_date: plant.last_watered_date,
            last_fertilized_date: plant.last_fertilized_date
        });
        setIsFormOpen(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Мої рослини</h1>
            <button onClick={() => setIsFormOpen(true)} style={{ marginBottom: '20px' }}>+ Додати рослину</button>

            {isFormOpen && (
                <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                    <h3>{editingId ? 'Редагувати' : 'Нова рослина'}</h3>
                    
                    <input placeholder="Назва" value={formData.custom_name} onChange={e => setFormData({...formData, custom_name: e.target.value})} required />
                    <input placeholder="Локація" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                    
                    <select value={formData.plant_type} onChange={e => setFormData({...formData, plant_type: e.target.value})} required>
                        <option value="">-- Оберіть вид --</option>
                        {plantTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>

                    <label>Останній полив:</label>
                    <input type="date" value={formData.last_watered_date} onChange={e => setFormData({...formData, last_watered_date: e.target.value})} required />
                    
                    <label>Останнє добриво:</label>
                    <input type="date" value={formData.last_fertilized_date} onChange={e => setFormData({...formData, last_fertilized_date: e.target.value})} required />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit">Зберегти</button>
                        <button type="button" onClick={() => setIsFormOpen(false)}>Скасувати</button>
                    </div>
                </form>
            )}

            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {plants.map(plant => (
                    <div key={plant.id} style={{ padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginTop: 0 }}>{plant.custom_name}</h3>
                        <p><strong>Вид:</strong> {plant.plant_type_details?.name || 'Не вказано'}</p>
                        <p><strong>Локація:</strong> {plant.location || 'Не задано'}</p>
                        <p><strong>Статус:</strong> {plant.status_display}</p>
                        
                        <div style={{ fontSize: '0.9rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '10px', marginBottom: '15px' }}>
                            <p>Наступний полив: {plant.next_watering_date} ({plant.days_until_watering} дн.)</p>
                            <p>Наступне добриво: {plant.next_fertilizing_date} ({plant.days_until_fertilizing} дн.)</p>
                            {plant.notes && <p><em>Примітка: {plant.notes}</em></p>}
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => openEdit(plant)}>Редагувати</button>
                            <button onClick={() => handleDelete(plant.id)} style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Видалити</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyPlants;