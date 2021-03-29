firebase.initializeApp({
  apiKey: "AIzaSyAPAtU_DhkzZ6TK5jJmTtLKon5w-cFM0g0",
  authDomain: "jsvanillacrud.firebaseapp.com",
  projectId: "jsvanillacrud",
});

let db = firebase.firestore();

function createUsers() {
  db.collection("users").add({
    first: document.getElementById('firt-name').value,
    last: document.getElementById('last-name').value,
    born: document.getElementById('birth-date').value
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("user-data").reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

let table = document.getElementById('display');
db.collection("users").onSnapshot((querySnapshot) => {
  table.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
    table.innerHTML += `
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="deleteUsers('${doc.id}')">Delete</button></td>
        <td><button class="btn btn-warning" onclick="updateUsers('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Update</button></td>
      </tr>
      `
  });
});

function deleteUsers(user) {
  db.collection("users").doc(user).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}
function updateUsers(user,newfirstName,newlastName,newbirthDate) {
  document.getElementById('firt-name').value=newfirstName;
  document.getElementById('last-name').value=newlastName;
  document.getElementById('birth-date').value=newbirthDate;
  let updateButton = document.getElementById('mainButton');
  updateButton.innerHTML = 'Update';
  updateButton.onclick = () => {
    var washingtonRef = db.collection("users").doc(user);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
      first: document.getElementById('firt-name').value,
      last: document.getElementById('last-name').value,
      born: document.getElementById('birth-date').value
    })
      .then(() => {
        console.log("Document successfully updated!");
        document.getElementById("user-data").reset();
        updateButton.innerHTML = 'Submit';
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}
