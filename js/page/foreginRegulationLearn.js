/*外规库列表*/
(function () {
    function ForeginRegulationController() {
        this.initForeginRegulaList = "0";
    }
    ForeginRegulationController.prototype = {
        init: function () {
            var self = window.ForeginRegulationController;
            myApp.onPageInit('foreginRegulationLearnList', function (page) {
                myApp.showPreloader();
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击搜索按钮
            $(document).off('click',"#searchInfoForegin").on('click',"#searchInfoForegin",function () {
                var foreginContent = $("#titleValueForegin").val();
                self.refreshData(foreginContent);
            });
            // 点击具体详情
            $(document).off('click',".internalDetail").on('click',".internalDetail",function () {
                var foreginRegulaId = $(this).attr("id");
                if (self.initForeginRegulaList === "1") {
                    var url = "content/page/foreginRegulationDetail.html?foreginRegulaId=" + foreginRegulaId;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initForeginRegulaList = "1";
                    var url = "content/page/foreginRegulationDetail.html?foreginRegulaId=" + foreginRegulaId;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.ForeginRegulationDetailController.init();
                }
            });
        },
        refreshData: function (foreginContent) {
            var self = this;
            var refreshForeginNameListHtml = "";
            var jsonData = {};
            // jsonData.userCode = window.NetManager.userCode;log("查看数据111"+JSON.stringify(window.Constants.userCode,null,4))
            jsonData.flag = "2";
            jsonData.name = foreginContent;
            NetManager.httpReq("appLearningProvisionAct/getProvisionListForAppByFlag", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取外规列表" + JSON.stringify(jjData, null, 4))
                for (var i = 0; i < jjData.length; i++) {
                    refreshForeginNameListHtml += '<div id="'+ jjData[i].id +'" class="row internalDetail" style="padding: 10px 10px;">\n' +
                        '<div style="width: 100%;font-size: 15px;color: #7B7B7B;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">'+ jjData[i].name +'</div>\n' +
                        '</div>';
                }
                $("#foreginListName").empty();
                $("#foreginListName").append(refreshForeginNameListHtml);
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
    window.ForeginRegulationController = new ForeginRegulationController();
})();