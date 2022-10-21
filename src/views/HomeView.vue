<template>
  <SiderBar title="DASHBOARD">
    <div class="container-fluid m-2">
      <div class="row">
          <div class="col-lg-12">
              <div class="row">
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-body">
                      <center>
                        <h5 class="card-title">Total de Ingresos</h5>
                      <h1>{{ins}}</h1>
                      </center>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-body">
                      <center>
                        <h5 class="card-title">Total de Traslados</h5>
                        <h1>{{outs}}</h1>
                      </center>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-body">
                      <center>
                      <h5 class="card-title">Total en Inventario</h5>
                      <h1>{{inventary}}</h1>
                    </center>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
  </SiderBar>
  </template>
  <script>
import SiderBar from '@/components/SiderBar.vue';
import axios from 'axios';
  export default {
    data() {
        return {
          ins: 0,
          outs: 0,
          inventary: 0
        };
    },
    methods: {
      getDashboard: async function(){
        let response
        try {
          try {
                response = await axios.get(`${process.env.VUE_APP_API_URL}/dashboard`,{headers: {
                    Authorization: 'Bearer '+localStorage.getItem("token")
                }})
            } catch (error) {
                response = [];
            }
        } catch (error) {
            response = null;
        }
        if(response!==null){
          response = response.data
          this.ins = response.ins;
          this.outs = response.outs;
          this.inventary = response.inventary;
        }
      }
    },
    created(){
      this.getDashboard();
    },
    components: { SiderBar }
}
  </script>
  <style>
  
  </style>