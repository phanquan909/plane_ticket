$(document).ready(function () {

    //trigger địa điểm
    $(".go-flight").click(function () {
        $("#text-xp").trigger("select");
    })
    $(".back-flight").click(function () {
        $("#text-dd").trigger("select");
    })
    //bật tắt khứ hồi
    $("#motchieu").click(function () {
        $("#form-khuhoi").addClass("tatkh");
    });
    $("#khuhoi").click(function () {
        $("#form-khuhoi").removeClass("tatkh");
    });

    //chọn ngày đi
    $("#datepickerDep, #tbISRStartDate").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        defaultDate: +0,
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        onSelect: function (date, picker) {

            //$("#datepickerRet, #tbISREndDate").datepicker("setDate", date);
            var minDates = $("#datepickerDep, #tbISRStartDate").datepicker("option", "minDate");
            $("#datepickerRet, #tbISREndDate").datepicker("option", "minDate", date);
            //console.log(date);
            //console.log(minDates);
            //console.log(picker);
        }
    });


    //in ra ngày hiện tại
    var d = new Date();
    $("#datepickerDep").datepicker("setDate", ((d.getDate() + 3) + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()));
    $("#tbISRStartDate").datepicker("setDate", ((d.getDate() + 3) + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()));

    // chọn ngày về 
    $("#datepickerRet, #tbISREndDate").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        defaultDate: +0,
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
    });
    $("#datepickerRet, #tbISREndDate").datepicker("setDate", ((d.getDate() + 3) + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()));

    //trigger datepicker
    $("#datepickerD").click(function () {
        $("#datepickerDep").trigger("select");
    });
    $("#datepickerR").click(function () {
        $("#datepickerRet").trigger("select");
    });

    //show lựa chọn điểm xuất phát
    $("#chondiemdi").click(function () {
        $("#diemxp").addClass("battat-xp");
        $("#diemden").removeClass("battat-den");
    });
    $("#close-back1").click(function () {
        $("#diemxp").removeClass("battat-xp");
        $("#city-back").val("");
        $("#city-go").val("");
    });
    $("#x-mobi").click(function () {
        $("#diemxp").removeClass("battat-xp");
        $("#city-back").val("");
        $("#city-go").val("");
    });

    //show lựa chọn điểm đến
    $("#chondiemden").click(function () {
        $("#diemden").addClass("battat-den");
        $("#diemxp").removeClass("battat-xp");
    });
    $("#close-back2").click(function () {
        $("#diemden").removeClass("battat-den");
        $("#city-back").val("");
        $("#city-go").val("");
    });
    $("#x-mo").click(function () {
        $("#diemden").removeClass("battat-den");
        $("#city-back").val("");
        $("#city-go").val("");
    });

    //đổi chỗ địa điểm
    $("#doicho").click(function () {
        var divOneText = $('#text-xp').html();
        var divTwoText = $('#text-dd').html();

        if (divOneText != '' && divTwoText != '') {
            $('#text-xp').html(divTwoText);
            $('#text-dd').html(divOneText);
        }
    });

    //cộng trừ số người 
    $('input.input-qty').each(function () {
        var $this = $(this),
            qty = $this.parent().find('.is-form'),
            min = Number($this.attr('min')),
            max = Number($this.attr('max'))
        if (min == 0) {
            var d = 0
        } else d = min
        $(qty).on('click', function () {
            if ($(this).hasClass('minus')) {
                if (d > min) d += -1
            } else if ($(this).hasClass('plus')) {
                var x = Number($this.val()) + 1
                if (x <= max) d += 1
            }
            $this.attr('value', d).val(d)
        });
    });

    //gợi ý tên điểm điiiiiiiiiiiiiiiii
    $("#city-go").autocomplete({

        //Lọc dữ liệu
        source: function (request, response) {
            //Từ khóa tìm kiếm
            var term = request.term.toLowerCase();
            $.ajax({
                //link file json
                url: "http://resource.metatrip.vn/Resources/SearchAirport?keyword=" + term,
                type: 'GET',
                dataType: "json",
                data: {
                    term: request.term,
                },
                success: function (data) {
                    response(data);
                },
            });
            return
        },
        minLength: 2,
        //chọn in ra dữ liệu
        select: function (item, ui) {
            var city = $("#text-xp").val();
            city = $("#text-xp").text(ui.item.cityname + " (" + ui.item.value + ")");
            $("#text-xp").data("code", ui.item.value);
            //console.log(city);
            $("#diemxp").removeClass("battat-xp");
            //console.log((ui.item.text));
            $("#city-go").val("");

            return false;
        },

        //cho về html
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $('<li class="menulist"></li>')
            .data("item.autocomplete", item)
            .append('<span class="dressc">' + ('<b class="sanbay">' + item.text + '</b>') + ('<b class="countryname">' + (item.cityname + ', ' + item.countryname) + '</b>') + '</span>')
            .appendTo(ul);
    };

    //gợi ý tên điểm đếnnnnnnnnnnnnnn
    $("#city-back").autocomplete({
        //Lọc dữ liệu
        source: function (request, response) {
            //Từ khóa tìm kiếm
            var term = request.term.toLowerCase();
            $.ajax({
                //link file json
                url: "http://resource.metatrip.vn/Resources/SearchAirport?keyword=" + term,
                type: 'GET',
                dataType: "json",
                data: {
                    term: request.term,
                },
                success: function (data) {
                    response(data);
                },
            });
            return
        },
        minLength: 2,
        //chọn in ra dữ liệu
        select: function (item, ui) {
            var city = $("#text-dd").val();
            city = $("#text-dd").text(ui.item.cityname + " (" + ui.item.value + ")");
            $("#text-dd").data("code", ui.item.value);
            //console.log(city);
            $("#diemden").removeClass("battat-den");
            $("#city-back").val("");
            //console.log((ui.item.text));
            return false;
        },
        //cho về html
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $('<li class="menulist"></li>')
            .data("item.autocomplete", item)
            .append('<span class="dressc">' + ('<b class="sanbay">' + item.text + '</b>') + ('<label class="countryname">' + (item.cityname + ', ' + item.countryname) + '</label>') + '</span>')
            .appendTo(ul);
    };


    //chọn thành phố
    $(".item-diem-xp").click(function () {
        var dtcxp = $(this).data("code");
        $('#text-xp').data("code", dtcxp);
        //console.log($(this).data("code"));
        $('#text-xp').text($(this).text() + "(" + $(this).data("code") + ")");
        $("#diemxp").removeClass("battat-xp");
        $("#diemden").removeClass("battat-den");
    });
    $(".item-diem-den").click(function () {
        var dtcdd = $(this).data("code");
        $('#text-dd').data("code", dtcdd);
        $('#text-dd').text($(this).text() + "(" + $(this).data("code") + ")");
        $("#diemxp").removeClass("battat-xp");
        $("#diemden").removeClass("battat-den");
    });

    //click chọn
    $("#chonxp").click(function () {
        var Textgo = $('#city-go').val();
        $('#text-xp').html(Textgo);
        $("#diemxp").removeClass("battat-xp");
        $("#diemden").removeClass("battat-den");
    });
    $("#chonden").click(function () {
        var Textback = $('#city-back').val();
        $('#text-dd').html(Textback);
        $("#diemxp").removeClass("battat-xp");
        $("#diemden").removeClass("battat-den");
    });

    //click max min
    $(".mn1,.pl1").click(function () {
        var value = $('.ip-p').val();
        if (value == 9) {
            $(".pl1").addClass("notp");
        }
        else if (value == 1) {
            $(".mn1").addClass("notm");
        }
        else {
            $(".pl1").removeClass("notp");
            $(".mn1").removeClass("notm");
        }
    });
    $(".mn2,.pl2").click(function () {
        var value = $('.ip-c').val();
        if (value == 9) {
            $(".pl2").addClass("notp");
        }
        else if (value == 0) {
            $(".mn2").addClass("notm");
        }
        else {
            $(".pl2").removeClass("notp");
            $(".mn2").removeClass("notm");
        }
    });
    $(".mn3,.pl3").click(function () {
        var value = $('.ip-b').val();
        if (value == 2) {
            $(".pl3").addClass("notp");
        }
        else if (value == 0) {
            $(".mn3").addClass("notm");
        }
        else {
            $(".pl3").removeClass("notp");
            $(".mn3").removeClass("notm");
        }
    });

    //click delete thành phố
    $("#X-o").click(function () {
        $("#city-go").val("");
    });
    $("#X-t").click(function () {
        $("#city-back").val("");
    });

    //bật Bảo hiểm

    $("#baohiem").click(function () {
        $(this).addClass("batbaohiem");
        $("#vemaybay").removeClass("batvmb");
        $("#vemaybay").css({
            "color": "#1ba0e2 !important", "background": "#f0f0f0",
            "margin-right": "10px",
            "border-top-left-radius": "5px",
            "border-top-right-radius": "5px",
            "z-index": "-1"
        });
        $("#content-vemaybay").css("display", "none");
        $("#content-baohiem").css("display", "block");
        $("#datvere").css("display", "none");
        $("#datbaohiem").css("display", "block");

    });
    $("#vmd").click(function () {
        $("#vemaybay").trigger("select");
    })
    $("#bh").click(function () {
        $("#baohiem").trigger("select");
    })
    //bật vé máy bay
    $("#vemaybay").click(function () {
        $("#vemaybay").css({
            "color": "#fff", "background": "#1ba0e2", "border-top-left-radius": "5px",
            "border-top-right-radius": "5px",
            "margin-right": "10px",
            "z-index": "-1"
        });
        $("#baohiem").removeClass("batbaohiem");
        $("#content-baohiem").css("display", "none");
        $("#content-vemaybay").css("display", "");
        $("#datbaohiem").css("display", "none");
        $("#datvere").css("display", "block");
    });

    //bật tắt cá nhân khách đoàn (bảo hiểm)
    $("#ddlISRCusType").click(function (event) {
        event.preventDefault();
        if ($("#ddlISRCusType").val() == "VISITORS") {
            $('#tbCustomerCount').prop("disabled", false);
            $('#tbCustomerCount').val("2");
            $("#tbCustomerCount").attr({
                "max": 100,
                "min": 2,
            });
        }
        else if ($("#ddlISRCusType").val() == "PERSONAL") {
            $('#tbCustomerCount').val("1");
            $('#tbCustomerCount').prop("disabled", true);
        }
    });

    //chạy select2
    baohiem();
    $("#ddlISRType").change(function () {
        baohiem();
    });

    // đẩy ra placeholder tìm kiếm của select2
    var myInterval = setInterval(function () {
        if ($(".select2-search__field")) {
            myStopFunction();
        }
        else {
            clearInterval(myInterval);
        }
    }, 10);

    // lấy dữ liệu vé máy bay
    $(".mt5-reset").click(function () {
        var loaive = $("input[name='loai-ve']:checked").val();
        if (loaive == "no_return") {
            var ItineraryType = "1";
        }
        else if (loaive == "return") {
            var ItineraryType = "2";
        }
        var StartPoint = $("#text-xp").data("code");
        var EndPoint = $("#text-dd").data("code");
        var DeparetureDate = $("#datepickerDep").val();
        if ($("#form-khuhoi").css("display") == "none") {
            var ReturnDate = "  ";
        }
        else if ($("#form-khuhoi").css("display") != "none") {
            var ReturnDate = $("#datepickerRet").val();
        }
        var Adults = $("#mm-nl").val();
        var Children = $("#mm-te").val();
        var Infants = $("#mm-eb").val();
        console.log(ItineraryType, StartPoint, EndPoint, DeparetureDate, ReturnDate, Adults, Children, Infants);

        //nhúng GIAO DIỆN CUSTOMIZE
        //ADE.Air.AirADESearch(ItineraryType, StartPoint, EndPoint, DeparetureDate, ReturnDate, Adults, Children, Infants);
    });


    // lấy ra dữ liệu bảo hiểm
    $("#btnISRSearch").click(function () {
        console.log("quan");
        var DepartureText = $("#select2-ddlISRDeparturePlace-container").text();
        var ArrivalText = $("#select2-ddlISRArrivalPlace-container").text();

        var codediemdi = $("#ddlISRDeparturePlace").find(":selected").data("select2-id");
        var DepartureCode = $("#ddlISRDeparturePlace").data("select2-id", codediemdi).val();

        var codediemden = $("#ddlISRArrivalPlace").find(":selected").data("select2-id");
        var ArrivalCode = $("#ddlISRDeparturePlace").data("select2-id", codediemden).val();

        var InsurenaceType = $("#ddlISRType").val();
        var DeparetureDate = $("#tbISRStartDate").val();
        var ReturnDate = $("#tbISREndDate").val();
        var CustomerType = $("#ddlISRCusType").val();
        var Customers = $("#tbCustomerCount").val();
        //ADE.ISR.IsrADESearch(DeparetureDate, ReturnDate, InsurenaceType, Customers, CustomerType, DepartureCode, ArrivalCode, DepartureText, ArrivalText);
    });

});

// chọn điểm đến của bảo hiểm
function baohiem() {
    $("#ddlISRDeparturePlace option, #ddlISRArrivalPlace option").remove();
    $("#ddlISRDeparturePlace, #ddlISRArrivalPlace").prepend("<option>" + "Chọn địa điểm" + "</option>");
    var code = $("#ddlISRType").val();
    var url = "https://resource.metatrip.vn/Resources/SearchPlace?code=" + code + "&keyword=";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json"
    }).done(function (results) {
        for (i = 0; i < results.length; i++) {
            $("#ddlISRDeparturePlace, #ddlISRArrivalPlace").append("<option class='opt' value='" + results[i].value + "'>" + results[i].text + "</option>")
        }
        $("#ddlISRDeparturePlace, #ddlISRArrivalPlace").select2();
        /*$select.data('select2').$container.addClass('error');
        $select.data('select2').$dropdown.addClass('test');*/
    });
}

// placeholder tìm kiếm cho select2
function myStopFunction() {
    $(".select2-search__field").attr("placeholder", "Tìm kiếm...");
}