# 使用轻量级的 Node.js 镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制项目文件到容器
COPY . .

# 设置环境变量（Fly.io 通常会自动注入环境变量）
ENV PORT=3001

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["npm", "start"]