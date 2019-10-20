(function () {
    function StudyAutoPersonController() {
        this.initInternalLearn = "0";
        this.initForeignLearn = "0";
        this.initVedioLearn = "0";
        this.initExamQuestionLearn = "0";
    }
    StudyAutoPersonController.prototype = {
        init: function () {
            var self = window.StudyAutoPersonController;
            self.refreshData();
            self.clickEvent();
        },
        clickEvent: function () {
            var self = this;
            //内规库学习
            $(document).off('click',"#internalRegulationLearning").on('click',"#internalRegulationLearning",function () {
                if (self.initInternalLearn === "1") {
                    var url = "content/page/internalRegulationLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initInternalLearn = "1";
                    var url = "content/page/internalRegulationLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.InternalRegulationController.init();
                }
            });
            //外规库学习
            $(document).off('click',"#foreignRegulationLearning").on('click',"#foreignRegulationLearning",function () {
                if (self.initForeignLearn === "1") {
                    var url = "content/page/foreginRegulationLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initForeignLearn = "1";
                    var url = "content/page/foreginRegulationLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.ForeginRegulationController.init();
                }
            });
            //考试题库学习
            $(document).off('click',"#examinationQuestionLearning").on('click',"#examinationQuestionLearning",function () {
                if (self.initExamQuestionLearn === "1") {
                    var url = "content/page/examQuestionLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initExamQuestionLearn = "1";
                    var url = "content/page/examQuestionLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.ExamQuestionListController.init();
                }
            });
            //视频学习
            $(document).off('click',"#vedioLearning").on('click',"#vedioLearning",function () {
                if (self.initVedioLearn === "1") {
                    var url = "content/page/vedioLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initVedioLearn = "1";
                    var url = "content/page/vedioLearn.html";
                    MBIManager.getCurrView().router.loadPage(url);
                    window.VedioLearnController.init();
                }
            });
            //其他学习
            $(document).off('click',"#otherLearn").on('click',"#otherLearn",function () {
                myApp.alert("正在开发中,敬请期待");
                return;
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
    window.StudyAutoPersonController = new StudyAutoPersonController();
})();
