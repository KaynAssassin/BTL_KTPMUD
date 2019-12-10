<template>
  <div class="materia">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2"
          >Thêm khách hàng</v-btn
        >
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="First name"
                    v-model="editedItem.first_name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Last name"
                    v-model="editedItem.last_name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Số điện thoại"
                    v-model="editedItem.phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Email"
                    v-model="editedItem.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Địa chỉ"
                    v-model="editedItem.street"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Thành phố"
                    v-model="editedItem.city"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Trạng thái"
                    v-model="editedItem.state"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :items="customer"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.first_name }}</td>
        <td class="text-xs-left">{{ props.item.last_name }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.street }}</td>
        <td class="text-xs-left">{{ props.item.city }}</td>
        <td class="text-xs-left">{{ props.item.state }}</td>

        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteMateria(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getMateria">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from "@/Services/ApiService";
export default {
  name: "customer",
  data() {
    return {
      customer: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        idmateria: "",
        name: "",
        codmat: ""
      },
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id"
        },
        {
          text: "First name",
          align: "left",
          sortable: true,
          value: "first_name"
        },
        {
          text: "Last name",
          align: "left",
          sortable: false,
          value: "last_name"
        },
        {
          text: "Phone",
          align: "left",
          sortable: false,
          value: "phone"
        },
        {
          text: "Email",
          align: "left",
          sortable: false,
          value: "email"
        },
        {
          text: "Địa chỉ",
          align: "left",
          sortable: false,
          value: "street"
        },
         {
          text: "Thành phố",
          align: "left",
          sortable: false,
          value: "city"
        },
         {
          text: "Trạng thái",
          align: "left",
          sortable: false,
          value: "state"
        },
        
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  mounted() {
    this.getMateria();
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
    async getMateria() {
      const response = await apiService.fetchMaterias();
      this.materias = response.data;
    },

    async save() {
      try {
        if (this.editedIndex === -1) {
          await apiService.addMateria(this.editedItem);
          this.materias.push(this.editedItem);
        } else {
          await apiService.updateMateria(this.editedItem);
          Object.assign(this.materias[this.editedIndex], this.editedItem);
        }
      } catch (err) {
        return console.log(err.message);
      } finally {
        this.close();
      }
    },

    async deleteMateria(materia) {
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
            apiService.deleteMateria(materia.idmateria);
            const index = this.materias.indexOf(materia);
            this.materias.splice(index, 1);
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.materias.indexOf(item);
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
