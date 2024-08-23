from flask import Blueprint, send_from_directory, request
from flask import current_app as app

static_routes = Blueprint('static', __name__)

@static_routes.route('/robots.txt')
@static_routes.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])