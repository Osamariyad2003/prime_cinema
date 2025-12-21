const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getRandomImage = async (query = 'cinema') => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${ACCESS_KEY}`);
        if (!response.ok) throw new Error('Unsplash API error');
        const data = await response.json();
        return data.urls.regular;
    } catch (error) {
        console.error('Failed to fetch Unsplash image:', error);
        // Fallback to a high-quality static unsplash URL if API fails or rate limit hit
        return `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80&sig=${Math.random()}`;
    }
};

export const getRandomImages = async (query = 'cinema', count = 1) => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${ACCESS_KEY}`);
        if (!response.ok) throw new Error('Unsplash API error');
        const data = await response.json();
        return data.map(img => img.urls.regular);
    } catch (error) {
        console.error('Failed to fetch Unsplash images:', error);
        return Array(count).fill(`https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80&sig=${Math.random()}`);
    }
};
