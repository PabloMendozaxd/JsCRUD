firebase.initializeApp({
    apiKey: "AIzaSyAPAtU_DhkzZ6TK5jJmTtLKon5w-cFM0g0",
    authDomain: "jsvanillacrud.firebaseapp.com",
    projectId: "jsvanillacrud",
});

let db = firebase.firestore();

db.collection("users").add({
    first: "Gloria",
    last: "Figueroa",
    born: 1997
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
