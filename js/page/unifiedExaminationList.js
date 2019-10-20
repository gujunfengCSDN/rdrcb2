/*统一考试*/
(function () {
    function UnifiedExaminationListController() {
        this.initBusinessExam = "0";
        this.unifiedExaminationData = "";
    }
    UnifiedExaminationListController.prototype = {
        init: function () {
            var self = window.UnifiedExaminationListController;
            myApp.onPageAfterAnimation('unifiedExaminationListDetail', function (page) {
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            $(document).off('click',".businessExaminationClass").on('click',".businessExaminationClass",function () {
                var paperId = $(this).attr("id").split("_")[0];
                var schId = $(this).attr("id").split("_")[1];
                var examWay = $(this).attr("id").split("_")[2];
                var examTime = $(this).attr("id").split("_")[3];
                if (self.initBusinessExam === "1") {
                    var url = "content/page/unifiedExaminationDetail.html?paperId=" + paperId +"&schId="+schId+"&examWay="+examWay+"&examTime="+examTime;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initBusinessExam = "1";
                    var url = "content/page/unifiedExaminationDetail.html?paperId=" + paperId +"&schId="+schId+"&examWay="+examWay+"&examTime="+examTime;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.UnifiedExaminationDetailController.init();
                }
            });
        },
        refreshData: function () {
            var self = this;
            var jsonData = {};
            var unifiedExaminationHtml = "";
            jsonData.userCode = window.Constants.userCode;
            log("发送请求"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appExamTy/queryExamTyList",jsonData,function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("每周一考未考"+JSON.stringify(jjData,null,4));
                self.unifiedExaminationData = jjData;
                for(var i = 0; i<jjData.length;i++){
                    unifiedExaminationHtml += '<div id="'+ jjData[i].paperId +'_'+ jjData[i].schId +'_'+ jjData[i].examWay +'_'+ jjData[i].examTime +'" class="card businessExaminationClass">\n' +
                        '<div class="card-content" style="padding: 10px;">\n' +
                    '<div class="row" style="margin: 5px 0px;">\n' +
                    '    <div class="col-35 ExamFontSize" style="text-align: center;">员工姓名:</div>\n' +
                    '       <div id="userName'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                    '        <div class="col-35 ExamFontSize" style="text-align: center;">考试名称:</div>\n' +
                    '        <div id="examContent'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                    '   </div>\n' +
                    '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                    '        <div class="col-35 ExamFontSize" style="text-align: center;">开始日期:</div>\n' +
                    '        <div id="examStartTime'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                    '        <div class="col-35 ExamFontSize" style="text-align: center;">截止日期:</div>\n' +
                    '        <div id="examEndTime'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                    '    </div>\n' +
                    '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                    '        <div class="col-35 ExamFontSize" style="text-align: center;">考试时间:</div>\n' +
                    '        <div id="examTime'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '</div>';
                }
                $("#businessExamination").empty();
                $("#businessExamination").append(unifiedExaminationHtml);
                self.refreshExaminationData();
            },function (data) {
                myApp.alert("服务异常");
            });
        },
        refreshExaminationData: function () {
            var self = this;
            if(self.isNull(self.unifiedExaminationData)){
                return;
            }
            for(var i = 0; i<self.unifiedExaminationData.length;i++){
                if(self.isNull(self.unifiedExaminationData[i].userName) ===false) {
                    $("#userName"+self.unifiedExaminationData[i].id).text(self.unifiedExaminationData[i].userName);
                }
                if(self.isNull(self.unifiedExaminationData[i].pasperName) ===false) {
                    $("#examContent"+self.unifiedExaminationData[i].id).text(self.unifiedExaminationData[i].pasperName);
                }
                if(self.isNull(self.unifiedExaminationData[i].startTime) ===false) {
                    $("#examStartTime"+self.unifiedExaminationData[i].id).text(self.unifiedExaminationData[i].startTime);
                }
                if(self.isNull(self.unifiedExaminationData[i].endTime) ===false) {
                    $("#examEndTime"+self.unifiedExaminationData[i].id).text(self.unifiedExaminationData[i].endTime);
                }
                if(self.isNull(self.unifiedExaminationData[i].examTime) ===false) {
                    $("#examTime"+self.unifiedExaminationData[i].id).text(self.unifiedExaminationData[i].examTime + "分钟");
                }
            }
        },
        isNull: function (str) {
            if (str === undefined || str === "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.UnifiedExaminationListController = new UnifiedExaminationListController();
})();

