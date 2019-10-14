<template>
  <div>
      <v-dialog v-model="showmsg" max-width="450px" class="dialogboxcourse">

      <v-card class="elevation-12">
                <v-toolbar
                  color="red"
                  dark
                  flat
                >
                  <v-toolbar-title >Alert!!!</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>

                    <span>Source</span>
                  </v-tooltip>
                  <v-tooltip right>


                  </v-tooltip>
                </v-toolbar>
                {{errorString}}



                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Cancel</v-btn>
                </v-card-actions>

              </v-card>
      </v-dialog>

    <v-dialog v-model="dialog" max-width="700px">
      <v-btn slot="activator"  color="primary" dark class="mb-2">Add Course</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ sessionname }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>

            <input type="checkbox" name="checkboxJan" value="Jan" @click="check($event)">Jan
            <input type="checkbox" name="checkboxMay" value="May" @click="check($event)">May
            <input type="checkbox" name="checkboxSep" value="Sep" @click="check($event)">Sep

     <v-simple-table>
       <thead>
      <tr>
      <th class="text-left">Offered</th>
      <th class="text-left"> Course Name</th>
      <th class="text-left">Course Code</th>
      <th class="text-left"> Credit </th>
    </tr>
       </thead>
        <tbody>
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
        </tbody>
    </v-simple-table>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



     <!-- <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
  export default {
      props:['sessionname'],
    data: () => ({
       search: '',
       pagination:{rowsPerPage:10},
       dialog: false,
       course_name:'',
       course_code:'',
       course_credit:'',
       listOfCourse:'',
        session:'',
        courseCodeList:[],
        errorString:'',
        showmsg:false

    }),
    mounted(){
    //    axios.get('http://192.168.80.103:8000/courses/').then(response => (this.courses = response.data))
    //      .catch(function(err){
    //          console.log("error",err)
    //      })
    },

    computed: {
    computeSession(){
        this.session=this.sessionname
    },
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
        check:function(e){
            if(e.target.checked){
              if(e.target.value=="Jan"||e.target.value=="May"||e.target.value=="Sep"){
                console.log(e.target.value)
                axios.post(ip+'/session-plan/',{
                    session:e.target.value
                }).then(response=>{
                    this.course_name=response.data.availableCourse;
                    this.course_code=response.data.courseCode;
                    this.course_credit=response.data.courseCredit;
                    console.log(this.sessionname)
                })
            }
            else{
              this.courseCodeList.push(e.target.value);
            }
            }
        },


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
        confirm('Are you sure you want to delete this item?') && this.courses.splice(index, 1)
          console.log('deleted data');

          axios.delete('ip/courses/'+this.editedItem.course_code+'/')
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

          axios.post(ip+'/session-name-insert/'+this.sessionname+'/',{
           session:this.sessionname,
           courseCode: this.courseCodeList,
           course_name: this.course_name,
          //  year:this.editedItem.year,
           credit:this.course_credit,
           session_session:this.session
          //  session:this.editedItem.session,
          //  prerequisite:this.editedItem.prerequisite
           })
          .then(response=>{
            console.log(response);
               if(response.data){
              this.errorString=response.data;
              this.showmsg=true
              console.log(this.errorString)
              }
              else{
              console.log(response.data);
                }

          })


        this.close()
      }
    }
  }
</script>
