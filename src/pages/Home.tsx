import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log(response.data);  // Ajoutez cette ligne pour vérifier la réponse de l'API
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Liste des Posts</h1>
      <ul>
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/publish">Publish New Article</Link>
    </div>
  );

  async function handleDelete(id: number) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
};

export default Home;
