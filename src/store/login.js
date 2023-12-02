import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from "vue-router"
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
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

         
      
      const rules = computed(() => {
        return {
          name: {required, minLength: minLength(10)},
          email: {required, email},
          password: {required, sameAs: sameAs(loginDetails.password)},
        }
      })

      const v$ = useVuelidate(rules, loginDetails)

      const userSignup = async () => {
        const results = await v$.value.$validate()
        if(results) {
          alert ('Login succeful')
        }else {
          alert ('Please enter the required details')
        }
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
            })
          })
          .catch((err) => {
            alert(err.message);
          })
      }
     
      const logOut = () => {
        signOut(getAuth())
        .then(() => {
              router.push({
                path: "/login",
              });
          }).catch((error) => {
          alert (error.message)
          })
      }
     
      return {loginDetails, googleLogin, userSignup, logOut, rules}
})