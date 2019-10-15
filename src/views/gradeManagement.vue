<template>
  <div class="">
    <nav >
   <v-toolbar flat app class="blue">
   <v-toolbar-side-icon  v-on:click="drawer = !drawer">

   </v-toolbar-side-icon>
  <v-toolbar-title class="text-uppercase">
  <!-- <span class="grey--text">Student</span> -->
  <span></span>
  </v-toolbar-title>
  <v-spacer></v-spacer>

  <router-link to="/logout">
  <v-btn color="grey" v-on:click="logout" >
   <span>Logout</span>
   <v-icon right>exit_to_app</v-icon>
  </v-btn>
  </router-link>

  </v-toolbar>

   <v-navigation-drawer  v-model="drawer" app class=" text-uppercase text-md-center blue">

       <v-toolbar flat class="transparent">
       <v-list class="pa-0">
         <v-list-tile avatar>
           <v-list-tile-avatar>
           </v-list-tile-avatar>

           <v-list-tile-content>
             <v-list-tile-title>Admin</v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </v-list>
     </v-toolbar>

       <v-list>
           <v-list-tile  v-for="link in menuItems" :key="link.text"  router :to="link.route">
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

</div>
</template>

<script>
  import axios from 'axios'

  export default {

    data(){
      return{

        drawer:false,
        menuItems:[
           {icon:'add',text:'Add Student',route:'/addstudent'},
           {icon:'add',text:"Add Course",route:'/addcourse'},
           {icon:'school',text:'Course Details',route:'/coursedetail'},
           //
           // {icon:'person',text:'Session Plan', route:'/session'},
           // {icon:'person',text:'session Detail',route:'/sessiondetail'},
           {icon:'add',text:'Session Plan',route:'/sessionname'},

           {icon:'add',text:'gradeManagement',route:'/gradeManagement'}

        ]

      }

    }

  }
</script>
<style media="screen">
  .form{
    margin-top:50px
  }
</style>
