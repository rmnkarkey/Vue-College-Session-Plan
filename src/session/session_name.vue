<template>



<v-form v-model="valid" @submit="formSubmit" method="POST">
<v-container grid-list-xl>
<v-layout wrap>
<v-flex
xs12
md4
>
<v-text-field
v-model="session_name"
placeholder="session_name"
type="text"
required
></v-text-field>
</v-flex>

<v-flex
xs12
md4
>
<v-text-field
v-model="session_year"
placeholder="session_year"
type="int"
required
></v-text-field>
</v-flex>

<v-flex
xs12
md4
>
<v-text-field
v-model="max_credit"
placeholder="max_credit"
type="int"
required
></v-text-field>
</v-flex>




<v-flex
xs12
md4>
<v-text-field
v-model="start_date"
placeholder="start_date"
type='date'

required
></v-text-field>

</v-flex>
<v-flex
xs12
md4>
<v-text-field
v-model="end_date"
placeholder="end_date"
type="date"
required
></v-text-field>


</v-flex>





</v-layout>
<v-btn class="success" type="submit" >submit </v-btn>
<app-alert v-if="showmsg" :showmsg="showmsg" :errorString="errorString"></app-alert>
<v-btn class="success" v-on:click="remove">Remove addsession</v-btn>
</v-container>
</v-form>
</template>
<script>
import axios from 'axios';
import alertbox from '../AlertBox/alert'
export default {
components:{
'app-alert':alertbox
},
props:['show'],
data(){
return{
showmsg:false,
session_name:'',
session_year:'',
max_credit:'',
start_date:'',
end_date:'',
errorString:'',



listOfCourse:[]
}
},
mounted(){
console.log(this.show)
},
methods:{


formSubmit:function(e){
e.preventDefault();
axios.post(ip+'/session-name/',{
session_name:this.session_name,
session_year:this.session_year,
max_credit:this.max_credit,
// date_created:this.date_created,
start_date:this.start_date,
end_date:this.end_date,


}). then(response=>{
   console.log("sdsdfsdf")

if(response.data){
this.errorString=response.data;
this.showmsg=true
console.log(this.errorString)
}
else{
console.log(response.data);
}



}).catch(function(error){
console.log(error)

});






}
},

remove(){
this.show=false
}
}
</script>

<style scoped>

</style>
