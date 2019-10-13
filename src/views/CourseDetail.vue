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
    <v-dialog v-model="dialog" max-width="500px" class="box">
      <v-btn slot="activator" color="primary" dark class="mb-2">Add course</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.course_code" label="course_code"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.course_name" label="course_name"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.credit" label="credit"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.prerequisite" label="prerequisite"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


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
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.course_code }}</td>
        <td class="text-xs-right">{{ props.item.course_name }}</td>
        <td class="text-xs-right">{{ props.item.credit }}</td>
        <td class="text-xs-right">{{ props.item.prerequisite }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item.course_code)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

     <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
       search: '',
       pagination:{rowsPerPage:10},
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

       ],
       headers: [

      {text: 'Course Code', value: 'course_code' },
      {text:'Course Name',value:'course_name'},
      {text:'Credit',value:'credit'},
      {text:'Prerequisite',value:'prerequisite'},

       ],
      courses: [],
      editedIndex: -1,
      editedItem: {
       course_code:'',
        course_name:'',
        year:'',
        credit:'',
        session:'',
        prerequisite:'',
      },
      defaultItem: {
      course_code:'',
        course_name:'',
        year:'',
        credit:'',
        session:'',
        prerequisite:'',
      }
    }),
    mounted(){
       axios.get(ip+'/courses/').then(response => (this.courses = response.data))
         .catch(function(err){
             console.log("error",err)
         })
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
       pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },
    methods: {
      //   fetchContacts(){
      //        axios.get('/courses/')
      //     .then(response=>{
      //         console.log(response);
      //         this.contacts=response.data.data;
      //     })
      // },
      initialize(){
         // this.fetchContacts();
      },

      editItem (item) {
        this.editedIndex = this.courses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        console.log(item);

        const index = this.courses.indexOf(item)
        confirm('Are you sure you want to delete this course?',this.index) && this.courses.splice(index, 1)
          console.log('deleted data');

          axios.delete('ip/courses/'+item+'/')
          .then(response=>{

            console.log(response);

          })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          console.log('edited data');
          console.log(this.editedItem);

          axios.post('ip/courses/'+this.editedItem.course_code+'/',{
          course_code: this.editedItem.course_code,
           course_name: this.editedItem.course_name,
           year:this.editedItem.year,
           credit:this.editedItem.credit,
           session:this.editedItem.session,
           prerequisite:this.editedItem.prerequisite
           })
          .then(response=>{
            console.log(response);

          })

          Object.assign(this.courses[this.editedIndex], this.editedItem)
        } else {
          console.log('created data');
          console.log(this.editedItem);
           axios.post('ip/courses/'+this.editedItem.course_code+'/',{
             course_code: this.editedItem.course_code,
           course_name: this.editedItem.course_name,
           year:this.editedItem.year,
           session:this.editedItem.session,
           credit:this.editedItem.credit,
           prerequisite:this.editedItem.prerequisite})
          .then(response=>{
            console.log(response);

          })
          this.courses.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
<style media="screen">
.box{
  margin-top:100px
}
</style>
