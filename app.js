import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getFirestore,collection,doc,addDoc,getDocs,updateDoc,deleteDoc,} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1AahhmF5o4VBqb5iqBPPDTUYZG-P_WXc",
  authDomain: "proyectouni-7faff.firebaseapp.com",
  projectId: "proyectouni-7faff",
  storageBucket: "proyectouni-7faff.appspot.com",
  messagingSenderId: "669116950016",
  appId: "1:669116950016:web:fdbe20d1560a9e8c161ae5",
  measurementId: "G-MWTR4GEZWE"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let idBook = "";
let idClient = "";
let idRent ="";

//Logica y Funciones Book
document.querySelector("#Book").addEventListener("click",()=>{
  document.querySelector(".SectionBook").style.display = "flex";
  document.querySelector(".SectionClient").style.display = "none";
  document.querySelector(".SectionRent").style.display = "none";
})

document.querySelector("#clients").addEventListener("click",()=>{
  document.querySelector(".SectionClient").style.display = "flex";
  document.querySelector(".SectionBook").style.display = "none";
  document.querySelector(".SectionRent").style.display = "none";
})

document.querySelector("#Rent").addEventListener("click",()=>{
  document.querySelector(".SectionRent").style.display = "flex";
  document.querySelector(".SectionBook").style.display = "none";
  document.querySelector(".SectionClient").style.display = "none";
})

const addBook = async (
  idBook,
  NameBook,
  NameAutor,
  NameEditorial,
  DateBook,

) => {
  const booksRef = collection(db, "Books");
  const newBook = {
    idBook,
    NameBook,
    NameAutor,
    NameEditorial,
    DateBook,

  };
  await addDoc(booksRef, newBook);
  console.log("Book added successfully!");
};

