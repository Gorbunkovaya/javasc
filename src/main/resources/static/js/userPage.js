showUserInfo();

function showUserInfo(user) {
    fetch('http://localhost:8080/admin/authorities')
        .then(response => response.json())
        .then(user => {
            let tBody = document.getElementById("user_info");
            tBody.innerHTML = "";

            var row = tBody.insertRow(0);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = user.id;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = user.name;
            var cell3 = row.insertCell(2);
            cell3.innerHTML = user.age;
            var cell4 = row.insertCell(3);
            cell4.innerHTML = user.email;
            var cell5 = row.insertCell();
            cell5.innerHTML = listRoles(user).textContent;
        });
}