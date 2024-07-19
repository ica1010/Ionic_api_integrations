// src/pages/PublishArticle.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonToast } from '@ionic/react';
import axios from 'axios';

const PublishArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const publishArticle = async () => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', { title, body: content });
      setToastMessage('Article published successfully!');
    } catch (error) {
      setToastMessage('Failed to publish article.');
    } finally {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publish Article</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Content</IonLabel>
          <IonTextarea value={content} onIonChange={(e) => setContent(e.detail.value!)} />
        </IonItem>
        <IonButton expand="full" onClick={publishArticle}>Publish</IonButton>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PublishArticle;
