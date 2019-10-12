<template>
<v-container>
     
     <app-session v-if="show" :show="show"></app-session>
    <v-btn flat class="warning"   v-on:click="demo"  v-if="!show">Add  Session</v-btn>
    <!-- <v-btn flat class="success"  v-on:click="unclick">remove the Addsession</v-btn> -->
    <!-- <app-sessiondetail></app-sessiondetail> -->
    
    
    <v-divider></v-divider>
    list of session
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
             session_name:[]
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
