import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { add, pencil, trashBin } from 'ionicons/icons';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonFab,
  IonLoading,
  IonFabButton,
} from '@ionic/react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      setToastMessage('Post deleted successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Error deleting post:', error);
      setToastMessage('Failed to delete post');
      setShowToast(true);
    }
  };

  const confirmDelete = (id: number) => {
    setPostToDelete(id);
    setShowModal(true);
  };

  return (
    <IonContent>
      
      <div>
      <Link to="/publish" style={{zIndex:'99', position:'fixed', bottom:'10%', right:'20%'}}>
  <IonFab>
      <IonFabButton>
        <IonIcon icon={add}>New post</IonIcon>
      </IonFabButton>
    </IonFab>
  </Link>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="12" size-lg="4">
              <IonList>
                {Array.isArray(posts) && posts.map((post) => (
                  <IonItem key={post.id}>
                    <IonCard>
                      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                      <IonCardHeader>
                        <IonCardTitle>
                          <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>{post.title}</Link>
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {post.content}
                      </IonCardContent>
                      <IonButton onClick={() => confirmDelete(post.id)} style={{ color: 'white', backgroundColor: 'red' }}>
                        <IonIcon slot="start" icon={trashBin}></IonIcon> Delete
                      </IonButton>
                      <IonButton fill="clear" routerLink={`/posts/${post.id}/edit`}>
                        <IonIcon slot="start" icon={pencil}></IonIcon> Edit
                      </IonButton>
                    </IonCard>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
       
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirm Delete</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: '20px' }}>
              <p>Are you sure you want to delete this post?</p>
              <IonButton expand="block" onClick={() => { if (postToDelete !== null) handleDelete(postToDelete); setShowModal(false); }}>
                Yes, Delete
              </IonButton>
              <IonButton expand="block" color="light" onClick={() => setShowModal(false)}>
                Cancel
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        <IonLoading
          isOpen={loading}
          message={'Loading posts...'}
        />
      </div>

    </IonContent>
  );
};

export default Home;
