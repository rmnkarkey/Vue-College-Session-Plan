<template>
  <div>
    <v-dialog v-model="dialog" max-width="700px">
      <v-btn slot="activator"  color="warning" dark class="mb-2">View Course</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ sessionname }}</span>
        </v-card-title>
        <v-card-text>
          <v-list> 
              <v-list-tile v-for="course in courseCodeList" :key="course"> 
                  {{course}}
              </v-list-tile>
          </v-list>
        </v-card-text>
        </v-card>
    </v-dialog>
     

    
     
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
       courseCodeList:'',
       errorString:'',
       showmsg:false
  
    }),
   // beforecre
    created(){
       this.$store.dispatch('viewCourse');
      // axios.get(ip+'/session-name-search/'+this.sessionname+'/').then(response => {this.courseCodeList=response.data
      //   console.log("course are",this.courseCodeList)

      //  })
      //    .catch(function(err){
      //        console.log("error",err)
      //    })
    },
    mounted(){
      // viewCourse(){
      //   return $store.state.getters.courseCodeList;
      // },
      


       axios.get(ip+'/session-name-search/'+this.sessionname+'/').then(response => {this.courseCodeList=response.data
        console.log("course are",this.courseCodeList)

       })
         .catch(function(err){
             console.log("error",err)
         })
    },

    computed: {

     viewCourse(){
      return this.$store.getters.getCourse
  },
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
                      console.log("sdsdfsdf")

            //          if(response.data){
            //          this.errorString=response.data;
            //         console.log("error msg",this.errorString)
            //        this.showmsg=true
            //        console.log(this.errorString)
            // }
            // else{
            // console.log(response.data);
            // }
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
          
          axios.delete(ip+'/courses/'+this.editedItem.course_code+'/')
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
            console.log(response.data);
        
            
          })
          
         
        this.close()
      }
    }
  }
</script>

<style scoped>
.element{
    color:white;  
    padding: 0px;
    margin: 0;
    font-size: 150%;
    }
    .ul li {
    font-size: 1.2em;
  }

</style>
