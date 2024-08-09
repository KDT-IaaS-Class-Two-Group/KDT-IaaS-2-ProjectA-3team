
import { GetServerSideProps } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { useState } from 'react';
import CommentForm from '../../components/userMainPage/commentForm'

interface PostProps {
  title: string;
  content: string;
  id: string;
}

const Post = ({ title, content, id }: PostProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleUpdate = () => {
    fetch(`http://localhost:3001/notice/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title: newTitle, content: newContent }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
          alert(data);
          window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('수정 중 오류 발생');
        window.location.href = '/noticeMain';

      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/notice/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        alert(data);
        window.location.href = '/noticeMain';
    })
    .catch(err => {
      console.error(err);
      alert('삭제 중 오류 발생')
      window.location.href = '/noticeMain';
    });
  };

  const back = () => {
    window.location.href = '/noticeMain';
  }

  return (
    <div>
      {editMode ? (
        <div>
          <div>사용자</div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder='제목'
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder='내용'
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={() => setEditMode(true)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
      <div>
        <button onClick={back}>뒤로가기</button>
      </div>
      <div>
        <CommentForm  postId={id as string}/>
      </div>
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
