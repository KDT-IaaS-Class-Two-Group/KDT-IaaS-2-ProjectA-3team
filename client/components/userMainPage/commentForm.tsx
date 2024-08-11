import React, { useEffect, useState } from 'react';
interface CommentFormProps {
  postId: string;
}
interface ListComment {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<ListComment[]>([]); // 서버에서 건너오는 댓글 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 10; // 한 페이지당 항목 수
  const [editMode, setEditMode] = useState(false); // 댓글 수정

  const fetchComment = () => {
    fetch(`http://localhost:3001/usercomment/${postId}?page=${currentPage}&limit=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data: { comments: ListComment[]; totalPages: number }) => {
        setCommentList(data.comments); // 댓글 데이터
        setTotalPages(data.totalPages); // 총 페이지 수 설정
      })
      .catch((err) => {
        console.error('데이터를 가져오는 중 오류 발생:', err);
      });
  };
  
  useEffect(() => {
    fetchComment(); // 컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, [postId, currentPage]) // currentPage가 변경될 때마다 fetch

  const commentSend = async (event: React.FormEvent) => {
    event.preventDefault();
    // 댓글 추가 API 호출
    await fetch(`http://localhost:3001/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include',
      body: JSON.stringify({ content: comment }),
    });
    setComment(''); // 폼 초기화
    fetchComment(); // 댓글 추가 후 데이터 새로고침
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  const commentUpdate = async (postId: string, newContent: string) => {
    fetch(`http://localhost:3001/comments/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: newContent }),
    })
      .then((response) => response.text()) // 서버에서 반환한 텍스트 값을 받음
      .then((text) => {
        if (text === 'true') {
          fetchComment(); // 댓글 수정 후 데이터 새로고침
          setEditMode(false); // 수정 모드 비활성화
        } else {
          alert('댓글 수정에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('댓글 수정 중 오류 발생:', error);
        alert('댓글 수정 중 오류 발생');
      });
  };
  
  const commentDelete = async (postId: string) => {
    fetch(`http://localhost:3001/comments/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => response.text()) // 서버에서 반환한 텍스트 값을 받음
      .then((text) => {
        if (text === 'true') {
          fetchComment(); // 댓글 삭제 후 데이터 새로고침
        } else {
          alert('댓글 삭제에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('댓글 삭제 중 오류 발생:', error);
        alert('댓글 삭제 중 오류 발생');
      });
  };

  return (
    <div>
    <div>
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 작성하세요."
        />
      </div>
      <div>
        <button onClick={commentSend}>댓글 작성</button>
      </div>
    </div>
    <div>
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div key={comment._id}>
            {editMode ? (
              <div>
                <textarea
                  value={comment.content}
                  onChange={(e) => commentUpdate(comment._id, e.target.value)}
                  placeholder="댓글 수정"
                />
                <button onClick={() => commentUpdate(comment._id, comment.content)}>수정 완료</button>
              </div>
            ) : (
              <div>
                <h3>{comment.userId}</h3>
                <p>{comment.content}</p>
                <p>{comment.createdAt}</p>
                <button onClick={() => setEditMode(true)}>수정</button>
                <button onClick={() => commentDelete(comment._id)}>삭제</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>댓글 없음</div>
      )}
      </div>
      {/* 페이징 버튼 UI */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>

    </div>
  );
};

export default CommentForm;