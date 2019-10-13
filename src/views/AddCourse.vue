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
 <v-form v-model="valid" @submit="formSubmit" method="POST" class='form'>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="course_code"
            placeholder="course_code"
            type="text"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="course_name"
            placeholder="course_name"
            type="text"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
        xs12
        md4 >
        <v-text-field
            v-model="credit"
            placeholder="credit"
            type="number"
            required
          ></v-text-field>
        </v-flex>

         <v-flex
         xs12
          md4>
          <v-text-field
            v-model="prerequisite"
            placeholder="prerequisite"
            type="text"
            required
          ></v-text-field>

        </v-flex>





      </v-layout>
      <v-btn class="success" type="submit">submit </v-btn>
    </v-container>
  </v-form>
</div>
</template>

<script>
  import axios from 'axios'

  export default {

    data(){
      return{
        course_code:'',
        course_name:'',
        year:'',
        credit:'',
        session:'',
        prerequisite:'',
        drawer:false,
        menuItems:[
           {icon:'add',text:'Add Student',route:'/addstudent'},
           {icon:'add',text:"Add Course",route:'/addcourse'},
           {icon:'school',text:'Course Details',route:'/coursedetail'},
           //
           // {icon:'person',text:'Session Plan', route:'/session'},
           // {icon:'person',text:'session Detail',route:'/sessiondetail'},
           {icon:'add',text:'Addsession',route:'/sessionname'},

           {icone:'grademanagement',text:'gradeManagement',route:'/gradeManagement'}

        ]

      }

    }
    ,
    mounted(){
    axios.get(ip+'/courses/').then(function(response){
      console.log("succes",response.data)

    }).catch(function(err){
      console.log(err)
    })
    },
     methods:{
     formSubmit:function(e){
        e.preventDefault();
        axios.post(ip+'/courses/',{
        course_code:this.course_code,
        course_name:this.course_name,
        credit:this.credit,
        prerequisite:this.prerequisite,

        }).then(function(response){
        console.log("data successfully inserted");

        }).catch(function(error){
          console.log(error)
        })

     },

   }

  }
</script>
<style media="screen">
  .form{
    margin-top:50px
  }
</style>
