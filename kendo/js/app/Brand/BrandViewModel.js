define([
    'kendo',
    'text!brandTemplate'
], function (kendo, brandTemplate) {
    return kendo.data.ObservableObject.extend({
        brandDataSource: null,
        init: function (listView) {
            var self = this;
           // debugger;
            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        type: "GET"
                        , url: baseUrl + "/GetBrands"
                        , dataType: "json"
                    }
                },schema : {
                    data: "d"
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSize: 10
            }); 

            listView.kendoMobileListView({
                dataSource: dataSource
                , template: kendo.template(brandTemplate),
                //,filterable: true 
                //, filterable: {
                //    field: "Value",
                //    operator: "startswith"
                //},
            });
            //debugger;
            self.set("brandDataSource", dataSource);
        },
        //edit_offer: function (e) {
        //    var brandId = $(e.target).data("brandId");
        //    Global.selected_brand_id = brandId;

        //    load_brand_offer(e);

        //}, 
        list_offer_load: function (e) {
            //debugger;
            var brand_id = $(e.button).attr('data-brand-id');
            Global.selected_brand_id = brand_id;
            app.kendoApp.navigate('#offer_list', 'slide:right');
        },
         list_offerdetails_load: function (e) {
            var brand_id = $(e.button).attr('data-brand-id');
            Global.selected_brand_id = brand_id;
            app.kendoApp.navigate('#offer_list', 'slide:right');
        },
    });
});

//function load_brand_offer(e) {
//    var brandId = $(e).data("brandId");

//    if (brandId != undefined) {
//        Global.selected_brand_id = brandId;
//    }

//    var brandofferUrl = baseUrl + "/GetBrandOffer?brandId=" + brandId;

//    //// Gets Order to Edit
//    $.ajax({
//        type: "GET",
//        url: brandofferUrl,
//        cache: false,
//        dataType: "json",
//        success: function (data, statusText, xhr) {
//            debugger;
//            window.app.kendoApp.navigate('#offer_list', 'slide:right');

//            var item = data[0];
//            //$(".new_task_block").show();

//            var edit_offer = {
//                id: item.id,
//                offer_name: item.name,               
//                brand_id: item.brand_id[0],               
//                status_id: item.state,
//            };

//            //load customer vehicle
//            //get_customer_vehicle_list_edit(edit_order.customer_id);

//            //get_order_task_list(Global.selected_brand_id);

//            //$("#add_order span.km-text").html("Update");

//            //debugger;

//            //$("#update_order").show();
//            //$("#add_order").hide();

//            //$("#update_order span.km-text").css('font-family', 'play');
//            debugger;
//            kendo.bind($("#offer_list"), edit_offer);

//            //kendo.bind($("#order_form_view"), new_order);
//        }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response

//        }
//    });
//}

 