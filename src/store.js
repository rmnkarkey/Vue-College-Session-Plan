import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from './router'


Vue.use(Vuex)
var ip='http://10.5.50.35:8000';
export default new Vuex.Store({
state: {
token: localStorage.getItem('access_token') || null,
msg:'',
courseList:'',
users:'',
todo:[],
studentprofile:'',
adminprofile:'',
isAdminAuthnticate:'',
isUserAuthenticate:'',
loginOrNot:'',
authStatus:''

//lol:false



},

getters:{
loadData(state){
    return(studentId)=>{
        return state.ll.find((student)=>{
            return student.id==studentId;
        })
    }
},
getCourse(state){
return state.courseList
},
loggedIn(state) {
return state.token !== null
},
getUser(state){
return state.users
},
todo(state){
return state.todo
},
msg(state){
return state.msg
},
isAdminAuthnticate(state){
return state.isAdminAuthnticate;
},
studentprofile(state){

    return state.studentprofile;
},
adminprofile(state){
    console.log("admin profile  ")
    return state.adminprofile;
},
loginorNot(state){
  return state.loginOrNot
},
authStatus:state => atate.authStatus
},
mutations: {
getList(state,payload){
console.log("lobsang")
state.todo=payload
},
retrieveToken(state,token){
state.token=token;
},
register(state,msg){
state.msg=msg;
},
destroyToken(state) {
state.token = null
},
viewCourse(state,payload){
console.log("sasdsdfsdf",payload)
state.courseList=payload
},
studentprofile(state,value){
    console.log("studentprofilesfsdfsd",value)
    state.studentprofile=value
    // if(state.studentprofile==true){
    //     state.adminprofile=false
    // }
},
adminprofile(state,value){
    console.log("adminprofilesdsdf",value)
    state.adminprofile=value;
    // if(state.adminprofile==true){
    //     state.studentprofile=false
    // }
},
loginOrNot(state,value){
state.loginOrNot=value
},

auth_error(state){
  state.authStatus = 'error'
}
},

actions: {
getList(context){
axios.get('https://jsonplaceholder.typicode.com/users')
.then(response => {
//resolve(response)
console.log(response.data)
context.commit('getList', response.data)
})
.catch(error => {
reject(error)
})

},

// register users
register(context, data) {

const {email,password}= data;
console.log(email,password)



var user={

email:data.email,
password:data.password


}

context.commit('register',user);

// axios.post('/register', {

//   email: data.email,
//   password: data.password,
// })
//   .then(response => {
//     //context.commit('register',"data successfully insert");
//     console.log(response.data)

//   })
//   .catch(error => {

//   })

},

//login users
retrieveToken(context, credentials) {
axios.post(ip+'/login/', {
username: credentials.username,
password: credentials.password,
})
.then(response => {
const token = response
// console.log("s.ndsndfkjbsdjfbasdfbasjdb")
for(var i in token){

    if(token[i]['user']==true){
         console.log('..........................')
      context.commit('studentprofile',"true")
      // console.log(username)
      //context.commit
         router.push({ name: 'studentProfile' })

    }

    if(token[i]['admin']==true){
      context.commit('adminprofile',"true")
     router.push({ name: 'navbar' })

    }

}
console.log(response.data,'..........................................');

var message = 'can not authenticate'
// if(response.data==="can not authenticate"){
// //context.commit('loginOrNot',reponse.data)
// console.log("sdfsadfasdfsdfdfsadfs")
//
// }
localStorage.setItem('access_token', token)


})
.catch(error => {
console.log("hghfghvhhv",error);
commit('auth_error');
localStorage.removeItem('token')
})

},

//destroy token
destroyToken(context) {

axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token



axios.post(ip+'/logout/')
.then(response => {
localStorage.removeItem('access_token')
context.commit('destroyToken')

// console.log(response);
// context.commit('addTodo', response.data)
})
.catch(error => {
localStorage.removeItem('access_token')
context.commit('destroyToken')
reject(error)
})


},
viewCourse(context){

// axios.get(ip+'/session-name-search/'+this.sessionname+'/').then(response => {context.commit('viewCourse',response.data)
//   console.log("course are sdsdsdsdsd")

//  })
//    .catch(function(err){
//        console.log("error",err)
//    })




axios.get(ip+'/session-name-search/'+this.sessionname+'/')
.then(response => {
//resolve(response)
console.log(response.data)
context.commit('viewCourse', response.data)
})
.catch(error => {
reject(error)
})


//  axios.get(ip+'/session-name-search/'+this.sessionname+'/').then(function(response){
//    context.commit('viewCourse',response.data)
//    console.log("course are sdsdsdsdsd",response.data)

//  })

}




}
})





// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// import axios from 'axios'



// export const store = new Vuex.Store({
//     state: {
//       status: '',
//     token: localStorage.getItem('token') || '',
//     user : {}
//     },
//     getters: {
//       isLoggedIn: state => !!state.token,
//       authStatus: state => state.status,



//     },
//     mutations:{
//       auth_request(state){
//         state.status = 'loading'
//       },
//       auth_success(state, token, user){
//         state.status = 'success'
//         state.token = token
//         state.user = user
//       },
//       auth_error(state){
//         state.status = 'error'
//       },
//       logout(state){
//         state.status = ''
//         state.token = ''
//       },
//     },

//     actions:{
//       login({commit}, user){
//         return new Promise((resolve, reject) => {
//           commit('auth_request')
//           axios({url: ip+'/login', data: user, method: 'POST' })
//           .then(resp => {
//             const token = resp.data.token
//             const user = resp.data.user
//             localStorage.setItem('token', token)
//             axios.defaults.headers.common['Authorization'] = token
//             commit('auth_success', token, user)
//             resolve(resp)
//           })
//           .catch(err => {
//             commit('auth_error')
//             localStorage.removeItem('token')
//             reject(err)
//           })
//         })
//     },
//     logout({commit}){
//       return new Promise((resolve, reject) => {
//         commit('logout')
//         localStorage.removeItem('token')
//         delete axios.defaults.headers.common['Authorization']
//         resolve()
//       })
//     }
//     }


//   })
