<template>
  <v-toolbar color="primary" height="48" class="main-toolbar pl-0" fixed scroll-off-screen dark app>
    <v-toolbar-title class="ml=0">
      <div class="d-flex pl-2">
        {{category}}
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/teacher" v-if="this.category.toString() === 'Студент'"><div class="white--text mr-4">К преподавателю</div></router-link>
    <router-link to="/student" v-else-if="this.category.toString() === 'Преподаватель'"><div class="white--text mr-4">К студенту</div></router-link>
    <v-icon class="mr=0" @click="logout">logout</v-icon>
  </v-toolbar>
</template>

<script>
  export default {
    props: [
      'category'
    ],
    name: 'Navbar',
    methods: {
      logout() {
    this.$router.push('/')
  }
    }
  };
</script>

<style scoped>

</style>
