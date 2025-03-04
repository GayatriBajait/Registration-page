import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBh_cdRKeIo9avIpY2-DL5--weRAboBcCo",
    authDomain: "registration-page-4c5fa.firebaseapp.com",
    projectId: "registration-page-4c5fa",
    storageBucket: "registration-page-4c5fa.appspot.com",
    messagingSenderId: "502948829534",
    appId: "1:502948829534:web:91847c0644efd3e44c57cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Cloudinary Config (if you need it later)
// const CLOUD_NAME = "dzt7isc7y";  
// const UPLOAD_PRESET = "Registration page";

// Provided default image URL for testing in Firestore
const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/dzt7isc7y/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1741001160/efwd5q20n3yzvpmskaeo.jpg";

// Register Function
window.register = async function() {
    console.log("Register function started!");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // We'll ignore the file input for now since we're using the default image URL
    // const photo = document.getElementById("photo").files[0];
    const message = document.getElementById("message");

    if (!name || !email || !password) {
        message.innerText = "Name, Email and Password are required!";
        message.style.color = "red";
        alert("Error: All fields are required!");
        return;
    }

    try {
        message.innerText = "Registering...";
        message.style.color = "blue";

        // Create User in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);

        // For testing purposes, we use the provided image URL instead of uploading a photo.
        const cloudinaryPhotoURL = DEFAULT_IMAGE_URL;
        console.log("Using default image URL:", cloudinaryPhotoURL);

        console.log("Saving user info to Firestore...");
        await setDoc(doc(db, "users", user.uid), { 
            name, 
            email, 
            cloudinaryPhotoURL  
        });

        message.style.color = "green";
        message.innerText = "Registration successful!";
        alert("✅ Registration successful!");

        // Clear form fields (if needed)
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        // document.getElementById("photo").value = "";
        
    } catch (error) {
        console.error("Error:", error.message);
        message.style.color = "red";

        if (error.code === "auth/email-already-in-use") {
            message.innerText = "This email is already registered. Try logging in.";
            alert("⚠️ This email is already registered. Try logging in.");
        } else if (error.code === "auth/weak-password") {
            message.innerText = "Password must be at least 6 characters.";
            alert("⚠️ Password must be at least 6 characters.");
        } else {
            message.innerText = error.message;
            alert("❌ Error: " + error.message);
        }
    }
};

// Attach event listener to Register button
document.getElementById("registerBtn").addEventListener("click", register);

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyBh_cdRKeIo9avIpY2-DL5--weRAboBcCo",
//     authDomain: "registration-page-4c5fa.firebaseapp.com",
//     projectId: "registration-page-4c5fa",
//     storageBucket: "registration-page-4c5fa.appspot.com",
//     messagingSenderId: "502948829534",
//     appId: "1:502948829534:web:91847c0644efd3e44c57cf"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Cloudinary Config
// const CLOUD_NAME = "dzt7isc7y";  // ✅ Correct Cloudinary cloud name
// const UPLOAD_PRESET = "Registration page"; // ✅ Correct Upload Preset Name

// // Register Function
// window.register = async function() {
//     console.log("Register function started!");

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const photo = document.getElementById("photo").files[0];
//     const message = document.getElementById("message");

//     if (!name || !email || !password || !photo) {
//         message.innerText = "All fields are required!";
//         message.style.color = "red";
//         alert("Error: All fields are required!");
//         return;
//     }

//     try {
//         console.log("Checking if email is already registered...");
//         message.innerText = "Registering...";
//         message.style.color = "blue";

//         // Create User in Firebase Auth
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         console.log("User created:", user.uid);

//         console.log("Uploading photo to Cloudinary...");

//         // Prepare FormData for Cloudinary
//         const formData = new FormData();
//         formData.append("file", photo);
//         formData.append("upload_preset", UPLOAD_PRESET);  

//         // Upload Image to Cloudinary
//         const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//             method: "POST",
//             body: formData
//         });

//         const cloudData = await response.json();
//         if (!cloudData.secure_url) {
//             throw new Error("Image upload failed!");
//         }

//         const cloudinaryPhotoURL = cloudData.secure_url;
//         console.log("Photo uploaded to Cloudinary:", cloudinaryPhotoURL);

//         console.log("Saving user info to Firestore...");
//         await setDoc(doc(db, "users", user.uid), { 
//             name, 
//             email, 
//             cloudinaryPhotoURL  
//         });

//         message.style.color = "green";
//         message.innerText = "Registration successful!";
//         alert("✅ Registration successful!");

//         // Clear form after successful registration
//         document.getElementById("name").value = "";
//         document.getElementById("email").value = "";
//         document.getElementById("password").value = "";
//         document.getElementById("photo").value = "";
        
//     } catch (error) {
//         console.error("Error:", error.message);
//         message.style.color = "red";

//         if (error.code === "auth/email-already-in-use") {
//             message.innerText = "This email is already registered. Try logging in.";
//             alert("⚠️ This email is already registered. Try logging in.");
//         } else if (error.code === "auth/weak-password") {
//             message.innerText = "Password must be at least 6 characters.";
//             alert("⚠️ Password must be at least 6 characters.");
//         } else {
//             message.innerText = error.message;
//             alert("❌ Error: " + error.message);
//         }
//     }
// };

// // Attach event listener to Register button
// document.getElementById("registerBtn").addEventListener("click", register);
