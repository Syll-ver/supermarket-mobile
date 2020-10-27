<template>
    <Page class="page" actionBarHidden="true">
      <!-- <ActionBar class="action-bar banner">
         
          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
         
          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" text="Suppliers"/>
      </ActionBar> -->

      <GridLayout class="page__content">
          
          <StackLayout>
              <GridLayout>
                  <GridLayout rows="*,auto,*">
                      <GridLayout class="dash-bg-top" row="0">
                          <GridLayout rows="auto,*">
                              <!-- drawer button, lougeh supermarket brand name -->
                                <StackLayout class="m-t-25">
                                <GridLayout row="0" columns="*,auto,*">
                                    <Label
                                        col="0"
                                        class="fas p-20"
                                        fontSize="16"
                                        :text=" 'fa-bars' | fonticon "
                                        horizontalAlignment="left"
                                        @tap="onDrawerButtonTap"
                                    />
                                    <Label
                                        col="1"
                                        class="brand-name"
                                        text="LOUGEH SUPERMARKET"
                                        horizontalAlignment="center"
                                    />
                                    <Label
                                        col="2"
                                        class="fas p-20"
                                        :text=" 'fa-ellipsis-v' | fonticon "
                                        horizontalAlignment="right" 
                                    />
                                </GridLayout>
                                </StackLayout>

                            <!-- counters/pills-->  
                                <GridLayout class="m-r-10 m-l-10" row="1" columns="*,*">
                                    <GridLayout class="bg-pill" col="0">
                                        <Label 
                                            horizontalAlignment="center"
                                            class="header-title"
                                            text="Inventory" />
                                    </GridLayout>
                                    <GridLayout class="bg-pill" col="1">
                                        <Label
                                            horizontalAlignment="center"
                                            class="header-title" 
                                            text="Suppliers" />
                                    </GridLayout>
                                </GridLayout>
                              
                          </GridLayout>
                      </GridLayout>
                      <GridLayout row="1" >
                          <Label class="stock-title header-title" text="Low on stock" />
                      </GridLayout>
                      <GridLayout class="dash-bg-bottom" row="2">
                          <!-- <GridLayout class="bg-pill">
                              
                          </GridLayout> -->
                      </GridLayout>
                  </GridLayout>
              </GridLayout>


              <!-- <GridLayout rows="auto,auto,auto">
                <GridLayout row="0" columns="*,*,*">
                    <Label
                        col="0"
                        class="fas sideicon"
                        :text=" 'fa-bars' | fonticon "
                        horizontalAlignment="left"
                         
                    />
                    <Label
                        col="1"
                        class="LOUGEH SUPERMARKET"
                        horizontalAlignment="center"
                    />
                    <Label
                        col="2"
                        class="fas sideicon"
                        :text=" 'fa-ellipsis-v' | fonticon "
                        horizontalAlignment="right" 
                    />
                </GridLayout>
              </GridLayout> -->

          

            </StackLayout>

            <!-- <GridLayout rows="*,*">
                <GridLayout row="0" columns="auto,auto">
                    <GridLayout class="bg-pill" columns="0">
                        
                    </GridLayout>
                </GridLayout>
            </GridLayout> -->

        <!-- <ActivitiIndicator busy="{{ isLoading }}" /> -->

      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";

  export default {
    data(){
      return {
        
      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Users");
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
      
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .dash-bg-top {
        background-image: linear-gradient(to right, #05c5aa,#f0f0f0);
      // padding: up-right-down-left
        border-radius: 0 0 0 50;
        opacity: 0.4;
    }

    .dash-bg-bottom {
        background-image: linear-gradient(to right, #f0f0f0, #05c5aa);
        border-radius: 50 0 0 0;
        // margin-top: 50;
        opacity: 0.3;
    }

    .bg-pill {
        background-color: #ffffff;
        margin: 30 30 30 30;
        border-radius: 15;
    }

    .header-title {
        font-size: 15;
        font-weight: bold;
        color: #05c5aa;
        padding: 5;
        text-transform: uppercase;
    }

    .stock-title {
        margin: 20 0 5 30;
    }
    
</style>
