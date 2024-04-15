let totalFines = 100; // Each Rental has an initial cost of $100

function addDamageInstance() {
    const damageInstances = document.getElementById('damageInstances');
    const newDamageInstance = document.createElement('div');
    newDamageInstance.classList.add('damage-instance');
    newDamageInstance.innerHTML = `
    <button type="button" class="deleteButton" onclick="deleteDamageInstance(this)">X</button>
        <label for="damageType">Select Damage Type:</label>
        <select class="damageType" name="damageType[]" onchange="calculateTotal()">
            <option value="scratch">Scratch</option>
            <option value="dent">Dent</option>
            <option value="brokenMirror">Broken Mirror</option>
            <!-- Add more damage types as needed -->
        </select>
        <br>
        Pricing:
        <input type="number" class="damagePrice" name="damagePrice[]" placeholder="Enter Price" onchange="calculateTotal()">
    `;
    damageInstances.appendChild(newDamageInstance);
    calculateTotal();
}

function deleteDamageInstance(button) {
    const damageInstance = button.parentNode;
    damageInstance.parentNode.removeChild(damageInstance);
    calculateTotal();
}

function calculateTotal() {
    const lateDropOffCheckbox = document.getElementById('LateDropOffCheckbox');
    const cleaningFeeCheckbox = document.getElementById('CleaningFeeCheckbox');
    const smokingCheckbox = document.getElementById('smokingCheckbox');
    const emptyTankCheckbox = document.getElementById('emptyTankCheckbox');
    const damageInstances = document.querySelectorAll('.damage-instance');

    // Reset total fines to the base cost
    totalFines = 100;

    if (lateDropOffCheckbox.checked) {
        totalFines += 100;
    }

    if (cleaningFeeCheckbox.checked) {
        totalFines += 50;
    }

    if (smokingCheckbox.checked) {
        totalFines += 50;
    }

    if (emptyTankCheckbox.checked) {
        totalFines += 40;
    }

    damageInstances.forEach((instance) => {
        const damagePrice = parseFloat(instance.querySelector('.damagePrice').value) || 0;
        totalFines += damagePrice;
    });

    document.getElementById('totalFines').innerText = `Total Fines: $${totalFines}`;
}

function printReceipt() {
    // Gather receipt information
    const date = new Date().toLocaleDateString();

    // Construct the HTML content of the receipt
    const receiptContent = `
        <h1>Receipt</h1>
        <p><strong>Thank You For Choosing Knights Auto!</strong></p>
        <p><strong>Rental Date:</strong> ${date}</p>
        <p><strong>Service Price:</strong> $100</p>
        <p><strong>Total Price After Fees:</strong> $${totalFines}</p>
        <!-- Add more receipt details as needed -->
    `;

    // Open a new browser window or tab with the receipt content
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.body.innerHTML = receiptContent;

    // Print the receipt
    receiptWindow.print();
}

function clearFines() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    const damageInputs = document.querySelectorAll('.damagePrice');
    damageInputs.forEach((input) => {
        input.value = '';
    });

    const damageInstances = document.querySelectorAll('.damage-instance');
    damageInstances.forEach((instance) => {
        instance.parentNode.removeChild(instance);
    });

    calculateTotal();
}
