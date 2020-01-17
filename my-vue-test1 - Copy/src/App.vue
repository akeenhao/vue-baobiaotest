<template>
  <div id="app">
    <!--    <nav class="top-menu">-->
    <!--      <ul>-->
    <!--        <li v-for="item in menuList">-->
    <!--          <router-link :to="item.url">{{ item.name }}</router-link>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </nav>-->
    <!--    <hr>-->

    <div style="float: left;margin-right: 20px" >





      <el-menu theme="dark" class="el-menu-demo" mode="horizontal" router>
          <li v-for="item in menuList">
            <el-menu-item :index="item.url">
              <router-link :to="item.url">{{ item.name }}</router-link>
            </el-menu-item>
          </li>
      </el-menu>
    </div>

    <div style="float: left;margin-right: 20px" >
      <router-view></router-view>
    </div>



  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        menuList: [
          {name: '首页', url: '/home'},
          {name: 'hello页', url: '/hello'},
        ]
      }
    }
  }
</script>

<style>
  #app {

  }

  .top-menu ul, .top-menu li {
    list-style: none;
  }

  .top-menu {
    overflow: hidden;
  }

  .top-menu li {
    float: left;
    width: 100px;
  }
</style>
