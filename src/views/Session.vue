<template>
<div>
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
 <div class="containerr">

  <v-container width="350px">

    <v-form @submit.prevent="clickFunction" method="post">
    <br>
      <v-label>session </v-label>
      <v-text-field  type="text" v-model="session"></v-text-field>
    <v-btn type="submit" flat class="success" value="Search"> Search</v-btn>
  </v-form>
  <br>
  <br>

  <v-form @submit.prevent="SaveFunction" method="post">

    <v-label>Session Name  </v-label>
    <v-text-field type="text" v-model="session_name"></v-text-field>
    <br>
     <v-label>Session Year  </v-label>
    <v-text-field type="number" v-model="session_year"> </v-text-field>
    <br>
     <v-label>Max Credit </v-label>
    <v-text-field type="number" v-model="max_credit"></v-text-field>
    <br>
    <br>
    <v-label>Start Date  </v-label>
    <v-text-field type="date" data-date-format="YYYY MMMM DD" v-model="startdate"></v-text-field>
    <br>
    <v-label>Dead line   </v-label>
    <v-text-field type="date" v-model="deadline"></v-text-field>
    <br>
    <table>
      <tr>
      <th>Offered</th>
      <th> Course Name</th>
      <th>Course Code</th>
      <th> Credit </th>
    </tr>
      <tr>
        <td>
          <ul v-for="i in course_code" :key="i.id" >
            <li>
                <input type="checkbox" name="checkBox" v-bind:value="i" @click="check($event)">
          </li>
        </ul>
      </td>
        <td>
          <ul v-for="i in course_name" :key="i.id">
            <li>
                <input type="hidden" name="availableCourse" v-bind:value="i">{{i}}
          </li>
        </ul>
      </td>
        <td>
        <ul v-for="i in course_code" :key="i.id">
          <li>
              <input type="hidden" name="course_code" v-bind:value="i">{{i}}
        </li>
      </ul>
    </td>
    <td>
    <ul v-for="i in course_credit" :key="i.id">
      <li>
          <input type="hidden" name="courseCredit" v-bind:value="i">{{i}}
    </li>
  </ul>
</td>
      </tr>
    </table>
    <!-- <v-data-table
    :headers="as"
    :item="asdas">

    </v-data-table> -->
    <br>
    <v-btn type="submit" value="Save">Save</v-btn>

  </v-form>

  </v-container>
</div>
</div>
</template>



<script>
import axios from 'axios';
export default{
  name:'Forms',
  data:function(){
    return {
      session_name:'',
      session_year:'',
      max_credit:'',
      session:'',
      startdate:'',
      deadline:'',
      course_name:'',
      course_code:'',
      course_credit:'',
      listOfCourse:[],
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
    };
  },

  methods:{
  clickFunction(){
    axios.post(ip+'/session-plan/',{
      session:this.session,
    })
    .then(response => {
      this.course_name=response.data.availableCourse;
      this.course_code=response.data.courseCode;
      this.course_credit=response.data.courseCredit;

      // var i;
      // for(i=0;i<this.course_code.length;i++){
      //     this.listOfCourse=this.course_code[i] + "<br>"
      // }
      // var x;
      // for (x in this.course_code) {
      //   this.listOfCourse += this.course_code[x];
      // }
        console.log(this.course_code);
    });
  },
  check: function(e) {
      if (e.target.checked) {
        // console.log(e.target.value);
        this.listOfCourse.push(e.target.value);
        console.log(this.listOfCourse);
      }
  },
  SaveFunction(){
    // var checkbox = document.querySelector('input[type=checkBox]').value ;
    // console.log("check item are",checkbox)
    // checkbox.addEventListener( 'change', function(e) {
    // if(this.checked) {
    //   console.log("checked",e)
    // } else {
    //     console.log("not check",e)
    // }
//});
    // var x = document.getElementById("i").value;

    // console.log("selected item are  ",x);

    axios.post(ip+'/session-planning/',{
      session:this.session,
      session_name:this.session_name,
      max_credit:this.max_credit,
      session_year:this.session_year,
      startdate:this.startdate,
      deadline:this.deadline,
      course_code:this.course_code,
      availableCourse:this.course_name,
      // courseCredit:this.max_credit,
      checkBox:this.listOfCourse
    })
    .then(response => {
      // console.log(response.data.courseCode);
      this.course_code=response.data.courseCode;
      let self=this;
      self.$route.push('/sessiondetail')
      // course_code.push(response.data.courseCode);
      // console.log(course_code)
    });
  },

  }
}

</script>

<style scoped>
ul{
    list-style-type: none;
}
.containerr{
  margin-top: 100px
}
</style>
