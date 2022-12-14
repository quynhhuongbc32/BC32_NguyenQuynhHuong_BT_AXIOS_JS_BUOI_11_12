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
                        S???a</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" 
                            data-id="${user.id}"
                            data-type="delete"
                        >
                        X??a</button>
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
            spanEl.innerHTML = "T??i kho???n kh??ng ???????c ????? tr???ng";
            return false;
        }

        apiGetUsers()
            .then((response) => {
                let usernames = response.data.map((user) => {
                    return user.username
                });

                if(usernames.includes(username)){
                    spanEl.innerHTML = `${username} ???? t???n t???i trong h??? th???ng`;
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
        spanEl.innerHTML = "M???t kh???u kh??ng ???????c ????? tr???ng";
        return false;
    }

    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,8}$/;
    if (!regex.test(password)) {
        spanEl.innerHTML = "M???t kh???u ph???i c?? ??t nh???t 1 k?? t??? hoa, 1 k?? t??? ?????c bi???t, 1 k?? t??? s??? v?? ????? d??i 6-8 k?? t???";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateFullname() {
    let fullname = dom("#HoTen").value;
    let spanEl = dom("#spanHoTen");

    if (fullname == '' || fullname == null) {
        spanEl.innerHTML = "H??? t??n kh??ng ???????c ????? tr???ng";
        return false;
    }

    let regex = /^[a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s|_]+$/;
    
    ;
    if (!regex.test(fullname)) { 
        spanEl.innerHTML = "H??? t??n kh??ng ???????c ch???a s??? ho???c k?? t??? ?????c bi???t";
        return false;
    } 

    spanEl.innerHTML = "";
    return true;
}

function validateEmail() {
    let email = dom("#Email").value;
    let spanEl = dom("#spanEmail");
    if (email == '' || email == null) {
        spanEl.innerHTML = "Email kh??ng ???????c ????? tr???ng";
        return false;
    }
    // Ki???m tra ?????nh d???ng c???a email
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email)) {
        spanEl.innerHTML = "Email kh??ng ????ng ?????nh d???ng";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateImage() {
    let image = dom("#HinhAnh").value;
    let spanEl = dom("#spanHinhAnh");

    if (image == '' || image == null) {
        spanEl.innerHTML = "H??nh ???nh kh??ng ???????c ????? tr???ng";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateLanguage() {
    let language = dom("#loaiNgonNgu").value;
    let spanEl = dom("#spanloaiNgonNgu");

    if (language == '' || language == null) {
        spanEl.innerHTML = "Ph???i ch???n ng??n ng???";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateType() {
    let type = dom("#loaiNguoiDung").value;
    let spanEl = dom("#spanloaiNguoiDung");
    if (type == '' || type == null) {
        spanEl.innerHTML = "Ph???i ch???n lo???i ng?????i d??ng";
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

function validateDescription() {
    let description = dom("#MoTa").value;
    let spanEl = dom("#spanMoTa");

    if (description == '' || description == null) {
        spanEl.innerHTML = "M?? t??? kh??ng ???????c ????? tr???ng";
        return false;
    }

    if (description.length > 60) {
        spanEl.innerHTML = "Kh??ng ???????c v?????t qu?? 60 k?? t???";
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
    dom('.modal-title').innerHTML = "Th??m ng?????i d??ng";
    dom('.modal-footer').innerHTML = `
        <button class ="btn btn-secondary" data-dismiss="modal">H???y</button>
        <button class ="btn btn-primary" data-type="add">Th??m</button>
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
        dom('.modal-title').innerHTML = "C???p nh???t ng?????i d??ng";
        dom('.modal-footer').innerHTML = `
            <button class ="btn btn-secondary" data-dismiss="modal">H???y</button>
            <button class ="btn btn-primary" data-type="update">C???p nh???t</button>
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