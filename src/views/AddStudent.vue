<template>
<div>
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
</template>

<script>
  import axios from 'axios';
  import StudentDetail from './StudentDetail.vue';

  export default {
components:{
  'app-student-view':StudentDetail
},
    data(){
      return{
        full_name:'',
        email:'',
        university_id:'',
        enrolled_session:'',
        status:'',
        password:'',
        date_created:'',
        enrolled_year:'',
        result:[]

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
     formSubmit:function(e){
        e.preventDefault();
        axios.post('ip/student/',{
          full_name:this.full_name,
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

     },
 
   }
   
  }
</script>
