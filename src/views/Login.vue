<template>
  <v-app class="grey split-bg">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3 login-card">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/images/LOGO.png" alt="Vue Material Admin" width="200" />
                  <h2
                          class="flex mb-5 mt-5 primary--text  text-xl-center"
                  >Тестовое задание</h2>
                </div>
                <v-form @submit.prevent="submitHandler">
                  <v-text-field
                          append-icon="person"
                          name="login"
                          id="login"
                          label="Логин"
                          type="text"
                          v-model.trim="login"
                          :class="{invalid: $v.login.$dirty && $v.login.required}"
                  ></v-text-field>
                  <small
                          class="mt-0 invalid"
                          v-if="$v.login.$dirty && !$v.login.required"
                  >Введите логин</small>
                  <v-text-field
                          append-icon="lock"
                          name="password"
                          label="Пароль"
                          id="password"
                          type="password"
                          v-model.trim="password"
                          :class="{invalid: $v.password.$dirty && $v.password.required || ($v.password.$dirty && !$v.password.minLength)}"
                  ></v-text-field>
                  <small
                          class="invalid"
                          v-if="$v.password.$dirty && !$v.password.required"
                  >Введите пароль</small>
                  <small
                          class="invalid"
                          v-else-if="$v.password.$dirty && !$v.password.minLength">
                    Пароль должен содоржать не менее 4 символов</small>
                  <div class="login-btn mt-4">
                    <v-btn block color="primary" type="submit">Войти</v-btn>
                  </div>
                </v-form>

              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {required, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    data: () => ({
      login: '',
      password: ''
    }),
    validations: {
      login: {required},
      password: {required, minLength: minLength(4)}
    },
    methods: {
      submitHandler() {
        if (this.$v.$invalid) {
          this.$v.touch()
          return
        }
        this.$router.push('/student')
      }
    }
  };
</script>

<style scoped>
  .invalid {
    color:red;
  }
</style>
