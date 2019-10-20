/*历史成绩*/
(function () {
    function HistoricalResultsListController() {
        this.initWeekExamListResults = "0";
        this.initUnifiedExaminationResults = "0";
    }
    HistoricalResultsListController.prototype = {
        init: function () {
            var self = window.HistoricalResultsListController;
            myApp.onPageAfterAnimation('historicalResultsListDetail', function (page) {
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //每周一考成绩查询跳转
            $(document).off('click',"#weekExamListResult").on('click',"#weekExamListResult",function () {
                if (self.initWeekExamListResults === "1") {
                    var url = "content/page/weekExamContentResult.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initWeekExamListResults = "1";
                    var url = "content/page/weekExamContentResult.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.WeekExamContentResultController.init();
                }
            });
            //统一考试成绩查询跳转
            $(document).off('click',"#unifiedExaminationResult").on('click',"#unifiedExaminationResult",function () {
                // myApp.alert("开发中,请先到PC端操作");
                // return;
                if (self.initUnifiedExaminationResults === "1") {
                    var url = "content/page/unifiedExaminationDetailResult.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initUnifiedExaminationResults = "1";
                    var url = "content/page/unifiedExaminationDetailResult.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.UnifiedExaminationDetailResultController.init();
                }
            });
        },
        refreshData: function () {
            var self = this;
        },
        isNull: function (str) {
            if (str === undefined || str === "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.HistoricalResultsListController = new HistoricalResultsListController();
})();

