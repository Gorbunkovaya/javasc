getUsersList();

function getUsersList() {
    let tBody = document.getElementById("tableUsers");
    tBody.innerHTML = "";
    fetch('http://localhost:8080/admin/all')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                let row = tBody.insertRow();
                row.setAttribute("id", user.id);
                let cell0 = row.insertCell();
                cell0.innerHTML = user.id;
                let cell1 = row.insertCell();
                cell1.innerHTML = user.login;
                let cell2 = row.insertCell();
                cell2.innerHTML = user.age;
                let cell3 = row.insertCell();
                cell3.innerHTML = user.email;
                let cell4 = row.insertCell();
                cell4.innerHTML =  listRoles(user).textContent;
                let cell5 = row.insertCell();
                cell5.innerHTML =
                    '<button type="button" onclick="getModalEdit(' + user.id + ')" class="btn btn-primary btn-sm">Edit</button>';

                let cell6 = row.insertCell();
                cell6.innerHTML =
                    '<button type="button" onclick="getModalDelete(' + user.id + ')" class="btn btn-danger btn-sm">Delete</button>';
            })
        });
}

function listRoles(user) {
    let rolesList = document.createElement('ul');
    for (let i = 0; i < user.roles.length; i++) {
        let role = document.createElement('li');
        role.textContent = user.roles[i].role.substring(5) + " ";
        rolesList.appendChild(role);
    }
    return rolesList;
}

function getModalEdit(id) {

    fetch('http://localhost:8080/admin/getUser/' + id)
        .then(response => response.json())
        .then(user => {

            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].role === "ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].role === "USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                '<div id="modalEdit"' +
                '     class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true"' +
                '     data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Edit user</h5>' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '                    <span aria-hidden="true">&times;</span>' +
                '                </button>' +
                '            </div>' +
                '            <div class="modal-body bg-white">' +
                '                <form id="formEditUser" style="width: 200px;"' +
                '                       class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <label>Id</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editId" name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Login</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editLogin" value="' + user.login + '"' +
                '                               placeholder="Login" required>' +
                '                    </p>'+
                '                    <p>' +
                '                        <label>Age</label>' +
                '                        <input class="form-control form-control-sm" type="number"' +
                '                               id="editAge" value="' + user.age + '" ' +
                '                               placeholder="Age" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Email</label>' +
                '                        <input class="form-control form-control-sm" type="email"' +
                '                               id="editEmail" value="' + user.email + '"' +
                '                               placeholder="Email" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Password</label>' +
                '                        <input class="form-control form-control-sm" type="password"' +
                '                               id="editPassword" value="' + user.password + '" placeholder="Password">' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Role</label>' +
                '                        <select id="editRoles" name="roles" multiple size="2" required ' +
                '                               class="form-control form-control-sm">' +
                '                            <option value="ADMIN"' + adminSelect + '>ADMIN</option>' +
                '                            <option value="USER"' + userSelect + '>USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary"' +
                '                        data-dismiss="modal">Close</button>' +
                '                <button class="btn btn-primary"' +
                '                        onclick="editUser()">Edit</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            $("#modalEdit").modal();

        });
}

