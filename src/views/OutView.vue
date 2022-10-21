<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
            Registrar Detalle
        </div>

        <div class="modal-body">
            <div class="row">
              <div class="col-10">
                <input type="text" class="form-control" placeholder="Codigo Patrimonial" v-model="detail.patrimonial_code">
              </div>
              <div class="col-2">
                <button class="btn btn-primary" @click="searchInventary">Buscar</button>
              </div>
            </div>
            <br>
            <input type="text" class="form-control" placeholder="Denominación" v-model="detail.denomination" readonly>
            <br>
            <input type="text" class="form-control" placeholder="N° Lote" v-model="detail.lot" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Marca" v-model="detail.brand" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Modelo" v-model="detail.model" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Color" v-model="detail.color" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Dimensiones" v-model="detail.dimensions" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Serie" v-model="detail.serie" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Estado de Conservación" v-model="detail.conservation_state" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Otros" v-model="detail.others" readonly>
            <br>
            <input type="text" class="form-control" placeholder="Observaciones" v-model="detail.observations" readonly>
        </div>
        <br>
            <button @click="hideModal()" class="btn btn-danger">
                CANCELAR
              </button>
            <button class="modal-default-button btn btn-success" @click="registerDetail()">
                GRABAR
            </button>
      </div>
    </div>
  </div>
    <SiderBar title="TRASLADOS">
        <div class="container-fluid m-2">
          <div class="row">
              <div class="">
                <h3>Datos del Traslado</h3>
                <br>
                <div class="row">
                  <div class="col-md-6">
                    <label>Tipo:</label>
                    <select class="form-select" aria-label="Default select example" v-model="type">
                      <option value="S">SALIDA</option>
                      <option value="R">REINGRESO</option>
                      <option value="D">DESPLAZAMIENTO</option>
                    </select>
                    <br>
                  </div>
                  <div class="col-md-6">
                    <label>Motivo:</label>
                    <select class="form-select" aria-label="Default select example" v-model="reason">
                      <option value="M">MANTENIMIENTO</option>
                      <option value="CO">COMISIÓN DE SERVICIOS</option>
                      <option value="CA">CAPACITACIÓN Y/O EVENTO</option>
                    </select>
                    <br>
                  </div>
                  <div class="col-md-6">
                    <input type="date" class="form-control"  placeholder="Fecha" v-model="date">
                    <br>
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control"  placeholder="Documento que autorice el traslado" v-model="document">
                    <br>
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control"  placeholder="Codigo de Registro" v-model="register_code">
                    <br>
                  </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h5>DATOS DEL RESPONSABLE</h5>
                        <div class="row">
                          <div class="col-md-10">
                            <input type="text" class="form-control"  placeholder="D.N.I." v-model="responsable.dni">
                          </div>
                          <div class="col-2">
                            <button class="btn btn-primary" @click="findResponsable">Buscar</button>
                          </div>
                        </div>
                        <br>
                        <input type="text" class="form-control"  placeholder="Nombres y Apellidos" v-model="responsable.fullname">
                        <br>
                        <input type="text" class="form-control"  placeholder="Correo Electrónico" v-model="responsable.email">
                        <br>
                        <input type="text" class="form-control"  placeholder="Órgano o Unidad Organica" v-model="responsable.unit_organic">
                        <br>
                        <input type="text" class="form-control"  placeholder="Local o Sede" v-model="responsable.local">
                        <br>
                        <input type="text" class="form-control"  placeholder="Dirección" v-model="responsable.address">
                        <br>
                    </div>
                    <div class="col-md-6">
                      <h5>DATOS DEL DESTINO</h5>
                      <div class="row">
                        <div class="col-md-10">
                          <input type="text" class="form-control"  placeholder="D.N.I." v-model="destino.dni">
                        </div>
                        <div class="col-2">
                          <button class="btn btn-primary" @click="findDestino">Buscar</button>
                        </div>
                      </div>
                      <br>
                      <input type="text" class="form-control"  placeholder="Nombres y Apellidos" v-model="destino.fullname">
                      <br>
                      <input type="text" class="form-control"  placeholder="Correo Electrónico" v-model="destino.email">
                      <br>
                      <input type="text" class="form-control"  placeholder="Órgano o Unidad Organica" v-model="destino.unit_organic">
                      <br>
                      <input type="text" class="form-control"  placeholder="Local o Sede" v-model="destino.local">
                      <br>
                      <input type="text" class="form-control"  placeholder="Dirección" v-model="destino.address">
                      <br>
                  </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary m-2" @click="registerHeaders" v-if="$route.params.id==='create'">GRABAR</button>
                        <button class="btn btn-primary m-2" @click="showModal=true" v-if="$route.params.id!=='create'">AGREGAR</button>
                        <button class="btn btn-danger" v-if="$route.params.id!=='create'">PDF</button>
                        <br>
                    </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                          <th scope="col" rowspan="2" class="text-center">N° DE ORDEN</th>
                          <th scope="col" colspan="8" class="text-center">DESCRIPCIÓN</th>
                          <th scope="col" rowspan="2" class="text-center">OBSERVACIONES</th>
                        </tr>
                        <tr>
                            <th scope="col" class="text-center">CÓDIGO PATRIMONIAL</th>
                            <th scope="col" class="text-center">DENOMINACIÓN</th>
                            <th scope="col" class="text-center">MARCA</th>
                            <th scope="col" class="text-center">MODELO</th>
                            <th scope="col" class="text-center">COLOR</th>
                            <th scope="col" class="text-center">SERIE</th>
                            <th scope="col" class="text-center">OTROS</th>
                            <th scope="col" class="text-center">ESTADO DE CONSERVACIÓN</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in details" :key="index">
                          <td scope="row" class="text-center">{{index+1}}</td>
                          <td class="text-center">{{item.inventary.patrimonial_code}}</td>
                          <td class="text-center">{{item.inventary.denomination}}</td>
                          <td class="text-center">{{item.inventary.brand}}</td>
                          <td class="text-center">{{item.inventary.model}}</td>
                          <td class="text-center">{{item.inventary.color}}</td>
                          <td class="text-center">{{item.inventary.serie}}</td>
                          <td class="text-center">{{item.inventary.others}}</td>
                          <td class="text-center">{{item.inventary.conservation_state}}</td>
                          <td class="text-center">{{item.inventary.observations}}</td>
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
import axios from 'axios';
import moment from 'moment'
    export default {
    data() {
        return {
          type: "S",
          showModal: false,
          reason: "M",
          date: "",
          document:"",
          responsible_user_id: 0,
          destiny_user_id: 0,
          register_code: "",
          details: [],
          findBien: false,
          responsable: {
            dni: "",
            fullname: "",
            email: "",
            unit_organic: "",
            local: "",
            address: "",
            user_id: 0,
            isNewUser: true
          },
          destino: {
            dni: "",
            fullname: "",
            email: "",
            unit_organic: "",
            local: "",
            address: "",
            user_id: 0,
            isNewUser: true
          },
          detail:{
            id: 0,
            patrimonial_code: "",
            denomination: "",
            lot: "",
            brand: "",
            model: "",
            color: "",
            dimensions: "",
            serie: "",
            conservation_state: "",
            others: "",
            observations: ""
          }
        };
    },
    methods: {
      validateIfExist: async function(){
            if(this.$route.params.id!=="create"){
                let response
                try {
                    response = await axios.get(`${process.env.VUE_APP_API_URL}/movement/${this.$route.params.id}`,{},{
                    headers:{
                        Authorization: 'Bearer '+localStorage.getItem("token")
                    }
                })
                } catch (error) {
                    response = null;
                }
                if(response!==null){
                    response = response.data;
                    this.responsable.fullname = response.responsible_user.fullname
                    this.responsable.dni = response.responsible_user.document
                    this.responsable.email = response.responsible_user.email
                    this.destino.fullname = response.destiny_user.fullname
                    this.destino.dni = response.destiny_user.document
                    this.destino.email = response.destiny_user.email
                    this.responsable.unit_organic = response.unit_organic
                    this.responsable.local = response.local
                    this.responsable.address = response.address
                    this.destino.unit_organic = response.unit_organic_destiny
                    this.destino.local = response.local_destiny
                    this.destino.address = response.address_destiny
                    this.date = moment(response.date).format("YYYY-MM-DD")
                    this.register_code = response.register_code
                    this.responsable.isNewUser = false
                    this.destino.isNewUser = false
                    this.responsable.user_id = response.responsible_user.id
                    this.destino.user_id = response.destiny_user.id
                    this.details = response.details
                    this.type = response.type
                    this.reason = response.reason
                    this.document = response.auth_document
                }
            }
        },
        hideModal: function(){
            this.detail = {
                id: 0,
                patrimonial_code: "",
                denomination: "",
                lot: "",
                brand: "",
                model: "",
                color: "",
                dimensions: "",
                serie: "",
                others: "",
                conservation_state: "",
                observations: ""
            };
            this.findBien = false;
            this.showModal = false;
        },
      findResponsable: async function(){
          let response;
          try {
              response = await axios.get(`${process.env.VUE_APP_API_URL}/user/`+this.responsable.dni,{},{
                      headers: {
                          Authorization: "Bearer " + localStorage.getItem("token")
                      }
                  })
          } catch (error) {
              this.responsable.fullname = "";
              this.responsable.email = "";
              this.responsable.user_id = 0
              this.responsable.isNewUser = true;
              alert("Usuario no encontrado")
              response = null;
          }
          if(response!==null){
              this.responsable.dni = response.data.document;
              this.responsable.fullname = response.data.fullname;
              this.responsable.email = response.data.email
              this.responsable.user_id = response.data.id
              this.responsable.isNewUser = false;
          }
      },
      getUserId: async function (user) {
            let response
            if(user.isNewUser){
                try {
                response = await axios.post(`${process.env.VUE_APP_API_URL}/user`, {
                    fullname: user.fullname,
                    document: user.dni,
                    email: user.email
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                } catch (error) {
                    response = null;
                }
                if (response !== null) {
                    response = response.data.id;
                }
            } else {
                response = user.user_id
            }
            return response;
        },
      findDestino: async function(){
          let response;
          try {
              response = await axios.get(`${process.env.VUE_APP_API_URL}/user/`+this.destino.dni,{},{
                      headers: {
                          Authorization: "Bearer " + localStorage.getItem("token")
                      }
                  })
          } catch (error) {
              this.destino.fullname = "";
              this.destino.email = "";
              this.destino.user_id = 0
              this.destino.isNewUser = true;
              alert("Usuario no encontrado")
              response = null;
          }
          if(response!==null){
              this.destino.dni = response.data.document;
              this.destino.fullname = response.data.fullname;
              this.destino.email = response.data.email
              this.destino.user_id = response.data.id
              this.destino.isNewUser = false;
          }
      },
      searchInventary: async function(){
        let response
        try {
          response = await axios.get(`${process.env.VUE_APP_API_URL}/inventary/`+this.detail.patrimonial_code,{},{
            headers: {
              Authorization: 'Bearer '+localStorage.getItem('token')
            }
          })
        } catch (error) {
          response = null;
        }
        if(response!==null){
          response =  response.data
          this.detail.id = response.id
          this.detail.patrimonial_code = response.patrimonial_code;
          this.detail.denomination = response.denomination;
          this.detail.lot  = response.lot;
          this.detail.brand = response.brand;
          this.detail.model = response.model;
          this.detail.color = response.color;
          this.detail.dimensions = response.dimensions;
          this.detail.serie = response.serie;
          this.detail.conservation_state = response.conservation_state;
          this.detail.others = response.others;
          this.detail.observations = response.observations
          this.findBien = true;
        }else {
          this.detail = {
            id: 0,
            patrimonial_code: this.details.patrimonial_code,
            denomination: "",
            lot: "",
            brand: "",
            model: "",
            color: "",
            dimensions: "",
            serie: "",
            conservation_state: "",
            others: "",
            observations: ""
          }
          this.findBien = false;
        }
      },
      registerDetail: async function(){
        let response
        try {
          response = await axios.post(`${process.env.VUE_APP_API_URL}/details/traslate`,{
            movement_id: Number(this.$route.params.id),
            inventary_id: this.detail.id
          }, {
            headers: {
              Authorization: 'Bearer '+localStorage.getItem('token')
            }
          });
        } catch (error) {
          response = null;
        }
        if(response!==null){
          alert("Producto registrado correctamente")
          this.$router.go();
        }
      },
      registerHeaders: async function () {
            let response
            this.responsible_user_id = await this.getUserId(this.responsable);
            this.destiny_user_id = await this.getUserId(this.destino);
            if (response !== null) {
                try {
                    response = await axios.post(`${process.env.VUE_APP_API_URL}/movement`, {
                        register_code: this.register_code,
                        type: this.type,
                        reason: this.reason,
                        auth_document: this.document,
                        unit_organic: this.responsable.unit_organic,
                        local: this.responsable.local,
                        address: this.responsable.address,
                        unit_organic_destiny: this.destino.unit_organic,
                        local_destiny: this.destino.local,
                        address_destiny: this.destino.address,
                        responsible_user_id: this.responsible_user_id,
                        destiny_user_id: this.destiny_user_id,
                        date: moment(this.date, 'YYYY/MM/DD').toDate()
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                } catch (error) {
                    response = null;
                }
                if(response!==null){
                    console.log(response.data)
                    alert("Creado correctamente")
                    this.$router.push({
                    name: "create_movement",
                    params:{
                        id: response.data.id,
                    }
                    });
                } else {
                    alert("Error al crear")
                }
            } else {
                alert("Error al crear el nuevo usuario")
            }
        }
    },
    created(){
      this.validateIfExist()
    },
    components: { SiderBar }
}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-default-button {
    float: right;
  }
  
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>