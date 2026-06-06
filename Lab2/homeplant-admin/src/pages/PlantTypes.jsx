import { useEffect, useState } from 'react';
import api from '../api';

const PlantTypes = () => {
    const [types, setTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingType, setEditingType] = useState(null);

    useEffect(() => { fetchTypes(); }, []);

    const fetchTypes = async () => {
        const res = await api.get('plant-types/');
        setTypes(Array.isArray(res.data) ? res.data : (res.data.results || []));
    };

    const deleteType = async (id) => {
        if (window.confirm("Видалити цей тип рослин?")) {
            await api.delete(`plant-types/${id}/`);
            fetchTypes();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (editingType) {
                await api.patch(`plant-types/${editingType.id}/`, data);
            } else {
                await api.post('plant-types/', data);
            }
            setIsModalOpen(false);
            fetchTypes();
        } catch (err) {
            console.error(err);
            alert("Помилка збереження. Перевірте поля!");
        }
    };

    const exportToCSV = () => {
        const headers = ["ID", "Назва (Укр)", "Наукова назва", "Полив (дні)", "Добриво (дні)", "Темп. мін", "Темп. макс"];
        const rows = types.map(t => [
            t.id,
            t.name_uk,
            t.scientific_name,
            t.watering_frequency_days,
            t.fertilizing_frequency_days,
            t.optimal_temp_min,
            t.optimal_temp_max
        ]);

        const csvContent = [headers, ...rows]
            .map(e => e.join(","))
            .join("\n");

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "plant_types_catalog.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ padding: '20px', background: '#fefdeb', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Типи рослин</h2>
                <div>
                    <button onClick={exportToCSV} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                        📥 CSV
                    </button>
                    <button onClick={() => { setEditingType(null); setIsModalOpen(true); }} style={{ padding: '10px 20px', background: '#2C3A1A', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        + Додати тип
                    </button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: 'white' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '10px' }}>Назва</th>
                        <th style={{ padding: '10px' }}>Наукова назва</th>
                        <th style={{ padding: '10px' }}>Умови (Темп / Вологість / Світло)</th>
                        <th style={{ padding: '10px' }}>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(t => (
                        <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{t.name_uk}</td>
                            <td style={{ padding: '10px' }}>{t.scientific_name}</td>
                            <td style={{ padding: '10px' }}>
                                {t.optimal_temp_min}-{t.optimal_temp_max}°C / {t.optimal_humidity_min}-{t.optimal_humidity_max}% / {t.optimal_light_min}-{t.optimal_light_max} lux
                            </td>
                            <td style={{ padding: '10px' }}>
                                <button onClick={() => { setEditingType(t); setIsModalOpen(true); }} style={{ marginRight: '5px' }}>Ред.</button>
                                <button onClick={() => deleteType(t.id)} style={{ color: 'red' }}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h3>{editingType ? 'Редагувати' : 'Новий тип'}</h3>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input name="name_uk" defaultValue={editingType?.name_uk} placeholder="Назва (Укр)" required />
                            <input name="name_en" defaultValue={editingType?.name_en} placeholder="Назва (Eng)" required />
                            <input name="scientific_name" defaultValue={editingType?.scientific_name} placeholder="Наукова назва" />

                            <input name="watering_frequency_days" type="number" defaultValue={editingType?.watering_frequency_days} placeholder="Частота поливу (дні)" required />
                            <input name="fertilizing_frequency_days" type="number" defaultValue={editingType?.fertilizing_frequency_days} placeholder="Частота підживлення (дні)" required />
                            <input name="repotting_frequency_months" type="number" defaultValue={editingType?.repotting_frequency_months} placeholder="Пересадка (міс)" />

                            <input name="optimal_temp_min" type="number" step="0.1" defaultValue={editingType?.optimal_temp_min} placeholder="Темп. мін (°C)" required />
                            <input name="optimal_temp_max" type="number" step="0.1" defaultValue={editingType?.optimal_temp_max} placeholder="Темп. макс (°C)" required />

                            <input name="optimal_humidity_min" type="number" defaultValue={editingType?.optimal_humidity_min} placeholder="Вологість мін (%)" required />
                            <input name="optimal_humidity_max" type="number" defaultValue={editingType?.optimal_humidity_max} placeholder="Вологість макс (%)" required />

                            <input name="optimal_light_min" type="number" defaultValue={editingType?.optimal_light_min} placeholder="Світло мін (lux)" required />
                            <input name="optimal_light_max" type="number" defaultValue={editingType?.optimal_light_max} placeholder="Світло макс (lux)" required />

                            <textarea name="description_uk" defaultValue={editingType?.description_uk} placeholder="Опис (Укр)" style={{ gridColumn: 'span 2' }} />
                            <textarea name="description_en" defaultValue={editingType?.description_en} placeholder="Опис (Eng)" style={{ gridColumn: 'span 2' }} />

                            <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)}>Скасувати</button>
                                <button type="submit" style={{ marginLeft: '10px', background: '#2C3A1A', color: 'white' }}>Зберегти</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PlantTypes;