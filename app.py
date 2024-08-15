#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, send_file, redirect, url_for
import os
from werkzeug.utils import secure_filename
from PIL import Image
import av
from config import *

app = Flask(__name__)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CONVERTED_FOLDER, exist_ok=True)

def convert_avif_to_jpg(input_path, output_path):
    #img = Image.open(input_path)
    #img.save(output_path, format='JPEG')
    container = av.open(input_path)
    for frame in container.decode(video=0):
        img = Image.fromarray(frame.to_rgb().to_ndarray())
        img.save(output_path, 'JPEG')
        print(f"Converted '{input_path}' to '{output_path}'")
    container.close()
    try:
        os.remove(input_path)
        print(f"File '{input_path}' deleted successfully.")
    except FileNotFoundError:
        print(f"File '{input_path}' not found.")


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', error='No file part')
        file = request.files['file']
        if file.filename == '':
            return render_template('index.html', error='No selected file')
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return redirect(url_for('convert_file', filename=filename))
    return render_template('index.html')

@app.route('/convert/<filename>')
def convert_file(filename):
    return render_template('convert.html', filename=filename)

@app.route('/converting/<filename>')
def converting(filename):
    # 这里添加文件转换的逻辑
    # 示例: 简单地复制文件并添加 "converted_" 前缀
    source = os.path.join(UPLOAD_FOLDER, filename)
    dest = os.path.join(CONVERTED_FOLDER, f"converted_{filename}")
    convert_avif_to_jpg(source, dest)
    
    return redirect(url_for('download_file', filename=f"converted_{filename}"))

@app.route('/download/<filename>')
def download_file(filename):
    return render_template('download.html', filename=filename)

@app.route('/get-file/<filename>')
def get_file(filename):
    return send_file(os.path.join(CONVERTED_FOLDER, filename), as_attachment=True)


if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT)