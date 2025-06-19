
      // dark mode
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileToggle.innerHTML = navMenu.classList.contains('show') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
       
        const createResumeBtn = document.getElementById('createResumeBtn');
        
     
createResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('form/Template1.html', '_blank');
});
        
    document.getElementById('videoPlaceholder').addEventListener('click', function () {
    const video = document.getElementById('demoVideo');
    const playButton = document.getElementById('playButton');
    playButton.style.display = 'none';
    video.style.display = 'block';
    video.muted = true;
    video.load(); // ensure it's ready
    video.play().catch(err => console.error("Video failed to play:", err));
});


        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                   
                    if (navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });





