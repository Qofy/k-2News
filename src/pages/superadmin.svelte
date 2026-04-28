<script>
  import { onMount } from 'svelte'

  let allPosts = []
  let users = []
  let activeTab = 'dashboard'
  let stats = {
    totalPosts: 0,
    totalUsers: 0,
    approvedContent: 0,
    pendingContent: 0,
  }

  onMount(() => {
    loadData()
  })

  function loadData() {
    const savedPosts = localStorage.getItem('workerPosts')
    allPosts = savedPosts ? JSON.parse(savedPosts) : []

    const savedUsers = localStorage.getItem('users')
    users = savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, name: 'John Worker', role: 'worker', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Admin', role: 'admin', email: 'jane@example.com', status: 'active' },
      { id: 3, name: 'Bob Worker', role: 'worker', email: 'bob@example.com', status: 'active' },
    ]

    updateStats()
  }

  function updateStats() {
    stats.totalPosts = allPosts.length
    stats.totalUsers = users.length
    stats.approvedContent = allPosts.filter(p => p.status === 'approved').length
    stats.pendingContent = allPosts.filter(p => p.status === 'pending').length
  }

  function deactivateUser(id) {
    const user = users.find(u => u.id === id)
    if (user && confirm(`Deactivate ${user.name}?`)) {
      user.status = 'inactive'
      localStorage.setItem('users', JSON.stringify(users))
      users = users
    }
  }

  function activateUser(id) {
    const user = users.find(u => u.id === id)
    if (user) {
      user.status = 'active'
      localStorage.setItem('users', JSON.stringify(users))
      users = users
    }
  }

  function deletePost(id) {
    allPosts = allPosts.filter(p => p.id !== id)
    localStorage.setItem('workerPosts', JSON.stringify(allPosts))
    updateStats()
  }

  function promotePost(id) {
    const post = allPosts.find(p => p.id === id)
    if (post) {
      post.featured = !post.featured
      localStorage.setItem('workerPosts', JSON.stringify(allPosts))
      allPosts = allPosts
    }
  }
</script>

