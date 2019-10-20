/*外规库详情*/
(function () {
    function ForeginRegulationDetailController() {
        this.foreginReguTaskId = "";
    }
    ForeginRegulationDetailController.prototype = {
        init: function () {
            var self = window.ForeginRegulationDetailController;
            myApp.onPageAfterAnimation('foreginRegulationDetail', function (page) {
                self.foreginReguTaskId = page.query.foreginRegulaId;
                self.refreshData();
                self.clickEvent();
            });

        },
        clickEvent: function () {
            var self = this;
            // 点击具体详情
            // $(document).off('click',".internalDetail").on('click',".internalDetail",function () {
            //     var internalRegulaId = $(this).attr("id");
            //     if (self.initInternalRegulaList === "1") {
            //         var url = "content/page/internalRegulationDetail.html?internalRegulaId=" + internalRegulaId;
            //         MBIManager.getCurrView().router.loadPage(url);
            //     } else {
            //         self.initInternalRegulaList = "1";
            //         var url = "content/page/internalRegulationDetail.html?internalRegulaId=" + internalRegulaId;
            //         MBIManager.getCurrView().router.loadPage(url);
            //         window.WeekExamContentController.init();
            //     }
            // });
        },
        refreshData: function () {
            var self = this;
            var jsonData = {};
            jsonData.id = self.foreginReguTaskId;
            NetManager.httpReq("appLearningProvisionAct/getProvisionDetailForAppById", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取外规详情" + JSON.stringify(jjData, null, 4))
                if(self.isNull(jjData.code) === false){
                    $("#institutionalCodeForegin").text(jjData.code);
                }
                if(self.isNull(jjData.name) === false){
                    $("#institutionalNameForegin").text(jjData.name);
                }
                if(self.isNull(jjData.state) === false){
                    $("#institutionalStateForegin").text(jjData.state);
                }
                if(self.isNull(jjData.orgName) === false){
                    $("#trustedRootForegin").text(jjData.orgName);
                }
                if(self.isNull(jjData.keyWords) === false){
                    $("#keyWordForegin").text(jjData.keyWords);
                }
                if(self.isNull(jjData.summary) === false){
                    $("#institutionalSummaryForegin").text(jjData.summary);
                }
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
    window.ForeginRegulationDetailController = new ForeginRegulationDetailController();
})();