const getBooks = async () => {
  const booksRef = collection(db, "Books");
  const querySnapshot = await getDocs(booksRef);
  const contentMain = document.querySelector(`.div-Books`);
  const $template = document.querySelector("#template1");
  let $fragmen = new DocumentFragment();

  querySnapshot.forEach((doc) => {
    const elemet = doc.data();
    console.log(elemet);

    const clone = $template.content.lastElementChild.cloneNode(true);
    clone.querySelector("#Book");
    clone.querySelector("#CodeId").textContent = `#${elemet.idBook}`;
    clone.querySelector("#NameBook").textContent = elemet.NameBook;
    clone.querySelector("#NameAutor").textContent = elemet.NameAutor;
    clone.querySelector("#DateBook").textContent = elemet.DateBook;
    clone.querySelector("#Editorial").textContent = elemet.NameEditorial;
    clone.querySelector("#btn-Update").addEventListener("click", () => {
      document.querySelector(".div-update-Books").style.display = "block";
      idBook = doc.id;
      console.log(idBook);
    });
    clone.querySelector("#btn-Delete").addEventListener("click", () => {
      document.querySelector(".div-Delete-Books").style.display = "block";
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
};

const updateBook = async (updateData) => {
  console.log((db, "Books", idBook));
  const bookRef = doc(db, "Books", idBook);
  console.log(bookRef);
  await updateDoc(bookRef, updateData);
  console.log("Book updated successfully!");
};

const deleteBook = async (bookId) => {
  const bookRef = doc(db, "Books", bookId);
  await deleteDoc(bookRef);
  console.log("Book deleted successfully!");
};

getBooks();

document.querySelector(".btn-register-book").addEventListener("click", () => {
  const NameAutor = document.getElementById("NameAutor").value;
  const LastNameAutor = document.getElementById("LastNameAutor").value;
  const NameBook = document.getElementById("NameBook").value;
  const Editorial = document.getElementById("Editorial").value;
  const DateBook = document.getElementById("DateBook").value;

  if (!NameAutor || !LastNameAutor || !NameBook || !Editorial || !DateBook) {
    console.log("Ingrese Los datos");
  } else {
    let nameAutor = `${NameAutor} ${LastNameAutor}`;
    let id = generarCodigo();

    addBook(id, NameBook, nameAutor, Editorial, DateBook, active);
    setInterval("location.reload()", 3000);
  }
});

document.querySelector("#btn-exit").addEventListener("click", () => {
  document.querySelector(".div-update-Books").style.display = "none";
});

document.querySelector("#btn-exit-delete").addEventListener("click", () => {
  document.querySelector(".div-Delete-Books").style.display = "none";
});

document.querySelector(".btn-Update-book").addEventListener("click", () => {
  const NameAutor = document.getElementById("NameAutorUpdate").value.trim();
  const LastNameAutor = document
    .getElementById("LastNameAutorUpdate")
    .value.trim();
  const NameBook = document.getElementById("NameBookUpdate").value.trim();
  const Editorial = document.getElementById("EditorialUpdate").value.trim();
  const DateBook = document.getElementById("DateBookUpdate").value.trim();

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
      updateBook(updateData);
      setInterval("location.reload()", 3000);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  } else {
  }
});

document.querySelector(".btn-Delete-book").addEventListener("click", () => {
  deleteBook(idBook);
  setInterval("location.reload()", 3000);
});

function generarCodigo() {
  let codigo = "";
  for (let i = 0; i < 6; i++) {
    codigo += Math.floor(Math.random() * 10);
  }
  return codigo;
}
//Fin Logica y Funciones Book

// Logica y Funcione Cliente

const getClients = async () => {
  const ClientRef = collection(db, "Client");
  const querySnapshot = await getDocs(ClientRef);
  const contentMain = document.querySelector(`.tabla`);
  const $template = document.querySelector("#template2");
  let $fragmen = new DocumentFragment();

  querySnapshot.forEach((doc) => {
    const elemet = doc.data();
    console.log(elemet);

    const clone = $template.content.lastElementChild.cloneNode(true);
    clone.querySelector("#Fila");
    clone.querySelector("#NameClient").textContent = elemet.NameClient;
    clone.querySelector("#LastNameClient").textContent = elemet.LastNameClient;
    clone.querySelector("#CI-Client").textContent = elemet.CiClient;
    clone.querySelector("#DateClient").textContent = elemet.DateClient;
    clone.querySelector("#AddresClient").textContent = elemet.AddressClient;
    clone.querySelector("#btn-Update").addEventListener("click", () => {
      document.querySelector(".div-update-Client").style.display = "block";
      idClient = doc.id;
      console.log(idClient);
    });
    clone.querySelector("#btn-Delete").addEventListener("click", () => {
      document.querySelector(".div-Delete-Client").style.display = "block";
      idClient = doc.id;
      console.log(idClient);
    });

    $fragmen.appendChild(clone);
  });

  if (contentMain) {
    contentMain.appendChild($fragmen);
  } else {
    document.body.appendChild($fragmen);
  }
};

getClients();

document.querySelector("#btn-exit-client").addEventListener("click", () => {
  document.querySelector(".div-update-Client").style.display = "none";
});
document.querySelector("#btn-exit-client-d").addEventListener("click", () => {
  document.querySelector(".div-Delete-Client").style.display = "none";
});
document.querySelector(".btn-Cancela-Delete-book").addEventListener("click", () => {
  document.querySelector(".div-Delete-Client").style.display = "none";
});

const addClient = async (NameClient,LastNameClient,CiClient,AddressClient,DateClient) => {
  const ClientRef = collection(db, "Client");
  const newClient = {
    NameClient,LastNameClient,CiClient,AddressClient,DateClient
  };
  await addDoc(ClientRef, newClient);
  console.log("Client added successfully!");
};

document.querySelector(".btn-register-Client").addEventListener("click", () => {
  const NameClient = document.getElementById("NameClient").value;
  const LastNameClient = document.getElementById("LastNameClient").value;
  const CiClient = document.getElementById("CiClient").value;
  const AddressClient = document.getElementById("AddressClient").value;
  const DateClient = document.getElementById("DateClient").value;

  if (!NameClient || !LastNameClient || !CiClient || !AddressClient || !DateClient) {
    console.log("Ingrese Los datos");
  } else {
  
    addClient(NameClient,LastNameClient,CiClient,AddressClient,DateClient);
    setInterval("location.reload()", 3000);
  }
});
const updateClient = async (updateData) => {
  const ClientRef = doc(db, "Client", idClient);
  await updateDoc(ClientRef, updateData);
  console.log("Client updated successfully!");
};

const deleteClient = async (ClientId) => {
  const ClientRef = doc(db, "Client", ClientId);
  await deleteDoc(ClientRef);
  console.log("Client deleted successfully!");
};
document.querySelector(".btn-Update-Client").addEventListener("click", () => {
  const NameClient = document.getElementById("NameClientUpdate").value.trim();
  const LastNameClient = document.getElementById("LastNameClientUpdate").value.trim();
  const CiClient = document.getElementById("CiClientUpdate").value.trim();
  const AddressClient = document.getElementById("AddressClientUpdate").value.trim();
  const DateClient = document.getElementById("DateClientUpdate").value.trim();

  const updateData = {}; // Object to hold changes

  if (NameClient) {
    updateData.NameClient = NameClient;
  }
  if (LastNameClient) {
    updateData.LastNameClient = LastNameClient;
  }
  if (CiClient) {
    updateData.CiClient = CiClient;
  }
  if (AddressClient) {
    updateData.AddressClient = AddressClient;
  }
  if (DateClient) {
    updateData.DateClient = DateClient;
  }
  if (Object.keys(updateData).length > 0) {
    try {
      updateClient(updateData);
      setInterval("location.reload()", 3000);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  } else {
  }
});

document.querySelector(".btn-Delete-Client").addEventListener("click", () => {
  deleteClient(idClient);
  setInterval("location.reload()", 3000);
});

// Fin Logica y Funcione Cliente

// Logica y Funcione Cliente

const addRent = async (
  CiClientRent,
  CodeIdBookRent,
  DateStartRent,
  DateEndRent
) => {
  const RentRef = collection(db, "Rents");
  const newRent = {
    CiClientRent,
    CodeIdBookRent,
    DateStartRent,
    DateEndRent
  };
  await addDoc(RentRef, newRent);
  console.log("Rent added successfully!");
};

const getRents = async () => {
  const RentsRef = collection(db, "Rents");
  const querySnapshot = await getDocs(RentsRef);
  const contentMain = document.querySelector(`.div-Rent`);
  const $template = document.querySelector("#template3");
  let $fragmen = new DocumentFragment();

  querySnapshot.forEach((doc) => {
    const elemet = doc.data();
    console.log(elemet);

    const clone = $template.content.lastElementChild.cloneNode(true);
    clone.querySelector("#Rent");
    clone.querySelector("#CiClient").textContent = elemet.CiClientRent;
    clone.querySelector("#IdBook").textContent = elemet.CodeIdBookRent;
    clone.querySelector("#DateStart").textContent = elemet.DateStartRent;
    clone.querySelector("#DateEnd").textContent = elemet.DateEndRent;
   
    clone.querySelector("#btn-Update").addEventListener("click", () => {
      document.querySelector(".div-update-Rent").style.display = "block";
      idRent = doc.id;
      console.log(idRent);
    });
    clone.querySelector("#btn-Delete").addEventListener("click", () => {
      document.querySelector(".div-Delete-rent").style.display = "block";
      idRent = doc.id;
      console.log(idRent);
    });

    $fragmen.appendChild(clone);
  });

  if (contentMain) {
    contentMain.appendChild($fragmen);
  } else {
    document.body.appendChild($fragmen);
  }
};

const updateRent = async (updateData) => {
  console.log((db, "Rents", idRent));
  const RentsRef = doc(db, "Rents", idRent);
  console.log(RentsRef);
  await updateDoc(RentsRef, updateData);
  console.log("Book updated successfully!");
};

const deleteRent = async (RentId) => {
  const ClientRef = doc(db, "Rents",RentId);
  await deleteDoc(ClientRef);
  console.log("Book deleted successfully!");
};

getRents();

document.querySelector(".btn-register-Rent").addEventListener("click", () => {
  const CiClientRent = document.getElementById("CiClientRent").value;
  const CodeIdBookRent = document.getElementById("CodeIdBookRent").value;
  const DateStartRent = document.getElementById("DateStartRent").value;
  const DateEndRent = document.getElementById("DateEndRent").value;
 

  if (!CiClientRent || !CodeIdBookRent || !DateEndRent || !DateStartRent) {
    console.log("Ingrese Los datos");
  } else {
    addRent(CiClientRent,CodeIdBookRent,DateStartRent,DateEndRent);
    setInterval("location.reload()", 3000);
  }
});

document.querySelector("#btn-exit").addEventListener("click", () => {
  document.querySelector(".div-update-Rent").style.display = "none";
});

document.querySelector("#btn-exit-delete").addEventListener("click", () => {
  document.querySelector(".div-Delete-rent").style.display = "none";
});

document.querySelector(".btn-Update-Rent").addEventListener("click", () => {
  const CiClientRent = document.getElementById("CiClientRentUpdate").value.trim();
  const CodeIdBookRent = document.getElementById("CodeIdBookRentUpdate").value.trim();
  const DateStartRent = document.getElementById("DateStartRentUpdate").value.trim();
  const DateEndRent = document.getElementById("DateEndRentUpdate").value.trim();

  const updateData = {}; // Object to hold changes

  if (CiClientRent) {
    updateData.CiClientRent = CiClientRent;
  }
  if (CodeIdBookRent) {
    updateData.CodeIdBookRent = CodeIdBookRent;
  }
  if (DateStartRent) {
    updateData.DateStartRent = DateStartRent;
  }
  if (DateEndRent) {
    updateData.DateEndRent = DateEndRent;
  }
  if (Object.keys(updateData).length > 0) {
    try {
      updateRent(updateData);
      setInterval("location.reload()", 3000);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  } else {
    console.log(updateData);
  }

  
});

document.querySelector(".btn-Delete-Rent").addEventListener("click", () => {
  deleteRent(idRent);
  setInterval("location.reload()", 3000);
});
