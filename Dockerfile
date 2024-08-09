# 使用 Python 官方镜像作为基础镜像
FROM python:3.10

# 设置工作目录
WORKDIR /app

# 复制当前目录下的所有文件到容器的 /app 目录下
COPY . /app

# 安装应用依赖
RUN pip install -r requirements.txt

EXPOSE 5000

# 运行应用
CMD [ "python", "app.py" ]