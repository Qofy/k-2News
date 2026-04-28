<script>
  import { onMount } from 'svelte'

  let title = ''
  let category = 'General'
  let content = ''
  let imageUrl = ''
  let posts = []
  let showForm = false
  let message = ''

  onMount(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('workerPosts')
    posts = savedPosts ? JSON.parse(savedPosts) : []
  })

  function handleSubmit(e) {
    e.preventDefault()
    message = ''

    if (!title || !content) {
      message = 'Please fill in all required fields'
      return
    }

    const newPost = {
      id: Date.now(),
      title,
      category,
      content,
      imageUrl: imageUrl || 'https://via.placeholder.com/300x200?text=News',
      author: localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser')).name
        : 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      status: 'pending', // pending, approved, rejected
    }

    posts = [newPost, ...posts]
    localStorage.setItem('workerPosts', JSON.stringify(posts))

    title = ''
    category = 'General'
    content = ''
    imageUrl = ''
    showForm = false
    message = 'Post submitted successfully! Waiting for admin approval.'
  }

  function deletePost(id) {
    posts = posts.filter(p => p.id !== id)
    localStorage.setItem('workerPosts', JSON.stringify(posts))
  }
</script>

<div class="worker-page">
  <div class="page-header">
    <h1>Worker Dashboard</h1>
    <button
      class="btn-primary"
      on:click={() => (showForm = !showForm)}
    >
      {showForm ? '❌ Cancel' : '✍️ Create Post'}
    </button>
  </div>

  {#if showForm}
    <div class="form-container">
      <h2>Create New Post</h2>
      {#if message && message.includes('successfully')}
        <div class="success-message">{message}</div>
      {:else if message}
        <div class="error-message">{message}</div>
      {/if}

      <form on:submit={handleSubmit}>
        <div class="form-group">
          <label for="title">Post Title *</label>
          <input
            type="text"
            id="title"
            bind:value={title}
            placeholder="Enter post title"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" bind:value={category}>
              <option>General</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Science</option>
              <option>Sports</option>
            </select>
          </div>

          <div class="form-group">
            <label for="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              bind:value={imageUrl}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="content">Content *</label>
          <textarea
            id="content"
            bind:value={content}
            placeholder="Write your article content here..."
            rows="8"
            required
          />
        </div>

        <button type="submit" class="btn-submit">Submit Post</button>
      </form>
    </div>
  {/if}

  <div class="posts-section">
    <h2>Your Posts ({posts.length})</h2>

    {#if posts.length === 0}
      <p class="empty-state">No posts yet. Create your first post!</p>
    {:else}
      <div class="posts-list">
        {#each posts as post (post.id)}
          <div class="post-item" data-status={post.status}>
            <div class="post-header">
              <div>
                <h3>{post.title}</h3>
                <p class="post-meta">
                  {post.date} • {post.category}
                </p>
              </div>
              <div class="status-badge" class:pending={post.status === 'pending'} class:approved={post.status === 'approved'} class:rejected={post.status === 'rejected'}>
                {post.status.toUpperCase()}
              </div>
            </div>
            <p class="post-content">{post.content}</p>
            <div class="post-actions">
              <button class="btn-edit">✏️ Edit</button>
              <button class="btn-delete" on:click={() => deletePost(post.id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .worker-page {
    padding: 2rem 0;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .page-header h1 {
    margin: 0;
    color: #2c3e50;
  }

  .btn-primary {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  .btn-primary:hover {
    background-color: #229954;
  }

  .form-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .form-container h2 {
    margin-top: 0;
    color: #2c3e50;
  }

  .success-message {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .error-message {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group label {
    font-weight: 500;
    color: #2c3e50;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  .btn-submit {
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-top: 0.5rem;
  }

  .btn-submit:hover {
    background-color: #2980b9;
  }

  .posts-section h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .empty-state {
    text-align: center;
    color: #7f8c8d;
    padding: 2rem;
    background: white;
    border-radius: 8px;
  }

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .post-item {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .post-item[data-status='approved'] {
    border-left-color: #27ae60;
  }

  .post-item[data-status='rejected'] {
    border-left-color: #e74c3c;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .post-header h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .post-meta {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .status-badge.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .status-badge.approved {
    background-color: #d4edda;
    color: #155724;
  }

  .status-badge.rejected {
    background-color: #f8d7da;
    color: #721c24;
  }

  .post-content {
    color: #555;
    line-height: 1.6;
    margin: 1rem 0;
  }

  .post-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .btn-edit,
  .btn-delete {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.3s;
  }

  .btn-edit {
    background-color: #3498db;
    color: white;
  }

  .btn-edit:hover {
    opacity: 0.8;
  }

  .btn-delete {
    background-color: #e74c3c;
    color: white;
  }

  .btn-delete:hover {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
    }

    .page-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .post-header {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
