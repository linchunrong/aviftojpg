#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, render_template
import os

app = Flask(__name__)
app.config.from_pyfile('config.py')

upload_path = app.config['UPLOAD_FOLDER']
upload_length = app.config['MAX_CONTENT_LENGTH']
debug = app.config['DEBUG']

# 确保上传目录存在
os.makedirs(upload_path, exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # 检查是否有文件上传
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        # 如果用户没有选择文件
        if file.filename == '':
            return 'No selected file'
        if file:
            # 保存文件到指定的上传目录
            file.save(os.path.join(upload_path, file.filename))
            return 'File successfully uploaded'

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=debug)