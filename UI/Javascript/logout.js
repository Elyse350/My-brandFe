


logoutButton.addEventListener('click', async function() {
    try {
        window.location.href = "../../index.html";
    } catch (error) {
        console.error("Error signing out:", error);
    }
});