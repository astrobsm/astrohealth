import React, { useState } from 'react';
import PatientManagement from './PatientManagement'; // Import the new component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [role, setRole] = useState('admin'); // Default role is admin

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true); // Set login state to true
    };

    const handleRegister = (e) => {
        e.preventDefault();
        alert('Registration successful! Login details will be generated.');
    };

    if (isLoggedIn) {
        return <PatientManagement />; // Navigate to Patient Management page
    }

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Welcome to AstroHealth</h1>
            {role === 'patient' ? (
                <form className="login-form" onSubmit={handleRegister}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder=""
                        required
                    />
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        placeholder=""
                        required
                    />
                    <label htmlFor="condition">Condition:</label>
                    <input
                        type="text"
                        id="condition"
                        placeholder=""
                        required
                    />
                    <button type="submit">Register</button>
                    <p>
                        Already have an account?{' '}
                        <span
                            className="toggle-link"
                            onClick={() => setRole('admin')}
                        >
                            Login here
                        </span>
                    </p>
                </form>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="role">Login as:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="patient">Patient/Client</option>
                    </select>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder=""
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder=""
                        required
                    />
                    <button type="submit">Login</button>
                    <p>
                        New here?{' '}
                        <span
                            className="toggle-link"
                            onClick={() => setRole('patient')}
                        >
                            Register now
                        </span>
                    </p>
                </form>
            )}
        </div>
    );
}

export default App;
