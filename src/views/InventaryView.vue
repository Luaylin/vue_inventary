<template>
  <SiderBar title="INVENTARIO">
    <div class="container-fluid m-2">
      <div class="row">
        <br />
        <div>
          <button class="btn btn-danger" @click="generateReport">PDF</button>
        </div>
        <div class="m-2"></div>
        <div class="table-responsive">
          <table class="table">
            <thead class="table-dark text-center">
              <tr>
                <th scope="col" rowspan="2">N° DE ORDEN</th>
                <th scope="col" colspan="9">DESCRIPCIÓN</th>
                <th scope="col" rowspan="2">OBSERVACIONES</th>
                <th scope="col" rowspan="2">UNIDAD ORGANICA</th>
                <th scope="col" rowspan="2">LOCAL</th>
                <th scope="col" rowspan="2">DNI RESPONSABLE</th>
                <th scope="col" rowspan="2">RESPONSABLE</th>
              </tr>
              <tr>
                <th scope="col">CÓDIGO PATRIMONIAL</th>
                <th scope="col">DENOMINACIÓN</th>
                <th scope="col">MARCA</th>
                <th scope="col">MODELO</th>
                <th scope="col">COLOR</th>
                <th scope="col">SERIE</th>
                <th scope="col">LOTE</th>
                <th scope="col">OTROS</th>
                <th scope="col">ESTADO DE CONSERVACIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-dark text-center">
                <th scope="row">
                  <button class="btn btn-primary" @click="getInventary">
                    Filtrar
                  </button>
                </th>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.patrimonial_code"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.denomination"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.brand"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.model"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.color"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.serie"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.lot"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.others"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.conservation_state"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.observations"
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr
                class="text-center"
                v-for="(item, index) in inventary"
                :key="index"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.patrimonial_code }}</td>
                <td>{{ item.denomination }}</td>
                <td>{{ item.brand }}</td>
                <td>{{ item.model }}</td>
                <td>{{ item.color }}</td>
                <td>{{ item.serie }}</td>
                <td>{{ item.lot }}</td>
                <td>{{ item.others }}</td>
                <td>{{ item.conservation_state }}</td>
                <td>{{ item.observations }}</td>
                <td>{{ item.unit_organic }}</td>
                <td>{{ item.local }}</td>
                <td>{{ item.responsible_document }}</td>
                <td>{{ item.responsible_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </SiderBar>
</template>

<script>
import SiderBar from "@/components/SiderBar.vue";
import axios from "axios";
export default {
  data() {
    return {
      inventary: [],
      filter: {
        patrimonial_code: "",
        denomination: "",
        brand: "",
        model: "",
        color: "",
        serie: "",
        lot: "",
        others: "",
        conservation_state: "",
        observations: "",
      },
    };
  },
  methods: {
    clearParams(o) {
      var v = {};
      for (var key in o) {
        if (Object.prototype.hasOwnProperty.call(o, key)) {
          var value = o[key];
          if (value) {
            v[key] = value;
          }
        }
      }
      return v;
    },
    getInventary: async function () {
      let response;
      try {
        response = await axios.get(
          `${process.env.VUE_APP_API_URL}/inventary/${0}/${20}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: this.clearParams(this.filter),
          }
        );
      } catch (error) {
        response = null;
      }
      if (response !== null) {
        this.inventary = response.data.data;
      }
    },
    generateReport: async function () {
      let reportUrl = `${process.env.VUE_APP_API_URL}/report?type=inventary`;
      window.open(reportUrl, "_blank");
    },
  },
  created() {
    this.getInventary();
  },
  components: { SiderBar },
};
</script>