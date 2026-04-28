<script>
  import { navigateTo } from '../lib/router.js'

  let email = ''
  let password = ''
  let selectedRole = 'worker'
  let error = ''

  function handleLogin(e) {
    e.preventDefault()
    error = ''

    if (!email || !password) {
      error = 'Please fill in all fields'
      return
    }

    // Simulate login - in production, this would call an API
    const user = {
      id: Math.random(),
      name: email.split('@')[0],
      role: selectedRole,
      email,
    }

    localStorage.setItem('currentUser', JSON.stringify(user))

    // Reload to update the currentUser in App.svelte
    window.location.hash = '/' + selectedRole
  }
</script>

<div class="login-container">
  <div class="login-box">
    <h2>Login to K#2News</h2>

    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <form on:submit={handleLogin}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="your@email.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          placeholder="••••••••"
          required
        />
      </div>

      <div class="form-group">
        <label for="role">Login as:</label>
        <select id="role" bind:value={selectedRole}>
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>

      <button type="submit" class="submit-btn">Login</button>
    </form>

    <p class="demo-note">
      💡 Demo: Use any email/password to login with selected role
    </p>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
  }

  .login-box {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 400px;
  }

  .login-box h2 {
    margin-top: 0;
    text-align: center;
    color: #2c3e50;
  }

  .error-message {
    background-color: #e74c3c;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 500;
    color: #2c3e50;
  }

  .form-group input,
  .form-group select {
    padding: 0.75rem;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  .submit-btn {
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 0.5rem;
  }

  .submit-btn:hover {
    background-color: #2980b9;
  }

  .demo-note {
    text-align: center;
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
</style>
