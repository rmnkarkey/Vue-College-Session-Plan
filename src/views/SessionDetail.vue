


<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.session_name" label="session_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.session_year" label="session_year"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.max_credit" label="max_credit"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.session_session" label="session_session"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.course_credit" label="course_credit"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.courseCode" label="courseCode"></v-text-field>
              </v-flex>
               <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Offered" label="Offered"></v-text-field>
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
      :items="session_name"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >

<template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.session_name }}</td>
        <td class="text-xs-right">{{ props.item.session_year }}</td>
          <td class="text-xs-right">{{ props.item.max_credit }}</td>
        <td class="text-xs-right">{{ props.item.session_session }}</td>
          <td class="text-xs-right">{{ props.item.course_credit }}</td>
        <td class="text-xs-right">{{ props.item.courseCode }}</td>
        <td class="text-xs-right">{{ props.item.Offered }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteRecord(props.item.id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>



      
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

     <!-- 
       <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
       search: '',
       pagination:{rowsPerPage:10},
       dialog: false,
      headers: [
        { text: 'session_name', value: 'session_name' },
        { text: 'session_year', value: 'session_year' },
        { text: 'max_credit', value: 'max_credit'},
        { text: 'session_session',value:'session_session'},
        {text:'course_credit',value:'course_credit'},
        {text:'courseCode', value:'courseCode'},
        {text:'Offered',value:'Offered'}
      ],
     // courses: [],
      editedIndex: -1,
      session_name:[],
      editedItem: {
       session_name:'',
        session_year:'',
        max_credit:'',
        course_credit:'',
        session_session:'',
        courseCode:'',
        Offered:''
      },
      defaultItem: {
      course_code:'',
       session_name:'',
        session_year:'',
        max_credit:'',
        session_credit:'',
        session_session:'',
        courseCode:'',
        Offered:''
      }
    }),
    mounted(){
      axios.get(ip+'/update-session/')
      // .then(response => (this.session_name.push(response.data)))
      .then(response => {
      console.log(response.data);
      this.session_name=response.data;
  });
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
     
      initialize(){
         // this.fetchContacts();
      },
      
      editItem (item) {
        this.editedIndex = this.session_name.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteRecord (item) {
        console.log(item);
        
        const index = this.session_name.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.session_name.splice(index, 1)
          console.log('deleted data');
          
          axios.delete(ip+'/update-session/'+item+'/')
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
          
          axios.post(ip+'/courses/'+this.editedItem.course_code+'/',{
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
           axios.post(ip+'/courses/'+this.editedItem.course_code+'/',{
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
<style>
ul{
    list-style-type: none;
}
tr,th{
  border:2px solid black
}
</style>