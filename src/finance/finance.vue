<template>
  <div>
    <nav >
      <v-toolbar flat app class="blue">
   <v-toolbar-side-icon  v-on:click="drawer = !drawer">

   </v-toolbar-side-icon>
<v-toolbar-title class="text-uppercase">
<span></span>
</v-toolbar-title>
<v-spacer></v-spacer>

<!-- <router-link to="/login" v-if="!isLoggedIn">
  <v-btn color="grey" tag="v-btn" >
      <span >Signin</span>
      <v-icon right>exit_to_app</v-icon>
  </v-btn>
</router-link> -->
 <!-- v-if="isLoggedIn" -->
<router-link to="/logout">
<v-btn color="grey" v-on:click="logout" >
   <span>Logout</span>
   <v-icon right>exit_to_app</v-icon>
</v-btn>
</router-link>
<!-- <v-btn>
  Logout
</v-btn> -->
</v-toolbar>

   <v-navigation-drawer  v-model="drawer" app class=" text-uppercase text-md-center blue">

       <v-toolbar flat class="transparent">
       <v-list class="pa-0">
         <v-list-tile avatar>
           <v-list-tile-avatar>
             <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
           </v-list-tile-avatar>

           <v-list-tile-content>
             <v-list-tile-title><a  v-bind:href="'/studentprofile'"> <span class="linker">{{userName}}</span></a></v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </v-list>
     </v-toolbar>

       <v-list>
           <v-list-tile  v-for="link in links" :key="link.text"  router :to="link.route">
               <v-list-tile-action>
                   <v-icon class="white--text">{{link.icon}}</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                   <v-list-tile-title class="white--text">
                       {{link.text}}<hr>
                    </v-list-tile-title>
               </v-list-tile-content>
           </v-list-tile>
       </v-list>
   </v-navigation-drawer>
   </nav>
   <div class='lower'>
      <h1>Finance Coming soon!!!!</h1>
   </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
       userName:'',
       drawer:false,
       links:[
         {icon:'add',text:'CourseRegistration',route:'/courseRegistration'},
         {icon:'add',text:'Academic',route:'/academic'},
         {icon:'add',text:'Finance',route:'/finance'},

          // {text:'Dashboard',route:'/'},
          // {icon:'add',text:'StudentDetail',route:'/studentDetail'},
       ],
       headers: [
         {text:'',value:'coursecode'},
        { text: 'course_code', value: 'coursecode' },
        { text: 'course_name', value: 'coursename' },
        { text: 'credit',value:'credit'},
        // {text:'session_name',value:'session_name'},
        // {text:'max_credit', value:'max_credit'},
        //{text: 'Actions', value: 'action', sortable: false}
      ],


    }),
      mounted:function(){
        var user = '';
        axios.get(ip+'/profile/')
        .then(response => {
          // this.user.append(response)
          // console.log(String(response.data))
          // user = String(response.data);
          // console.log(user);
          // this.userName=user;
          // console.log(response.data)
          this.userName=response.data.full_name
            console.log(this.userName)
          });

    }


}

</script>

<style media="screen">
  .linker{
    text-decoration: none;
    color:black
  }
  .lower{
    margin-top:100px
  }
</style>
