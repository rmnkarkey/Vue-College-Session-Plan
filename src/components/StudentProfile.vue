<template>
<div>
  <div class="h1-class">
    <!-- <details>dkfsdkfkjh</details> -->
    <v-list>
      <h3>PROFILE INFORMATION</h3>
      <br>
      <h4>University Id: <v-list-title>{{university_id}}</v-list-title></h4>
      <br>
      <h4>Full Name: <v-list-title>{{userName}}</v-list-title></h4>
      <br>
      <h4>Enrolled Year: <v-list-title>{{enrolled_year}}</v-list-title></h4>
      <br>
      <h4>Enrolled Session: <v-list-title>{{enrolled_session}}</v-list-title></h4>

    </v-list>
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
              <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title><a v-bind:href="'/studentprofile'"> <span class="linker">{{userName}}</span></a></v-list-tile-title>
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
  import axios from 'axios'
  import details from '@/components/details.vue'
export default {
     data:function(){
         return{
           userName:"",
           university_id:"",
           email:'',
           enrolled_year:'',
           enrolled_session:'',
            drawer:false,
             links:[
                // {text:'Dashboard',route:'/'},
                {icon:'add',text:'CourseRegistration',route:'/courseRegistration'},
                {icon:'add',text:'Academic',route:'/academic'},
                {icon:'add',text:'Finance',route:'/finance'},

                // {icon:'add',text:'StudentDetail',route:'/studentDetail'},
             ],


         }
     },
     methods: {
         logout(){
        this.$store.dispatch('destroyToken')
        this.$store.dispatch('destroyToken')
        .then(response => {
        this.$router.push({ name: 'dashboard' })
      })
         }

  },
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
      this.university_id = response.data.university_id
      this.email = response.data.email
      this.enrolled_year = response.data.enrolled_year
      this.enrolled_session = response.data.enrolled_session
      console.log(this.userName)
    });
  },
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
