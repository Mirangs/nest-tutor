import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productModel.find({}).exec();
  }

  getById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async create(body: CreateProductDto): Promise<Product> {
    // TODO: add validation
    return this.productModel.create(body);
  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProduct, {
      new: true,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
}
