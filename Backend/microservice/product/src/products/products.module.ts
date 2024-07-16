import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ClientsModule } from '@nestjs/microservices';
import { grpcMediaClientOptions, grpcUserClientOptions } from 'src/grpc/grpc-client.options';

@Module({
  imports:[  TypeOrmModule.forFeature([ProductEntity]),
  ClientsModule.register([
 {
   name: 'USER_PACKAGE',
   ...grpcUserClientOptions
 }, 
 {
  name: 'MEDIA_PACKAGE',
  ...grpcMediaClientOptions
}, 

]),
 ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}