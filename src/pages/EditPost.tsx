import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import {
  IonContent,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonList,
} from '@ionic/react';

interface RouteParams {
  id: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, content });
      setShowModal(false);
      history.push(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <IonContent>
      <div>
        <h1>Modifier l'Article</h1>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Titre</IonLabel>
              <IonInput
                type="text"
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contenu</IonLabel>
              <IonTextarea
                value={content}
                onIonChange={(e) => setContent(e.detail.value!)}
              />
            </IonItem>
          </IonList>
          <IonButton type="submit" expand="block">Metre à jour</IonButton>
        </form>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirmer la Mise à Jour</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: '20px' }}>
              <p>Êtes-vous sûr de vouloir mettre à jour cet article?</p>
              <IonButton expand="block" onClick={handleUpdate}>Oui, Metre à jour</IonButton>
              <IonButton expand="block" color="light" onClick={() => setShowModal(false)}>Annuler</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </div>
    </IonContent>
  );
};

export default EditPost;
