import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface RouteParams {
  id: string;
}

const ViewPost: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to={`/posts/${id}/comments`}>View Comments</Link>
    </div>
  );
};

export default ViewPost;
