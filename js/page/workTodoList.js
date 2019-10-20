/*待办列表*/
(function () {
    function WorkTodoListController() {
        this.initWorkTodoDetail = "0";
        this.workTodoflag = "0";
    }

    WorkTodoListController.prototype = {
        init: function () {
            var self = window.WorkTodoListController;
            myApp.onPageAfterAnimation('workTodoList', function (page) {
                self.workTodoflag= page.query.workTodoFlag;
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            // $(document).off('click', ".weekExamClass").on('click', ".weekExamClass", function () {
            //     var examContentId = $(this).attr("id");//需要注意的是id值放置的位置
            //     if (self.initWorkTodoDetail === "1") {
            //         var url = "content/page/weekExamContent.html?examContentId=" + examContentId;
            //         MBIManager.getCurrView().router.loadPage(url);
            //     } else {
            //         self.initWorkTodoDetail = "1";
            //         var url = "content/page/weekExamContent.html?examContentId=" + examContentId;
            //         MBIManager.getCurrView().router.loadPage(url);
            //         window.WeekExamContentController.init();
            //     }
            // });
        },
        refreshData: function () {
            var self = this;
            var refreshWorkTodoSecListHtml = "";
            var workTodoSecListHtml = "";
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            jsonData.flag = self.workTodoflag;
            NetManager.httpReq("eventSummary/getSecondTodoList", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                for(var i = 0;i<jjData.length;i++){
                    if(self.isNull(jjData[i].num) === false && jjData[i].num !== 0){
                        workTodoSecListHtml = '<div id="todoCountLevel" style="background-image: url(images/workTodo/backgroundCount.png);background-size: 100% 100%;position: absolute;top: 2%;left: 36%;min-width: 40%;color: white;">'+ jjData[i].num +'</div>';
                    }else{
                        workTodoSecListHtml = '<div id="todoCountLevel" style="background-image: url(images/workTodo/backgroundCount.png);background-size: 100% 100%;position: absolute;top: 2%;left: 36%;min-width: 40%;color: white;display: none;">'+ jjData[i].num +'</div>';
                    }
                    refreshWorkTodoSecListHtml += '<div id="'+ jjData[i].secondFlag +'" class="row item-inner workTodoList" style="margin-left: 4%;margin-top: 2%;">\n' +
                        '<div class="col-80" style="height: 44px;">\n' +
                        '<img src="images/workTodo/employeeExamination.png" style="width: 20px;height: 20px;vertical-align:-webkit-baseline-middle">\n' +
                        ' <span id="detail_title" class="item-title" style="font-size: 16px;color: black;font-weight: bold;vertical-align:-webkit-baseline-middle;margin-left: 10px">'+ jjData[i].name +'</span>\n' +
                        '</div>\n' +
                        '<div class="col-20" style="height: 44px;text-align: center;position: relative">\n' +
                        '<img src="images/exam/iconButton.png" style="height: 16px;vertical-align:-webkit-baseline-middle">'+ workTodoSecListHtml +'</div>\n' +
                        '</div>';
                }
                log("获取第二层待办列表" + JSON.stringify(jjData, null, 4))
                $("#workTodoListAppend").empty();
                $("#workTodoListAppend").append(refreshWorkTodoSecListHtml);
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
    window.WorkTodoListController = new WorkTodoListController();
})();