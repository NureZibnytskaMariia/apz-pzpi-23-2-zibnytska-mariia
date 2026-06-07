import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ padding: '0 50px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>HomePlant</h1>
        <div>
          <Link to="/login" style={{ marginRight: '20px', color: 'var(--text)', textDecoration: 'none' }}>Увійти</Link>
          <Link to="/register" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '5px', textDecoration: 'none' }}>Реєстрація</Link>
        </div>
      </nav>

      <section style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2 style={{ fontSize: '3rem' }}>Ваші рослини під надійним наглядом</h2>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Розумна система догляду за вашою зеленою колекцією.</p>
      </section>
    </div>
  );
};

export default LandingPage;