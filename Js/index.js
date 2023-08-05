// Local Storage
function set_get() {
  saveDate();
}

function saveDate() {
  localStorage.setItem("UserName", document.getElementById("Name").value);
  localStorage.setItem(
    "PassowrdKey",
    document.getElementById("Passowrd").value
  );
}

// Check Box
function RemberMe() {
  if (localStorage.UserName) {
    document.getElementById("Name").value = localStorage.getItem("UserName");
  }
  if (localStorage.PassowrdKey) {
    document.getElementById("Passowrd").value =
      localStorage.getItem("PassowrdKey");
  }
}
function deleteDate() {
  document.getElementById("Name").value = "";
  document.getElementById("Passowrd").value = "";
}

function checkClickFunc() {
  var checkbox = document.getElementById("agree");
  if (checkbox.checked == true) {
    RemberMe();
  } else if (checkbox.checked == false) {
    deleteDate();
  }
}

// Json Object
var Student_data = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    Address: "Beni Suef",
    Skills: ["Html", "Css", "Java Script", "C#"],
    IsLeader: true,
  },
  {
    id: 2,
    name: "Nader",
    age: 24,
    Address: "Cairo",
    Skills: ["Html", "Css"],
    IsLeader: true,
  },
  {
    id: 3,
    name: "Mohamed",
    age: 22,
    Address: null,
    Skills: ["Css", "Java Script", "C#"],
    IsLeader: true,
  },
];
console.log(Student_data);
for (let i = 0; i < Student_data.length; i++) {
  let student = Student_data[i];
  let name = student.name;
  let skills = student.Skills.join(", ");
  console.log(`${name} has skills in ${skills}.`);
}

// Get DATA From API FAKE
var userDataDiv = document.getElementById("demo");
var XHR = new XMLHttpRequest();
XHR.open("GET", "https://reqres.in/api/users/1 ", true); //

XHR.onreadystatechange = function () {
  if (XHR.readyState === 4 && XHR.status === 200) {
    let JsonDate = JSON.parse(XHR.responseText);
    let user = JsonDate.data;
    let FirstName = user.first_name;
    let lastName = user.last_name;
    let avaterUrl = user.avatar;
    let img = document.createElement("img");
    img.src = avaterUrl;
    userDataDiv.innerHTML = `<p>First Name: ${FirstName}</p>
    <p>Last Name:${lastName}</p>`;
    userDataDiv.appendChild(img);
  }
};

XHR.send();

// Get DATA From API FAKE

function getProduct() {
  var xhr = new XMLHttpRequest();

  var prdID = Number(document.getElementById("pID").value);
  xhr.open("get", "https://reqres.in/api/users/1" + prdID, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let products = xhr.responseText;
      let prdObject = JSON.parse(products);
      console.log(prdObject);
      showProduct(prdObject);
    }
  };
  xhr.send();
}

function showProduct(prd) {
  document.getElementById(
    "prod"
  ).innerHTML = `User Name : ${prd.data.first_name}`;
  document.getElementById("id").innerHTML = `Given Id ${prd.data.id}`;
}

/// Dropbdown List

let userList = document.getElementById("userList");
let selectedUserDataDiv = document.getElementById("selectedUserData");

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://reqres.in/api/users");
xhr.onload = () => {
  if (xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);
    let users = response.data;

    users.forEach((user) => {
      let option = document.createElement("option");
      option.value = user.id;
      option.textContent = `${user.first_name} ${user.last_name}`;
      userList.appendChild(option);
    });
  } else {
    console.log("Error: " + xhr.status);
  }
};
xhr.send();

userList.addEventListener("change", () => {
  let selectedUserId = userList.value;
  let url = `https://reqres.in/api/users/${selectedUserId}`;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      let user = response.data;
      let firstName = user.first_name;
      let lastName = user.last_name;
      let avatarUrl = user.avatar;

      let img = document.createElement("img");
      img.src = avatarUrl;

      selectedUserDataDiv.innerHTML = `<p>First name: ${firstName}</p>
                                       <p>Last name: ${lastName}</p>`;
      selectedUserDataDiv.appendChild(img);
    } else {
      console.log("Error: " + xhr.status);
    }
  };
  xhr.send();
});
