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

  @Get(':postId')
  @ApiOperation({
    summary: '사용자 댓글 조회',
    description:
      '지정된 게시물에 대한 사용자 댓글을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getUserComment(
    @Param('postId') postId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '3',
  ) {
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeCommentService.getUserhNotices(
      postId,
      pageNumber,
      limitNumber,
    );
  }

  @Post(':postId')
  @ApiOperation({
    summary: '댓글 작성',
    description: '지정된 게시물에 댓글을 작성하는 엔드포인트.',
  })
  async createComment(
    @Param('postId') postId: string,
    @Body() commentDTO: CommentDTO,
    @Req() req: Request,
  ) {
    const session = req.session.user;
    const user_id = session?.user_id;
    return await this.noticeCommentService.createComment(
      postId,
      commentDTO,
      user_id,
    );
  }

  @Put(':postId')
  @ApiOperation({
    summary: '댓글 수정',
    description: '지정된 게시물의 댓글을 수정하는 엔드포인트.',
  })
  async updateComment(
    @Param('postId') postId: string,
    @Body('content') content: string,
    @Req() req: Request,
  ) {
    const session = req.session.user;
    const user_id = session?.user_id;
    return this.noticeCommentService.updateComment(postId, content, user_id);
  }

  @Delete(':postId')
  @ApiOperation({
    summary: '댓글 삭제',
    description: '지정된 게시물의 댓글을 삭제하는 엔드포인트.',
  })
  async deleteComment(@Param('postId') postId: string, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return this.noticeCommentService.deleteComment(postId, user_id, role);
  }
}
