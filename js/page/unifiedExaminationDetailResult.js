/*统一考试成绩查询*/
(function () {
    function UnifiedExaminationDetailResultController() {
        this.unifiedExaminationQueryData = "";
        this.initBusinessExamRusult = "0";
    }
    UnifiedExaminationDetailResultController.prototype = {
        init: function () {
            var self = window.UnifiedExaminationDetailResultController;
            myApp.onPageAfterAnimation('unifiedExaminationControlResultDetail', function (page) {
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            $(document).off('click',".businessExamResultClass").on('click',".businessExamResultClass",function () {
                var paperId = $(this).attr("id").split("_")[0];
                var schId = $(this).attr("id").split("_")[1];
                var examWay = $(this).attr("id").split("_")[2];
                var examTime = $(this).attr("id").split("_")[3];
                if (self.initBusinessExamRusult === "1") {
                    var url = "content/page/unifiedExamResultDetail.html?paperId=" + paperId +"&schId="+schId+"&examWay="+examWay+"&examTime="+examTime;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initBusinessExamRusult = "1";
                    var url = "content/page/unifiedExamResultDetail.html?paperId=" + paperId +"&schId="+schId+"&examWay="+examWay+"&examTime="+examTime;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.UnifiedExaminResultDetailController.init();
                }
            });
        },
        refreshData: function () {
            var self = this;
            var jsonData = {};
            var unifiedExaminationResultHtml = "";
            jsonData.userCode = window.Constants.userCode;
            log("发送请求"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appExamTy/queryExamTyHisList",jsonData,function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("自主学习已考"+JSON.stringify(jjData,null,4));
                self.unifiedExaminationQueryData = jjData;
                for(var i = 0; i<jjData.length;i++){
                    unifiedExaminationResultHtml += '<div id="'+ jjData[i].paperId +'_'+ jjData[i].schId +'_'+ jjData[i].examWay +'_'+ jjData[i].examTime +'" class="card businessExamResultClass">\n' +
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
                        '        <div class="col-35 ExamFontSize" style="text-align: center;">考试时间:</div>\n' +
                        '        <div id="examTime'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                        '    </div>\n' +
                        '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                        '        <div class="col-35 ExamFontSize" style="text-align: center;">员工得分:</div>\n' +
                        '        <div id="scorePerson'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                        '    </div>\n' +
                        '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                        '        <div class="col-35 ExamFontSize" style="text-align: center;">卷面分:</div>\n' +
                        '        <div id="scoreExam'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                        '    </div>\n' +
                        '    <div class="row" style="text-align: center;margin: 5px 0px;">\n' +
                        '        <div class="col-35 ExamFontSize" style="text-align: center;">正确率:</div>\n' +
                        '        <div id="scoreQuer'+ jjData[i].id + '" class="col-65 ExamFontSize" style="text-align: left;"></div>\n' +
                        '    </div>\n' +
                        '    </div>\n' +
                        '</div>';
                }
                $("#businessExaminationQuery").empty();
                $("#businessExaminationQuery").append(unifiedExaminationResultHtml);
                self.refreshExaminationQueryData();
            },function (data) {
                myApp.alert("服务异常");
            });
        },
        refreshExaminationQueryData: function () {
            var self = this;
            var self = this;
            if(self.isNull(self.unifiedExaminationQueryData)){
                return;
            }
            for(var i = 0; i<self.unifiedExaminationQueryData.length;i++){
                if(self.isNull(self.unifiedExaminationQueryData[i].userName) ===false) {
                    $("#userName"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].userName);
                }
                if(self.isNull(self.unifiedExaminationQueryData[i].pasperName) ===false) {
                    $("#examContent"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].pasperName);
                }
                if(self.isNull(self.unifiedExaminationQueryData[i].startTime) ===false) {
                    $("#examStartTime"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].startTime);
                }
                if(self.isNull(self.unifiedExaminationQueryData[i].examTime) ===false) {
                    $("#examTime"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].examTime + "分钟");
                }
                if(self.isNull(self.unifiedExaminationQueryData[i].examTime) ===false) {
                    $("#scorePerson"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].userScore);
                }
                if(self.isNull(self.unifiedExaminationQueryData[i].examTime) ===false) {
                    $("#scoreExam"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].examScore);
                }
                if(self.isNull(self.unifiedExaminationQueryData[i].examTime) ===false) {
                    $("#scoreQuer"+self.unifiedExaminationQueryData[i].id).text(self.unifiedExaminationQueryData[i].correct);
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
    window.UnifiedExaminationDetailResultController = new UnifiedExaminationDetailResultController();
})();

