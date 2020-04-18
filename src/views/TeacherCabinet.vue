<template>
  <div>
  <Navbar category="Преподаватель"/>
    <v-app class="primary lighten-2 split-bg">
      <v-container >
        <v-layout align-center justify-center>
         <v-card width="1200px" class="mt-4">
            <v-card-title>Здравствуйте, {{this.username}}</v-card-title>
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
