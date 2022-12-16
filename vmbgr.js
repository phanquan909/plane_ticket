var pointid;
$(document).ready(function () {

    //click lấy id
    $(".departure").click(function () {
        pointid = $(this).find("input").attr("id");
        //console.log(pointid);
    });

    //show ra điểm đến vừa chọn
    $(document).on("click", ".ct", function () {
        $("#" + pointid).val(($(this).text()));
        $(".menu-pc").removeClass("batluachon");
        //console.log($(this).text());
        //console.log(pointid);
    });

    //đổi chỗ địa điểm
    $("#doicho,#doicho-mobi").click(function () {
        var divOneText = $('#dress-go').val();
        var divTwoText = $('#dress-ret').val();

        if (divOneText != '' && divTwoText != '') {
            $('#dress-go').val(divTwoText);
            $('#dress-ret').val(divOneText);
        }
    });


    //lựa chọn điểm đi hoặc điểm đến(tắt bật)
    $("#dress-go").click(function () {
        $(".menu-pc").addClass("batluachon");
        $(".text-cddi").addClass("batcddi");
        $(".text-cdden").removeClass("batcdden");
    });
    $("#dress-ret").click(function () {
        $(".menu-pc").addClass("batluachon");
        $(".text-cdden").addClass("batcdden");
        $(".text-cddi").removeClass("batcddi");
    });

    //tat lua chon
    $("#icon-xr,#icon-xg").click(function () {
        $(".menu-pc").removeClass("batluachon");
    });

    //click chữ chọn - pc
    $(".submit").click(function () {
        $(".departure").click(function () {
            pointid = $(this).find("input").attr("id");
            //console.log(pointid);
        });
        //console.log(pointid);
        var city = $("#" + pointid).val();
        city = $("#" + pointid).val($("#search-dr").val());
        //console.log(city);
        $(".menu-pc").removeClass("batluachon");
        //console.log((ui.item.text));
        $("#search-dr").val("");
    });

    //gợi ý tên điểm điiiiiiii , đếnnnnnnnnnn
    $("#search-dr").autocomplete({
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
            $(".departure").click(function () {
                pointid = $(this).find("input").attr("id");
                //console.log(pointid);
            });
            //console.log(pointid);
            var city = $("#" + pointid).val();
            city = $("#" + pointid).val(ui.item.cityname + " (" + ui.item.value + ")");
            //console.log(city);
            $(".menu-pc").removeClass("batluachon");
            //console.log((ui.item.text));
            $("#search-dr").val("");
            return false;
        },

        //cho về html
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $('<li class="menulist"></li>')
            .data("item.autocomplete", item)
            .append('<span class="diadiem">' + ('<b class="sanbay">' + item.text + '</b>') + ('<b class="countryname">' + (item.countryname) + '</b>') + '</span>')
            .appendTo(ul);
    }

    //bật autocomplete ở mobi
    $("#search-mobi").autocomplete({
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
            $(".departure").click(function () {
                pointid = $(this).find("input").attr("id");
                //console.log(pointid);
            });
            var city = $("#" + pointid).val();
            city = $("#" + pointid).val(ui.item.cityname + " (" + ui.item.value + ")");
            //console.log(city);
            $("#menu-mobi").removeClass("batmobi");
            //console.log((ui.item.text));
            $("#search-mobi").val("");
            return false;
        },

        //cho về html
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $('<li class="menulist"></li>')
            .data("item.autocomplete", item)
            .append('<span class="diadiem">' + ('<b class="sanbay">' + item.cityname + " (" + item.value + ")" + '</b>') + ('<b class="countryname">' + (item.countryname) + '</b>') + '</span>')
            .appendTo(ul);
    }

    //chọn ngày điiiiiii
    $("#datepickerDep").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        defaultDate: +0,
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        onSelect: function (date, picker) {
            var minDates = $("#datepickerDep").datepicker("option", "minDate");
            $("#datepickerRet").datepicker("option", "minDate", minDates = date);
            var ngay = date.slice(0, 2);
            var tn = date.slice(3, 10);
            $("#daydep").val(ngay);
            $("#yeardep").val(tn);
        }
    });
    $("#img-dateDep").click(function () {
        $("#datepickerDep").trigger("select");
    });

    //in ra ngày hiện tại
    var d = new Date();
    $("#datepickerDep").datepicker("setDate", d)
    $("#daydep").val(d.getDate());

    // chọn ngày về 
    $("#datepickerRet").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        defaultDate: +0,
        dayNamesMin: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        onSelect: function (date, picker) {
            var ngay = date.slice(0, 2);
            var tn = date.slice(3, 10);
            $("#dayret").val(ngay);
            $("#yearret").val(tn);
        }
    });
    $(".img-date2").click(function () {
        $("#datepickerRet").trigger("select");
    });

    //cộng trừ số người 
    $('select.input-qty').each(function () {
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

    /////////////////////mobi

    //lựa chọn điểm đi , đến - mobi
    $("#dress-go").click(function () {
        $("#menu-mobi").addClass("batmobi");
        $(".text-cddi").addClass("batcddi");
        $(".text-cdden").removeClass("batcdden");
    });
    $("#dress-ret").click(function () {
        $("#menu-mobi").addClass("batmobi");
        $(".text-cdden").addClass("batcdden");
        $(".text-cddi").removeClass("batcddi");
    });

    //click quay lại - mobi
    $(".back-mobi").click(function () {
        $("#menu-mobi").removeClass("transition");
        $("#menu-mobi").removeClass("batmobi");
    });

    //click chọn lại - mobi
    $(".cl").click(function () {
        $("#dress-go,#dress-ret,#datepickerDep,#datepickerRet").val("");
    });

    //click dress - mobi
    $(".chauluc").click(function () {
        var clickid;
        $(".active").click(function () {
            clickid = $(this).find(".cityname").attr("id");
            console.log(clickid);
            $("#" + clickid).toggleClass("batdd");
        });
        //click trong autocomplete in ra input
        $(".dress-dd").click(function () {
            var name = $(this).data("name");
            var code = $(this).data("code");
            $(".departure").click(function () {
                pointid = $(this).find("input").attr("id");
                //console.log(pointid);
            });
            var city = $("#" + pointid).val();
            city = $("#" + pointid).val(name + " (" + code + ")");
            $("#menu-mobi").removeClass("batmobi");

        });
    });

    /*//icon x để xóa text - mobi
    $(".dress-dd").change(function () {
        var go = $("#dress-go").val();
        var ret = $("#dress-ret").val();
        var yg = $("#datepickerDep").val();
        var yr = $("#datepickerRet").val();
    });*/
});

