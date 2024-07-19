import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel
} from '@ionic/react';

interface RouteParams {
  id: string;
}

const ViewComments: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);
console.log(comments)
  return (
    <div>
      <h1> {comments.length} Commentaires</h1>
      <IonList>
    {comments.map((comment) => (
      <IonItem key={comment.id}>
        <IonAvatar slot="start">
          <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </IonAvatar>
        <IonLabel>
    <h2>{comment.email}</h2>
    <h5>{comment.name}</h5>
    <p>{comment.body}</p>
  </IonLabel>

      </IonItem>
    ))}
  </IonList>
    </div>
  );
};

export default ViewComments;
