import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';

import { Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentDTO } from '../../dto/comment.dto';
import { NoticeCommentService } from '../../../application/notice_service/comment_crud.service';

@ApiTags('Notice Comment API')
@Controller('comments')
export class NoticeCommentController {
  constructor(private readonly noticeCommentService: NoticeCommentService) {}

  /**
   * 지정된 게시물에 대한 사용자 댓글을 페이지네이션하여 조회합니다.
   * @param {string} postId - 게시물 ID
   * @param {string} [page='1'] - 페이지 번호 (기본값: '1')
   * @param {string} [limit='3'] - 페이지당 댓글 수 (기본값: '3')
   * @returns {Promise<any>} - 페이지네이션된 댓글 리스트를 반환합니다.
   */
  @Get(':postId')
  @ApiOperation({
    summary: '사용자 댓글 조회',
    description:
      '지정된 게시물에 대한 사용자 댓글을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getUserComment(
    @Param('postId') postId: string,
    @Query('page') page: string = '1', // 쿼리 파라미터로부터 페이지 번호를 가져옵니다. 기본값은 '1'입니다.
    @Query('limit') limit: string = '3', // 쿼리 파라미터로부터 페이지당 댓글 수를 가져옵니다. 기본값은 '3'입니다.
  ) {
    const pageNumber = parseInt(page, 10); // 페이지 번호를 10진수로 변환합니다.
    const limitNumber = parseInt(limit, 10); // 페이지당 댓글 수를 10진수로 변환합니다.
    return await this.noticeCommentService.getUserhNotices(
      postId,
      pageNumber,
      limitNumber,
    );
  }

  /**
   * 지정된 게시물에 댓글을 작성합니다.
   * @param {string} postId - 게시물 ID
   * @param {CommentDTO} commentDTO - 댓글 데이터 객체
   * @param {Request} req - 요청 객체 (세션에서 사용자 정보 추출)
   * @returns {Promise<any>} - 댓글 작성 결과를 반환합니다.
   */
  @Post(':postId')
  @ApiOperation({
    summary: '댓글 작성',
    description: '지정된 게시물에 댓글을 작성하는 엔드포인트.',
  })
  async createComment(
    @Param('postId') postId: string,
    @Body() commentDTO: CommentDTO, // 요청 본문으로부터 댓글 데이터 객체를 가져옵니다.
    @Req() req: Request, // 요청 객체로부터 세션 정보를 추출합니다.
  ) {
    const session = req.session.user;
    const user_id = session?.user_id; // 세션에서 사용자 ID를 추출합니다.
    return await this.noticeCommentService.createComment(
      postId,
      commentDTO,
      user_id,
    );
  }

  /**
   * 지정된 게시물의 댓글을 수정합니다.
   * @param {string} postId - 게시물 ID
   * @param {string} content - 새로운 댓글 내용
   * @param {Request} req - 요청 객체 (세션에서 사용자 정보 추출)
   * @returns {Promise<any>} - 댓글 수정 결과를 반환합니다.
   */
  @Put(':postId')
  @ApiOperation({
    summary: '댓글 수정',
    description: '지정된 게시물의 댓글을 수정하는 엔드포인트.',
  })
  async updateComment(
    @Param('postId') postId: string,
    @Body('content') content: string, // 요청 본문으로부터 새로운 댓글 내용을 가져옵니다.
    @Req() req: Request, // 요청 객체로부터 세션 정보를 추출합니다.
  ) {
    const session = req.session.user;
    const user_id = session?.user_id; // 세션에서 사용자 ID를 추출합니다.
    return this.noticeCommentService.updateComment(postId, content, user_id);
  }

  /**
   * 지정된 게시물의 댓글을 삭제합니다.
   * @param {string} postId - 게시물 ID
   * @param {Request} req - 요청 객체 (세션에서 사용자 정보 추출)
   * @returns {Promise<any>} - 댓글 삭제 결과를 반환합니다.
   */
  @Delete(':postId')
  @ApiOperation({
    summary: '댓글 삭제',
    description: '지정된 게시물의 댓글을 삭제하는 엔드포인트.',
  })
  async deleteComment(@Param('postId') postId: string, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id; // 세션에서 사용자 ID를 추출합니다.
    const role = session?.role_name; // 세션에서 사용자 역할을 추출합니다.
    return this.noticeCommentService.deleteComment(postId, user_id, role);
  }
}
