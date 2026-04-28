<script>
  import { onMount } from 'svelte'

  let newsArticles = []
  let loading = true

  onMount(async () => {
    // Simulate fetching news from API
    setTimeout(() => {
      newsArticles = [
        {
          id: 1,
          title: 'Breaking: New Features Released',
          author: 'John Doe',
          date: '2026-04-28',
          category: 'Technology',
          content: 'We are excited to announce the release of our latest features...',
          imageUrl: 'https://via.placeholder.com/300x200?text=News+1',
        },
        {
          id: 2,
          title: 'Market Update: Stock Rises',
          author: 'Jane Smith',
          date: '2026-04-27',
          category: 'Business',
          content: 'The market has shown strong growth this quarter...',
          imageUrl: 'https://via.placeholder.com/300x200?text=News+2',
        },
        {
          id: 3,
          title: 'New Research Shows Promising Results',
          author: 'Dr. Research',
          date: '2026-04-26',
          category: 'Science',
          content: 'Our latest research indicates significant breakthroughs...',
          imageUrl: 'https://via.placeholder.com/300x200?text=News+3',
        },
      ]
      loading = false
    }, 500)
  })
</script>

<div class="news-page">
  <h1>Latest News</h1>

  {#if loading}
    <div class="loading">Loading news...</div>
  {:else}
    <div class="news-grid">
      {#each newsArticles as article (article.id)}
        <div class="news-card">
          <img src={article.imageUrl} alt={article.title} />
          <div class="card-content">
            <div class="category-badge">{article.category}</div>
            <h2>{article.title}</h2>
            <p class="author">By {article.author} • {article.date}</p>
            <p class="excerpt">{article.content}</p>
            <a href="/news/{article.id}" class="read-more">Read More →</a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .news-page {
    padding: 2rem 0;
  }

  .news-page h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  .loading {
    text-align: center;
    color: #7f8c8d;
    padding: 2rem;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .news-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
  }

  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .news-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .category-badge {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    width: fit-content;
  }

  .news-card h2 {
    margin: 0.5rem 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }

  .author {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  .excerpt {
    color: #555;
    line-height: 1.5;
    margin: 1rem 0;
    flex: 1;
  }

  .read-more {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    margin-top: auto;
  }

  .read-more:hover {
    color: #2980b9;
  }
</style>
