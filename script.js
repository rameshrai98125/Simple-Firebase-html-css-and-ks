// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getDatabase,
  set,
  get,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIEDiSstMmMSduxaip2poYs9d38OB-wLg",
  authDomain: "fir-html-70303.firebaseapp.com",
  projectId: "fir-html-70303",
  storageBucket: "fir-html-70303.appspot.com",
  messagingSenderId: "258666828981",
  appId: "1:258666828981:web:89c023b9512d4c8d4b1afc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// Function to add data
const addData = document.getElementById("addData");

addData.addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const rollNumber = document.getElementById("rollNumber").value;

  if (name === "" || email === "" || rollNumber === "") {
    alert("All fields are required");
    return; // Stop execution if fields are empty
  }

  set(ref(db, "students/" + rollNumber), {
    name: name,
    email: email,
    rollNumber: rollNumber,
  })
    .then(() => {
      // After successfully adding data, clear the form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("rollNumber").value = "";

      // Reload data
      readData();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

// Function to read data
function readData() {
  const userRef = ref(db, "students/");
  get(userRef)
    .then((snapShot) => {
      const data = snapShot.val();

      const table = document.querySelector("table");

      let html = "";

      for (const key in data) {
        const { name, email, rollNumber } = data[key];
        html += ` 
      <tr>
        <th class="rollNo" scope="row">
          ${rollNumber}
        </th>
        <td class="emailId">${email}</td>
        <td class="nameData">${name}</td>
        <td>
          <button onclick="deleteData('${rollNumber}')">delete</button>
        </td>
        <td>
          <button onclick="updateData('${rollNumber}')"> Edit</button>
        </td>
      </tr>
   `;
      }

      table.innerHTML = html; // Moved this line outside of the loop to prevent overwriting table content
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
    });
}

// Initial read data call
readData();

// Function to delete data
window.deleteData = function (rollNumber) {
  const studentRef = ref(db, "students/" + rollNumber);
  remove(studentRef)
    .then(function () {
      alert("Student deleted");
      // Reload data after deletion
      readData();
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
};

// Function to update data
window.updateData = function (rollNumber) {
  const studentRef = ref(db, "students/" + rollNumber);
  get(studentRef)
    .then((item) => {
      const { name, email, rollNumber } = item.val();
      document.getElementById("name").value = name;
      document.getElementById("email").value = email;
      document.getElementById("rollNumber").value = rollNumber;
    })
    .catch((error) => {
      console.error("Error updating data: ", error);
    });
};
