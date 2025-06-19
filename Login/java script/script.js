      // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
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

        // Firebase configuration (replace with your own config)
        const firebaseConfig = {
            apiKey: "AIzaSyB9o2J2LcR2TvXc0eX7Z6m1y5wQd0b8Y7A",
            authDomain: "resumecraft-12345.firebaseapp.com",
            projectId: "resumecraft-12345",
            storageBucket: "resumecraft-12345.appspot.com",
            messagingSenderId: "123456789012",
            appId: "1:123456789012:web:abcd1234efgh5678ijkl90"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();

        // Google Sign In
        document.getElementById('googleSignIn').addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            
            auth.signInWithPopup(provider)
                .then((result) => {
                    // User signed in
                    const user = result.user;
                    console.log("Google sign-in successful", user);
                    showSuccessMessage();
                })
                .catch((error) => {
                    console.error("Google sign-in error", error);
                    showErrorMessage(error.message);
                });
        });

        // Email/Password Sign In
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Email sign-in successful", user);
                    showSuccessMessage();
                })
                .catch((error) => {
                    console.error("Email sign-in error", error);
                    showErrorMessage(error.message);
                });
        });

        // Show success message
        function showSuccessMessage() {
            const loginCard = document.querySelector('.login-card');
            const successDiv = document.createElement('div');
            successDiv.innerHTML = `
                <div class="success-message" style="background: rgba(42, 157, 143, 0.1); 
                    border-left: 4px solid var(--success); 
                    padding: 15px; 
                    margin-top: 20px; 
                    border-radius: 0 8px 8px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;">
                    <i class="fas fa-check-circle" style="color: var(--success);"></i>
                    <div>
                        <h4 style="color: var(--success); margin-bottom: 5px;">Login Successful!</h4>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                </div>
            `;
            
            // Insert after form
            const form = document.getElementById('loginForm');
            form.parentNode.insertBefore(successDiv, form.nextSibling);
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = "resume-builder.html";
            }, 2000);
        }

        // Show error message
        function showErrorMessage(message) {
            // Remove existing error messages
            const existingErrors = document.querySelectorAll('.error-message');
            existingErrors.forEach(el => el.remove());
            
            const loginCard = document.querySelector('.login-card');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `
                <div style="background: rgba(231, 111, 81, 0.1); 
                    border-left: 4px solid var(--danger); 
                    padding: 15px; 
                    margin-top: 20px; 
                    border-radius: 0 8px 8px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;">
                    <i class="fas fa-exclamation-circle" style="color: var(--danger);"></i>
                    <div>
                        <h4 style="color: var(--danger); margin-bottom: 5px;">Login Failed</h4>
                        <p>${message}</p>
                    </div>
                </div>
            `;
            
            // Insert after form
            const form = document.getElementById('loginForm');
            form.parentNode.insertBefore(errorDiv, form.nextSibling);
        }
