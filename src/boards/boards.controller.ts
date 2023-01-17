import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { SuccessInterceptor } from '../common/success.interceptor';

@Controller('boards')
@UseInterceptors(SuccessInterceptor) // Interceptor DI
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  private logger = new Logger('BoardsController');

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoard();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.userName} creating a new board
    Payload: ${JSON.stringify(createBoardDto)}
    `);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/myBoard')
  getMyBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.userName}`);
    return this.boardsService.getMyBoard(user);
  }

  @Delete('/myBoard/:id')
  deleteMyBoard(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.boardsService.deleteMyBoard(user, id);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Put('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
