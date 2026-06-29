# --- Giai đoạn 1: Build mã nguồn ReactJS ---
FROM node:18-alpine AS build_stage

WORKDIR /app

# Copy các file quản lý thư viện trước để tận dụng Docker cache
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn và build ra thư mục tĩnh (dist hoặc build)
COPY . .
RUN npm run build

# --- Giai đoạn 2: Dùng Nginx gọn nhẹ để phục vụ file tĩnh ---
FROM nginx:1.25-alpine

# Copy các file đã build từ giai đoạn 1 vào thư mục mặc định của Nginx
# Lưu ý: Nếu dự án của bạn dùng Vite thì sửa 'build' thành 'dist'
COPY --from=build_stage /app/build /usr/share/nginx/html

# Mở cổng 80 trong container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]