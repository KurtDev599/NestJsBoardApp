import { Board } from './board.entitiy';
import { CustomRepository } from './custom/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
