/*考试题库学习*/
(function () {
    function ExamQuestionListController() {
        this.initExamQuestionList = "0";
    }
    ExamQuestionListController.prototype = {
        init: function () {
            var self = window.ExamQuestionListController;
            myApp.onPageInit('ExamQuestionLearnList', function (page) {
                self.refreshSelectedData();//加载选择
                myApp.showPreloader();
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击搜索按钮
            $(document).off('click',"#searchInfoExam").on('click',"#searchInfoExam",function () {
                var examType = $("#examSelected").val();
                var examContent = $("#titleValueExam").val();
                if(self.isNull(examType) === true){
                    myApp.alert("请先选择考试题目类型");
                    return;
                }
                self.refreshData(examContent,examType);
            });
            // 点击具体详情
            $(document).off('click',".examQuestionDetail").on('click',".examQuestionDetail",function () {
                var examQuestionId = $(this).attr("id");
                if (self.initExamQuestionList === "1") {
                    var url = "content/page/examQuestionDetail.html?examQuestionId=" + examQuestionId;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initExamQuestionList = "1";
                    var url = "content/page/examQuestionDetail.html?examQuestionId=" + examQuestionId;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.ExamQuestionDetailController.init();
                }
            });
        },
        refreshSelectedData: function () {
            var self = this;
            var selectName = "";
            var jsonData = {};
            jsonData.groupId = "APP_LEARNING_EXAM_INSCRIBE";
            NetManager.httpReq("sys/ggzd/getGgzdListByGroupIdForApp", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取考试题库列表" + JSON.stringify(jjData, null, 4))
                selectName += '<option value="" style="text-indent: 2px;color: black;">请选择</option>';
                for (var i = 0; i < jjData.length; i++) {
                    selectName += '<option value="'+ jjData[i].zdValue +'" style="text-indent: 2px;color: black;">'+ jjData[i].zdName +'</option>';
                }
                $("#examSelected").empty();
                $("#examSelected").append(selectName);
            }, function (data) {
            })
        },
        refreshData: function (examContent,examType) {
            var self = this;
            var refreshExamNameListHtml = "";
            var jsonData = {};
            jsonData.inscribe = examType;
            if(self.isNull(examContent) === true){
                jsonData.design = "";
            }else{
                jsonData.design = examContent;
            }
            log("查询题库列表" + JSON.stringify(jsonData, null, 4))
            NetManager.httpReq("appLearningExamListAct/getExamListForApp",jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取考试题库列表" + JSON.stringify(jjData, null, 4))
                for (var i = 0; i < jjData.length; i++) {
                    refreshExamNameListHtml += '<div id="'+ jjData[i].id +'" class="row examQuestionDetail" style="padding: 10px 10px;">\n' +
                        '<div style="width: 100%;font-size: 15px;color: #7B7B7B;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">'+ jjData[i].examDesign +'</div>\n' +
                        '</div>';
                }
                $("#examListName").empty();
                $("#examListName").append(refreshExamNameListHtml);
                myApp.hidePreloader();
            }, function (data) {
                myApp.alert("服务异常,请联系服务端")
                myApp.hidePreloader();
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
    window.ExamQuestionListController = new ExamQuestionListController();
})();

