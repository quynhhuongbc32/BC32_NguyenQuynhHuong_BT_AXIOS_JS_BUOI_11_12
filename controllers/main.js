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

function resetSpanError() {
    dom('#spanTaiKhoan').innerHTML = '';
    dom('#spanMatKhau').innerHTML = '';
    dom('#spanHoTen').innerHTML = '';
    dom('#spanEmail').innerHTML = '';
    dom('#spanHinhAnh').innerHTML = '';
    dom('#spanloaiNgonNgu').innerHTML = '';
    dom('#spanloaiNguoiDung').innerHTML = '';
    dom('#spanMoTa').innerHTML = '';
}

// ======================= Validation =======================

function validateUserName(type) {
    if(type === 'add') {
        let username = dom("#TaiKhoan").value;
        let spanEl = dom("#spanTaiKhoan");

        if (username == '' || username == null) {
            spanEl.innerHTML = "Tài khoản không được để trống";
            return false;
        }

        apiGetUsers()
            .then((response) => {
                let usernames = response.data.map((user) => {
                    return user.username
                });

                if(usernames.includes(username)){
                    spanEl.innerHTML = `${username} đã tồn tại trong hệ thống`;
                    return false;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        spanEl.innerHTML = "";
        return true;
    }
    return true;
}

function validatePassword() {
    let password = dom("#MatKhau").value;
    let spanEl = dom("#spanMatKhau");

    if (password == '' || password == null) {
        spanEl.innerHTML = "Mật khẩu không được để trống";
        return false;
    }

    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,8}$/;
    if (!regex.test(password)) {
        spanEl.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và độ dài 6-8 ký tự";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateFullname() {
    let fullname = dom("#HoTen").value;
    let spanEl = dom("#spanHoTen");

    if (fullname == '' || fullname == null) {
        spanEl.innerHTML = "Họ tên không được để trống";
        return false;
    }

    let regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/;
    
    ;
    if (!regex.test(fullname)) { 
        spanEl.innerHTML = "Họ tên không được chứa số hoặc ký tự đặc biệt";
        return false;
    } 

    spanEl.innerHTML = "";
    return true;
}

function validateEmail() {
    let email = dom("#Email").value;
    let spanEl = dom("#spanEmail");
    if (email == '' || email == null) {
        spanEl.innerHTML = "Email không được để trống";
        return false;
    }
    // Kiểm tra định dạng của email
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email)) {
        spanEl.innerHTML = "Email không đúng định dạng";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateImage() {
    let image = dom("#HinhAnh").value;
    let spanEl = dom("#spanHinhAnh");

    if (image == '' || image == null) {
        spanEl.innerHTML = "Hình ảnh không được để trống";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateLanguage() {
    let language = dom("#loaiNgonNgu").value;
    let spanEl = dom("#spanloaiNgonNgu");

    if (language == '' || language == null) {
        spanEl.innerHTML = "Phải chọn ngôn ngữ";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateType() {
    let type = dom("#loaiNguoiDung").value;
    let spanEl = dom("#spanloaiNguoiDung");
    if (type == '' || type == null) {
        spanEl.innerHTML = "Phải chọn loại người dùng";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateDescription() {
    let description = dom("#MoTa").value;
    let spanEl = dom("#spanMoTa");

    if (description == '' || description == null) {
        spanEl.innerHTML = "Mô tả không được để trống";
        return false;
    }

    if (description.length > 60) {
        spanEl.innerHTML = "Không được vượt quá 60 ký tự";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateForm(type) {
    let isValid = true;

    isValid = validateUserName(type) & validatePassword() & validateFullname() & validateEmail() & validateImage() & validateLanguage() & validateType() & validateDescription();

    if (!isValid) {
        return false;
    }
    return true;
}

// ====================== DOM ============================
dom('#btnThemNguoiDung').addEventListener("click", () => {
    dom("#TaiKhoan").disabled = false;
    dom('.modal-title').innerHTML = "Thêm người dùng";
    dom('.modal-footer').innerHTML = `
        <button class ="btn btn-secondary" data-dismiss="modal">Hủy</button>
        <button class ="btn btn-primary" data-type="add">Thêm</button>
    `;
    resetForm();
    resetSpanError();
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
        if(validateForm(elementType) == false) {
            return false;
        }else {
            addUser(user);
            $('#myModal').modal('hide');
        }
    }else if(elementType === 'update') {
        if(validateForm(elementType) == false) {
            return false;
        }else {
            updateUser(id, user);
            $('#myModal').modal('hide');
        }
    }
})

dom('#tblDanhSachNguoiDung').addEventListener('click', (evt) => {
    let id = evt.target.getAttribute('data-id');
    let elType = evt.target.getAttribute('data-type');

    if(elType === 'delete') {
        deleteUser(id);

    }else if(elType === 'edit') {
        dom("#TaiKhoan").disabled = true;
        resetSpanError();
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