document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');

    registerButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const requestBody = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://panel.mait.ac.in:8001/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const responseData = await response.json();
            alert(responseData.message);
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register user. Please try again.');
        }
    });
});