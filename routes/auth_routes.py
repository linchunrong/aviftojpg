from flask import Blueprint, render_template

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/signup')
def signup():
    return render_template('signup.html')

#@auth_routes.route('/login')
#def login():
#    return render_template('signin.html')