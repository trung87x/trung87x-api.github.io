# Dùng Node chính thức từ DockerHub
FROM node:18

# Tạo thư mục bên trong container
WORKDIR /app

# Copy code vào container
COPY package*.json ./
RUN npm install

COPY . .

# Expose port để chạy
EXPOSE 3000

# Lệnh chạy khi container start
CMD ["node", "app.js"]
