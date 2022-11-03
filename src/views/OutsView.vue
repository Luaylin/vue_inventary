<template>
    <SiderBar title="TRASLADOS">
        <div class="container-fluid m-2">
          <div class="row">
            <div>
                <router-link class="btn btn-success" to="/out/create">Registrar nuevo</router-link>
                <br>
            </div>
            <div class="m-2"></div>
              <div class="table-responsive">
                <table class="table">
                    <thead class="table-dark text-center">
                        <tr>
                            <th scope="col">CÓDIGO DE REGISTRO</th>
                            <th scope="col">RESPONSABLE</th>
                            <th scope="col">DESTINO</th>
                            <th scope="col">ORGANO O UNIDAD ORGANICA DESTINO</th>
                            <th scope="col">LOCAL O SEDE DESTINO</th>
                            <th scope="col">FECHA</th>
                            <th scope="col">TIPO</th>
                            <th scope="col">ACCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="table-dark text-center">
                            <td><input type="text" class="form-control" v-model="filter.register_code"></td>
                            <td><input type="text" class="form-control" v-model="filter.responsible_user"></td>
                            <td><input type="text" class="form-control" v-model="filter.destiny_user"></td>
                            <td><input type="text" class="form-control" v-model="filter.unit_organic_destiny"></td>
                            <td><input type="text" class="form-control" v-model="filter.local_destiny"></td>
                            <td><input type="date" class="form-control" v-model="filter.datefilter"></td>
                            <td><select class="form-select" v-model="filter.type">
                                <option value="">TODOS</option>
                                <option value="S">SALIDA</option>
                                <option value="R">REINGRESO</option>
                                <option value="D">DESPLAZAMIENTO</option>
                            </select></td>
                            <td><button class="btn btn-primary" @click="getOuts">Filtrar</button></td>
                        </tr>
                        <tr v-for="(item, index) in outs" :key="index">
                          <td class="text-center">{{item.register_code}}</td>
                          <td class="text-center">{{item.responsible_user_name}}</td>
                          <td class="text-center">{{item.destiny_user_name}}</td>
                          <td class="text-center">{{item.unit_organic_destiny}}</td>
                          <td class="text-center">{{item.local_destiny}}</td>
                          <td class="text-center">{{moment(item.date).format('YYYY-MM-DD')}}</td>
                          <td class="text-center">{{item.type==="S"?"SALIDA":item.type==="R"?"REINGRESO":item.type==="D"?"DESPLAZAMIENTO":""}}</td>
                          <td class="text-center"><button class="btn btn-success" @click="selectIngreso(item.id)">Ingresar</button></td>
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
    import axios from 'axios'
    import moment from 'moment';
    export default {
    data() {
        return {
          outs: [],
          filter:{
                register_code: "",
                responsible_user: "",
                destiny_user: "",
                unit_organic_destiny:"",
                local_destiny: "",
                datefilter: "",
                type: ""
            }
        };
    },
    methods: {
      getOuts: async function(){
            let response;
            let date = this.filter.datefilter!==""?moment(this.filter.datefilter, 'YYYY/MM/DD').toDate(): "";
            try {
                response = await axios.get(`${process.env.VUE_APP_API_URL}/movement/${0}/${20}`,{headers: {
                    Authorization: "Bearer "+localStorage.getItem("token")
                }, params:{...this.filter, date: date}})
            } catch (error) {
                response = [];
            }
            this.outs = response.data.data
        },
        selectIngreso: async function(id){
            this.$router.push({
                    name: "create_movement",
                    params:{
                        id: id,
                    }
                    })
        },
        moment: moment
    },
    created(){
      this.getOuts()
    },
    components: { SiderBar }
}
</script>