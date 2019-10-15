<template>
  <div id="app">
    <v-dialog v-model="dialog" max-width="700px">
      <!-- <v-btn slot="activator"  color="warning" dark class="mb-2">View Course</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">Message</span>
        </v-card-title>
        <v-card-text>
          <v-list>
              <v-list-tile>
                  <!-- {{toShow}} -->
                  {{errorMessage}}
              </v-list-tile>
              <v-btn class="mb-2" @click="close()">CANCEL</v-btn>

          </v-list>
        </v-card-text>
        </v-card>
    </v-dialog>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>

                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>


                </v-tooltip>
              </v-toolbar>

     <v-form action="#" @submit.prevent="login">
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>


              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      dialog:false,
      errorMessage:'',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
        //this.$router.push({ name: 'addcourse' })

      //  if( )
    }).catch(err =>{
      console.log("sadfsdfsd",err);
      this.dialog=true
    })





    },

  }
}
</script>


<style lang="stylus" scoped>
#inspire{
  padding-right :50px;
}

</style>
