<template>
  <div class="docente">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2"
          >Thêm sản phẩm</v-btn
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
                    label="Tên sản phẩm"
                    v-model="editedItem.product_name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="brands"
                    label="Thương hiệu"
                    v-model="editedItem.brand_id"
                    item-text="brand_name"
                    item-value="id"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="categories"
                    label="Chủng loại"
                    v-model="editedItem.category_id"
                    item-text="category_name"
                    item-value="id"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Giá"
                    v-model="editedItem.price"
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
      :items="products"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.product_name }}</td>
        <td class="text-xs-left">{{ getBrandName(props.item.brand_id) }}</td>
        <td class="text-xs-left">{{ getCategoryName(props.item.category_id) }}</td>
        <td class="text-xs-left">{{ new Date(+props.item.date_import) }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteProduct(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getProduct">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from "@/Services/ApiService";
export default {
  name: "Product",
  data() {
    return {
      products: [],
      brands: [],
      categories: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        product_name: "",
        brand_id: "",
        category_id: "",
        price: ""
      },
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id"
        },
        {
          text: "Tên sản phẩm",
          align: "left",
          sortable: true,
          value: "product_name"
        },
        {
          text: "Thương hiệu",
          align: "left",
          sortable: false,
          value: "brand_id"
        },
        {
          text: "Chủng loại",
          align: "left",
          sortable: false,
          value: "category_id"
        },
        {
          text: "Ngày thêm",
          align: "left",
          sortable: false,
          value: "date_import"
        },
        {
          text: "Giá",
          align: "left",
          sortable: false,
          value: "price"
        },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  mounted() {
    this.getProduct();
    this.getbrand();
    this.getCategory();
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
    async getProduct() {
      const response = await apiService.fetchProduct();
      this.products = response.data;
    },

    async getbrand() {
      const response = await apiService.fetchBrands();
      this.brands = response.data;
    },

    async getCategory() {
      const response = await apiService.fetchCategory();
      this.categories = response.data;
    },

    getBrandName(id){
      for(let i of this.brands){
        if(+i.id === +id){
          return i.brand_name
        }
      }
    },

    getCategoryName(id){
      for(let i of this.categories){
        if(+i.id === +id){
          return i.category_name
        }
      }
    },

    save() {
      
      if (this.editedIndex === -1) {
        this.editedItem.date_import = new Date().getTime().toString()
        this.editedItem.price = +this.editedItem.price
        apiService.addProduct(this.editedItem);
        this.products.push(this.editedItem);
      } else {
        apiService.updateProduct(this.editedItem);
        Object.assign(this.products[this.editedIndex], this.editedItem);
      }
      this.close()
    },

    async deleteProduct(product) {
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
            apiService.deleteProduct(product.id);
            const index = this.products.indexOf(product);
            this.products.splice(index, 1);
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
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
