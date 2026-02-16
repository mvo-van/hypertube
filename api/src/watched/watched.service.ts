import { Injectable } from '@nestjs/common';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';

@Injectable()
export class WatchedService {
  create(createWatchedDto: CreateWatchedDto) {
    return 'This action adds a new watched';
  }

  findAll() {
    return `This action returns all watched`;
  }

  findOne(id: number) {
    return `This action returns a #${id} watched`;
  }

  update(id: number, updateWatchedDto: UpdateWatchedDto) {
    return `This action updates a #${id} watched`;
  }

  remove(id: number) {
    return `This action removes a #${id} watched`;
  }
}
