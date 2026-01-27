import React, { useEffect, useState } from 'react';
import './FoodsBar.css';
import { fetchFoods } from '../services/api';

const FoodsBar = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFoods = async () => {
            try {
                const data = await fetchFoods();
                setFoods(data);
            } catch (e) {
                setFoods([]);
            } finally {
                setLoading(false);
            }
        };
        loadFoods();
    }, []);

    return (
        <section className="foods-bar">
            <h2>Foods Bar</h2>
            {loading ? (
                <p>Loading menu...</p>
            ) : (
                <div className="foods-list" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                    {foods.map(food => (
                        <div key={food.id} className="food-card" style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            padding: 20,
                            width: 260,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <img
                                src={food.imageUrl}
                                alt={food.name}
                                style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80'; }}
                            />
                            <h3 style={{ margin: '8px 0 4px', color: '#b8860b' }}>{food.name}</h3>
                            <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>{food.category}</div>
                            <div style={{ fontSize: 15, color: '#333', marginBottom: 8 }}>{food.description}</div>
                            <div style={{ fontWeight: 700, color: '#b8860b', fontSize: 18 }}>{food.price.toFixed(2)} JOD</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FoodsBar;
