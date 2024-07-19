// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSpinner, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const goToPublishArticle = () => {
    history.push('/publish-article');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="full" onClick={goToPublishArticle}>
          Publish New Article
        </IonButton>
        {loading ? (
          <IonSpinner />
        ) : (
          <IonList>
            {articles.map(article => (
              <IonItem key={article.id}>
                <IonLabel>
                  <h2>{article.title}</h2>
                  <p>{article.body}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
