(function () {
    function IndexController() {
        this.indexLoadFlag = true;
        this.viewIndex = 1;
        this.initExamina = "0";
        this.initStudyAuto = "0";
        this.initStudyTask = "0";
        this.initWorkTodoList = "0";
        this.myYear = "";
        this.myMonth = "";
        this.newDate = "";
    }
    IndexController.prototype = {
        init: function () {
            var self = window.IndexController;
            var myDate = new Date();
            self.myYear = myDate.getFullYear();
            self.myMonth = myDate.getMonth() +1;
            if(self.myMonth<10){
                self.myMonth = "0" + self.myMonth.toString()
            }
            self.newDate = self.myYear.toString() + self.myMonth.toString();
            MBIManager.init();
            self.initIndexDate();
            self.refreshData();
            self.refreshTodoTotalCount();
            self.clickEvent();
        },
        //注册点击事件
        clickEvent: function () {
            var self = this;
            var tabView1 = $("#tabView1");
            var tabView2 = $("#tabView2");
            var tabView3 = $("#tabView3");
            var tabView4 = $("#tabView4");
            tabView1.on('click', function () {
                if (self.indexLoadFlag) {
                    myApp.showTab('#view-1');
                    tabView1.removeClass("active");
                    tabView2.removeClass("active");
                    tabView3.removeClass("active");
                    tabView4.removeClass("active");
                    tabView1.toggleClass("active");
                }
            });
            tabView2.on('click', function () {
                if (self.indexLoadFlag) {
                    myApp.showTab('#view-2');
                    tabView1.removeClass("active");
                    tabView2.removeClass("active");
                    tabView3.removeClass("active");
                    tabView4.removeClass("active");
                    tabView2.toggleClass("active");
                    self.refreshStudyTodoData();
                }
            });
            tabView3.on('click', function () {
                if (self.indexLoadFlag) {
                    myApp.showTab('#view-3');
                    tabView1.removeClass("active");
                    tabView2.removeClass("active");
                    tabView3.removeClass("active");
                    tabView4.removeClass("active");
                    tabView3.toggleClass("active");
                    // self.refreshTodoData();
                }
            });
            tabView4.on('click', function () {
                if (self.indexLoadFlag) {
                    myApp.showTab('#view-4');
                    tabView1.removeClass("active");
                    tabView2.removeClass("active");
                    tabView3.removeClass("active");
                    tabView4.removeClass("active");
                    tabView4.toggleClass("active");
                }
            });
            $('#view-1').on('show', function () {
                self.tabIndex = 0;
                self.viewIndex = 1;
                myApp.sizeNavbars("#view-1");

            });

            $('#view-2').on('show', function () {
                // if(self.viewIndex === 2){
                //     return;
                // }
                self.viewIndex = 2;
                self.tabIndex = 1;
            });
            $('#view-3').on('show', function () {
                self.viewIndex = 3;
                self.tabIndex = 2;
            });
            $('#view-4').on('show', function () {
                self.viewIndex = 4;
                self.tabIndex = 3;
            });
            //点击安全退出
            $("#logoutBtn").click(function () {
                myApp.confirm('是否退出登录?', '退出', function () {
                    // var url = "index.html";
                    // MBIManager.getCurrView().router.loadPage(url);
                    var base = Common.getUrlBase();
                    window.location.href = base + "index.html";
                });
            });
            //点击自主学习
            $(document).off('click',"#autodidacticism").on('click',"#autodidacticism",function () {
                if (self.initStudyAuto === "1") {
                    var url = "content/page/studyAutoPerson.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initStudyAuto = "1";
                    var url = "content/page/studyAutoPerson.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.StudyAutoPersonController.init();
                }
            });
            //点击学习任务
            $(document).off('click',"#studyTask").on('click',"#studyTask",function () {
                if (self.initStudyTask === "1") {
                    var url = "content/page/studyTaskYearList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initStudyTask = "1";
                    var url = "content/page/studyTaskYearList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.StudyTaskYearListController.init();
                }
            });
            //点击考试
            $(document).off('click',"#examinations").on('click',"#examinations",function () {
                if (self.initExamina === "1") {
                    var url = "content/page/complianceExaminationList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initExamina = "1";
                    var url = "content/page/complianceExaminationList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.ComplianceExaminationController.init();
                }
            });
            //点击每周一练
            $(document).off('click',"#weekExerice").on('click',"#weekExerice",function () {
                if (self.initWeekExam === "1") {
                    var url = "content/page/weekExamList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initWeekExam = "1";
                    var url = "content/page/weekExamList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.WeekExamListController.init();
                }
            });
            //点击待办
            $(document).off('click',".workTodoList").on('click',".workTodoList",function () {
                var workTodoFlag = $(this).attr("id");
                if (self.initWorkTodoList === "1") {
                    var url = "content/page/workTodoList.html?workTodoFlag="+ workTodoFlag;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initWorkTodoList = "1";
                    var url = "content/page/workTodoList.html?workTodoFlag="+workTodoFlag;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.WorkTodoListController.init();
                }
            });
        },
        //学习任务待办数量加载
        refreshStudyTodoData: function () {
            var self = this;
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            NetManager.httpReq("appLearningTasksDetailAct/getTotalCountByUserCode", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("学习任务总待办数量" + JSON.stringify(jjData, null, 4))
                if(self.isNull(jjData[0].allCount) === false){
                    if(jjData[0].allCount !== 0){
                        $("#todoStudyCount").show();
                        $("#todoStudyCount").text(jjData[0].allCount);
                    }
                }
            }, function (data) {
            })
        },
        //待办数量加载
        refreshTodoTotalCount: function () {
            var self = this;
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            NetManager.httpReq("eventSummary/getAppWaitToDoNum", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("总待办数量" + JSON.stringify(jjData, null, 4))
                if(self.isNull(jjData[0].allCount) === false){
                    if(jjData[0].allCount !== 0){
                        $("#todoCount").show();
                        $("#todoCount").text(jjData[0].allCount);
                        self.refreshTodoData();
                    }else{
                        var taskTodoHtml = '<img src="images/workTodo/noCountImage.png" style="height: 100%;width: 60%;margin: 20%">';
                        $("#taskTodo").empty();
                        $("#taskTodo").append(taskTodoHtml);
                    }
                }
            }, function (data) {
            })
        },
        //加载待办页面
        refreshTodoData: function () {
            var self = this;
            var workTodoHtmlList = "";
            var workTodoCountHtml = "";
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            NetManager.httpReq("eventSummary/getTodoList", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("加载待办列表" + JSON.stringify(jjData, null, 4))
                for(var i = 0;i<jjData.length;i++){
                    if(self.isNull(jjData[i].num) === false && jjData[i].num !== 0){
                        workTodoCountHtml = '<div id="todoCountLevel" style="background-image: url(images/workTodo/backgroundCount.png);background-size: 100% 100%;position: absolute;top: 2%;left: 36%;min-width: 40%;color: white;">'+ jjData[i].num +'</div>';
                    }else{
                        workTodoCountHtml = '<div id="todoCountLevel" style="background-image: url(images/workTodo/backgroundCount.png);background-size: 100% 100%;position: absolute;top: 2%;left: 36%;min-width: 40%;color: white;display: none;">'+ jjData[i].num +'</div>';
                    }
                    workTodoHtmlList += '<div id="'+ jjData[i].flag +'" class="row item-inner workTodoList" style="margin-left: 4%;margin-top: 2%;">\n' +
                        '<div class="col-80" style="height: 44px;">\n' +
                        '<img src="images/workTodo/employeeExamination.png" style="width: 20px;height: 20px;vertical-align:-webkit-baseline-middle">\n' +
                        ' <span id="detail_title" class="item-title" style="font-size: 16px;color: black;font-weight: bold;vertical-align:-webkit-baseline-middle;margin-left: 10px">'+ jjData[i].name +'</span>\n' +
                        '</div>\n' +
                        '<div class="col-20" style="height: 44px;text-align: center;position: relative">\n' +
                        '<img src="images/exam/iconButton.png" style="height: 16px;vertical-align:-webkit-baseline-middle">'+ workTodoCountHtml +'</div>\n' +
                        '</div>';
                }
                $("#taskTodo").empty();
                $("#taskTodo").append(workTodoHtmlList);
            }, function (data) {
            })
        },
        //加载首页指标
        refreshData: function (timeData) {
            var self = this;
            $("#datePicker").val(self.newDate);
            var jsonDate = timeData;log("指标数据查看"+JSON.stringify(jsonDate,null,4))
            NetManager.httpReq("appZbhz/getZBHZ",jsonDate,function (jjData) {
                log("指标数据查看"+JSON.stringify(jjData,null,4));
                if (self.isNull(jjData) === true){
                    myApp.alert("服务异常,请联系服务端");
                    return;
                }
                if(self.isNull(jjData.jydw.gxdkzb)===false){
                    $("#gxdkzb").text(jjData.jydw.gxdkzb);
                }
                if(self.isNull(jjData.jydw.xzkdzjyyddbl)===false){
                    $("#xzkdzjyyddbl").text(jjData.jydw.xzkdzjyyddbl);
                }
                if(self.isNull(jjData.jydw.snjxwqydkzb)===false){
                    $("#snjxwqydkzb").text(jjData.jydw.snjxwqydkzb);
                }
                if(self.isNull(jjData.jydw.dedkzb)===false){
                    $("#dedkzb").text(jjData.jydw.dedkzb);
                }

                if(self.isNull(jjData.jrgj.snyxwqydkzs)===false){
                    $("#snyxwqydkzs").text(jjData.jrgj.snyxwqydkzs);
                }
                if(self.isNull(jjData.jrgj.nhyxwqyyxfgm)===false){
                    $("#nhyxwqyyxfgm").text(jjData.jrgj.nhyxwqyyxfgm);
                }
                if(self.isNull(jjData.jrgj.nhsxfgm)===false){
                    $("#nhsxfgm").text(jjData.jrgj.nhsxfgm);
                }
                if(self.isNull(jjData.jrgj.xwqysxfgm)===false){
                    $("#xwqysxfgm").text(jjData.jrgj.xwqysxfgm);
                }
                if(self.isNull(jjData.jrgj.phxnhhxwdkzs)===false){
                    $("#phxnhhxwdkzs").text(jjData.jrgj.phxnhhxwdkzs);
                }

                if(self.isNull(jjData.jrjcss.nhjdpjfgm)===false){
                    $("#nhjdpjfgm").text(jjData.jrjcss.nhjdpjfgm);
                }
                if(self.isNull(jjData.jrjcss.xwqyjdpjfgm)===false){
                    $("#xwqyjdpjfgm").text(jjData.jrjcss.xwqyjdpjfgm);
                }
                if(self.isNull(jjData.jrjcss.dzjytdl)===false){
                    $("#dzjytdl").text(jjData.jrjcss.dzjytdl);
                }

                if(self.isNull(jjData.jrfwjz.snbll)===false){
                    $("#snbll").text(jjData.jrfwjz.snbll);
                }
                if(self.isNull(jjData.jrfwjz.xwqydkbll)===false){
                    $("#xwqydkbll").text(jjData.jrfwjz.xwqydkbll);
                }
                if(self.isNull(jjData.jrfwjz.znzxywjxkhzbqz)===false){
                    $("#znzxywjxkhzbqz").text(jjData.jrfwjz.znzxywjxkhzbqz);
                }
                if(self.isNull(jjData.jrfwjz.mdsztxzb)===false){
                    $("#mdsztxzb").text(jjData.jrfwjz.mdsztxzb);
                }
            },function (data) {
                myApp.alert("数据异常，请重新选择时间");
                $("#gxdkzb").text("-");
                $("#xzkdzjyyddbl").text("-");
                $("#snjxwqydkzb").text("-");
                $("#dedkzb").text("-");

                $("#snyxwqydkzs").text("-");
                $("#nhyxwqyyxfgm").text("-");
                $("#nhsxfgm").text("-");
                $("#xwqysxfgm").text("-");
                $("#phxnhhxwdkzs").text("-");

                $("#nhjdpjfgm").text("-");
                $("#xwqyjdpjfgm").text("-");
                $("#dzjytdl").text("-");

                $("#snbll").text("-");
                $("#xwqydkbll").text("-");
                $("#znzxywjxkhzbqz").text("-");
                $("#mdsztxzb").text("-");
            })
        },
        //加载时间
        initIndexDate: function () {
            var self = this;
            self.indexCalendar = myApp.picker({
                input:"#datePicker",
                value:[],
                cols:[
                    //year
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = self.myYear; i >= self.myYear - 10; i--) { arr.push(i);}
                            return arr;
                        })(),
                        textAlign: 'left'
                    },
                    //month
                    {
                        values: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
                        // displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
                        textAlign: 'right'
                    },
                ],
                onOpen: function (p) {
                    $("#datePicker").val("");
                },
                onClose: function (p, values, displayValues) {
                    // log(JSON.stringify(p.cols[1],null,4))
                    // $("#datePicker").val( p.cols[0].displayValue + p.cols[1].displayValue);
                    self.yearTime = p.cols[0].displayValue;
                    self.monthTime = p.cols[1].displayValue;
                    self.newDate = p.cols[0].displayValue + p.cols[1].displayValue;log("即使"+self.newDate)
                    if(self.isNull(self.yearTime) === true || self.isNull(self.monthTime) === true){
                        self.yearTime = self.myYear;
                        self.monthTime = self.myMonth;
                        self.newDate = self.myYear.toString() + self.myMonth.toString();
                    }
                    self.refreshData(self.newDate);
                    return self.newDate;
                },
            });
        },
        isNull: function (str) {
            if (str === undefined || str === "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.IndexController = new IndexController();
})();
