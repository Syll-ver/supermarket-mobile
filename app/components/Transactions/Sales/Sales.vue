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
                      text="SALES"
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
            <StackLayout ref="inventoryList">

                <ListView row="1" class="list-group" height="670"
                separatorColor="transparent"
                  for="d in $root.sales" >
                    <v-template>
                      <StackLayout >
                        <GridLayout 
                          class="list-box" 
                          rows="auto,*,*"
                          columns="*,auto">
                            <Label row="0" col="0"  
                              :text="d.or_no" />
                            <Label row="0" col="1" 
                              horizontalAlignment="right"
                              :text="new Date(d.stransaction_date).toDateString().split(' ').slice(1).join(' ')" />
                            <Label v-if="d.customer_name" row="1" col="0" 
                              fontSize="15"
                              fontWeight="bold"
                              :text="d.customer_name"
                              textWrap="true" />
                              <Label v-else row="1" col="0" 
                              fontSize="15"
                              fontWeight="bold"
                              text="Walk-in Customer"
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
                              :text=" 'fa-chevron-right' | fonticon "
                              @tap="show(d)" />
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
              @tap="onButtonTap()" />
        </GridLayout>

        <GridLayout v-show="blur" class="blur">
        </GridLayout>

        <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />

      </GridLayout>

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import ShowDetails from "./ShowSales.vue";
  import receive from "./addSales";
  import axios from "axios";

  export default {
    data(){
      return {
        showLoading: false,
        blur: false
      }
    },
    async created(){
       this.showLoading = true;
       this.blur = true;

      await axios.get(this.$root.server+`/viewsales`)
        .then(sale => {
          this.$root.sales = sale.data
          console.log("root sales: ", this.$root.sales);
          this.showLoading = false;
          this.blur = false;

        })
        .catch(err => console.log(err)); // add this to see if the console is spitting an error.
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Sales");
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
      onButtonTap(){
        this.$navigateTo(receive);
      },
      show(del){
        this.$navigateTo(ShowDetails, {
          props: {
            or_no: del.or_no,
            customer_name: del.customer_name,
            customer_contact_no: del.customer_contact_no,
            customer_address: del.customer_address,
            stransaction_date: del.stransaction_date,
            total_cost: del.total_cost,
            payment_amt: del.payment_amt,
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

    .blur {
        background-color: #05C5AA;
        opacity: 0.5
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
