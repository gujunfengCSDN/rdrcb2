(function () {
    function StudyTaskLearningController() {
        this.initStudyLearningTask = "0";
        this.yearStudy = "";
        this.quaStudy = "";
    }
    StudyTaskLearningController.prototype = {
        init: function () {
            var self = window.StudyTaskLearningController;
            myApp.onPageAfterAnimation('studyTaskLearningDetail', function (page) {
                self.yearStudy = page.query.yearStudy;
                self.quaStudy = page.query.quaStudy;
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            $(document).off('click',".studyLearningTask").on('click',".studyLearningTask",function () {
                var studyLearningTaskId = $(this).attr("id");
                if (self.initStudyLearningTask === "1") {
                    var url = "content/page/studyTaskLearningDetail.html?studyLearningTaskId="+studyLearningTaskId;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initStudyLearningTask = "1";
                    var url = "content/page/studyTaskLearningDetail.html?studyLearningTaskId="+studyLearningTaskId;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.StudyTaskLearningDetailController.init();
                }
            });
        },
        refreshData: function () {
            var self = this;
            var studyTaskLearnHtml = "";
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            jsonData.year = self.yearStudy;
            jsonData.quarter = self.quaStudy;log("学习任务具体列表"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appLearningTasksDetailAct/getTasksListForApp",jsonData,function (jjData) {
                if(self.isNull(jjData) === true){
                   return;
                }
                log("具体学习任务列表"+JSON.stringify(jjData,null,4))
                var data = jjData;
                for(var i = 0; i< data.length; i++){
                    studyTaskLearnHtml += '<div id="'+ data[i].taskId +'" class="row studyLearningTask" style="border-bottom: 1px solid #dcdee8;height: 10%;margin: 5px 10px;">\n' +
                        '    <div class="col-80" style="height: 100%;margin-left: 2%;">\n' +
                        '   <div style="font-size: 16px;color: #000;">\n' +
                        '   <span style="color: #64758f;font-size: 16px;vertical-align:-webkit-baseline-middle">'+ data[i].taskName +'</span>\n' +
                        '   </div>\n' +
                        '   <div style="font-size: 12px;width: 100%;">\n' +
                        '   <span>'+ data[i].learningTypeName +'</span>\n' +
                        '   <span style="margin-left: 10px;">下发时间:</span>\n' +
                        '<span>'+ data[i].publishTime +'</span>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '<div class="col-20" style="height: 100%;display: flex;align-items: center;justify-content: flex-end;">\n' +
                        '   <img src="images/exam/iconButton.png" style="height: 16px;vertical-align:-webkit-baseline-middle">\n' +
                        '</div>\n' +
                        '</div>';
                }
                $("#studyTaskList").empty();
                $("#studyTaskList").append(studyTaskLearnHtml);
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
    window.StudyTaskLearningController = new StudyTaskLearningController();
})();

