// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { database, auth } from '../js/firebase_init.js';
import { getDatabase, ref, push, get, child, onValue, set, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

function addUser(user) {
    return set(ref(database, 'users/' + user.uid), user);
}

async function getUser(userId) {
    const dbRef = ref(database, `users/${userId}`);
    console.log("dbRef:", dbRef);
    try {
        const snapshot = await get(dbRef);
        console.log("Snapshot:", snapshot);
        if (snapshot.exists()) {
            console.log("User data exists:", snapshot.val());
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
}

async function updateUser(userId, updatedData) {
    const dbRef = ref(database, `users/${userId}`);
    try {
        await update(dbRef, updatedData);
        console.log("User data updated successfully");
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}


async function getAllUsers() {
    const dbRef = ref(database, 'users');
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error getting users data:", error);
        return null;
    }
}


async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

async function updateDataStructure() {
    const dbRef = ref(database, 'users');
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = snapshot.val();
            for (const key in users) {
                if (users.hasOwnProperty(key)) {
                    const user = users[key];
                    const newUser = {
                        uid: user.uid,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        // Add any other fields you need to keep
                    };
                    await set(ref(database, 'users/' + user.uid), newUser);
                    console.log(`User ${user.uid} updated successfully`);
                }
            }
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error("Error updating data structure:", error);
    }
}

// updateDataStructure(); // update only if data structure changes

export { addUser, getAllUsers, getUser, registerUser, loginUser };