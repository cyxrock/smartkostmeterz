// script.js

// Konfigurasi Firebase Anda (tetap sama)
const firebaseConfig = {
    apiKey: "AIzaSyAlDGfYUsGyPiL41m1qHrQxSRXihI8xuG8",
    authDomain: "smartkos13.firebaseapp.com",
    projectId: "smartkos13",
    storageBucket: "smartkos13.firebasestorage.app",
    messagingSenderId: "240191503170",
    appId: "1:240191503170:web:bf169151c9a2ad098d66db",
    measurementId: "G-H6FY9Q7SLS"
};

// Inisialisasi Firebase (hanya jika belum diinisialisasi)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// Variabel elemen DOM
const title = document.getElementById('loginTitle');
const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

// Ambil parameter peran dari URL
const params = new URLSearchParams(window.location.search);
const role = params.get('role');

// Sesuaikan judul halaman login berdasarkan peran
if (title) {
    if (role === 'admin') {
        title.innerText = 'Admin';
        document.title = 'Login Admin';
    } else if (role === 'user') {
        title.innerText = 'Penghuni Kos';
        document.title = 'Login Penghuni Kos';
    }
}

// Data pengguna simulasi untuk login
const users = {
    'kamar1': 'kamarkos1',
    'kamar2': 'kamarkos2', // <--- PENAMBAHAN UNTUK KAMAR2
};

// Fungsi untuk mereset pesan error
function resetError() {
    if (errorMsg) errorMsg.innerText = '';
}

// Logika penanganan form login
if (form) {
    form.username.addEventListener('input', resetError);
    form.password.addEventListener('input', resetError);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const user = form.username.value.trim();
        const pass = form.password.value.trim();

        if (!user || !pass) {
            if (errorMsg) errorMsg.innerText = 'Username dan password wajib diisi.';
            return;
        }

        if (role === 'admin') {
            if (user === 'admin' && pass === 'admin123') {
                localStorage.setItem('role', 'admin');
                localStorage.setItem('username', 'admin');
                window.location.href = 'admin.html';
            } else {
                if (errorMsg) errorMsg.innerText = 'Username atau password admin salah.';
            }
        } else if (role === 'user') {
            if (users[user] && users[user] === pass) {
                localStorage.setItem('role', 'user');
                localStorage.setItem('username', user);
                window.location.href = `user.html?user=${encodeURIComponent(user)}`;
            } else {
                if (errorMsg) errorMsg.innerText = 'Username atau password user salah.';
            }
        }
    });
}