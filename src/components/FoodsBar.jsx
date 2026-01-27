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
        <section className="foods-bar-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Foods Bar</h2>
                    <div className="section-line"></div>
                </div>
                {loading ? (
                    <p className="loading-text">Loading menu...</p>
                ) : (
                    <div className="foods-list">
                        {foods.map(food => (
                            <div key={food.id} className="food-card">
                                <div className="food-image-wrapper">
                                    <img
                                        src={food.imageUrl}
                                        alt={food.name}
                                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80'; }}
                                    />
                                </div>
                                <div className="food-details">
                                    <h3 className="food-title">{food.name}</h3>
                                    <div className="food-category">{food.category}</div>
                                    <div className="food-desc">{food.description}</div>
                                    <div className="food-price">{food.price.toFixed(2)} JOD</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FoodsBar;
