import { useState } from "react";
import { greenButton } from "client/styles/templatebutton.css";
import CommentForm from "../../../components/userMainPage/commentForm";
import * as styles from "../../../styles/notice/notice.css";
import noticeUpdate from "./postComponent/noticeUpdate";
import noticeDelete from "./postComponent/noticeDelete";

interface PostProps {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  userId: string;
}

const Post = ({ title, content, id, createdAt, userId }: PostProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleUpdate = () => {
    noticeUpdate(id, newTitle, newContent);
  };

  const handleDelete = () => {
    noticeDelete(id);
  };

  const back = () => {
    window.location.href = "/noticeMain";
  };

  return (
    <>
      {editMode ? (
        <div className={styles.wrtiePage}>
          <div className={styles.checksize}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="제목"
              className={styles.inputSize}
            />
          </div>
          <div className={styles.testsize}>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="내용"
              className={styles.textareaSize}
            />
          </div>
          <div className={styles.sujungbtn}>
            <div>
              <button onClick={handleUpdate} className={greenButton}>
                Save
              </button>
            </div>
            <div>
              <button onClick={back} className={greenButton}>
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.usermainwrite}>
          <div className={styles.vw50}>
            <div className={styles.authnoticetitle}>
              <div>{title}</div>
            </div>
            <div className={styles.authnotice}>
              <div className={styles.noticetextleft}>{userId}</div>
              <div className={styles.noticetextleft}>{createdAt}</div>
              <div>
                <button onClick={back} className={styles.greenbackBtn}>
                  돌아가기
                </button>
              </div>
              <div className={styles.usermaintext}>
                <div>{content}</div>
              </div>
            </div>
          </div>
          <div className={styles.vw50}>
            <div>
              <CommentForm postId={id as string} />
            </div>
            <div className={styles.authfooter}>
              <div>
                <button
                  onClick={() => setEditMode(true)}
                  className={greenButton}
                >
                  수정
                </button>
              </div>
              <div>
                <button onClick={handleDelete} className={greenButton}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
