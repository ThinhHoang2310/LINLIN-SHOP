// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//     var confirmEmail = document.getElementById('confirmEmail').value;
    
//     if (email !== confirmEmail) {
//         alert('Emails do not match!');
//         return;
//     }
    
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
