<template>
<div>
  <v-app>
  
     <!-- <Navbar v-if="isAdmin" ></Navbar> 
     <profile v-if="isUser" ></profile> -->
    <!-- <login></login> -->
    <main>
      <router-view></router-view>
       <!-- <Navbar ></Navbar> 
       <profile ></profile> -->
    </main>
    <Footer app>   </Footer>

 
  </v-app>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/views/Footer';
import login from '@/auth/Login';
import Profile from '@/components/StudentProfile'



export default {
  name: 'App',
 components:{
   Navbar:Navbar,
   login:login,
   Footer:Footer,
   profile:Profile
   
 },
  data () {
    return {
    

    }
  },
  mounted:{
    isUser(){
       console.log( "time never sleep", this.$store.getters.studentprofile)
      this.$store.getters.studentprofile
     
    },
    isAdmin(){
       console.log( "time never sleep", this.$store.getters.adminprofile)
      this.$store.getters.adminprofile
    }
  },
  // created(){
  //    this.$store.dispatch('studentprofile')
  //    this.$store.dispatch('adminprofile')
  
  // }
}
</script>
