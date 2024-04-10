//Add functionality to return to inventory button 
const retInvButton = document.querySelector('.returnToInventory');
retInvButton.addEventListener('click', function() {
    const redirectTo = 'inventory.html';
    window.location.href = redirectTo;
});