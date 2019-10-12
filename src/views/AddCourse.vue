<template>
 <v-form v-model="valid" @submit="formSubmit" method="POST">
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
          md4
        >
          <v-text-field
            v-model="year"
            placeholder="year"
            type="datetime"
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
            v-model="session"
            placeholder="session"
            type='text'
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
      
      }

    }
    ,
    mounted(){
    axios.get(ip+'/course/').then(function(response){
      console.log("succes",response.data)

    }).catch(function(err){
      console.log(err)
    })  
    },
     methods:{
     formSubmit:function(e){
        e.preventDefault();
        axios.post('ip/courses/',{
           course_code:this.course_code,
        course_name:this.course_name,
        year:this.year,
        credit:this.credit,
        session:this.session,
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
