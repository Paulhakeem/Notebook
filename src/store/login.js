import {defineStore} from 'pinia'
import { ref } from 'vue'
import { useRouter } from "vue-router";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
  } from "firebase/auth";

export const useLoginStore = defineStore('login', () => {

 
      const router = useRouter();
      const provider = new GoogleAuthProvider();
      
      const loginDetails = ref({
        name: "",
        email: "",
        password: "",
      });
      
      const userSignup = async () => {
       await createUserWithEmailAndPassword(
          getAuth(),
          loginDetails.value.email,
          loginDetails.value.password
        )
          .then(() => {
            loginDetails.value = {
              name: "",
              email: "",
              password: "",
            };
            router.push({
              path: "/",
            });
          })
          .catch((err) => {
            alert(err.message);
          });
      };
      
      const googleLogin = () => {
        signInWithPopup(getAuth(), provider)
          .then(() => {
            router.push({
              path: "/",
            });
          })
          .catch((err) => {
            alert(err.message);
          });
      };
     
      const logOut = () => {
        signOut(getAuth(),
        loginDetails.value.email,
        loginDetails.value.password)
        .then(() => {
            loginDetails.value = {
                name: null,
                email: null,
                password: null,
              }
              router.push({
                path: "/login",
              });
          }).catch((error) => {
          laert (error.message)
          });
    
      }
     
      return {loginDetails, googleLogin, userSignup, logOut}
})