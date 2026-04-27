// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Alert helper
function showAlert(message, type = 'info') {
    const container = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    container.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// API Helpers
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'An error occurred');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Load Employees
async function loadEmployees() {
    try {
        const employees = await fetchAPI('/employees/all');
        const tbody = document.getElementById('employees-tbody');
        const countEl = document.getElementById('employee-count');

        countEl.textContent = employees.length;

        if (employees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No employees found. Add one above!</td></tr>';
            return;
        }

        tbody.innerHTML = employees.map(emp => `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.first_name}</td>
                        <td>${emp.last_name}</td>
                        <td>$${emp.pay}/hr</td>
                        <td class="actions">
                            <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${emp.id})">Delete</button>
                        </td>
                    </tr>
                `).join('');

        // Update dropdowns
        updateEmployeeDropdowns(employees);
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

function updateEmployeeDropdowns(employees) {
    const dropdowns = [
        'hours_employee_id',
        'view_hours_employee',
        'user_employee_id'
    ];

    const options = '<option value="">Select an employee</option>' +
        employees.map(emp => `<option value="${emp.id}">${emp.first_name} ${emp.last_name}</option>`).join('');

    dropdowns.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = options;
    });
}

// Add Employee
document.getElementById('add-employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        await fetchAPI('/employees/add', {
            method: 'POST',
            body: JSON.stringify({
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                pay: parseInt(formData.get('pay'))
            })
        });

        showAlert('Employee added successfully!', 'success');
        form.reset();
        loadEmployees();
    } catch (error) {
        showAlert(error.message, 'error');
    }
});

// Delete Employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee? This will also delete their user account and hours.')) {
        return;
    }

    try {
        await fetchAPI('/employees/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id })
        });

        showAlert('Employee deleted successfully!', 'success');
        loadEmployees();
        loadUsers();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Load Users
async function loadUsers() {
    try {
        const users = await fetchAPI('/users/all');
        const tbody = document.getElementById('users-tbody');

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No users found.</td></tr>';
            return;
        }

        tbody.innerHTML = users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.employee_id}</td>
                        <td><span class="badge badge-success">${user.role === 0 ? 'User' : 'Admin'}</span></td>
                        <td class="actions">
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `).join('');
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Add User
document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        await fetchAPI('/users/add', {
            method: 'POST',
            body: JSON.stringify({
                employee_id: parseInt(formData.get('employee_id')),
                username: formData.get('username'),
                password: formData.get('password'),
                role: parseInt(formData.get("role"))
            })
        });

        showAlert('User created successfully!', 'success');
        form.reset();
        loadUsers();
    } catch (error) {
        showAlert(error.message, 'error');
    }
});

// Delete User
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        await fetchAPI('/users/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id })
        });

        showAlert('User deleted successfully!', 'success');
        loadUsers();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Add Hours
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

        // Refresh hours if viewing the same employee
        const viewSelect = document.getElementById('view_hours_employee');
        if (viewSelect.value) {
            loadHoursForEmployee(viewSelect.value);
        }
    } catch (error) {
        showAlert(error.message, 'error');
    }
});

// View Hours for Employee
document.getElementById('view_hours_employee').addEventListener('change', (e) => {
    const employeeId = e.target.value;
    if (employeeId) {
        loadHoursForEmployee(employeeId);
    } else {
        document.getElementById('hours-table-container').classList.add('hidden');
        document.getElementById('hours-empty').classList.add('hidden');
    }
});

async function loadHoursForEmployee(employeeId) {
    try {
        const hours = await fetchAPI(`/hours/get?id=${employeeId}`);
        const tbody = document.getElementById('hours-tbody');
        const tableContainer = document.getElementById('hours-table-container');
        const emptyState = document.getElementById('hours-empty');

        if (hours.length === 0) {
            tableContainer.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        tableContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');

        tbody.innerHTML = hours.map(h => `
                    <tr>
                        <td>${new Date(h.date).toLocaleDateString()}</td>
                        <td>${h.amount} hours</td>
                    </tr>
                `).join('');
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Set default date to today
document.getElementById('date').valueAsDate = new Date();

// Initial load
loadEmployees();
loadUsers();