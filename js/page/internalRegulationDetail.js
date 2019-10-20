/*内规库详情*/
(function () {
    function InternalRegulationDetailController() {
        this.internalReguTaskId = "";
    }
    InternalRegulationDetailController.prototype = {
        init: function () {
            var self = window.InternalRegulationDetailController;
            myApp.onPageAfterAnimation('internalRegulationDetail', function (page) {
                self.internalReguTaskId = page.query.internalRegulaId;
                self.refreshData();
                self.clickEvent();
            });

        },
        clickEvent: function () {
            var self = this;
            $(document).off('click',"#backIdinter").on('click',"#backIdinter",function () {
                MBIManager.getCurrView().router.back();
            });
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
            jsonData.id = self.internalReguTaskId;
            NetManager.httpReq("appLearningProvisionAct/getProvisionDetailForAppById", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取内规详情" + JSON.stringify(jjData, null, 4))
                if(self.isNull(jjData.code) === false){
                    $("#institutionalCode").text(jjData.code);
                }
                if(self.isNull(jjData.name) === false){
                    $("#institutionalName").text(jjData.name);
                }
                if(self.isNull(jjData.state) === false){
                    $("#institutionalState").text(jjData.state);
                }
                if(self.isNull(jjData.orgName) === false){
                    $("#trustedRoot").text(jjData.orgName);
                }
                if(self.isNull(jjData.keyWords) === false){
                    $("#keyWord").text(jjData.keyWords);
                }
                if(self.isNull(jjData.summary) === false){
                    $("#institutionalSummary").text(jjData.summary);
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
    window.InternalRegulationDetailController = new InternalRegulationDetailController();
})();

