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
              <v-list-tile-title><a  v-bind:href="'/adminprofile'"> <span class="linker">Admin</span></a></v-list-tile-title>
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
    <div class="lowers">
      <h1>ADMIN SECTION</h1>
      <br>
      <h2>IIMS COLLEGE</h2>
      <br>
      <h3>Putalisadak, Kathmandu</h3>
      <br>
      <img src="./iims.png" style="width:200px;height:200px;">
    </div>
  </div>

</template>
<script>
export default {
     data(){
         return{
             drawer:false,
             menuItems:[
                {icon:'add',text:'Add Student',route:'/addstudent'},
                {icon:'school',text:'Course Details',route:'/coursedetail'},

                // {icon:'person',text:'Session Plan', route:'/session'},
                // {icon:'person',text:'session Detail',route:'/sessiondetail'},
                {icon:'add',text:'Addsession',route:'/sessionname'},

                {icon:'grade',text:'Grade Management',route:'/gradeManagement'}

             ]
         }
     },
     computed: {
        // menuItems(){
        //       let menuItems=[


        //        {icon:'add',text:'CourseRegistration',route:'/courseRegistration'},
        //        {icon:'perm_identity',text:'Student Details',route:'/studentdetail'},
        //       ]
        //       //if(this.userIsAuthenticated){
        //         menuItems=[

        //        {icon:'add',text:'CourseRegistration',route:'/courseRegistration'},
        //        {icon:'perm_identity',text:'Student Details',route:'/studentdetail'},
        //         ]
        //       //}
        //       if(this.adminIsAuthenticated){
        //         menuItems=[
        //         {icon:'add',text:'Add Student',route:'/addstudent'},
        //         {icon:'add',text:"Add Course",route:'/addcourse'},
        //         {icon:'school',text:'Course Details',route:'/coursedetail'},

        //         {icon:'person',text:'Session Plan', route:'/session'},
        //         {icon:'person',text:'session Detail',route:'/sessiondetail'},
        //         {icon:'add',text:'Addsession',route:'/sessionname'},

        //         {icone:'grademanagement',text:'gradeManagement',route:'/gradeManagement'}
        //         ]
        //       }
        //       return menuItems
        //     },
    //   userIsAuthenticated(){

    //   console.log( "time never sleep", this.$store.getters.studentprofile)
    //   this.$store.getters.studentprofile

    // },
    // adminIsAuthenticated(){
    //    console.log( "time never sleep", this.$store.getters.adminprofile)
    //   this.$store.getters.adminprofile
    // },
    isLoggedIn() {
      return this.$store.getters.loggedIn
    }
  },
     methods: {
         logout(){
        this.$store.dispatch('destroyToken')
     this.$store.dispatch('destroyToken')
      .then(response => {
        this.$router.push({ name: 'login' })
      })
         }

  }
}
</script>
<style media="screen">
  .lowers{
    margin-top:100px;
    text-align: center
  }

</style>
