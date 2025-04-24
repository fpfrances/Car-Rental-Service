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
        const response = await fetch('http://localhost:3001/vehicles', {
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

// Function to move focus to the next input box
function moveToNextInput(currentInput) {
    var maxLength = parseInt(currentInput.getAttribute('maxlength'));
    var nextInput = currentInput.nextElementSibling;

    if (currentInput.value.length >= maxLength && nextInput) {
        nextInput.focus();
    }
}

// Event listener to move focus to the next input box
document.querySelectorAll('.license-plate-box').forEach(function(input) {
    input.addEventListener('input', function() {
        moveToNextInput(this);
    });
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
