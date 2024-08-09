#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, redirect, url_for, render_template, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
import os

app = Flask(__name__)
app.config.from_pyfile('config.py')

upload_path = app.config['UPLOAD_FOLDER']
converted_path = app.config['CONVERTED_FOLDER']
upload_length = app.config['MAX_CONTENT_LENGTH']
debug = app.config['DEBUG']
host = app.config['HOST']
port = app.config['PORT']

# 确保上传目录存在
os.makedirs(upload_path, exist_ok=True)
os.makedirs(converted_path, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'avif'}

def convert_avif_to_jpg(input_path, output_path):
    img = Image.open(input_path)
    img.save(output_path, format='JPEG')

@app.route('/download_page/<filename>')
def download_page(filename):
    return render_template('download.html', filename=filename)

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(upload_path, filename, as_attachment=True)


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

def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            input_path = os.path.join(upload_path, filename)
            file.save(input_path)
            output_filename = filename.rsplit('.', 1)[0] + '.jpg'
            output_path = os.path.join(converted_path, output_filename)
            convert_avif_to_jpg(input_path, output_path)
            return redirect(url_for('download_page', filename=output_filename))
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host=host, port=port, debug=debug)