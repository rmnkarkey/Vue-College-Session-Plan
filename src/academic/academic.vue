<template>
  <div>
  <div class="h1-class">
    <!-- <details>dkfsdkfkjh</details> -->
    <v-list>
      <b><h1>Academic Information</h1></b>

      <br>
      <h2>Registered courses with results </h2>
      <br>
      <p v-for="i in courses">
        <a @click="clicked(i)">{{i}}</a>
      </p>
      <!-- {{course}} -->
    </v-list>
    <v-dialog v-model="dialog" max-width="400px" class="box">
      <v-card>
        <v-card-title>
          <span class="headline"><h1>Result </h1></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <p>Marks: {{marks}}</p>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
  <nav class="nav-class">
<v-toolbar flat app class="blue">
    <v-toolbar-side-icon  v-on:click="drawer = !drawer">

    </v-toolbar-side-icon>
<v-toolbar-title class="text-uppercase">
<!-- <span class="greytext">Student</span> -->
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
<v-btn color="grey">
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
              <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title><a v-bind:href="'/studentprofile'">  <span class="linker">{{userName}}</span></a></v-list-tile-title>
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
  </div>
</template>

<script>
import axios from 'axios';
  export default{
    data(){
      return{
          marks:'',
          dialog:false,
          drawer:false,
          course: [],
          showCourse:[],
          courses:[],
          links:[
             // {text:'Dashboard',route:'/'},
             {icon:'add',text:'CourseRegistration',route:'/courseRegistration'},
             {icon:'add',text:'Academic',route:'/academic'},
             {icon:'add',text:'Finance',route:'/finance'},

             // {icon:'add',text:'StudentDetail',route:'/studentDetail'},
          ],
      }
    },
    methods:{
      close(){
        this.dialog=false
      },
      clicked(e){
        console.log(e)
        axios.post(ip+'/student-grade/'+e+'/',{
          course_name:e
        }).then(response=>{
          console.log(response.data)
          this.marks=response.data
        })
        this.dialog=true
      }
    },
    mounted: function(){
      axios.get(ip+'/profile/')
      .then(response => {
        // this.user.append(response)
        // console.log(String(response.data))
        // user = String(response.data);
        // console.log(user);
        // this.userName=user;
        // console.log(response.data)
        this.userName=response.data.full_name
        this.university_id = response.data.university_id
          console.log(this.userName)
        });
      var b = '';
      axios.get(ip+'/usercourse/')
      .then(response => {
        this.course.push(response.data)
        // console.log(this.course)
        for (var i = 0; i < this.course.length;i++){
            // console.log(this.course[i])
            this.showCourse.push(this.course[i])
            // console.log(this.showCourse)
            // console.log('.,.,.,.,.,.,.,,.,.,.,,.')
        }
        for(var a of this.showCourse){
          // console.log(a)
          for(var j of a){
            console.log(j)
            this.courses.push(j)
          }
        }
        // for (var q = 0; q < this.showCourse;q++){
        //     // console.log(this.course[i])
        //     this.firstCourse.push(this.showCourse)
        //     // console.log(this.showCourse)
        //     // console.log('.,.,.,.,.,.,.,,.,.,.,,.')
        // }
        // for (var w = 0; w < this.firstCourse.length;i++){
        //     // console.log(this.course[i])
        //     this.secondCourse.push(this.firstCourse[i])
        //     // console.log(this.showCourse)
        //     // console.log('.,.,.,.,.,.,.,,.,.,.,,.')
        // }
        // var iterator = this.showCourse.values()
        // for ( let a of iterator){
        //   console.log(a)
        // // }
        // for ( let c of this.showCourse){
        //   console.log(c.split(' '))
        //
        // }

        });

    }

  }
</script>
<style media="screen">
  .nav-class{
    margin-top:400px
  }
  .h1-class{
    margin-top:90px;
    margin-left:50px;
  }
  .linker{
    text-decoration: none;
    color:black
  }
</style>
