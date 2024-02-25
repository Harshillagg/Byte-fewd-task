document.addEventListener('DOMContentLoaded', function() {
    const accessToken = localStorage.getItem('accessToken');

    fetchUserDetails(accessToken);
    fetchPoems(accessToken);

    const poemForm = document.getElementById('poemForm');
    poemForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const poemContent = document.getElementById('poemContent').value;
        const poemAuthor = document.getElementById('poemAuthor').value;

        const requestBody = {
            poem: poemContent,
            author: poemAuthor
        };

        try {
            const response = await fetch('http://panel.mait.ac.in:8001/poem/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to submit poem');
            }

            location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit poem. Please try again.');
        }
    });
});

async function fetchUserDetails(accessToken) {
    try {
        const response = await fetch('http://panel.mait.ac.in:8001/auth/user-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

async function fetchPoems(accessToken) {
    try {
        const response = await fetch('http://panel.mait.ac.in:8001/poem/get/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch poems');
        }

        const poemsData = await response.json();
        const poemCardsContainer = document.getElementById('poemCards');
        poemsData.forEach(poems => {
            const poemCard = document.createElement('div');
            poemCard.classList.add('poem-card');
            poemCard.innerHTML = `
                <h4>${poems.poem}</h4>
                <p>Author: ${poems.author}</p>
            `;
            poemCardsContainer.appendChild(poemCard);
        });
        poemCardsContainer.style.display = 'flex';
    } catch (error) {
        console.error('Error fetching poems:', error);
    }
}