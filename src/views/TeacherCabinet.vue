<template>
  <div>
  <Navbar category="Преподаватель"/>
    <v-app class="primary lighten-2 split-bg">
      <v-container >
        <v-layout align-center justify-center>
         <v-card width="1200px" class="mt-4">
            <v-card-title>Здравствуйте, {{this.username}}</v-card-title>
          <v-card-text>
            <h2 class="mt-4 mb-4">Вопросы от студентов</h2>
            <v-list rounded>
              <v-list-item-group color="primary">
                <v-list-item v-for="(question, i) in questions" :key="i" >
                  <v-list-item-content v-text="question.title" @click="showDetailsDialog(question)"></v-list-item-content>
                  <v-icon
                          v-if="question.answer"
                  >checked</v-icon>
                  <v-icon @click.prevent="deleteQuestion(question, i)">clear</v-icon>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
         </v-card>
        </v-layout>
        <v-dialog v-model="addDetailsDialog" v-if="addDetailsDialog" persistent width="70%">
          <v-card>
            <v-card-title v-text="selectedQuestion.title" class="mb-6"></v-card-title>
            <v-card-text>
              <v-card class="mb-3">
                <v-card-subtitle>Вопрос:</v-card-subtitle>
                <v-card-text>{{selectedQuestion.text}}</v-card-text>
                <img :src="selectedQuestion.image" />
              </v-card>

              <v-card>
                <v-card-subtitle>Ответ:</v-card-subtitle>
                <v-card-text v-if="selectedQuestion.answer">{{selectedQuestion.answer}}</v-card-text>
                <v-text-field
                        name="answer"
                        label="Текст ответа"
                        id="answer"
                        type="text"
                        v-model="answer"
                        class="pl-2"
                        :class="{invalid: $v.answer.$dirty && !$v.answer.required}"
                        v-else
                ></v-text-field>
                <small
                        class="invalid pl-2"
                        v-if="$v.answer.$dirty && !$v.answer.required"
                >Поле не должно быть пустым</small>
              </v-card>
              <div></div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" @click="cancelDetailsDialog">отмена</v-btn>
              <v-btn class="primary" @click="sendMessage">отправить</v-btn>
            </v-card-actions>
            <v-btn
                    color="primary"
                    icon
                    @click="cancelDetailsDialog"
                    style="position:absolute; top:0; right:0"
            >
              <v-icon>clear</v-icon>
            </v-btn>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar'
  import Cookies from 'js-cookie'
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: 'TeacherCabinet',
    data: (vm) => {
      return {
        addDetailsDialog: false,
        username: Cookies.get('username'),
        isTeacher: Cookies.get('isTeacher'),
        answer: '',
        selectedQuestion: null,
        questions: [],
      }
    },
    validations: {
      answer: {required}
    },
    mounted() {
      this.authChecker()
      this.updateQuestions()
    },
    components: {
      Navbar
    },
    methods: {
      updateQuestions() {
        fetch('./questions')
        .then(
          response => response.json())
        .then(json => {
          this.questions = json.response
        })
      },
      showDetailsDialog(question) {
        this.selectedQuestion = Object.assign({}, question)
        this.addDetailsDialog = true
      },
      cancelDetailsDialog() {
        this.selectedQuestion = null
        this.addDetailsDialog = false
      },
        async sendMessage() {
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          } else {
            let resp = await fetch('/questions/answer-question', {
              method: 'POST',
              headers: {'Content-type': 'application/json'},
              body: JSON.stringify({answer: this.answer, id: this.selectedQuestion._id})
            })
            const result = await resp.json()
            if (result.succeed === 'ok') {
              this.selectedQuestion = null
              this.addDetailsDialog = false
              this.updateQuestions()
            }
          }
        },
        async deleteQuestion(question, i) {
          let resp = await fetch('/questions/delete-question', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id: question._id})
          })
          const result = await resp.json()
          if (result.answer === "ok") {
            this.questions.splice(i, 1)
          }
        },
        authChecker() {
          if (!this.username) {
            this.$router.push('/')
          } else {
            if (this.isTeacher === 'false') {
              this.$router.push('/student')
            }
          }
        }
      }
  };
</script>

<style scoped>
  .invalid {
    color:red;
  }
  img {
    max-width: 80%;
  }
</style>
