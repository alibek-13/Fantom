<template>
  <div id="app">
    <div class="globalWrap">
      <div class="appHeader">
        <div class="logotipp"><img alt="zero" src=""></div>
        <div id="nav">
          <router-link to="/">Главная</router-link>
          <router-link to="/portfolio">Портфолио сайтов</router-link>
          <router-link to="/Blog">Блог</router-link>
          <router-link to="/Registratsion">Авторизация</router-link>
          <router-link to="/Contact">Контакты</router-link>
        </div>
        <div class="Aboute">
          <router-link to="/about">Связаться с нами</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: red;
}

#nav a {
  margin: 2px;
  text-decoration: none;
  color: #2c3e50;
}
.appHeader {
  padding: 10px;

  text-align: start;
  display: flex;

  justify-content: space-around;
}
.logotipp {
  color: red;
}
.Aboute a{
    margin: 2px;
  text-decoration: none;
  color: red;
}
</style>
