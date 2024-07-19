import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, content });
      history.push(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Modifier l'Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea onChange={(e) => setContent(e.target.value)} defaultValue={content}/>
        </div>
        <button type="submit">Metre à jour</button>
      </form>
    </div>
  );
};

export default EditPost;
