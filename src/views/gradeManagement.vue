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
   <div class="lower">
     <h1>lists of course</h1>
     <br>
     <p v-for="c in course">
       <a @click="clicked(c)">{{c}}</a>
     </p>


     <v-dialog v-model="dialog" max-width="900px" max-height="400px" class="box">
       <v-card>
         <v-card-title>
           <span class="headline"><h1>Registerd students name on this course </h1></span>
         </v-card-title>
         <v-card-text>
           <v-container grid-list-md>
             <v-layout wrap>
               <h2 v-model="texts">{{text}}</h2>
               <h4 v-for="n in name">
                 <i>University Id:</i> {{n}}
                 <input type="hidden" :value="n" name='username'>
                  <i>Marks: </i><input class="input" type="number" v-model="marks">
                  <v-btn color="blue darken-1" flat @click.native="save(n,marks)">Save</v-btn>
               </h4>
             </v-layout>
           </v-container>
         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
   </div>
</div>
</template>

<script>
  import axios from 'axios'

  export default {

    data(){
      return{
        texts:false,
        text:'',
        marks:'',
        userName:'',
        dialog:false,
        courseName:'',
        courses:"",
        course:[],
        names:"",
        name:[],
        drawer:false,
        menuItems:[
           {icon:'add',text:'Add Student',route:'/addstudent'},
           {icon:'school',text:'Course Details',route:'/coursedetail'},
           //
           // {icon:'person',text:'Session Plan', route:'/session'},
           // {icon:'person',text:'session Detail',route:'/sessiondetail'},
           {icon:'add',text:'Session Plan',route:'/sessionname'},

           {icon:'grade',text:'Grade Management',route:'/gradeManagement'}

        ]

      }

    },
    methods:{
      close:function(){
        this.dialog = false
        this.name.splice(0, this.name.length);
      },
      clicked:function(c){
        console.log(c)
        this.courseName=c;
        console.log(this.courseName,'................')
        axios.get(ip+'/registered/'+c).
        then(response=>{
          console.log(response.data)
          this.names=response.data
          for(var j of this.names){
            console.log(j)
            this.name.push(j)
          }

        })
        this.dialog=true
      },
      save:function(e,ee){
        console.log(e,'......',ee)
        axios.post(ip+'/grades/',{
          username:e,
          marks:ee,
          coursename:this.courseName
        }).then(response => {
          console.log(response.data)
          this.text=response.data
          this.texts=true
        });
      }
    },
    mounted:function(){
      axios.get(ip+'/all-courses/')
      .then(response=>{
        console.log(response)
        this.courses=response.data;
        for(var i of this.courses){
          console.log(i)
          this.course.push(i)
        }
      })
    }

  }
</script>
<style media="screen">
  .lower{
    margin-left:50px
  }
.input { outline: 1px black solid }
</style>
