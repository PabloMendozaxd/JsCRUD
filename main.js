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

let table=document.getElementById('display');
db.collection("users").onSnapshot((querySnapshot) => {
  table.innerHTML='';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().first}`);
      table.innerHTML+=`
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
      </tr>
      `
  });
});