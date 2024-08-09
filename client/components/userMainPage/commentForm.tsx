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
          commentList.map((comment, index) => (
            <div key={comment._id}>
              <h3>{index + 1 + (currentPage - 1) * itemsPerPage}</h3>
              <h3>{comment.userId}</h3>
              <h3>{comment.content}</h3>
              <h3>{comment.createdAt}</h3>
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