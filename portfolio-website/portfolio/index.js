document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var lines = document.querySelectorAll('.line');
        lines.forEach(function(line) {
            line.style.opacity = '0';
        });
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('preloader').style.display = 'none';
            var bottomContent = document.getElementById('subtext');
            var content = document.getElementById('content');
            var frankieText = document.getElementById('frankie-text');
            content.style.display = 'block';
            var buttonContainer = document.getElementById('button-container')
            setTimeout(function() {
                content.style.opacity = '1';
                content.style.animation = 'fadeInUp 1s ease forwards'
                bottomContent.style.opacity = '1';
                bottomContent.style.animation = 'fadeInUp 1s ease forwards'
                buttonContainer.style.opacity = '1';
                buttonContainer.style.animation = 'fadeInDown 1s ease forwards';
                frankieText.style.opacity = '1';
                frankieText.style.animation = 'fadeIn 1s ease forwards'
            }, 10);
        }, 250);
    }, 2200);

    // Function to get the boundaries of the content div
    function getContentBoundaries() {
        var content = document.getElementById('content');
        var rect = content.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom
        };
    }

    // Function to check if a position is within the content div
    function isInContent(x, y, boundaries) {
        return x > boundaries.left && x < boundaries.right && y > boundaries.top && y < boundaries.bottom;
    }

    var particles = [];
    var particleCount = 75;
    var mouseX = 0;
    var mouseY = 0;
    var isMouseMoving = false;

    // Function to create particles
    function createParticles() {
        var boundaries = getContentBoundaries();
        for (var i = 0; i < particleCount; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            var x, y;
            do {
                x = Math.random() * window.innerWidth;
                y = Math.random() * window.innerHeight;
            } while (isInContent(x, y, boundaries));
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animationDelay = `1.8s`;
            document.body.appendChild(particle);
            particles.push(particle);
        }
    }

    var mouseStopTimer;

    // Update particles based on mouse movement
    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseMoving = true;

        clearTimeout(mouseStopTimer);
        mouseStopTimer = setTimeout(function() {
            isMouseMoving = false;
            scatterParticles();
        }, 1000);
    });

    // Function to update particle positions
    function updateParticles() {
        var angleStep = (2 * Math.PI) / particleCount;

        particles.forEach(function(particle, index) {
            if (isMouseMoving) {
                var angle = angleStep * index;
                var particleX = mouseX + 25 * Math.cos(angle);
                var particleY = mouseY + 25 * Math.sin(angle);
                particle.style.transform = `translate(${particleX - particle.offsetLeft}px, ${particleY - particle.offsetTop}px)`;
            }
        });

        requestAnimationFrame(updateParticles);
    }

    // Function to scatter particles
    function scatterParticles() {
        var boundaries = getContentBoundaries();
        particles.forEach(function(particle) {
            particle.style.setProperty('transition', 'transform 0.35s ease');
            var x, y;
            do {
                x = Math.random() * window.innerWidth - particle.offsetLeft;
                y = Math.random() * window.innerHeight - particle.offsetTop;
            } while (isInContent(x + particle.offsetLeft, y + particle.offsetTop, boundaries));
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });

        setTimeout(function() {
            particles.forEach(function(particle) {
                particle.style.setProperty('transition', 'transform 0.05s ease');
            });
        }, 500);
    }

    // Initialize particles and start the animation
    createParticles();
    updateParticles();

});