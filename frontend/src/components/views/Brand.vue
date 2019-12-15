<template>
  <div class="brand">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2"
          >Thêm thương hiệu</v-btn
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
                    label="Tên"
                    v-model="editedItem.brand_name"
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
      :items="brands"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.brand_name }}</td>
        <td class="text-xs-left">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteBrand(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getbrand">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from "@/Services/ApiService";
export default {
  name: "brand",
  data() {
    return {
      brands: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        brand_name: ""
      },
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        {
          text: "Tên",
          align: "left",
          sortable: false,
          value: "brand_name"
        },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  mounted() {
    this.getbrand();
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
    async getbrand() {
      const response = await apiService.fetchBrands();
      this.brands = response.data;
    },

    save() {
      if (this.editedIndex === -1) {
        apiService.addBrand(this.editedItem);
        this.brands.push(this.editedItem);
      } else {
        apiService.updateBrand(this.editedItem);
        Object.assign(this.brands[this.editedIndex], this.editedItem);
      }
      this.close()
    },

    async deleteBrand(brand) {
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
            apiService.deleteBrand(brand.id);
            const index = this.brands.indexOf(brand);
            this.brands.splice(index, 1);
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.brands.indexOf(item);
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
