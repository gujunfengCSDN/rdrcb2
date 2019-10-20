/*年度季度学习任务列表*/
(function () {
    function StudyTaskYearListController() {
        this.initStudyYearListTask = "0";
    }

    StudyTaskYearListController.prototype = {
        init: function () {
            var self = window.StudyTaskYearListController;
            myApp.onPageAfterAnimation('studyTaskYearListDetail', function (page) {
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            $(document).off('click', ".studyLearningTaskYear").on('click', ".studyLearningTaskYear", function () {
                var yearStudy = $(this).attr("id").split("_")[0];
                var quaStudy = $(this).attr("id").split("_")[1];
                if (self.initStudyYearListTask === "1") {
                    var url = "content/page/studyTaskLearning.html?yearStudy="+yearStudy+"&quaStudy="+quaStudy;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initStudyYearListTask = "1";
                    var url = "content/page/studyTaskLearning.html?yearStudy="+yearStudy+"&quaStudy="+quaStudy;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.StudyTaskLearningController.init();
                }
            });
        },
        refreshData: function () {
            var self = this;
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            NetManager.httpReq("appLearningTasksDetailAct/getYearAndQuarterListForApp", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("年度季度学习任务列表" + JSON.stringify(jjData, null, 4))
                var data = jjData;
                $("#examYearLi").show();
                var studyTaskYearList = "";
                var studyTodoCountHtml = "";
                for (var i = 0; i < data.length; i++) {
                    if(self.isNull(jjData[i].unfinishedCount) === false && jjData[i].unfinishedCount !== 0){
                        studyTodoCountHtml = '<div style="background-image: url(images/workTodo/backgroundCount.png);background-size: 100% 100%;position: absolute;left: -65%;min-width: 40%;color: white;text-align: center;">'+ jjData[i].unfinishedCount +'</div>';
                    }else{
                        studyTodoCountHtml = '<div style="background-image: url(images/workTodo/backgroundCount.png);background-size: 100% 100%;position: absolute;left: -65%;min-width: 40%;color: white;display: none;text-align: center;">'+ jjData[i].unfinishedCount +'</div>';
                    }
                    var studyQueryId = data[i].year + "_" + data[i].quarter
                    studyTaskYearList += '<div id="'+ studyQueryId +'" class="row studyLearningTaskYear" style="border-bottom: 1px solid #efeff4;height: 25%;">\n' +
                        '<div class="col-80" style="height: 100%;display: flex;align-items: center;">\n' +
                        '<img src="images/workTodo/complianceInspection.png" style="width: 20px;height: 20px;vertical-align:-webkit-baseline-middle;">\n' +
                        '<div style="font-size: 16px;color: #000;display: inline-block;margin-left: 10px;">'+ data[i].yearAndQuarter +'</div>\n' +
                        // '<div style="font-size: 13px;color: #8a8a8a;">未完成</div>\n' +
                        ' </div>\n' +
                        ' <div class="col-20" style="height: 100%;display: flex;align-items: center;justify-content: flex-end;position: relative">\n' +
                        ' <img src="images/exam/iconButton.png" style="height: 16px;vertical-align:-webkit-baseline-middle">'+ studyTodoCountHtml +'</div>\n' +
                        '   </div>';
                }
                $("#examYearLi").empty();
                $("#examYearLi").append(studyTaskYearList);
            }, function () {

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
    window.StudyTaskYearListController = new StudyTaskYearListController();
})();

