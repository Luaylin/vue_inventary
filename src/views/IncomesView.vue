<template>
    <SiderBar title="INGRESOS">
        <div class="container-fluid m-2">
          <div class="row">
                
            <div>
                <router-link class="btn btn-success" to="/in/create">Registrar nuevo</router-link>
                <br>
            </div>
            <div class="m-2"></div>
              <div class="table-responsive">
                <table class="table">
                    <thead class="table-dark text-center">
                        <tr>
                            <th scope="col">CÓDIGO DE REGISTRO</th>
                            <th scope="col">USUARIO</th>
                            <th scope="col">ORGANO O UNIDAD ORGANICA</th>
                            <th scope="col">LOCAL O SEDE</th>
                            <th scope="col">FECHA</th>
                            <th scope="col">ACCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="table-dark text-center">
                            <td><input type="text" class="form-control" v-model="filter.register_code"></td>
                            <td><input type="text" class="form-control" v-model="filter.responsible_user"></td>
                            <td><input type="text" class="form-control" v-model="filter.unit_organic"></td>
                            <td><input type="text" class="form-control" v-model="filter.local"></td>
                            <td><input type="date" class="form-control" v-model="filter.datefilter"></td>
                            <td><button class="btn btn-primary" @click="getIncomes">Filtrar</button></td>
                        </tr>
                        <tr v-for="(item, index) in incomes" :key="index">
                          <td class="text-center">{{item.register_code}}</td>
                          <td class="text-center">{{item.responsible_user.fullname}}</td>
                          <td class="text-center">{{item.unit_organic}}</td>
                          <td class="text-center">{{item.local}}</td>
                          <td class="text-center">{{moment(item.date).format("YYYY-MM-DD")}}</td>
                          <td class="text-center"><button class="btn btn-success" @click="selectIngreso(item.id)">Seleccionar</button></td>
                        </tr>
                      </tbody>
                </table>
              </div>
          </div>
      </div>
    </SiderBar>
</template>

<script>
    import SiderBar from '@/components/SiderBar.vue';
    import moment from 'moment'
    import axios from 'axios';
    export default {
    data() {
        return {
            incomes: [],
            filter:{
                register_code: "",
                responsible_user: "",
                unit_organic:"",
                local: "",
                datefilter: ""
            }
        };
    },
    methods: {
        getIncomes: async function(){
            let response;
            try {
                let date = this.filter.datefilter!==""?moment(this.filter.datefilter, 'YYYY/MM/DD').toDate(): "";
                response = await axios.get(`${process.env.VUE_APP_API_URL}/movement/${0}/${20}`,{headers: {
                    Authorization: 'Bearer '+localStorage.getItem("token")
                },
                params:{...this.filter, type: "I", date: date}})
            } catch (error) {
                response = [];
            }
            this.incomes = response.data.data
        },
        selectIngreso: async function(id){
            this.$router.push({
                    name: "create_ingresos",
                    params:{
                        id: id,
                    }
                    })
        },
        moment: moment
    },
    created(){
      this.getIncomes();
    },
    components: { SiderBar }
}
</script>