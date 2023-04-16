"use strict";

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};


// lấy dữ liệu userAr từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// chuyển đổi về dạng class instance
const userArr = users.map((user) => parseUser(user));

// lấy dữ liệu user đang đăng nhập
let userActive = getFromStorage("userActive") ? parseUser(getFromStorage("userActive")) : null;

// lấy dữ liệu từ todoArr từ localStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// chuyển đổi về dạng class instance
const todoArr = todos.map((todo) => parseTask(todo));

// hàm : chuyển từ JS  Object sang Class instance
function parseUser(userData){
    const user = new User(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
        userData.pageSize,
        userData.category
    );

    return user;
}

// hàm chuyển đổi từ JS Object sang class instance của task class
function parseTask(tasskData){
    const task = new Task(taskData, taskData.owner, taskData.isDone);
    return task;
}