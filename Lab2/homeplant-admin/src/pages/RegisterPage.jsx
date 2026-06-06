import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Паролі не збігаються!");
      return;
    }

    try {
      // Відправка на бекенд (Django)
      const response = await axios.post('http://localhost:8000/api/register/', {
        username: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert("Реєстрація успішна!");
      console.log(response.data);
    } catch (error) {
      console.error("Помилка при реєстрації:", error);
      alert("Не вдалося зареєструватися.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg)' }}>
      <form onSubmit={handleRegister} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' }}>
        <h2 style={{ color: 'var(--primary)', textAlign: 'center' }}>Реєстрація</h2>
        <input type="text" placeholder="Ім'я" onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="password" placeholder="Пароль" onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="password" placeholder="Повторіть пароль" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;