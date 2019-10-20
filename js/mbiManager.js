//MBI管理类
(function () {
    "use strict";
    function MBIManager() {
        this.login_type = 1;
        // this.jsonChartLocal0 = '{"content":[{"id":"1","name":"a1","content":[{"id":"11","name":"a11","content":[]},{"id":"12","name":"a12","content":[]}]},{"id":"2","name":"a2","content":[]},{"id":"3","name":"a3","content":[{"id":"31","name":"a31","content":[]}]},{"id":"4","name":"a4","content":[]}]}';
        this.jsonChartLocal1 = '[{"modelId":1,"name":"指标","modelTrees":[{"modelId":11,"name":"指标","modelTrees":[{"modelId":111,"name":"指标"},{"modelId":112,"name":"指标"}]},{"modelId":12,"name":"指标","modelTrees":[{"modelId":121,"name":"指标"},{"modelId":122,"name":"指标"},{"modelId":123,"name":"指标"}]},{"modelId":13,"name":"指标","modelTrees":[{"modelId":131,"name":"指标"},{"modelId":132,"name":"指标"},{"modelId":133,"name":"指标"}]}]},{"modelId":2,"name":"指标","modelTrees":[{"modelId":21,"name":"指标","modelTrees":[{"modelId":211,"name":"指标"},{"modelId":212,"name":"指标"}]},{"modelId":22,"name":"指标","modelTrees":[{"modelId":221,"name":"指标"},{"modelId":222,"name":"指标"},{"modelId":223,"name":"指标"}]},{"modelId":23,"name":"指标","modelTrees":[{"modelId":231,"name":"指标"},{"modelId":232,"name":"指标"},{"modelId":233,"name":"指标"}]}]},{"modelId":3,"name":"指标","modelTrees":[{"modelId":31,"name":"指标","modelTrees":[{"modelId":311,"name":"指标"},{"modelId":312,"name":"指标"}]},{"modelId":32,"name":"指标","modelTrees":[{"modelId":321,"name":"指标"},{"modelId":322,"name":"指标"},{"modelId":323,"name":"指标"}]},{"modelId":33,"name":"指标","modelTrees":[{"modelId":331,"name":"指标"},{"modelId":332,"name":"指标"},{"modelId":333,"name":"指标"}]}]},{"modelId":4,"name":"指标","modelTrees":[{"modelId":41,"name":"指标","modelTrees":[{"modelId":411,"name":"指标"},{"modelId":412,"name":"指标"}]},{"modelId":42,"name":"指标","modelTrees":[{"modelId":421,"name":"指标"},{"modelId":422,"name":"指标"},{"modelId":423,"name":"指标"}]},{"modelId":43,"name":"指标","modelTrees":[{"modelId":431,"name":"指标"},{"modelId":432,"name":"指标"},{"modelId":433,"name":"指标"}]}]}]';
        // this.jsonChartLocal = '[{"modelId":"1","leafType":0,"modelTrees":[{"modelId":"11","name":"11","leafType":0},{"modelId":"12","name":"12","leafType":1}],"name":"指标1"},{"modelId":"2","name":"指标2","leafType":0}]';
        // this.jsonChartLocal = '[{"modelId":"1","leafType":1,"name":"指标1"},{"modelId":"2","name":"指标2","leafType":0}]';

        //首页json
        this.jsonMain = '';
        this.josnEbankinfo=[];
        this.jsonMainModuleInfo = {};
        this.jsonIMDModuleInfo = {};
        this.jsonFMModuleInfo = {};
        this.josnTotalinfo=[];
        this.josnTotalinfo2=[]
        //实时存贷json
        this.jsonDL = "";
        //专题json
        this.jsonTopic = '';
        // this.jsonTopic = '[{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f602","name":"MPA","type":"5","realTime":0,"modelTrees":[{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6021","name":"宏观审慎资本充足率","type":"5","realTime":0},{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6022","name":"资本充足率","type":"5","realTime":0},{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6023","name":"含表外理财宏观审慎资本充足率","type":"5","realTime":0}]},{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f602","name":"电子银行","type":"5","realTime":0,"modelTrees":[{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6021","name":"网上银行","type":"5","realTime":0,"modelTrees":[{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6021","name":"个人银行","type":"5","realTime":0},{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6021","name":"企业网银","type":"5","realTime":0}]},{"modelId":"5b7f1981cf7c48cc9cecbf7a5c20f6021","name":"网络支付","type":"5","realTime":0}]}]';
        // this.jsonTopic = JSON.parse(this.jsonTopic);
        //行长专题json
        this.jsonPresident = '';
        //MPA指标json
        this.jsonMPA = '';
        //电子银行指标
        this.jsonEBank = '';
        //国际业务指标
        this.jsonIMD = '';   //International Marketing Department
        //指标监控指标
        this.jsonMonitor='';
        //理财指标
        this.jsonFM = '';
        //综合指标json
        this.jsonTotal = '';
        this.collectModelIds = [];
        this.existURL = '';
        this.mainView = null;

        // //采购待审批
        // this.approvalPending = '';
        // //采购已申请
        // this.haveApplied = '';
        // //采购流转日志
        // this.circulationLog = '';
        // //流转日志参数
        // this.circulationParam = '';

    }

    MBIManager.prototype._login_error_show = false;
    MBIManager.prototype = {
        init: function () {
            //初始化view视图
            this.view1 = myApp.addView('#view-1', {
                swipeBackPage: true,
                domCache: true
            });
            this.view2 = myApp.addView('#view-2', {
                swipeBackPage: true,
                domCache: true
            });
            this.view3 = myApp.addView('#view-3', {
                swipeBackPage: true,
                domCache: true
            });
            this.view4 = myApp.addView('#view-4', {
                swipeBackPage: false,
                domCache: true,
                animatePages:false
            });
            for (var i = 0; i < myApp.views.length; i++) {
                var view = myApp.views[i];
                if (view.main) {
                    this.mainView = view;
                    break;
                }
            }
        },
        getCurrView: function () {
            return window.MBIManager["view" + IndexController.viewIndex];
        },
        //=======================================================================================================================
        //=======================================================================================================================
         //图表json处理接口
        getChartData: function (jsonData) {
            var result = {};
            // 指标类型:0:节点；1:表格;2:饼图;3:单值曲线图;31:多值曲线图;4:单值柱状图;41:多值柱状图;5:数值;6:仪表盘;7:面积图;8:条形图）
            if (jsonData.type === "5") {
                var testJson = '{"id":"f0885644f05440c797339de1b51aa727","type":"5","name":"实时存款","struct":{"unit":"单位","name":"类别","value":"数值"},"records":[{"类别":"金额","数值":"677.02000","单位":"亿元"},{"类别":"比上日","数值":"0.01637","单位":"%"},{"类别":"比年初","数值":"0.06506","单位":"%"},{"类别":"比同期","数值":"10.62420","单位":"%"},{"类别":"比月初","数值":"0.01637","单位":"%"},{"类别":"时间戳","数值":"20171024090111.00000","单位":""}]}';
                result["money"] = 0;      //金额
                result["time"] = "19700101000000";      //时间1970 01 01 00 00 00 1970.01.01 00:00:00
                result["bsr"] = "0%";       //比上日
                result["bnc"] = "0%";       //比年初
                result["btq"] = "0%";       //比同期
                result["byc"] = "0%";       //比月初
                result["bncje"] = "0";       //比年初金额
                for (var i = 0; i < jsonData.records.length; i++) {
                    if (jsonData.records[i][jsonData.struct.name] === "金额"||jsonData.records[i][jsonData.struct.name] === "数值"||jsonData.records[i][jsonData.struct.name] === "存贷比") {
                        result["money"] = Number(jsonData.records[i][jsonData.struct.value]).toFixed(2);
                    } else if (jsonData.records[i][jsonData.struct.name] === "时间戳") {
                        var timeStr = parseInt(jsonData.records[i][jsonData.struct.value]);
                        timeStr = timeStr.toString();
                        var year = timeStr.substr(0, 4);
                        var month = Number(timeStr.substr(4, 2)) - 1;
                        var day = timeStr.substr(6, 2);
                        var hour = timeStr.substr(8, 2);
                        var minute = timeStr.substr(10, 2);
                        var second = timeStr.substr(12, 2);
                        var timeDate = new Date(year, month, day, hour, minute, second);
                        timeStr = year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second;
                        result["timeStr"] = timeStr;
                        result["timeDate"] = timeDate;
                    } else if (jsonData.records[i][jsonData.struct.name] === "比上日") {
                        result["bsr"] = jsonData.records[i][jsonData.struct.value];
                    } else if (jsonData.records[i][jsonData.struct.name] === "比年初") {
                        result["bnc"] = jsonData.records[i][jsonData.struct.value];
                    } else if (jsonData.records[i][jsonData.struct.name] === "比同期") {
                        result["btq"] = jsonData.records[i][jsonData.struct.value];
                    } else if (jsonData.records[i][jsonData.struct.name] === "比月初") {
                        result["byc"] = jsonData.records[i][jsonData.struct.value];
                    } else if (jsonData.records[i][jsonData.struct.name] === "比年初金额") {
                        result["bncje"] = jsonData.records[i][jsonData.struct.value];
                    }
                }

            }
            return result;
        },
        //创建MPA图表
        createChartMPA: function (divId, data) {
            // 测试
            // data = '{"id":"4ed93bc3287a418ab541be5f156d83e4","type":"14","name":"类别","struct":{"unit":"单位","x":"分类","y":"数值","y1":"数值1","y2":"数值2"},"otherInfo":{},"records":[{"分类":"签约户","数值":"10202","数值1":"10212","数值2":"10232","单位":"亿元"},{"分类":"有效户","数值":"12222","数值1":"10302","数值2":"10402","单位":"亿元"}]}';
            // data = JSON.parse(data);
            // data.type = Constants.ModuleType.Pie3D;
            // var element = $("#" + divId);
            // this.createColumnMore(element, data);
            // return;

            if (data.type === Constants.ModuleType.Pie) { //饼图  （不支持需修改）
                var series_data = [];
                var unitName = "";
                for (var x = 0; x < data.records.length; x++) {
                    var data1 = [];
                    data1.push(data.records[x][data.struct.name]);
                    data1.push(Number(data.records[x][data.struct.value]));
                    unitName = data.records[x][data.struct.unit];
                    series_data.push(data1);
                }
                // var elementTitle = $("#commonModel_title_" + data.id);
                // elementTitle.text(elementTitle.text()+"("+unitName+")");
                var element = $("#commonModel_chart_" + data.id);
                element.width("100%");
                element.height("" + (screenHeight * 0.50-50) + "px");
                element.highcharts({
                    chart: {
                        type: "pie"
                    },
                    title: {
                        text: null
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        valueDecimals: 2,
                        valueSuffix: ' ' + unitName
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.y} ' + unitName
                            },
                            events: {
                                click: function (e) {
                                    // log("x:"+e.point.category+" y:"+e.point.y);

                                    var dataJson = getModelInfo(data.id);
                                    if (dataJson.modelTrees !== undefined) {
                                        dataJson = JSON.stringify(dataJson);
                                        var url = "content/page/commonModel.html?dataJson=" + dataJson + "&param1=" + e.point.name;
                                        if(pad.toString() === "true"){
                                            window.MBIPadManager.getCurrView().router.loadPage(url);
                                        }else{
                                            MBIManager["view" + window.IndexController.viewIndex].router.loadPage(url);
                                        }
                                    }
                                }
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: ' ',
                        data: series_data
                    }]
                });
            }
            else if (data.type === "9") { //比值分析 （不支持需修改）
                var desc = '';
                for (var x = 0; x < data.records.length; x++) {
                    desc += data.records[x][data.struct.name] + ":" + data.records[x][data.struct.value] + data.records[x][data.struct.unit] + "  ";
                }
                var elementTitle = $("#commonModel_title2_" + data.id);
                elementTitle.text(desc);
            }
            else if (data.type === Constants.ModuleType.GaugeBoard) {
                if (data.records === undefined || data.records.length === 0) {
                    return;
                }
                var element = $("#" + divId);
                var len  = data.records.length-1
                var d =data.records[len][data.struct.x]
                // var  date =Common.getFormatedDate();
                var date1 = Common.getFormatedDate(Common.currDate);
                var date = date1.split("-");
                if (date.length === 3) {  //2017-08-09 日期转换为20170809
                    date = date.join("")
                }
                 date = date.substr(0,6);
              if(date<=d){
                  element.show();
                  if(pad.toString() === "true"){
                      this.createGaugeSpeed(element, data, function () {},{size:180});
                      var jsonData = {"xVal": data.records[len][data.struct.x], "modelId": data.id};
                      var subMpaId = "";
                      $("#" + divId).on('click',function () {
                          for (var i = 0; i < window.MBIPadManager.jsonMPA.length; i++) {
                              if (window.MBIPadManager.jsonMPA[i].modelId === jsonData.modelId) {
                                  if (window.MBIPadManager.jsonMPA[i].modelTrees !== undefined) {
                                      subMpaId = window.MBIPadManager.jsonMPA[i].modelTrees[0].modelId;
                                      break;
                                  }
                              }
                          }
                          if (subMpaId !== "") {
                              var url = "content/page/mpaModel.html?dataJson=" + JSON.stringify(jsonData);
                              window.MBIPadManager.getCurrView().router.loadPage(url);
                          }
                      });
                  }else{
                      this.createGaugeSpeed(element, data, function () {
                          //MPA指标点击后
                          var jsonData = {"xVal": data.records[len][data.struct.x], "modelId": data.id};
                          var subMpaId = "";

                          for (var i = 0; i < window.MBIManager.jsonMPA.length; i++) {
                              if (window.MBIManager.jsonMPA[i].modelId === jsonData.modelId) {
                                  if (window.MBIManager.jsonMPA[i].modelTrees !== undefined) {
                                      subMpaId = window.MBIManager.jsonMPA[i].modelTrees[0].modelId;
                                      break;
                                  }
                              }
                          }
                          if (subMpaId !== "") {
                              var url = "content/page/mpaModel.html?dataJson=" + JSON.stringify(jsonData);
                              window.MBIManager.getCurrView().router.loadPage(url);
                          }
                      },{size:180});
                  }
              }else{
                  element.hide();
              }

            }
            else if (data.type === Constants.ModuleType.SingleDialDashboard){
                if (data.records === undefined || data.records.length === 0) {
                    return;
                }
                var element = $("#" + divId);
                var len  = data.records.length-1
                var d =data.records[len][data.struct.x]
                // var  date =Common.getFormatedDate();
                var date1 = Common.getFormatedDate(Common.currDate);
                var date = date1.split("-");
                if (date.length === 3) {  //2017-08-09 日期转换为20170809
                    date = date.join("")
                }
                date = date.substr(0,6);
                if(date<=d){
                    element.show();
                    this.createSingleDialDashboard(element, data, function () {
                        //MPA指标点击后
                        var jsonData = {"xVal": data.records[len][data.struct.x], "modelId":data.id};

                        var subMpaId = "";
                        for (var i = 0; i < window.MBIManager.jsonMPA.length; i++) {
                            if (window.MBIManager.jsonMPA[i].modelId === jsonData.modelId) {
                                if (window.MBIManager.jsonMPA[i].modelTrees !== undefined) {
                                    subMpaId = window.MBIManager.jsonMPA[i].modelTrees[0].modelId;
                                    break;
                                }
                            }
                        }
                        if (subMpaId !== "") {
                            var url = "content/page/mpaModel.html?dataJson=" + JSON.stringify(jsonData);
                            window.MBIManager.getCurrView().router.loadPage(url);
                        }
                    });
                }else{
                    element.hide();
                }

            }
            else if (data.type === Constants.ModuleType.Dashboard){
                if (data.records === undefined || data.records.length === 0) {
                    return;
                }
                var element = $("#" + divId);
                var len  = data.records.length-1
                var d =data.records[len][data.struct.x]
                // var  date =Common.getFormatedDate();
                var date1 = Common.getFormatedDate(Common.currDate);
                var date = date1.split("-");
                if (date.length === 3) {  //2017-08-09 日期转换为20170809
                    date = date.join("")
                }
                date = date.substr(0,6);
                if(date<=d){
                    element.show();
                    this.createDashboard(element, data, function () {
                        //MPA指标点击后
                        var jsonData = {"xVal": data.records[len][data.struct.x], "modelId":data.id};

                        var subMpaId = "";
                        for (var i = 0; i < window.MBIManager.jsonMPA.length; i++) {
                            if (window.MBIManager.jsonMPA[i].modelId === jsonData.modelId) {
                                if (window.MBIManager.jsonMPA[i].modelTrees !== undefined) {
                                    subMpaId = window.MBIManager.jsonMPA[i].modelTrees[0].modelId;
                                    break;
                                }
                            }
                        }
                        if (subMpaId !== "") {
                            var url = "content/page/mpaModel.html?dataJson=" + JSON.stringify(jsonData);

                            window.MBIManager.getCurrView().router.loadPage(url);
                        }
                    });
                }else{
                    element.hide();
                }

            }
            else if (data.type === Constants.ModuleType.Solidgauge){
                if (data.records === undefined || data.records.length === 0) {
                    return;
                }
                var element = $("#" + divId);
                var len  = data.records.length-1
                var d =data.records[len][data.struct.x]
                // var  date =Common.getFormatedDate();
                var date1 = Common.getFormatedDate(Common.currDate);
                var date = date1.split("-");
                if (date.length === 3) {  //2017-08-09 日期转换为20170809
                    date = date.join("")
                }
                date = date.substr(0,6);
                    this.createSolidgauge(element, data, function () {
                        //MPA指标点击后
                        var jsonData = {"xVal": data.records[len][data.struct.x], "modelId":data.id};

                        var subMpaId = "";
                        for (var i = 0; i < window.MBIManager.jsonMPA.length; i++) {
                            if (window.MBIManager.jsonMPA[i].modelId === jsonData.modelId) {
                                if (window.MBIManager.jsonMPA[i].modelTrees !== undefined) {
                                    subMpaId = window.MBIManager.jsonMPA[i].modelTrees[0].modelId;
                                    break;
                                }
                            }
                        }
                        if (subMpaId !== "") {
                            var url = "content/page/mpaModel.html?dataJson=" + JSON.stringify(jsonData);
                            window.MBIManager.getCurrView().router.loadPage(url);
                        }
                    });

            }
            else {
                var chartType = "";
                if (data.type === "7") {    //面积图
                    chartType = "area";
                } else if (data.type === "8") { //条形图
                    chartType = "bar";
                } else if (data.type === "4") { //柱状图
                    chartType = "column";
                } else if (data.type === "3") {    //曲线图
                    chartType = "spline";
                }
                var yTitleName = "";
                var categories = [];
                var series_data = [];
                var xName = data.struct.x;
                var yName = data.struct.y;
                var unitName = "";
                var otherInfo = {};
                var minVal = 0;
                var maxVal = 0;
                for (var i = 0; i < data.records.length; i++) {

                    var xVal = Common.getOgranizationName(data.records[i][xName]);
                    var xVals = xVal.split("-");
                    if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                        xVal = xVals.join("")
                    }
                    categories.push(xVal);
                    var yVal = Number(data.records[i][yName]);
                    yVal = parseFloat(yVal.toFixed(2));
                    series_data.push(yVal);
                    unitName = data.records[i][data.struct.unit].split(',');
                    //加载Y轴额外信息
                    otherInfo[xVal] = {};
                    for (var z = 0; z < 8; z++) {
                        var otherInfoKey = data.struct["y" + z];
                        if (otherInfoKey !== undefined) {
                            otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                        }
                    }

                    minVal = Number(data.records[i][data.struct.min]);
                    maxVal = Number(data.records[i][data.struct.max]);
                }
                // minVal = 10;
                // maxVal = 11;

                var yTitleX = 0;
                var yTitleY = 0;
                if (unitName[0] === "万元" || unitName[0] === "亿元") {
                    yTitleName = "金额︵" + unitName[0] + "︶";
                    yTitleX = 70;
                    yTitleY = -30;
                } else if (unitName[0] === "%") {
                    yTitleName = "百分比︵" + unitName[0] + "︶";
                    yTitleX = 70;
                    yTitleY = -30;
                } else {
                    yTitleName = unitName[0];

                }
                if (yTitleName !== undefined) {
                    yTitleName = yTitleName.split('').join('<br>');
                }

                // var elementTitle = $("#commonModel_title_" + data.id);
                // elementTitle.text(elementTitle.text()+"("+unitName+")");
                var element = $("#" + divId);
                var chartWidth = 100;
                if (data.records.length > 30) {
                    chartWidth = 100 + (data.records.length - 30) * (100 / 30);
                }
                chartWidth = chartWidth + "%";
                element.width(chartWidth);
                element.height("" + (screenHeight * 0.50-70) + "px");
                var highchartJson = {
                    chart: {
                        type: chartType
                    },
                    title: {
                        text: ""
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {

                        categories: categories,
                        crosshair: true,
                        labels: {
                            // step:xStep,
                            style: {
                                textOverflow: 'none'
                            },
                            autoRotation: false,
                            formatter: function () {
                                var pos = this.pos;
                                var len = this.axis.categories.length - 1;
                                var xc = len - pos;
                                if(this.axis.categories.length<=2){
                                    return this.value;
                                }
                                if (this.axis.categories.length <= 15) {

                                    if (pos % 3 === 0 && xc >= 2 || pos === len) {
                                        return this.value;
                                    }
                                } else {
                                    if (pos % 10 === 0 && xc >= 9) {
                                        return this.value;
                                    };
                                    if (pos === len - 2) {
                                        return this.axis.categories[len];
                                    }

                                }


                            }

                        }
                    },
                    yAxis: {
                        title: {
                            // text: '' + yTitleName,
                            // rotation: 90,
                            // offset: 50
                            text: yTitleName,
                            rotation: 360,
                            x: yTitleX,
                            y: yTitleY
                        }
                    },
                    tooltip: {
                        // shared: true,
                        useHTML: true,
                        // headerFormat: '<span>{point.key}</span><table>',
                        // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        // // '<td style="text-align: right"><b>{point.y} </b></td></tr>' +
                        // // '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        // // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                        // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                        // footerFormat: '</table>',
                        // valueDecimals: 2,
                        // valueSuffix: ' ' + unitName[0]
                        headerFormat: '',
                        pointFormatter: function () {
                            // console.log(this);
                            var desc = Common.dateFormat1(this.category) + "<br>" + this.series.name + ":" + this.y + unitName[0];
                            return desc;
                        }
                    },
                    plotOptions: {
                        series: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            events: {
                                click: function (e) {
                                    // log("x:"+e.point.category+" y:"+e.point.y);

                                    // var dataJson = getModelInfo(data.id);
                                    // if(dataJson.modelTrees !== undefined){
                                    //     dataJson = JSON.stringify(dataJson);
                                    //     var param1 = Common.getOrganizeId(e.point.category);
                                    //     var url = "content/page/commonModel.html?modelId="+data.id +"&jsonType="+page.query.jsonType+"&dataJson="+dataJson+"&param1="+param1;
                                    //     MBIManager["view"+window.IndexController.viewIndex].router.loadPage(url);
                                    // }

                                    //MPA指标点击后
                                    var jsonData = {"xVal": e.point.category, "modelId": data.id};
                                    var subMpaId = "";
                                    for (var i = 0; i < window.MBIManager.jsonMPA.length; i++) {
                                        if (window.MBIManager.jsonMPA[i].modelId === jsonData.modelId) {
                                            if (window.MBIManager.jsonMPA[i].modelTrees !== undefined) {
                                                subMpaId = window.MBIManager.jsonMPA[i].modelTrees[0].modelId;
                                                break;
                                            }
                                        }
                                    }
                                    if (subMpaId !== "") {
                                        var url = "content/page/mpaModel.html?dataJson=" + JSON.stringify(jsonData);
                                        window.MBIManager.getCurrView().router.loadPage(url);
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,          // 开启数据标签
                                format: '{y} '
                            }
                        }
                    },
                    series: [{
                        name: data.name,
                        data: series_data
                    }]
                };
                highchartJson.yAxis.plotLines = [];
                if (minVal !== 0 && isNaN(minVal) !== true) {
                    highchartJson.yAxis.min = minVal > 0 ? minVal / 1.2 : minVal * 1.2;
                    highchartJson.yAxis.plotLines.push({
                        value: minVal,
                        width: 2,
                        color: '#FF0000',
                        label: {
                            text: "监管值"
                        }

                    });
                }
                if (maxVal !== 0 && isNaN(maxVal) !== true) {
                    highchartJson.yAxis.max = maxVal > 0 ? maxVal * 1.2 : maxVal / 1.2;
                    highchartJson.yAxis.plotLines.push({
                        value: maxVal,
                        width: 2,
                        color: '#00FF00',
                        label: {
                            text: "满分值"
                        }
                    });
                }
                // var js = JSON.stringify(highchartJson)
                element.highcharts(highchartJson);
            }
        },

        //图表创建统一接口
        createChartByFactory: function () {
            // 指标类型:0:节点；1:表格;2:饼图;3:单值曲线图;31:多值曲线图;4:单值柱状图;41:多值柱状图;5:数值;6:仪表盘;7:面积图;8:条形图;9:比值;10:环形图）
            if (arguments.length < 2 || arguments[1].type === undefined) {
                log(">>>>>>>>>>>参数错误：参考createPie(jqElement,data,clickFunc)");
                return;
            }
            switch (arguments[1].type) {
                case Constants.ModuleType.Pie:
                    this.createPie.apply(this, arguments);
                    break;
                case Constants.ModuleType.PieSp:
                    this.createPieSP.apply(this, arguments);
                    break;
                case Constants.ModuleType.LineOne:
                    this.createSpline.apply(this, arguments);
                    break;
                case Constants.ModuleType.LineMulti:
                    this.createMoreSpline.apply(this, arguments);
                    break;
                case Constants.ModuleType.ColumnOne:
                    this.createColumn.apply(this, arguments);
                    break;
                case Constants.ModuleType.ColumnMulti://多值柱状图
                    this.createColumnMore.apply(this, arguments);
                    break;

                case Constants.ModuleType.Area:
                    this.createArea.apply(this, arguments);
                    break;
                case Constants.ModuleType.Bar:
                    this.createBar.apply(this, arguments);
                    break;
                case Constants.ModuleType.LineDynamic:              //动态曲线图
                    this.createLineDynamic.apply(this, arguments);
                    break;
                case Constants.ModuleType.PieDouble:              //双层饼图
                    this.createPieDouble.apply(this, arguments);
                    break;
                case Constants.ModuleType.StackBar:              //堆叠条形图
                    this.createStackBar.apply(this, arguments);
                    break;
                case Constants.ModuleType.HistogramMixLine:   //柱状图和折线图混合图
                    this.createHisMixLine.apply(this, arguments);
                    break;
                case Constants.ModuleType.HisAndLineNoReapt:   //柱状图和折线图混合图
                    this.createHAndL.apply(this, arguments);
                    break;
                case Constants.ModuleType.Pie3D:   //3D饼图
                    this.create3DPie.apply(this, arguments);
                    break;
                case Constants.ModuleType.HisMixLineNoReapt:   //柱状图和折线图混合图（柱状图不堆叠）
                    this.createHisAndLine.apply(this, arguments);
                    break;
                case Constants.ModuleType.VariablePie:   //可变宽度环形图
                    this.createVariablePie.apply(this, arguments);
                    break;
                case Constants.ModuleType.PieGraph:   //扇形图
                    this.createPieGraph.apply(this, arguments);
                    break;
                case Constants.ModuleType.Dashboard:   //仪表盘
                    this.createDashboard.apply(this, arguments);
                    break;
                case Constants.ModuleType.GaugeBoard:   //速度仪
                    this.createGaugeSpeed.apply(this, arguments);
                    break;
                case Constants.ModuleType.SingleDialDashboard:   //单刻度仪表盘
                    this.createSingleDialDashboard.apply(this, arguments);
                    break;
                case Constants.ModuleType.Solidgauge:   //活动图
                    this.createSolidgauge.apply(this, arguments);
                    break;
                case Constants.ModuleType.StackColumn:   //堆叠柱状图
                    this.createStackColumn.apply(this, arguments);
                    break;
                case Constants.ModuleType.Pyramid:   // 金字塔图
                    this.createPyramid.apply(this, arguments);
                    break;
                case Constants.ModuleType.Areaspline:   // 曲线面积图
                    this.createAreaspline.apply(this, arguments);
                    break;
                case Constants.ModuleType.Column3D:   // 3d柱状图
                    this.create3DColumn.apply(this, arguments);
                    break;

                case Constants.ModuleType.GaugeBoardDetal:   //速度仪详细
                    this.createGaugeSpeed.apply(this, arguments);
                    break;

                default:
                    log(">>>>>>>>>>>>>createChartByType错误：图表type不存在");
            }
        },
        //1.y只有一个值的时候直接用。2.y有多个值的时候，尝试取存在的值
        getYStructName:function(data){
            var yName = "";
            if(_.isUndefined(data) === false && data.records.length > 0){
                var yInfo = data.struct.y.split(",");
                if(yInfo.length === 1){
                    yName = data.struct.y
                }else{
                    for(var i = 0;i < yInfo.length;i++){
                        if(!_.isUndefined(data.records[0][yInfo[i]])){
                            yName = yInfo[i];
                            break;
                        }
                    }
                }
            }
            return yName;
        },

        getGGStructName:function(data){
            var zName = "";
            if(_.isUndefined(data) === false && data.records.length > 0){
                if(data.struct.y1!=undefined) {
                    var zInfo = data.struct.y1.split(",");
                    if (zInfo.length === 1) {
                        zName = data.struct.y1
                    } else {
                        for (var i = 0; i < zInfo.length; i++) {
                            if (!_.isUndefined(data.records[0][zInfo[i]])) {
                                zName = zInfo[i];
                                break;
                            }
                        }
                    }
                }
            }
            return zName;
        },
        //1:表格。根据指标类型1生成表格
        createTable: function (jqElement, data) {
            if (jqElement === undefined || jqElement === null || jqElement.length === 0 || data === undefined || data === null) {
                log(">>>>>>>>>>>>>>>>>>>>>>>>> createTable错误")
                return;
            }
            jqElement.empty();
            var htmls = '';
            for (var i = 0; i < data.records.length; i++) {
                var subMpaId = data.records[i][data.struct.id];
                var x1 = data.records[i][data.struct.x1];
                if (x1 === "") {
                    x1 = '<b>' + data.records[i][data.struct.x1Extra] + '<b>';
                }
                var x2 = parseFloat(Number(data.records[i][data.struct.x2]).toFixed(2));
                var unitName = data.records[i][data.struct.unit];

                if (x2 > 10000 || x2 < -10000) {
                    x2 = Number(x2 / 10000).toFixed(0);
                    unitName = "万元";
                }
                // if(x2 > 100000000){
                //     x2 = Number(x2/100000000).toFixed(0);
                //     unitName = "亿元";
                // }else if(x2 > 10000){
                //     x2 = Number(x2/10000).toFixed(0);
                //     unitName = "万元";
                // }
                var html = '                    <tr id="mpaTr_' + subMpaId + '">\n' +
                    '                                <td  nowrap="" class="label-cell style-common-text" style="table-layout:fixed;padding-left:15px;padding-right:15px">' + x1 + '</td>\n' +
                    '                                <td nowrap="" class="numeric-cell style-common-text" style="table-layout:fixed;padding-left:15px;padding-right:23px">' + '<span>' + x2 + unitName + '</span>' + '' + '</td>\n' +
                    '                            </tr>';
                htmls += html;
            }
            jqElement.append(htmls);
        },
        //2:饼图;
        createPie: function (jqElement, data, clickFunc,objInfo) {
            //测试json:
            // {
            //     "id": "4ed93bc3287a418ab541be5f156d83e4",
            //     "type": "2",
            //     "name": "总资产分类",
            //     "struct": {
            //     "unit": "单位",
            //         "name": "分类",
            //         "value": "数值"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "分类": "买入返售资产",
            //         "数值": "13",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "现金、贵金属及存放央行",
            //         "数值": "110",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "应收款项",
            //         "数值": "7",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var flag=objInfo.flag;

            var colors = Highcharts.getOptions().colors;
            var sumNum =0;
            var fontSize = "";
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                var yVal = Number(data.records[x][data.struct.value])
                // data1.push(xVal);
                // data1.push(yVal);
                // unitName = data.records[x][data.struct.unit];
                unitName = data.records[x][data.struct.unit].split(',');
                // series_data.push(data1);
                series_data.push({
                    name: xVal,
                    y: yVal,
                    color: colors[x+2]
                });
                sumNum+=yVal;

                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = Number(data.records[x][otherInfoKey]).toFixed(2) + unitName[z];
                    }
                }
            }
            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            jqElement.width("100%");
            if(pad.toString() === "true"){
                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            if(pad.toString() === "true"){
                fontSize =14
            }else{
                fontSize =10
            }
            var highchartJson = {
                chart: {
                    type: "pie"
                },
                title: {
                    text: null
                },
                tooltip: {
                    headerFormat: '',
                    backgroundColor: '#FFFFFF',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);
                        if( data.struct.value==="期末数值"){
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + '</td><td style="text-align: left" >'  + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + data.struct.value + '</td><td style="text-align: left"> ' +this.y + unitName[0] + '</td></tr>'
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' + Number(this.percentage).toFixed(2) + '%'+ '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }else{
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + ':' + '</td><td style="text-align: left" >' + this.y + unitName[0] + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' +Number(this.percentage).toFixed(2) + '%' + '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name]+ '</td>';
                            }
                            desc += '</table>';
                        }

                        return desc;
                    },
                    useHTML: true
                },
                plotOptions: {
                    pie: {
                        size: "120",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            // format: '<b>{point.name}</b>:{point.y} '
                            formatter: function () {
                                var tip =  this.y
                                var name =this.point.name;
                                return name+":"+tip;
                            },
                            style:{
                              fontSize:fontSize + "px",
                                color: '#616667',
                                fontWeight: 'none',
                            }
                        },
                        events: {
                            click: clickFunc
                        }
                    }
                },
                series: [{
                    name: ' ',
                    data: series_data
                }]
            };
            if(pad.toString() === "true"){
                highchartJson.plotOptions.pie.size = 190;
            }

            //jqElement.highcharts(highchartJson);
            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                $("#container").css("width",(screenHeight -20)+"px");
                $("#container").css("height",(screenWidth -20)+"px");
                 Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
            }
            // if(flag==="1"){
            //     if(sumNum!==0){
            //         jqElement.highcharts().update({
            //             subtitle: {
            //                 text: '总数:'+parseFloat(Number(sumNum).toFixed(2))+unitName[0],
            //                 floating: true,
            //                 align: 'right',
            //                 // y: -10,
            //                 verticalAlign: 'bottom',
            //             }
            //         });
            //     }
            //
            // }
        },
        //17 扇形图
        createPieGraph: function (jqElement, data, clickFunc,objInfo) {
            //测试json:
            // {
            //     "id": "4ed93bc3287a418ab541be5f156d83e4",
            //     "type": "2",
            //     "name": "总资产分类",
            //     "struct": {
            //     "unit": "单位",
            //         "name": "分类",
            //         "value": "数值"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "分类": "买入返售资产",
            //         "数值": "13",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "现金、贵金属及存放央行",
            //         "数值": "110",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "应收款项",
            //         "数值": "7",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var flag=objInfo.flag;
            var sumNum =0;
            var fontSize = "";
            var colors = Highcharts.getOptions().colors;
            // colors =['#ffc65d', '#38595e', '#f4733d', '#28b78d', '#da635d',
            //       '#8a949b', '#b1938b', '#dcd0c0', '#da635d', '#7bc8a4']
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                var yVal = Number(data.records[x][data.struct.value])
                series_data.push({
                    name: xVal,
                    y: yVal,
                    color: colors[x+2]
                });
                sumNum+=yVal;

                // unitName = data.records[x][data.struct.unit];
                unitName = data.records[x][data.struct.unit].split(',');
                // series_data.push(data1);

                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            jqElement.width("100%");
            if(pad.toString() === "true"){
                fontSize =16;
                jqElement.height("" + (screenHeight * 0.30-50) + "px");
            }else{
                fontSize =10;
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            var highchartJson = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: null
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);

                        if( data.struct.value==="期末数值"){
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + '</td><td style="text-align: left" >'  + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + data.struct.value + '</td><td style="text-align: left"> ' +this.y + unitName[0] + '</td></tr>'
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' + Number(this.percentage).toFixed(2) + '%'+ '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }else{
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + ':' + '</td><td style="text-align: left" >' + this.y + unitName[0] + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' +Number(this.percentage).toFixed(2) + '%' + '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }
                        return desc;
                    },
                    useHTML: true
                },
                plotOptions: {
                    pie: {
                        size: "150",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //color:'red',
                            style:{
                                fontSize: fontSize + "px",
                                color:'#616667',
                                fontWeight:'none',
                            },
                            format: '{point.name}: {point.y} '
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        events: {
                            click: clickFunc
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '50%',
                    name: ' ',
                    data: series_data
                }]
            };
            if(pad.toString() === "true"){
                highchartJson.plotOptions.pie.size = 240;
            }
            jqElement.highcharts(highchartJson);
            // if(flag==="1"){
            //     if(sumNum!==0){
            //         jqElement.highcharts().update({
            //             subtitle: {
            //                 text: '总数:'+parseFloat(Number(sumNum).toFixed(2))+unitName[0],
            //                 floating: true,
            //                 align: 'right',
            //                 // y: -10,
            //                 verticalAlign: 'bottom',
            //             }
            //         });
            //     }
            // }
        },
        //10:环形图
        createPieSP: function (jqElement, data, clickFunc,objInfo) {
            //测试json:和createPie一样
            var series_innerSize = 50;
            if (data.type === Constants.ModuleType.PieSp) {
                series_innerSize = 50;
            }
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var flag=objInfo.flag;
            var sumNum=0;
            var fontSize = "";
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                var yVal = Number(data.records[x][data.struct.value])
                data1.push(xVal);
                data1.push(yVal);
                // unitName = data.records[x][data.struct.unit];

                unitName = data.records[x][data.struct.unit].split(',');
                series_data.push(data1);
                  sumNum+=yVal;
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            jqElement.width("100%");
            if(pad.toString() === "true"){
                fontSize =16;
                jqElement.height("" + (screenHeight * 0.40-50) + "px");
            }else{
                fontSize =10;
                jqElement.height("" + (screenHeight * 0.50-50) + "px");

            }
            var highchartJson = {
                chart: {
                    type: "pie"
                },
                title: {
                    text: null
                },
                tooltip: {
                    headerFormat: '',
                    backgroundColor: '#FFFFFF',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);
                        if( data.struct.value==="期末数值"){
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + '</td><td style="text-align: left" >'  + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + data.struct.value + '</td><td style="text-align: left"> ' +this.y + unitName[0] + '</td></tr>'
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' + Number(this.percentage).toFixed(2) + '%'+ '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }else{
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + ':' + '</td><td style="text-align: left" >' + this.y + unitName[0] + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' +Number(this.percentage).toFixed(2) + '%' + '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }
                        return desc;
                    },
                    useHTML: true
                },
                plotOptions: {
                    pie: {
                        size: "150",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            style:{
                                fontSize: fontSize+ "px",
                                color: '#616667',
                                fontWeight: 'none',
                            },
                            format: '{point.name}: {point.y} '

                        },
                        events: {
                            click: clickFunc
                        }
                    }
                },
                series: [{
                    innerSize: series_innerSize + '%',
                    name: ' ',
                    data: series_data
                }]
            };
            if(pad.toString() === "true"){
                highchartJson.plotOptions.pie.size = 220;
            }
            jqElement.highcharts(highchartJson);
            // if(flag==="1"){
            //     if(sumNum!==0){
            //         jqElement.highcharts().update({
            //             subtitle: {
            //                 text: '总数:'+parseFloat(Number(sumNum).toFixed(2))+unitName[0],
            //                 floating: true,
            //                 align: 'right',
            //                 // y: -10,
            //                 verticalAlign: 'bottom',
            //             }
            //         });
            //     }
            // }
        },
        //3:单值曲线图
        createSpline: function (jqElement, data, clickFunc, objInfo) {
            // {
            //     "id": "758e17d396b44e9b8ba09ed75b9a9468",
            //     "type": "3",
            //     "name": "资产趋势分析",
            //     "struct": {
            //     "unit": "单位",
            //         "y": "金额",
            //         "x": "日期"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "日期": "201611",
            //         "金额": "788.680000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201612",
            //         "金额": "800.450000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201701",
            //         "金额": "793.350000",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var zName = this.getGGStructName(data);
            var unitName = "";
            var otherInfo ={};
            var param1 = objInfo.param1;
            var hig =objInfo.height;
            for (var i = 0; i < data.records.length; i++) {
                var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                if (isNaN(yVal)) {
                    continue;
                }
                // yVal = Math.round(yVal,2);
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                series_data.push(yVal);
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                    }
                }
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }

            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            var chartWidth = 100;
            if (data.records.length > 30 && data.name.indexOf("趋势") === -1) {
                chartWidth = 100 + (data.records.length - 30) * (100 / 30);
            }
            var xStep = parseInt(data.records.length / 4);
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            if(hig!=undefined){
                jqElement.height(hig+"px");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            var highchartJson = {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    //tickPixelInterval:40,//设置横坐标密度
                    //minorTickInterval: 10,
                    //tickAmount: 8,
                    //tickInterval: 1,//刻度间隔
                    categories: categories,
                    tickwidth:0,//去掉刻度
                    crosshair: true,
                    labels: {
                        //step:xStep,
                        //enabled:false,//去掉刻度数字
                        style: {
                            textOverflow: 'none',
                            color: '#acadb5',
                        },
                        autoRotation: false,
                        formatter: function () {
                            var pos = this.pos;
                            var len = this.axis.categories.length - 1;
                            var xc = len - pos;
                            if(this.axis.categories.length<=2){
                                return this.value;
                            }
                            if (this.axis.categories.length <= 15) {

                                if (pos % 3 === 0 && xc >= 3 || pos === len) {
                                    return this.value;
                                }

                            } else if(15<this.axis.categories.length&&this.axis.categories.length<=25){
                                if (pos % 5 === 0 && xc >= 5) {
                                    return this.value;
                                };
                                if (pos === len - 1) {
                                    return this.axis.categories[len];
                                }
                            }else {
                                if (pos % 10 === 0 && xc >= 9) {
                                    return this.value;
                                };
                                if (pos === len - 2) {
                                    return this.axis.categories[len];
                                }

                            }


                        }

                    }
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    // useHTML: true,
                    // headerFormat: '<span>{point.key}</span><table>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>' +
                    // // '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // pointFormat: '<tr><td style="color: {series.color}"> </td>' +
                    // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // footerFormat: '</table>',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName[0]
                    // formatter: function () {
                    //     var date = '';
                    //     if (this.x.length > 0 && this.x.length <= 4) {
                    //         date = this.x + '年';
                    //     } else if (this.x.length > 4 && this.x.length <= 6) {
                    //         date = this.x.substring(0, 4) + '年' + this.x.substring(4) + '月';
                    //     } else if (this.x.length > 6 && this.x.length <= 8) {
                    //         date = this.x.substring(0, 4) + '年' + this.x.substring(4, 6) + '月' + this.x.substring(6) + '日';
                    //     }
                    //     var s = date + ',';
                    //     s += param1 + ': ' + '<b>' +
                    //         this.y + '</b>' + unitName[0];
                    //     /*
                    //     if( param1 !== "undefined"){
                    //         $.each(this.points, function () {
                    //             s += param1 + ': ' + '<b>'+
                    //                 this.y + '</b>' + unitName[0];
                    //         });
                    //     }else{
                    //         $.each(this.points, function () {
                    //             s += this.series.name + ': ' + '<b>'+
                    //                 this.y  + unitName[0];
                    //         });
                    //     } */
                    //     return s;
                    // }
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                          if(date!==undefined){
                              var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +yName + ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                          }else{
                              var html = '<table ><tr><td style="text-align: left">'+this.category + param1 + ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></tr>';

                          }
                      var tl=this.category;
                          if(otherInfo[tl].length> 0)
                          {
                            html+='<tr><td style="text-align: left">'+  zName+ ': ' + '</td>' + '<td style="text-align: left">' + otherInfo[tl][zName] + unitName[1] + '</td></tr>'
                          }

                        var info = otherInfo[this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + info[name] + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            if(name.indexOf("排名")===-1){
                                var va =parseFloat(info[name]);
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + va + unitName[1]+'</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true,
                    // backgroundColor: {
                    //     linearGradient: [0, 0, 0, 60],
                    //     stops: [
                    //         [0, '#FFFFFF'],
                    //         [1, '#E0E0E0']
                    //     ]
                    // },
                },
                plotOptions: {
                    series: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        events: {
                            click: clickFunc
                        },
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            // format: '{y} '
                            style: {
                                fontWeight: 'none',
                                //fontSize: '14px',
                                color: '#616667'
                            },
                            formatter: function () {
                                var tip =  this.y;
                                if(unitName[0] === "%"){
                                    tip=this.y+"%";
                                }
                                var pos = this.point.index;
                                var len = this.series.data.length - 1;
                                var xc = len - pos;
                                if(this.series.data.length<=2){
                                    return tip;
                                }
                                if (this.series.data.length <= 15) {

                                    if (pos % 2 === 0 && xc >= 2 || pos === len) {
                                        return tip;
                                    }
                                } else {
                                    if (pos % 4 === 0 && xc >= 4||pos === len) {
                                        return tip;
                                    };
                                }
                            }
                        }
                    },
                    spline: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                series: [{
                    name: data.name,
                    data: series_data
                }]
                // series: [{
                //     name: '东京',
                //     data: [7.00, 6.00, 9.00, 14.00, 18.00, 21.00, 25.00, 26.00, 23.00, 18.00, 13.00, 9.00]
                // }]
            };
            // if(series_data.length > 0){
            //     var sortedData = series_data.concat();
            //     sortedData.sort();
            //     if(sortedData[0] > 0){
            //         highchartJson.yAxis.min = sortedData[0]/1.05;
            //     }else{
            //         highchartJson.yAxis.min = sortedData[0]*1.05;
            //     }
            //     if(sortedData[0] > 0){
            //         highchartJson.yAxis.max = sortedData[sortedData.length-1]*1.05;
            //     }else{
            //         highchartJson.yAxis.max = sortedData[sortedData.length-1]/1.05;
            //     }
            // }

            jqElement.highcharts(highchartJson);

            // jqElement.highcharts({
            //     chart: {
            //         type: 'spline'
            //     },
            //     title: {
            //         text: 'yAxis.title.offset is set to zero'
            //     },
            //     xAxis: {
            //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            //     },
            //     yAxis: {
            //         title: {
            //             text: '我你',
            //             rotation: 360,
            //         }
            //     },
            //     series: [{
            //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            //     }]
            // });
        },
        //31:多值曲线图
        createMoreSpline: function (jqElement, data, clickFunc, objInfo) {
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var zname = data.struct.seriesName;
            var unitName = "";
            var otherInfo = {};
            var param1 = objInfo.param1;
            var zval = [];
            for (var i = 0; i < data.records.length; i++) {
                zval.push(data.records[i][zname])
            }
            var res = [];
            var json = {};
            for (var i = 0; i < zval.length; i++) {
                if (!json[zval[i]]) {
                    res.push(zval[i]);
                    json[zval[i]] = 1;
                }
            }
            for (var i = 0; i < data.records.length; i++) {
                var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                if (isNaN(yVal)) {
                    continue;
                }
                // yVal = Math.round(yVal,2);
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                    }
                }
            }
            for (var j = 0; j < res.length; j++) {
                var data1=[]
            for (var i = 0; i < data.records.length; i++) {
                var zname1 = data.records[i][zname];
                var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                if (isNaN(yVal)) {
                    continue;
                }
                // yVal = Math.round(yVal,2);
                if(zname1===res[j]){
                    data1.push(yVal);
                }
            }
                series_data.push({
                    name:res[j],
                    data:data1
                });
        }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }

            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            var chartWidth = 100;
            if (data.records.length > 30 && data.name.indexOf("趋势") === -1) {
                chartWidth = 100 + (data.records.length - 30) * (100 / 30);
            }
            var xStep = parseInt(data.records.length / 4);
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            if(pad.toString() === "true"){
                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            var highchartJson = {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                legend: {
                    enabled: true
                },
                xAxis: {

                    categories: categories,
                    crosshair: true,
                    labels: {
                        // step:xStep,
                        style: {
                            textOverflow: 'none',
                            color: '#acadb5',
                        },
                        autoRotation: false,
                        formatter: function () {
                            var pos = this.pos;
                            var len = this.axis.categories.length - 1;
                            var xc = len - pos;
                            if(this.axis.categories.length<=2){
                                return this.value;
                            }
                            if (this.axis.categories.length <= 15) {

                                if (pos % 3 === 0 && xc >= 3 || pos === len) {
                                    return this.value;
                                }

                            } else if(15<this.axis.categories.length&&this.axis.categories.length<=25){
                                if (pos % 5 === 0 && xc >= 4) {
                                    return this.value;
                                };
                                if (pos === len - 1) {
                                    return this.axis.categories[len];
                                }
                            }else {
                                if (pos % 10 === 0 && xc >= 9) {
                                    return this.value;
                                };
                                if (pos === len - 2) {
                                    return this.axis.categories[len];
                                }

                            }


                        }

                    }
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        style: {
                          color: '#acadb5'
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    // shared: true,
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +this.series.name + param1+ ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category + this.series.name +param1+ ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></tr>';
                        }
                        var info = otherInfo[this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + info[name] + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            if(name.indexOf("排名")===-1){
                                var va =parseFloat(info[name]);
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + va + unitName[1]+'</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true,
                },
                plotOptions: {
                    series: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        events: {
                            click: clickFunc
                        },
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            // format: '{y} '
                            style: {
                                color: '#616667',
                                fontWeight: 'none',
                            },
                            formatter: function () {
                                var tip = this.y
                                var pos = this.point.index;
                                var len = this.series.data.length - 1;
                                var xc = len - pos;
                                if(this.series.data.length<=2){
                                    return tip;
                                }
                                if (this.series.data.length <= 15) {

                                    if (pos % 2 === 0 && xc >= 2 || pos === len) {
                                        return tip;
                                    }
                                } else {
                                    if (pos % 4 === 0 && xc >= 4||pos === len) {
                                        return tip;
                                    };


                                }
                            }
                        }
                    },
                    spline: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                series: series_data
            };
            jqElement.highcharts(highchartJson);
        },
        //32.动态曲线图
        createLineDynamic: function (jqElement, data, clickFunc, objInfo) {

        },
        //4:单值柱状图
        createColumn: function (jqElement, data, clickFunc, objInfo) {

            // {
            //     "id": "758e17d396b44e9b8ba09ed75b9a9468",
            //     "type": "3",
            //     "name": "资产趋势分析",
            //     "struct": {
            //     "unit": "单位",
            //         "y": "金额",
            //         "x": "日期"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "日期": "201611",
            //         "金额": "788.680000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201612",
            //         "金额": "800.450000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201701",
            //         "金额": "793.350000",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var unitName = "";
            var otherInfo = {};
            var flag =objInfo.flag;
            var  colors= ['#7CB5EC', '#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var param1 = objInfo.param1;
            for (var i = 0; i < data.records.length; i++) {
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                if (xVal === undefined) {
                    continue;
                }
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                series_data.push(Number(data.records[i][yName]));
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                    }
                }
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            }else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            var highchartJson = {
                chart: {
                    type: "column"
                },
                colors:colors,
                title: {
                    text: ""
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: categories,
                    crosshair: true,
                    // labels: {
                    //     step: 3
                    // }
                    labels : {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var xVal= this.value;
                            //以字母开头的正则表达式： ^[A-Za-z]
                            var pat = /^[A-Za-z]/;
                            /*if(pat.test(xVal)){
                                xVal = xVal.substring(0,1);
                            }*/
                            return xVal;
                        },
                        //  字体大小修改
                        /*style : {
                            'fontSize' : '5px'
                        }*/
                    }
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    // shared: true,
                    // useHTML: true,
                    // headerFormat: '<span>{point.key}</span><table>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>' +
                    // // '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // pointFormat: '<tr><td style="color: {series.color}"> </td>' +
                    // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // footerFormat: '</table>',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName[0]

                    //headerFormat: '<span style="font-size:12px">{point.key}{series.name} {point.y}' + unitName[0] + '</span>',

                    // headerFormat: '<span style="font-size:12px">{point.key}'+ param1 + ': '+ ' {point.y}' + unitName[0] + '</span>',
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +param1 + ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category + param1 + ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></tr>';
                        }
                        var info = otherInfo[this.category];
                        for (var name in info) {
                            if(name.indexOf("排名")>-1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + parseFloat(info[name]) + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            //  html += '<br><span>' + name + ':' + info[name] + '</span>';
                            if(name.indexOf("排名")===-1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + parseFloat(info[name]) + '</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true
                },
                plotOptions: {
                    series: {
                        pointPadding: 0.2,
                        pointWidth: 25,
                        //pointWidth:'',
                        borderWidth: 0,
                        events: {
                            click: clickFunc
                        },
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            // format: '{y} ',
                            style: {
                                fontWeight : 'none',
                                color: '#616667'
                            },
                            formatter: function () {
                                var tip =  this.y
                                return tip;
                            }
                        }

                    }
                },
                series: [{
                    name: data.name,
                    data: series_data
                }]
            };

            //var chartWidth = 200;
            var chartWidth;

            if(pad.toString() === "true"){


                    //chartWidth = 200;
                    if (data.records.length > 9) {
                        chartWidth = 100 + (data.records.length - 8) * (100 / 16);
                    }

                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                }
                highchartJson.plotOptions.series.pointWidth = 20;
            }

            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);


            // if (data.type === "7" || data.type === "4" || data.type === "3") {    //面积图,柱状图,曲线图
            //     highchartJson.yAxis.title.rotation = 90;        //纵坐标的字体显示从上到下
            // }

            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                    $("#container").css("width",chartWidth+"%");
                }else{
                    $("#container").css("width",(screenHeight -20)+"px");
                }
                $("#container").css("height",(screenWidth -20)+"px");
                Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
                //$("#container").css("height",(screenHeight -20)+"px");
            }

             if(flag==="2"){
                 log(flag+"===========================================");
                 jqElement.highcharts().series[0].update({
                     colorByPoint: true
                 });
             }
            // jqElement.highcharts({
            //     chart: {
            //         type: 'spline'
            //     },
            //     title: {
            //         text: 'yAxis.title.offset is set to zero'
            //     },
            //     xAxis: {
            //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            //     },
            //     yAxis: {
            //         title: {
            //             text: '我你',
            //             rotation: 360,
            //         }
            //     },
            //     series: [{
            //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            //     }]
            // });
        },
        //4:多值柱状图
        createColumnMore: function (jqElement, data) {

            // {
            //     "id": "758e17d396b44e9b8ba09ed75b9a9468",
            //     "type": "3",
            //     "name": "资产趋势分析",
            //     "struct": {
            //     "unit": "单位",
            //         "y": "金额",
            //         "x": "日期"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "日期": "201611",
            //         "金额": "788.680000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201612",
            //         "金额": "800.450000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201701",
            //         "金额": "793.350000",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName =  data.struct.y;
            var unitName = "";
            var otherInfo = {};
            var  colors= ['#7CB5EC', '#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var data1=[];
            var data2=[];
            var data3=[];
            for (var i = 0; i < data.records.length; i++) {
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                if (xVal === undefined) {
                    continue;
                }
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                if(yName!==undefined&&data.records[i][yName]!=undefined){
                    data1.push(Number(data.records[i][yName]));
                }else{
                    data1.push(Number("0.00"));
                }

                 if(data.struct.y1!==undefined&&data.records[i][data.struct.y1]!=undefined){
                     data2.push(Number(data.records[i][data.struct.y1]));
                 }else{
                    data2.push(Number("0.00"));
                }
                if(data.struct.y2!==undefined&&data.records[i][data.struct.y2]!==undefined){
                    data3.push(Number(data.records[i][data.struct.y2]));
                }
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                // for (var z = 0; z < 10; z++) {
                //     var otherInfoKey = data.struct["y" + z];
                //     if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                //         otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                //
                //     }
                // }
            }
            if(data2.length>0) {
                series_data.push({
                    name: yName,
                    data: data1
                })
            }
            if(data2.length>0){
                series_data.push({
                    name: data.struct.y1,
                    data: data2
                })
            }
            if(data3.length>0){
                series_data.push({
                    name: data.struct.y2,
                    data: data3
                })
            }

            // series_data=[{
            //     name: yName,
            //     data: data1
            // }, {
            //     name: data.struct.y1,
            //     data: data2
            // }, {
            //     name: data.struct.y2,
            //     data: data3
            // }]
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            }else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            var chartWidth = 100;

            if(pad.toString() === "true"){
                jqElement.height("100%");
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length-8) * (100 / 8);
                }
                chartWidth = chartWidth + "%";
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length-8) * (100 / 5);
                }
                chartWidth = chartWidth + "%";
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            jqElement.width(chartWidth);
            var highchartJson = {
                chart: {
                    type: "column"
                },
                colors:colors,
                title: {
                    text: ""
                },
                legend: {
                    enabled: true,
                    itemStyle: {
                        color: '#616667',
                        fontWeight: 'none'
                    },
                },
                xAxis: {
                    //tickInterval: 0.8,
                    //lineWidth: 3,
                    categories: categories,
                    crosshair: true,
                    labels : {
                        //step: 3,
                        style: {
                          color: '#acadb5',
                        },
                        formatter: function () {
                            var xVal= this.value;
                            //以字母开头的正则表达式： ^[A-Za-z]
                            var pat = /^[A-Za-z]/;
                            /*if(pat.test(xVal)){
                                xVal = xVal.substring(0,1);
                            }*/
                            return xVal;
                        }
                    }
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                          color: '#616667',
                        },
                    },
                    labels: {
                        style: {
                          color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.2f}'+unitName[0]+'</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    series: {
                        pointPadding: 2.8,
                        pointWidth: 24,
                        // borderWidth: 0,
                        // borderColor: '',
                        events: {
                            click: ""
                        },
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            // format: '{y} '
                            style: {
                              color: '#616667',
                                fontWeight: 'none',
                            },
                            formatter: function () {
                                var tip =  this.y
                                return tip;
                            }
                        },
                        groupPadding : 0.9,
                    }
                },
                series:series_data
            };
            jqElement.highcharts(highchartJson);
            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                    $("#container").css("width",chartWidth+"%");
                }else{
                    $("#container").css("width",(screenHeight -20)+"px");
                }
                $("#container").css("height",(screenWidth -20)+"px");
                Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
                //$("#container").css("height",(screenHeight -20)+"px");
            }
            // if(flag==="2"){
            //     log(flag+"===========================================");
            //     jqElement.highcharts().series[0].update({
            //         colorByPoint: true
            //     });
            // }
        },
        //7:面积图
        createArea: function (jqElement, data, clickFunc,objInfo) {
            // {
            //     "id": "758e17d396b44e9b8ba09ed75b9a9468",
            //     "type": "3",
            //     "name": "资产趋势分析",
            //     "struct": {
            //     "unit": "单位",
            //         "y": "金额",
            //         "x": "日期"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "日期": "201611",
            //         "金额": "788.680000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201612",
            //         "金额": "800.450000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201701",
            //         "金额": "793.350000",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var unitName = "";
            var otherInfo = {};
            var param1 = objInfo.param1;
            if(data.records.length!==0&&data.records!==undefined){
                var rec = data.records.slice();
                rec.sort(function (a, b) {
                    return b[yName] - a[yName]
                });
                var ma =parseInt(Number(rec[0][yName])+Number(rec[0][yName]*0.05));
            }
            for (var i = 0; i < data.records.length; i++) {
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                series_data.push(Number(data.records[i][yName]));
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                    }
                }
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            var chartWidth = 100;
            if (data.records.length > 31) {
                chartWidth = 100 + (data.records.length - 15) * (100 / 15);
            }
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            jqElement.height("" + (screenHeight * 0.50-50) + "px");
            var highchartJson = {
                chart: {
                    type: "area"
                },
                title: {
                    text: ""
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: categories,
                    crosshair: true,
                    labels: {
                        //step:3,
                        style: {
                            color: '#acadb5',
                        },
                    }
                },
                yAxis: {
                    // min: 0,
                    // max:ma,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    // shared: true,
                    // useHTML: true,
                    // headerFormat: '<span>{point.key}</span><table>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>' +
                    // // '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // pointFormat: '<tr><td style="color: {series.color}"> </td>' +
                    // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // footerFormat: '</table>',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName[0]
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +param1 + ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category + param1 + ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></tr>';
                        }
                        var info = otherInfo[this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + parseFloat(info[name]) + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            //  html += '<br><span>' + name + ':' + info[name] + '</span>';
                            if(name.indexOf("排名") ===-1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + parseFloat(info[name]) +unitName[1]+ '</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true
                },
                plotOptions: {
                    series: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        events: {
                            click: clickFunc
                        },
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            style: {
                                fontWeight: 'none',
                                color: '#616667',
                            },
                            format: '{y} '
                        }
                    }
                },
                series: [{
                    name: data.name,
                    data: series_data
                }]
            };

            // if (data.type === "7" || data.type === "4" || data.type === "3") {    //面积图,柱状图,曲线图
            //     highchartJson.yAxis.title.rotation = 90;        //纵坐标的字体显示从上到下
            // }
            jqElement.highcharts(highchartJson);

            // jqElement.highcharts({
            //     chart: {
            //         type: 'spline'
            //     },
            //     title: {
            //         text: 'yAxis.title.offset is set to zero'
            //     },
            //     xAxis: {
            //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            //     },
            //     yAxis: {
            //         title: {
            //             text: '我你',
            //             rotation: 360,
            //         }
            //     },
            //     series: [{
            //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            //     }]
            // });
        },
        //8:条形图
        createBar: function (jqElement, data, clickFunc, objInfo) {
            // {
            //     "id": "758e17d396b44e9b8ba09ed75b9a9468",
            //     "type": "3",
            //     "name": "资产趋势分析",
            //     "struct": {
            //     "unit": "单位",
            //         "y": "金额",
            //         "x": "日期"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "日期": "201611",
            //         "金额": "788.680000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201612",
            //         "金额": "800.450000",
            //         "单位": "亿元"
            //     },
            //     {
            //         "日期": "201701",
            //         "金额": "793.350000",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var unitName = "";
            var otherInfo = {};
            var col = "";
            var groupPaddingValue = '';
            var pointPaddingValue = '';
            var param1 = objInfo.param1;
            for (var i = 0; i < data.records.length; i++) {
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                series_data.push(Number(data.records[i][yName]));
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                    }
                }
            }

            var headHtml = "";
            if( data.id === "addc18aaf3284ff183e4c10fdd160000" || data.id === "a84d21e6c6be45d0b34a2fffcd1c59db" || data.id === "2f45fcc434e74668bd28cafda614b98d" || data.id === "c7cdccab6b73494f954b4f49cc632b26" || data.id === "f44019860e53492f85287e78ccbb5dd6" || data.id ==="8e814ed858654ce1b426ed77674a8413" || data.id === "0a6e528747e74e59bb093d734b8d9c87" || data.id === "aab412ffccd7410ab802ddd37c1c9720"){
                headHtml = "";
            }else{
                headHtml = '<tr><td style="text-align: left">{point.key}'+ ': '+'</td>'+'';
            }
            // var yTitleX = 0;
            // var yTitleY = 0;
            // if (unitName[0] === "万元" || unitName[0] === "亿元") {
            //     yTitleName = "金额(" + unitName[0] + ")";
            //     yTitleX = 70;
            //     yTitleY = -30;
            // } else {
            //     yTitleName = unitName[0];
            // }

            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }


            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            var chartWidth = 100;
            if (data.records.length > 31) {
                chartWidth = 100 + (data.records.length - 30) * (100 / 30);
            }
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            // if(data.records.length >= 10){
            //     jqElement.height("" + (screenHeight * 0.50 + 140) + "px");
            //
            // }else if(data.records.length >7 && data.records.length < 10){
            //     jqElement.height("" + (screenHeight * 0.50 + 40) + "px");
            // } else{
            //     jqElement.height("205px");   //"" + (screenHeight * 0.50-85) + "px"
            // }
            if(pad.toString()==="true"){
                var hig =objInfo.height;
                if(hig!=undefined){
                    jqElement.height(hig+"px");
                }else{
                    if(data.id==="7c2bb73e5e8a4f219053ce97b509dc26"){
                        jqElement.height("100%");
                    }else{
                        jqElement.height((data.records.length * 40) + "px");
                    }
                    //jqElement.height("" + (screenHeight * 0.50-50) + "px");
                    //jqElement.height("120%");
                }
            }else{
                if(data.id==="b537e669b07b4accb8d23a02f4facddd"&&data.records.length<6&&data.records.length>0){
                    var heightNum = 246;
                }else{
                    var heightNum = data.records.length * 38 + 100;
                }

                jqElement.height(heightNum + "px");
            }


            var highchartJson = {
                chart: {
                    type: "bar",
                },
                title: {
                    text: ""
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: categories,
                    crosshair: true,
                    labels: {
                        enabled: false,
                        style: {
                            color: '#acadb5',
                        },
                    },
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: 70,
                        y: -30,
                        style: {
                            color: '#616667',
                        },
                    },
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: "",
                    },
                    labels: {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    // followPointer: true,
                    // followTouchMove: true,
                    // useHTML: true,
                    // headerFormat: '<span>{point.key}</span><table>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>' +
                    // // '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // pointFormat: '<tr><td style="color: {series.color}"> </td>' +
                    // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // footerFormat: '</table>',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName[0]
                    backgroundColor: '#FFFFFF',
                    valueDecimals: 2,
                    headerFormat:'<table>'+headHtml+'',
                    pointFormatter: function () {
                        // console.log(this);
                        var html = '';
                        html += '<td style="text-align: left">'+this.y.toFixed(2) + unitName[0] +'</td></tr>';
                        var info = otherInfo[this.category];
                        for (var name in info) {
                            //  html += '<br><span>' + name + ':' + info[name] + '</span>';
                            /*if(name === "变动额"){
                                continue;
                            }
                            var nam = name.split("/")[0];*/
                            html += '<tr><td style="text-align: left">' + name + ':' +'</td>'+'<td style="text-align: left">'+ info[name] + '</td></tr>';
                        }
                        html+='</table>'
                        return html;
                    },
                    useHTML: true,
                    // formatter: function () {
                    //     var s ='<table><tr><td style="text-align: left">'+ this.x + ': '+'</td>'+'<td style="text-align: left">'+this.y +'亿元' +'</td></tr>';
                    //     var info = otherInfo[this.x];
                    //     log("info: " + JSON.stringify(info));
                    //     for (var name in info) {
                    //         console.log("name: " + name);
                    //         s += '<tr><td style="text-align: left">' + name + ':' +'</td>'+'<td style="text-align: left">'+ info[name] + '</td></tr>';
                    //     }
                    //     return s;
                    // }
                },
                plotOptions: {
                    series: {
                        pointPadding: 0.1,
                        borderWidth: 0,
                        pointWidth: 20,
                        events: {
                            click: clickFunc
                        },
                        dataLabels: {
                            enabled: true,
                            inside:true,
                            align: 'left',
                            style: {
                                //fontSize: '8px',
                                fontWeight: 'none',
                                color: '#616667',
                            },
                            formatter: function () {
                                // var html = '<div style="float: left;color: red;padding: 0px;margin: 0px">' + this.x + ':'+ this.y + '</div>';
                                if( data.id === "addc18aaf3284ff183e4c10fdd160000" || data.id === "a84d21e6c6be45d0b34a2fffcd1c59db" || data.id === "2f45fcc434e74668bd28cafda614b98d" || data.id === "c7cdccab6b73494f954b4f49cc632b26" || data.id === "f44019860e53492f85287e78ccbb5dd6" || data.id ==="8e814ed858654ce1b426ed77674a8413" || data.id === "0a6e528747e74e59bb093d734b8d9c87" || data.id === "aab412ffccd7410ab802ddd37c1c9720"){
                                    return this.x ;
                                }else{
                                    return this.x + ':'+ this.y.toFixed(2);
                                }
                            }
                            // format: '{y} '
                        }
                    }
                },
                series: [{
                    //color:'#d3535b',
                    name: data.name,
                    data: series_data,
                    //negativeColor:'#93bc3d',
                }]
            };

            // if (data.type === "7" || data.type === "4" || data.type === "3") {    //面积图,柱状图,曲线图
            //     highchartJson.yAxis.title.rotation = 90;        //纵坐标的字体显示从上到下
            // }
            //jqElement.highcharts(highchartJson);
            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                    $("#container").css("width",chartWidth+"%");
                }else{
                    $("#container").css("width",(screenHeight -20)+"px");
                }
                $("#container").css("height",(screenWidth -20)+"px");
                Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
                //$("#container").css("height",(screenHeight -20)+"px");
            }
            // jqElement.highcharts({
            //     chart: {
            //         type: 'spline'
            //     },
            //     title: {
            //         text: 'yAxis.title.offset is set to zero'
            //     },
            //     xAxis: {
            //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            //     },
            //     yAxis: {
            //         title: {
            //             text: '我你',
            //             rotation: 360,
            //         }
            //     },
            //     series: [{
            //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            //     }]
            // });
        },
        //6:速度仪(仪表盘) createGaugeSpeed(,,,,{size:130})
        createGaugeSpeed: function (jqElement, data, clickFunc,otherInfo) {
            if (data.records === undefined || data.records.length === 0) {
                return;
            }
            jqElement.width("100%");
            if(pad.toString()==="true"){
                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-100) + "px");
            }

            var highchartJson = {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    marginBottom:0,
                    marginLeft:0,
                    marginTop:0,
                    marginRight:0,
                    events: {
                        // click: function (event) {}
                        click: clickFunc
                    }
                },
                title: {
                    text: null
                },
                pane: {
                    size:"130",
                    startAngle: -150,
                    endAngle: 150
                },
                // the value axis
                yAxis: {
                    min: 0,
                    max: 100,
                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',
                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    // title: {
                    //     text: data.records[data.records.length - 1][data.struct.x],
                    //     y: 10,
                    //     style: {
                    //         fontSize: 10
                    //     }
                    // },
                    plotBands: []
                },
                tooltip: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    dataLabels: {
                        formatter: function () {
                            var kmh = this.y;
                            return '<span class="style-common-text" style="font-Size:10px">' + kmh +data.records[data.records.length - 1][data.struct.unit]+'</span>';
                        }
                    },
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }]
            };

            var minVal = data.records[data.records.length - 1][data.struct.min];
            var maxVal = data.records[data.records.length - 1][data.struct.max];
            var val = parseFloat(parseFloat(data.records[data.records.length - 1][data.struct.y]).toFixed(2));
            if(val===0||isNaN(val)){
                val=NaN;
                maxVal=undefined;
            }
            var gaugeMin = 0;       //仪表盘最小值
            var gaugeMax = 100;     //仪表盘最大值
            if (minVal !== undefined && maxVal !== undefined) {     //有监管值和满分值
                if(data.name==="不良贷款率"){
                    gaugeMin = minVal > 0 ? minVal / 2 : minVal * 1.5;
                    gaugeMax = maxVal > 0 ? maxVal * 1.5 : maxVal / 2;
                    highchartJson.yAxis.min = gaugeMin;
                    highchartJson.yAxis.max = gaugeMax;
                    highchartJson.yAxis.plotBands.push({from: gaugeMin, to: minVal, color: '#55BF3B'});
                    highchartJson.yAxis.plotBands.push({from: minVal, to: maxVal, color: '#DDDF0D'});
                    highchartJson.yAxis.plotBands.push({from: maxVal, to: gaugeMax, color: '#DF5353'});
                    highchartJson.series[0].data.push(val);
                }else{
                    gaugeMin = minVal > 0 ? minVal / 2 : minVal * 1.5;
                    gaugeMax = maxVal > 0 ? maxVal * 1.5 : maxVal / 2;
                    highchartJson.yAxis.min = gaugeMin;
                    highchartJson.yAxis.max = gaugeMax;
                    highchartJson.yAxis.plotBands.push({from: gaugeMin, to: minVal, color: '#DF5353'});
                    highchartJson.yAxis.plotBands.push({from: minVal, to: maxVal, color: '#55BF3B'});
                    highchartJson.yAxis.plotBands.push({from: maxVal, to: gaugeMax, color: '#DF5353'});
                    highchartJson.series[0].data.push(val);
                }

            } else if (minVal === undefined && maxVal !== undefined) {     //只有满分值
                gaugeMin = val > 0 ? val / 2 : val * 1.5;
                gaugeMax = maxVal > 0 ? maxVal * 1.5 : maxVal / 2;
                highchartJson.yAxis.min = gaugeMin;
                highchartJson.yAxis.max = gaugeMax;
                highchartJson.yAxis.plotBands.push({from: gaugeMin, to: maxVal, color: '#55BF3B'});
                highchartJson.yAxis.plotBands.push({from: maxVal, to: gaugeMax, color: '#DF5353'});
                highchartJson.series[0].data.push(val);
            } else if (minVal !== undefined && maxVal === undefined) {     //只有监管值
                gaugeMin = minVal > 0 ? minVal / 2 : minVal * 1.5;
                gaugeMax = val > 0 ? val * 1.5 : val / 2;
                highchartJson.yAxis.min = gaugeMin;
                highchartJson.yAxis.max = gaugeMax;
                highchartJson.yAxis.plotBands.push({from: gaugeMin, to: minVal, color: '#DF5353'});
                highchartJson.yAxis.plotBands.push({from: minVal, to: gaugeMax, color: '#55BF3B'});
                highchartJson.series[0].data.push(val);
            }
            else {
                gaugeMin = val > 0 ? val / 2 : val * 1.5;
                gaugeMax = val > 0 ? val * 1.5 : val / 2;
                highchartJson.yAxis.min = gaugeMin;
                highchartJson.yAxis.max = gaugeMax;
                highchartJson.yAxis.plotBands.push({from: gaugeMin, to: gaugeMax, color: '#DDDF0D'});
                highchartJson.series[0].data.push(val);
            }

            if(pad.toString()==="true") {
                if (otherInfo !== undefined && otherInfo.hasOwnProperty("size")) {
                    highchartJson.pane.size = otherInfo.size;

                }else{
                    highchartJson.pane.size = 200;
                }
            }

            jqElement.highcharts(highchartJson);

        },
        //双层饼图
        createPieDouble: function (jqElement, data) {

            // data = '{"id":"4ed93bc3287a418ab541be5f156d83e4","type":"11","name":"总资产分类","struct":{"unit":"单位","name":"分类","pname":"父类名","value":"数值","value1":"户数"},"otherInfo":{},"records":[{"分类":"对公","数值":"40","单位":"亿元,户","户数":"100","父类名":""},{"分类":"对私","数值":"10","户数":"200","单位":"亿元,户","父类名":""},{"分类":"对公1","数值":"10","户数":"40","单位":"亿元,户","父类名":"对公"},{"分类":"对公2","数值":"30","户数":"60","单位":"亿元,户","父类名":"对公"},{"分类":"对私1","数值":"4","户数":"150","单位":"亿元,户","父类名":"对私"},{"分类":"对私2","数值":"6","户数":"50","单位":"亿元,户","父类名":"对私"}]}';

            jqElement.width("100%");
            jqElement.height("" + (screenHeight * 0.50-50) + "px");
            //解析协议json到图表json
            var unitName = "";
            var colors = Highcharts.getOptions().colors;
            var pie1Data = [];
            var pie2Data = [];
            var i = 0;
            var j = 0;
            for (i = 0; i < data.records.length; i++) {
                var nameVal = data.records[i][data.struct.name];
                unitName = data.records[i][data.struct.unit].split(",");
                if (data.records[i][data.struct.pname] === "") {      //内层饼图
                    if (data.records[i][nameVal] === undefined) {
                        data.records[i][nameVal] = [];
                    }
                }
            }
            for (i = 0; i < data.records.length; i++) {
                var pnameVal2 = data.records[i][data.struct.pname];
                if (pnameVal2 !== "") {      //外层饼图
                    for (j = 0; j < data.records.length; j++) {
                        if (data.records[j][pnameVal2] !== undefined) {
                            data.records[j][pnameVal2].push(data.records[i]);
                            break;
                        }
                    }
                }
            }
            for (i = 0; i < data.records.length; i++) {
                var nameVal = data.records[i][data.struct.name];
                if (data.records[i][data.struct.pname] === "") {
                    var otherInfo1 = {};
                    for (var x = 1; x <= 4; x++) {
                        if (data.struct["value" + x] !== undefined) {
                            otherInfo1[data.struct["value" + x]] = data.records[i][data.struct["value" + x]];
                        }
                    }
                    pie1Data.push({
                        name: data.records[i][data.struct.name],
                        y: Number(data.records[i][data.struct.value]),
                        color: colors[i],
                        otherInfo: otherInfo1
                    });
                    var subData = data.records[i][nameVal];
                    var drillDataLen = subData.length
                    for (j = 0; j < drillDataLen; j++) {
                        var brightness = 0.2 - (j / drillDataLen) / 5;
                        var otherInfo2 = {};
                        for (var y = 1; y <= 4; y++) {
                            if (data.struct["value" + y] !== undefined) {
                                otherInfo2[data.struct["value" + y]] = subData[j][data.struct["value" + y]];
                            }
                        }
                        pie2Data.push({
                            name: subData[j][data.struct.name],
                            y: Number(subData[j][data.struct.value]),
                            color: Highcharts.Color(colors[i]).brighten(brightness).get(),
                            y2: "red",
                            otherInfo: otherInfo2
                        });
                    }
                }
            }
            var highchartJson = {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        center: ['50%', '50%']
                    }
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        var desc = this.name + ":" + this.y + unitName[0];
                        var count = 0;
                        for (var name in this.otherInfo) {
                            count++;
                            desc += '<br><span>' + name + ':' + this.otherInfo[name] + unitName[count] + '</span>';
                        }
                        desc += "<br>占比:" + parseInt(this.percentage) + "%";
                        return desc;
                    },
                    useHTML: true
                },
                series: [{
                    name: data.name,
                    data: pie1Data,
                    size: '60%',
                    dataLabels: {
                        formatter: function () {
                            return this.point.name;
                        },
                        color: 'white',
                        distance: -30
                    }
                }, {
                    name: '分类明细',
                    data: pie2Data,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        // useHTML:true,
                        headerFormat: '',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b> ' + this.y + unitName;
                        }
                    }
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        //12;堆叠条形图
        createStackBar: function (jqElement, data,clickFunc) {
            // jqElement.width("100%");
            // if(data.records.length >= 10){
            //     jqElement.height("" + (screenHeight * 0.50 + 140) + "px");
            //
            // }else if(data.records.length >7 && data.records.length < 10){
            //     jqElement.height("" + (screenHeight * 0.50 + 40) + "px");
            // }else {
            //     jqElement.height("205px"); //" + (screenHeight * 0.50-85) + "
            // }

            //解析协议json到图表json
            var pval=0;
            var unitName = "";
            var colors = Highcharts.getOptions().colors;
            var categories = [];
            var pie1Data = [];
            var i = 0;
            var j = 0;
            var heightNum = 0;
            var chartWidth;
            var  colors= ['#7CB5EC', '#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            for (i = 0; i < data.records.length; i++) {
                var nameVal = data.records[i][data.struct.x];
                unitName = data.records[i][data.struct.unit].split(",");
                if (data.records[i][data.struct.pname] === "") {
                    heightNum++;
                    if (data.records[i][nameVal] === undefined) {
                        data.records[i][nameVal] = [];
                    }
                }
            }
            for (i = 0; i < data.records.length; i++) {
                var pnameVal2 = data.records[i][data.struct.pname];
                if (pnameVal2 !== "") {
                    for (j = 0; j < data.records.length; j++) {
                        if (data.records[j][pnameVal2] !== undefined) {
                            data.records[j][pnameVal2].push(data.records[i]);
                            break;
                        }
                    }
                }
            }
            for (i = 0; i < data.records.length; i++) {
                var nameVal = data.records[i][data.struct.x];
                if (data.records[i][data.struct.pname] === "") {
                    var otherInfo1 = {};
                    for (var x = 1; x <= 4; x++) {
                        if (data.struct["y" + x] !== undefined) {
                            otherInfo1[data.struct["y" + x]] = data.records[i][data.struct["y" + x]];
                        }
                    }
                    categories.push(nameVal);
                    pie1Data.push({
                        name: data.records[i][data.struct.x],
                        data: [{x: i, y:  parseFloat(Number(data.records[i][data.struct.y]).toFixed(2))}],

                    });
                    var subData = data.records[i][nameVal];
                    var drillDataLen = subData.length
                    for (j = 0; j < drillDataLen; j++) {
                        var brightness = 0.2 - (j / drillDataLen) / 5;
                        var otherInfo2 = {};
                        for (var y = 1; y <= 4; y++) {
                            if (data.struct["y" + y] !== undefined) {
                                otherInfo2[data.struct["y" + y]] = subData[j][data.struct["y" + y]];
                            }
                        }
                        pie1Data.push({
                            name: subData[j][data.struct.x],
                            data: [{x: i, y: parseFloat(Number(subData[j][data.struct.y]).toFixed(2))}],
                        });
                        for (var n = 0; n < pie1Data.length; n++) {
                            if (pie1Data[n].name === nameVal) {
                                var ny = pie1Data[n].data[0].y - Number(subData[j][data.struct.y]);
                                pval =pie1Data[n].data[0].y;
                                log(Number(ny).toFixed(2));
                                var replacement = {
                                    name: data.records[i][data.struct.x],
                                    data: [{x: i, y:parseFloat(Number(ny).toFixed(2)) }],
                                }
                                pie1Data[n] = replacement;
                            }
                        }
                    }
                    // for (var n = 0; n < pie1Data.length; n++) {
                    //     if (pie1Data[n].name === nameVal&&pie1Data[n].data[0].y!==Number(data.records[i][data.struct.y])) {
                    //         pie1Data[n].name = "其他"+nameVal;
                    //     }
                    // }
                }

            }

            jqElement.width("100%");
            if(pad.toString() === "true"){
                //jqElement.height("100%");
                if(data.id === "efd97b2da9bf49f899cb1ee64b721d41"){
                    jqElement.height("100%");
                }else{
                    jqElement.height((data.records.length * 50) + "px");
                }
            }else{
                jqElement.height(heightNum * 38 + 120 + "px");
            }

            var yTitleName = "";
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }
            var highchartJson = {
                chart: {
                    type: "bar"
                },
                colors:colors,
                title: {
                    text: ""
                },
                legend: {
                    enabled:true,
                    reversed:true,
                    itemStyle: {
                        color: '#616667',
                        fontWeight: 'none'
                    }
                },
                xAxis: {
                    categories: categories,
                    crosshair: true,
                    labels: {
                        enabled: false,
                        style: {
                            color: '#acadb5',
                        },
                    },
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: 70,
                        y: -30,
                        style: {
                            color: '#616667',
                        },
                    },
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: "",
                    },
                    labels: {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    backgroundColor: '#FFFFFF',
                    // useHTML: true,
                    // headerFormat: '<span>{point.key}</span><table>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>' +
                    // // '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // // pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    // pointFormat: '<tr><td style="color: {series.color}"> </td>' +
                    // '<td style="text-align: right"><b>{point.y} </b></td></tr>',
                    // footerFormat: '</table>',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName[0]
                    formatter: function () {
                        var s = '';
                        //if( param1 === undefined){
                        // s += param1 + ': ' + '<b>' + this.y + '</b>' + unitName[0];
                        // $.each(this.points, function () {
                        //     s += param1 + ': ' + '<b>'+
                        //         this.y + '</b>' + unitName[0];
                        // });
                        //  }else{
                        //log("series.name: " + series.name);
                        // s += this.series.name + ': ' + '<b>' + this.y + '</b>'+unitName[0];

                      var i=0;
                      var y =pval
                        $.each(this.points, function () {
                            var bl = Number(this.y/y*100).toFixed(2);
                                  if(i===0){
                                      if(this.series.name === "贷款"){
                                          this.y = pval;
                                      }
                                      s += this.series.name + ': ' + '<b>' +
                                          this.y + '</b>' + unitName[0] + '<br/>';
                                  }else{
                                      if(this.series.name==="已售金额"){
                                          s += this.series.name + ': ' + '<b>' +
                                              this.y + '</b>' + unitName[0]+ '<br/>';
                                      }else{
                                          s += this.series.name + ': ' + '<b>' +
                                              this.y + '</b>' + unitName[0] +"("+bl+"%)"+ '<br/>';
                                      }

                                  }
                               i++;


                        });
                        //}
                        return s;
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false
                        }
                    },
                    series: {
                        pointPadding: 0.1,
                        // groupPadding: 0.2,
                        borderWidth: 0,
                        pointWidth: 20,
                        events: {
                            click: clickFunc
                        },
                        stacking: 'normal',
                        dataLabels: {
                            style:{
                                color: '#616667',
                                fontWeight: 'none',
                            },
                            enabled: true,          // 开启数据标签

                            formatter: function () {
                                if(this.series.name==="贷款"||this.series.name==="待售金额"){
                                    return this.series.name + ":" + pval;
                                }else{
                                    return this.series.name + ":" + this.y;
                                }



                            }
                            // format: '{y} '
                        }
                    }
                },
                series: pie1Data
            };
            //jqElement.highcharts(highchartJson);
            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                    $("#container").css("width",chartWidth+"%");
                }else{
                    $("#container").css("width",(screenHeight -20)+"px");
                }
                $("#container").css("height",(screenWidth -20)+"px");
                Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
                //$("#container").css("height",(screenHeight -20)+"px");
            }
        },
        //柱状图和折线图混合图
        createHisMixLine :function (jqElement, data,clickFunc, objInfo) {
            // log("=========================");
            var  colors= ['#7CB5EC', '#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var yTitleName = '';
            var categories = [];
            var histogramData1 = [];
            var histogramData2 = [];
            var lineChartData = [];
            var xName = data.struct.x;
            var yName = data.struct.y;
            var z1Name = data.struct.z1;
            var z2Name = data.struct.z2;
            var otherInfo = {};
            var unitName = "";
            var subName = data.subName;
            var param = "";
            if(subName === undefined){
                param = data.name;
            }else{
                param = subName;
            }

            for (var i = 0; i < data.records.length; i++){
                var xValue = data.records[i][xName];//获取X轴数组
                if(xValue === undefined){
                    continue
                }
                var xValues = xValue.split("-");
                if(xValues.length === 3){
                    xValue = xValues.join("");  //2017-08-09 日期转换为20170809
                }
                categories.push(xValue);
                histogramData1.push(Number(data.records[i][z1Name]));
                histogramData2.push(Number(data.records[i][z2Name]));
                lineChartData.push(Number(data.records[i][yName]));
                unitName = data.records[i][data.struct.unit].split(",");
                //加载Y轴额外信息
                otherInfo[xValue] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xValue][otherInfoKey] = data.records[i][otherInfoKey];
                    }
                }
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }
            var chartWidth = 100;
            if (data.records.length > 13) {
                chartWidth = 100 + (data.records.length - 10) * (100 / 10);
            }
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            if(pad.toString() === "true"){
                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }

            var highchartJson = {
                title: {
                    text: ''
                },
                xAxis: [{
                    categories: categories,
                    crosshair: true,
                    labels:{
                        style: {
                            color: '#acadb5',
                        },
                    },
                }],
                yAxis: [{
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#acadb5',
                        },
                    }
                },
                    { // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: '#acadb5',
                            },
                        },
                        title: {
                            text: yTitleName,
                            rotation: 360,
                            x: yTitleX,
                            y: yTitleY,
                            style: {
                                color: '#616667',
                            },
                        },
                        visible : false,
                        opposite: true
                    }],
                tooltip: {
                    shared: true,
                    backgroundColor: '#FFFFFF',
                    formatter: function () {
                        var s =  this.x + param + ': ';
                        var info = otherInfo[this.x];
                        var j = 1;
                        for (var name in info) {
                            s += '<br/>' + name + ': ' + info[name] + unitName[j];
                            j++;
                        }
                        // $.each(this.points, function () {
                        //     s += '<br/>' + this.series.name + ': ' +
                        //         this.y + 'm';
                        // });
                        for(var i = 0; i < this.points.length;i++){
                            console.log("this: "+this);
                            if(i === 0){
                                s += '<br/>' + this.points[i].series.name + ': ' +
                                    this.points[i].y + unitName[i];
                            }else{
                                s += '<br/>' + this.points[i].series.name + ': ' +
                                    this.points[i].y + unitName[i+j-1];
                            }
                        }
                        return s;
                    },
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#616667',
                                fontWeight: 'none',
                            },
                        },
                        color:'#7CB5EC'
                    },spline: {
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            format: '{y}',
                            style: {
                                color: '#616667',
                                fontWeight: 'none',
                            },
                        }
                    }
                },
                legend: {
                    enabled : false
                },
                series: [{
                    name: yName,
                    type: 'spline',
                    data: lineChartData,
                    color:colors[2],
                    tooltip: {
                        valueSuffix: '%'
                    }
                },{
                    name: z1Name,
                    type: 'column',
                    color:colors[0],
                    data: histogramData1,
                    yAxis : 1,
                    tooltip: {
                        valueSuffix: ' 万'
                    },
                    colors:colors,
                },{
                    name: z2Name,
                    type: 'column',
                    color:colors[1],
                    data: histogramData2,
                    yAxis : 1,
                    tooltip: {
                        valueSuffix: ' 万'
                    }
                }]
            }
            jqElement.highcharts(highchartJson);
        },

        createHAndL : function (jqElement, data) {
            var yTitleName = '';
            var categories = [];
            var series_data=[];
            var xName = data.struct.x;
            var yName = data.struct.y;
            var zname = data.struct.seriesName;
            var otherInfo = {};
            var dw="";
            var unitName = "";
            var subName = data.subName;
            var param = "";
            if(subName === undefined){
                param = data.name;
            }else{
                param = subName;
            }
            var zval = [];
            for (var i = 0; i < data.records.length; i++) {
                zval.push(data.records[i][zname])
            }
            var res = [];
            var json = {};
            for (var i = 0; i < zval.length; i++) {
                if (!json[zval[i]]) {
                    res.push(zval[i]);
                    json[zval[i]] = 1;
                }
            }
            for (var i = 0; i < data.records.length; i++){
                var xValue = data.records[i][xName];//获取X轴数组
                if(xValue === undefined){
                    continue
                }
                var xValues = xValue.split("-");
                if(xValues.length === 3){
                    xValue = xValues.join("");  //2017-08-09 日期转换为20170809
                }
                categories.push(xValue);
                unitName = data.records[i][data.struct.unit].split(",");
                //加载Y轴额外信息
                otherInfo[data.records[i][zname]+xValue] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[data.records[i][zname]+xValue][otherInfoKey] = data.records[i][otherInfoKey];
                    }
                }
            }
            for (var j = 0; j < res.length; j++) {
                var data1=[]
                for (var i = 0; i < data.records.length; i++) {
                    var zname1 = data.records[i][zname];
                    var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                    if (isNaN(yVal)) {
                        continue;
                    }
                    // yVal = Math.round(yVal,2);
                    if(zname1===res[j]){
                        data1.push(yVal);
                    }
                }
                var type="";

                if(j===0){
                    type="column";
                }else{
                    type="spline";
                }
                series_data.push({
                    name:res[j],
                    type: type,
                    data: data1
                });
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            var chartWidth = 100;
            if (data.records.length > 24) {
                chartWidth = 100 + (data.records.length-24) * (100 / 10);
            }
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            jqElement.height("" + (screenHeight * 0.50-50) + "px");

            var highchartJson = {
                title: {
                    text: ''
                },
                xAxis: [{
                    categories: categories,
                    crosshair: true,
                    labels: {
                        // step:xStep,
                        style: {
                            textOverflow: 'none',
                            color: '#acadb5',
                        },
                        autoRotation: false,
                        formatter: function () {
                            var pos = this.pos;
                            var len = this.axis.categories.length - 1;
                            var xc = len - pos;
                            if(this.axis.categories.length<=4){
                                return this.value;
                            }
                            if (this.axis.categories.length <= 30) {

                                if (pos % 3 === 0 && xc >= 3 || pos === len) {
                                    return this.value;
                                }

                            } else if(30<this.axis.categories.length&&this.axis.categories.length<=50){
                                if (pos % 5 === 0 && xc >= 4) {
                                    return this.value;
                                };
                                if (pos === len - 1) {
                                    return this.axis.categories[len];
                                }
                            }else {
                                if (pos % 10 === 0 && xc >= 9) {
                                    return this.value;
                                };
                                if (pos === len - 2) {
                                    return this.axis.categories[len];
                                }

                            }


                        }

                    }
                }],
                yAxis: [{ // Primary yAxis
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                          color: '#616667',
                        },
                    },
                    labels: {
                        format: '{value} ',
                        style: {
                          color: '#acadb5',
                        },
                    }
                },
                    { // Secondary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#acadb5',
                        },
                    },
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    visible : false,
                    opposite: true
                }],
                tooltip: {
                    // shared: true,
                    backgroundColor: '#FFFFFF',
                    headerFormat:"",
                     pointFormatter: function () {

                         var unitArr=unitName.slice();
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(this.series.name==="交易笔数"){
                            unitName=["万笔","万笔","万笔"]
                        }else if(this.series.name==="交易金额"){
                            unitName=["亿元","亿元","亿元"]
                        }else{
                            unitName=unitArr;
                        }


                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +this.series.name + ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category + this.series.name + ': ' + '</td>' + '<td style="text-align: left">' + this.y + dw + '</td></tr>';
                        }
                        var info = otherInfo[this.series.name+this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + info[name] + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            if(name.indexOf("排名")===-1){
                                var va =parseFloat(info[name]);
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + va + unitName[1]+'</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true
                },
                legend: {
                    enabled : false
                },
                plotOptions: {
                    column: {
                        stacking: 'null',
                        dataLabels: {
                            enabled: true,
                            color: 'black',
                            formatter:function () {
                                return this.y;
                            }
                        }
                    },spline: {
                        color:'#3582ed',
                        dataLabels: {
                            //color: 'black',
                            enabled: true,          // 开启数据标签
                            style: {
                              color: '#616667',
                                fontWeight: 'none',
                            },
                            formatter:function () {
                                return this.y;
                            }
                        }
                    }
                },
                series: series_data
            }
            jqElement.highcharts(highchartJson);
        },
        //15 折线图和柱状图（柱状图不堆叠）
        createHisAndLine : function (jqElement, data) {
            var yTitleName = '';
            var categories = [];
            var histogramData1 = [];
            var histogramData2 = [];
            var lineChartData = [];
            var xName = data.struct.x;
            var yName = data.struct.y;
            var z1Name = data.struct.z1;
            var z2Name = data.struct.z2;
            var otherInfo = {};
            var unitName = "";
            var subName = data.subName;
            var param = "";
            if(subName === undefined){
                param = data.name;
            }else{
                param = subName;
            }

            for (var i = 0; i < data.records.length; i++){
                var xValue = data.records[i][xName];//获取X轴数组
                if(xValue === undefined){
                    continue
                }
                var xValues = xValue.split("-");
                if(xValues.length === 3){
                    xValue = xValues.join("");  //2017-08-09 日期转换为20170809
                }
                categories.push(xValue);
                histogramData1.push(Number(data.records[i][z1Name]));
                histogramData2.push(Number(data.records[i][z2Name]));
                lineChartData.push(Number(data.records[i][yName]));
                unitName = data.records[i][data.struct.unit].split(",");
                //加载Y轴额外信息
                otherInfo[xValue] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xValue][otherInfoKey] = data.records[i][otherInfoKey];
                    }
                }
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            var chartWidth = 100;
            if (data.records.length > 11) {
                chartWidth = 100 + (data.records.length-1) * (100 / 10);
            }
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            if(pad.toString() === "true"){
                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            var highchartJson = {
                title: {
                    text: ''
                },
                xAxis: [{
                    categories: categories,
                    crosshair: true,
                    labels:{
                        style: {
                            color: '#acadb5',
                        },
                    },
                }],
                yAxis: [{ // Primary yAxis
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        format: '{value} ',
                        style: {
                            color: '#acadb5',
                        },
                    }
                }, { // Secondary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#acadb5',
                        },
                    },
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    visible : false,
                    opposite: true
                }],
                tooltip: {
                    shared: true,
                    backgroundColor: '#FFFFFF',
                    formatter: function () {
                        var s =  this.x + param + ': ';
                        var info = otherInfo[this.x];
                        var j = 1;
                        for (var name in info) {
                            s += '<br/>' + name + ': ' + info[name] + unitName[j];
                            j++;
                        }
                        // $.each(this.points, function () {
                        //     s += '<br/>' + this.series.name + ': ' +
                        //         this.y + 'm';
                        // });
                        for(var i = 0; i < this.points.length;i++){
                            if(i === 0){
                                s += '<br/>' + this.points[i].series.name + ': ' +
                                    this.points[i].y + unitName[i];
                            }else{
                                s += '<br/>' + this.points[i].series.name + ': ' +
                                    this.points[i].y + unitName[i+j-1];
                            }
                        }
                        return s;
                    },
                    useHTML: true
                },
                legend: {
                    enabled : false
                },
                plotOptions: {
                    column: {
                        //stacking: 'null',
                        groupPadding:0.16,
                        dataLabels: {
                            enabled: false,
                            style: {
                                color: '#616667',
                                fontWeight: 'none',
                            },
                            // enabled: true,
                            // color: 'black',
                            // formatter:function () {
                            //     return this.y;
                            // }
                        }
                    },spline: {
                        dataLabels: {
                            color: 'black',
                            enabled: true,          // 开启数据标签
                            style: {
                                color: '#616667',
                                fontWeight: 'none',
                            },
                            formatter:function () {
                                return this.y +"%";
                            }
                        }
                    }
                },
                series: [{
                    name: yName,
                    type: 'spline',
                    data: lineChartData,
                    tooltip: {
                        valueSuffix: unitName[0]
                    }
                },{
                    name: z1Name,
                    type: 'column',
                    yAxis: 1,
                    data: histogramData1,
                    tooltip: {
                        valueSuffix: ' '+unitName[2]
                    }
                }, {
                    name: z2Name,
                    type: 'column',
                    yAxis: 1,
                    data: histogramData2,
                    tooltip: {
                        valueSuffix: ' '+unitName[3]
                    }
                }]
            }
            //jqElement.highcharts(highchartJson);
            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                    $("#container").css("width",chartWidth+"%");
                }else{
                    $("#container").css("width",(screenHeight -20)+"px");
                }
                $("#container").css("height",(screenWidth -20)+"px");
                Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
                //$("#container").css("height",(screenHeight -20)+"px");
            }
        },
        //14 3d饼图
        create3DPie: function (jqElement, data, clickFunc,objInfo) {
            //测试json:
            // {
            //     "id": "4ed93bc3287a418ab541be5f156d83e4",
            //     "type": "2",
            //     "name": "总资产分类",
            //     "struct": {
            //     "unit": "单位",
            //         "name": "分类",
            //         "value": "数值"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "分类": "买入返售资产",
            //         "数值": "13",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "现金、贵金属及存放央行",
            //         "数值": "110",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "应收款项",
            //         "数值": "7",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var flag=objInfo.flag;
            var sumNum=0;
            var fontSize = "";
            var colors = Highcharts.getOptions().colors;
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                var yVal = Number(data.records[x][data.struct.value])
                // data1.push(xVal);
                // data1.push(yVal);
                // unitName = data.records[x][data.struct.unit];
                unitName = data.records[x][data.struct.unit].split(',');
                // series_data.push(data1);
                series_data.push({
                    name: xVal,
                    y: yVal,
                    color: colors[x+2]
                });
                sumNum+=yVal;

                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            jqElement.width("100%");
            if(pad.toString() === "true"){
                fontSize =16;
                jqElement.height("" + (screenHeight * 0.40-50) + "px");
            }else{
                fontSize =10;
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            var highchartJson = {
                chart: {
                    type: "pie",
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: null
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);

                        if( data.struct.value==="期末数值"){
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + '</td><td style="text-align: left" >'  + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + data.struct.value + '</td><td style="text-align: left"> ' +this.y + unitName[0] + '</td></tr>'
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' + Number(this.percentage).toFixed(2) + '%'+ '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }else{
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + ':' + '</td><td style="text-align: left" >' + this.y + unitName[0] + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' +Number(this.percentage).toFixed(2) + '%' + '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }
                        return desc;
                    },
                    useHTML: true
                },
                plotOptions: {
                    pie: {
                        size: "150",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 25,
                        dataLabels: {
                            enabled: true,
                            style:{
                                fontSize:fontSize + "px",
                                color: '#616667',
                                fontWeight: 'none',
                            },
                            format: '{point.name}: {point.y} '
                        },
                        events: {
                            click: clickFunc
                        }
                    }
                },
                series: [{
                    name: ' ',
                    data: series_data
                }]
            };

            if(pad.toString() === "true"){
                highchartJson.plotOptions.pie.size = 230;
            }

            jqElement.highcharts(highchartJson);
            // if(flag==="1"){
            //     if(sumNum!==0){
            //         jqElement.highcharts().update({
            //             subtitle: {
            //                 text: '总数:'+parseFloat(Number(sumNum).toFixed(2))+unitName[0],
            //                 floating: true,
            //                 align: 'right',
            //                 // y: -10,
            //                 verticalAlign: 'bottom',
            //             }
            //         });
            //     }
            // }
        },

        //21 3d柱状图
        create3DColumn: function (jqElement, data, clickFunc,objInfo) {
            /*var colors = Highcharts.getOptions().colors;
            var  colors= ['#7CB5EC', '#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];*/
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var unitName = "";
            var otherInfo = {};
            var param1 = objInfo.param1;
            var hig =objInfo.height;
            var data1 = [];
            for (var i = 0; i < data.records.length; i++) {
                var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                if (isNaN(yVal)) {
                    continue;
                }
                // yVal = Math.round(yVal,2);
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                data1.push(yVal);
                series_data.push(yVal);
                /*series_data.push({
                    data:data1,
                    color:colors[i]
                });*/

                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[i][otherInfoKey] + unitName[z];
                    }
                }
            }

            for(var i=0;i<data.records.length-1;i++){
                for(var j=0;j<data.records.length-i-1;j++){
                    if(data1[j]>data1[j+1]){
                        var s = data1[j];
                        data1[j] = data1[j+1];
                        data1[j+1] = s;
                    }
                }
            }
            var miny = data1[0] -50;//Y轴刻度起始最小值

            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else {
                yTitleName = unitName[0];
            }

            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            if(pad.toString()==="true"){
                jqElement.width("100%");
            }else{
                var chartWidth = 100;
                if (data.records.length > 30 && data.name.indexOf("趋势") === -1) {
                    chartWidth = 100 + (data.records.length - 30) * (100 / 30);
                }
                var xStep = parseInt(data.records.length );
                chartWidth = chartWidth + "%";
                jqElement.width(chartWidth);
            }
            if(hig!=undefined){
                jqElement.height(hig+"px");
            }else{
                jqElement.height("100%");
            }
            var highchartJson = {
                colors: ['#24CBE5', '#ED561B', '#DDDF00', '#7CB5EC', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#50B432'],
                chart: {
                    type: "column",
                    margin:32,
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: -20,
                        depth:70,
                        viewDistance:100,
                    }
                },
                xAxis: {
                    categories: categories,
                    crosshair: true,
                    labels: {
                        //step:xStep,
                        style: {
                            textOverflow: 'none',
                            color: '#acadb5',
                        },
                        autoRotation: false,
                        formatter: function () {
                            var pos = this.pos;
                            var len = this.axis.categories.length - 1;
                            var xc = len - pos;
                            if(this.axis.categories.length<=2){
                                return this.value;
                            }
                            if(this.axis.categories.length<=5){
                                return this.value;
                            }
                            if (this.axis.categories.length <= 15) {

                                if (pos % 3 === 0 && xc >= 3 || pos === len) {
                                    return this.value;
                                }

                            } else if(15<this.axis.categories.length&&this.axis.categories.length<=25){
                                if (pos % 5 === 0 && xc >= 5) {
                                    return this.value;
                                };
                                if (pos === len - 1) {
                                    return this.axis.categories[len];
                                }
                            }else {
                                if (pos % 10 === 0 && xc >= 9) {
                                    return this.value;
                                };
                                if (pos === len - 2) {
                                    return this.axis.categories[len];
                                }
                            }
                        }
                    }
                },
                yAxis: {
                    // min: 0,
                    min: miny,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                      style: {
                          color: '#acadb5',
                      }
                    },
                 },
                title: {
                    text: null
                },
                tooltip: { // 表示为 鼠标放在报表图中数据点上显示的数据信息
                    shared: true,
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +param1 + ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category + param1 + ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></tr>';
                        }
                        var info = otherInfo[this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + info[name] + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            if(name.indexOf("排名")===-1){
                                var va =parseFloat(info[name]);
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + va + unitName[1]+'</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true,
                    // backgroundColor: {
                    //     linearGradient: [0, 0, 0, 60],
                    //     stops: [
                    //         [0, '#FFFFFF'],
                    //         [1, '#E0E0E0']
                    //     ]
                    // },
                },
                plotOptions: {//画各种图表的数据点的设置
                    column: {
                        //size: "190",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 25,
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'none',
                                //fontSize: '14px',
                                color: '#616667'
                            },
                            format: '{point.y} '
                        },
                        events: {
                            click: clickFunc
                        },
                        colorByPoint:true,//对柱形图 同数据列 设置颜色，属性是：colorByPoint
                        //colors:colors,
                    },
                    /*series: {
                        pointWidth: 25,
                    }*/
                },
                series: [{
                    showInLegend: false,
                    //name: data.name,
                    data: series_data,
                }],
            };
            if(data.id === "850c867766104ffc8f0a69d408f8acd0" && data1[0] > 700){
                highchartJson.yAxis.min = 680;
            }
            jqElement.highcharts(highchartJson);
        },
        //仪表盘
        createDashboard : function (jqElement, data, clickFunc) {
            if (data.records === undefined || data.records.length === 0) {
                return;
            }
            var fontSize = "";
            var ysize = "";
            var size = "";
            jqElement.width("100%");
            if(pad.toString() === "true"){
                jqElement.height("" + (screenHeight * 0.30-50) + "px");
            }else{
                jqElement.height("" + (screenHeight * 0.50-100) + "px");
            }

            if(pad.toString() === "true"){
                ysize =-40
            }else{
                ysize =-20
            }

            if(pad.toString() === "true"){
                size = "140%"
            }else{
                size = "100%"
            }

            if(pad.toString() === "true"){
                fontSize =24
            }else{
                fontSize =10
            }
            var yData = parseFloat(Number(data.records[data.records.length - 1][data.struct.y]).toFixed(2));
            var highchartJson = {
                chart: {
                    type: 'solidgauge',
                    width:jqElement.width()*0.98,
                    height:jqElement.height(),
                    //margin:[20,0,40,0],
                    events: {
                        click: clickFunc
                    }
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: size,
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 100,
                    tickWidth: 0,
                    title: {
                        y: -70,
                        text: ''
                    },
                    labels: {
                        y: 16,
                    },
                    min: 0,
                    max: 100
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: ysize,
                            borderWidth: 0,
                            useHTML: true
                        }
                    },
                    events: {
                        click: clickFunc
                    },
                },
                series: [{
                    name: '',
                    data: [yData],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-Size:'+fontSize+'px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}'+data.records[data.records.length - 1][data.struct.unit]+'</span><br/>' +
                        '</div>'
                        // '<span style="font-Size:10px;color:silver">'+ data.records[data.records.length - 1][data.struct.x] +'</span></div>'
                    },
                    tooltip: {
                        valueSuffix: ' '+data.records[data.records.length - 1][data.struct.unit]
                    }
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        //单刻度仪表盘
        createSingleDialDashboard : function (jqElement, data, clickFunc) {
            if (data.records === undefined || data.records.length === 0) {
                return;
            }
            jqElement.width("100%");
            jqElement.height("" + (screenHeight * 0.50-100) + "px");

            var yData = parseFloat(Number(data.records[data.records.length - 1][data.struct.y]).toFixed(2));
            var highchartJson = {
                chart: {
                    type: 'gauge',
                    alignTicks: false,
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    events: {
                        // click: function (event) {
                        //     log(event);
                        //     var label = this.renderer.label(
                        //         '<span style="font-size: 14px;color: #000;">比年初:</span> ' + '<span style="font-size: 14px;color: #007aff;">26%</span>'+ '<br> <span style="font-size: 14px;color: #000;">比月初:</span>' + '<span style="font-size: 14px;color: #007aff;">55%</span>',
                        //         0,
                        //         0
                        //     )
                        //         .attr({
                        //             fill: "#fff",
                        //             padding: 10,
                        //             r: 5,
                        //             zIndex: 8
                        //         })
                        //         // .css({
                        //         //     color: '#000'
                        //         // })
                        //         .add();
                        // }
                        click: clickFunc
                    }
                },
                title: {
                    text: ''
                },
                pane: {
                    startAngle: -150,
                    endAngle: 150
                },
                yAxis: [{
                    min: 0,
                    max: 124,
                    tickPosition: 'outside',
                    lineColor: '#DF5353',
                    lineWidth: 2,
                    minorTickPosition: 'outside',
                    tickColor: '#933',
                    minorTickColor: '#933',
                    tickLength: 5,
                    minorTickLength: 5,
                    labels: {
                        distance: 12,
                        rotation: 'auto'
                    },
                    offset: -20,
                    endOnTick: false
                }],
                series: [{
                    name: data.records[data.records.length - 1][data.struct.x],
                    data: [yData],
                    dataLabels: {
                        formatter: function () {
                            var kmh = this.y;
                            return '<span style="color:#000;font-Size:10px">' + kmh + data.records[data.records.length - 1][data.struct.unit]+ '</span>';
                        },
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#DDD'],
                                [1, '#FFF']
                            ]
                        }
                    },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        valueSuffix: ' '+data.records[data.records.length - 1][data.struct.unit]
                    },
                    events: {
                        click: clickFunc
                    }
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        //双圈活动图
        createSolidgauge : function (jqElement, data, clickFunc) {
            if (data.records === undefined || data.records.length === 0) {
                return;
            }
            jqElement.width("100%");
            jqElement.height("" + (screenHeight * 0.50-100) + "px");
            var   colors=['#F62366', '#89FF6B', '#D664C0']
            var yVal =data.records[0][data.struct.y];
            var yVal2 =data.records[1][data.struct.y];
            var highchartJson = {
                chart: {
                    type: 'solidgauge',
                },
                title: {
                    text: '',
                    yle: {
                        fontSize: '14px'
                    }
                },
                tooltip: {
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '14px'
                    },
                    pointFormat: '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                    positioner: function (labelWidth, labelHeight) {
                        return {
                            x:56,
                            y: 80
                        };
                    }
                },
                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    background: [{
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.Color(colors[1]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }, {
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.Color(colors[2]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }]
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },
                plotOptions: {
                    solidgauge: {
                        borderWidth: '15px',
                        dataLabels: {
                            enabled: false
                        },
                        linecap: 'round',
                        stickyTracking: false
                    }
                },
                series:
                    [{
                    name: '',
                    borderColor: colors[1],
                    data: [{
                        color: colors[1],
                        radius: '100%',
                        innerRadius: '100%',
                        y: parseInt(yVal)
                    }]
                }, {
                    name: '',
                    borderColor: colors[2],
                    data: [{
                        color:colors[2],
                        radius: '75%',
                        innerRadius: '75%',
                        y:parseInt(yVal2)
                    }]
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        //单圈活动图
        createSingleSolidgauge : function (jqElement, data, clickFunc) {
            if (data.records === undefined || data.records.length === 0) {
                return;
            }
            jqElement.width("100%");
            jqElement.height("" + (screenHeight * 0.50-100) + "px");
            var  colors=['#F62366', '#9DFF02', '#0CCDD6']
            var yVal =data.records[0][data.struct.y];
            var highchartJson = {
                chart: {
                    type: 'solidgauge',
                },
                title: {
                    text: '',
                    yle: {
                        fontSize: '14px'
                    }
                },
                tooltip: {
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '14px'
                    },
                    pointFormat: '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                    positioner: function (labelWidth, labelHeight) {
                        return {
                            x:56,
                            y: 80
                        };
                    }
                },
                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    background: [{
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.Color(colors[1]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }]
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },
                plotOptions: {
                    solidgauge: {
                        borderWidth: '15px',
                        dataLabels: {
                            enabled: false
                        },
                        linecap: 'round',
                        stickyTracking: false
                    }
                },
                series:
                    [{
                        name: '',
                        borderColor:colors[1],
                        data: [{
                            color: colors[1],
                            radius: '100%',
                            innerRadius: '100%',
                            y: parseInt(yVal)
                        }]
                    }]
            };
            jqElement.highcharts(highchartJson);
        },
        //24:堆叠柱状图
        createStackColumn : function (jqElement, data, clickFunc, objInfo) {
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var zname = data.struct.seriesName;
            var unitName = "";
            var otherInfo = {};
            var param1 = objInfo.param1;
            var zval = [];
            for (var i = 0; i < data.records.length; i++) {
                zval.push(data.records[i][zname])
            }
            // var colors = Highcharts.getOptions().colors;
            /*var  colors =['#BDDAF5', '#90ED7D', '#f4733d', '#28b78d', '#da635d',
                '#8a949b', '#b1938b', '#dcd0c0', '#da635d', '#7bc8a4']*/
            var  colors =['#f4733d', '#90ED7D', '#BDDAF5', '#28b78d', '#da635d',
                '#8a949b', '#b1938b', '#dcd0c0', '#da635d', '#7bc8a4']
            var res = [];
            var json = {};
            for (var i = 0; i < zval.length; i++) {
                if (!json[zval[i]]) {
                    res.push(zval[i]);
                    json[zval[i]] = 1;
                }
            }
            for (var i = 0; i < data.records.length; i++) {
                var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                if (isNaN(yVal)) {
                    continue;
                }
                // yVal = Math.round(yVal,2);
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[data.records[i][zname]+xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[data.records[i][zname]+xVal][otherInfoKey] = data.records[i][otherInfoKey];
                    }
                }
            }
            for (var j = 0; j < res.length; j++) {
                var data1=[]
                for (var i = 0; i < data.records.length; i++) {
                    var zname1 = data.records[i][zname];
                    var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                    if (isNaN(yVal)) {
                        continue;
                    }
                    // yVal = Math.round(yVal,2);
                    if(zname1===res[j]){
                        data1.push(yVal);
                    }
                }
                series_data.push({
                    name:res[j],
                    data:data1,
                    color:colors[j]
                });
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            }else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }

            var chartWidth = 100;
            if (data.records.length > 30) {
                chartWidth = 100 + (data.records.length-30) * (100 / 10);
            }
            chartWidth = chartWidth + "%";
            jqElement.width(chartWidth);
            if(pad.toString() === "true"){
                jqElement.height("100%");
            }else{
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }
            //jqElement.height("" + (screenHeight * 0.50-50) + "px");

            var highchartJson = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {

                    categories: categories,
                    crosshair: true,
                    labels: {
                        // step:xStep,
                        style: {
                            textOverflow: 'none',
                            color: '#adacb5',
                        },
                        autoRotation: false,
                        formatter: function () {
                            var pos = this.pos;
                            var len = this.axis.categories.length - 1;
                            var xc = len - pos;
                            if(this.axis.categories.length<=2){
                                return this.value;
                            }
                            /*if(2<this.axis.categories.length&&this.axis.categories.length<=10){
                                    return this.value;
                            }*/
                            if (this.axis.categories.length <= 30) {
                                //return this.value;
                                if (pos % 2 === 0 && xc >= 2 || pos === len) {
                                    return this.value;
                                }

                            } else if(30<this.axis.categories.length&&this.axis.categories.length<=50){
                                if (pos % 5 === 0 && xc >= 4) {
                                    return this.value;
                                };
                                if (pos === len - 1) {
                                    return this.axis.categories[len];
                                }
                            }else {
                                if (pos % 10 === 0 && xc >= 9) {
                                    return this.value;
                                };
                                if (pos === len - 2) {
                                    return this.axis.categories[len];
                                }

                            }


                        }

                    }
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        },
                    },
                    labels: {
                        style: {
                            color: '#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                legend: {
                    enable:true,
                    itemStyle: {
                        color: '#616667',
                        fontWeight: 'none'
                    }
                    // align: 'right',
                    // x: -30,
                    // verticalAlign: 'top',
                    // y: 25,
                    // floating: true,
                    // backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    // borderColor: '#CCC',
                    // borderWidth: 1,
                    // shadow: false
                },
                tooltip: {
                    // shared: true,
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +this.series.name + param1+ ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category +'</td></tr><tr><td>'+ this.series.name +param1+ ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></td>';
                        }
                        var info = otherInfo[this.series.name+this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + info[name] + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            if(name.indexOf("排名")===-1){
                                var va =parseFloat(info[name]);
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + va + unitName[1]+'</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true,
                },
                plotOptions: {
                    column: {
                        pointWidth: 18,
                        pointPadding:0.2,
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'none',
                                color: '#616667',
                            },
                        }
                    }
                },
                series:series_data
            }
            if(pad.toString() === "true"){
                highchartJson.plotOptions.column.pointWidth = 28;
            }
            //jqElement.highcharts(highchartJson);
            if(jqElement.attr("id") !== "container"){
                jqElement.highcharts(highchartJson);
            }else{
                if (data.records.length > 9) {
                    chartWidth = 100 + (data.records.length - 8) * (100 / 10);
                    $("#container").css("width",chartWidth+"%");
                }else{
                    $("#container").css("width",(screenHeight -20)+"px");
                }
                $("#container").css("height",(screenWidth -20)+"px");
                Highcharts.chart(jqElement.attr("id"), highchartJson);
                $("#container").css("width",(screenWidth -20)+"px");
                //$("#container").css("height",(screenHeight -20)+"px");
            }
        },
        //26 曲线面积图
        createAreaspline : function (jqElement, data, clickFunc, objInfo) {
            var yTitleName = "";
            var categories = [];
            var series_data = [];
            var xName = data.struct.x;
            var yName = this.getYStructName(data);
            var zname = data.struct.seriesName;
            var unitName = "";
            var otherInfo = {};
            var param1 = objInfo.param1;
            var zval = [];
            for (var i = 0; i < data.records.length; i++) {
                zval.push(data.records[i][zname])
            }
            var res = [];
            var json = {};
            for (var i = 0; i < zval.length; i++) {
                if (!json[zval[i]]) {
                    res.push(zval[i]);
                    json[zval[i]] = 1;
                }
            }
            for (var i = 0; i < data.records.length; i++) {
                var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                if (isNaN(yVal)) {
                    continue;
                }
                // yVal = Math.round(yVal,2);
                var xVal = Common.getOgranizationName(data.records[i][xName]);
                var xVals = xVal.split("-");
                if (xVals.length === 3) {  //2017-08-09 日期转换为20170809
                    xVal = xVals.join("")
                }
                categories.push(xVal);
                unitName = data.records[i][data.struct.unit].split(',');
                //加载Y轴额外信息
                otherInfo[data.records[i][zname]+xVal] = {};
                for (var z = 0; z < 10; z++) {
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                        otherInfo[data.records[i][zname]+xVal][otherInfoKey] = data.records[i][otherInfoKey];
                    }
                }
            }
            for (var j = 0; j < res.length; j++) {
                var data1=[]
                for (var i = 0; i < data.records.length; i++) {
                    var zname1 = data.records[i][zname];
                    var yVal = parseFloat(Number(data.records[i][yName]).toFixed(2));
                    if (isNaN(yVal)) {
                        continue;
                    }
                    // yVal = Math.round(yVal,2);
                    if(zname1===res[j]){
                        data1.push(yVal);
                    }
                }
                series_data.push({
                    showInLegend: false,
                    name:res[j],
                    data:data1
                });
            }
            var yTitleX = 0;
            var yTitleY = 0;
            if (unitName[0] === "万元" || unitName[0] === "亿元") {
                yTitleName = "金额︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "%") {
                yTitleName = "百分比︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            } else if (unitName[0] === "万笔"||unitName[0] === "万张") {
                yTitleName = "数量︵" + unitName[0] + "︶";
                yTitleX = 70;
                yTitleY = -30;
            }else {
                yTitleName = unitName[0];
            }
            if (yTitleName !== undefined) {
                yTitleName = yTitleName.split('').join('<br>');
            }
            var hig =objInfo.height;
            if(pad.toString()==="true"){
                jqElement.width("100%");
                if(hig!=undefined){
                    jqElement.height(hig+"px");
                }else{
                    //jqElement.height("" + (screenHeight * 0.35-68) + "px");
                    jqElement.height("100%");
                }
            }else{
                var chartWidth = 100;
                if (data.records.length > 30) {
                    chartWidth = 100 + (data.records.length-30) * (100 / 10);
                }
                chartWidth = chartWidth + "%";
                jqElement.width(chartWidth);
                jqElement.height("" + (screenHeight * 0.50-50) + "px");
            }

            var highchartJson = {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: ''
                },
                xAxis: {

                    categories: categories,
                    crosshair: true,
                    labels: {
                        // step:xStep,
                        style: {
                            textOverflow: 'none',
                            color:'#acadb5',
                        },
                        autoRotation: false,
                        formatter: function () {
                            var pos = this.pos;
                            var len = this.axis.categories.length - 1;
                            var xc = len - pos;
                            if(this.axis.categories.length<=2){
                                return this.value;
                            }
                            if (this.axis.categories.length <= 30) {

                                if (pos % 3 === 0 && xc >= 3 || pos === len) {
                                    return this.value;
                                }

                            } else if(30<this.axis.categories.length&&this.axis.categories.length<=50){
                                if (pos % 5 === 0 && xc >= 4) {
                                    return this.value;
                                };
                                if (pos === len - 1) {
                                    return this.axis.categories[len];
                                }
                            }else {
                                if (pos % 10 === 0 && xc >= 9) {
                                    return this.value;
                                };
                                if (pos === len - 2) {
                                    return this.axis.categories[len];
                                }

                            }


                        }

                    }
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: yTitleName,
                        rotation: 360,
                        x: yTitleX,
                        y: yTitleY,
                        style: {
                            color: '#616667',
                        }
                    },
                    labels: {
                        style: {
                            color:'#acadb5',
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                legend: {
                    enable:true
                    // align: 'right',
                    // x: -30,
                    // verticalAlign: 'top',
                    // y: 25,
                    // floating: true,
                    // backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    // borderColor: '#CCC',
                    // borderWidth: 1,
                    // shadow: false
                },
                tooltip: {
                    // shared: true,
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    pointFormatter: function () {
                        // console.log(this);
                        if(isNaN(this.category)===false){
                            var date = '';
                            if (this.category.length > 0 && this.category.length <= 4) {
                                date = this.category + '年';
                            } else if (this.category.length > 4 && this.category.length <= 6) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4) + '月';
                            } else if (this.category.length > 6 && this.category.length <= 8) {
                                date = this.category.substring(0, 4) + '年' + this.category.substring(4, 6) + '月' + this.category.substring(6) + '日';
                            }
                        }
                        if(date!==undefined){
                            var html = '<table><tr><td style="text-align: left">'+date+ '</td></tr>' + '<tr><td style="text-align: left">' +this.series.name + param1+ ': '+'</td><td style="text-align: left">' +this.options.y + unitName[0] + '</td></tr>';
                        }else{
                            var html = '<table><tr><td style="text-align: left">'+this.category + this.series.name +param1+ ': ' + '</td>' + '<td style="text-align: left">' + this.y + unitName[0] + '</td></tr>';
                        }
                        var info = otherInfo[this.series.name+this.category];
                        for (var name in info) {
                            if(name.indexOf("排名") > -1){
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + info[name] + '</td></tr>';
                            }
                        }
                        for (var name in info) {
                            if(name.indexOf("排名")===-1){
                                var va =parseFloat(info[name]);
                                html += '<tr><td style="text-align: left">' + name + ':' + '</td>' + '<td style="text-align: left">' + va + unitName[1]+'</td></tr>';
                            }
                        }
                        html += '</table>';
                        return html;
                    },
                    useHTML: true,
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5,
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'none',
                              color: '#616667',
                            },
                        }
                    }
                },
                series:series_data
                /*series: [{
                    //showInLegend: false,
                    data: series_data
                }]*/
            }
            jqElement.highcharts(highchartJson);
        },
        //2:金字塔图
        createPyramid: function (jqElement, data) {
            //测试json:
            // {
            //     "id": "4ed93bc3287a418ab541be5f156d83e4",
            //     "type": "2",
            //     "name": "总资产分类",
            //     "struct": {
            //     "unit": "单位",
            //         "name": "分类",
            //         "value": "数值"
            // },
            //     "otherInfo": {},
            //     "records": [
            //     {
            //         "分类": "买入返售资产",
            //         "数值": "13",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "现金、贵金属及存放央行",
            //         "数值": "110",
            //         "单位": "亿元"
            //     },
            //     {
            //         "分类": "应收款项",
            //         "数值": "7",
            //         "单位": "亿元"
            //     }
            // ]
            // }
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var colors = Highcharts.getOptions().colors;
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                var yVal = Number(data.records[x][data.struct.value])
                // data1.push(xVal);
                // data1.push(yVal);
                // unitName = data.records[x][data.struct.unit];
                unitName = data.records[x][data.struct.unit].split(',');
                // series_data.push(data1);
                series_data.push({
                    name: xVal,
                    y: yVal,
                    color: colors[x+2]
                });

                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            jqElement.width("100%");
            jqElement.height("" + (screenHeight * 0.50-50) + "px");
            var highchartJson = {
                chart: {
                    type: 'pyramid'
                },
                title: {
                    text: '',
                    x: -50
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b> ({point.y:,.0f})',
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            softConnector: true,
                            style: {
                              color: '#616667',
                                fontWeight: 'none',
                            },
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                    backgroundColor: '#FFFFFF',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);
                        var desc = this.name + ":" + this.y + unitName[0];
                        var info = otherInfo[this.name];
                        for (var name in info) {
                            desc += '<br><span>' + name + ':' + info[name] + '</span>';
                        }
                        // desc += "<br>占比:" + parseInt(this.percentage) + "%";
                        return desc;
                    },
                    useHTML: true
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: series_data
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        //加载指标解释内容
        loadQuotaExplain: function (showData, funcCb) {
            if ($.isEmptyObject(showData)) {
                return;
            }
            var idSend = {};
            var idArray = new Array()
            for (var i = 0; i < showData.length; i++) {
                if (Common.quotaExplain.hasOwnProperty(showData[i].modelId)) {
                    continue;
                } else {
                    idArray[i] = showData[i]["modelId"];
                }
            }
            idSend.ids = idArray;
            // idSend = JSON.stringify(idSend);
            NetManager.httpReq("appModel/getAppModelDesc", idSend, function (data) {
                for (var key in data) {
                    Common.quotaExplain[key] = data[key];
                }
                if (funcCb !== undefined) {
                    funcCb(data);
                }
            }, function (data) {
                // log("data: " + data);//error deal
            });

        },
        //16 可变宽度的环形图
        createVariablePie: function (jqElement, data, clickFunc,objInfo) {
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var flag =objInfo.flag;
            var sumNum =0;
            var fontSize = "";
            var colors = Highcharts.getOptions().colors;
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                var yVal = Number(data.records[x][data.struct.value]);
                var zVal = Common.randomNum(500,2000);

                // unitName = data.records[x][data.struct.unit];
                unitName = data.records[x][data.struct.unit].split(',');
                series_data.push({
                    name:xVal,
                    y:yVal,
                    z:zVal,
                    color: colors[x+2]
                });
                sumNum+=yVal

                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            jqElement.width("100%");
            jqElement.height("" + (screenHeight * 0.50-50) + "px");
            if(pad.toString() === "true"){
                fontSize =16
            }else{
                fontSize =10
            }
            var highchartJson = {
                chart: {
                    type: 'variablepie'
                },
                title: {
                    text: null
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    headerFormat: '',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);

                        if( data.struct.value==="期末数值"){
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + '</td><td style="text-align: left" >'  + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + data.struct.value + '</td><td style="text-align: left"> ' +this.y + unitName[0] + '</td></tr>'
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' + Number(this.percentage).toFixed(2) + '%'+ '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }else{
                            var desc = '<table><tr><td style="text-align: left;">' + this.name + ':' + '</td><td style="text-align: left" >' + this.y + unitName[0] + '</td></tr>';
                            desc += '<tr><td style="text-align: left">' + '占比:' + '</td><td style="text-align: left"> ' +Number(this.percentage).toFixed(2) + '%' + '</td></tr>'
                            var info = otherInfo[this.name];
                            for (var name in info) {
                                desc += '<tr><td style="text-align: left">' + name + ':' + '</td><td style="text-align: left"> ' + info[name] + '</td>';
                            }
                            desc += '</table>';
                        }
                        return desc;
                    },
                    useHTML: true
                },
                plotOptions: {
                    variablepie: {
                        size: "150",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            style:{
                                fontSize:fontSize+"px",
                                color:'#616667',
                                fontWeight:'none',
                            },
                            format: '{point.name}: {point.y} '
                        },
                        events: {
                            click: clickFunc
                        }
                    }
                },
                series: [{
                    minPointSize: 10,
                    innerSize: '20%',
                    zMin: 0,
                    name: ' ',
                    data: series_data
                }]
            };

            if(pad.toString() === "true"){
                highchartJson.plotOptions.variablepie.size = 230;
            }

            jqElement.highcharts(highchartJson);
            // if(flag==="1"){
            //     if(sumNum!==0){
            //         jqElement.highcharts().update({
            //             subtitle: {
            //                 text: '总数:'+parseFloat(Number(sumNum).toFixed(2))+unitName[0],
            //                 // floating: true,
            //                 align: 'right',
            //                 // y: -10,
            //                 verticalAlign: 'bottom',
            //             }
            //         });
            //     }
            // }
        },

        createTableUn : function (popupSelector,jqElement,data,param) {
            if(isApp){
                // data = '{"id":"5891c0fb6a4b4ac282cebc916aa34cd9","type":"8","name":"存款十大户","subName":"","struct":{"unit":"单位","y1":"序号","y2":"其中定期存款","y":"存款余额","x":"客户名称"},"otherInfo":{"order":"y1,x,y,y2"},"records":[{"序号":"001","客户名称":"苏州市吴江区财政局","存款余额":"81.40","其中定期存款":"43.93","单位":"亿元,,亿元"},{"序号":"002","客户名称":"句容市财政局","存款余额":"19.75","其中定期存款":"0.23","单位":"亿元,,亿元"},{"序号":"003","客户名称":"苏州吴江太湖新城财政局","存款余额":"13.90","其中定期存款":"1.00","单位":"亿元,,亿元"},{"序号":"004","客户名称":"江苏省汾湖高新技术产业开发区财政局","存款余额":"9.73","其中定期存款":"2.71","单位":"亿元,,亿元"},{"序号":"005","客户名称":"苏州市吴江区盛泽镇财政和资产管理局","存款余额":"4.65","其中定期存款":"0.50","单位":"亿元,,亿元"},{"序号":"006","客户名称":"泰兴市财政局非税收入财政专户","存款余额":"4.59","其中定期存款":"0.75","单位":"亿元,,亿元"},{"序号":"007","客户名称":"苏州市吴江区人民法院","存款余额":"4.44","其中定期存款":"0.01","单位":"亿元,,亿元"},{"序号":"008","客户名称":"苏州市吴江区桃源镇财政所","存款余额":"3.71","其中定期存款":"0.46","单位":"亿元,,亿元"},{"序号":"009","客户名称":"苏州汾湖投资集团有限公司","存款余额":"3.25","其中定期存款":"2.00","单位":"亿元,,亿元"},{"序号":"010","客户名称":"苏州市吴江区财政局七都镇财政分局","存款余额":"3.18","其中定期存款":"0.00","单位":"亿元,,亿元"}]}';
                data.style = window.MBIStyle.currStyle;
                var jsonDataStr = JSON.stringify(data);
                AppOp.showExcel(jsonDataStr,window.MBIStyle.currStyle);
                return;
            }
            if (jqElement === undefined || jqElement === null || jqElement.length === 0 || data === undefined || data === null) {
                log(">>>>>>>>>>>>>>>>>>>>>>>>> createTable错误");
                return;
            }
            // error(data);

            jqElement.empty();
            // 1 表示通用页面   2 表示关注页面
            if(param === 2){
                $('#table_collect_title_name').text(data.name);
            }else {
                $('#table_title_name').text(data.name);
            }
            var htmls = '<table >\n<thead>\n<tr>\n';
            var tableTitle = '';
            var unitName = '';
            //x，y通用。需日期倒序处理。order顺序。单元格变色(实时存贷比)
            //饼图处理
            //折线柱状混合图
            //双折线
            //合并单元格显示

            if(data.type === '3' || data.type ==='4'|| data.type ==='41' || data.type ==='8' || data.type ==='12' || data.type ==='7'|| data.type ==='18'|| data.type ==='27'|| data.type ==='13'){
                var yName = this.getYStructName(data);
                if(data.otherInfo.order !== undefined){
                    var orderString = data.otherInfo.order;
                    var orderArr = orderString.split(",");
                    for(var x = 0; x < orderArr.length; x++){
                        var headHtml = ''
                        var serValue = orderArr[x];
                        if(serValue === 'y'){
                            headHtml = '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>';
                        }else{
                            headHtml = '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">'+ data.struct[serValue] +'</th>';
                        }
                        htmls += headHtml;
                    }
                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                    if((data.struct.x).indexOf('日期') > -1){
                        for (var i = data.records.length -1 ; i >= 0; i--){
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html = '';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }
                            for(var x = 0; x < orderArr.length; x++){
                                var valueSeries = orderArr[x];
                                if(valueSeries === 'y'){
                                    var afterOderValue = data.records[i][yName];
                                }else{
                                    var afterOderValue = data.records[i][data.struct[valueSeries]];
                                }
                                var className = ''
                                if($.isNumeric(afterOderValue)){
                                    afterOderValue = parseFloat(Number(afterOderValue).toFixed(2));
                                    className = "numeric-cell";
                                }else{
                                    className = "label-cell";
                                }
                                if(valueSeries === 'y'){
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[0] + '</td>\n';
                                }else if(valueSeries.indexOf('y') > -1 && valueSeries !== 'y'){
                                    var p = valueSeries.substring(1);
                                    html +=  '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[p] + '</td>\n';
                                }else{
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }else {
                        for (var i = 0; i < data.records.length ; i++){
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html = '';
                            if(i % 2 == 0){
                                html += '<tr class="style-table-one" >\n';
                            }else{
                                html += '<tr class="style-table-two" >\n';
                            }
                            for(var x = 0; x < orderArr.length; x++){
                                var valueSeries = orderArr[x];
                                if(valueSeries === 'y'){
                                    var afterOderValue = data.records[i][yName];
                                }else {
                                    var afterOderValue = data.records[i][data.struct[valueSeries]];
                                }
                                var className = ''
                                if($.isNumeric(afterOderValue)){
                                    afterOderValue = parseFloat(Number(afterOderValue).toFixed(2));
                                    className = "numeric-cell";
                                }else{
                                    className = "label-cell";
                                }
                                if(valueSeries === 'y'){
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[0] + '</td>\n';
                                }else if(valueSeries.indexOf('y') > -1 && valueSeries !== 'y'){
                                    var p = valueSeries.substring(1);
                                    html +=  '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[p] + '</td>\n';
                                }else{
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }
                }else{
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>\n';
                    for (var z =0; z < 20 ; z++){
                        var titleName = data.struct["y" + z];
                        if(titleName !== undefined ){   //&& data.records[0][titleName] !== undefined

                            htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ titleName +'</th>\n';
                        }
                    }

                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                    if((data.struct.x).indexOf('日期') > -1){
                        for (var i = data.records.length - 1; i >= 0 ; i--) {
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html='';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }

                            var yValue = data.records[i][yName];
                            if(yValue !== undefined){
                                if($.isNumeric(yValue)){
                                    yValue = parseFloat(Number(yValue).toFixed(2))
                                }
                            }else{
                                yValue = "-";
                            }


                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n' +
                                '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + unitName[0] + '</td>\n';

                            for(var j = 0; j < 20 ; j++){
                                var titleName = data.struct["y" + j];
                                if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                    var icount = 1;
                                    var ySeValue = data.records[i][titleName];
                                    if($.isNumeric(ySeValue)){
                                        ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2))
                                    }
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue + unitName[icount] + '</td>\n';
                                    icount++
                                }
                            }

                            html += '</tr>\n';
                            htmls += html;
                        }
                    }else{
                        for (var i = 0; i < data.records.length; i++) {
                            // //去除涉农贷款
                            // if(data.records[i][data.struct.x].indexOf("涉农贷款") > -1){
                            //     continue;
                            // }
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html='';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }

                            var yValue = data.records[i][yName];
                            if(yValue !== undefined){
                                if($.isNumeric(yValue)){
                                    yValue = parseFloat(Number(data.records[i][yName]).toFixed(2))
                                }
                            }else{
                                yValue = "-";
                            }

                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ Common.getOgranizationName(data.records[i][data.struct.x]) + '</td>\n' +
                                '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + unitName[0] + '</td>\n';

                            for(var j = 0; j < 20 ; j++){
                                var titleName = data.struct["y" + j];
                                var icount = 1;
                                if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                    var ySeValue = data.records[i][titleName];
                                    if($.isNumeric(ySeValue)){
                                        ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2));
                                    }
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue + unitName[icount] + '</td>\n';
                                    icount++;
                                }else if(titleName !== undefined && data.records[i][titleName] === undefined){
                                     html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">0.00' + unitName[icount] + '</td>\n';
                                     icount++;
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }
                }
            }
            if(data.type === '2' || data.type === '10' || data.type === '14' || data.type === '16' || data.type === '17'){
                if(data.otherInfo.order !== undefined){
                    var orderString = data.otherInfo.order;
                    var orderArr = orderString.split(",");
                    for(var x = 0; x < orderArr.length; x++){
                        var headHtml = ''
                        var serValue = orderArr[x];
                            headHtml = '<th class="label-cell style-table-title" style="font-size: 16px;;text-align: center">'+ data.struct[serValue] +'</th>';
                        htmls += headHtml;
                    }
                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                        for (var i = 0; i < data.records.length ; i++){
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html = '';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }
                            for(var x = 0; x < orderArr.length; x++){
                                var valueSeries = orderArr[x];

                                    var afterOderValue = data.records[i][data.struct[valueSeries]];
                                var className = ''
                                if($.isNumeric(afterOderValue)){
                                    afterOderValue = parseFloat(Number(afterOderValue).toFixed(2));
                                    className = "numeric-cell";
                                }else{
                                    className = "label-cell";
                                }
                                if(valueSeries === 'y'){
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[0] + '</td>\n';
                                }else if(valueSeries.indexOf('y') > -1 && valueSeries !== 'y'){
                                    var p = valueSeries.substring(1);
                                    html +=  '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[p] + '</td>\n';
                                }else{
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }

                }else{
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.name + '</th>\n<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ data.struct.value +'</th>\n';

                    for (var z =0; z < 10; z++){
                        var zName = data.struct["value" + z];
                        if(zName !== undefined){
                            htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ zName +'</th>\n'
                        }
                    }

                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                    for (var i = 0; i < data.records.length; i++) {
                        var unitName = data.records[i][data.struct.unit].split(',');

                        var html='';
                        if(i % 2 == 0){
                            html += '<tr class=" style-table-one" >\n';
                        }else{
                            html += '<tr class=" style-table-two" >\n';
                        }

                        var valueCon = data.records[i][data.struct.value];
                        if($.isNumeric(valueCon)){
                            valueCon = parseFloat(Number(data.records[i][data.struct.value]).toFixed(2))
                        }

                        html += '<td nowrap="" class="style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.name] + '</td>\n' +
                            '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ valueCon + unitName[0] + '</td>\n';

                        for(var j = 0; j < 10; j++){
                            var valName = data.struct["value"+j];
                            if(valName !== undefined && data.records[i][valName] !== undefined){
                                var valueNCon = data.records[i][valName];
                                if($.isNumeric(valueNCon)){
                                    valueNCon = parseFloat(Number(data.records[i][valName]).toFixed(2))+ unitName[j];
                                }
                                html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ valueNCon + '</td>\n';
                            }
                        }
                        html += '</tr>\n';
                        htmls += html;
                }

                }

            }
            if(data.type === '5'){
                var yName = this.getYStructName(data);
                htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>\n';
                for (var z =0; z < 20 ; z++){
                    var titleName = data.struct["y" + z];
                    if(titleName !== undefined){
                        htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ titleName +'</th>\n';
                    }
                }

                htmls += '</tr>\n</thead>\n<tbody>\n';
                var arr = [];
                var k=0;
                for (var i = 0; i < data.records.length;) {
                    var count = 0;
                    for (var j = i; j < data.records.length; j++) {
                        if (data.records[i][data.struct.x] === data.records[j][data.struct.x]) {
                            count++;
                        }
                    }
                    arr.push(count)
                    i+=count;
                }
                log(arr);
                    for (var i = 0; i < data.records.length; i++) {
                        var html='';
                        if(i % 2 == 0){
                            html += '<tr  class="style-table-one  " >\n';
                        }else{
                            html += '<tr class="style-table-two  " >\n';
                        }

                        var yValue = data.records[i][yName];

                        if($.isNumeric(yValue)){
                            yValue = parseFloat(Number(data.records[i][yName]).toFixed(2))
                        }

                        for (var n = 0; n < arr.length; n++) {
                            if(i===0){
                                html += '<td nowrap="" id="tdx_'+ i +'" rowspan="'+arr[0]+'" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n'
                              break;
                            }
                            if(n>0){
                                if(arr[n]===1){
                                    if(i===(k+arr[n])&&n!==arr.length-1&&k>=arr[n-1]&&k==1){
                                        k=i;
                                        html += '<td nowrap="" id="tdx_'+ i +'" rowspan="'+arr[n+1]+'" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n'
                                        break;
                                    }
                                }else{
                                    if(i===(k+arr[n])&&n!==arr.length-1&&k>=arr[n-1]){
                                        k=i;
                                        html += '<td nowrap="" id="tdx_'+ i +'" rowspan="'+arr[n+1]+'" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n'
                                        break;
                                    }
                                }

                            }else{
                                if(i===(k+arr[n])&&n!==arr.length-1&&k===0){
                                    k=i;
                                    log(k);
                                    html += '<td nowrap="" id="tdx_'+ i +'" rowspan="'+arr[n+1]+'" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n'
                                    break;
                                }
                            }




                        }
                            // html += '<td nowrap="" id="tdx_'+ i +'" class="label-cell" style="table-layout:fixed;padding-left:15px;padding-right:15px">'+ data.records[i][data.struct.x] + '</td>\n' +
                            html +=  '<td nowrap="" id="tdx_'+ i +'" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + '</td>\n';


                        for(var j = 0; j < 10 ; j++){
                            var titleName = data.struct["y" + j];
                            if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                var ySeValue = data.records[i][titleName];
                                if($.isNumeric(ySeValue)){
                                    ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2));
                                }
                                html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue+ '</td>\n';
                            }
                        }
                        html += '</tr>\n';
                        htmls += html;
                    }
            }
            if(data.type === '1'){

                // htmls += '<th class="label-cell" style="font-size: 16px;">' + "单位：万元"+ '</th></tr><tr>\n';
                htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n';

                for (var z =0; z < 10 ; z++){
                    var titleName = data.struct["x" + z];
                    if(titleName !== undefined && data.records[0][titleName] !== undefined){
                        htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ titleName +'</th>\n';
                    }
                }

                htmls += '</tr>\n</thead>\n<tbody>\n';
                for (var i = 0; i < data.records.length; i++) {

                    var html='';
                    if(i % 2 == 0){
                        html += '<tr  class=" style-table-one" >\n';
                    }else{
                        html += '<tr class=" style-table-two" >\n';
                    }
                    // html += '<td nowrap="" id="tdx_'+ i +'" class="label-cell" style="table-layout:fixed;padding-left:15px;padding-right:15px">'+ data.records[i][data.struct.x] + '</td>\n' +

                    if(data.records[i][ data.struct.x]===undefined){
                        html +=  '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;color: #1a1a1a;text-align: center">'+ "" + '</td>\n';
                    }else{
                        html +=  '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;color: #1a1a1a;text-align: center">'+ data.records[i][ data.struct.x] + '</td>\n';
                    }


                    for(var j = 1; j < 10 ; j++){
                        var titleName = data.struct["x" + j];
                        if(titleName !== undefined && data.records[i][titleName] !== undefined){
                            var ySeValue = data.records[i][titleName];
                            if($.isNumeric(ySeValue)){
                                ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2));
                            }
                            if(j>3){
                                if(ySeValue>0){
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;background-color:#ff564e;color: #1a1a1a;text-align: center">'+ ySeValue+ '</td>\n';
                                }else{
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;background-color:#5fdc76;color: #1a1a1a;text-align: center">'+ ySeValue+ '</td>\n';
                                }
                            }else{
                                html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;color: #1a1a1a;text-align: center">'+ ySeValue+ '</td>\n';
                            }
                        }
                    }
                    html += '</tr>\n';
                    htmls += html;
                }
            }
            if (data.type === '15'){
                var yName = this.getYStructName(data);
                var extInfo ="";
                for(var z = 0; z < 10; z++){
                    var otherInfoKey = data.struct["y" + z];
                    if (otherInfoKey !== undefined) {
                        extInfo += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ otherInfoKey +'</th>\n';
                    }
                }

                if(data.struct.z2 !== undefined){
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n' +
                        '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>\n' +
                        extInfo+
                        // '<th class="numeric-cell" style="font-size: 16px;">'+ data.struct.y1 +'</th>\n' +
                        '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ data.struct.z1 +'</th>\n' +
                        '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ data.struct.z2 +'</th>\n';
                }else{
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n' +
                        '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>\n' +
                        extInfo+
                        // '<th class="numeric-cell" style="font-size: 16px;">'+ data.struct.y1 +'</th>\n' +
                        '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ data.struct.z1 +'</th>\n';
                }


                htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                for (var i = 0; i < data.records.length; i++) {
                    var j = 0;
                    var unitName = data.records[i][data.struct.unit].split(',');
                    var html='';
                    if(i % 2 == 0){
                        html += '<tr class=" style-table-one" >\n';
                    }else{
                        html += '<tr class=" style-table-two" >\n';
                    }
                    var extValueInfo='';
                    for(var z = 1; z < 10; z++){
                        var otherInfoKey = data.struct["y" + z];
                        if (otherInfoKey !== undefined && data.records[i][otherInfoKey] !== undefined) {
                            var yyValue = "";
                            if($.isNumeric(data.records[i][otherInfoKey])) {
                                yyValue = parseFloat(Number(data.records[i][otherInfoKey]).toFixed(2));
                            }
                            extValueInfo += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yyValue+ unitName[z] +'</td>\n';
                        }
                    }

                    var yValue ="";
                    var z1Value = "";
                    var z2Value = "";
                    if($.isNumeric(data.records[i][yName])) {
                        yValue = parseFloat(Number(data.records[i][yName]).toFixed(2));
                    }
                    if($.isNumeric(data.records[i][data.struct.z1])) {
                        z1Value = parseFloat(Number(data.records[i][data.struct.z1]).toFixed(2));
                    }
                    if($.isNumeric( data.records[i][data.struct.z2])) {
                        z2Value = parseFloat(Number( data.records[i][data.struct.z2]).toFixed(2));
                    }

                    if(data.records[i][data.struct.z2] !== undefined){
                        html +=   '<td nowrap="" class="style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n' +
                            '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue+ unitName[j] + '</td>\n' +
                            extValueInfo +
                            //'<td nowrap="" class="numeric-cell" style="table-layout:fixed;padding-left:15px;padding-right:15px">'+ data.records[i][data.struct.y1]+ unitName[j + 1] + '</td>\n' +
                            '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ z1Value+ unitName[j + 1] + '</td>\n' +
                            '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ z2Value+ unitName[j + 2] + '</td>\n' +
                            '</tr>';
                    }else{
                        html +=   '<td nowrap="" class="style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n' +
                            '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue+ unitName[j] + '</td>\n' +
                            extValueInfo +
                            //'<td nowrap="" class="numeric-cell" style="table-layout:fixed;padding-left:15px;padding-right:15px">'+ data.records[i][data.struct.y1]+ unitName[j + 1] + '</td>\n' +
                            '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ z1Value+ unitName[j + 1] + '</td>\n' +
                            '</tr>';
                    }

                    htmls += html;
                }
            }
            if(data.type==='22'||data.type==='31'||data.type==='26'||data.type==='24'){
                var yName = this.getYStructName(data);
                if(data.otherInfo.order !== undefined){
                    var orderString = data.otherInfo.order;
                    var orderArr = orderString.split(",");
                    for(var x = 0; x < orderArr.length; x++){
                        var headHtml = ''
                        var serValue = orderArr[x];
                        if(serValue === 'y'){
                            headHtml = '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>';
                        }else{
                            headHtml = '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">'+ data.struct[serValue] +'</th>';
                        }
                        htmls += headHtml;
                    }
                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                    if((data.struct.x).indexOf('日期') > -1){
                        for (var i = data.records.length -1 ; i >= 0; i--){
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var unitArr=unitName.slice();
                            var html = '';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }
                            for(var x = 0; x < orderArr.length; x++){
                                var valueSeries = orderArr[x];
                                if(valueSeries === 'y'){
                                    var afterOderValue = data.records[i][yName];
                                }else{
                                    var afterOderValue = data.records[i][data.struct[valueSeries]];
                                }
                                var className = ''
                                if($.isNumeric(afterOderValue)){
                                    afterOderValue = parseFloat(Number(afterOderValue).toFixed(2));
                                    className = "numeric-cell";
                                }else{
                                    className = "label-cell";
                                }

                                if(valueSeries === 'name'){
                                    if(afterOderValue==="交易笔数"){
                                        unitName=["万笔","万笔","万笔"];
                                        log(afterOderValue);
                                    }else if(afterOderValue==="交易金额"){
                                        unitName=["亿元","亿元","亿元"];
                                    }else{
                                        unitName=unitArr;
                                    }
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + '</td>\n';
                                }else if(valueSeries === 'y'){
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[0] + '</td>\n';
                                }else if(valueSeries.indexOf('y') > -1 && valueSeries !== 'y'){
                                    var p = valueSeries.substring(1);
                                    html +=  '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[p] + '</td>\n';
                                }else{
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }else {
                        for (var i = 0; i < data.records.length ; i++){
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html = '';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }
                            for(var x = 0; x < orderArr.length; x++){
                                var valueSeries = orderArr[x];
                                if(valueSeries === 'y'){
                                    var afterOderValue = data.records[i][yName];
                                }else {
                                    var afterOderValue = data.records[i][data.struct[valueSeries]];
                                }
                                var className = ''
                                if($.isNumeric(afterOderValue)){
                                    afterOderValue = parseFloat(Number(afterOderValue).toFixed(2));
                                    className = "numeric-cell";
                                }else{
                                    className = "label-cell";
                                }
                                if(valueSeries === 'y'){
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[0] + '</td>\n';
                                }else if(valueSeries.indexOf('y') > -1 && valueSeries !== 'y'){
                                    var p = valueSeries.substring(1);
                                    html +=  '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + unitName[p] + '</td>\n';
                                }else{
                                    html += '<td nowrap="" class="'+ className + ' style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ afterOderValue + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }
                }else{
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.name + '</th>\n';
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n<th class="numeric-cell style-table-title" style="font-size: 16px;">'+ yName +'</th>\n';
                    for (var z =0; z < 10 ; z++){
                        var titleName = data.struct["y" + z];
                        if(titleName !== undefined && data.records[0][titleName] !== undefined){

                            htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ titleName +'</th>\n';
                        }
                    }

                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                    if((data.struct.x).indexOf('日期') > -1){
                        for (var i = data.records.length - 1; i >= 0 ; i--) {
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html='';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }

                            var yValue = data.records[i][yName];
                            if($.isNumeric(yValue)){
                                yValue = parseFloat(Number(yValue).toFixed(2))
                            }

                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.name] + '</td>\n';
                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n' +
                                '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + unitName[0] + '</td>\n';

                            for(var j = 0; j < 10 ; j++){
                                var titleName = data.struct["y" + j];
                                if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                    var ySeValue = data.records[i][titleName];
                                    if($.isNumeric(ySeValue)){
                                        ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2))
                                    }
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue + unitName[0] + '</td>\n';
                                }
                            }

                            html += '</tr>\n';
                            htmls += html;
                        }
                    }else{
                        for (var i = 0; i < data.records.length; i++) {
                            //去除涉农贷款
                            if(data.records[i][data.struct.x].indexOf("涉农贷款") > -1){
                                continue;
                            }
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html='';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }

                            var yValue = data.records[i][yName];
                            if($.isNumeric(yValue)){
                                yValue = parseFloat(Number(data.records[i][yName]).toFixed(2))
                            }
                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.name] + '</td>\n';
                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n' +
                                '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + unitName[0] + '</td>\n';

                            for(var j = 0; j < 10 ; j++){
                                var titleName = data.struct["y" + j];
                                if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                    var ySeValue = data.records[i][titleName];
                                    if($.isNumeric(ySeValue)){
                                        ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2));
                                    }
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue + unitName[j] + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }
                }
            }
            if(data.type === '51'){
                var yName = this.getYStructName(data);
                    htmls += '<th class="label-cell style-table-title" style="font-size: 16px;text-align: center">' + data.struct.x + '</th>\n<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ yName +'</th>\n';
                    for (var z =0; z < 20 ; z++){
                        var titleName = data.struct["y" + z];
                        var monitorDate =new Date(Common.indexMonitorDate)
                        var nowDate =new Date();
                        if(titleName !== undefined){
                            //&& data.records[0][titleName] !== undefined
                            if(titleName==="单位"){
                                htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ titleName +'</th>\n';
                            }else{
                                error(Common.indexMonitorDate)
                                var mon =titleName.split("_");
                                var month =monitorDate.getMonth();
                                var month1 =Number(mon[2].replace("#","-"))
                                var month2 =Number(mon[1].replace("#","-"))
                                if(nowDate.getMonth()===month){
                                    var name =Common.getFormatedDate(new Date(monitorDate.setMonth(month+month1+month2))).replace(/-/g, "").substring(0,6);
                                }else{
                                    var name =Common.getFormatedDate(new Date(monitorDate.setMonth(month+month1+month2+1))).replace(/-/g, "").substring(0,6);
                                }

                                htmls += '<th class="numeric-cell style-table-title" style="font-size: 16px;text-align: center">'+ Common.dateFormat1(name) +'</th>\n';
                            }

                        }
                    }

                    htmls += '</tr>\n</thead>\n<tbody id="tableBody_'+ data.id +'">\n';

                    if((data.struct.x).indexOf('日期') > -1){
                        for (var i = data.records.length - 1; i >= 0 ; i--) {
                            var unitName = data.records[i][data.struct.unit].split(',');
                            var html='';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }

                            var yValue = data.records[i][yName];
                            if($.isNumeric(yValue)){
                                yValue = parseFloat(Number(yValue).toFixed(2))
                            }

                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ data.records[i][data.struct.x] + '</td>\n' +
                                '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + unitName[0] + '</td>\n';

                            for(var j = 0; j < 20 ; j++){
                                var titleName = data.struct["y" + j];
                                if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                    var ySeValue = data.records[i][titleName];
                                    if($.isNumeric(ySeValue)){
                                        ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2))
                                    }
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue + unitName[j] + '</td>\n';
                                }
                            }

                            html += '</tr>\n';
                            htmls += html;
                        }
                    }else{
                        for (var i = 0; i < data.records.length; i++) {
                            // //去除涉农贷款
                            // if(data.records[i][data.struct.x].indexOf("涉农贷款") > -1){
                            //     continue;
                            // }
                            var html='';
                            if(i % 2 == 0){
                                html += '<tr class=" style-table-one" >\n';
                            }else{
                                html += '<tr class=" style-table-two" >\n';
                            }

                            var yValue = data.records[i][yName];
                            if($.isNumeric(yValue)){
                                yValue = parseFloat(Number(data.records[i][yName]).toFixed(2))
                            }
                            html += '<td nowrap="" class="label-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ Common.getOgranizationName(data.records[i][data.struct.x]) + '</td>\n' +
                                '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ yValue + '</td>\n';

                            for(var j = 0; j < 20 ; j++){
                                var titleName = data.struct["y" + j];
                                if(titleName !== undefined && data.records[i][titleName] !== undefined){
                                    var ySeValue = data.records[i][titleName];
                                    if($.isNumeric(ySeValue)){
                                        ySeValue = parseFloat(Number(data.records[i][titleName]).toFixed(2));
                                    }
                                    html += '<td nowrap="" class="numeric-cell style-table-text" style="table-layout:fixed;padding-left:15px;padding-right:15px;text-align: center">'+ ySeValue  + '</td>\n';
                                }
                            }
                            html += '</tr>\n';
                            htmls += html;
                        }
                    }

            }
            htmls += '</tbody>\n</table>';
            jqElement.append(htmls);

            myApp.popup(popupSelector);
        },
        //首页迷你mini仪表盘
        homePageSolidgauge : function (jqElement,data) {
            if(jqElement === undefined || jqElement.length === 0){
                return;
            }

            // var heightNum = $("#indexC1").height() - 55;
            var fontSize = 16;
            // if($("#indexC1").height() < 106){
            //     fontSize = 13;
            // }else {
            //     fontSize = 16;
            // }
            var width=0;
            var height=0;
            if(jqElement.width()===0){
                width=178.84;
                height=91.25;
            }else{
                width=jqElement.width()*0.98;
                height=jqElement.width()*0.5;
            }
            var highchartJson = {
                chart: {
                    type: 'solidgauge',
                    width:width,
                    height: height
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '170%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.2, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 200,
                    tickWidth: 0,
                    labels: {
                        y: 16,
                        enabled: false
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: '',
                        y: -70
                    },
                    enabled: false,
                    credits: {
                        enabled: false
                    },
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: true,
                            y: 10,
                            borderWidth: 0,
                            useHTML: true,
                            style: {
                                // fontWeight: '',
                                // fontSize:30
                            }
                        }
                    }
                },
                series: [{
                    name: '',
                    data: [Math.round(data)],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:'+ fontSize +'px;color: #2b5dac' +
                        '">'+data+'</span><br/>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        homePagePieSP: function (jqElement, data) {
            //测试json:和createPie一样
            var series_innerSize = 50;
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var sumNum=0;
            var titleText="";
            var  color =[];
            var colors1 =['#8185E9', '#8FED7D', '#F8A35C', '#95CFFF', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var colors2 =['#2E46E9', '#64E572', '#95CFFF', '#FF9655', '#24CBE5', '#FF9655', '#4EEDEB', '#FFF263', '#6AF9C4'];

            if(data.name==="零售客户"){
                titleText="VIP";
                color=colors1
            }
            if(data.name==="公司客户"){
                titleText="公司";
                color=colors2
            }
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                if(xVal==="大众"){
                    continue;
                }

                var yVal = Number(data.records[x][data.struct.value])
                data1.push(xVal);
                data1.push(yVal);
                // unitName = data.records[x][data.struct.unit];

                unitName = data.records[x][data.struct.unit].split(',');
                series_data.push(data1);
                sumNum+=yVal;
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            var width =0;
            if(jqElement.width()===0){
                width=178.84;
            }else{
                width=jqElement.width()*0.98;
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            // jqElement.width("100%");
            // jqElement.height("" + (screenHeight * 0.50-50) + "px");
            var highchartJson = {
                chart: {
                    type: "pie",
                    width:width,
                    height: 180

                },
                title: {
                    text: titleText,
                    floating: true,
                    y: 70,
                    style: {
                        fontSize:"12px"
                    }
                },
                tooltip: {
                    headerFormat: '',
                    backgroundColor: '#FFFFFF',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);

                        var desc = '<table><tr><td style="text-align: left;">' + this.name + '占比:'+ '</td><td style="text-align: left" >'  + Number(this.percentage).toFixed(2) + '%'+'</td></tr></table>';
                        return desc;
                    },
                    useHTML: true
                },
                legend: {
                    layout: 'horizontal',
                    floating: false,
                    align: 'center',
                    verticalAlign: 'bottom',
                    margin:0,
                    padding:0,
                    itemDistance:5,
                    symbolHeight: 8,
                    symbolPadding:0,
                    labelFormatter:function() {
                        var val='';
                        if(isNaN(Number(this.y).toFixed(2))){
                            val='---'
                        }else{
                            val=this.y
                        }

                        return this.name+":"+val
                    },
                    itemStyle: {
                        fontWeight: 'normal',
                        fontSize:"10px"
                    }
                    // y:20,
                    // x:-20

                },
                plotOptions: {
                    pie: {
                        point: {
                            events: {
                                legendItemClick: function(e) {
                                    return false; // 直接 return false 即可禁用图例点击事件
                                }
                            }
                        },
                        size: "100",
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b>: {point.y} '
                        },
                        showInLegend:true,
                        colors:color
                    },


                },
                series: [{
                    innerSize: series_innerSize + '%',
                    name: ' ',
                    data: series_data
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        homePagePieSPIpad: function (jqElement, data) {
            //测试json:和createPie一样
            var series_innerSize = 50;
            var series_data = [];
            var unitName = "";
            var otherInfo = {};
            var sumNum=0;
            var titleText="";
            var  color =[];
            var colors1 =['#8185E9', '#8FED7D', '#F8A35C', '#95CFFF', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var colors2 =['#2E46E9', '#64E572', '#95CFFF', '#FF9655', '#24CBE5', '#FF9655', '#4EEDEB', '#FFF263', '#6AF9C4'];

            if(data.name==="零售客户"){
                titleText="VIP";
                color=colors1
            }
            if(data.name==="公司客户"){
                titleText="公司";
                color=colors2
            }
            for (var x = 0; x < data.records.length; x++) {
                var data1 = [];
                var xVal = data.records[x][data.struct.name];
                if(xVal==="大众"){
                    continue;
                }

                var yVal = Number(data.records[x][data.struct.value])
                data1.push(xVal);
                data1.push(yVal);
                // unitName = data.records[x][data.struct.unit];

                unitName = data.records[x][data.struct.unit].split(',');
                series_data.push(data1);
                sumNum+=yVal;
                //加载Y轴额外信息
                otherInfo[xVal] = {};
                for (var z = 0; z < 8; z++) {
                    var otherInfoKey = data.struct["value" + z];
                    if (otherInfoKey !== undefined) {
                        otherInfo[xVal][otherInfoKey] = data.records[x][otherInfoKey] + unitName[z];
                    }
                }
            }
            var width =0;
            if(jqElement.width()===0){
                width=364;
            }else{
                width=jqElement.width()*0.98;
            }

            // var elementTitle = $("#commonModel_title_" + data.id);
            // elementTitle.text(elementTitle.text()+"("+unitName+")");
            // var element = $("#commonModel_chart_" + data.id);
            // jqElement.width("100%");
            // jqElement.height("" + (screenHeight * 0.50-50) + "px");
            var highchartJson = {
                chart: {
                    type: "pie",
                    width:width,
                    height: jqElement.height()

                },
                title: {
                    text: titleText,
                    floating: true,
                    verticalAlign: 'middle',
                    x:-57,
                    style: {
                        fontSize:"14px",
                        color: "616667",
                    }
                },
                pane: {
                  size: '120%',
                },
                tooltip: {
                    headerFormat: '',
                    backgroundColor: '#FFFFFF',
                    // pointFormat: '{point.name}: {point.y} 占: {point.percentage:.1f}%',
                    // valueDecimals: 2,
                    // valueSuffix: ' ' + unitName
                    // headerFormat: '<span style="font-size:12px">{point.x}: {point.y}</span>',
                    pointFormatter: function () {
                        // console.log(this);

                        var desc = '<table><tr><td style="text-align: left;">' + this.name + '占比:'+ '</td><td style="text-align: left" >'  + Number(this.percentage).toFixed(2) + '%'+'</td></tr></table>';
                        return desc;
                    },
                    useHTML: true
                },
                legend: {
                    layout: 'vertical',
                    floating: false,
                    align: 'right',
                    verticalAlign: 'middle',
                    margin:0,
                    padding:10,
                    itemDistance:5,
                    itemMarginBottom:15,
                    symbolHeight: 12,
                    symbolPadding:0,
                    labelFormatter:function() {
                        var val='';
                        if(isNaN(Number(this.y).toFixed(2))){
                            val='---'
                        }else{
                            val=this.y
                        }

                        return this.name +":"+ val
                    },
                    itemStyle: {
                        fontWeight: 'none',
                        fontSize:"14px",
                        color: "#616667",
                        letterSpacing: "1px",
                        lineHeight:"262px",
                    }
                    // y:20,
                    // x:-20

                },
                plotOptions: {
                    pie: {
                        point: {
                            events: {
                                legendItemClick: function(e) {
                                    return false; // 直接 return false 即可禁用图例点击事件
                                }
                            }
                        },
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            color: '#616667',
                            format: '<b>{point.name}</b>: {point.y} '
                        },
                        showInLegend:true,
                        colors:color
                    },


                },
                series: [{
                    innerSize: series_innerSize + '%',
                    name: ' ',
                    data: series_data
                }]
            };
            jqElement.highcharts(highchartJson);
        },
        homePageSolidgaugeIpad : function (jqElement,data) {
            if(jqElement === undefined || jqElement.length === 0){
                return;
            }

            // var heightNum = $("#indexC1").height() - 55;
            var fontSize = 16;
            // if($("#indexC1").height() < 106){
            //     fontSize = 13;
            // }else {
            //     fontSize = 16;
            // }
            var width=0;
            var height=0;
            if(jqElement.width()===0){
                width=168.563;
                height=118.563;
            }else{
                width=jqElement.width()*0.98;
                height=jqElement.height()
            }
            var highchartJson = {
                chart: {
                    type: 'solidgauge',
                    width:width,
                    height: height
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '120%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.2, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 200,
                    tickWidth: 0,
                    labels: {
                        y: 16,
                        enabled: false
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: '',
                        y: -70
                    },
                    enabled: false,
                    credits: {
                        enabled: false
                    },
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: true,
                            y: 10,
                            borderWidth: 0,
                            useHTML: true,
                            style: {
                                // fontWeight: '',
                                // fontSize:30
                            }
                        }
                    }
                },
                series: [{
                    name: '',
                    data: [Math.round(data)],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:'+ fontSize +'px;color: #2b5dac' +
                        '">'+data+'</span><br/>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }]
            };
            jqElement.highcharts(highchartJson);
        },

        moduleValueCommonBarIpad: function (jqElement,data) {
            if(jqElement === undefined || jqElement.length === 0){
                return;
            }
            jqElement.width("100%");
            jqElement.height("100%");
            var  colors= ['#7CB5EC',  '#FF4559','#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var yTitleName = "金额(" + data[1].records[0]["单位"] + ")";
            var highchartJson = {
                chart: {
                    type: "bar",
                },
                colors:colors,
                title: {
                    text: ""
                },
                legend: {
                    enabled:true,
                    reversed:true,
                    itemStyle: {
                        color: '#616667',
                        fontWeight: 'none'
                    }
                },
                xAxis: {
                    crosshair: true,
                    labels: {
                        enabled: false,
                        style: {
                            color: '#acadb5'
                        },
                    },
                    title: {
                        text: yTitleName,
                        style: {
                            color: '#616667'
                        },
                    },
                },
                yAxis: {
                    // min: 0,
                    crosshair: true,
                    title: {
                        text: "",
                    },
                    labels: {
                        style: {
                            color: '#acadb5'
                        },
                        formatter: function () {
                            var yVal = this.value;
                            if (yVal >= 10000 || yVal <= -10000) {
                                yVal = yVal / 10000 + "万";
                            }
                            if (yVal >= 100000000 || yVal <= -100000000) {
                                yVal = yVal / 10000 + "亿";
                            }
                            return yVal;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    backgroundColor: '#FFFFFF',
                    formatter: function () {
                        var s = '';
                        $.each(this.points, function () {
                            s += this.series.name + ': ' + '<b>' +
                                this.y + '</b>' + data[1].records[0]["单位"] + '<br/>';
                        });
                        return s;
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false
                        }
                    },
                    series: {
                        pointPadding: 0.1,
                        // groupPadding: 0.2,
                        borderWidth: 0,
                        pointWidth: 20,
                        stacking: 'normal',
                        dataLabels: {
                            style:{
                                color:"#616667",
                                fontWeight: 'none',
                            },
                            enabled: true,          // 开启数据标签
                        }
                    }
                },
                series: [{
                    name: data[1].name,
                    data: [parseFloat(data[1].records[0]["贷款"])]
                },{
                    name: data[0].name,
                    data: [parseFloat(data[0].records[4]["数值"])]
                }]
            };

            jqElement.highcharts(highchartJson);
        },

        dlCommonChartSolidgaugeIpad : function (jqElement,data) {
            if(jqElement === undefined || jqElement.length === 0){
                return;
            }

            // var heightNum = $("#indexC1").height() - 55;
            var fontSize = 16;
            // if($("#indexC1").height() < 106){
            //     fontSize = 13;
            // }else {
            //     fontSize = 16;
            // }
            var width=0;
            var height=0;
            if(jqElement.width()===0){
                width=168.563;
                height=118.563;
            }else{
                width=jqElement.width()*0.98;
                height=jqElement.height()
            }

            var highchartJson = {
                chart: {
                    type: 'solidgauge',
                    width:width,
                    height: height,
                    spacingBottom:60,
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '100%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.2, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 200,
                    tickWidth: 0,
                    labels: {
                        y: 16,
                        enabled: false
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: '',
                        y: -70
                    },
                    enabled: false,
                    credits: {
                        enabled: false
                    },
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: true,
                            y: 10,
                            borderWidth: 0,
                            useHTML: true,
                            style: {
                                // fontWeight: '',
                                // fontSize:30
                            }
                        }
                    }
                },
                series: [{
                    name: '',
                    data: [Math.round(data)],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:'+ fontSize +'px;color: #2b5dac' +
                        '">'+data+'</span><br/>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }]
            };
            jqElement.highcharts(highchartJson);
        },

        dlCommonChartGaugeIpad : function (jqElement,data) {
            if(jqElement === undefined || jqElement.length === 0){
                return;
            }
            jqElement.width("100%");
            jqElement.height("100%");

            var highchartJson = {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    marginBottom:0,
                    marginLeft:0,
                    marginTop:0,
                    marginRight:0,
                },
                title: {
                    text: null
                },
                pane: {
                    size:"200",
                    startAngle: -150,
                    endAngle: 150
                },
                // the value axis
                yAxis: {
                    min: 0,
                    max: 100,
                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',
                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    // title: {
                    //     text: data.records[data.records.length - 1][data.struct.x],
                    //     y: 10,
                    //     style: {
                    //         fontSize: 10
                    //     }
                    // },
                    plotBands: [{
                        from: 0,
                        to: 60,
                        color: '#55BF3B' // green
                    }, {
                        from: 60,
                        to: 80,
                        color: '#DDDF0D' // yellow
                    }, {
                        from: 80,
                        to: 100,
                        color: '#DF5353' // red
                    }]
                },
                tooltip: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [parseFloat(data)],
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }]
            };

            /*var gaugeMin = 0;       //仪表盘最小值
            var gaugeMax = 100;     //仪表盘最大值
            gaugeMin = minVal > 0 ? minVal / 2 : minVal * 1.5;
            gaugeMax = maxVal > 0 ? maxVal * 1.5 : maxVal / 2;
            highchartJson.yAxis.min = gaugeMin;
            highchartJson.yAxis.max = gaugeMax;
            highchartJson.yAxis.plotBands.push({from: gaugeMin, to: minVal, color: '#55BF3B'});
            highchartJson.yAxis.plotBands.push({from: minVal, to: maxVal, color: '#DDDF0D'});
            highchartJson.yAxis.plotBands.push({from: maxVal, to: gaugeMax, color: '#DF5353'});
            highchartJson.series[0].data.push(val);*/

            jqElement.highcharts(highchartJson);
        },

        dlCommonChartColumnIpad : function (jqElement,data) {
            if(jqElement === undefined || jqElement.length === 0){
                return;
            }
            jqElement.width("100%");
            jqElement.height("100%");
            var  colors= ['#7CB5EC', '#50B432', '#ED561B', '#DDDF00',
                '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
            var val2 = data.records[0]["数值"];
            var val3 = data.records[0]["比年初金额"];
            var yTitleName = "金额(" + data.records[0]["单位"][0] + ")";
            //alert(val2-val3)
            var val1 = val2-val3;

            var highchartJson = {
                chart: {
                    type: 'column',
                },
                colors:['#7CB5EC','#ED561B'],
                title: {
                    text: ''
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: [
                        '当前值','年初值'
                    ],
                    color: '#acadb5',
                    crosshair: true
                },
                yAxis: {
                    //min: 0,
                    color: '#acadb5',
                    title: {
                        text: yTitleName,
                        style: {
                          color: '#616667',
                        },
                    }
                },
                tooltip: {
                    // head + 每个 point + footer 拼接成完整的 table
                    /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.2f} mm</b></td></tr>',
                    footerFormat: '</table>',*/
                    shared: true,
                    //useHTML: true,
                    formatter: function () {
                        var s = '';
                        $.each(this.points, function () {
                            s += this.x + ': ' + '<b>' +
                                this.y.toFixed(2) + '</b>' + data.records[0]["单位"][0] + '<br/>';
                        });
                        return s;
                    }
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        pointWidth: 30,
                        dataLabels: {
                            enabled: true,          // 开启数据标签
                            // format: '{y} '
                            style: {
                              color: '#616667',
                                fontWeight: 'none',
                            },
                            formatter: function () {
                                var tip =  this.y
                                return tip.toFixed(2);
                            }
                        }
                    },

                },
                series:  [{
                    data: [Number(val2),Number(val1)],
                    colorByPoint:true,
                }]
            };

            jqElement.highcharts(highchartJson);
        },
        //判断是否显示悬浮按钮
        checkFloatingButtonIsShow:function(susId,tigId,sideId){

           var status =  "";
           var SwitchState="";
           if(myApp.device.ios === true || myApp.device.android === true){
               AppOp.getAppData(Constants.AppSaveName.SwitchState,function(val){
                   if(val !== undefined && val !== "" && val !== null){
                       status = val;
                       SwitchState = JSON.parse(decodeURI(status));
                   }else{
                       status =Common.SwitchState;
                       SwitchState=Common.SwitchState;
                   }
                   // var isShare =SwitchState.switchShare[0];//分享按钮
                   // var isSide =SwitchState.switchSlide[0];//侧边栏按钮
                   var  isSus =SwitchState.switchSus[0];//悬浮按钮

                   var susBtn = $("#" + susId);
                   // var tigBtn = $("#" + tigId);
                   // var sideBtn = $("#" + sideId);
                   if(isSus==="yes"){
                       susBtn.show();
                       // if(isSide==="yes"){
                       //     sideBtn.show();
                       // }else{
                       //     sideBtn.hide();
                       // }
                       // if(isShare==="yes"){
                       //     tigBtn.show();
                       // }else{
                       //     tigBtn.hide();
                       // }
                   }else{
                       susBtn.hide();
                   }
               });
           }else{
               status = $.cookie(Constants.AppSaveName.SwitchState);
               if(status===undefined||status===""){
                   status =Common.SwitchState;
                   SwitchState=Common.SwitchState;
               }else{
                   SwitchState  = JSON.parse(status);
               }

               // var isShare =SwitchState.switchShare[0];//分享按钮
               // var isSide =SwitchState.switchSlide[0];//侧边栏按钮
               var  isSus =SwitchState.switchSus[0];//悬浮按钮

               var susBtn = $("#" + susId);
               // var tigBtn = $("#" + tigId);
               // var sideBtn = $("#" + sideId);
               if(isSus==="yes"){
                   susBtn.show();
                   // if(isSide==="yes"){
                   //     sideBtn.show();
                   // }else{
                   //     sideBtn.hide();
                   // }
                   // if(isShare==="yes"){
                   //     tigBtn.show();
                   // }else{
                   //     tigBtn.hide();
                   // }
               }else{
                   susBtn.hide();
               }
           }
       }
    };

    window.MBIManager = new MBIManager();
})();
