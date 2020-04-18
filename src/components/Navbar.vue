<template>
  <v-toolbar color="primary" height="48" class="main-toolbar pl-0" fixed scroll-off-screen dark app>
    <v-toolbar-title class="ml=0">
      <div class="d-flex pl-2">
        {{category}}
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
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
