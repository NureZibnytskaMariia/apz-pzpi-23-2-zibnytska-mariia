import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [stats, setStats] = useState(null);
    const [user, setUser] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get('auth/profile/').then(res => setUser(res.data));
        api.get('auth/statistics/').then(res => setStats(res.data));
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await api.post('auth/change-password/', {
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirm: newPasswordConfirm
            });
            alert("Пароль успішно змінено!");
            setOldPassword(''); setNewPassword(''); setNewPasswordConfirm('');
        } catch (error) {
            alert("Помилка зміни пароля: " + (error.response?.data?.old_password || "Перевірте дані"));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Вітаємо, {user?.username || 'Користувачу'}!</h1>
            
            {/* Статистика */}
            {stats && (
                <div style={{ marginBottom: '30px' }}>
                    <h3>Ваша статистика</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                        <div className="card">Рослин: {stats.total_plants}</div>
                        <div className="card">Виконано завдань: {stats.completed_tasks}</div>
                        <div className="card" style={{ color: 'red' }}>Прострочено: {stats.overdue_tasks}</div>
                    </div>
                </div>
            )}

            {/* Інформація про профіль та преміум */}
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>Дані профілю</h3>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Статус підписки:</strong> {user?.is_premium_active ? 
                    <span style={{ color: 'green' }}>Преміум до {user.premium_end_date}</span> : 
                    "Безкоштовний акаунт"}</p>
            </div>

            {/* Зміна пароля */}
            <form onSubmit={handleChangePassword} style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
                <h3>Зміна пароля</h3>
                <input type="password" placeholder="Старий пароль" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input type="password" placeholder="Новий пароль" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input type="password" placeholder="Підтвердіть новий пароль" value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <button type="submit">Змінити пароль</button>
            </form>
        </div>
    );
};
export default UserDashboard;