/*视频学习*/
(function () {
    function VedioLearnController() {
        this.initVedioLearn = "0";
    }
    VedioLearnController.prototype = {
        init: function () {
            var self = window.VedioLearnController;
            myApp.onPageInit('vedioLearnList', function (page) {
                myApp.showPreloader();
                self.refreshData();
                self.refreshYearData();
                self.refreshQuaterData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击搜索按钮
            $(document).off('click',"#searchInfoVedio").on('click',"#searchInfoVedio",function () {
                var vedioYear = $("#vedioYearSelected").val();
                var vedioQuater = $("#vedioQuaterSelected").val();
                var vedioContent = $.trim($("#vedioListName").val());
                if(self.isNull(vedioYear) === true){
                    myApp.alert("请先选择年份");
                    return;
                }
                if(self.isNull(vedioQuater) === true){
                    myApp.alert("请先选择季度");
                    return;
                }
                self.refreshData(vedioYear,vedioQuater,vedioContent);
            });
            //点击进入详情
            $(document).off('click',".examQuestionDetail").on('click',".examQuestionDetail",function () {
                var vedioConnectUrl = encodeURIComponent($(this).attr("id").split("♂")[0]);
                var vedioConnectName = encodeURIComponent($(this).attr("id").split("♂")[1]);
                if (self.initVedioLearn === "1") {
                    var url = "content/page/vedioLearnDetail.html?vedioConnectUrl=" + vedioConnectUrl+"&vedioConnectName="+vedioConnectName;
                    MBIManager.getCurrView().router.loadPage(url);
                } else {
                    self.initVedioLearn = "1";
                    var url = "content/page/vedioLearnDetail.html?vedioConnectUrl=" + vedioConnectUrl+"&vedioConnectName="+vedioConnectName;
                    MBIManager.getCurrView().router.loadPage(url);
                    window.VedioLearnDetailController.init();
                }
            });
        },
        //年份
        refreshYearData: function () {
            var self = this;
            var selectName = "";
            var jsonData = {};
            NetManager.httpReq("appLearningTasksAct/getYearsForApp", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取年份" + JSON.stringify(jjData, null, 4))
                selectName += '<option value="" style="text-indent: 2px;color: black;">请选择</option>';
                for (var i = 0; i < jjData.length; i++) {
                    selectName += '<option value="'+ jjData[i].value +'" style="text-indent: 2px;color: black;">'+ jjData[i].text +'</option>';
                }
                $("#vedioYearSelected").empty();
                $("#vedioYearSelected").append(selectName);
            }, function (data) {
            })
        },
        //季度
        refreshQuaterData: function () {
            var self =this;
            var selectName = "";
            var jsonData = {};
            jsonData.groupId = "LEARNING_QUARTER";
            NetManager.httpReq("sys/ggzd/getGgzdListByGroupIdForApp", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取季度" + JSON.stringify(jjData, null, 4))
                selectName += '<option value="" style="text-indent: 2px;color: black;">请选择</option>';
                for (var i = 0; i < jjData.length; i++) {
                    selectName += '<option value="'+ jjData[i].zdValue +'" style="text-indent: 2px;color: black;">'+ jjData[i].zdName +'</option>';
                }
                $("#vedioQuaterSelected").empty();
                $("#vedioQuaterSelected").append(selectName);
            }, function (data) {
            })
        },
        refreshData: function (vedioYear,vedioQuater,vedioContent) {
            var self = this;
            var refreshVedioListHtml = "";
            var jsonData = {};
            jsonData.year = vedioYear;
            jsonData.quarter = vedioQuater;
            jsonData.fileName = vedioContent;
            NetManager.httpReq("appLearningTasksFileAct/getVideoListForApp", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("获取视频" + JSON.stringify(jjData, null, 4))
                for (var i = 0; i < jjData.length; i++) {
                    refreshVedioListHtml += '<div id="'+ jjData[i].filePath +'♂'+ jjData[i].fileName +'" class="row examQuestionDetail" style="padding: 10px 10px;">\n' +
                        '<div id="'+ jjData[i].filePath +'" style="width: 100%;font-size: 15px;color: #7B7B7B;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">'+ jjData[i].fileName +'</div>\n' +
                        // '<video  src="'+ jjData[i].filePath +'" controls>'+ jjData[i].fileName +'</vedio>\n' +
                        '</div>';
                }
                $("#vedioListName").empty();
                $("#vedioListName").append(refreshVedioListHtml);
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
    window.VedioLearnController = new VedioLearnController();
})();
