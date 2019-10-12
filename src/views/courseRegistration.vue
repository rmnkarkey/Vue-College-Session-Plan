<template>
  <div>
    <nav >
      <v-toolbar flat app class="blue">
   <v-toolbar-side-icon  v-on:click="drawer = !drawer">

   </v-toolbar-side-icon>
<v-toolbar-title class="text-uppercase">
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
<!-- <v-btn>
  Logout
</v-btn> -->
</v-toolbar>

   <v-navigation-drawer  v-model="drawer" app class=" text-uppercase text-md-center blue">

       <v-toolbar flat class="transparent">
       <v-list class="pa-0">
         <v-list-tile avatar>
           <v-list-tile-avatar>
             <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
           </v-list-tile-avatar>

           <v-list-tile-content>
             <v-list-tile-title><a  v-bind:href="'/studentprofile'"> <span class="linker">{{userName}}</span></a></v-list-tile-title>
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
    <v-list>
        <v-list-tile v-for="(course) in courses" :key="course">
            {{course.session_name}}
            {{course.max_credit}}
        </v-list-tile>
    </v-list>

  <h2> {{coursecode}}</h2>
     <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="courses"
      :search="search"
      hide-actions
      class="elevation-1"
    >


      <template slot="items" slot-scope="props">
        <td class="text-xs-right"><input type="checkbox" :value="props.item.course_code"  name="checkbox" @click="check($event)">
        <td class="text-xs-right"><input type="text" :value="props.item.course_code" name="coursecode"></td>
        <td class="text-xs-right"><input type="text" :value=" props.item.course_name" name="coursename"> </td>
        <td class="text-xs-right"><input type="text" :value=" props.item.credit" name="credit"></td>

      </template>

      <!-- <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
 <v-container>
          <v-layout>
              <v-flex xs12>
                  <v-btn class="justify-center" @click="save" layout px-0>
                      <v-icon > save </v-icon>
                  </v-btn>
              </v-flex>
          </v-layout>
      </v-container>

  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
       search: '',
       userName:'',
       drawer:false,
       links:[
         {icon:'add',text:'CourseRegistration',route:'/courseRegistration'},
         {icon:'add',text:'Academic',route:'/academic'},
         {icon:'add',text:'Finance',route:'/finance'},

          // {text:'Dashboard',route:'/'},
          // {icon:'add',text:'StudentDetail',route:'/studentDetail'},
       ],
       headers: [
         {text:'checkBox',value:'coursecode'},
        { text: 'course_code', value: 'coursecode' },
        { text: 'course_name', value: 'coursename' },
        { text: 'credit',value:'credit'},
        // {text:'session_name',value:'session_name'},
        // {text:'max_credit', value:'max_credit'},
        //{text: 'Actions', value: 'action', sortable: false}
      ],
      courses: [],
      maxCredit:'',
      check_box_value:[],
      coursecode:'',
      coursename:'',
      credit:'',
      sessionName:'',
      checkbox:'',
      counting:'',
      university_id:''

    }),
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
            console.log(this.userName)
          });
        // var user = '';
        axios.get(ip+'/profile/')
        .then(response => {
          // this.user.append(response)
          // console.log(String(response.data))
          this.userName = response.data.full_name;
          // console.log(user);
          // this.userName=user;
        });
       axios.get(ip+'/App/sessions').then(response => {
           this.courses = response.data;
            // for(var i=0;i<this.courses.length;i++){
            //     console.log(this.courses.max_credit[i])
            // }
            var i;
            for(i in this.courses)  {
                this.maxCredit=this.courses[i].max_credit
                this.sessionName=this.courses[i].session_name
                //console.log(this.maxCredit)
            }


           console.log(this.coursename)

       })
         .catch(function(err){
             console.log("error",err)
         })
    },
    methods: {
     check:function(e){
         if(e.target.checked){
             console.log(e.target.value)
             this.check_box_value.push(e.target.value)
             axios.post(ip+'/counter/',{
             checkbox:this.check_box_value
            }).then(function(result){
            console.log(result.data.course_credit_count)
            this.counting=result.data.course_credit_count;
            console.log('sddfsdfsd',this.counting)
            })
             //var list;
            //
         }
         if(!e.target.checked){
           console.log(e.target.value)
           this.check_box_value.pop(e.target.value)
         }

     },
     save(){
            axios.post(ip+'/App/sessions',{
                  studentName:this.university_id,
                 sessionname:this.sessionName,
                 maxcredit:this.maxCredit,
                 checkbox:this.check_box_value
             }).then(function(result){
                 console.log(result)
             }).catch(function(err){
                 console.log(err)
             })
     }



    }


  }
</script>

<style media="screen">
  .linker{
    text-decoration: none;
    color:black
  }
</style>
