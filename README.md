# Hàng Pháp Chính Hãng

Monorepo cho web bán mỹ phẩm Pháp chính hãng tại Việt Nam.

## Folder tree
```
/apps
  /api
    /scripts
    /src
      /config
      /emails
      /middleware
      /modules
        /auth
        /categories
        /orders
        /products
        /users
      /routes
      /utils
  /web
    /src
      /app
        /core
        /pages
        /shared
      /assets
      /environments
/packages
  /shared
```

## Yêu cầu
- Node.js 20+
- MongoDB 6+

## Cấu hình môi trường
Sao chép file env mẫu:
```
cp apps/api/.env.example apps/api/.env
```

## Môi trường test
Tạo file môi trường test cho API:
```
cp apps/api/.env.test apps/api/.env.test.local
```

## Cài đặt dependencies
```
npm install
```

## Chạy backend
```
cd apps/api
npm run dev
```

## Chạy frontend
```
cd apps/web
npm run dev
```

## Seed dữ liệu
```
cd apps/api
npm run seed:categories
npm run seed:demo-products
```

## Ghi chú
- API chạy mặc định tại http://localhost:5000
- Frontend chạy tại http://localhost:4200
