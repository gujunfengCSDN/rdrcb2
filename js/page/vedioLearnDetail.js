/*视频详情页面*/
(function () {
    function VedioLearnDetailController() {
        this.vedioAcceptedUrl = "";
        this.vedioAcceptedName = "";
    }
    VedioLearnDetailController.prototype = {
        init: function () {
            var self = window.VedioLearnDetailController;
            myApp.onPageAfterAnimation('vedioLearnDetail', function (page) {
                self.vedioAcceptedUrl = decodeURIComponent(page.query.vedioConnectUrl);
                self.vedioAcceptedName = decodeURIComponent(page.query.vedioConnectName);
                self.refreshData();
            });
        },
        clickEvent: function () {
            var self = this;

        },
        refreshData: function () {
            var self = this;
            var vedioDetailHtml = "";
            vedioDetailHtml += '<div class="row" style="padding: 10px 10px;width: 100%;height: 100%">\n' +
                '<video src="'+ self.vedioAcceptedUrl +'" width= 100%; height=100%; object-fit: fill controls>'+ self.vedioAcceptedName +'</vedio>\n' +
                '</div>';
            $("#vedioDetailAppend").empty();
            $("#vedioDetailAppend").append(vedioDetailHtml);
        },
        isNull: function (str) {
            if (str === undefined || str === "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.VedioLearnDetailController = new VedioLearnDetailController();
})();
