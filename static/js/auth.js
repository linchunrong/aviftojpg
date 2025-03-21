const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeBtns = document.getElementsByClassName('close');
const authButtons = document.getElementById('auth-buttons');
const userProfile = document.getElementById('user-profile');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');

loginBtn.onclick = () => loginModal.style.display = "block";
signupBtn.onclick = () => signupModal.style.display = "block";

for (let closeBtn of closeBtns) {
    closeBtn.onclick = function() {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == signupModal) {
        signupModal.style.display = "none";
    }
}

function handleGoogleResponse(googleUser, endpoint) {
    const id_token = googleUser.getAuthResponse().id_token;

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: id_token }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateUserProfile(data.user);
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        } else {
            console.error('Authentication failed:', data.message);
            alert('Authentication failed: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}

function onSignIn(googleUser) {
    handleGoogleResponse(googleUser, '/auth/google-login');
}

function onSignUp(googleUser) {
    handleGoogleResponse(googleUser, '/auth/google-signup');
}

function updateUserProfile(user) {
    userAvatar.src = user.picture;
    userName.textContent = user.name;
    authButtons.style.display = "none";
    userProfile.style.display = "flex";
}
