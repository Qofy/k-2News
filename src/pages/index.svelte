<div class="home">
  <h1>Welcome to K#2News</h1>
  <p>Your news platform with role-based access control</p>

  <div class="features">
    <div class="feature-card">
      <h3>📰 Latest News</h3>
      <p>Stay updated with the latest news articles</p>
      <a href="#/news">View News</a>
    </div>

    <div class="feature-card">
      <h3>👤 User Roles</h3>
      <p>Admin, Worker, or SuperAdmin access</p>
      <a href="#/login">Login</a>
    </div>

    <div class="feature-card">
      <h3>📝 Post Articles</h3>
      <p>Create and manage news articles</p>
      <a href="#/login">Get Started</a>
    </div>
  </div>
</div>

<style>
  .home {
    text-align: center;
    padding: 2rem;
  }

  .home h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  .home p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-bottom: 3rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .feature-card h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  .feature-card p {
    margin: 1rem 0;
    color: #7f8c8d;
  }

  .feature-card a {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
    margin-top: 1rem;
  }

  .feature-card a:hover {
    background-color: #2980b9;
  }
</style>
