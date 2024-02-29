function addDamageInstance() {
    const damageInstances = document.getElementById('damageInstances');
    const newDamageInstance = document.createElement('div');
    newDamageInstance.classList.add('damage-instance');
    newDamageInstance.innerHTML = `
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

function calculateTotal() {
    const lateDropOffCheckbox = document.getElementById('LateDropOffCheckbox');
    const cleaningFeeCheckbox = document.getElementById('CleaningFeeCheckbox');
    const smokingCheckbox = document.getElementById('smokingCheckbox');
    const emptyTankCheckbox = document.getElementById('emptyTankCheckbox');
    const damageInstances = document.querySelectorAll('.damage-instance');

    let totalFines = 0;

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
        const damageType = instance.querySelector('.damageType').value;
        const damagePrice = parseFloat(instance.querySelector('.damagePrice').value) || 0;
        totalFines += damagePrice;
    });

    document.getElementById('totalFines').innerText = `Total Fines: $${totalFines}`;
}