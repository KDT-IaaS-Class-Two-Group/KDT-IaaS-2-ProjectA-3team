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

import { NoticeService } from '../../../notice.service';

import { CommentDTO } from 'src/api/Auth/notice/presentation/dto/comment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notice Comment API')
@Controller('comments')
export class NoticeCommentController {
  constructor(private readonly noticeService: NoticeService) {}
  @Get(':postid')
  @ApiOperation({
    summary: '사용자 댓글 조회',
    description:
      '지정된 게시물에 대한 사용자 댓글을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getUserComment(
    @Param('postid') postId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '3',
  ) {
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeService.getUserhNotices(
      postId,
      pageNumber,
      limitNumber,
    );
  }

  @Post(':postid')
  @ApiOperation({
    summary: '댓글 작성',
    description: '지정된 게시물에 댓글을 작성하는 엔드포인트.',
  })
  async createComment(
    @Param('postid') postId: string,
    @Body() commentDTO: CommentDTO,
    @Req() req: Request,
  ) {
    const session = req.session.user;
    const user_id = session?.user_id;
    return await this.noticeService.createComment(postId, commentDTO, user_id);
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
    const role = session?.role_name;
    return this.noticeService.updateComment(postId, content, user_id, role);
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
    return this.noticeService.deleteComment(postId, user_id, role);
  }
}