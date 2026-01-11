(function () {
    // Prevent duplicate injection
    if (document.getElementById('portfolio-return-home-btn')) return;

    const btn = document.createElement('a');
    btn.id = 'portfolio-return-home-btn';
    btn.href = '/';
    btn.title = 'Return to Portfolio Hub';

    // Icon (Home SVG)
    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    `;

    // Styling
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Slate-900 with opacity
        backdropFilter: 'blur(8px)',
        webkitBackdropFilter: 'blur(8px)',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textDecoration: 'none'
    });

    // Hover Effect
    btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });

    document.body.appendChild(btn);
})();
