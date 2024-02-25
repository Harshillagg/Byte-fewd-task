document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', async function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const requestBody = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://panel.mait.ac.in:8001/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const responseData = await response.json();

            // Store tokens in local storage
            localStorage.setItem('accessToken', responseData.access);
            localStorage.setItem('refreshToken', responseData.refresh);

            // Redirect to Dashboard page
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    });
});