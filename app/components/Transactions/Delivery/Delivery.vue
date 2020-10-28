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
                      text="DELIVERY"
                      horizontalAlignment="center"
                  />
                  <Label
                      col="2"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-ellipsis-v' | fonticon "
                      horizontalAlignment="right" 
                  />
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
            <StackLayout ref="inventoryList">

                <ListView row="1" class="list-group" height="670"
                separatorColor="transparent"
                  for="d in $root.delivery" >
                    <v-template>
                      <StackLayout >
                        <GridLayout 
                          class="list-box" 
                          rows="auto,*,*"
                          columns="*,auto">
                            <Label row="0" col="0"  
                              :text="d.dr_no" />
                            <Label row="0" col="1" 
                              horizontalAlignment="right"
                              :text="new Date(d.transaction_date).toDateString().split(' ').slice(1).join(' ')" />
                            <Label row="1" col="0" 
                              fontSize="15"
                              fontWeight="bold"
                              :text="d.supplier_name"
                              textWrap="true" />
                            <Label row="2" col="0" 
                              fontSize="15"
                              fontWeight="bold"
                              :text=" '₱'+d.total_cost" />
                            <Label row="1" col="1" rowSpan="2"
                              class="fas p-20"
                              fontSize="16"
                              color="#05C5AA"
                              horizontalAlignment="right"
                              :text=" 'fa-chevron-right' | fonticon " />
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

      <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />


      </GridLayout>
                  <!-- <ListView class="list-group yyy"
                separatorColor="transparent"
                  for="del in delivery" >
                    
                    <v-template>
                      <GridLayout>
                        <GridLayout  class="rtrans" @tap="show(del)">
                          <GridLayout rows="*,*,*,*" columns="*,auto" class="trans-pills">
                            <Label row="0" col="0" class="text-content m-b-5" :text="'DR No: '+del.dr_no" textWrap="true" />
                            <Label row="1" col="0" class="text-sub" color="#70798C" :text="del.dtransaction_date" textWrap="true" />
                            <Label row="2" col="0" class="text-sub" color="#70798C" :text="del.company_name" textWrap="true" />
                            <Label row="2" col="1" color="#05C5AA" class="text-sub" textWrap="true" >
                              <FormattedString>
                                <Span text="₱" />
                                <Span :text="del.total_cost" />
                              </FormattedString>
                            </Label>
                          </GridLayout>
                        </GridLayout>
                        
                      </GridLayout>

                    </v-template>

                </ListView> -->

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import ShowDetails from "./ShowDetails.vue";
  import receive from "./add";
  import axios from "axios";

  export default {
    data(){
      return {
        showLoading: false
      }
    },
    async created(){
       this.showLoading = true;

      await axios.get(this.$root.server+`/delivery_item/all`)
        .then(delivery => {
          this.$root.delivery = delivery.data
          console.log("root delivery: ", this.$root.delivery);
          this.showLoading = false;
        })
        .catch(err => console.log(err)); // add this to see if the console is spitting an error.
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Delivery");
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
        this.$navigateTo(ShowDetails, {
          props: {
            // details: del
            dr_no: del.dr_no,
            supplier_id: del.supplier_id,
            company_name: del.company_name,
            company_address: del.company_address,
            dtransaction_date: del.dtransaction_date,
            total_cost: del.total_cost,
            items: del.items
          },
          transition: "slideLeft"
        })
        console.log("clicked!", del);
      },
      confirm(){
        console.log("button clicked");
      }
      
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
