// ========== 3D CAROUSEL ==========
class Carousel3D {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-3d-track');
        this.items = container.querySelectorAll('.carousel-item');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoScrollDelay = 4000;
        this.interval = null;
        this.isPaused = false;

        this.init();
    }

    init() {
        // Create indicators
        this.items.forEach((_, i) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToIndex(i));
            this.indicatorsContainer.appendChild(indicator);
        });
                
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');

        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
                
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.isPaused = true;
            this.stopAutoScroll();
        });
                
        this.container.addEventListener('mouseleave', () => {
            this.isPaused = false;
            this.startAutoScroll();
        });
                
        // Start auto-scroll
        this.startAutoScroll();
                
        // Initial update
        this.updatePositions();
    }

    updatePositions() {
        this.items.forEach((item, i) => {
            let pos = i - this.currentIndex;
                    
            // Handle infinite loop
            if (pos > Math.floor(this.items.length / 2)) pos -= this.items.length;
            if (pos < -Math.floor(this.items.length / 2)) pos += this.items.length;
                    
            // Apply 3D transforms based on position
            if (pos === 0) {
                item.style.transform = 'translateZ(0) scale(1)';
                item.style.zIndex = '5';
                item.style.opacity = '1';
            } else if (pos === 1 || pos === -1) {
                const direction = pos > 0 ? 1 : -1;
                item.style.transform = `translateX(${direction * 30}%) translateZ(-200px) scale(0.9)`;
                item.style.zIndex = '4';
                item.style.opacity = '0.9';
            } else if (pos === 2 || pos === -2) {
                const direction = pos > 0 ? 1 : -1;
                item.style.transform = `translateX(${direction * 50}%) translateZ(-400px) scale(0.8)`;
                item.style.zIndex = '3';
                item.style.opacity = '0.7';
            } else {
                item.style.opacity = '0';
                item.style.zIndex = '1';
            }
        });

        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updatePositions();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updatePositions();
    }

    goToIndex(index) {
        this.currentIndex = index;
        this.updatePositions();
    }

    startAutoScroll() {
        this.stopAutoScroll();
        if (!this.isPaused) {
            this.interval = setInterval(() => this.next(), this.autoScrollDelay);
        }
    }

    stopAutoScroll() {
        clearInterval(this.interval);
    }
}


function initCarousels() {
// Initialize all carousels when DOM is loaded
    // document.addEventListener('DOMContentLoaded', () => {
        // Initialize 3D carousels
        document.querySelectorAll('.carousel-3d-wrapper').forEach(wrapper => {
            const container = wrapper.closest('.carousel-container');
            new Carousel3D(container);
        });

        // Initialize Fade carousels
        // document.querySelectorAll('.carousel-fade').forEach(fade => {
        //     const container = fade.closest('.carousel-container');
        //     new CarouselFade(container);
        // });

        // Initialize MultiSlide carousels
        // document.querySelectorAll('.carousel-multislide-container').forEach(container => {
        //     new CarouselMultiSlide(container);
        // });
    // });
};