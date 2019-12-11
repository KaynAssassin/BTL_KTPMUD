<template>
  <div class="horario">
    <v-data-table
      :headers="headers"
      :items="order"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.customer_id }}</td>
        <td class="text-xs-left">{{ props.item.order_status }}</td>
        <td class="text-xs-left">{{ props.item.order_date }}</td>
        <td class="text-xs-left">{{ props.item.required_date }}</td>
        <td class="text-xs-left">{{ props.item.shipped_date }}</td>
        <td class="text-xs-left">{{ props.item.store_id }}</td>
        <td class="text-xs-left">{{ props.item.staff_id }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteHorario(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getData">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from "@/Services/ApiService";
export default {
  name: "order",
  data() {
    return {
      order: [],
      dialog: false,
      editedIndex: -1,
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id"
        },
        {
          text: "Customer ID",
          align: "left",
          sortable: true,
          value: "customer_id"
        },
        {
          text: "Trạng thái đơn hàng",
          align: "left",
          sortable: false,
          value: "order_status"
        },
        {
          text: "Ngày đặt hàng",
          align: "left",
          sortable: false,
          value: "order_date"
        },
        {
          text: "Ngày yêu cầu",
          align: "left",
          sortable: false,
          value: "required_date"
        },
        {
          text: "Ngày ship",
          align: "left",
          sortable: false,
          value: "shipped_date"
        },
        {
          text: "Mã cửa hàng",
          align: "left",
          sortable: false,
          value: "store_id"
        },
        {
          text: "Mã nhân viên",
          align: "left",
          sortable: false,
          value: "staff_id"
        },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    async getData() {
      const responseHor = await apiService.fetchorder();
      this.order = responseHor.data;
      const responseDoc = await apiService.fetchDocentes();
      this.docentes = responseDoc.data;
      const responseMat = await apiService.fetchMaterias();
      this.materias = responseMat.data;
      const responseAu = await apiService.fetchAulas();
      this.aulas = responseAu.data;
    },

    async save() {
      try {
        if (this.editedIndex === -1) {
          await apiService.addHorario(this.editedItem);
          this.order.push(this.editedItem);
        } else {
          await apiService.updateHorario(this.editedItem);
          Object.assign(this.order[this.editedIndex], this.editedItem);
        }
      } catch (err) {
        return console.log(err.message);
      } finally {
        this.close();
      }
    },

    async deleteHorario(horario) {
      const $this = this;
      $this
        .$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            apiService.deleteHorario(horario.idhorario);
            const index = this.order.indexOf(horario);
            this.order.splice(index, 1);
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.order.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>

<style></style>
