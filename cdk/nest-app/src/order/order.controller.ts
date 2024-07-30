import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';

import { BasicAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { OrderService } from './services';

@Controller('api/order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    async findAll() {
        const order = await this.orderService.findAll();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            data: { order },
        };
    }

    @Delete('/:id')
    @UseGuards(BasicAuthGuard)
    async delete(@Req() req: AppRequest) {
        const order = await this.orderService.delete(req.params.id);

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            data: { order },
        };
    }

    @Get('/:id')
    async findById(@Req() req: AppRequest) {
        const order = await this.orderService.findById(req.params.id);

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            data: { order },
        };
    }

    @UseGuards(BasicAuthGuard)
    @Put()
    async createUserOrder(@Req() req: AppRequest, @Body() body) {
        await this.orderService.create(
            { ...body },
            getUserIdFromRequest(req),
        );
    }
}