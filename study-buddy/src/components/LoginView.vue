<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-text-field label="Name" v-model="name" />
            <v-text-field label="Email" v-model="email" />
            <v-text-field label="Password" type="password" v-model="password" />
          </v-card-text>
          <v-card-actions>
            <v-btn  @click="login">Sign In</v-btn>
            <v-btn  @click="createAccount">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth"
import { useRouter } from 'vue-router'
import { useFireStore } from '../stores/fireStore'

const fireStore = useFireStore();
const email = ref('')
const password = ref('')
const name = ref('')
const router = useRouter()
const auth = getAuth()


onAuthStateChanged(auth, async (user) =>{
  console.log(user);
  if(user){
    fireStore.user_id = user.uid;
  }else{
    fireStore.user = {};
    router.push("/");
  }
})

const createAccount = async () => {
  try {
    const cr = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(cr);
    await updateProfile(cr.user, { displayName: name.value }).catch((err) =>
      console.log(err)
    );
    await fireStore.createUser(cr.user.uid, name.value, email.value);
    router.push('/profile');
  } catch (err) {
    alert(`Unable to create account ${err.message}`);
  }
};

async function login() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/profile')
  } catch (err) {
    console.error(err)
    alert("Login failed")
  }
}
</script>
