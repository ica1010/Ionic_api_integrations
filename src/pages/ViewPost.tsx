import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle
} from '@ionic/react';

interface RouteParams {
  id: string;
}

interface Post {
  id: number;
  title: string;
  body: string; // Assuming 'body' is used for content
  imageUrl: string; // Add this field if your API provides images
  author: string; // Add this field if your API provides author information
}

const ViewPost: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      // Simulate additional API call to get post details (e.g., image, author)
      const postData = response.data;
      // Assuming imageUrl and author are part of the post data; adjust if necessary
      setPost({ ...postData, imageUrl: 'https://ionicframework.com/docs/img/demos/card-media.png', author: 'owner stevenson' });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;

  if (!post) return <div>Error loading post</div>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Post Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
          )}
          <IonCardHeader>
            <IonCardTitle>{post.title}</IonCardTitle>
            {post.author && <IonCardSubtitle>By: {post.author}</IonCardSubtitle>}
          </IonCardHeader>
          <IonCardContent>
            <p>{post.body}</p>
            <Link to={`/posts/${id}/comments`}>View Comments</Link>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ViewPost;
