'use strict'

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");


btnSubmit.addEventListener("click", function(){
    const user = new User(
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value
    );
    const isValidate = validate(user);
    if(isValidate){
        userArr.push(user);
        saveToStorage("userArr", userArr);
        alert ("Đăng ký thành công !");
        window.location.assign("../pages/login.html");
    }
});


function validate(user){
let isValidate = true;
    if (user.firstname.trim().length === 0){
        alert("Vui lòng nhập họ !");
        isValidate = false;
    }
    if (user.username.trim().length === 0){
        alert("vui lòng nhập tên !");
        isValidate = false;
    }
    if (user.username.trim().length === 0){
        alert("Vui lòng nhập tên đăng nhập !");
        isValidate = false;
    }
    if (user.password === ""){
        alert("Vui lòng nhập mật khẩu !");
        isValidate = false;
    }
    if (inputPasswordConfirm.value === ""){
        alert("Vui lòng nhập lại xác nhận mật khẩu !");
        isValidate = false;
    }
    if (

        !userArr.every((item) => (item.username !== user.username ? true : false))
    ){
        alert("tài khoản đã tồn tại !");
        isValidate = false;
    }
    if (user.password.length <= 8){
        alert("mật khẩu phải có hiều hơn 8 ký tự !");
        isValidate = false;
    }
    return isValidate;
}