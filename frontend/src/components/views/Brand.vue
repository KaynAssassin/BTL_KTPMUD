<template>
  <div class="aula">
    <div class="formodal">
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Thêm thương hiệu</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Tên" v-model="editedItem.brand_name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :items="brand"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.brand_name }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteAula(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getaula">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import apiService from '@/Services/ApiService'
export default {
  name: 'brand',
  data () {
    return {
      brand: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        brand_name: '',
      },
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Tên',
          align: 'left',
          sortable: true,
          value: 'brand_name'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ]
    }
  },
  mounted () {
    this.getaula()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    async getaula () {
      const response = await apiService.fetchAulas()
      this.aulas = response.data
    },

    async save () {
      try {
        if (this.editedIndex === -1) {
          await apiService.addAula(this.editedItem)
          this.aulas.push(this.editedItem)
        } else {
          await apiService.updateAula(this.editedItem)
          Object.assign(this.aulas[this.editedIndex], this.editedItem)
        }
      } catch (err) {
        return console.log(err.message)
      } finally {
        this.close()
      }
    },

    async deleteAula (aula) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          apiService.deleteAula(aula.idaula)
          const index = this.aulas.indexOf(aula)
          this.aulas.splice(index, 1)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.aulas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>

</style>
