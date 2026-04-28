<script>
  import { onMount } from 'svelte'
  import Home from './pages/index.svelte'
  import Login from './pages/login.svelte'
  import News from './pages/news.svelte'
  import Worker from './pages/worker.svelte'
  import Admin from './pages/admin.svelte'
  import SuperAdmin from './pages/superadmin.svelte'

  let currentPath = '/'
  let currentUser = {
    id: null,
    name: 'Guest',
    role: 'guest',
  }

  const pages = {
    '/': Home,
    '/login': Login,
    '/news': News,
    '/worker': Worker,
    '/admin': Admin,
    '/superadmin': SuperAdmin,
  }

  onMount(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      currentUser = JSON.parse(savedUser)
    }

    function handleNavigation() {
      const hash = window.location.hash.slice(1) || '/'
      currentPath = hash
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleNavigation)
    handleNavigation()

    return () => window.removeEventListener('hashchange', handleNavigation)
  })

  function navigateTo(path) {
    window.location.hash = path
  }

  function logout() {
    localStorage.removeItem('currentUser')
    currentUser = { id: null, name: 'Guest', role: 'guest' }
    navigateTo('/')
  }

  $: currentComponent = pages[currentPath] || Home
</script>

<main>
  <nav class="navbar">
    <div class="nav-brand">
      <a href="#/" class="brand-link">
        <h1>K#2News</h1>
      </a>
    </div>
    <div class="nav-center">
      <a href="#/news" class="nav-item" class:active={currentPath === '/news'}>
        📰 News
      </a>
      {#if currentUser.role === 'worker'}
        <a href="#/worker" class="nav-item" class:active={currentPath === '/worker'}>
          ✍️ Dashboard
        </a>
      {/if}
      {#if currentUser.role === 'admin'}
        <a href="#/admin" class="nav-item" class:active={currentPath === '/admin'}>
          🛡️ Admin
        </a>
      {/if}
      {#if currentUser.role === 'superadmin'}
        <a href="#/superadmin" class="nav-item" class:active={currentPath === '/superadmin'}>
          👑 Super Admin
        </a>
      {/if}
    </div>
    <div class="nav-links">
      {#if currentUser.role === 'guest'}
        <a href="#/login" class="btn-login">Login</a>
      {:else}
        <span class="user-info">{currentUser.name} <small>({currentUser.role})</small></span>
        <button class="btn-logout" on:click={logout}>Logout</button>
      {/if}
    </div>
  </nav>

  <div class="container">
    <svelte:component this={currentComponent} />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  :global(#app) {
    min-height: 100vh;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .navbar {
    background-color: #2c3e50;
    color: white;
    padding: 0.75rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    gap: 2rem;
  }

  .nav-brand {
    flex-shrink: 0;
  }

  .brand-link {
    text-decoration: none;
    color: white;
  }

  .nav-brand h1 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .nav-center {
    display: flex;
    gap: 2rem;
    flex: 1;
    justify-content: center;
  }

  .nav-item {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s;
    white-space: nowrap;
  }

  .nav-item:hover,
  .nav-item.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
  }

  .user-info {
    color: white;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .user-info small {
    opacity: 0.7;
    font-size: 0.8rem;
  }

  .btn-login,
  .btn-logout {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    font-size: 0.95rem;
    white-space: nowrap;
  }

  .btn-login:hover,
  .btn-logout:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
  }

  @media (max-width: 768px) {
    .navbar {
      flex-wrap: wrap;
      gap: 1rem;
      padding: 0.75rem 1rem;
    }

    .nav-center {
      order: 3;
      width: 100%;
      justify-content: flex-start;
      gap: 1rem;
    }

    .nav-item {
      padding: 0.5rem 0.75rem;
      font-size: 0.9rem;
    }

    .container {
      padding: 1rem;
    }
  }
</style>
