from flask import Blueprint, render_template, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests

CLIENT_ID = "917690247596-s40psck6dalkvo5h7p4rnu9tvhiudc39.apps.googleusercontent.com"
auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/signup')
def signup():
    return render_template('signup.html')

#@auth_routes.route('/login')
#def login():
#    return render_template('signin.html')

@auth_routes.route('/auth/google-login', methods=['POST'])
def google_login():
    token = request.json['id_token']
    
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        userid = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']
        picture = idinfo.get('picture')
        
        # 这里应该检查用户是否已存在，如果不存在则创建新用户
        # 然后创建用户会话
        
        return jsonify({
            "success": True,
            "user": {
                "name": name,
                "email": email,
                "picture": picture
            }
        })
    except ValueError:
        return jsonify({"success": False, "message": "Invalid token"}), 401

@auth_routes.route('/auth/google-signup', methods=['POST'])
def google_signup():
    return google_login()