function editUser() {

    let form = window.formEditUser.editRoles;

    let userRole = "";
    let rolesList = document.createElement('ul');
    for (let i = 0; i < form.length; i++) {
        let option = form.options[i];
        let role = document.createElement('li');
        if (option.selected) {
            userRole = userRole.concat(option.value + "_");
            role.textContent = option.value + " ";
            rolesList.appendChild(role);
        }
    }

    console.log(userRole);

    let id = window.formEditUser.editId.value;

    fetch('http://localhost:8080/admin/update/'+ userRole, {
        method: 'PUT',
        body: JSON.stringify({
            id: window.formEditUser.editId.value,
            login: window.formEditUser.editLogin.value,
            age: window.formEditUser.editAge.value,
            email: window.formEditUser.editEmail.value,
            password: window.formEditUser.editPassword.value,
            role: userRole
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then((response) => {
            $('#' + id).replaceWith('<tr id=' + id + '>' +
                '<td>' + id + '</td>' +
                '<td>' + window.formEditUser.editLogin.value + '</td>' +
                '<td>' + window.formEditUser.editAge.value + '</td>' +
                '<td>' + window.formEditUser.editEmail.value + '</td>' +
                '<td>' + rolesList.textContent + '</td>' +
                '<td> <button type="button" onclick="getModalEdit(' + id + ')" class="btn btn-primary btn-sm">Edit</button> </td>' +
                '<td> <button type="button" onclick="getModalDelete(' + id + ')" class="btn btn-danger btn-sm">Delete</button> </td>' +
                '</tr>');
        });
}


function getModalDelete(id) {

    fetch('http://localhost:8080/admin/getUser/' + id)
        .then(response => response.json())
        .then(user => {

            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].role === "ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].role === "USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                '<div id="modalDelete" ' +
                '     class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true" ' +
                '     data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Delete user</h5>' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '                    <span aria-hidden="true">&times;</span>' +
                '                </button>' +
                '            </div>' +
                '            <div class="modal-body bg-white">' +
                '                <form id="formEditUser" style="width: 200px;" ' +
                '                       class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <label>Id</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Login</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               value="' + user.login + '" readonly>' +
                '                    </p>'  +
                '                    <p>' +
                '                        <label>Age</label>' +
                '                        <input class="form-control form-control-sm" type="number"' +
                '                               value="' + user.age + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Email</label>' +
                '                        <input class="form-control form-control-sm" type="email"' +
                '                               value="' + user.email + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Role</label>' +
                '                        <select class="form-control form-control-sm" multiple size="2" readonly>' +
                '                            <option value="ADMIN"' + adminSelect + ' >ADMIN</option>' +
                '                            <option value="USER"' + userSelect + '>USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary"' +
                '                        data-dismiss="modal">Close</button>' +
                '                <button class="btn btn-danger"' +
                '                        onclick="deleteUser(' + user.id + ')">Delete</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            $("#modalDelete").modal();

        });
}

function deleteUser(id) {
    fetch('http://localhost:8080/admin/delete/' + id, {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            $('#' + id).remove();
        });
}

function createUser() {
    let form = window.formNewUser.newRoles;
    let userRole = "";
    let rolesList = document.createElement('ul');
    for (let i = 0; i < form.length; i++) {
        let option = form.options[i];
        let role = document.createElement('li');
        if (option.selected) {
            userRole = userRole.concat(option.value + "_");
            role.textContent = option.value + " ";
            rolesList.appendChild(role);
        }
    }

    fetch('http://localhost:8080/admin/create/' + userRole, {
        method: 'POST',
        body: JSON.stringify({
            login: window.formNewUser.newLogin.value,
            age: window.formNewUser.newAge.value,
            email: window.formNewUser.newEmail.value,
            password: window.formNewUser.newPassword.value,
            role: userRole
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })

        .then(response => response.json())
        .then(user => {
            $('#tableUsers tr:last').after('<tr id=' + user.id + '>' +
                '<td>' + user.id + '</td>' +
                '<td>' + window.formNewUser.newLogin.value + '</td>' +
                '<td>' + window.formNewUser.newAge.value + '</td>' +
                '<td>' + window.formNewUser.newEmail.value + '</td>' +
                '<td>' + rolesList.textContent + '</td>' +
                '<td> <button type="button" onclick="getModalEdit(' + user.id + ')" class="btn btn-primary btn-sm">Edit</button> </td>' +
                '<td> <button type="button" onclick="getModalDelete(' + user.id + ')" class="btn btn-danger btn-sm">Delete</button> </td>' +
                '</tr>');

            window.formNewUser.newLogin.value = "";
            window.formNewUser.newAge.value = "";
            window.formNewUser.newEmail.value = "";
            window.formNewUser.newPassword.value = "";
            window.formNewUser.newRoles.value = "";

        });
}



