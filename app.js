
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



 const firebaseConfig = {
   apiKey: "",
   authDomain: "",
   projectId: "",
   storageBucket: "",
   messagingSenderId: "",
   appId: "",
   measurementId: ""
 };


 const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

      
        const addBook = async (title, author) => {
            const booksRef = collection(db, "books");
            const newBook = {
                title,
                author
            };
            await addDoc(booksRef, newBook);
            console.log("Book added successfully!");
        }

        const getBooks = async () => {
            const booksRef = collection(db, "books");
            const querySnapshot = await getDocs(booksRef);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }

        const updateBook = async (bookId, newTitle) => {
            const bookRef = doc(db, "books", bookId);
            await updateDoc(bookRef, {
                title: newTitle
            });
            console.log("Book updated successfully!");
        }

        const deleteBook = async (bookId) => {
            const bookRef = doc(db, "books", bookId);
            await deleteDoc(bookRef);
            console.log("Book deleted successfully!");
        }
