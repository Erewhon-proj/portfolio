        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (window.matchMedia("(hover: hover)").matches) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX - 20 + 'px';
                    cursorFollower.style.top = e.clientY - 20 + 'px';
                }, 20);
            });

            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(1.5)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        function createParticles() {
            if (window.innerWidth > 768 && window.matchMedia("(hover: hover)").matches) {
                const documentHeight = document.body.scrollHeight;
                for (let i = 0; i < 60; i++) { 
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * documentHeight + 'px'; 
                    particle.style.width = Math.random() * 4 + 1 + 'px';
                    particle.style.height = particle.style.width;
                    particle.style.animationDelay = Math.random() * 6 + 's';
                    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
                    document.body.appendChild(particle);
                }
            }
        }

        setTimeout(createParticles, 100);

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');
            
            parallaxElements.forEach(element => {
                const speed = 0.45; 
                const maxTranslate = 150; 
                const translateY = Math.min(scrolled * speed, maxTranslate);
                element.style.transform = `translateY(${translateY}px)`;
            });
        });

        document.querySelectorAll('.project-card').forEach(card => {
            if (window.matchMedia("(hover: hover)").matches) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                });
            }
            
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
            });
        });
