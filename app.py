from flask import Flask
from config import *
from routes import main_routes, auth_routes, static_routes
from utils.file_operations import create_folders

app = Flask(__name__)

create_folders()

app.register_blueprint(main_routes.main_routes)
app.register_blueprint(auth_routes.auth_routes)
app.register_blueprint(static_routes.static_routes)

if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT)