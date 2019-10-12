<template>

     <v-container> 
         
         <v-flex>lobsang</v-flex>
         <!-- <v-list>
             <v-list-tile v-for="result in result"  :key="result.id">
                <td> {{result.name}}</td><td>{{result.email}}</td><v-spacer></v-spacer>         
                 <v-btn class="error" @click="remove(reslut.id)">Delete</v-btn>
            <v-btn class="warning">Update</v-btn>
            </v-list-tile> 
            
         </v-list> -->
         <v-layout  row wrap  > 
         <v-data-table
        :headers="headers"
        :items="studentdetail"
        :items-per-page="10"
        class="elevation-1"
         >
         <template slot="items" scope="props">
         <td>
            
             {{ props.item.full_name}}

         </td>

         <td>
            <v-text-field v-model=" editform.email " v-if="edit" > </v-text-field>
            <span v-else> {{props.item.email}}</span>
             </td>
         <!-- <td>{{props.item.university_id}}</td>
         
          <td>{{ props.item.enrolled_session}}</td>
         <td>{{props.item.enrolled_year}}</td>
         <td>{{props.item.date_created}}</td>
         <td>{{props.item.status}}</td> -->
         <td>{{props.item.username}}</td> 
         <v-spacer></v-spacer>
         <v-btn class="warning" v-on:click="editStudent(props.item)" v-if="!edit">Edit </v-btn>
         <v-btn class="warning" v-on:click="cancelEdit" v-if="edit">Cancel </v-btn>
         <v-btn type="button" v-on:click="updateStudent(result,editform)" v-if="edit">update </v-btn>

            <!-- <template v-if="true">
                <v-spacer> </v-spacer>
            
                <app-edit-student :student="studentdetail"> </app-edit-student>
            </template> -->
         <v-btn class="error" @click="remove(props.item.id)">Delete</v-btn>
       </template>

         </v-data-table>
         </v-layout>
     </v-container> 


</template>



<script>
import axios from 'axios'
export default {
   props:['result'],
     data(){
         return{
                lol:"true",
             headers: [
             {
            text: 'Student_Name',
            align: 'left',
            sortable: false,
            value: 'name',
            },

            {text: 'email', value: 'email' },
            {text:'university_id',value:'univeristy_id'},
            {text:'enrolled_session',value:'credit'},
            {text:'date_created',value:'credit'},
            {text:'enrolled_year',value:'credit'},
            {text:'status',value:'credit'},
             {text:'username',value:'username'}
         
             ],
             
             
            edit:false,
            editedIndex:'',

                editform:{
                // full_name:'',
                username:'',
                email:'',
                university_id:'',
                enrolled_session:'',
                status:'',
                password:'',
                date_created:'',
                enrolled_year:'',
                },
                
                

            studentdetail:[],
           
            
    
    }

         
     },
     mounted(){
         axios.get('https://jsonplaceholder.typicode.com/users').then(response => (this.studentdetail = response.data))
         .catch(function(err){
             console.log("error",err)
         })
     },
     computed:{
         loading () {
            return this.studentdetail;
         }
     },
     methods:{
         remove(id){
             console.log(id)
             axios.delete('https://jsonplaceholder.typicode.com/users/'+id+'/').then(response =>(this.studentdetail.splice(id,1)))
         },
         editStudent(item){
          console.log(item)
           
            this.editedIndex = this.studentdetail.indexOf(item)
            console.log(this.editedIndex)
            // this.editform = Object.assign({}, item)
            // console.log(this.editform)
            this.edit = true
            //  this.editform.username=this.result.username;
            //  this.editform.full_name=this.result.full_name;
            //  this.editform.university_id=this.result.university_id;
             this.editform.email=this.result.email;
            //  this.editform.enrolled_session=this.result.enrolled_session;
            //  this.editform.enrolled_year=this.result.enrolled_year;
            //  this.editform.date_created=this.result.date_created;
            //  this.editform.status=this.result.status;

              //this.editindex =this.result.indexof(item);

         },
         cancelEdit(){
             this.edit=false;
              this.editform.full_name;
             this.editform.university_id;
             this.editform.email;
             this.editform.enrolled_session;
             this.editform.enrolled_year;
             this.editform.date_created;
             this.editform.status;
         },

        updateStudent(oldcustomer,newcustomer){
            this.axios.patch("/StudentDetail/"+oldcustomer.id,newcustomer).then(response =>{
                this.$emit('update-student');
                console.log(response.data)
            })

        }
     }
}
</script>
