define([
    'kendo',
    'text!offerTemplate',     
      '../../app/Offer/OfferViewModel',
], function (kendo, offerTemplate) {
    return kendo.data.ObservableObject.extend({
        offerDataSource: null,
        init: function (listView)
        {
            //debugger;
            var self = this;
            var offerUrl = baseUrl + "/GetOffers?brand_id=" + Global.selected_brand_id;
            debugger;
            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        type: "GET"
                        , url: offerUrl
                        , dataType: "json"
                    }
                }, schema: {
                    data: "d"
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSize: 10
            });

            listView.kendoMobileListView({               
                dataSource: dataSource
                , template: kendo.template(offerTemplate)
                //,filterable: true 
                //, filterable: {
                //    field: "Value",
                //    operator: "startswith"
                //},
            });
            //debugger;
            self.set("offerDataSource", dataSource);
        },
        brand_offer_load: function (listView) {
            var brandId = $(e.button).data('brand-id');
            var offer_list_url = baseUrl + "/getCustomerByGarageId";

            //// gets Vehicle detail
            $.ajax({
                type: "GET",
                url: get_selected_vehicle_detail,
                cache: false,
                dataType: "json",
                success: function (data, statusText, xhr) {
                    var selected_vehicle = data[0];
                    new_vehicle_model.id = selected_vehicle.id;
                    new_vehicle_model.brand_id = selected_vehicle.vehicle_brand_id;
                    new_vehicle_model.model_id = selected_vehicle.model_id[0];
                    new_vehicle_model.license_plate = selected_vehicle.license_plate;

                    console.log(new_vehicle_model);
                    ////window.app.kendoApp.navigate('#add_customer_vehicle', 'slide:right');
                    ////kendo.bind($("#add_customer_vehicle"), new_vehicle_model);

                }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                }
            });
                   
            var self = this;

    kendo.data.ObservableObject.fn.init.apply(self, []);

    console.log(baseUrl + "/GetBrandOffer?brandId=" + Global.brand_Id);

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST"
                , url: baseUrl + "/getCustomerByGarageId?brandId=" + Global.brand_Id
                , dataType: "json"
            }
        },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
        pageSize: 10
    });

    listView.kendoMobileListView({
        dataSource: dataSource
        , template: kendo.template(offerBrand)
        //,filterable: true 
        , filterable: {
            field: "name",
            operator: "startswith"
        },

    });

    //Global.customer_vehicle_template = customerVehicleTemplate;
    //Global.customer_phone_email_template = customer_phone_email_template;
    //Global.create_job_from_order_edit_page = -1;

    self.set("offerDataSource", dataSource);
        },
        brand_offerdetail_load: function (e) {
            debugger;
            var offer_id = $(e.button).attr('data-offer-id');
            Global.selected_offer_id = offer_id;
            debugger;
            app.kendoApp.navigate('#offer_list_detail', 'slide:right');
        },
        bind_offer_detail: function (e) {
           
            var offer_list_url = baseUrl + "/GetOffersDetail?offerid=" + Global.selected_offer_id;
           
            debugger;
                $.ajax({
                    type: "GET",
                    url: offer_list_url,
                    cache: false,
                    dataType: "json",
                    success: function (data, statusText, xhr) {
                        debugger;
                        var selected_offer = data;
                        //new_Offer_Detail.id = selected_offer.id;
                        //new_Offer_Detail.name = selected_offer.name;
                        //new_Offer_Detail. = selected_offer;
                        //new_Offer_Detail.license_plate = selected_offer.license_plate;

                        //selected_offer.name=
                        //$("#offer-detail-name").val('hai');
                        $("#offer-detail-name").val(selected_offer.title);
                        $("#offer-detail-Desc").val(selected_offer.Description);
                        $("#offer-detail-Image").val(selected_offer.imageurl);
                        $("#offer-detail-startDate").val(selected_offer.start_date);
                        debugger;
                    }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
}
        
    });
        }

    })
        //brand_offerdetail_load: function (listView) {
        //    var brandId = $(e.button).data('brand-id');
        //    var offer_list_url = baseUrl + "/getCustomerByGarageId";

        //     gets Vehicle detail
        //    $.ajax({
        //        type: "GET",
        //        url: get_selected_vehicle_detail,
        //        cache: false,
        //        dataType: "json",
        //        success: function (data, statusText, xhr) {
        //            var selected_vehicle = data[0];
        //            new_vehicle_model.id = selected_vehicle.id;
        //            new_vehicle_model.brand_id = selected_vehicle.vehicle_brand_id;
        //            new_vehicle_model.model_id = selected_vehicle.model_id[0];
        //            new_vehicle_model.license_plate = selected_vehicle.license_plate;

        //            console.log(new_vehicle_model);
        //            window.app.kendoApp.navigate('#add_customer_vehicle', 'slide:right');
        //            kendo.bind($("#add_customer_vehicle"), new_vehicle_model);

        //        }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
        //        }
        //    });
                   
        //    var self = this;

        //    kendo.data.ObservableObject.fn.init.apply(self, []);

        //    console.log(baseUrl + "/GetBrandOfferDetail?brandId=" + Global.brand_Id);

        //    var dataSource = new kendo.data.DataSource({
        //        transport: {
        //            read: {
        //                type: "POST"
        //                , url: baseUrl + "/getCustomerByGarageId?brandId=" + Global.brand_Id
        //                , dataType: "json"
        //            }
        //        },
        //        serverPaging: true,
        //        serverFiltering: true,
        //        serverSorting: true,
        //        pageSize: 10
        //    });

        //    listView.kendoMobileListView({
        //        dataSource: dataSource
        //        , template: kendo.template(offerdetailBrand)
        //        ,filterable: true 
        //        , filterable: {
        //            field: "name",
        //            operator: "startswith"
        //        },
        //    });

        //    Global.customer_vehicle_template = customerVehicleTemplate;
        //    Global.customer_phone_email_template = customer_phone_email_template;
        //    Global.create_job_from_order_edit_page = -1;

        //    self.set("offerDataSource", dataSource);
        //}
});
