document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to all cards for scroll animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('fade-in');
    });

    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Fetch system status from Uptime Kuma
    const statusBtn = document.getElementById('statusBtn');
    if (statusBtn) {
        fetch('https://status.bubikit.pl/api/status-page/bubikit')
            .then(res => res.json())
            .then(data => {
                // If there's an active incident, system is degraded or down
                if (data.incident) {
                    statusBtn.innerHTML = '🟠 System Status';
                } else {
                    statusBtn.innerHTML = '🟢 System Status';
                }
            })
            .catch(err => {
                console.error("Could not fetch status:", err);
                // Fail silently or show error emoji if CORS blocks or network fails
                statusBtn.innerHTML = '🔴 System Status'; 
            });
    }
});
