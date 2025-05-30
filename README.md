# Task Schedule Application

Ứng dụng quản lý công việc với giao diện trực quan, được xây dựng bằng React và Node.js, sử dụng Docker để triển khai.

## Cấu trúc dự án

```
task-schedule/
├── frontend/         # React frontend application
├── backend/          # Node.js backend API
├── nginx/           # Nginx reverse proxy configuration
└── docker-compose.yml
```

## Yêu cầu hệ thống

- Docker và Docker Compose
- Node.js 18+ (cho development)
- Git

## Cách chạy ứng dụng

### Production Mode

1. Clone repository:
```bash
git clone <repository-url>
cd task-schedule
```

2. Chạy ứng dụng với Docker Compose:
```bash
docker-compose up --build -d 
```

3. Truy cập ứng dụng tại: `http://localhost:45000`

### Development Mode

1. Cài đặt dependencies cho frontend:
```bash
cd frontend
npm install
```

2. Cài đặt dependencies cho backend:
```bash
cd backend
npm install
```

3. Chạy development servers:
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
node index.js
```

4. Truy cập frontend tại: `http://localhost:5173`
5. Backend API có thể truy cập tại: `http://localhost:3000`

## Cấu trúc Docker

- **Frontend**: React application với Vite
  - Development: Port 5173
  - Production: Được serve qua Nginx

- **Backend**: Node.js/Express API
  - Port: 3000
  - Endpoints: `/api/*`

- **Database**: PostgreSQL
  - Port: 5432
  - Credentials được cấu hình trong docker-compose.yml

- **Nginx**: Reverse proxy
  - Port: 45000 (exposed)
  - Cấu hình trong `nginx/nginx.conf`

## Environment Variables

### Backend : Create a new env file
```env
DB_HOST=db
DB_PORT=....
DB_USER=....
DB_PASSWORD=....
DB_NAME=.....
NODE_ENV=production
```

### Database
```env
POSTGRES_USER=....
POSTGRES_PASSWORD=....
POSTGRES_DB=....
```

## Health Checks

Tất cả các services đều được cấu hình health checks:
- Frontend: Kiểm tra HTTP endpoint
- Backend: Kiểm tra `/api/health` endpoint
- Database: Kiểm tra kết nối PostgreSQL
- Nginx: Kiểm tra port 80

## Logging

- Tất cả các containers đều được cấu hình logging với giới hạn kích thước:
  - Max size: 10MB
  - Max files: 3

## Troubleshooting

1. **Frontend không kết nối được với Backend**
   - Kiểm tra Nginx logs: `docker-compose logs nginx`
   - Đảm bảo backend health check đang pass

2. **Database Connection Issues**
   - Kiểm tra database logs: `docker-compose logs db`
   - Đảm bảo credentials khớp với cấu hình

3. **Container Health Check Failed**
   - Kiểm tra logs của container cụ thể: `docker-compose logs [service-name]`
   - Restart container: `docker-compose restart [service-name]`

## Maintenance

### Backup Database
```bash
docker-compose exec db pg_dump -U postgres task_schedule > backup.sql
```

### Restore Database
```bash
docker-compose exec -T db psql -U postgres task_schedule < backup.sql
```

### Xem logs
```bash
# Xem logs của tất cả services
docker-compose logs

# Xem logs của service cụ thể
docker-compose logs [service-name]

# Follow logs
docker-compose logs -f [service-name]
```

## Security Notes

- Tất cả các services (ngoại trừ Nginx) chỉ expose ports trong Docker network
- Database credentials nên được thay đổi trong production
- CORS được cấu hình cho development, cần điều chỉnh cho production
- Nginx được cấu hình với các security headers cơ bản 
