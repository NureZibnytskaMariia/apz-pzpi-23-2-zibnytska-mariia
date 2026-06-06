import { useEffect, useState } from 'react';
import api from '../api';
import { Loader2, Crown, UserX, UserCheck, Leaf } from 'lucide-react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('admin/users/');
            console.log("Структура даних API:", res.data); // Подивіться, що тут приходить

            // ВИПРАВЛЕННЯ:
            // Якщо дані приходять у res.data.results, беремо його.
            // Якщо res.data вже є масивом, беремо його.
            const data = res.data.results ? res.data.results : res.data;
            setUsers(data);

        } catch (err) {
            console.error("Помилка завантаження користувачів:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGrantPremium = async (id) => {
        const days = prompt("На скільки днів надати Premium?", "30");
        if (days) {
            await api.post(`admin/users/${id}/grant_premium/`, { days: parseInt(days) });
            fetchUsers(); // Оновити список
        }

    };
    const handleRevokePremium = async (id) => {
        if (window.confirm("Ви впевнені, що хочете скасувати Premium?")) {
            await api.post(`admin/users/${id}/revoke_premium/`);
            fetchUsers();
        }
    };

    const viewUserPlants = (email) => {
        alert(`Перегляд рослин для: ${email}`);
        // Тут можна реалізувати навігацію або відкриття модалки
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><Loader2 className="animate-spin" /></div>;

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Користувачі системи</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>ID</th>
                        <th style={{ padding: '12px' }}>Email</th>
                        <th style={{ padding: '12px' }}>Premium</th>
                        <th style={{ padding: '12px' }}>Дата підписки</th>
                        <th style={{ padding: '12px' }}>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '12px' }}>{user.id}</td>
                            <td style={{ padding: '12px' }}>{user.email}</td>
                            <td style={{ padding: '12px' }}>{user.is_premium ? '✅ Так' : '❌ Ні'}</td>
                            <td style={{ padding: '12px' }}>
                                {user.is_premium ? (user.premium_end_date || 'Активно') : '—'}
                            </td>
                            <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                {user.is_premium ? (
                                    <button onClick={() => handleRevokePremium(user.id)} style={{ padding: '5px 10px', color: 'red' }}>
                                        <UserX size={16} /> Скасувати
                                    </button>
                                ) : (
                                    <button onClick={() => handleGrantPremium(user.id)} style={{ padding: '5px 10px', color: 'green' }}>
                                        <Crown size={16} /> Надати
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;