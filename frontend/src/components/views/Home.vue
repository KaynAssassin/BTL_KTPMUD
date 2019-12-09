<template>
  <div class="home">
    <v-jumbotron color="white">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h2 class="display-3">Quản lí cửa hàng</h2>
            <span class="subheading" v-text="msg"></span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">Xem thêm về Project</div>
            <a href="https://github.com/KaynAssassin" target="_blank"><v-btn large color="primary" class="mx-0">
              See more
            </v-btn></a>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Bài tập lớn môn Kĩ thuật phần mềm ứng dụng'
    }
  }
}
</script>

<style>

</style>
