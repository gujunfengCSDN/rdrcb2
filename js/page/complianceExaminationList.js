(function () {
    function ComplianceExaminationController() {
        this.initWeekExam = "0";
        this.initUnifiedExamination = "0";
        this.initHistoricalResults = "0";
    }
    ComplianceExaminationController.prototype = {
        init: function () {
            var self = window.ComplianceExaminationController;
            myApp.onPageAfterAnimation('complianceExaminationListDetail', function (page) {
                self.refreshData();
                self.clickEvent();
            });

        },
        clickEvent: function () {
            var self = this;
            //每周一考
            // $(document).off('click',"#weekExamList").on('click',"#weekExamList",function () {
            //     if (self.initWeekExam === "1") {
            //         var url = "content/page/weekExamList.html";
            //         MBIManager.getCurrView().router.loadPage(url);
            //     } else {
            //         self.initWeekExam = "1";
            //         var url = "content/page/weekExamList.html";
            //         MBIManager.getCurrView().router.loadPage(url);
            //         window.WeekExamListController.init();
            //     }
            // });
            //统一考试点击事件
            $(document).off('click',"#unifiedExamination").on('click',"#unifiedExamination",function () {
                // myApp.alert("开发中,请先到PC端操作");
                // return;
                if (self.initUnifiedExamination === "1") {
                    var url = "content/page/unifiedExaminationList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initUnifiedExamination = "1";
                    var url = "content/page/unifiedExaminationList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.UnifiedExaminationListController.init();
                }
            });
            //历史成绩点击事件
            $(document).off('click',"#historicalResults").on('click',"#historicalResults",function () {
                if (self.initHistoricalResults === "1") {
                    var url = "content/page/historicalResultsList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initHistoricalResults = "1";
                    var url = "content/page/historicalResultsList.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.HistoricalResultsListController.init();
                }
            });
        },
        refreshData: function () {
            var self = this;
        },
    };
    window.ComplianceExaminationController = new ComplianceExaminationController();
})();