//lấy dữ liệu ra 
$(".search").click(function () {
    //gán value của select vào input của datepicker
    const elementStyle = $(".date-go").css("display");
    if (elementStyle != "none") {
        var ngayd = $("#daydep").val();
        var tnd = $("#yeardep").val();
        var ngayr = $("#dayret").val();
        var tnr = $("#yearret").val();
        $("#datepickerDep").val(ngayd + "/" + tnd);
        $("#datepickerRet").val(ngayr + "/" + tnr);
        var DeparetureDate = $("#datepickerDep").val();
        var ReturnDate = $("#datepickerRet").val();
    }
    else if (elementStyle == "none") {
        var DeparetureDate = $("#datepickerDep").val();
        var ReturnDate = $("#datepickerRet").val();
    }

    var codedi = $("#dress-go").val();
    var codeden = $("#dress-ret").val();

    //var ItineraryType = $("input[name='loai-ve']:checked").val();
    var StartPoint = codedi.slice(- 4, - 1);
    var EndPoint = codeden.slice(- 4, - 1);
    var Adults = $("#mm-nl").val();
    var Children = $("#mm-te").val();
    var Infants = $("#mm-eb").val();
    console.log(StartPoint, EndPoint, DeparetureDate, ReturnDate, Adults, Children, Infants);

    //nhúng GIAO DIỆN CUSTOMIZE
    //ADE.Air.AirADESearch(ItineraryType, StartPoint, EndPoint, DeparetureDate, ReturnDate, Adults, Children, Infants);
});