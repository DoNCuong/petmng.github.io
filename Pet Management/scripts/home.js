'use strict';

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');

const wcMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');
const btnPetApp = document.getElementById('come-pet-app');





let currentUser = getFromStorage('userActive');
function display() {

  if (currentUser) {

    loginModal.style.display = 'none';

    mainContent.style.display = 'block';

    wcMessage.textContent = `Wellcome ${currentUser.firstname}`;
  } else {

    loginModal.style.display = 'block';

    mainContent.style.display = 'none';
  }
}
display();



btnLogout.addEventListener('click', function () {
  if (confirm(`You sure want logout ?`)) {

    currentUser = null;

    saveToStorage('currentUser', currentUser);

    display();
  }
});

btnPetApp.addEventListener('click', function() {
  window.location.href = "./thucung/thucung.html"
})