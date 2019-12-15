<template>
  <div class="customer">
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
      :items="customers"
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

        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteCustomer(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getCustomer()">Reset</v-btn>
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
      customers: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        street: "",
        city: ""
      },
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        {
          text: "First name",
          align: "left",
          sortable: false,
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

        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  mounted() {
    this.getCustomer();
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
    async getCustomer() {
      const response = await apiService.fetchCustomer();
      this.customers = response.data;
    },

    save() {
      if (this.editedIndex === -1) {
        console.log(this.editedItem);
        apiService.addCustomer(this.editedItem);
        this.customers.push(this.editedItem);
      } else {
        apiService.updateCustomer(this.editedItem);
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      }
      this.close()
    },

    async deleteCustomer(customer) {
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
            apiService.deleteCustomer(customer.id);
            const index = this.customers.indexOf(customer);
            this.customers.splice(index, 1);
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
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
