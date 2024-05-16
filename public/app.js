document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Submitted successfully!');
        document.getElementById('studentForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('can not submit form, please try again later.');
    });
});

