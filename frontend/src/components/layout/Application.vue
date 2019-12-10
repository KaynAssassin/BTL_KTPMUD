<template>
  <div>
    <v-app>
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <v-list dense v-if="loggedIn">
          <v-list-tile
            v-for="(item, i) in menu"
            :key="i"
            :to="{ path: item.path }"
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.label"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="primary"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon
            @click.stop="drawer = !drawer"
          ></v-toolbar-side-icon>
          <span class="hidden-sm-and-down" v-text="appTitle"></span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          prepend-icon="search"
          label="Tìm kiếm"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-menu v-if="!loggedIn" open-on-hover top offset-y>
          <v-btn icon large slot="activator">
            <v-avatar size="32px" tile>
              <img src="../../assets/user-icon.svg" alt="Login" />
            </v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile
              :key="items.login.title"
              @click.stop="dialogLogin = true"
            >
              <v-list-tile-title v-text="items.login.title"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              :key="items.register.title"
              @click.stop="dialogRegister = true"
            >
              <v-list-tile-title
                v-text="items.register.title"
              ></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn v-else>{{role}}</v-btn>
        <v-dialog v-model="dialogLogin" max-width="800px">
          <v-card>
            <v-card-text>
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>
              <v-alert
                outline
                color="error"
                icon="warning"
                :value="error"
                v-text="error"
              ></v-alert>
              <v-form v-model="valid" ref="formLogin" lazy-validation>
                <v-text-field
                  prepend-icon="person"
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                  type="text"
                  placeholder="example@gmail.com"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  label="Password"
                  v-model="password"
                  :rules="passwordRules"
                  :counter="10"
                  required
                  type="password"
                  placeholder="your password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed large color="primary" @click.prevent="login"
                >Đăng nhập
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogRegister" max-width="800px">
          <v-card>
            <v-card-text>
              <v-card-title>
                <span class="headline">Đăng kí</span>
              </v-card-title>
              <v-alert
                outline
                color="error"
                icon="warning"
                :value="error"
                v-text="error"
              ></v-alert>
              <v-form v-model="valid2" ref="formRegister" lazy-validation>
                <v-text-field
                  prepend-icon="face"
                  label="First name"
                  v-model="register.first_name"
                  :rules="nameRules"
                  required
                  type="text"
                  placeholder="First name"
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  label="Lastname"
                  v-model="register.last_name"
                  :rules="nameRules"
                  required
                  type="text"
                  placeholder="Last name"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mail"
                  label="Email"
                  v-model="register.email"
                  :rules="emailRules"
                  required
                  type="text"
                  placeholder="Email"
                ></v-text-field>
                <v-text-field
                  prepend-icon="phone"
                  label="Phone"
                  v-model="register.phone"
                  required
                  type="text"
                  placeholder="123456789"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  label="Password"
                  v-model="register.password"
                  :rules="passwordRules"
                  :counter="20"
                  required
                  type="password"
                  placeholder="Password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                large
                color="primary"
                dark
                @click.prevent="addUser"
                >Xác nhận</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app fixed color="primary" dark>
        <span>&copy; 2019-Kayn Assassin</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import apiService from "@/Services/ApiService";

export default {
  mounted() {
    this.path = this.$route.path;
    this.role = this.getCookie("role")
  },
  data() {
    return {
      tabs: null,
      dialogLogin: false,
      dialogRegister: false,
      drawer: null,
      role: "",
      appTitle: "Trang quản lí ",
      loginTitle: "Login Form",
      path: "/",
      menu: [
        { path: "/", label: "Trang chủ", icon: "home" },
        { path: "/api/product", label: "Sản phẩm", icon: "list" },
        { path: "/api/category", label: "Chuyên mục", icon: "class" },
        { path:"/api/brand",label:"Thương hiệu",icon:"book"},
        { path: "/api/customer", label: "Khách hàng", icon: "description" },
        { path: "/api/order", label: "Đơn hàng", icon: "event" },
        { path: "/logout", label: "Đăng xuất", icon: "lock" }
      ],
      items: {
        login: { title: "Đăng nhập" },
        register: { title: "Đăng kí" }
      },
      register: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""
      },
      valid: true,
      valid2: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length <= 10 || "Password must be less than 10 characters"
      ],
      error: false
    };
  },
  computed: {
    loggedIn: {
      get: () => {
        return Boolean(localStorage.getItem("user"));
      }
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
    }
  },
  methods: {
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    login() {
      if (this.$refs.formLogin.validate()) {
        apiService
          .userLogin({
            email: this.email,
            password: this.password
          })
          .then(response => this.loginSuccessful(response))
          .catch(response => this.loginFailed(response));
      }
    },
    loginSuccessful(response) {
      this.error = false;
      localStorage.user = JSON.stringify(response.data);
      document.cookie = "session_id=" + response.data.session_id;
      document.cookie = "role=" + response.data.role;
      this.$router.replace("/");
      this.$router.go("/");
    },
    loginFailed(response) {
      this.error = response.response.data.message || "Error Login";
      delete localStorage.token;
    },
    addUser() {
      if (this.$refs.formRegister.validate()) {
        apiService
          .addUser({
            first_name: this.register.first_name,
            last_name: this.register.last_name,
            email: this.register.email,
            phone: this.register.phone,
            password: this.register.password
          })
          .then(response => {
            this.loginSuccessful(response);
          })
          .catch(response => this.loginFailed(response));
      }
    }
  }
};
</script>

<style></style>
