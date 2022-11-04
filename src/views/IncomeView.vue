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
                <small for="" class="form-text text-muted">Estado de Conservación</small>
                <select name="" id="" v-model="detail.conservation_state" class="form-control">
                    <option value="">Seleccione</option>
                    <option value="Malo">Malo</option>
                    <option value="Regular">Regular</option>
                    <option value="Bueno">Bueno</option>
                </select>
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
                            <input type="text" class="form-control" placeholder="Nombres y Apellidos" v-model="fullname">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Correo Electrónico" v-model="email">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Codigo de Registro"
                                v-model="register_code">
                            <br>
                        </div>
                        <div class="col-md-6">
                            <small for="" class="form-text text-muted">Órgano o Unidad Organica</small>
                            <select name="" id="" v-model="unit_organic" class="form-control">
                                <option value="">Seleccione</option>
                                <option v-for="(item, index) in units_organics" :key="index" value="{{item.fullName}}">{{item.fullName}}</option>
                            </select>
                            <br>
                        </div>
                        <div class="col-md-6">
                            <small for="" class="form-text text-muted">Local o Sede</small>
                            <select name="" id="" v-model="local" class="form-control">
                                <option value="">Seleccione</option>
                                <option value="Central">Central</option>
                                <option value="COER">COER</option>
                            </select>
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
                            <button class="btn btn-primary m-2" @click="registerHeaders" v-if="this.$route.params.id==='create'">GRABAR</button>
                            <button class="btn btn-primary m-2" @click="showModal=true" v-if="$route.params.id!=='create'">AGREGAR</button>
                            <button class="btn btn-danger m-2" @click="generateReport" v-if="$route.params.id!=='create'">PDF</button>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="table-responsive" v-if="this.$route.params.id!=='create'">
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
            units_organics: [],
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
    computed:{
      formatearListas(){
        return this.units_organics
      }
    },
    methods: {
        getListOfUnitOrganic: async function(){
        let response
        try {
          response = await axios.get('http://web.regionancash.gob.pe/admin/directory/api/dependency/0/0');
        } catch (error) {
          response = null
        }
        if(response===null){
          alert("Error al traer la lista de Unidades Organicas")
        } else {
          this.units_organics = response.data.data
        }
      },
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
                    this.fullname = response.responsible_user_name
                    this.document = response.responsible_user_document
                    this.email = response.responsible_user_email
                    this.unit_organic = response.unit_organic
                    this.local = response.local
                    this.address = response.address
                    this.date = moment(response.date).format("YYYY-MM-DD")
                    this.register_code = response.register_code
                    this.isNewUser = false
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
        findUser: async function(){
            let response;
            try {
                response = await axios.get(`http://web.regionancash.gob.pe/admin/directory/api/people/0/10?code=${this.document}`);
            } catch (error) {
                this.fullname = "";
                this.email = "";
                response = null;
            }
            if(response!==null && response.data.size===1){
                this.document = response.data.code;
                this.fullname = response.data.data[0].fullName;
                this.email = response.data.data[0].mail
            } else {
                try {
                    response = await axios.post(`http://web.regionancash.gob.pe/api/reniec/`,{
                        dni: this.document
                    });
                } catch (error) {
                    this.fullname = "";
                    this.email = "";
                    response = null
                }
                if(response!==null){
                    this.fullname = response.data.return.datosPersona.apPrimer+" "+response.data.return.datosPersona.apSegundo+" "+response.data.return.datosPersona.prenombres;
                    this.email = ""
                } else {
                    alert("Persona no encontrada")
                }
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
            try {
                    response = await axios.post(`${process.env.VUE_APP_API_URL}/movement`, {
                        register_code: this.register_code,
                        type: "I",
                        reason: "",
                        auth_document: "",
                        unit_organic: this.unit_organic,
                        local: this.local,
                        address: this.address,
                        responsible_user_email: this.email,
                        responsible_user_name: this.fullname,
                        responsible_user_document: this.document,
                        destiny_user_email: this.email,
                        destiny_user_name: this.fullname,
                        destiny_user_document: this.document,
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
        },
        generateReport: async function(){
            let reportUrl = `${process.env.VUE_APP_API_URL}/report?type=in&id=${this.$route.params.id}`;
            window.open(reportUrl, '_blank')
        }
    },
    mounted(){
      this.getListOfUnitOrganic()
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
    overflow-y: scroll;
    max-width: 500px;
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