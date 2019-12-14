import Api from '@/Services/Api'

export default {
  userLogin (params) {
    return Api().post('/user/login', params)
  },
  addUser (params) {
    return Api().post('/user', params)
  },
  fetchBrands () {
    return Api().get('/brands')
  },
  addBrand (params) {
    return Api().post('/brands/' , params)
  },

  updateBrand(params){
    return Api().put('/brands/?id=' + params.id,params)
  },

  deleteBrand(id){
    return Api().delete('/brands/?id=' + id)
  },

  addCategory (params) {
    return Api().post('/category', params)
  },
  updateCategory (params) {
    return Api().put('/category/?id=' + params.id,params)
  },

  fetchCategory () {
    return Api().get('/category')
  },
  deleteCategory (id) {
    return Api().delete('/category/?id=' + id)
  },
  addProduct (params) {
    return Api().post('/product', params)
  },
  updateProduct (params) {
    return Api().put('/product/?id=' + params.id, params)
  },

  fetchProduct () {
    return Api().get('/product')
  },
  deleteProduct (id) {
    return Api().delete('/product/?id=' + id)
  },
  addMateria (params) {
    return Api().post('/materia', params)
  },
  updateMateria (params) {
    return Api().put('/materia/' + params.idmateria, params)
  },

  fetchHorarios () {
    return Api().get('/horario')
  },
  deleteHorario (id) {
    return Api().delete('/horario/' + id)
  },
  addHorario (params) {
    return Api().post('/materia', params)
  },
  updateHorario (params) {
    return Api().put('/horario/' + params.idhorario, params)
  }
}
