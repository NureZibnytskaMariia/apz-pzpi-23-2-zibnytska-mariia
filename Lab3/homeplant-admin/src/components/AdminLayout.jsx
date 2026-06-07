import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    // Стилі для активного/неактивного посилання
    const linkStyle = ({ isActive }) => ({
        color: isActive ? '#A8D08D' : 'white', // Активне посилання трохи зелене
        textDecoration: 'none',
        fontWeight: isActive ? 'bold' : 'normal',
        display: 'block',
        padding: '10px',
        borderRadius: '6px',
        backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent'
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <nav style={{ width: '250px', backgroundColor: '#2C3A1A', color: 'white', padding: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center' }}>HomePlant Admin</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink to="/admin" end style={linkStyle}>📊 Дашборд</NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink to="/admin/users" style={linkStyle}>👥 Користувачі</NavLink>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <NavLink to="/admin/plant-types" style={linkStyle}>🌿 Типи рослин</NavLink>
                    </li>
                </ul>
            </nav>

            {/* Основний контент */}
            <main style={{ flex: 1, padding: '30px', backgroundColor: '#fefdeb' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;