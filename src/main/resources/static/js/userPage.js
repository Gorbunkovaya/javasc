userPage();

function userPage(user) {
    fetch('http://localhost:8080/user/authorities')
        .then(response => response.json())
        .then(user => {
            let tBody = document.getElementById("user_info");
            tBody.innerHTML = "";

            let row = tBody.insertRow(0);
            let cell0 = row.insertCell(0);
            cell0.innerHTML = user.id;
            let cell1 = row.insertCell(1);
            cell1.innerHTML = user.login;
            let cell3 = row.insertCell(2);
            cell3.innerHTML = user.age;
            let cell4 = row.insertCell(3);
            cell4.innerHTML = user.email;
            let cell5 = row.insertCell();
            cell5.innerHTML = listRoles(user).textContent;
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