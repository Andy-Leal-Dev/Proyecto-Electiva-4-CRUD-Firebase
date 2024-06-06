
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
let idBook ="";

      
        const addBook = async (idBook,NameBook,NameAutor,NameEditorial,DateBook,ActiveBook) => {
            const booksRef = collection(db, "Books");
            const newBook = {
                idBook,
                NameBook,
                NameAutor,
                NameEditorial,
                DateBook,
                ActiveBook
                
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
                clone.querySelector('#btn-Update').addEventListener('click', () => {
                    document.querySelector('.div-update-Books').style.display="block";
                    idBook = doc.id;
                    console.log(idBook);
                  });
                clone.querySelector('#btn-Delete').addEventListener('click', () => {
                    document.querySelector('.div-Delete-Books').style.display="block";
                    idBook = doc.id;
                    console.log(idBook);
                });
                
                
                $fragmen.appendChild(clone);
           
                
                 });

                 if (contentMain) {
                    contentMain.appendChild($fragmen);
                } else {
                    document.body.appendChild($fragmen);
                }
            }


        const updateBook = async (updateData) => {
            console.log((db, "Books", idBook));
            const bookRef = doc(db, "Books", idBook)
            console.log(bookRef);
            await updateDoc(bookRef, updateData);
            console.log("Book updated successfully!");
        }

        const deleteBook = async (bookId) => {
            const bookRef = doc(db, "Books", bookId);
            await deleteDoc(bookRef);
            console.log("Book deleted successfully!");
        }


        getBooks();

        document.querySelector('.btn-register-book').addEventListener('click', () => {
            const NameAutor = document.getElementById('NameAutor').value
            const LastNameAutor = document.getElementById('LastNameAutor').value
            const NameBook = document.getElementById('NameBook').value
            const Editorial = document.getElementById('Editorial').value
            const DateBook = document.getElementById('DateBook').value


            if(!NameAutor || !LastNameAutor || !NameBook || !Editorial || !DateBook){
                console.log("Ingrese Los datos");
            } else{
                let nameAutor = `${NameAutor} ${LastNameAutor}`;
                let active = true;
                let id = generarCodigo();

                addBook(id,NameBook,nameAutor,Editorial,DateBook,active)
                setInterval("location.reload()",3000);
            }
        });

        document.querySelector('#btn-exit').addEventListener('click', () => {
            document.querySelector('.div-update-Books').style.display="none";

        });

        document.querySelector('#btn-exit-delete').addEventListener('click', () => {
            document.querySelector('.div-Delete-Books').style.display="none";
        });

        document.querySelector('.btn-Update-book').addEventListener('click', () => {
            const NameAutor = document.getElementById('NameAutorUpdate').value.trim();
            const LastNameAutor = document.getElementById('LastNameAutorUpdate').value.trim();
            const NameBook = document.getElementById('NameBookUpdate').value.trim();
            const Editorial = document.getElementById('EditorialUpdate').value.trim();
            const DateBook = document.getElementById('DateBookUpdate').value.trim();
          
            const updateData = {}; // Object to hold changes
          
            if (NameAutor) {
              updateData.NameAutor = `${NameAutor} ${LastNameAutor}`;
            }
            if (NameBook) {
              updateData.NameBook = NameBook;
            }
            if (Editorial) {
              updateData.NameEditorial = Editorial;
            }
            if (DateBook) {
              updateData.DateBook = DateBook;
            }
            if (Object.keys(updateData).length > 0) {
                try {
                    updateBook(updateData)
                    setInterval("location.reload()",3000);
                } catch (error) {
                  console.error("Error updating book:", error);
 
                }
              } else {

              }          
             
        });

        document.querySelector('.btn-Delete-book').addEventListener('click', () => {
                deleteBook(idBook)
                setInterval("location.reload()",3000);
        });





        function generarCodigo() {
            let codigo = '';
            for (let i = 0; i < 6; i++) {
              codigo += Math.floor(Math.random() * 10);
            }
            return codigo;
          }