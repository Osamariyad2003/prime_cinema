import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoyaltySection = () => {
    const { user } = useAuth();

    return (
        <section className="loyalty-section" id="club">
            <div className="container loyalty-container">
                <div className="loyalty-card-visual">
                    <div className="card-front">
                        <div className="card-logo">PRIME CLUB</div>
                        <div className="card-chip"></div>
                        <div className="card-number">
                            {user?.loyaltyCard ? user.loyaltyCard.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• 1234'}
                        </div>
                        <div className="card-holder">{user ? user.name.toUpperCase() : 'VIP MEMBER'}</div>
                    </div>
                </div>

                <div className="loyalty-content">
                    <h2 className="loyalty-title">{user ? 'Your Prime Status' : 'Join The Prime Club'}</h2>
                    <p className="loyalty-desc">
                        {user
                            ? `Hello ${user.name}, you are currently a ${user.loyaltyCard?.tier || 'Standard'} member with ${user.loyaltyCard?.points || 0} points.`
                            : 'Unlock exclusive benefits, earn points on every ticket, and enjoy VIP access to premiere events. Being a movie buff has never been this rewarding.'
                        }
                    </p>
                    <ul className="loyalty-perks">
                        <li>✨ Earn 10 points for every $1 spent</li>
                        <li>🍿 Free popcorn on your birthday</li>
                        <li>🎫 Early access to blockbuster tickets</li>
                    </ul>
                    {!user && (
                        <Link to="/register" className="btn btn-primary loyalty-btn">
                            Join The Club
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LoyaltySection;
