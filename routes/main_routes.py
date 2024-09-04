from flask import Blueprint, render_template, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
import os
from config import UPLOAD_FOLDER, CONVERTED_FOLDER
from utils.file_operations import convert_avif_to_jpg

main_routes = Blueprint('main', __name__)

@main_routes.route('/', methods=['GET', 'POST'])
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
            return redirect(url_for('main.convert_file', filename=filename))
    return render_template('index.html')

@main_routes.route('/convert', methods=['GET', 'POST'])
def convert_file():
    filename = request.args.get('filename')
    return render_template('convert.html', filename=filename)

@main_routes.route('/converting/<filename>')
def converting(filename):
    source = os.path.join(UPLOAD_FOLDER, filename)
    dest = os.path.join(CONVERTED_FOLDER, f"converted_{filename}")
    dest.replace('.avif', '.jpg')
    convert_avif_to_jpg(source, dest)
    
    return redirect(url_for('main.download_file', filename=f"converted_{filename}"))

@main_routes.route('/download', methods=['GET', 'POST'])
def download_file():
    filename = request.args.get('filename')
    return render_template('download.html', filename=filename)

@main_routes.route('/get-file/<filename>')
def get_file(filename):
    return send_file(os.path.join(CONVERTED_FOLDER, filename), as_attachment=True)

@main_routes.route('/faqs')
def faqs():
    return render_template('faqs.html')

@main_routes.route('/pricing')
def pricing():
    return render_template('pricing.html')

@main_routes.route('/about')
def about():
    return render_template('about.html')

@main_routes.route('/privacy')
def privacy():
    return render_template('privacy.html')

@main_routes.route('/terms')
def terms():
    return render_template('terms.html')