define([
'kendo',
   'text!cardsTemplate'
], function (kendo, cardsTemplate) {
    return kendo.data.ObservableObject.extend({
        CardsDataSource: null,
        init: function (listView) {
           // debugger;
            var self = this;

            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        type: "GET"
                        , url: baseUrl + "/GetCards"
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
                , template: kendo.template(cardsTemplate)
                //,filterable: true 
                //, filterable: {
                //    field: "Value",
                //    operator: "startswith"
                //},
            });
            //debugger;
            self.set("CardsDataSource", dataSource);
        },
        list_cards_load: function (e) {
            //debugger;
            var card_id = $(e.button).attr('data-card-id');
            Global.selected_card_id = card_id;
            app.kendoApp.navigate('#cards_list_detail', 'slide:right');
        },
        bind_cards_detail: function (e) {

            var card_list_url = baseUrl + "/GetCardsDetail?cardid=" + Global.selected_card_id;
            var jsonString = {
                cardid: Global.selected_card_id,
               
            };
            $(CardNo).kendoBarcode({
                value: "",
                type: "Code128",
                width: 50,
                height: 50
            });
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: card_list_url,
                data: JSON.stringify(jsonString),
                success: function (data) {
                    if (data.d != '') {
                        debugger;
                        var selected_card = data.d;
                        $("#card-detail-bank").val(selected_card.Bank);
                       // $('#CardNo').val() = "";
                        var barcodeValue = selected_card.SerialNo;
                        var barcode = $('#CardNo').data('kendoBarcode');
                        var len = barcodeValue.length;
                        barcode.setOptions({
                            value: barcodeValue,
                            width: len
                        });
                        //debugger;

                        
                    }
                }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                    alert(thrownError);
                }
            });

           // debugger;
           
        }
    });
});
