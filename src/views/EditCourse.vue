<template>
     <v-dialog width="350px" persistent> 
         <v-btn fab accent slot="activator">
        <v-icon>edit </v-icon>     
        </v-btn>
          <v-card> 
               <v-container> 
                    <v-layout row wrap> 
                         <v-flex xs12> 
                              <v-card-title> Edit Course </v-card-title>
                         </v-flex>
                    </v-layout>
                    <v-divider> </v-divider>
                    <v-layout row wrap> 
                         <v-flex xs12> 
                              <v-card-text> 
                                   <v-text-field
                                     v-model="course_code"
                                     placeholder="course_code"
                                     type="text"
                                     required
                                    ></v-text-field>
                                    <v-text-field
                                     v-model="course_name"
                                     placeholder="course_name"
                                     type="text"
                                    required
                                    ></v-text-field>
                                     <v-text-field
                                     v-model="year"
                                     placeholder="year"
                                     type="datetime"
                                     required
                                     ></v-text-field>
                                     <v-text-field
                                     v-model="credit"
                                     placeholder="credit"
                                     type="number"
                                     required
                                    ></v-text-field>
                                     <v-text-field
                                     v-model="session"
                                     placeholder="session"
                                     type='text'
                                     required
                                     ></v-text-field>
                                     <v-text-field
                                     v-model="prerequisite"
                                     placeholder="prerequisite"
                                     type="text"
                                     required
                                     ></v-text-field>
                              </v-card-text>
                         </v-flex>
                    </v-layout>
                    <v-divider> </v-divider>
                    <v-layout row wrap> 
                        <v-flex xs12>
                            <v-card-action> 
                                <v-btn flat class="blue--text darken-1">Close</v-btn>
                                <v-btn flat class="blue--text darken-1">Save</v-btn>
                            </v-card-action>
                        </v-flex>
                    </v-layout>
               </v-container>
          </v-card>
     </v-dialog>
</template>

<script>
export default {
     data(){
         return{
             course_code:'',
             course_name:'',
             year:'',
            credit:'',
            session:'',
            prerequisite:'',
         }
     }
}
</script>

