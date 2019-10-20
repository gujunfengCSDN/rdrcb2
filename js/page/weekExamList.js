(function () {
    function WeekExamListController() {
        this.initweekExamContent = "0";
    }

    WeekExamListController.prototype = {
        init: function () {
            var self = window.WeekExamListController;
            myApp.onPageAfterAnimation('weekExamListDetail', function (page) {
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            $(document).off('click', ".weekExamClass").on('click', ".weekExamClass", function () {
                var examContentId = $(this).attr("id").split("♂")[0];//需要注意的是id值放置的位置
                var examContentCount = $(this).attr("id").split("♂")[1];//需要注意的是id值放置的位置
                if (self.initweekExamContent === "1") {
                    var url = "content/page/weekExamContent.html?examContentId=" + examContentId + "&examContentCount=" + examContentCount;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initweekExamContent = "1";
                    var url = "content/page/weekExamContent.html?examContentId=" + examContentId + "&examContentCount=" + examContentCount;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.WeekExamContentController.init();
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
                        for (var j = (jjData[i].appWeekExam.length -1); j >= 0; j--) {
                            var examState = "";
                            if (jjData[i].appWeekExam[j].state === "1") {
                                examState = "已作答"
                            } else if (jjData[i].appWeekExam[j].state === "0") {
                                examState = "未作答";
                            }
                            var examTitle = jjData[i].appWeekExam[j].examYear + "年" + jjData[i].appWeekExam[j].examMonth + "月第" + jjData[i].appWeekExam[j].examWeek + "周";
                            appWeekExamHtml +=
                                ' <div id="' + jjData[i].appWeekExam[j].id + '♂'+ jjData[i].appWeekExam[j].state +'" class="row weekExamClass" style="border-bottom: 1px solid #efeff4;height: 25%;">\n' +
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
                    var titleTime = jjData[i].examYear + "年" + jjData[i].examMonth;
                    refreshWeekExamListHtml += '<div style="height: 40%;margin: 10px 20px;">\n' +
                        '<div style="height: 20%;font-size: 16px;font-weight: bold;display: flex;align-items: center;">\n' +
                        '    <img src="images/exam/iconTicle'+ window.Common.randomNum(1, 4) +'.png" style="height: 70%;">\n' +
                        '       <span style="padding-left: 4%;font-size: 18px;">' + titleTime + '</span>\n' +
                        '       <span style="font-size: 18px;">月</span>\n' +
                        '</div>\n' +
                        // '<div style="height: 20%;font-size: 16px;font-weight: bold;">' + jjData[i].examMonth + '</div>
                        '  <div class="" style="height: 80%;margin: 0px;border-radius: 6px;">' +
                        '  <div class="card-content" style="/*box-shadow:grey 3px -2px 7px;*/height: 100%;">' + appWeekExamHtml + '</div>\n' +
                        '  </div>\n' +
                        '   </div>';
                }
                $("#weekExamListAppend").empty();
                $("#weekExamListAppend").append(refreshWeekExamListHtml);
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
    window.WeekExamListController = new WeekExamListController();
})();
