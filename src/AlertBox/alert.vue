<template>
     <v-dialog width="350px" persistent v-model="msg"> 
         <v-btn fab accent slot="activator">
        
        </v-btn>
          <v-card> 
               <v-container> 
                    <v-layout row wrap> 
                         <v-flex xs12> 
                              <v-card-title> Alert!!!! </v-card-title>
                         </v-flex>
                    </v-layout>
                    <v-divider> </v-divider>
                    <v-layout row wrap> 
                         <v-flex xs12> 
                             {{err}}
                            
                         </v-flex>
                    </v-layout>
                    <v-divider> </v-divider>
                    <v-layout row wrap> 
                        <v-flex xs12>
                            <v-card-action> 
                                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                               
                            </v-card-action>
                        </v-flex>
                    </v-layout>
               </v-container>
          </v-card>
     </v-dialog>
</template>

<script>
export default {
     props:['showmsg','errorString'],

     data(){
         return{
          msg:this.showmsg,
          err:this.errorString
         }
     },
     methods:{
         close () {
          this.msg = false
           location.reload();
      }
     },
     

    
     
     
}
</script>

