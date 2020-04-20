<template>
  <div>
    <Navbar category="Студент"/>
    <v-app class="primary lighten-2 split-bg">
      <v-container >
        <v-layout align-center justify-center>
          <v-card width="1200px" class="mt-4">
            <v-card-title>Здравствуйте, {{this.username}}</v-card-title>
            <v-card-text>
              <v-btn @click="openMessageDialog" color="primary" class="mb-6" flat x-large>
                Добавить вопрос
              </v-btn>
              <hr/>
              <h2 class="mt-4 mb-4">История запросов</h2>
              <v-list rounded>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(question, i) in questions" :key="i" @click="showDetailsDialog(question)">
                    <v-list-item-content v-text="question.title"></v-list-item-content>
                    <v-icon
                      v-if="question.answer"
                    >checked</v-icon>

                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-layout>
        <v-dialog v-model="addMessageDialog" v-if="addMessageDialog" persistent width="70%">
          <v-card>
            <v-card-title class="mb-6">Новый вопрос</v-card-title>
            <v-card-text>
              <v-form width="600px">
                <v-text-field
                  name="title"
                  label="Тема вопроса"
                  id="title"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
                ></v-text-field>
                <small
                        class="invalid"
                        v-if="$v.title.$dirty && !$v.title.required"
                >Поле не должно быть пустым</small>
                <v-text-field
                        name="text"
                        label="Текст вопроса"
                        id="text"
                        type="text"
                        v-model="text"
                        :class="{invalid: $v.text.$dirty && !$v.text.required}"
                ></v-text-field>
                <small
                        class="invalid"
                        v-if="$v.text.$dirty && !$v.text.required"
                >Поле не должно быть пустым</small>
                <v-card dark color="white darken-1 align-center mt-2">
                  <v-card-title class="pb-0">
                    <div class="black--text">Добавление файла</div>
                  </v-card-title>

                  <v-card-text>
                    <form ref="form2">
                      <v-layout row align-center class="pb-4">
                        <v-flex xs12>
                          <!--                <VuePerfectScrollbar class="scroll-area-add-files">-->
                          <vue-dropzone
                                  ref="myVueDropzone"
                                  id="dropzone"
                                  :options="dropzoneOptions"
                                  :use-custom-slot="true"
                                  style="min-height: 400px"
                          >
                            <v-layout
                                    row
                                    wrap
                                    align-center
                                    class="dropzone-custom-content"
                                    style="min-height: 400px"
                            >
                              <v-flex xs12>
                                <v-icon x-large color="primary" class="fill-width">cloud_upload</v-icon>

                                <h3
                                        class="dropzone-custom-title fill-width primary--text"
                                >Перетащите файлы сюда</h3>

                                <div
                                        class="subtitle fill-width primary--text"
                                >...или кликните, чтобы выбрать их из папки</div>
                              </v-flex>
                            </v-layout>
                          </vue-dropzone>
                        </v-flex>
                      </v-layout>
                    </form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" @click="cancelMessageDialog">отмена</v-btn>
                    <v-btn class="primary" @click="sendMessage">отправить</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-card-text>
            <v-btn
                    color="primary"
                    icon
                    @click="cancelMessageDialog"
                    style="position:absolute; top:0; right:0"
            >
              <v-icon>clear</v-icon>
            </v-btn>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addDetailsDialog" v-if="addDetailsDialog" persistent width="70%">
         <v-card>
           <v-card-title v-text="selectedQuestion.title" class="mb-6"></v-card-title>
           <v-card-text>
             <v-card class="mb-3">
               <v-card-subtitle>Вопрос:</v-card-subtitle>
               <v-card-text>{{selectedQuestion.text}}</v-card-text>
             </v-card>

             <v-card>
               <v-card-subtitle>Ответ:</v-card-subtitle>
               <v-card-text v-if="selectedQuestion.answer">{{selectedQuestion.answer}}</v-card-text>
               <v-card-text v-else>Преподаватель пока не ответил</v-card-text>
             </v-card>
             <div></div>
           </v-card-text>
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
  import vue2Dropzone from "vue2-dropzone"
  import "vue2-dropzone/dist/vue2Dropzone.min.css"
  import Cookies from 'js-cookie'
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: 'StudentCabinet',
    data: (vm) => {
      return {
        addMessageDialog: false,
        addDetailsDialog: false,
        selectedQuestion: null,
        title: '',
        text: '',
        username: Cookies.get('username'),
        questions: [],
        dropzoneOptions: {
          url: "",
          thumbnailWidth: 70,
          parallelUploads: 1,
          maxFilesize: 0.1,
          autoProcessQueue: false,
          addRemoveLinks: true,
          dictFileTooBig: "Максимальный размер файла {{maxFilesize}}Кб",
          dictRemoveFile: "удалить",
          dictCancelUpload: "отменить",
          dictCancelUploadConfirmation: "Вы действительно хотите прервать загрузку файла?",
          createImageThumbnails: false,
          init() {
            this.on("queuecomplete", () => {
              EventBus.$emit("success")
              vm.cancelMessageDialog()
              vm.getMeetingMediaDropzone()
              vm.refresh()
            })
          }
        }
      }
    },
    validations: {
      title: {required},
      text: {required}
    },
    components: {
      Navbar,
      vueDropzone: vue2Dropzone
    },
    mounted() {
      fetch('./questions')
      .then(
        response => response.json())
      .then(json => {
        console.log(json.response);
        this.questions = json.response
      })
    },
    methods: {
      openMessageDialog() {
        this.addMessageDialog = true
      },
      cancelMessageDialog() {
        this.addMessageDialog = false
      },
      async sendMessage() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        } else {
          let resp = await fetch('/questions/ask-question', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({title: this.title, text: this.text})
          })
          const result = await resp.json()
          if (result.answer === "ok") {
            this.questions.push({
              title: this.title,
              text: this.text
            })
            this.addMessageDialog = false
          }
        }
      },
      showDetailsDialog(question) {
        this.selectedQuestion = Object.assign({}, question)
        this.addDetailsDialog = true
      },
      cancelDetailsDialog() {
        this.selectedQuestion = null
        this.addDetailsDialog = false
      },

    }
  };
</script>

<style scoped>
  .invalid {
    color:red;
  }
</style>
