interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  interface Comment {
    id: number;
    postId: number;
    content: string;
  }
  