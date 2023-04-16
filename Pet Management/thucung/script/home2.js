'use strict';

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');

const wcMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');



// hàm hiển thị nội dung trang home

let currentUser = getFromStorage('userActive');
function display() {
  // nếu có người đăng nhập
  if (currentUser) {
    // ẩn loginmodal
    loginModal.style.display = 'none';
    //hiển thị maincontent
    mainContent.style.display = 'block';

    wcMessage.textContent = `Wellcome ${currentUser.firstname}`;
  } else {
    //nêu không có người đăng nhậP

    // hiển thị loginmodal
    loginModal.style.display = 'block';
    //ẩn maincontent
    mainContent.style.display = 'none';
  }
}
display();
// window.location.assign("../thucung/thucung.html");
//sự kiện nút logout

btnLogout.addEventListener('click', function () {
  if (confirm(`You sure want logout ?`)) {
    window.location.assign("../index.html");
    // xoá currentUser
    currentUser = null;
    // cập nhật lại currentUser
    saveToStorage('currentUser', currentUser);
    // hiển thị lại trang home
    display();
  }
});
