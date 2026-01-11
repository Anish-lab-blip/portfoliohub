// Nexus Mart - Simulated Backend

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Holograph Sneakers",
        price: 129.99,
        category: "Fashion",
        brand: "NikeX",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
        description: "Adaptive fit sneakers with holographic accents."
    },
    {
        id: 2,
        name: "CyberDeck Pro",
        price: 2499.00,
        category: "Electronics",
        brand: "Nexus",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80",
        description: "High-performance portable workstation."
    },
    {
        id: 3,
        name: "Neon Hoodie",
        price: 89.50,
        category: "Fashion",
        brand: "UrbanFlow",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80",
        description: "Glow in the dark fabrics."
    },
    {
        id: 4,
        name: "Quantum Watch",
        price: 350.00,
        category: "Electronics",
        brand: "Chrono",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80",
        description: "Timekeeping redefined."
    },
    {
        id: 5,
        name: "Smart Lens",
        price: 1500.00,
        category: "Electronics",
        brand: "Vision",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
        description: "Augmented reality contact lenses."
    },
    {
        id: 6,
        name: "Drone Cam",
        price: 799.00,
        category: "Electronics",
        brand: "SkyHigh",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80",
        description: "4K autonomous drone."
    }
];

// Initialize Data
if (!localStorage.getItem('nexus_products')) {
    localStorage.setItem('nexus_products', JSON.stringify(DEFAULT_PRODUCTS));
}
if (!localStorage.getItem('nexus_cart')) {
    localStorage.setItem('nexus_cart', JSON.stringify([]));
}

// Exports attached to window for simple usage without modules in HTML
window.Nexus = {
    getProducts: () => {
        return JSON.parse(localStorage.getItem('nexus_products'));
    },

    getProduct: (id) => {
        const products = JSON.parse(localStorage.getItem('nexus_products'));
        return products.find(p => p.id == id);
    },

    addProduct: (product) => {
        const products = JSON.parse(localStorage.getItem('nexus_products'));
        product.id = Date.now();
        products.push(product);
        localStorage.setItem('nexus_products', JSON.stringify(products));
        return product;
    },

    deleteProduct: (id) => {
        let products = JSON.parse(localStorage.getItem('nexus_products'));
        products = products.filter(p => p.id != id);
        localStorage.setItem('nexus_products', JSON.stringify(products));
    },

    getCart: () => {
        return JSON.parse(localStorage.getItem('nexus_cart'));
    },

    addToCart: (product) => {
        const cart = JSON.parse(localStorage.getItem('nexus_cart'));
        const existing = cart.find(item => item.id == product.id);

        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('nexus_cart', JSON.stringify(cart));
    },

    updateCartQuantity: (id, change) => {
        let cart = JSON.parse(localStorage.getItem('nexus_cart'));
        const item = cart.find(p => p.id == id);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(p => p.id != id);
            }
        }
        localStorage.setItem('nexus_cart', JSON.stringify(cart));
    },

    clearCart: () => {
        localStorage.setItem('nexus_cart', JSON.stringify([]));
    }
};
