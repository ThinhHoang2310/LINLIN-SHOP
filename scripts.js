// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//     var confirmEmail = document.getElementById('confirmEmail').value;
    
//     if (email !== confirmEmail) {
//         alert('Emails do not match!');
//         return;
//     }
// });
    
//     // Example of sending data to a server using fetch API
//     fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email, password: password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('Registration successful!');
//         } else {
//             alert('Registration failed: ' + data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred during registration.');
//     });
// });


function HandleLoader() {
    window.addEventListener("load", function () {
        setTimeout(() => {
        const preloader = document.getElementById("preloader");
        preloader.style.opacity = "0";
        setTimeout(() => {
        preloader.style.display = "none";
        }, 500); // Đợi hiệu ứng mờ
    }, 4000); // Hiển thị đúng 4 giây
    });
}
HandleLoader();


function initSearchHistoryToggle() {
    const searchInput = document.querySelector(".header_search-input");
    const searchHistory = document.querySelector(".header_search-history");

    if (searchInput && searchHistory) {
        // Hiển thị lịch sử tìm kiếm khi focus vào ô input
        searchInput.addEventListener("focus", function () {
            searchHistory.style.display = "block";
        });

        // Ẩn lịch sử tìm kiếm khi click ra ngoài
        document.addEventListener("click", function (event) {
            if (!searchInput.contains(event.target) && !searchHistory.contains(event.target)) {
                searchHistory.style.display = "none";
            }
        });

        // Giữ lịch sử tìm kiếm hiển thị khi hover vào nó
        searchHistory.addEventListener("mouseenter", function () {
            searchHistory.style.display = "block";
        });

        searchHistory.addEventListener("mouseleave", function () {
            searchHistory.style.display = "none";
        });
    } else {
        console.error("Search input or search history element not found!");
    }
}

// Gọi hàm khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", initSearchHistoryToggle);


function HandleMouseOver() {
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            items.forEach(i => i.classList.remove('category-item--active'));
            item.classList.add('category-item--active');
        });
    });
}

// Gọi hàm khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", HandleMouseOver);

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const modal = document.querySelector('.modal');
    const forms = document.querySelectorAll('.auth-form');
    const registerForm = forms[0];
    const loginForm = forms[1];
    const registerBtn = document.querySelector('.header__navbar-item--strong.header__navbar-item--separate');
    const loginBtn = document.querySelector('.header__navbar-item--strong:not(.header__navbar-item--separate)');
    const backBtns = document.querySelectorAll('.auth-form__controls-back');
    const switchBtns = document.querySelectorAll('.auth-form__switch-btn');
    const userSection = document.querySelector('.header__navbar-user');
    const userNameDisplay = document.querySelector('.header__navbar-user-name');
    const logoutBtn = document.querySelector('.header__navbar-user-item--separate a');

    // Modal Control Functions
    function showModal(formToShow) {
        modal.classList.add('open');
        forms.forEach(form => form.style.display = 'none');
        formToShow.style.display = 'block';
    }

    function hideModal() {
        modal.classList.remove('open');
    }

    // Form Switch Function
    function switchForm(currentIndex) {
        forms.forEach(form => form.style.display = 'none');
        forms[currentIndex === 0 ? 1 : 0].style.display = 'block';
    }

    // Auth State Functions
    function updateUIState() {
        const user = localStorage.getItem('linlin_user');
        if (user) {
            if (registerBtn) registerBtn.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'none';
            if (userSection) {
                userSection.style.display = 'flex';
                if (userNameDisplay) userNameDisplay.textContent = user;
            }
            hideModal();
        } else {
            if (registerBtn) registerBtn.style.display = 'inline-block';
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (userSection) userSection.style.display = 'none';
        }
    }

    function handleLogout() {
        localStorage.removeItem('linlin_user');
        updateUIState();
    }

    // Form Handling Functions
    function handleRegister(email, password, confirmPassword) {
        if (!email || !password || !confirmPassword) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return false;
        }
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp!');
            return false;
        }
        localStorage.setItem('linlin_user', email);
        return true;
    }

    function handleLogin(email, password) {
        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return false;
        }
        localStorage.setItem('linlin_user', email);
        return true;
    }

    // Form Submit Functions
    const registerSubmitBtn = registerForm?.querySelector('.btn.btn--primary');
    const loginSubmitBtn = loginForm?.querySelector('.btn.btn--primary');

    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = registerForm.querySelector('#user')?.value;
            const password = registerForm.querySelector('#pass')?.value;
            const confirmPassword = registerForm.querySelector('#pass2')?.value;
            
            if (handleRegister(email, password, confirmPassword)) {
                updateUIState();
            }
        });
    }

    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = loginForm.querySelector('.auth-form__input')?.value;
            const password = loginForm.querySelector('input[type="password"]')?.value;
            
            if (handleLogin(email, password)) {
                updateUIState();
            }
        });
    }

    // Event Listeners
    if (registerBtn) {
        registerBtn.addEventListener('click', () => showModal(registerForm));
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => showModal(loginForm));
    }

    backBtns.forEach(btn => {
        btn.addEventListener('click', hideModal);
    });

    switchBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => switchForm(index));
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Initialize UI
    updateUIState();
});
