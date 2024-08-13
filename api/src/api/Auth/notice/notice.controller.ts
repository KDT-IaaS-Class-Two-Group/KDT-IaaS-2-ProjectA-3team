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

import { NoticeService } from './notice.service';

import { NoticeDTO, CommentDTO } from '@shared/DTO/DbDTO';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('Notice API')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  //사용자게시판 fetch
  @Get('notices')
  @ApiOperation({
    summary: '사용자 게시판 공지사항 조회',
    description:
      '사용자 게시판의 공지사항을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getAllNotices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeService.getNotices(pageNumber, limitNumber);
  }

  //관리자게시판 fetch (게시판 main 5개)
  @Get('authnotices')
  @ApiOperation({
    summary: '관리자 게시판 공지사항 조회 (메인 5개)',
    description: '관리자 게시판의 공지사항을 메인에서 5개 조회하는 엔드포인트.',
  })
  async getAuthNotices() {
    return await this.noticeService.getAuthNotices();
  }

  //관리자게시판 fetch (관리자 총 게시판)
  @Get('authallnotices')
  @ApiOperation({
    summary: '관리자 게시판 공지사항 조회 (모든 게시판)',
    description:
      '관리자 게시판의 모든 공지사항을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getAuthAllNotices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '8',
  ) {
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeService.getAuthAllNotices(pageNumber, limitNumber);
  }

  //게시물 작성 fetch

  @Post('send')
  @ApiOperation({
    summary: '공지사항 작성',
    description: '공지사항을 작성하여 데이터베이스에 저장하는 엔드포인트.',
  })
  async noticeCreate(@Body() noticeDTO: NoticeDTO, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.createNotice(noticeDTO, user_id, role);
  }

  @Put('notice/:id')
  @ApiOperation({
    summary: '공지사항 수정',
    description: '지정된 ID의 공지사항을 수정하는 엔드포인트.',
  })
  async updateNotice(
    @Param('id') id: string,
    @Body() noticeDTO: NoticeDTO,
    @Req() req: Request,
  ) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.updateNotice(id, noticeDTO, user_id, role);
  }

  @Delete('notice/:id')
  @ApiOperation({
    summary: '공지사항 삭제',
    description: '지정된 ID의 공지사항을 삭제하는 엔드포인트.',
  })
  async deleteNotice(@Param('id') id: string, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.deleteNotice(id, user_id, role);
  }

  @Get('usercomment/:postid')
  @ApiOperation({
    summary: '사용자 댓글 조회',
    description:
      '지정된 게시물에 대한 사용자 댓글을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getUserComment(
    @Param('postid') postId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeService.getUserhNotices(
      postId,
      pageNumber,
      limitNumber,
    );
  }

  @Post('comments/:postid')
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

  @Put('comments/:postId')
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

  @Delete('comments/:postId')
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

  @Get('homeusernotice')
  @ApiOperation({
    summary: '홈 사용자 공지사항 조회',
    description:
      '홈 화면에서 사용자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeUserNotice() {
    return await this.noticeService.homeUserNotices();
  }

  @Get('homeauthnotice')
  @ApiOperation({
    summary: '홈 관리자 공지사항 조회',
    description:
      '홈 화면에서 관리자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeAuthNotice() {
    return await this.noticeService.homeAuthNotices();
  }
}
