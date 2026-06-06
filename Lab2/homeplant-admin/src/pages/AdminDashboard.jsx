import { useEffect, useState } from 'react';
import api from '../api';
import StatCard from '../components/StatCard';
import { Users, Leaf, ShieldCheck, Zap, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, statsRes] = await Promise.all([
                    api.get('admin/users/'),
                    api.get('admin/statistics/')
                ]);

                const userData = Array.isArray(usersRes.data) ? usersRes.data : (usersRes.data.results || []);
                setUsers(userData);
                setStats(statsRes.data);
            } catch (error) {
                console.error("Помилка завантаження:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><Loader2 className="animate-spin" /></div>;

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9fbf7', minHeight: '100vh' }}>
            <h1 style={{ marginBottom: '25px' }}>Адмін-панель</h1>

            {/* Секція статистики */}
            {stats && (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '20px', 
                    marginBottom: '30px' 
                }}>
                    <StatCard title="Всього користувачів" value={stats.total_users} icon={<Users />} />
                    <StatCard title="Преміум" value={stats.premium_users} icon={<ShieldCheck />} />
                    <StatCard title="Всього рослин" value={stats.total_plants} icon={<Leaf />} />
                    <StatCard title="З датчиками" value={stats.users_with_sensors} icon={<Zap />} />
                </div>
            )}

            {/* Секція таблиці */}
            <h2 style={{ marginBottom: '15px' }}>Користувачі</h2>
            <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 10px',
            }}>
                <thead>
                    <tr style={{ color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                        <th style={{ textAlign: 'left', padding: '15px' }}>Email</th>
                        <th style={{ textAlign: 'left', padding: '15px' }}>Статус</th>
                        <th style={{ textAlign: 'right', padding: '15px' }}>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                            <td style={{ padding: '15px', borderRadius: '8px 0 0 8px' }}>{user.email}</td>
                            <td style={{ padding: '15px' }}>
                                <span style={{
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem',
                                    backgroundColor: user.is_active ? '#E8F5E9' : '#FFEBEE',
                                    color: user.is_active ? '#2E7D32' : '#C62828'
                                }}>
                                    {user.is_active ? 'Активний' : 'Заблокований'}
                                </span>
                            </td>
                            <td style={{ padding: '15px', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>
                                <button onClick={() => {/* логіка перемикання */}} style={{ 
                                    padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                                    backgroundColor: '#f0f0f0' 
                                }}>
                                    {user.is_active ? 'Заблокувати' : 'Активувати'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminDashboard;