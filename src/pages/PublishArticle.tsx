import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonLoading,
  IonToast
} from '@ionic/react';
import './styles.css';

const PublishArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: content,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      setLoading(false);
      setToastMessage('Article publié avec succès');
      setShowToast(true);
      setTimeout(() => {
        history.push('/home');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
      setToastMessage('Erreur lors de la publication');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publier un Article</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="publish-container">
        <div className="publish-form">
          <h1>Publier un Article</h1>
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="stacked">Titre</IonLabel>
              <IonInput
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contenu</IonLabel>
              <IonTextarea
                value={content}
                onIonChange={(e) => setContent(e.detail.value!)}
                required
              />
            </IonItem>
            <IonButton expand="block" type="submit" style={{ marginTop: '20px' }}>
              Publier
            </IonButton>
          </form>
        </div>
        <IonLoading
          isOpen={loading}
          message={'Publication en cours...'}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default PublishArticle;
