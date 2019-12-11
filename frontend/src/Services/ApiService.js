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
  deleteDocente (id) {
    return Api().delete('/docente/' + id)
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
  addAula (params) {
    return Api().post('/aula', params)
  },
  updateAula (params) {
    return Api().put('/aula/' + params.idaula, params)
  },

  fetchMaterias () {
    return Api().get('/materia')
  },
  deleteMateria (id) {
    return Api().delete('/materia/' + id)
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