<div class="superadmin-page">
  <h1>Super Admin Dashboard</h1>

  <div class="tabs">
    <button
      class="tab-btn"
      class:active={activeTab === 'dashboard'}
      on:click={() => (activeTab = 'dashboard')}
    >
      Dashboard
    </button>
    <button
      class="tab-btn"
      class:active={activeTab === 'content'}
      on:click={() => (activeTab = 'content')}
    >
      Content Management
    </button>
    <button
      class="tab-btn"
      class:active={activeTab === 'users'}
      on:click={() => (activeTab = 'users')}
    >
      User Management
    </button>
  </div>

  {#if activeTab === 'dashboard'}
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-number">{stats.totalPosts}</div>
          <div class="stat-label">Total Posts</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-number">{stats.totalUsers}</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-number">{stats.approvedContent}</div>
          <div class="stat-label">Approved Posts</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-number">{stats.pendingContent}</div>
          <div class="stat-label">Pending Review</div>
        </div>
      </div>

      <div class="analytics-section">
        <h2>Content Analytics</h2>
        <div class="analytics-grid">
          <div class="analytics-card">
            <h3>Posts by Category</h3>
            <ul>
              {#each ['General', 'Technology', 'Business', 'Science', 'Sports'] as category}
                <li>
                  {category}: {allPosts.filter(p => p.category === category).length}
                </li>
              {/each}
            </ul>
          </div>
          <div class="analytics-card">
            <h3>Posts by Status</h3>
            <ul>
              <li>Approved: {stats.approvedContent}</li>
              <li>Pending: {stats.pendingContent}</li>
              <li>Rejected: {allPosts.filter(p => p.status === 'rejected').length}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  {:else if activeTab === 'content'}
    <div class="content-management">
      <h2>Content Management</h2>

      {#if allPosts.length === 0}
        <p class="empty-state">No posts available</p>
      {:else}
        <div class="posts-list">
          {#each allPosts as post (post.id)}
            <div class="content-item" data-status={post.status}>
              <div class="content-header">
                <div>
                  <h3>{post.title}</h3>
                  <p class="content-meta">
                    By {post.author} • {post.date} • {post.category}
                  </p>
                  {#if post.featured}
                    <span class="featured-badge">⭐ Featured</span>
                  {/if}
                </div>
                <span class="status-label" class:pending={post.status === 'pending'} class:approved={post.status === 'approved'} class:rejected={post.status === 'rejected'}>
                  {post.status.toUpperCase()}
                </span>
              </div>
              <p class="content-preview">{post.content}</p>
              <div class="content-actions">
                <button
                  class="btn-featured"
                  on:click={() => promotePost(post.id)}
                >
                  {post.featured ? '⭐ Unfeature' : '☆ Feature'}
                </button>
                <button class="btn-delete" on:click={() => deletePost(post.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

  {:else if activeTab === 'users'}
    <div class="user-management">
      <h2>User Management</h2>

      {#if users.length === 0}
        <p class="empty-state">No users</p>
      {:else}
        <div class="users-table">
          <div class="table-header">
            <div class="col-name">Name</div>
            <div class="col-role">Role</div>
            <div class="col-email">Email</div>
            <div class="col-status">Status</div>
            <div class="col-actions">Actions</div>
          </div>
          {#each users as user (user.id)}
            <div class="table-row" data-status={user.status}>
              <div class="col-name">{user.name}</div>
              <div class="col-role">
                <span class="role-badge" class:worker={user.role === 'worker'} class:admin={user.role === 'admin'}>
                  {user.role.toUpperCase()}
                </span>
              </div>
              <div class="col-email">{user.email}</div>
              <div class="col-status">
                <span class="status-badge" class:active={user.status === 'active'} class:inactive={user.status === 'inactive'}>
                  {user.status.toUpperCase()}
                </span>
              </div>
              <div class="col-actions">
                {#if user.status === 'active'}
                  <button
                    class="btn-deactivate"
                    on:click={() => deactivateUser(user.id)}
                  >
                    Deactivate
                  </button>
                {:else}
                  <button
                    class="btn-activate"
                    on:click={() => activateUser(user.id)}
                  >
                    Activate
                  </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .superadmin-page {
    padding: 2rem 0;
  }

  .superadmin-page h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #ecf0f1;
  }

  .tab-btn {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: #7f8c8d;
    transition: all 0.3s;
  }

  .tab-btn.active {
    color: #2c3e50;
    border-bottom-color: #e74c3c;
  }

  .tab-btn:hover {
    color: #2c3e50;
  }

  .dashboard-content {
    padding: 2rem 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    border-top: 4px solid #e74c3c;
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .analytics-section {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .analytics-section h2 {
    margin-top: 0;
    color: #2c3e50;
  }

  .analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .analytics-card {
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }

  .analytics-card h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  .analytics-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .analytics-card li {
    padding: 0.5rem 0;
    color: #555;
    border-bottom: 1px solid #ecf0f1;
  }

  .analytics-card li:last-child {
    border-bottom: none;
  }

  .content-management {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .content-management h2 {
    margin-top: 0;
    color: #2c3e50;
  }

  .empty-state {
    text-align: center;
    color: #7f8c8d;
    padding: 2rem;
  }

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .content-item {
    border: 1px solid #ecf0f1;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }

  .content-item[data-status='pending'] {
    border-left-color: #f39c12;
  }

  .content-item[data-status='approved'] {
    border-left-color: #27ae60;
  }

  .content-item[data-status='rejected'] {
    border-left-color: #e74c3c;
  }

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .content-header h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .content-meta {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .featured-badge {
    display: inline-block;
    background-color: #f39c12;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  .status-label {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .status-label.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .status-label.approved {
    background-color: #d4edda;
    color: #155724;
  }

  .status-label.rejected {
    background-color: #f8d7da;
    color: #721c24;
  }

  .content-preview {
    color: #555;
    line-height: 1.6;
    margin: 1rem 0;
  }

  .content-actions {
    display: flex;
    gap: 1rem;
  }

  .btn-featured,
  .btn-delete {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.3s;
  }

  .btn-featured {
    background-color: #f39c12;
    color: white;
  }

  .btn-featured:hover {
    opacity: 0.8;
  }

  .btn-delete {
    background-color: #e74c3c;
    color: white;
  }

  .btn-delete:hover {
    opacity: 0.8;
  }

  .user-management {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .user-management h2 {
    margin-top: 0;
    color: #2c3e50;
  }

  .users-table {
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 1.5fr;
    gap: 1rem;
    padding: 1rem;
    background-color: #2c3e50;
    color: white;
    font-weight: 500;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 1.5fr;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #ecf0f1;
    align-items: center;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .table-row[data-status='inactive'] {
    background-color: #f9f9f9;
    opacity: 0.7;
  }

  .role-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .role-badge.worker {
    background-color: #3498db;
    color: white;
  }

  .role-badge.admin {
    background-color: #9b59b6;
    color: white;
  }

  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .status-badge.active {
    background-color: #d4edda;
    color: #155724;
  }

  .status-badge.inactive {
    background-color: #f8d7da;
    color: #721c24;
  }

  .btn-deactivate,
  .btn-activate {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.3s;
  }

  .btn-deactivate {
    background-color: #e74c3c;
    color: white;
  }

  .btn-deactivate:hover {
    opacity: 0.8;
  }

  .btn-activate {
    background-color: #27ae60;
    color: white;
  }

  .btn-activate:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .table-header,
    .table-row {
      grid-template-columns: 1fr;
    }

    .content-header {
      flex-direction: column;
      gap: 1rem;
    }

    .tabs {
      flex-wrap: wrap;
    }
  }
</style>
