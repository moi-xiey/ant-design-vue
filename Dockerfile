# Dockerfile 模板
# https://juejin.im/post/5c83cbaa6fb9a04a0f65fdaa


FROM node:alpine as builder

ENV PROJECT_ENV production

# http-server 不变动也可以利用缓存
WORKDIR /code

ADD package.json /code
RUN npm install --production

ADD . /code
# npm run uploadCdn 是把静态资源上传至 cdn 上的脚本文件
RUN npm run build && npm run uploadCdn


# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/public/index.html code/public/favicon.ico /usr/share/nginx/html/
COPY --from=builder code/public/static /usr/share/nginx/html/static
