getUsers();

function getUsers() {
    apiGetUsers()
        .then((response) => {
            let users = response.data.map((user) => {
                return new User(
                    user.id
                    ,user.username
                    ,user.password
                    ,user.fullname
                    ,user.email
                    ,user.images
                    ,user.language
                    ,user.type
                    ,user.description
                );
            });
            display(users);
        })
        .catch((error) => {
            console.log(error);
        });
}

function addUser(user) {
    apiAddUser(user)
        .then( () => {
            getUsers();
        })
        .catch((error) => {
            console.log(error);
        })
}

function updateUser(userId, user) {
    apiUpdateUserById(userId, user)
        .then( () => {
            getUsers();
        })
        .catch((error) => {
            console.log(error);
        })
}

function deleteUser(userId) {
    apiDeleteUser(userId)
        .then( () => {
            getUsers();
        })
        .catch((error) => {
            console.log(error);
        })
}

// ==========================================================================================

function display(users) {
    let output = users.reduce((result, user, index) => {
        return (
            result +
            `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>${user.language}</td>
                    <td>${user.type}</td>
                    <td>
                        <button class="btn btn-success" 
                            data-toggle="modal"
                            data-target="#myModal"
                            data-id="${user.id}"
                            data-type="edit"
                        >
                        Sửa</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" 
                            data-id="${user.id}"
                            data-type="delete"
                        >
                        Xóa</button>
                    </td>
                </tr>
            `
        );
    }, "");

    dom("#tblDanhSachNguoiDung").innerHTML = output;
}

function dom(selector) {
    return document.querySelector(selector);
}

function resetForm() {
    dom('#MaND').value = '';
    dom('#TaiKhoan').value = '';
    dom('#MatKhau').value = '';
    dom('#HoTen').value = '';
    dom('#Email').value = '';
    dom('#HinhAnh').value = '';
    dom('#loaiNgonNgu').value = '';
    dom('#loaiNguoiDung').value = '';
    dom('#MoTa').value = '';
}


// ====================== DOM ============================
dom('#btnThemNguoiDung').addEventListener("click", () => {
    dom('.modal-title').innerHTML = "Thêm người dùng";
    dom('.modal-footer').innerHTML = `
        <button class ="btn btn-secondary" data-dismiss="modal">Hủy</button>
        <button class ="btn btn-primary" data-type="add">Thêm</button>
    `;
    resetForm();
})

dom('.modal-footer').addEventListener('click', (evt) => {
    let elementType = evt.target.getAttribute('data-type');

    let id = dom('#MaND').value;
    let username = dom('#TaiKhoan').value;
    let password = dom('#MatKhau').value;
    let fullname = dom('#HoTen').value;
    let email    = dom('#Email').value;
    let images   = dom('#HinhAnh').value;
    let language = dom('#loaiNgonNgu').value;
    let type     = dom('#loaiNguoiDung').value;
    let description = dom('#MoTa').value;
    
    let user = new User(
        null
        ,username
        ,password
        ,fullname
        ,email
        ,images
        ,language
        ,type
        ,description
    );

    if(elementType === 'add') {
        addUser(user);
    }else if(elementType === 'update') {
        updateUser(id, user);
    }
})

dom('#tblDanhSachNguoiDung').addEventListener('click', (evt) => {
    let id = evt.target.getAttribute('data-id');
    let elType = evt.target.getAttribute('data-type');

    if(elType === 'delete') {
        deleteUser(id);

    }else if(elType === 'edit') {
        dom('.modal-title').innerHTML = "Cập nhật người dùng";
        dom('.modal-footer').innerHTML = `
            <button class ="btn btn-secondary" data-dismiss="modal">Hủy</button>
            <button class ="btn btn-primary" data-type="update">Cập nhật</button>
        `;
    }

    apiGetUserById(id)
        .then( (response) => {
            let user = response.data;

            dom('#MaND').value     = user.id;
            dom('#TaiKhoan').value = user.username;
            dom('#MatKhau').value  = user.password;
            dom('#HoTen').value    = user.fullname;
            dom('#Email').value    = user.email;
            dom('#HinhAnh').value  = user.images;
            dom('#loaiNgonNgu').value   = user.language;
            dom('#loaiNguoiDung').value = user.type;
            dom('#MoTa').value = user.description;
        })
        .catch((error) => {
            console.log(error);
        })
    
})