document.addEventListener("DOMContentLoaded", function() {
    // Ensure the form exists before attaching the event listener
    const form = document.getElementById('Form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;

            const errors = document.querySelectorAll('.error');
            errors.forEach(error => error.style.display = 'none');

            const username = document.getElementById("username").value;
            if (username.length < 3) {
                isValid = false;
                const usernameError = document.getElementById('usernameError');
                usernameError.textContent = 'Username must be at least 3 characters long';
                usernameError.style.display = 'block';
            }

            const email = document.getElementById("email").value;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                const emailError = document.getElementById('emailError');
                emailError.textContent = 'Invalid email address';
                emailError.style.display = 'block';
            }

            const password = document.getElementById("password").value;
            if (password.length < 6) {
                isValid = false;
                const passwordError = document.getElementById('passwordError');
                passwordError.textContent = 'Password must be at least 6 characters long';
                passwordError.style.display = 'block';
            }

            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                isValid = false;
                const confirmPasswordError = document.getElementById('confirmPasswordError');
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.display = 'block';
            }

            if (isValid) {
                alert('Form submitted successfully!');
            }
        });
    }

    // Ensure the button exists before attaching the event listener
    const button = document.getElementById('Button');
    if (button) {
        button.addEventListener('click', function() {
            const colors = ['#FF6347', '#FFA07A', '#FFD700', '#ADFF2F', '#00FFFF', '#4682B4', '#9370DB', '#FF00FF', '#FF1493', '#8B4513'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
        });
    }

    // Ensure the posts container exists before fetching data
    const postsContainer = document.getElementById('postcontainer');
    if (postsContainer) {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    }
});
