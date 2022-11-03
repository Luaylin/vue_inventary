<template>
    <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
    
            <div class="modal-header">
                Registrar Detalle
            </div>
    
            <div class="modal-body">
                <input type="text" class="form-control" placeholder="Codigo Patrimonial" v-model="detail.patrimonial_code">
                <br>
                <input type="text" class="form-control" placeholder="Denominación" v-model="detail.denomination">
                <br>
                <input type="text" class="form-control" placeholder="N° Lote" v-model="detail.lot">
                <br>
                <input type="text" class="form-control" placeholder="Marca" v-model="detail.brand">
                <br>
                <input type="text" class="form-control" placeholder="Modelo" v-model="detail.model">
                <br>
                <input type="text" class="form-control" placeholder="Color" v-model="detail.color">
                <br>
                <input type="text" class="form-control" placeholder="Dimensiones" v-model="detail.dimensions">
                <br>
                <input type="text" class="form-control" placeholder="Serie" v-model="detail.serie">
                <br>
                <input type="text" class="form-control" placeholder="Estado de Conservación" v-model="detail.conservation_state">
                <br>
                <input type="text" class="form-control" placeholder="Otros" v-model="detail.others">
                <br>
                <input type="text" class="form-control" placeholder="Observaciones" v-model="detail.observations">
            </div>
            <br>
                <button @click="hideModal()" class="btn btn-danger">
                    CANCELAR
                  </button>
                <button class="modal-default-button btn btn-success" @click="registerInventary()">
                    GRABAR
                </button>
          </div>
        </div>
      </div>
    <SiderBar title="INGRESOS">
        <div class="container-fluid m-2">
            <div class="row">
                <div class="">
                    <h3>Datos del Usuario e Ingreso</h3>
                    <br>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-10">
                                    <input type="text" class="form-control" placeholder="D.N.I." v-model="document">
                                </div>
                                <div class="col-md">
                                    <button class="btn btn-primary" @click="findUser">BUSCAR</button>
                                </div>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Nombres y Apellidos" v-model="fullname" :readonly="!isNewUser">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Correo Electrónico" v-model="email" :readonly="!isNewUser">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Codigo de Registro"
                                v-model="register_code">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Órgano o Unidad Organica"
                                v-model="unit_organic">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Local o Sede" v-model="local">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Dirección" v-model="address">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="date" class="form-control" placeholder="Fecha" v-model="date">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary m-2" @click="registerHeaders">GRABAR</button>
                            <button class="btn btn-primary m-2" @click="showModal=true" v-if="$route.params.id!=='create'">AGREGAR</button>
                            <button class="btn btn-danger m-2" @click="generateReport" v-if="$route.params.id!=='create'">PDF</button>
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
                                <th scope="row" class="text-center">{{index+1}}</th>
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
import moment from 'moment';
export default {
    data() {
        return {
            fullname: "",
            document: "",
            email: "",
            unit_organic: "",
            local: "",
            address: "",
            date: "",
            register_code: "",
            isNewUser: false,
            user_id: 0,
            details: [],
            showModal: false,
            detail:{
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
            }
        };
    },
    methods: {
        validateIfExist: async function(){
            if(this.$route.params.id!=="create"){
                let response
                try {
                    response = await axios.get(`${process.env.VUE_APP_API_URL}/movement/${this.$route.params.id}`,{
                    headers:{
                        Authorization: 'Bearer '+localStorage.getItem("token")
                    }
                })
                } catch (error) {
                    response = null;
                }
                if(response!==null){
                    response = response.data;
                    this.fullname = response.responsible_user.fullname
                    this.document = response.responsible_user.document
                    this.email = response.responsible_user.email
                    this.unit_organic = response.unit_organic
                    this.local = response.local
                    this.address = response.address
                    this.date = moment(response.date).format("YYYY-MM-DD")
                    this.register_code = response.register_code
                    this.isNewUser = false
                    this.user_id = response.responsible_user.id
                    this.details = response.details
                }
            }
        },
        hideModal: function(){
            this.detail = {
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
            this.showModal = false;
        },
        getUserId: async function () {
            let response
            if(this.isNewUser){
                try {
                response = await axios.post(`${process.env.VUE_APP_API_URL}/user/`, {
                    fullname: this.fullname,
                    document: this.document,
                    email: this.email
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
                response = this.user_id
            }
            return response;
        },
        findUser: async function(){
            let response;
            try {
                response = await axios.get(`${process.env.VUE_APP_API_URL}/user/`+this.document,{
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
            } catch (error) {
                this.fullname = "";
                this.email = "";
                this.user_id = 0
                this.isNewUser = true;
                alert("Usuario no encontrado")
                response = null;
            }
            if(response!==null){
                this.document = response.data.document;
                this.fullname = response.data.fullname;
                this.email = response.data.email
                this.user_id = response.data.id
                this.isNewUser = false;
            }
        },
        registerInventary: async function(){
            let response
            console.log(this.detail)
            try {
                response = await axios.post( `${process.env.VUE_APP_API_URL}/details/in`,{
                    data: this.detail,
                    id: this.$route.params.id
                },{
                    headers:{
                        Authorization: 'Bearer '+localStorage.getItem("token")
                    }
                })
            } catch (error) {
                response = null;
            }
            if(response!==null){
                alert("Detalle registrado correctamente")
                this.$router.go();
            }
            this.hideModal();
        },
        registerHeaders: async function () {
            let response
            this.user_id = await this.getUserId();
            if (response !== null) {
                try {
                    response = await axios.post(`${process.env.VUE_APP_API_URL}/movement`, {
                        register_code: this.register_code,
                        type: "I",
                        reason: "",
                        auth_document: "",
                        unit_organic: this.unit_organic,
                        local: this.local,
                        address: this.address,
                        responsible_user_id: this.user_id,
                        destiny_user_id: this.user_id,
                        date:  moment(this.date, 'YYYY/MM/DD').toDate()
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
                    name: "create_ingresos",
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
        },
        generateReport: async function(){
            let reportUrl = `${process.env.VUE_APP_API_URL}/report?type=in&id=${this.$route.params.id}`;
            window.open(reportUrl, '_blank')
        }
    },
    created(){
        this.validateIfExist();
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