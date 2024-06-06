
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
            const booksRef = collection(db, "Books");
            const querySnapshot = await getDocs(booksRef);
            const contentMain = document.querySelector(`.div-Books`);
            const $template = document.querySelector("#template1");
            let $fragmen = new DocumentFragment();

            querySnapshot.forEach((doc) => {
                const elemet = doc.data();
                console.log(elemet);
   
                const clone = $template.content.lastElementChild.cloneNode(true)
                clone.querySelector('#Book')
                clone.querySelector('#CodeId').textContent = `#${elemet.idBook}`;
                clone.querySelector('#NameBook').textContent = elemet.NameBook;
                clone.querySelector('#NameAutor').textContent = elemet.NameAutor;
                clone.querySelector('#DateBook').textContent = elemet.DateBook;
                clone.querySelector('#Editorial').textContent = elemet.NameEditorial;
                clone.querySelector('#Active').textContent = elemet.ActiveBook ? 'Disponible' : 'Ocupado';
                
                $fragmen.appendChild(clone);
           
                
                 });

                 if (contentMain) {
                    contentMain.appendChild($fragmen);
                } else {
                    document.body.appendChild($fragmen);
                }
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


        getBooks();