<template>
    <Page class="modal-page" actionBarHidden="true">
      <!-- <ActionBar class="action-bar banner" flat="true">

          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>

          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" text="Inventory"/>
      </ActionBar> -->

        <FlexboxLayout class="page">
            <GridLayout rows="auto,auto,auto">
                <Label row="0"
                    class="fas" 
                    :text=" 'fa-check-circle' | fonticon " 
                />
                <Label row="1"
                    text="Success!" 
                />
                <Label row="2"
                    text="OK"
                    @tap="$modal.close" 
                />
            </GridLayout>
        </FlexboxLayout>
      

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../shared/selected-page-service";

  export default {
    data(){
      return {
        
      }
    },


    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Inventory");
      // const thisBtn = this.$refs.fchildbtn.nativeView
      // let body = this.$refs.body
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .page {
      background: #f5f5f5;
    }

    .bg-back {
      background-color: #05C5AA;
      border-radius: 0 0 60 60;
      margin-bottom: 530;
    }

    .list-box {
      background-color: #ffffff;
      color: #009688;
      padding: 10;
      margin: 5;
      border-radius: 20;
    }
    

    
</style>
