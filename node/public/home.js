async function loadMyData() {
    try {
        const myData = await fetchAPI("/auth/my-data");

        document.getElementById("hours_employee_id").value = myData.employee_id;
        loadHoursForEmployee(myData.employee_id);
    } catch (err) {
        showAlert("Could not load user data", "error");
    }
}

document.getElementById('add-hours-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        await fetchAPI('/hours/add', {
            method: 'POST',
            body: JSON.stringify({
                employee_id: parseInt(formData.get('employee_id')),
                date: formData.get('date'),
                amount: parseInt(formData.get('amount'))
            })
        });

        showAlert('Hours logged successfully!', 'success');
        form.reset();

        loadHoursForEmployee(document.getElementById("hours_employee_id").value)
    } catch (error) {
        showAlert(error.message, 'error');
    }
});

loadMyData();