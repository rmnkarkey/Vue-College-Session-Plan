<template>
  <div>
  <div>
  <nav>
 <v-toolbar flat app class="blue">
 <v-toolbar-side-icon  v-on:click="drawer = !drawer">

 </v-toolbar-side-icon>
<v-toolbar-title class="text-uppercase">
<!-- <span class="grey--text">Student</span> -->
<span></span>
</v-toolbar-title>
<v-spacer></v-spacer>
<!-- <router-link to="/login" v-if="!isLoggedIn"> -->

<!-- <v-btn color="grey" tag="v-btn"  >
 <span >Signin</span>
 <v-icon right>exit_to_app</v-icon>
</v-btn>
</router-link>
<router-link to="/" v-if="!isLoggedIn"> -->

<!-- <v-btn color="grey" tag="v-btn"  >
 <span >register</span>
 <v-icon right>exit_to_app</v-icon>
</v-btn>
</router-link> -->
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
<div class="containerr">
<v-container>

     <app-session v-if="show" :show="show"></app-session>
    <v-btn flat class="warning"   v-on:click="demo"  v-if="!show">Add  Session</v-btn>
    <!-- <v-btn flat class="success"  v-on:click="unclick">remove the Addsession</v-btn> -->
    <!-- <app-sessiondetail></app-sessiondetail> -->


    <v-divider></v-divider>
    <h2>list of session</h2>
    <br>
    <v-list>
        <v-list-tile v-for="session in session_name" :key="session">
           <h2> {{session}} </h2><v-spacer></v-spacer>
             <app-courseDialog :sessionname="session"></app-courseDialog>
            <app-viewCourse :sessionname="session"> </app-viewCourse>
           <v-btn flat class="success">Edit Session </v-btn>

        </v-list-tile>
    </v-list>

</v-container>
</div>
</div>
</template>

<script>
import axios from 'axios'
import sessionname from '../session/session_name';
import SessionDetail from './SessionDetail';
import dialogCourse from './dialogCourse';
import ViewCourse from './viewCourse';

export default {
    components:{
'app-session':sessionname,
'app-sessiondetail':SessionDetail,
'app-courseDialog':dialogCourse,
'app-viewCourse':ViewCourse,

    },
     data(){
         return{
             show:false,
             session_names:'',
             session_name:[],
             drawer:false,
             menuItems:[
                {icon:'add',text:'Add Student',route:'/addstudent'},
                {icon:'add',text:"Add Course",route:'/addcourse'},
                {icon:'school',text:'Course Details',route:'/coursedetail'},

                // {icon:'person',text:'Session Plan', route:'/session'},
                // {icon:'person',text:'session Detail',route:'/sessiondetail'},
                {icon:'add',text:'Session Plan',route:'/sessionname'},

                {icon:'add',text:'gradeManagement',route:'/gradeManagement'}

             ]
         }

     },
     created(){
        axios.get(ip+'/session-names/').
         then(response=>{
             this.session_names=response.data;
             console.log(this.se)
            //  this.session_name=this.session_names
            for(var i=0;i<this.session_names.length;i++){
                this.session_name.push(this.session_names[i].session_name)
                console.log(this.session_name)
            }
         });
     },
     updated(){
        // axios.get(ip+'/session-names/').
        //  then(response=>{
        //      this.session_names=response.data;
        //      console.log(this.se)
        //     //  this.session_name=this.session_names
        //     for(var i=0;i<this.session_names.length;i++){
        //         this.session_name.push(this.session_names[i].session_name)
        //         console.log(this.session_name)
        //     }
        //  });
     },
     beforeMount(){

     },

     mounted(){


     },
     methods:{
         demo(){
            this.show=true
         }
     }
}
</script>

<style media="screen">
  .containerr{
    margin-top:100px
  }
</style>
