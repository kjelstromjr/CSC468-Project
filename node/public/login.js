document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
            })
        });

        window.location.href = "/";
    } catch (error) {
        showAlert(error.message, 'error');
    }
});

async function logout() {
    try {
        await fetchAPI('/auth/logout', {
            method: 'POST'
        });

        window.location.href = "/";
    } catch(err) {
        showAlert(error.message, 'error');
    }
}