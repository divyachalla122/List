import React, { useEffect, useState } from 'react';

const List = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingPostId, setEditingPostId] = useState(null); 

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  const handleEdit = (post) => {
    setEditingPostId(post.id);  
    setTitle(post.title); 
    setBody(post.body);   
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/posts/${editingPostId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        setPosts(posts.map((post) => 
          post.id === updatedPost.id ? updatedPost : post
        ));
        setTitle('');
        setBody('');
        setEditingPostId(null); 
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
        </label>
        <label>
          Body:
          <input 
            type="text" 
            value={body}
            onChange={(e) => setBody(e.target.value)} 
          />
        </label>
        <input type="submit" value={editingPostId ? "Update Post" : "Submit"} />
      </form>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
