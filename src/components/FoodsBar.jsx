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
                <ul>
                    {foods.map(food => (
                        <li key={food.id}>
                            <strong>{food.name}</strong> - {food.price} JOD
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default FoodsBar;
