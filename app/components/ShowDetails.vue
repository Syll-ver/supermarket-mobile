<template>
    <Page class="page">
      <ActionBar class="action-bar banner">
          <!--
          Use the NavigationButton as a side-drawer button in Android
          because ActionItems are shown on the right side of the ActionBar
          -->
          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
          <!--
          Use the ActionItem for IOS with position set to left. Using the
          NavigationButton as a side-drawer button in iOS is not possible,
          because its function is to always navigate back in the application.
          -->
          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" text="LouGeh Supermarket"/>
      </ActionBar>

      <GridLayout class="page__content">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout>

            <!-- <StackLayout for="del in delivery">
                <v-template>
                  <Label :text="del.dr_no" textWrap="true" />
                </v-template>
                
            </StackLayout> -->
                
                <ListView row="1" class="list-group"
                  for="del in delivery" >
                    <v-template>
                      <GridLayout @tap="show(del)">
                        <GridLayout rows="*,*,*" columns="*,auto">
                          <Label class="text-sub sub-header" :text="del.dr_no" textWrap="true" />
                          <Label col="1" horizontalAlignment="right" class="text-sub sub-header">
                            <FormattedString>
                              <Span text="₱" />
                              <Span :text="del.total_cost" />
                            </FormattedString>
                          </Label>

                          <StackLayout row="1" class="content">
                            <Label class="text-main" :text="del.company_name" textWrap="true" ></Label>
                            <Label :text="del.company_address"></Label>
                          </StackLayout>
                        </GridLayout>
                      </GridLayout>


                      <!-- <GridLayout rows="auto,*,*" columns="*,*,auto"
                        class="list-group">
                          <Label row="1" col="1" class="text-main" :text="del.company_name" textWrap="true" />
                          <Label row="2" col="1" class="text-sub" :text="del.dtransaction_date" textWrap="true" />
                          
                          
                      </GridLayout> -->
                    </v-template>

                </ListView>

            </StackLayout>
      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";

  export default {
    data(){
      return {
        delivery: []
      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onDrawerButtonTap() {
        utils.showDrawer();
      },
      creatingView: function(args) {
        const nativeView = new android.widget.TextView(args.context);
        nativeView.setSingleLine(true);
        nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
        nativeView.setText("Native View - Android");
        args.view = nativeView;
      },
      show(del){
        console.log("clicked!", del);
      }
      
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    
</style>
