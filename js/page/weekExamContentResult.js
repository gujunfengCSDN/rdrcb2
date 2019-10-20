/*每周一考成绩查询*/
(function () {
    function WeekExamContentResultController() {
        this.initWeekExamListResultsQuery = "0";
    }
    WeekExamContentResultController.prototype = {
        init: function () {
            var self = window.WeekExamContentResultController;
            myApp.onPageAfterAnimation('weekExamListDetailResult', function (page) {
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击每一周考试查询题目答案
            $(document).off('click',".weekExamResultClass").on('click',".weekExamResultClass",function () {
                var examContentId = $(this).attr("id").split("♂")[0];//需要注意的是id值放置的位置
                var examContentCount = $(this).attr("id").split("♂")[1];
                if(examContentCount == 1){
                    if (self.initWeekExamListResultsQuery === "1") {
                        var url = "content/page/weekExamContentResultQuery.html?examContentId=" + examContentId;
                        MBIManager.getCurrView().router.loadPage(url);
                    } else {
                        self.initWeekExamListResultsQuery = "1";
                        var url = "content/page/weekExamContentResultQuery.html?examContentId=" + examContentId;
                        MBIManager.getCurrView().router.loadPage(url);
                        window.WeekExamContentResultQueryController.init();
                    }
                }else if(examContentCount == 0){
                    myApp.alert("您还未答题,请先答题后再查询结果");
                    return;
                }
            });
        },
        refreshData: function () {
            var self = this;
            var refreshWeekExamListHtml = "";
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            NetManager.httpReq("appWeekExamResult/getAppViewList", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取周考列表" + JSON.stringify(jjData, null, 4))
                for (var i = 0; i < jjData.length; i++) {
                    var appWeekExamHtml = "";
                    if (self.isNull(jjData[i].appWeekExam) === false) {
                        for (var j = 0; j < jjData[i].appWeekExam.length; j++) {
                            var examState = "";
                            if (jjData[i].appWeekExam[j].state === "1") {
                                examState = "正确率"+ jjData[i].appWeekExam[j].examAccuracy+"%";
                            } else if (jjData[i].appWeekExam[j].state === "0") {
                                examState = "未作答";
                            }
                            var examTitle = jjData[i].appWeekExam[j].examYear + "年" + jjData[i].appWeekExam[j].examMonth + "月第" + jjData[i].appWeekExam[j].examWeek + "周";
                            appWeekExamHtml +=
                                ' <div id="' + jjData[i].appWeekExam[j].id + '♂'+ jjData[i].appWeekExam[j].state +'" class="row weekExamResultClass" style="border-bottom: 1px solid #efeff4;height: 25%;">\n' +
                                ' <div class="col-80" style="height: 100%;margin-left: 2%;">\n' +
                                ' <div style="font-size: 16px;color: #000;">' + examTitle + '</div>\n' +
                                ' <div style="font-size: 13px;color: #8a8a8a;">' + examState + '</div>\n' +
                                ' </div>\n' +
                                ' <div class="col-20" style="height: 100%;display: flex;align-items: center;justify-content: center;">\n' +
                                ' <img src="images/exam/iconButton.png" style="height: 16px;vertical-align:-webkit-baseline-middle">\n' +
                                ' </div>\n' +
                                '</div>';
                        }
                    }
                    refreshWeekExamListHtml += '<div style="height: 40%;margin: 10px 20px;">\n' +
                        '<div style="height: 20%;font-size: 16px;font-weight: bold;display: flex;align-items: center;">\n' +
                        '    <img src="images/exam/iconTicle'+ window.Common.randomNum(1, 4) +'.png" style="height: 70%;">\n' +
                        '       <span style="padding-left: 4%;font-size: 18px;">' + jjData[i].examMonth + '</span>\n' +
                        '       <span style="font-size: 18px;">月</span>\n' +
                        '</div>\n' +
                        // '<div style="height: 20%;font-size: 16px;font-weight: bold;">' + jjData[i].examMonth + '</div>
                        '  <div class="" style="height: 80%;margin: 0px;border-radius: 6px;">' +
                        '  <div class="card-content" style="/*box-shadow:grey 3px -2px 7px;*/height: 100%;">' + appWeekExamHtml + '</div>\n' +
                        '  </div>\n' +
                        '   </div>';
                }
                $("#weekExamResultListAppend").empty();
                $("#weekExamResultListAppend").append(refreshWeekExamListHtml);
            }, function (data) {
            })
        },
        isNull: function (str) {
            if (str === undefined || str === "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.WeekExamContentResultController = new WeekExamContentResultController();
})();
