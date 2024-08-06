
import { GetServerSideProps } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { useState } from 'react';

interface PostProps {
  title: string;
  content: string;
  id: string;
}

const Post = ({ title, content, id }: PostProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3001/notice/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      if (res.ok) {
        alert('Post updated successfully');
        window.location.reload(); // 페이지 새로고침
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/notice/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Post deleted successfully');
        window.location.href = '/'; // 홈으로 리다이렉트
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      {editMode ? (
        <>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder='제목' 
          />
          <textarea 
            value={newContent} 
            onChange={(e) => setNewContent(e.target.value)}
            placeholder='제목'
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = Array.isArray(context.params?.slug) ? context.params.slug[0] : context.params?.slug;
    if (!slug || typeof slug !== 'string') {
      return { notFound: true };
    }

    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('notice');
    const collection = db.collection('noticeTable');

    const post = await collection.findOne({ _id: new ObjectId(slug) });
    client.close();

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        title: post.title,
        content: post.content,
        id: slug
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }
};

export default Post;
