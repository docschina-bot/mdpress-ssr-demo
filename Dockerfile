# 使用官方 Node.js 12 镜像.
# https://hub.docker.com/_/node
FROM node:12
# 定义工作目录
WORKDIR /usr/src/app
# 将依赖定义文件拷贝到工作目录下
COPY package*.json ./
# 以 production 形式安装依赖
RUN yarn install
# 将本地代码复制到工作目录内
COPY . ./
# 启动服务
CMD [ "yarn", "run","serve" ]
