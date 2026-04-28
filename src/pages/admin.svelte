<script>
  import { onMount } from 'svelte'

  let workerPosts = []
  let stats = {
    totalPosts: 0,
    pendingApproval: 0,
    approved: 0,
    rejected: 0,
  }
  let filterStatus = 'all'

  onMount(() => {
    loadPosts()
  })

  function loadPosts() {
    const savedPosts = localStorage.getItem('workerPosts')
    workerPosts = savedPosts ? JSON.parse(savedPosts) : []
    updateStats()
  }

  function updateStats() {
    stats.totalPosts = workerPosts.length
    stats.pendingApproval = workerPosts.filter(p => p.status === 'pending').length
    stats.approved = workerPosts.filter(p => p.status === 'approved').length
    stats.rejected = workerPosts.filter(p => p.status === 'rejected').length
  }

  function approvePost(id) {
    const post = workerPosts.find(p => p.id === id)
    if (post) {
      post.status = 'approved'
      localStorage.setItem('workerPosts', JSON.stringify(workerPosts))
      workerPosts = workerPosts
      updateStats()
    }
  }

  function rejectPost(id) {
    const post = workerPosts.find(p => p.id === id)
    if (post) {
      post.status = 'rejected'
      localStorage.setItem('workerPosts', JSON.stringify(workerPosts))
      workerPosts = workerPosts
      updateStats()
    }
  }

  function deletePost(id) {
    workerPosts = workerPosts.filter(p => p.id !== id)
    localStorage.setItem('workerPosts', JSON.stringify(workerPosts))
    updateStats()
  }

  $: filteredPosts = filterStatus === 'all'
    ? workerPosts
    : workerPosts.filter(p => p.status === filterStatus)
</script>

<div class="admin-page">
  <h1>Admin Dashboard</h1>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-number">{stats.totalPosts}</div>
      <div class="stat-label">Total Posts</div>
    </div>
    <div class="stat-card pending">
      <div class="stat-number">{stats.pendingApproval}</div>
      <div class="stat-label">Pending Review</div>
    </div>
    <div class="stat-card approved">
      <div class="stat-number">{stats.approved}</div>
      <div class="stat-label">Approved</div>
    </div>
    <div class="stat-card rejected">
      <div class="stat-number">{stats.rejected}</div>
      <div class="stat-label">Rejected</div>
    </div>
  </div>

  <div class="moderation-section">
    <h2>Content Moderation</h2>

    <div class="filter-buttons">
      <button
        class="filter-btn"
        class:active={filterStatus === 'all'}
        on:click={() => (filterStatus = 'all')}
      >
        All Posts
      </button>
      <button
        class="filter-btn"
        class:active={filterStatus === 'pending'}
        on:click={() => (filterStatus = 'pending')}
      >
        Pending ({stats.pendingApproval})
      </button>
      <button
        class="filter-btn"
        class:active={filterStatus === 'approved'}
        on:click={() => (filterStatus = 'approved')}
      >
        Approved ({stats.approved})
      </button>
      <button
        class="filter-btn"
        class:active={filterStatus === 'rejected'}
        on:click={() => (filterStatus = 'rejected')}
      >
        Rejected ({stats.rejected})
      </button>
    </div>

    {#if filteredPosts.length === 0}
      <p class="empty-state">No posts to display</p>
    {:else}
      <div class="posts-container">
        {#each filteredPosts as post (post.id)}
          <div class="post-review" data-status={post.status}>
            <div class="post-preview">
              <img src={post.imageUrl} alt={post.title} />
              <div class="preview-content">
                <h3>{post.title}</h3>
                <p class="post-meta">
                  By {post.author} • {post.date} • {post.category}
                </p>
                <p class="post-text">{post.content}</p>
              </div>
            </div>

            <div class="post-status">
              <span class="status-label" class:pending={post.status === 'pending'} class:approved={post.status === 'approved'} class:rejected={post.status === 'rejected'}>
                {post.status.toUpperCase()}
              </span>
            </div>

            {#if post.status === 'pending'}
              <div class="moderation-actions">
                <button
                  class="btn-approve"
                  on:click={() => approvePost(post.id)}
                >
                  ✓ Approve
                </button>
                <button
                  class="btn-reject"
                  on:click={() => rejectPost(post.id)}
                >
                  ✗ Reject
                </button>
              </div>
            {:else}
              <div class="moderation-actions">
                <button
                  class="btn-delete"
                  on:click={() => deletePost(post.id)}
                >
                  🗑️ Delete Post
                </button>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .admin-page {
    padding: 2rem 0;
  }

  .admin-page h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    border-top: 4px solid #3498db;
  }

  .stat-card.pending {
    border-top-color: #f39c12;
  }

  .stat-card.approved {
    border-top-color: #27ae60;
  }

  .stat-card.rejected {
    border-top-color: #e74c3c;
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

  .moderation-section {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .moderation-section h2 {
    color: #2c3e50;
    margin-top: 0;
  }

  .filter-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    background-color: #ecf0f1;
    color: #2c3e50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
  }

  .filter-btn.active {
    background-color: #3498db;
    color: white;
  }

  .filter-btn:hover {
    background-color: #3498db;
    color: white;
  }

  .empty-state {
    text-align: center;
    color: #7f8c8d;
    padding: 2rem;
  }

  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-review {
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    padding: 1.5rem;
    background-color: #f9f9f9;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
  }

  .post-review[data-status='pending'] {
    border-left: 4px solid #f39c12;
    background-color: #fffbf0;
  }

  .post-review[data-status='approved'] {
    border-left: 4px solid #27ae60;
    background-color: #f0fdf4;
  }

  .post-review[data-status='rejected'] {
    border-left: 4px solid #e74c3c;
    background-color: #fef2f2;
  }

  .post-preview {
    display: flex;
    gap: 1rem;
  }

  .post-preview img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  .preview-content {
    flex: 1;
  }

  .preview-content h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .post-meta {
    margin: 0.5rem 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .post-text {
    margin: 0.5rem 0 0 0;
    color: #555;
    line-height: 1.4;
    font-size: 0.95rem;
  }

  .post-status {
    display: flex;
    justify-content: center;
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

  .moderation-actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  .btn-approve,
  .btn-reject,
  .btn-delete {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  .btn-approve {
    background-color: #27ae60;
    color: white;
  }

  .btn-approve:hover {
    opacity: 0.8;
  }

  .btn-reject {
    background-color: #e74c3c;
    color: white;
  }

  .btn-reject:hover {
    opacity: 0.8;
  }

  .btn-delete {
    background-color: #95a5a6;
    color: white;
  }

  .btn-delete:hover {
    opacity: 0.8;
  }

  @media (max-width: 1200px) {
    .post-review {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .post-preview {
      gap: 1.5rem;
    }

    .moderation-actions {
      flex-direction: row;
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .filter-buttons {
      flex-direction: column;
    }

    .filter-btn {
      width: 100%;
    }
  }
</style>
