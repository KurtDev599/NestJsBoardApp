import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entitiy';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
