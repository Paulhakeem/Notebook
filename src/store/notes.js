// import { ref, onMounted } from 'vue';
// import { auth } from './firebaseConfig';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';

// const useNotes = () => {
//   const user = ref(null);
//   const notes = ref([]);

//   onMounted(() => {
//     auth.onAuthStateChanged((firebaseUser) => {
//       if (firebaseUser) {
//         user.value = firebaseUser;
//         fetchUserNotes();
//       } else {
//         user.value = null;
//         notes.value = [];
//       }
//     });
//   });

//   const fetchUserNotes = () => {
//     const q = query(collection(db, 'notes'), where('uid', '==', user.value.uid));
//     onSnapshot(q, (snapshot) => {
//       notes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     });
//   };

//   return { user, notes };
// };