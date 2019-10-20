/*学习任务具体页面*/
(function () {
    function StudyTaskLearningDetailController() {
        this.initStudyLearningTaskDetail = "0";
        this.studyDetailId = "0";
        this.initStudyGetFile = "0";
        this.taskFileID = "";
        this.InterClear = "";
    }
    StudyTaskLearningDetailController.prototype = {
        init: function () {
            var self = window.StudyTaskLearningDetailController;
            myApp.onPageAfterAnimation('studyTaskLearningDetailHtml', function (page) {
                self.studyDetailId = page.query.studyLearningTaskId;
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击获取附件
            $(document).off('click',"#fileGet").on('click',"#fileGet",function () {
                // myApp.alert("功能开发中,敬请期待");
                // return;
                myApp.popup('#fileDetail');
                self.refreshFileData();
            });
            //点击开始按钮
            $(document).off('click',"#startButton").on('click',"#startButton",function () {
                myApp.alert('是否确定开始', '确定', function () {
                    $("#startButton").hide();
                    $("#commitButton").show();
                    self.refreshStart();
                });
            });
            //点击提交按钮
            $(document).off('click',"#commitButton").on('click',"#commitButton",function () {
                myApp.alert('是否确定提交', '确定', function () {
                    clearInterval(self.InterClear);
                    self.refreshCommit();
                });
            });
        },
        refreshData: function () {
            var self = this;
            var studyTaskLearnDetailHtml = "";
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            jsonData.taskId = self.studyDetailId;log("学习任务具体列表"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appLearningTasksDetailAct/getTaskDetailForApp",jsonData,function (jjData) {
                if(self.isNull(jjData) === true){
                    return;
                }
                log("学习任务详情数据"+JSON.stringify(jjData,null,4))
                var data = jjData;
                self.taskFileID = jjData.taskFileId;
                if(self.isNull(data.taskName) === false){
                    $("#studyTitleName").text(data.taskName);
                }
                if(self.isNull(data.learningTime) === false){
                    $("#studyTime").text(data.learningTime);
                }
                if(data.learningContentType == 0){
                    if(self.isNull(data.learningContentWords) === false){
                        $("#studyContent").text(data.learningContentWords);
                    }
                }else if(data.learningContentType == 1){
                    $("#studyContent").hide();
                    $("#studyVedioContent").show();
                    var vedioStudyHtml = '<div class="row" style="padding: 10px 10px;width: 100%;height: 100%">\n' +
                        '<video src="'+ data.filePath +'" width= 100%; height=100%; object-fit: fill controls>'+ data.fileName +'</vedio>\n' +
                        '</div>';
                    $("#studyVedioContent").empty();
                    $("#studyVedioContent").append(vedioStudyHtml);
                }
            },function () {

            })
        },
        refreshStart: function () {
            var self = this;
            var timeSecondTrsa = 0;
            var timeMinuteTrsa = 0;
            var timeHourTrsa = 0;
            self.InterClear = setInterval(function () {
                timeSecondTrsa++;
                if(timeSecondTrsa === 60){
                    timeMinuteTrsa++;
                    timeSecondTrsa = 0;
                    if(timeMinuteTrsa === 60){
                        timeHourTrsa++;
                        timeMinuteTrsa = 0;
                    }
                }
                if(timeSecondTrsa < 10 ){
                    timeSecondTrsa = "0" + timeSecondTrsa;
                }
                if(timeMinuteTrsa < 10){
                    timeMinuteTrsa = "0" + timeMinuteTrsa;
                }
                if(timeHourTrsa < 10){
                    timeHourTrsa = "0" + timeHourTrsa;
                }
                $("#studyHourTime").text(timeHourTrsa);
                $("#studyMinuteTime").text(timeMinuteTrsa);
                $("#studySecondTime").text(timeSecondTrsa);
                if(timeSecondTrsa < 10 ){
                    timeSecondTrsa = parseInt(timeSecondTrsa);
                }
                if(timeMinuteTrsa < 10){
                    timeMinuteTrsa = parseInt(timeMinuteTrsa);
                }
                if(timeHourTrsa < 10){
                    timeHourTrsa = parseInt(timeHourTrsa);
                }
            },1000);

        },
        //获取附件详情
        refreshFileData: function () {
            var self = this;
            var jsonData = {};
            var jsonDataHtml = "";
            jsonData.taskFileId = self.taskFileID;
            NetManager.httpReq("appLearningTasksFileAct/getTaskFileForApp",jsonData,function (jjData) {
                if(self.isNull(jjData) === true){
                    return;
                }
                log("获取附件结果返回"+JSON.stringify(jjData,null,4))
                jsonDataHtml += '<div class="row" style="margin: 14px 10px;height: 100%">\n' +
                    '<a href="'+ jjData.filePath +'" style="font-size: 16px;">'+ jjData.fileName +'</a>\n' +
                    '</div>';
                $("#studyFileContent").empty();
                $("#studyFileContent").append(jsonDataHtml);
            },function () {

            })
        },
        refreshCommit: function () {
            var self = this;
            var jsonData = {};
            var timeTotalCount = $("#studyHourTime").text() + ":" + $("#studyMinuteTime").text() + ":" + $("#studySecondTime").text();
            jsonData.userCode = window.Constants.userCode;
            jsonData.taskId = self.studyDetailId;
            jsonData.thisLearningTime = timeTotalCount;log("学习任务具体列表"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appLearningTasksDetailAct/recordLearningTimeForApp",jsonData,function (jjData) {
                if(self.isNull(jjData) === true){
                    return;
                }
                log("记录时间提交结果返回"+JSON.stringify(jjData,null,4))
                if(jjData == "记录成功"){
                    MBIManager.getCurrView().router.back();
                }

            },function () {

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
    window.StudyTaskLearningDetailController = new StudyTaskLearningDetailController();
})();

