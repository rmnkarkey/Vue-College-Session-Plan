<template>
     <v-dialog width="550px" persistent> 
         <v-btn fab  accent slot="activator">
        <v-icon> edit </v-icon>     
        </v-btn>
          <v-card> 
               <v-container> 
                    <v-layout row wrap> 
                         <v-flex xs12> 
                              <v-card-title> Edit Course </v-card-title>
                         </v-flex>
                    </v-layout>
                    <v-divider> </v-divider>
                     <!-- <v-list>
             <v-list-tile v-for="result in result"  :key="result.id">
                <td> {{result.name}}</td><td>{{result.email}}</td><v-spacer></v-spacer>         
                 <v-btn class="error" @click="remove(reslut.id)">Delete</v-btn>
            <v-btn class="warning">Update</v-btn>
            </v-list-tile> 
            
         </v-list> -->
                    <v-layout row wrap> 
                         <v-flex xs12> 
                              <v-card-text> 

                                  
                                  <!-- <v-text-field
                                    v-model="university_id"
                                    placeholder="universityID"
                                    type="number"
                                    required
                                    ></v-text-field>
                                    <v-text-field
                                    v-model="full_name"
                                    placeholder="Full name"
                                    type="text"
                                   required
                                   ></v-text-field>
                                    <v-text-field
                                    v-model="editemail"
                                    placeholder="E-mail"
                                    type="email"
                                     required
                                    ></v-text-field>
                                   <v-text-field
                                   v-model="enrolled_session"
                                    placeholder="Enrolledsession"
                                    type="text"
                                     required
                                     ></v-text-field>
                                      <v-text-field
                                     v-model="enrolled_year"
                                     placeholder="enrolled_year"
                                     type="datetime"
                                     required
                                    ></v-text-field>
                                    <v-text-field
                                    v-model="date_created"
                                    placeholder="Date_created"
                                    type='datetime'
                                    required
                                    ></v-text-field>
                                     <v-text-field
                                    v-model="password"
                                    placeholder="password"
                                    type="text"
                                    required
                                    ></v-text-field>
                                   <v-text-field
                                    v-model="status"
                                    placeholder="status"
                                    type="text"
                                    required
                                    ></v-text-field> -->
                                   <v-text-field
                                    name="email"
                                    label="email"
                                    id="title"
                                    v-model="formdata.email"

                                    ></v-text-field>

                              </v-card-text>
                         </v-flex>
                    </v-layout>
                    <v-divider> </v-divider>
                    <v-layout row wrap> 
                        <v-flex xs12>
                            <v-card-actions> 
                              <v-btn flat @click="close">Cancle</v-btn>
                                <v-btn flat class="blue--text darken-1" >Save</v-btn>

                            </v-card-actions>
                        </v-flex>
                    </v-layout>
               </v-container>
          </v-card>
     </v-dialog>
</template>
<script>
export default {
    props: ['student'],
          data(){
           return{
                  
                    // email:this.student.email
                    formdata:{
                    full_name:this.result.username,
                    email:this.student.name,
                    university_id:this.student.university_id,
                    enrolled_session:this.student.enrolled_session,
                    status:this.student.status,
                    password:this.student.password,
                    date_created:this.student.date_created,
                    enrolled_year:this.student.enrolled_year
                    }
                 
           }
           

      },
      mounted(){
         console.log(this.student)
      },
      methods:{
               close () {
               this.dialog = false
        
               },
     }
}
</script>












