document.getElementById('addVehicleForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Combine license plate values into a single string
    const licensePlate = combineLicensePlate();
    jsonObject['licensePlate'] = licensePlate;

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

function combineLicensePlate() {
    var licensePlate = "";
    licensePlate += document.getElementById('licensePlate1').value;
    licensePlate += document.getElementById('licensePlate2').value;
    licensePlate += document.getElementById('licensePlate3').value;
    licensePlate += document.getElementById('licensePlate4').value;
    licensePlate += document.getElementById('licensePlate5').value;
    licensePlate += document.getElementById('licensePlate6').value;
    licensePlate += document.getElementById('licensePlate7').value;
    return licensePlate;
}
