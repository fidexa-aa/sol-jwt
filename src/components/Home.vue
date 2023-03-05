<template>
  <div id="app">
    <h1>Google Sign in and Transaction Signing</h1>
    <h2>
      <a href="/signup">Create a new smart contract wallet</a>
      |
      <a href="/sign">Sign a transaction</a>
    </h2>
    <div v-bind="error"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      error: ""
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
