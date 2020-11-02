<template>
    <Page class="page" actionBarHidden="true">

      <GridLayout class="page__content">
        <GridLayout>
            <GridLayout class="bg-back">
            </GridLayout>
        </GridLayout>
        <GridLayout rows="auto,auto,*">
          <GridLayout>
            <StackLayout class="m-t-25">
              <GridLayout class="m-b-20" row="0" columns="*,auto,*">
                  <Label
                      col="0"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-bars' | fonticon "
                      horizontalAlignment="left"
                      @tap="onDrawerButtonTap"
                  />
                  <Label
                      col="1"
                      class="brand-name"
                      text="SUPPLIERS"
                      horizontalAlignment="center"
                  />
                  <!-- <Label
                      col="2"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-ellipsis-v' | fonticon "
                      horizontalAlignment="right" 
                  /> -->
              </GridLayout>
            </StackLayout>
          </GridLayout>
          <GridLayout row="1" columns="*,*">
            <Label
              col="0"
              class="fas p-20"
              fontSize="16"
              color="white"
              :text=" 'fa-sort-alpha-up' | fonticon " 
              horizontalAlignment="left"
            />
            <Label
              col="1"
              class="fas p-20"
              fontSize="16"
              color="white"
              :text=" 'fa-filter' | fonticon "
              horizontalAlignment="right" 
            />
          </GridLayout>
          <GridLayout row="2">
            <StackLayout ref="supplierList">

                <ListView row="1" class="list-group" height="670"
                separatorColor="transparent"
                  for="item in $root.suppliers" >
                    <v-template>
                      <StackLayout >
                        <GridLayout class="list-box" 
                          androidElevation="5"
                          rows="*,*,*" col="*,*,*">
                            <Label 
                              row="0" col="0"
                              fontSize="15"
                              fontWeight="bold" 
                              textWrap="true"
                              :text="item.company_name" />
                              <!-- <Label 
                              v-bind:class="[item.status == true ? 'activeStatus' : 'inactiveStatus']"
                              row="0" col="1"
                              fontSize="13"
                              margin="0"
                              padding="0"
                              fontWeight="bold" 
                              textWrap="true"
                              :text="item.status" /> -->
                            <Label row="0" col="2" rowSpan="2" 
                              class="far m-r-10"
                              fontSize="19"
                              horizontalAlignment="right"
                              :text=" 'fa-edit' | fonticon "
                              @tap="update(item)" />
                              <Label 
                              row="1" col="0"
                              fontSize="13"
                              fontWeight="bold" 
                              textWrap="true"
                              :text="item.contact_no" />
                              <Label 
                              row="2" col="0"
                              fontSize="14"
                              fontWeight="bold" 
                              textWrap="true"
                              :text="item.company_address" />
                        </GridLayout>

                      </StackLayout>
                    </v-template>

                </ListView>

            </StackLayout>
              
          </GridLayout>
        </GridLayout>


        <GridLayout class="fabbtn">
            <Button 
              class="fas floatingbutton" 
              :text=" 'fa-plus' | fonticon " 
              fontSize="19"
              color="white"
              @tap="$showModal(add)" />
        </GridLayout>
        <!-- <GridLayout rows="auto,auto" column="auto,auto" class="childbtn" v-show="floatbutton">
            <Button row="0" col="1" @tap="$showModal(add)" class="floatingbutton1" id="fbutton1" text="1" />
            <Button row="1" col="0" class="floatingbutton2" id="fbutton2" text="2" />
        </GridLayout> -->

      <GridLayout v-show="blur" class="modalBlur">
      </GridLayout>

      <ActivityIndicator :busy="showLoading" color="green" class="indLog" />


      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  // import { View, ViewBase } from "@nativescript/core/ui/frame";
  import add from "./add";
  import edit from "./edit";
  import axios from "axios";

  export default {
    data(){
      return {
        floatbutton: false, 
        add: add,
        edit: edit,
        showLoading: false,
        blur: false

      }
    },
    components: {
      add,
      edit
    },

    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("supplier");

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
      // onButtonTap() {
      //   this.$showModal(add)
      // },
      update(item) {
        this.$showModal(edit, {
          props: {
              supplier_id: item.supplier_id,
              company_name: item.company_name,
              contact_no: item.contact_no,
              company_address: item.company_address,
              status: item.status,
              created_by: item.created_by,
              created_at: item.created_at,
              updated_by: item.updated_by,
              updated_at: item.updated_at
            
          }
        })
      }
    },
    // async created() {
    //   this.showLoading = true;
    //   this.blur = true;

    //   await axios.get(this.$root.server+`/supplier`)
    //     .then(supplier => {
    //       this.$root.suppliers = supplier.data
          
    //       console.log("result data", supplier.data)
    //       console.log("supplier: ", this.supplier);

    //       this.showLoading = false;
    //       this.blur = false;
          
    //     })
    //     .catch(err => console.log(error)); // add this to see if the console is spitting an error.
    // }
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

    .activeStatus {
      background-color: #0ee920;
    }

    .inactiveStatus {
      background-color: grey;
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
