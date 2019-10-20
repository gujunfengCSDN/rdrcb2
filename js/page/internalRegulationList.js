/*内规库学习*/
(function () {
    function InternalRegulationController() {
        this.initInternalRegulaList = "0";
    }
    InternalRegulationController.prototype = {
        init: function () {
            var self = window.InternalRegulationController;
            myApp.onPageInit('internalRegulationLearnList', function (page) {
                myApp.showPreloader();
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击搜索按钮
            $(document).off('click',"#searchInfoInter").on('click',"#searchInfoInter",function () {
                var interContent = $("#titleValue").val();
                self.refreshData(interContent);
            });
            // 点击具体详情
            $(document).off('click',".internalDetail").on('click',".internalDetail",function () {
                var internalRegulaId = $(this).attr("id");
                if (self.initInternalRegulaList === "1") {
                    var url = "content/page/internalRegulationDetail.html?internalRegulaId=" + internalRegulaId;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initInternalRegulaList = "1";
                    var url = "content/page/internalRegulationDetail.html?internalRegulaId=" + internalRegulaId;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.InternalRegulationDetailController.init();
                }
            });
        },
        refreshData: function (interContent) {
            var self = this;
            var refreshInterNameListHtml = "";
            var jsonData = {};
            // jsonData.userCode = window.NetManager.userCode;log("查看数据111"+JSON.stringify(window.Constants.userCode,null,4))
            jsonData.flag = "1";
            jsonData.name = interContent;
            NetManager.httpReq("appLearningProvisionAct/getProvisionListForAppByFlag", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取内规列表" + JSON.stringify(jjData, null, 4))
                for (var i = 0; i < jjData.length; i++) {
                    refreshInterNameListHtml += '<div id="'+ jjData[i].id +'" class="row internalDetail" style="padding: 10px 10px;">\n' +
                        '<div style="width: 100%;font-size: 15px;color: #7B7B7B;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">'+ jjData[i].name +'</div>\n' +
                        '</div>';
                }
                $("#interListName").empty();
                $("#interListName").append(refreshInterNameListHtml);
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
    window.InternalRegulationController = new InternalRegulationController();
})();

