<template>
<div>

<div class='student'>
 <v-form v-model="valid" @submit="formSubmit" method="POST">
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="university_id"
            placeholder="universityID"
            type="number"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="full_name"
            placeholder="Full name"
            type="text"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >

          <v-text-field
            v-model="username"
            placeholder="User name"
            type="text"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="email"

            placeholder="E-mail"
            type="email"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
         xs12
          md4>
          <v-text-field
            v-model="enrolled_session"
            placeholder="Enrolledsession"
            type="text"
            required
          ></v-text-field>

        </v-flex>

        <v-flex
        xs12
        md4 >
        <v-text-field
            v-model="enrolled_year"
            placeholder="enrolled_year"
            type="datetime"
            required
          ></v-text-field>
        </v-flex>
         <v-flex
         xs12
          md4>
          <v-text-field
            v-model="date_created"
            placeholder="Date_created"
            type='datetime'
            required
          ></v-text-field>

        </v-flex>
         <v-flex
         xs12
          md4>
          <v-text-field
            v-model="password"
            placeholder="password"
            type="text"
            required
          ></v-text-field>

        </v-flex>
         <v-flex
         xs12
          md4>
          <v-text-field
            v-model="status"

            placeholder="status"
            type="text"
            required
          ></v-text-field>

        </v-flex>




      </v-layout>
      <v-btn class="success" type="submit">submit </v-btn>
    </v-container>
  </v-form>
<app-student-view v-bind:result="result"></app-student-view>
</div>
<v-dialog v-model="dialog" max-width="700px">
  <!-- <v-btn slot="activator"  color="warning" dark class="mb-2">View Course</v-btn> -->
  <v-card>
    <v-card-title>
      <span class="headline">Message</span>
    </v-card-title>
    <v-card-text>
      <v-list>
          <v-list-tile>
              {{toShow}}
          </v-list-tile>
          <v-btn class="mb-2" @click="close()">CANCEL</v-btn>

      </v-list>
    </v-card-text>
    </v-card>
</v-dialog>


</div>
</template>

<script>
  import axios from 'axios';
  import StudentDetail from './StudentDetail.vue';
  // import navbar from '../components/Navbar.vue';
  export default {
components:{
  'app-student-view':StudentDetail
},
    data(){
      return{
        full_name:'',
        username:'',
        email:'',
        university_id:'',
        enrolled_session:'',
        status:'',
        password:'',
        date_created:'',
        enrolled_year:'',
        result:[],
        toShow:'',
        dialog:false,
      }

    }
    ,
    mounted(){
     axios.get(ip+'/student/').then(response => (this.result = response.data))
         .catch(function(err){
             console.log("error",err)
         })
    },
     methods:{
    close:function(){
        this.dialog = false;
        location.reload();

    },
     formSubmit:function(e){
        e.preventDefault();
        axios.post(ip+'/student/',{
          full_name:this.full_name,
          username:this.username,
          email:this.email,
          university_id:this.university_id,
          enrolled_session:this.enrolled_session,
          password:this.password,
          status:this.status,
          enrolled_year:this.enrolled_year,
          date_created:this.date_created


        }).then(function(response){
        console.log("data successfully inserted");


        }).catch(function(error){
          console.log(error)
        })
        this.toShow="Student Added Succesfully"
        this.dialog=true;
     },

   }

  }
</script>
<style media="screen">
  .student{
    margin-top:50px
  }
</style>
