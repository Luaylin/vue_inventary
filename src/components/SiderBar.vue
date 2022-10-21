<template>
    <div id="wrapper" v-bind:class="showMenu?'toggled':''">
  
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
              <li class="sidebar-brand">
                <router-link to="/">Dashboard</router-link>
              </li>
              <li>
                <router-link to="/in">Ingresos</router-link>
              </li>
              <li>
                <router-link to="/out">Traslados</router-link>
              </li>
              <li>
                <router-link to="/inventary">Inventario</router-link>
              </li>
              <li>
                <button class="btn btn-outline-light" @click="logout">Cerrar Sesión</button>
              </li>
          </ul>
      </div>
      <!-- /#sidebar-wrapper -->
  
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div @click="toggleClick">
            <div class="container" v-bind:class="showMenu?'change':''">
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
            </div>
          </div>
          
          <a class="navbar-brand">{{title}}</a>
        </nav>
          <div class="container-fluid">
              <slot></slot>
          </div>
      </div>
      <!-- /#page-content-wrapper -->
  
  </div>
  <!-- /#wrapper -->
    </template>
    <script>
  
    export default {
    props: {
        title: String
    },
     data () {
          return {
            showMenu :false,
        };
     },
     methods: {
        toggleClick :function() {
          this.showMenu = !this.showMenu;
        },
        logout: function(){
          localStorage.clear();
          this.$router.push({
                    name: "home"
                    })
        }
    }
    }
    </script>
    <style>
    /*!
   * Start Bootstrap - Simple Sidebar (https://startbootstrap.com/)
   * Copyright 2013-2016 Start Bootstrap
   * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
   */
  
   .bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }
  
  .change .bar1 {
    transform: translate(0, 11px) rotate(-45deg);
  }
  
  /* Fade out the second bar */
  .change .bar2 {opacity: 0;}
  
  /* Rotate last bar */
  .change .bar3 {
    transform: translate(0, -11px) rotate(45deg);
  }
  
   body {
    overflow-x: hidden;
  }
  
  /* Toggle Styles */
  
  #wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  
  #wrapper.toggled {
    padding-left: 250px;
  }
  
  #sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 250px;
    width: 0;
    height: 100%;
    margin-left: -250px;
    overflow-y: auto;
    background: #000;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  
  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }
  
  #page-content-wrapper {
    width: 100%;
    position: absolute;
    padding: 15px;
  }
  
  #wrapper.toggled #page-content-wrapper {
    position: absolute;
    margin-right: -250px;
  }
  
  /* Sidebar Styles */
  
  .sidebar-nav {
    position: absolute;
    top: 0;
    width: 250px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .sidebar-nav li {
    text-indent: 20px;
    line-height: 40px;
  }
  
  .sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: #999999;
  }
  
  .sidebar-nav li a:hover {
    text-decoration: none;
    color: #fff;
    background: rgba(255,255,255,0.2);
  }
  
  .sidebar-nav li a:active,
  .sidebar-nav li a:focus {
    text-decoration: none;
  }
  
  .sidebar-nav > .sidebar-brand {
    height: 65px;
    font-size: 18px;
    line-height: 60px;
  }
  
  .sidebar-nav > .sidebar-brand a {
    color: #999999;
  }
  
  .sidebar-nav > .sidebar-brand a:hover {
    color: #fff;
    background: none;
  }
  
    
    </style>