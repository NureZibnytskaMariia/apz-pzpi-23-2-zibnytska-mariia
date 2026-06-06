import { Outlet, NavLink } from 'react-router-dom';

const UserLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <nav style={{ width: '250px', background: '#2C3A1A', color: 'white', padding: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Мій сад</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '15px' }}>
                        <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? '#A8D08D' : 'white', textDecoration: 'none' })}>
                            🏠 Дашборд
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <NavLink to="/my-plants" style={({ isActive }) => ({ color: isActive ? '#A8D08D' : 'white', textDecoration: 'none' })}>
                            🌿 Мої рослини
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <NavLink to="/catalog" style={({ isActive }) => ({ color: isActive ? '#A8D08D' : 'white', textDecoration: 'none' })}>
                            📖 Каталог типів
                        </NavLink>
                    </li>
                    <li>
                        {/* Використовуємо NavLink замість Link */}
                        <NavLink to="/calendar" style={({ isActive }) => ({ color: isActive ? '#A8D08D' : 'white', textDecoration: 'none' })}>
                            📅 Календар догляду
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {/* Контент сторінки */}
            <main style={{ flex: 1, padding: '20px', background: '#f9fbf7' }}>
                <Outlet />
            </main>
        </div>
    );
};
export default UserLayout;