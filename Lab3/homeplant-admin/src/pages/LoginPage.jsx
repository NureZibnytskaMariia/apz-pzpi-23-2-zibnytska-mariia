import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Оновлений шлях відповідно до вашого urls.py
            const res = await axios.post('http://localhost:8000/api/auth/login/', {
                email: formData.email,
                password: formData.password
            });

            login(res.data.user, res.data.access);

            if (res.data.user.is_admin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            alert("Помилка входу: перевірте email та пароль");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg)' }}>
            <form onSubmit={handleLogin} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' }}>
                <h2 style={{ color: 'var(--primary)', textAlign: 'center' }}>Вхід</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email} // Додано
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={formData.password} // Додано
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                />

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Увійти
                </button>
            </form>
        </div>
    );
};

export default LoginPage;