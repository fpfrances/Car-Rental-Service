document.getElementById('addVehicleForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3000/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('resultSection').style.display = 'block';
            document.getElementById('generatedID').innerText = data.id;
        } else {
            console.error('Error adding vehicle:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding vehicle:', error);
    }
});