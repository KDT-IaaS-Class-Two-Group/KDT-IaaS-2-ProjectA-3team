import { GetServerSideProps } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { useState } from 'react';
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "../../styles/notice/notice.css";

interface PostProps {
  title: string;
  content: string;
  id: string;
  createdAt: string;
}

const Post = ({ title, content, id, createdAt }: PostProps) => {
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
        window.location.href = '/noticeMain';
        alert('수정 중 오류 발생');
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
        <div className={styles.wrtiePage}>
          <div className={styles.checksize}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder='제목'
              className={styles.inputSize}
            />
          </div>
          <div className={styles.testsize}>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder='내용'
              className={styles.textareaSize}
            />
          </div>
          <div className={styles.sujungbtn}>
            <div>
              <button onClick={handleUpdate} className={greenButton}>Save</button>
            </div>
            <div>
              <button onClick={back} className={greenButton}>취소</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.authnotice}>
          <div className={styles.authnoticetitle}>
            <div>{title}</div>
            <div>{createdAt}</div>
          </div>
          <div className={styles.authnoticecontent}>
            <div>{content}</div>
          </div>
          <div className={styles.authfooter}>
            <div>
              <button onClick={() => setEditMode(true)} className={greenButton}>수정</button>
            </div>
            <div>
              <button onClick={handleDelete} className={greenButton}>삭제</button>
            </div>
            <div>
              <button onClick={back} className={greenButton}>뒤로가기</button>
            </div>
          </div>
        </div>
      )}
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
    const collection = db.collection('noticeAuthTable');

    const post = await collection.findOne({ _id: new ObjectId(slug) });
    client.close();

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        id: slug
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }
};

export default Post;
