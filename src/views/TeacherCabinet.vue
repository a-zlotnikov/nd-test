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
                <v-list-item v-for="(question, i) in questions" :key="i">
                  <v-list-item-content v-text="question.title"></v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
         </v-card>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar'
  import vue2Dropzone from "vue2-dropzone"
  import "vue2-dropzone/dist/vue2Dropzone.min.css"

  export default {
    name: 'TeacherCabinet',
    data: (vm) => {
      return {
        addMessageDialog: false,
        username: 'преподаватель',
        questions: [
          {
            title: 'Вопрос №1',
            text: 'Почём рыбка?',

            opened: false
          },
          {
            title: 'Вопрос №2',
            text: 'Почём мяско?',

            opened: false
          },
          {
            title: 'Вопрос №3',
            text: 'Почём молочко?',

            opened: false
          }
        ],
        dropzoneOptions: {
          url: "",
          thumbnailWidth: 100,
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
              vm.cancelFileUpload()
              vm.getMeetingMediaDropzone()
              vm.refresh()
            })
          }
        }
      }
    },
    components: {
      Navbar,
      vueDropzone: vue2Dropzone
    },
    methods: {
      openMessageDialog() {
        this.addMessageDialog = true
      }
    }
  };
</script>

<style scoped>

</style>
