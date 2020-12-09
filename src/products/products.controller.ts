import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProduct: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProduct);
  }

  @Put(':id')
  update(
    @Param('id') id,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id): Promise<Product> {
    return this.productsService.remove(id);
  }
}
