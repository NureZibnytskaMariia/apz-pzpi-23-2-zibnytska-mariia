const StatCard = ({ title, value, icon }) => (
    <div style={{ 
        background: 'white', padding: '20px', borderRadius: '12px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '15px' 
    }}>
        <div style={{ background: '#f0f4e8', padding: '10px', borderRadius: '50%', color: '#2C3A1A' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{title}</h4>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
        </div>
    </div>
);
export default StatCard;