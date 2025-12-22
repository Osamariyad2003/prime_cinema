import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './LoyaltySection.css';

const tierBenefits = {
    Standard: [
        'Earn 10 points for every JOD spent',
        'Free popcorn on your birthday',
        'Early access to blockbuster tickets'
    ],
    Gold: [
        '20% bonus points on every purchase',
        'Complimentary drink with every ticket',
        'Priority lounge access'
    ],
    Platinum: [
        '50% bonus points',
        'Unlimited free popcorn',
        'VIP event invitations',
        'Personal concierge service'
    ]
};

const LoyaltySection = () => {
    const { user } = useAuth();
    const tier = user?.loyaltyCard?.tier || 'Standard';
    const points = user?.loyaltyCard?.points || 0;

    return (
        <section className="loyalty-section" id="club">
            <div className="container loyalty-container">
                <div className="loyalty-card-visual">
                    <div className={`card-front card-tier-${tier.toLowerCase()}`}>
                        <div className="card-logo">PRIME CLUB</div>
                        <div className="card-chip"></div>
                        <div className="card-number">
                            {user?.loyaltyCard ? user.loyaltyCard.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• 1234'}
                        </div>
                        <div className="card-holder-group">
                            <span className="card-holder">{user ? user.name.toUpperCase() : 'VIP MEMBER'}</span>
                            <span className="card-rank">{tier}</span>
                        </div>
                        <div className="card-points">{points} pts</div>
                    </div>
                </div>

                <div className="loyalty-content">
                    <h2 className="loyalty-title">
                        {user ? `Welcome, ${user.name}` : 'Join The Prime Club'}
                        <span> {tier}</span>
                    </h2>
                    <p className="loyalty-desc">
                        {user
                            ? `You are a ${tier} member with ${points} points. Unlock more perks by upgrading your tier!`
                            : 'Unlock exclusive benefits, earn points on every ticket, and enjoy VIP access to premiere events. Being a movie buff has never been this rewarding.'
                        }
                    </p>
                    <ul className="loyalty-perks">
                        {tierBenefits[tier].map((perk, idx) => (
                            <li key={idx}><i>★</i> {perk}</li>
                        ))}
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
