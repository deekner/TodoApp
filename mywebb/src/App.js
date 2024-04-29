import React, { useState, useEffect } from 'react';

function App() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('http://api:4000/')
    .then(res => res.json())
    .then(data => setBlogs(data))
  },[])

  return (
    <div className="App">
      <header className="App-header">
      <h1>All blogs here!</h1>
      {blogs && blogs.map(blog => (
        <h3 key={blog.id}>{blog.title}</h3>
      ))}
      </header>
    </div>
  );
}

export default App;
