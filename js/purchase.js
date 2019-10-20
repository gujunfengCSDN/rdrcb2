(function () {
    "use strict";
    function Purchase() {
        this.approvalContractPageInit = 0;
        this.procurementPageInit = 0;
        this.supervisePageInit = 0;
        this.eventWorkItemPageInit = 0;
        this.reimbursePageInit = 0;
        this.creditPageInit = 0;
        this.depositRatePageInit = 0;
        this.bigdepositPageInit = 0;
        this.spRateInfoQueryPageInit = 0;
        this.lccpPageInit = 0;
        this.hbhMeetDtailListPageInit = 0;
        this.dbhMeetDtailListPageInit = 0;
        this.sealDtailListPageInit = 0;
        this.litigationListPageInit = 0;
        this.interestRatePageInit = 0;
        this.suggestionPageInit = 0;
        this.salaryApprovePageInit = 0;
        this.dealWorkPageLC = true;
        this.purchaseView = null;
        this.pageIndex = 1;
        this.androidBackFlag = 0;
        //采购待处理
        this.approvalPending = '';
        //督办待处理
        this.supervision = '';
        //合理化建议待处理
        this.suggestion = '';
        //信贷审批待处理
        this.credit = '';
        //对客利率定价审批待处理
        this.depositRate = '';
        //对客利率定价审批待处理
        this.BigDeposit = '';
        this.AplyTp = {'W01001':'贷款利率审批','W01002':'贴现利率审批','W01003':'存款利率审批','W01005':'大额存单审批','W01006':'服务价格审批'};

        //工资审批待处理
        this.salaryApprove = '';
        //流程银行
        this.processBank = '';
        //事件流程待处理
        this.eventWorkItem = '';
        //报销单待处理
        this.reimburse = '';
        //信贷已处理
        this.creditApplied = '';
        //合理化建议已处理
        this.suggestApplied = '';
        //采购已处理
        this.haveApplied = '';
        //督办已处理
        this.superApplied = '';
        //工资审批已处理
        this.salaryApproved = '';
        //事件流程已处理
        this.eventWorkApplied = '';
        //报销单已处理
        this.reimburseApplied = '';
        //流转日志参数
        this.circulationParam = '';
        //流转类型
        this.flowType = '';
        //登录人档案号
        this.loginUser = '';

    }

    Purchase.prototype = {
        initPurchase: function () {
            this.purchaseView = myApp.addView('#viewPurchase', {
                swipeBackPage: true,
                domCache: true,
                dynamicNavbar: true,
                animateNavBackIcon: true

            });
            if(isIos){
                AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                AppOp.setAppBackgroundColor(Constants.StatusBarColor.iosToDoWhite);
            }
            log("Purchase init");
            //$("#main_navbar_back").click(this.onClickNavbarBack);
            this.pageOnShow();
            this.clickEvent();
            this.showDetail();
        },
        onClickNavbarBack: function () {
            if ($(this).css('opacity') === "1") {
                $(this).css({'opacity': 0});
                var view = window.Purchase.purchaseView;
                view.router.back();
            }
        },
        showDetail: function () {
            var jsonData = {};
            /*NetManager.httpReq("schedule/appDcdb/getIsflag",jsonData,function (data) {
                /!*alert(data);*!/
                if( data===1){
                    $("#sjdetail").show();
                }
            });*/
        },
        clickEvent: function () {
            /*$(document).on('click', '#wwwwwwww', function () {
                alert(111)
                setTimeout(function () {
                 context.finish();
                 },1000);

            });*/

            //差旅点击跳转
            $(document).off('click', ".travelEcpensesApprovalClick").on('click', ".travelEcpensesApprovalClick", function () {
                // var code = $(this).attr("id").split("_")[1];
                var self = window.Purchase;
                var url = "content/page/travelEcpensesApprovalClick.html?loginUser="+self.loginUser;
                window.Purchase.purchaseView.router.loadPage(url);
                window.TravelEcpensesApprovalClick.init();
            });
            $(document).on('click', '.approvalPendingClass,.haveAppliedClass', function () {
                var cgCode = $(this).attr("id").split("_")[1];
                var dah = $(this).attr("id").split("_")[2];

                var cgCodeInfo = {};
                cgCodeInfo.cgCode = cgCode;
                cgCodeInfo.dah = dah;

                var cgCodeInfoString = JSON.stringify(cgCodeInfo);
                var self = window.Purchase;
                if (self.procurementPageInit === 1) {
                    var url = "content/page/procurementDetail.html?cgCodeInfoString=" + cgCodeInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.procurementPageInit = 1;
                    var url = "content/page/procurementDetail.html?cgCodeInfoString=" + cgCodeInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.procurementDetailController.init();
                }
            });


            $(document).on('click', '.approvalContractClass', function () {
                var code = $(this).attr("id").split("_")[1];
                var self = window.Purchase;
                var status="approvalContract";
                if (self.approvalContractPageInit === 1) {
                    var url = "content/page/approvalContractDetail.html?code=" + code+"&loginUser="+self.loginUser+"&status="+status;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.approvalContractPageInit = 1;
                    var url = "content/page/approvalContractDetail.html?code=" + code+"&loginUser="+self.loginUser+"&status="+status;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.ApprovalContractDetail.init();
                }
            });
            $(document).on('click', '.approvalContractAppliedClass', function () {
                var code = $(this).attr("id").split("_")[1];
                var self = window.Purchase;
                var status="approvalContractApplied";
                if (self.approvalContractAppliedPageInit === 1) {
                    var url = "content/page/approvalContractDetail.html?code=" + code+"&loginUser="+self.loginUser+"&status="+status;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.approvalContractAppliedPageInit = 1;
                    var url = "content/page/approvalContractDetail.html?code=" + code+"&loginUser="+self.loginUser+"&status="+status;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.ApprovalContractDetail.init();
                }
            });
            $(document).on('click', '.eventWorkItemClass,.eventWorkAppliedClass', function () {
                var eventId = $(this).attr("id").split("_")[1];
                var eventWorkItemId = eventId;
                log("eventWorkItemId:"+eventWorkItemId);
                var self = window.Purchase;
                if(eventWorkItemId.substring(0,3) == 'MOD'){
                    var url = "content/page/eventChangeDetail.html?eventWorkItemId=" + eventWorkItemId+"&loginUser="+self.loginUser;
                    window.Purchase.purchaseView.router.loadPage(url);
                    if(self.eventWorkItemPageInit != 1){
                        //self.eventWorkItemPageInit = 1;
                        var url = "content/page/eventChangeDetail.html?eventWorkItemId=" + eventWorkItemId+"&loginUser="+self.loginUser;
                        window.Purchase.purchaseView.router.loadPage(url);
                        window.EventChangeDetail.init();
                    }

                }
              else if(eventWorkItemId.substring(0,3) == 'EVE') {
                    var url = "content/page/eventWorkDetail.html?eventWorkItemId=" + eventWorkItemId + "&loginUser=" + self.loginUser;
                    window.Purchase.purchaseView.router.loadPage(url);
                    if (self.eventWorkItemPageInit != 1) {
                        //self.eventWorkItemPageInit = 1;
                        var url = "content/page/eventWorkDetail.html?eventWorkItemId=" + eventWorkItemId + "&loginUser=" + self.loginUser;
                        window.Purchase.purchaseView.router.loadPage(url);
                        window.EventWorkDetail.init();
                    }
                }
               else if (eventWorkItemId.substring(0,3) == 'PRO'){
                   var url = "content/page/eventProblemDetail.html?eventWorkItemId=" + eventWorkItemId+"&loginUser="+self.loginUser;
                    window.Purchase.purchaseView.router.loadPage(url);
                    if(self.eventWorkItemPageInit != 1){
                        //self.eventWorkItemPageInit = 1;
                        var url = "content/page/eventProblemDetail.html?eventWorkItemId=" + eventWorkItemId+"&loginUser="+self.loginUser;
                        window.Purchase.purchaseView.router.loadPage(url);
                        window.EventProblemDetail.init();
                      }
                }
               // else if (eventWorkItemId.substring(0,8) == 'BATCHMOD'){
                   // var url = "content/page/eventChangeBatchDetail.html?eventWorkItemId=" + eventWorkItemId+"&loginUser="+self.loginUser;
                   // window.Purchase.purchaseView.router.loadPage(url);
                   // if(self.eventWorkItemPageInit != 1){
                        //self.eventWorkItemPageInit = 1;
                       // var url = "content/page/eventChangeBatchDetail.html?eventWorkItemId=" + eventWorkItemId+"&loginUser="+self.loginUser;
                        //window.Purchase.purchaseView.router.loadPage(url);
                       // window.EventChangeBatchDetail.init();
                    //}
                //}
            });
            $(document).on('click', '#bxdlcdb', function () {
                var bxdCode = $(this).attr("id").split("_")[1];
                var loginUser = $(this).attr("id").split("_")[2];
                var bxdCodeInfo = {};
                bxdCodeInfo.bxdCode = bxdCode;
                bxdCodeInfo.loginUser = loginUser;
                var reimburseId = JSON.stringify(bxdCodeInfo);
                log("reimburseId:"+reimburseId);
                var self = window.Purchase;
                if (self.reimbursePageInit === 1) {
                    var url = "content/page/reimBurse/reimBurseDetail.html?reimburseId=" + bxdCode+"&loginUser="+self.loginUser;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.reimbursePageInit = 1;
                    var url = "content/page/reimBurse/reimBurseDetail.html?reimburseId=" + bxdCode+"&loginUser="+self.loginUser;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.ReimBurseDetail.init();
                }
            });
            $(document).on('click','.supervisionClass,.superAppliedClass',function () {
                var dcdbCode = $(this).attr("id").split("_")[1];
                var dcdbCodeInfo = {};
                dcdbCodeInfo.dcdbCode = dcdbCode;
                var supervisionId = JSON.stringify(dcdbCodeInfo);
                var self = window.Purchase;
                if (self.suggestionPageInit === 1) {
                    var url = "content/page/superviseDetail.html?supervisionId=" + supervisionId;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.suggestionPageInit = 1;
                    var url = "content/page/superviseDetail.html?supervisionId=" + supervisionId;
                    window.Purchase.purchaseView.router.loadPage(url);

                    window.SuperviseDetail.init();
                }
            });
            $(document).on('click','.suggestionClass,.suggestAppliedClass',function () {
                var hlhjyCode = $(this).attr("id").split("_")[1];
                var hlhjyCodeInfo = {};
                hlhjyCodeInfo.hlhjyCode = hlhjyCode;
                var suggestionId = JSON.stringify(hlhjyCodeInfo);
                var self = window.Purchase;
                if (self.supervisePageInit === 1) {
                    var url = "content/page/suggestionDetail.html?suggestionId=" + suggestionId;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.supervisePageInit = 1;
                    var url = "content/page/suggestionDetail.html?suggestionId=" + suggestionId;
                    window.Purchase.purchaseView.router.loadPage(url);

                    window.SuggestionDetail.init();
                }
            });
            $(document).on('click','.creditClass,creditAppliedClass',function () {
                var xdspId = $(this).attr("id").split("_")[1];
                var xdspType = $(this).attr("id").split("_")[2];
                var xdspIdInfo = {};
                var xdspTypeInfo = {};
                xdspIdInfo.xdspId = xdspId;
                xdspTypeInfo.xdspType = xdspType;
                var creditId = JSON.stringify(xdspIdInfo);
                var creditType = JSON.stringify(xdspTypeInfo);

                var self = window.Purchase;
                if(self.creditPageInit === 1) {
                    var url = "content/page/creditDetail.html?creditId=" + creditId+"&creditType="+creditType;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.creditPageInit = 1;
                    var url = "content/page/creditDetail.html?creditId=" + creditId+"&creditType="+creditType;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.CreditDetail.init();
                }
            });

            $(document).on('click','.lccpClass,.lccpAppliedClass',function () {
                var code = $(this).attr("id").split("_")[1];
                // var codexx = $(this).attr("id").split("_")[2];
                var lccpIdInfo = {};
                lccpIdInfo.code = code;
                var lccpCode = JSON.stringify(lccpIdInfo);

                var self = window.Purchase;
                if(self.lccpPageInit === 1) {
                    var url = "content/page/lccpDetail.html?lccpCode=" + lccpCode;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.lccpPageInit = 1;
                    var url = "content/page/lccpDetail.html?lccpCode=" + lccpCode;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.LccpDetail.init();
                }
            });

            $(document).on('click','.meetApprovalPendingClass,.meetHaveApplied',function () {
                var id = $(this).attr("id").split("_")[1];
                var meetIdInfo = {};
                meetIdInfo.id = id;
                var meetIdInfoString = JSON.stringify(meetIdInfo);

                var self = window.Purchase;
                if(self.hbhMeetDtailListPageInit === 1) {
                    var url = "content/page/bankMeetDetail.html?meetIdInfoString=" + meetIdInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.hbhMeetDtailListPageInit = 1;
                    var url = "content/page/bankMeetDetail.html?meetIdInfoString=" + meetIdInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.BankMeetDetail.init();
                }
            });

            $(document).on('click','.dbhMeetCheckingClass,.dbhMeetHaveApplied',function () {
                var id = $(this).attr("id").split("_")[1];
                var status = $(this).attr("id").split("_")[2];
                var appliedFlag = $(this).attr("id").split("_")[3];
                var meetInfo = {};
                meetInfo.id = id;
                meetInfo.status = status;
                meetInfo.appliedFlag = appliedFlag;
                var meetInfoString = JSON.stringify(meetInfo);

                var self = window.Purchase;
                if(self.dbhMeetDtailListPageInit === 1) {
                    var url = "content/page/directorMeetDetail.html?meetInfoString=" + meetInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.dbhMeetDtailListPageInit = 1;
                    var url = "content/page/directorMeetDetail.html?meetInfoString=" + meetInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.DirectorMeetDetail.init();
                }
            });

            $(document).on('click','.sealCheckingClass,.sealHaveApplied',function () {
                var code= $(this).attr("id").split("_")[1];
                var yyspInfo = {};
                yyspInfo.code = code;
                var yyspInfoString = JSON.stringify(yyspInfo);

                var self = window.Purchase;
                if(self.sealDtailListPageInit === 1) {
                    var url = "content/page/sealDetail.html?yyspInfoString=" + yyspInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.sealDtailListPageInit = 1;
                    var url = "content/page/sealDetail.html?yyspInfoString=" + yyspInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.SealDetail.init();
                }
            });

            /*$(document).off('click',"#officeProcessBank").on('click',"#officeProcessBank",function () {
                /!*var url = "content/page/processBankDetail.html";
                window.Purchase.purchaseView.router.loadPage(url);*!/
                var base = Common.getUrlBase();
                var processBankUrl;
                AppOp.getAppData(window.Constants.processUrl,function (fuc) {
                    processBankUrl = fuc.flowSessionID;log("qqqq"+JSON.stringify(fuc,null,4))
                });
                var url = "content/page/processBankDetail.html";
                window.Purchase.purchaseView.router.loadPage(url);
            });*/

            $(document).on('click','.litigationClass,.litigationHaveApplied',function () {
                var bankCode = $(this).attr("id").split("_")[1];
                var processInstID = $(this).attr("id").split("_")[2];
                var workItemID = $(this).attr("id").split("_")[3];
                var flssTsqkId = $(this).attr("id").split("_")[4];
                var flssSqspId = $(this).attr("id").split("_")[5];
                var type= $(this).attr("id").split("_")[6];
                var ssspInfo = {};
                //判断诉讼情况是普通还是特殊
                if(type === "1"){
                    ssspInfo.id = flssSqspId;
                }else if(type === "2"){
                    ssspInfo.id = flssTsqkId;
                }
                ssspInfo.bankCode = bankCode;
                ssspInfo.type = type;
                ssspInfo.processInstID = processInstID;
                ssspInfo.workItemID = workItemID;
                var ssspInfoString = JSON.stringify(ssspInfo);

                var self = window.Purchase;
                if(self.litigationListPageInit === 1) {
                    var url = "content/page/litigationDetail.html?ssspInfoString=" + ssspInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.litigationListPageInit = 1;
                    var url = "content/page/litigationDetail.html?ssspInfoString=" + ssspInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.LitigationDetail.init();
                }
            });

            //存款利率
            $(document).on('click','.interestRateClass,.interestRateAppliedClass',function () {
                var ckllCode = $(this).attr("id").split("_")[1];
                var ckllInfo = {};
                ckllInfo.ckllCode = ckllCode;
                var ckllInfoString = JSON.stringify(ckllInfo);
                var self = window.Purchase;
                if(self.interestRatePageInit === 1) {
                    var url = "content/page/interestRateDetail.html?ckllInfoString=" + ckllInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.interestRatePageInit = 1;
                    var url = "content/page/interestRateDetail.html?ckllInfoString=" + ckllInfoString;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.InterestRateDetail.init();
                }
            });

            $(document).on('click','.depositRateClass,.depositRateAppliedClass',function () {
                // $(this).attr("id")
                // "detail_57939297_LARE"
                var dklldjspAplyNo = $(this).attr("id").split("_")[1];
                var dklldjspAplyTp = $(this).attr("id").split("_")[2];
                var dklldjspIdInfo = {};
                var dklldjspTypeInfo = {};
                dklldjspTypeInfo.AplyTp = dklldjspAplyTp;
                dklldjspIdInfo.AplyNo = dklldjspAplyNo;
                var depositRateAplyNo = JSON.stringify(dklldjspIdInfo);
                var depositRateAplyTp = JSON.stringify(dklldjspTypeInfo);

                var self = window.Purchase;
                if(self.depositRatePageInit === 1) {
                    var url = "content/page/depositRateDetail.html?depositRateAplyNo=" + depositRateAplyNo+"&depositRateAplyTp="+depositRateAplyTp;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.depositRatePageInit = 1;
                    var url = "content/page/depositRateDetail.html?depositRateAplyNo=" + depositRateAplyNo+"&depositRateAplyTp="+depositRateAplyTp;
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.DepositRateDetail.init();
                }
            });
            $(document).on('click','.bigDepositClass,.bigDepositAppliedClass',function () {
                // $(this).attr("id")
                // "detail_57939297_LARE"
                var dklldjspAplyNo = $(this).attr("id").split("_")[1];
                var dklldjspAplyTp = $(this).attr("id").split("_")[2];
                var dklldjspIdInfo = {};
                var dklldjspTypeInfo = {};
                dklldjspIdInfo.AplyNo = dklldjspAplyNo;

                var depositRateAplyNo = JSON.stringify(dklldjspIdInfo);



                var self = window.Purchase;
                if(self.bigdepositPageInit === 1) {
                    var url = "content/page/bigdepositDetail.html?bigdepositAplyNo=" + depositRateAplyNo+"";
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.bigdepositPageInit = 1;
                    var url = "content/page/bigdepositDetail.html?bigdepositAplyNo=" + depositRateAplyNo+"";
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.BigDepositDetail.init();
                }
            });

            $(document).on('click','.spRateInfoQueryClass,.spRateInfoQueryAppliedClass',function () {
                // $(this).attr("id")
                // "detail_57939297_LARE"
                var aplyno = $(this).attr("id").split("_")[1];

                var spRatexxcxInfo = {};
                spRatexxcxInfo.aplyno = aplyno;
                var spRateInfoQueryDataInfo = JSON.stringify(spRatexxcxInfo);

                var self = window.Purchase;
                if(self.spRateInfoQueryPageInit === 1) {
                    //页面传输数据暂定
                    var url = "content/page/spRateInfoQueryDetail.html?spRateInfoQueryDataInfo=" + spRateInfoQueryDataInfo;
                    // var url = "content/page/spRateInfoQueryDetail.html";
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                }else{
                    self.spRateInfoQueryPageInit = 1;
                    //页面传输数据暂定
                    var url = "content/page/spRateInfoQueryDetail.html?spRateInfoQueryDataInfo=" + spRateInfoQueryDataInfo;
                    // var url = "content/page/spRateInfoQueryDetail.html";
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.SpRateInfoQueryDetail.init();
                }
            });

            $(document).on('click','.salaryApproveClass,.salaryApprovedClass',function () {
                var gzspProcessId = $(this).attr("id").split("_")[1];
                var gzspId = $(this).attr("id").split("_")[2];
                var gzspMonth = $(this).attr("id").split("_")[3];
                var gzspFlag = $(this).attr("id").split("_")[4];
                var gzspIdInfo = {};
                var gzspProcessIdInfo = {};
                var gzspdMonthInfo = {};
                var gzspFlagInfo = {};
                log("gzspMonth="+gzspMonth)
                gzspIdInfo.gzspId = gzspId;
                gzspProcessIdInfo.gzspProcessId = gzspProcessId;
                gzspdMonthInfo.gzspMonth = gzspMonth;
                gzspFlagInfo.gzspFlag = gzspFlag;
                var salaryApproveId = JSON.stringify(gzspIdInfo);
                var salaryApproveProcessId = JSON.stringify(gzspProcessIdInfo);
                var salaryApproveMonth = JSON.stringify(gzspdMonthInfo);
                var salaryApproveFlag = JSON.stringify(gzspFlagInfo);
                var self = window.Purchase;
                if (self.salaryApprovePageInit === 1) {
                    var url = "content/page/salaryApproveDetail.html?salaryApproveId=" + salaryApproveId+"&salaryApproveProcessId="
                        +salaryApproveProcessId+"&salaryApproveMonth="+salaryApproveMonth+"&salaryApproveFlag="+salaryApproveFlag;
                    window.Purchase.purchaseView.router.loadPage(url);
                    return;
                } else {
                    self.salaryApprovePageInit = 1;
                    var url = "content/page/salaryApproveDetail.html?salaryApproveId=" + salaryApproveId+"&salaryApproveProcessId="
                        +salaryApproveProcessId+"&salaryApproveMonth="+salaryApproveMonth+"&salaryApproveFlag="+salaryApproveFlag;
                    window.Purchase.purchaseView.router.loadPage(url);

                    window.SalaryApproveDetail.init();
                }
            });

            //获得更多流程数据
            $(document).on('click','.getMoreInfoClass',function () {
                var self = window.Purchase;
                var url = "content/page/dealWorkList.html?flowType="+this.id;
                if(self.dealWorkPageLC){
                    self.dealWorkPageLC = false
                    window.Purchase.purchaseView.router.loadPage(url);
                    window.DealWorkList.init();
                }else{

                    window.Purchase.purchaseView.router.loadPage(url);
                }

            });
            $(document).on('click','#sjdetail',function () {
                var url = "content/page/inspectDetail.html" ;
                window.Purchase.purchaseView.router.loadPage(url);
            });
            $(document).on('click', '.approvalPendingPopover,.haveAppliedPopover', function () {
                var clickedLink = this;
                var purchaseInfo = $(this).val();
                if (purchaseInfo !== undefined && purchaseInfo !== "") {
                    $("#showHideInfo").text(purchaseInfo);
                    myApp.popover('.popover-purchase', clickedLink);
                }
            });
            Common.addCommonEvent("purchase", "onActive", function () {
                if(isIos){
                    AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                    AppOp.setAppBackgroundColor(Constants.StatusBarColor.iosToDoWhite);
                }
            });
            /*$(document).on('click','.supervisionPopover,.superAppliedPopover',function () {
                var clickedLink = this;
                var superveInfo = $(this).val();
                if(superveInfo !==undefined && superveInfo !== ""){
                    $("#showHddInfo").text(superveInfo);
                    myApp.popover('.popover-purchase',clickedLink);
                }
            });*/
        },
        pageOnShow: function () {
            // window.Purchase.onShowApprovalPending();
            var self = this;

            $("#approvalPending").on('show', function () {
                self.pageIndex = 1;
                self.onShowApprovalPending();
                self.onShowSupervision();
                self.onShowSuggestion();
                self.onShowCredit();
                self.onShowEventWorkItem();
                self.onShowReimburse();
                self.onShowdepositRate();
                self.onShowbigDeposit();
                self.onShowLccp();
                self.onShowSalaryApprove();
                // self.onshowTravelEcpensesApproval();
                //self.onShowHbhMeeting();
                //self.onShowDbhMeeting();
                self.onShowSeal();
                self.onShowApprovalContract();//合同审批
                //self.onShowProcessBank();
                self.spRateInfoQuery();
                self.onShowLitigation();
                self.onShowInterestRate();
                self.onShowTravelEcpenses();

            });
            $("#haveApplied").on('show', function () {
                self.pageIndex = 2;
                self.onShowHaveApplied();
                self.onShowSuperApplied();
                self.onShowSuggestApplied();
                self.onShowdepositRateApplied();
                self.onShowdBigDepositApplied();
                self.onShowLccpApplied();
                self.onShowSalaryApproved();
                //self.onShowHbhMeeting();
                //self.onShowDbhMeetingApplied();
                self.onShowSealApplied();
                self.onShowReimburseApplied();
                self.onShowApprovalContractApplied();//合同审批
                //self.onShowCreditApplied();
                self.spRateInfoQueryApplied();
                self.onShowLitigationApplied();
                self.onShowEventWorkApplied();
                self.onShowInterestRateApplied();

            });
            $(".pull-to-refresh-content").on('refresh', function (e) {
                setTimeout(function () {
                    if (self.pageIndex === 1) {
                        self.onShowApprovalPending();
                        self.onShowSupervision();
                        self.onShowEventWorkItem();
                        self.onShowReimburse();
                        self.onShowSuggestion();
                        self.onShowCredit();
                        self.onShowdepositRate();
                        self.onShowbigDeposit();
                        self.onShowLccp();
                        self.onShowSalaryApprove();
                        //self.onShowHbhMeeting();
                        //self.onShowDbhMeeting();
                        self.onShowSeal();
                        self.onShowApprovalContract();//合同审批
                        //self.onShowProcessBank();
                        self.spRateInfoQuery();
                        self.onShowLitigation();
                        self.onShowInterestRate();
                    }
                    if (self.pageIndex === 2) {
                        self.onShowHaveApplied();
                        self.onShowSuperApplied();
                        self.onShowSuggestApplied();
                        self.onShowdepositRateApplied();
                        self.onShowdBigDepositApplied();
                        self.onShowLccpApplied();
                        self.onShowSalaryApproved();
                        //self.onShowHbhMeeting();
                        //self.onShowDbhMeetingApplied();
                        self.onShowApprovalContractApplied();//合同审批
                        self.onShowSealApplied();
                        //self.onShowCreditApplied();
                        self.spRateInfoQueryApplied();
                        self.onShowLitigationApplied();
                        self.onShowEventWorkApplied();
                        self.onShowReimburseApplied();
                        self.onShowInterestRateApplied();
                    }
                    myApp.pullToRefreshDone();
                }, 2000);
            })
        },
        onShowApprovalPending: function () {
            var jsonData = {};
          /*  NetManager.httpReq("schedule/appPurchase/getCgUndoneInfo", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("采购待审批: " + JSON.stringify(data, null, 4));
                // var data = ""
                // if(window.Purchase.test === 0){
                //     data = {"data":[{"applybank":"070667999","applybankName":"总行","applystatus":"sqbmLeader","applytime":"2018-01-18T09:18:35","applyuser":"admin","applyuserName":"admin","approveStatusName":"申请部门领导审批中","bmfghzleader":"","bmfghzleaderresult":"","bmfghzleaderstatus":"","bmfghzleadertime":null,"cghleader":"","cghleaderresult":"","cghleaderstatus":"","cghleadertime":null,"cgtype":"1","cgtypedetail":"","cgtyperemarks":"","code":"cg20180118091835","column1":"4","column2":null,"column3":null,"column4":null,"column5":null,"column6":null,"cwbmleader":"","cwbmleaderresult":"","cwbmleaderstatus":"","cwbmleadertime":null,"cwfghzleader":"","cwfghzleaderresult":null,"cwfghzleaderstatus":null,"cwfghzleadertime":null,"dshleader":"","dshleaderresult":"","dshleaderstatus":"","dshleadertime":null,"dwhleader":"","dwhleaderresult":"","dwhleaderstatus":"","dwhleadertime":null,"glbmleader":"","glbmleaderresult":"","glbmleaderstatus":"","glbmleadertime":null,"gys1":"","gys2":null,"gys3":null,"gys4":null,"gys5":null,"gysxzfx":"","hbhleader":"","hbhleaderresult":"","hbhleaderstatus":"","hbhleadertime":null,"hxgyssm":"","id":172,"name":"1","processid":"5011","purpose":null,"reason":"3","remarks":"","sqbmleader":"","sqbmleaderresult":"","sqbmleaderstatus":"","sqbmleadertime":null,"totalnum":1,"totalprice":100,"wpglbank":"0706678KJ","wpglbankName":"科技信息部","ysTypeName":"预算内","yscode":"2","ystype":"0"}],"total":1,"message":"1"};
                // }
                // if(window.Purchase.test === 1){
                //     data = {"data":[{"applybank":"070667999","applybankName":"总行","applystatus":"sqbmLeader","applytime":"2018-01-18T09:18:35","applyuser":"admin","applyuserName":"admin","approveStatusName":"申请部门领导审批中","bmfghzleader":"","bmfghzleaderresult":"","bmfghzleaderstatus":"","bmfghzleadertime":null,"cghleader":"","cghleaderresult":"","cghleaderstatus":"","cghleadertime":null,"cgtype":"1","cgtypedetail":"","cgtyperemarks":"","code":"cg20180118091835","column1":"4","column2":null,"column3":null,"column4":null,"column5":null,"column6":null,"cwbmleader":"","cwbmleaderresult":"","cwbmleaderstatus":"","cwbmleadertime":null,"cwfghzleader":"","cwfghzleaderresult":null,"cwfghzleaderstatus":null,"cwfghzleadertime":null,"dshleader":"","dshleaderresult":"","dshleaderstatus":"","dshleadertime":null,"dwhleader":"","dwhleaderresult":"","dwhleaderstatus":"","dwhleadertime":null,"glbmleader":"","glbmleaderresult":"","glbmleaderstatus":"","glbmleadertime":null,"gys1":"","gys2":null,"gys3":null,"gys4":null,"gys5":null,"gysxzfx":"","hbhleader":"","hbhleaderresult":"","hbhleaderstatus":"","hbhleadertime":null,"hxgyssm":"","id":172,"name":"1","processid":"5011","purpose":null,"reason":"3","remarks":"","sqbmleader":"","sqbmleaderresult":"","sqbmleaderstatus":"","sqbmleadertime":null,"totalnum":1,"totalprice":100,"wpglbank":"0706678KJ","wpglbankName":"科技信息部","ysTypeName":"预算内","yscode":"2","ystype":"0"},{"applybank":"070667999","applybankName":"七都","applystatus":"sqbmLeader","applytime":"2018-02-18T09:18:35","applyuser":"admin","applyuserName":"admin","approveStatusName":"财务部门领导审批中","bmfghzleader":"","bmfghzleaderresult":"","bmfghzleaderstatus":"","bmfghzleadertime":null,"cghleader":"","cghleaderresult":"","cghleaderstatus":"","cghleadertime":null,"cgtype":"1","cgtypedetail":"","cgtyperemarks":"","code":"cg20180218091835","column1":"4","column2":null,"column3":null,"column4":null,"column5":null,"column6":null,"cwbmleader":"","cwbmleaderresult":"","cwbmleaderstatus":"","cwbmleadertime":null,"cwfghzleader":"","cwfghzleaderresult":null,"cwfghzleaderstatus":null,"cwfghzleadertime":null,"dshleader":"","dshleaderresult":"","dshleaderstatus":"","dshleadertime":null,"dwhleader":"","dwhleaderresult":"","dwhleaderstatus":"","dwhleadertime":null,"glbmleader":"","glbmleaderresult":"","glbmleaderstatus":"","glbmleadertime":null,"gys1":"","gys2":null,"gys3":null,"gys4":null,"gys5":null,"gysxzfx":"","hbhleader":"","hbhleaderresult":"","hbhleaderstatus":"","hbhleadertime":null,"hxgyssm":"","id":173,"name":"1","processid":"5011","purpose":null,"reason":"3","remarks":"","sqbmleader":"","sqbmleaderresult":"","sqbmleaderstatus":"","sqbmleadertime":null,"totalnum":1,"totalprice":100,"wpglbank":"0706678KJ","wpglbankName":"科技信息部","ysTypeName":"预算外","yscode":"2","ystype":"0"}],"total":1,"message":"1"};
                // }
                window.Purchase.approvalPending = data;

                var self = window.Purchase;
                self.loadApprovalPendingHtml();
                self.loadApprovalPendingData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
*/
        },

        onShowSupervision: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appDcdb/getDcdbUndoneInfo", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("督办待审批 " + JSON.stringify(data, null, 4));
                window.Purchase.supervision = data;
                var self = window.Purchase;
                self.loadSupervisionHtml();
                self.loadSupervisionData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
        },

        onShowSalaryApprove: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appGzsp/getGzspUndoneInfo", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("工资待审批 " + JSON.stringify(data, null, 4));
                window.Purchase.salaryApprove = data;
                var self = window.Purchase;
                self.loadSalaryApproveHtml();
                self.loadSalaryApproveData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
        },


        onshowTravelEcpensesApproval: function () {
            var self = window.Purchase;
        var jsonData = {};
        AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
            window.Purchase.loginUser = fuc;
        });
        var dtatNum=0;
        NetManager.httpReq("schedule/appSjsp/getEventWorkItems", jsonData, function (data) {
            if (data === undefined) {
                return
            }
            log("出差申请待审批: " + JSON.stringify(data, null, 4));
            dtatNum+=data.length;
            var self = window.Purchase;
            if (self.androidBackFlag === 0) {
                setTimeout(function () {
                    AppOp.hideLoading();
                }, 1);
                self.androidBackFlag = 1;
            }
        }, function () {

        });
            NetManager.httpReq("schedule/appSjsp/getEventWorkItems", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("差旅报销待审批: " + JSON.stringify(data, null, 4));
                dtatNum+=data.length;
                var self = window.Purchase;
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });

            //添加数量显示
            if(self.isNull(dtatNum)===false) {
                var clbxNum = "差旅报销" + "(" + dtatNum + ")";
            }else{
                var clbxNum = "差旅报销(0)";
            }
            $("#clbxNum").empty();
            $("#clbxNum").append(clbxNum);



    },
        onShowEventWorkItem: function () {
            var jsonData = {};
            AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
             window.Purchase.loginUser = fuc;
            });
            NetManager.httpReq("schedule/appSjsp/getEventWorkItems", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("事件待审批123: " + JSON.stringify(data, null, 4));
                window.Purchase.eventWorkItem = data;
                var self = window.Purchase;
                self.loadEventWorkItemHtml();
                self.loadEventWorkItemData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
        },
        onShowReimburse: function () {
            var jsonData = {};
            AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
                window.Purchase.loginUser = fuc;
            });
            NetManager.httpReq("schedule/appBxdsp/getUndoBxdList", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("报销单待审批123: " + JSON.stringify(data, null, 4));
                window.Purchase.reimburse = data;
                var self = window.Purchase;
                self.loadReimburseHtml();
                self.loadReimburseData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
        },

        onShowSuggestion: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appSuggest/getSuggestUnDoneInfoByDah",jsonData,function (data) {
                if (data === undefined){
                    return
                }
                log("合理化建议待审批 " + JSON.stringify(data, null, 4));
                window.Purchase.suggestion = data;
                var self = window.Purchase;
                self.loadSuggestionHtml();
                self.loadSuggestionData();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowCredit: function () {
            var jsonData = {};
            //var jData = {};
            var reqId=Constants.reqID.xdspgetUndealTask;
            NetManager.httpReq(reqId,jsonData,function (data)  {
            //NetManager.httpReq("schedule/appXdsp/getUndealTask",jsonData,function (data) {
                if (data === undefined){
                    return
                }
                /*log("信贷审批待审批22222222222222 " + data);*/
                var jData = JSON.parse(data);

                 log("信贷审批待审批" + JSON.stringify(jData, null, 4));

                window.Purchase.credit = jData;
                var self = window.Purchase;
                self.loadCreditHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowdepositRate: function () {
            var jsonData = {};
            var SpRateInfoQueryData = {};
            SpRateInfoQueryData.BsnInd = "1";
            jsonData.params = SpRateInfoQueryData;
            NetManager.httpReq("schedule/appDkdj/getUndealTask",jsonData,function (dataInfo) {
                if (dataInfo === undefined || dataInfo === "" ){
                    return
                }
                var x2js = new X2JS();
                var data = JSON.stringify(x2js.xml_str2json(dataInfo))
                var jData = JSON.parse(data);
                log("对客定价11111111111 " + JSON.stringify(jData, null, 4));
                // window.Purchase.depositRate = jData;
                if(jData.service ===undefined ||jData.service.Body===undefined ||jData.service.Body.PrprAprvInfArray===undefined ){
                    return ;
                }
                window.Purchase.depositRate = jData.service.Body.PrprAprvInfArray;
                var self = window.Purchase;
                self.loadDepositRateHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },
        onShowbigDeposit: function () {
            var jsonData = {};

            var jsonDataInfo={};
            jsonDataInfo.BsnInd="3";
            jsonData.params = jsonDataInfo;

            NetManager.httpReq("schedule/appDkdj/getUndealTask",jsonData,function (dataInfo) {
                if (dataInfo === undefined){
                    return
                }
                var x2js = new X2JS();
                var data = JSON.stringify(x2js.xml_str2json(dataInfo))
                var jData = JSON.parse(data);
                log("大额存款 " + JSON.stringify(jData, null, 4));
                // window.Purchase.bigDeposit = jData;
                if(jData.service ===undefined ||jData.service.Body===undefined ||jData.service.Body.PrprAprvInfArray===undefined ){
                    return ;
                }
                window.Purchase.bigDeposit = jData.service.Body.PrprAprvInfArray;
                var self = window.Purchase;
                self.loadBigDepositHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },
        //审批利率信息查询
            spRateInfoQuery: function () {

            var jsonData = {};
            var SpRateInfoQueryData = {};
            SpRateInfoQueryData.BsnInd = "4";
            jsonData.params = SpRateInfoQueryData;
            NetManager.httpReq("schedule/appDkdj/getUndealTask",jsonData,function (dataInfo) {
                if (dataInfo === undefined || dataInfo === "" ){
                    return
                }

                var x2js = new X2JS();
                var data = JSON.stringify(x2js.xml_str2json(dataInfo))
                var jData = JSON.parse(data);
                if(jData.service ===undefined ||jData.service.Body===undefined ||jData.service.Body.PrprAprvInfArray===undefined ){
                    return ;
                }
                window.Purchase.spRateInfoQueryInfo = jData.service.Body.PrprAprvInfArray;
                //暂定数据 传输类型为json
                var self = window.Purchase;
                self.loadSpRatexxcxHtml();

                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowLccp: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appLc/getLcUnDoneInfoByDah",jsonData,function (data) {
                // 0：响应成功
                // 1：服务器异常
                // 2：客户端数据错误，code为空
                if (data.message === "1"){
                    myApp.alert("服务器异常")
                    return;
                } else if(data.message === "2"){
                    myApp.alert("客户端数据错误")
                    return;
                }

                // log("信贷审批待审批11111111111 " + JSON.stringify(jData, null, 4));
                window.Purchase.lccp = data.data;
                var self = window.Purchase;
                self.loadLccpHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowHbhMeeting: function () {
            var jsonData = {};
            NetManager.httpReq("meetings/hbh/getHbhMeetingsByCode",jsonData,function (data) {
                if (data === undefined) {
                    return
                }

                log("行办会议列表：" + JSON.stringify(data, null, 4));
                var jData = JSON.parse(data);
                window.Purchase.hbhMeetData = jData;
                var self = window.Purchase;
                self.loadHbhMeetHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowDbhMeeting: function () {
            var jsonData = {};
            NetManager.httpReq("meetings/dbh/getUndoDbhMeetingsByCode",jsonData,function (data) {
                if (data === undefined) {
                    return
                }

                log("董办会待办会议列表：" + JSON.stringify(data, null, 4));
                var jData = JSON.parse(data);
                window.Purchase.dbhMeetData = jData;
                var self = window.Purchase;
                self.loadDbhMeetHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowSeal: function () {
            var jsonData = {};
            jsonData.limit = 0;
            NetManager.httpReq("schedule/appSeal/acquireSCUndoneProcessList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }

                log("用印审批待处理列表：" + JSON.stringify(data, null, 4));
                // var jData = JSON.parse(data);
                window.Purchase.sealData = data;
                var self = window.Purchase;
                self.loadSealHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },


        onShowApprovalContract: function () {
            var jsonData = {};
            AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
                window.Purchase.loginUser = fuc;
            });
            NetManager.httpReq("schedule/approvalContract/getUndoContractApplyList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }
                log("合同审批待处理列表：" + JSON.stringify(data, null, 4));
                // var jData = JSON.parse(data);
                window.Purchase.approvalContractData = data;
                var self = window.Purchase;
                self.loadApprovalContractHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {
            });
        },

        onShowApprovalContractApplied: function () {
            var jsonData = {};
            AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
                window.Purchase.loginUser = fuc;
            });
            NetManager.httpReq("schedule/approvalContract/searchContractApplyList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }
                log("合同审批已处理列表：" + JSON.stringify(data, null, 4));
                // var jData = JSON.parse(data);
                window.Purchase.approvalContractAppliedData = data;
                var self = window.Purchase;
                self.loadApprovalContractAppliedHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {
            });
            },

        //诉讼审批待办
        onShowLitigation: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appLitigation/getLitigationList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }
                log("诉讼审批待处理列表：" + JSON.stringify(data, null, 4));
                window.Purchase.litigation = data;
                var self = window.Purchase;
                self.loadLitigationHtml();
                //self.loadSuggestionData();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },
        //存款利率待办
        onShowInterestRate: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appInterestRate/getCkllUndoApplyList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }
                log("存款利率审批待处理列表：" + JSON.stringify(data, null, 4));
                window.Purchase.interestRate = data;
                var self = window.Purchase;
                self.loadInterestRateHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },
        //流程银行待办
        /*onShowProcessBank: function () {
            var jsonData = {};
            AppOp.getAppData("flowSessionID",function (fuc) {
                jsonData.JSESSIONID = fuc;
            });
            window.NetManager.requestServerInfo("http://222.92.218.141:18080/hoyi/ysaf.wf.wkitem.cptWorkitem.queryWorkitems4Todo.biz.ext",jsonData,function (cb) {
                if (cb === undefined) {
                    return
                }
                log("流程银行办公室列表：" + JSON.stringify(cb, null, 4));
                window.Purchase.processBank = cb;
                var self = window.Purchase;
                self.loadProcessBankHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            });
        },*/

        onShowSealApplied: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appSeal/acquireSCHistoricalProcessList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }

                log("用印审批已处理列表：" + JSON.stringify(data, null, 4));
                // var jData = JSON.parse(data);
                window.Purchase.sealAppliedData = data;
                var self = window.Purchase;
                self.loadSealAppliedHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        //法律诉讼审批
        onShowLitigationApplied:function(){
            var jsonData = {};
            NetManager.httpReq("schedule/appLitigation/getFlssEnd",jsonData,function (data) {
                if (data === undefined) {
                    return
                }

                log("诉讼审批已处理列表：" + JSON.stringify(data, null, 4));
                window.Purchase.litigationApplied = data;
                var self = window.Purchase;
                self.loadLitigationAppliedHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowDbhMeetingApplied: function () {
            var jsonData = {};
            NetManager.httpReq("meetings/dbh/getDoneDbhMeetingsByCode",jsonData,function (data) {
                if (data === undefined) {
                    return
                }

                log("董办会已办会议列表：" + JSON.stringify(data, null, 4));
                var jData = JSON.parse(data);
                window.Purchase.dbhMeetAppliedData = jData;
                var self = window.Purchase;
                self.loadDbhMeetAppliedHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowHaveApplied: function () {
            var jsonData = {};
            var cgInfoSearchInfo = {};
            jsonData.cgInfoSearch = cgInfoSearchInfo;
            NetManager.httpReq("schedule/appPurchase/getCgInfoByCgInfpoSearch", jsonData, function (data) {
                //var data = {"cgInfo":[{"applybankName":"总行","applytime":"2018-01-18T09:18:35","applyuserName":"admin","approveStatusName":"申请部门领导审批中","code":"cg20180118091835","name":"1","ysTypeName":"预算内","yscode":"2","id":"172"}],"message":"0"};
                if (data === undefined) {
                    return
                }
                log("采购已申请: " + JSON.stringify(data, null, 4));
                window.Purchase.haveApplied = data;
                var self = window.Purchase;
                self.loadHaveAppliedHtml();
                self.loadHaveAppliedData();

            }, function () {

            });

        },

        onShowSuperApplied: function () {
            var jsonData = {};
            var cgInfoSearchInfo = {};
            jsonData.cgInfoSearch = cgInfoSearchInfo;
            NetManager.httpReq("schedule/appDcdb/getDcdbInfoByDcdbInfoSearch", jsonData, function (data) {
                //var data = {"cgInfo":[{"applybankName":"总行","applytime":"2018-01-18T09:18:35","applyuserName":"admin","approveStatusName":"申请部门领导审批中","code":"cg20180118091835","name":"1","ysTypeName":"预算内","yscode":"2","id":"172"}],"message":"0"};
                if (data === undefined) {
                    return
                }
                log("督办已申请: " + JSON.stringify(data, null, 4));
                window.Purchase.superApplied= data;
                var self = window.Purchase;
                self.loadSuperAppliedHtml();
                self.loadSuperAppliedData();

            }, function () {

            });
        },

        onShowSuggestApplied: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appSuggest/getSuggestDoneInfoByDah",jsonData,function (data) {
                if(data ===undefined){
                    return
                }
                log("合理化建议已申请: " + JSON.stringify(data, null, 4));
                window.Purchase.suggestApplied = data;
                var self = window.Purchase;
                self.loadSuggestAppliedHtml();
                self.loadSuggestAppliedData();
            },function () {

            });
        },
        onShowEventWorkApplied: function () {
            var jsonData = {};
            AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
                window.Purchase.loginUser = fuc;
            });
            NetManager.httpReq("schedule/appSjsp/getDoneEventWorkItems",jsonData,function (data) {
                if(data ===undefined){
                    return
                }
                log("事件流程已审批: " + JSON.stringify(data, null, 4));
                window.Purchase.eventWorkApplied = data;
                var self = window.Purchase;
                self.loadEventWorkAppliedHtml();
                self.loadEventWorkAppliedData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },
        onShowReimburseApplied: function () {
            var jsonData = {};
            AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
                window.Purchase.loginUser = fuc;
            });
            NetManager.httpReq("schedule/appBxdsp/getDoneBxdList", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("报销单已审批123: " + JSON.stringify(data, null, 4));
                window.Purchase.reimburseApplied = data;
                var self = window.Purchase;
                self.loadReimburseAppliedHtml();
                self.loadReimburseAppliedData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
        },
        onShowdepositRateApplied: function () {

            var jsonData = {};
            var SpRateInfoQueryData = {};
            SpRateInfoQueryData.BsnInd = "1";
            jsonData.params = SpRateInfoQueryData;
            NetManager.httpReq("schedule/appDkdj/getDonedealTask",jsonData,function (dataInfo) {
                if(dataInfo ===undefined){
                    return
                }
                var x2js = new X2JS();
                var data = JSON.stringify(x2js.xml_str2json(dataInfo))
                var jData = JSON.parse(data);
                log("对客定价11111111111 " + JSON.stringify(jData, null, 4));
                // window.Purchase.depositRate = jData;
                if(jData.service.Body == undefined){
                    return;
                }
                window.Purchase.depositRateAppliedData = jData.service.Body.AprvDealInfArray;
                var self = window.Purchase;
                self.loadDepositRateAppliedHtml();

                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }

            },function () {

            });
        },
        onShowdBigDepositApplied: function () {
            var jsonData = {};
            var SpRateInfoQueryData = {};
            SpRateInfoQueryData.BsnInd = "3";
            jsonData.params = SpRateInfoQueryData;
            NetManager.httpReq("schedule/appDkdj/getDonedealTask",jsonData,function (dataInfo) {
                if(dataInfo ===undefined){
                    return
                }
                var x2js = new X2JS();
                var data = JSON.stringify(x2js.xml_str2json(dataInfo))
                var jData = JSON.parse(data);
                log("对客定价11111111111 " + JSON.stringify(jData, null, 4));
                // window.Purchase.depositRate = jData;
                if(jData.service.Body == undefined){
                    return;
                }
                window.Purchase.depositRateAppliedData = jData.service.Body.AprvDealInfArray;
                var self = window.Purchase;
                self.loadBigDepositAppliedHtml();

                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }

            },function () {

            });
        },

        //审批利率信息查询已审阅
        spRateInfoQueryApplied: function () {

            var jsonData = {};
            var SpRateInfoQueryData = {};
            SpRateInfoQueryData.BsnInd = "4";
            jsonData.params = SpRateInfoQueryData;
            NetManager.httpReq("schedule/appDkdj/getDonedealTask",jsonData,function (dataInfo) {
                if (dataInfo === undefined || dataInfo === "" ){
                    return
                }

                var x2js = new X2JS();
                var data = JSON.stringify(x2js.xml_str2json(dataInfo))
                var jData = JSON.parse(data);
                if(jData.service ===undefined ||jData.service.Body===undefined ||jData.service.Body.AprvDealInfArray===undefined ){
                    return ;
                }
                window.Purchase.spRateInfoQueryInfo = jData.service.Body.AprvDealInfArray;
                //暂定数据 传输类型为json
                var self = window.Purchase;
                self.loadSpRatexxcxAppliedHtml();

                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },
        onShowLccpApplied: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appLc/getLcDoneInfoByDah",jsonData,function (dataInfo) {
                // 0：响应成功
                // 1：服务器异常
                // 2：客户端数据错误，code为空
                if (dataInfo.message === "1"){
                    myApp.alert("服务器异常")
                    return;
                } else if(dataInfo.message === "2"){
                    myApp.alert("客户端数据错误")
                    return;
                }
                window.Purchase.lccp = dataInfo.lcInfoVo;
                var self = window.Purchase;
                self.loadLccpAppliedHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        onShowSalaryApproved: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appGzsp/searchGzspInfo", jsonData, function (data) {
                if (data === undefined) {
                    return
                }
                log("工资已处理 " + JSON.stringify(data, null, 4));
                window.Purchase.salaryApprove = data;
                var self = window.Purchase;
                self.loadSalaryApprovedHtml();
                self.loadSalaryApprovedData();
                if (self.androidBackFlag === 0) {
                    setTimeout(function () {
                        AppOp.hideLoading();
                    }, 1);
                    self.androidBackFlag = 1;
                }
            }, function () {

            });
        },

        //存款利率已办
        onShowInterestRateApplied: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appInterestRate/getCkllApplyList",jsonData,function (data) {
                if (data === undefined) {
                    return
                }
                log("存款利率审批已处理列表：" + JSON.stringify(data, null, 4));
                window.Purchase.interestRate = data;
                var self = window.Purchase;
                self.loadInterestRateAppliedHtml();
                if(self.androidBackFlag === 0){
                    setTimeout(function () {
                        AppOp.hideLoading();
                    },1);
                    self.androidBackFlag = 1;
                }
            },function () {

            });
        },

        /*onShowCreditApplied: function () {
            var jsonData = {};
            NetManager.httpReq("schedule/appSuggest/getSuggestDoneInfoByDah",jsonData,function (data) {
                if(data ===undefined){
                    return
                }
                log("信贷审批已申请: " + JSON.stringify(data, null, 4));
                window.Purchase.creditApplied = data;
                var self = window.Purchase;
                self.loadCreditAppliedHtml();
                self.loadCreditAppliedData();
            },function () {

            });
        },*/

        loadApprovalPendingHtml: function () {
            //添加数量显示
            if(window.Purchase.approvalPending.hasOwnProperty("data")) {
                var cgdbdbNum = "采购审批" + "(" + window.Purchase.approvalPending.data.length + ")";
            }else{
                var cgdbdbNum = "采购审批(0)";
            }
            $("#cglcsl").empty();
            $("#cglcsl").append(cgdbdbNum);

            if (window.Purchase.approvalPending === "" || !window.Purchase.approvalPending.hasOwnProperty("data")) {
                $("#approvalPendingContent").empty();
                return;
            }
            var approvalPendingHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.approvalPending.data.length; i++) {
                pageCount++;
                var elementId = "";
                var approvalPendingOne = window.Purchase.approvalPending.data[i];
                if (approvalPendingOne.hasOwnProperty("id")) {
                    elementId = approvalPendingOne.id;
                } else {
                    elementId = i;
                }
                var approvalPendingHtml = ' <li class="card" style="margin: 5px 2px;" id="approvalPending_' + approvalPendingOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        采购编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        采购标题\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        预算类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        预算编号\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="purchaseNO_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="purchaseTitle_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="budgetType_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="budgetNO_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        审批状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请部门\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        申请人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请时间\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="approvedState_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applicationSector_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applicationPerson_' + approvalPendingOne.id + '"  class="resizable approvalPendingPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applicationTime_' + approvalPendingOne.id + '" class="resizable approvalPendingPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage1.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + approvalPendingOne.code + '_'+ approvalPendingOne.applyuser + '" class="button button-fill approvalPendingClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                approvalPendingHtmls += approvalPendingHtml;

            }
            $("#approvalPendingContent").empty();
            $("#approvalPendingContent").append(approvalPendingHtmls);
            // $("#approvalPendingContent").html(approvalPendingHtmls);
        },
        loadApprovalPendingData: function () {
            if (window.Purchase.approvalPending === "" || !window.Purchase.approvalPending.hasOwnProperty("data")) {
                $("#approvalPendingContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.approvalPending.data.length; i++) {
                var purchaseDetail = window.Purchase.approvalPending.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("id")) {
                    elementId = purchaseDetail.id;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("code")) {
                    $("#purchaseNO_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.code));
                }
                if (purchaseDetail.hasOwnProperty("name")) {
                    $("#purchaseTitle_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.name));
                }
                if (purchaseDetail.hasOwnProperty("ysTypeName")) {
                    $("#budgetType_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.ysTypeName));
                }
                if (purchaseDetail.hasOwnProperty("yscode")) {
                    $("#budgetNO_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.yscode));
                }
                if (purchaseDetail.hasOwnProperty("approveStatusName")) {
                    $("#approvedState_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.approveStatusName));
                }
                if (purchaseDetail.hasOwnProperty("applybankName")) {
                    $("#applicationSector_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.applybankName));
                }
                if (purchaseDetail.hasOwnProperty("applyuserName")) {
                    $("#applicationPerson_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.applyuserName));
                }

                if (purchaseDetail.hasOwnProperty("applytime")) {
                    $("#applicationTime_" + elementId).text(window.Purchase.dealSpecial(window.Purchase.dealSpecial(purchaseDetail.applytime).replace(/T/g, ' ').replace(/-/g, '')));
                }
            }
        },
        loadEventWorkItemHtml: function () {
            //添加数量显示
            if(window.Purchase.eventWorkItem.hasOwnProperty("data")) {
                var sjlcdbNum = "事件审批" + "(" + window.Purchase.eventWorkItem.data.length + ")";
            }else{
                var sjlcdbNum = "事件审批(0)";
            }
            $("#sjlcdbs1").empty();
            $("#sjlcdbs1").append(sjlcdbNum);

            if (window.Purchase.eventWorkItem === "" || !window.Purchase.eventWorkItem.hasOwnProperty("data")) {
                $("#eventWorkItemContent").empty();
                return;
            }
            var eventWorkItemHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.eventWorkItem.data.length; i++) {
                pageCount++;
                var elementId = "";
                var eventWorkItemOne = window.Purchase.eventWorkItem.data[i];
                if (eventWorkItemOne.hasOwnProperty("eventId")) {
                    elementId = eventWorkItemOne.eventId;
                } else {
                    elementId = i;
                }

                var eventWorkItemHtml = ' <li class="card" style="margin: 5px 2px;" id="eventWorkItem_' + elementId + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        工单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        录入人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        录入人机构\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="problemId_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="inputPerson_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="inputAgency_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        主题\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        描述\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请时间\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="problemTheme_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="problemDesc_' + elementId + '" class="resizable eventWorkItemPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applyTimer_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage3.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + eventWorkItemOne.eventId + '" class="button button-fill eventWorkItemClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                eventWorkItemHtmls += eventWorkItemHtml;

            }
            $("#eventWorkItemContent").empty();
            $("#eventWorkItemContent").append(eventWorkItemHtmls);
        },
        loadEventWorkItemData: function () {
            if (window.Purchase.eventWorkItem === "" || !window.Purchase.eventWorkItem.hasOwnProperty("data")) {
                $("#eventWorkItemContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.eventWorkItem.data.length; i++) {
                var purchaseDetail = window.Purchase.eventWorkItem.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("eventId")) {
                    elementId = purchaseDetail.eventId;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("eventId")) {
                    $("#problemId_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.eventId));
                    //log("范德萨范德萨:"+$("#problemId_" + elementId));
                }
                if (purchaseDetail.hasOwnProperty("reporter")) {
                    $("#inputPerson_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.reporter));
                }
                if (purchaseDetail.hasOwnProperty("reporterDept")) {
                    $("#inputAgency_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.reporterDept));
                }
                if (purchaseDetail.hasOwnProperty("eventName")) {
                    $("#problemTheme_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.eventName));
                }
                if (purchaseDetail.hasOwnProperty("theme")) {
                    $("#problemDesc_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.theme));
                }
                if (purchaseDetail.hasOwnProperty("createTime")) {
                    $("#applyTimer_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.createTime).replace(/T/g, ' ').replace(/-/g, ''));
                }

            }
        },
        loadReimburseHtml: function () {
            //添加数量显示
            if(window.Purchase.reimburse.hasOwnProperty("data")) {
                var bxdlcdbNum = "报销单审批" + "(" + window.Purchase.reimburse.data.length + ")";
            }else{
                var bxdlcdbNum = "报销单审批(0)";
            }
            $("#bxdlcdbs1").empty();
            $("#bxdlcdbs1").append(bxdlcdbNum);

            if (window.Purchase.reimburse === "" || !window.Purchase.reimburse.hasOwnProperty("data")) {
                $("#reimburseContent").empty();
                return;
            }
            var reimburseHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.reimburse.data.length; i++) {
                pageCount++;
                var elementId = "";
                var reimburseOne = window.Purchase.reimburse.data[i];
                if (reimburseOne.hasOwnProperty("code")) {
                    elementId = reimburseOne.code;
                } else {
                    elementId = i;
                }
                var reimburseHtml = ' <li class="card" style="margin: 5px 2px;" id="reimburse_' + elementId + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        报销单编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        报销单日期\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        报销单金额\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="rBurseId_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="rBurseDate_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="rBurseMoney_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        费用归属部门\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        费用归属人员\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        摘要\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="deptMoneyName_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="deptPeopleName_' + elementId + '" class="resizable reimbursePopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="theme_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage3.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + reimburseOne.code + '" class="button button-fill reimburseClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                reimburseHtmls += reimburseHtml;

            }

            $("#reimburseContent").empty();
            $("#reimburseContent").append(reimburseHtmls);
        },

        loadReimburseData: function () {
            if (window.Purchase.reimburse === "" || !window.Purchase.reimburse.hasOwnProperty("data")) {
                $("#reimburseContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.reimburse.data.length; i++) {
                var purchaseDetail = window.Purchase.reimburse.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("code")) {
                    elementId = purchaseDetail.code;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("code")) {
                    $("#rBurseId_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.code));
                    //log("范德萨范德萨:"+$("#problemId_" + elementId));
                }
                if (purchaseDetail.hasOwnProperty("bxdTime")) {
                    $("#rBurseDate_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.bxdTime).split("T")[0]);
                }
                if (purchaseDetail.hasOwnProperty("applyDeptName")) {
                    $("#deptMoneyName_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.applyDeptName));
                }
                //if (purchaseDetail.hasOwnProperty("attachNum")) {
                //$("#rBurseMoney_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.attachNum));
                //}
                if (purchaseDetail.hasOwnProperty("bxdMoney")) {
                    $("#rBurseMoney_" + elementId).text(purchaseDetail.bxdMoney);
                }
                if (purchaseDetail.hasOwnProperty("deptUserName")) {
                    $("#deptPeopleName_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.deptUserName));
                }
                if (purchaseDetail.hasOwnProperty("summary")) {
                    $("#theme_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.summary));
                }

            }
        },
        loadTravelEcpensesHtml:function(){
            //添加数量显示
            if(window.Purchase.travelEcpensesData.hasOwnProperty("data")) {
                var travelEcpensesNum = "差旅报销审批" + "(" + window.Purchase.travelEcpensesData.data.length + ")";
            }else{
                var travelEcpensesNum = "差旅报销审批(0)";
            }
            $("#travelEcpensesNum").empty();
            $("#travelEcpensesNum").append(travelEcpensesNum);

            if (window.Purchase.travelEcpensesData === "" || !window.Purchase.travelEcpensesData.hasOwnProperty("data")) {
                $("#travelEcpensesContent").empty();
                return;
            }
            var travelEcpensesHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.travelEcpensesData.data.length; i++) {
                pageCount++;
                var elementId = "";
                var travelEcpensesOne = window.Purchase.travelEcpensesData.data[i];

                var qdsj=window.ApprovalContractDetail.isNull(htspOne.column3)===false?htspOne.column3:"";

                var travelEcpensesHtml= '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            编号\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请单位\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + travelEcpensesOne.name + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + travelEcpensesOne.counterparty + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请时间\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + travelEcpensesOne.contractTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + travelEcpensesOne.businessTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + travelEcpensesOne.code + '"\n' +
                    '                                                                   class="button button-fill approvalContractClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                travelEcpensesHtmls += travelEcpensesHtml;

            }
            $("#travelEcpensesContent").empty();
            $("#travelEcpensesContent").append(travelEcpensesHtmls);
            // $("#approvalPendingContent").html(approvalPendingHtmls);
        },

        loadApprovalContractHtml: function () {
            //添加数量显示
            if(window.Purchase.approvalContractData.hasOwnProperty("data")) {
                var htspNum = "合同审批" + "(" + window.Purchase.approvalContractData.data.length + ")";
            }else{
                var htspNum = "合同审批(0)";
            }
            $("#htspNum").empty();
            $("#htspNum").append(htspNum);

            if (window.Purchase.approvalContractData === "" || !window.Purchase.approvalContractData.hasOwnProperty("data")) {
                $("#htspContent").empty();
                return;
            }
            var htspHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.approvalContractData.data.length; i++) {
                pageCount++;
                var elementId = "";
                var htspOne = window.Purchase.approvalContractData.data[i];
                var qdsj=window.ApprovalContractDetail.isNull(htspOne.column3)===false?htspOne.column3:"";
                var htspHtml= '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            合同名称\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            交易对手\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            合同标的\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspOne.name + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspOne.counterparty + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspOne.contractMoney + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            合同类型\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            业务类型\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            签订日期\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspOne.contractTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspOne.businessTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + qdsj+ '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + htspOne.code + '"\n' +
                    '                                                                   class="button button-fill approvalContractClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                htspHtmls += htspHtml;

            }
            $("#htspContent").empty();
            $("#htspContent").append(htspHtmls);
            // $("#approvalPendingContent").html(approvalPendingHtmls);
        },

        loadApprovalContractAppliedHtml: function () {
            //添加数量显示
            if (window.Purchase.approvalContractAppliedData.data !== undefined && window.Purchase.approvalContractAppliedData.data !== null && window.Purchase.approvalContractAppliedData.data.length > 0) {
                var htsp = "合同审批" + "(" + window.Purchase.approvalContractAppliedData.data.length + ")";
            } else {
                var htsp = "合同审批(0)";
            }

            $("#htspAppliedNum").empty();
            $("#htspAppliedNum").append(htsp);

            if (window.Purchase.approvalContractAppliedData.data == undefined) {
                $("#htspAppliedContent").empty();
                return;
            }
            var htspAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.approvalContractAppliedData.data.length; i++) {
                pageCount++;
                var htspAppliedOne = window.Purchase.approvalContractAppliedData.data[i];
                var qdsj=window.ApprovalContractDetail.isNull(htspAppliedOne.column3)===false?htspAppliedOne.column3:"";
                var htspAppliedHtml= '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            合同名称\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            交易对手\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            合同标的\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                     ' + htspAppliedOne.name + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspAppliedOne.counterparty + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspAppliedOne.contractMoney + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            合同类型\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            业务类型\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33 purchaseHomepage">\n' +
                    '                                                                            签订日期\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                     ' + htspAppliedOne.contractTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + htspAppliedOne.businessTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-33">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + qdsj + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + htspAppliedOne.code + '"\n' +
                    '                                                                   class="button button-fill approvalContractAppliedClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                htspAppliedHtmls += htspAppliedHtml;
            }
            // 添加内容显示
            $("#htspAppliedContent").empty();
            $("#htspAppliedContent").append(htspAppliedHtmls);
        },




        loadSupervisionHtml: function () {
            //添加数量显示
            if(window.Purchase.supervision.hasOwnProperty("data")) {
                var dcdbdb = "督察督办" + "(" + window.Purchase.supervision.data.length + ")";
            }else{
                var dcdbdb = "督察督办(0)";
            }
            $("#dcdbsl").empty();
            $("#dcdbsl").append(dcdbdb);

            if (window.Purchase.supervision.data.length === "") {
                $("#supervisionContent").empty();
                return;
            }
            var supervisionHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.supervision.data.length; i++) {
                pageCount++;
                var elementId = "";
                var supervisionOne = window.Purchase.supervision.data[i];
                if (supervisionOne.hasOwnProperty("id")) {
                    elementId = supervisionOne.id;
                } else {
                    elementId = i;
                }
                var supervisionHtml = ' <li class="card" style="margin: 5px 2px;" id="supervision_' + supervisionOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        事项\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="matterName_' + supervisionOne.id + '" class="resizable supervisionPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        事项来源\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        主办部室\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="numberName_' + supervisionOne.id + '" class="resizable supervisionPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="matterSource_' + supervisionOne.id + '" class="resizable supervisionPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="hostDepartment_' + supervisionOne.id + '"  class="resizable supervisionPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage2.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + supervisionOne.code + '" class="button button-fill supervisionClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                supervisionHtmls += supervisionHtml;
            }
            $("#supervisionContent").empty();
            $("#supervisionContent").append(supervisionHtmls);
        },
        loadSupervisionData: function () {
            if (window.Purchase.supervision.data.length === "") {
                $("#supervisionContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.supervision.data.length; i++) {
                var purchaseDetail = window.Purchase.supervision.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("id")) {
                    elementId = purchaseDetail.id;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("name")) {
                    $("#matterName_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.name));
                }
                if (purchaseDetail.hasOwnProperty("code")) {
                    $("#numberName_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.code));
                }
                if (purchaseDetail.hasOwnProperty("origin")) {
                    $("#matterSource_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.origin));
                }

                if (purchaseDetail.hasOwnProperty("maindepartment")) {
                    $("#hostDepartment_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.maindepartment));
                }
            }
        },

        loadSalaryApproveHtml: function () {
            //添加数量显示
            if(window.Purchase.salaryApprove.hasOwnProperty("data")) {
                var gzspdb = "工资审批" + "(" + window.Purchase.salaryApprove.data.length + ")";
            }else{
                var gzspdb = "工资审批(0)";
            }
            $("#gzspNum").empty();
            $("#gzspNum").append(gzspdb);

            if (window.Purchase.salaryApprove.data.length === "") {
                $("#salaryApproveContent").empty();
                return;
            }
            var salaryApproveHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.salaryApprove.data.length; i++) {
                pageCount++;
                var elementId = "";
                var salaryApproveOne = window.Purchase.salaryApprove.data[i];
                if (salaryApproveOne.hasOwnProperty("id")) {
                    elementId = salaryApproveOne.id;
                } else {
                    elementId = i;
                }
                var salaryApproveHtml = ' <li class="card" style="margin: 5px 2px;" id="salaryApprove_' + salaryApproveOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        工资审批年月\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="month_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        工资项\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        在岗人员\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        离岗人员\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="finalSalary" class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">实发工资</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="finalSalary_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="lgFinalSalary_' + salaryApproveOne.id + '"  class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        离职递 <br/>延支付\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        退休本<br/>行补贴\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        退休人<br/>员年金\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '										<div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="lzFinalSalary_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="bankSubsidyFinalSalary_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="annuityFinalSalary_' + salaryApproveOne.id + '"  class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage2.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + salaryApproveOne.processId + '_' + salaryApproveOne.id + '_' + salaryApproveOne.month +'_1" class="button button-fill salaryApproveClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                salaryApproveHtmls += salaryApproveHtml;
            }
            $("#salaryApproveContent").empty();
            $("#salaryApproveContent").append(salaryApproveHtmls);
        },
        loadSalaryApproveData: function () {
            if (window.Purchase.salaryApprove.data.length === "") {
                $("#salaryApproveContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.salaryApprove.data.length; i++) {
                var purchaseDetail = window.Purchase.salaryApprove.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("id")) {
                    elementId = purchaseDetail.id;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("month")) {
                    $("#month_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.month));
                }
                if (purchaseDetail.hasOwnProperty("finalSalary")) {
                    $("#finalSalary_" + elementId).text(parseFloat(purchaseDetail.finalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("lgFinalSalary")) {
                    $("#lgFinalSalary_" + elementId).text(parseFloat(purchaseDetail.lgFinalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("lzFinalSalary")) {
                    $("#lzFinalSalary_" + elementId).text(parseFloat(purchaseDetail.lzFinalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("bankSubsidyFinalSalary")) {
                    $("#bankSubsidyFinalSalary_" + elementId).text(parseFloat(purchaseDetail.bankSubsidyFinalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("annuityFinalSalary")) {
                    $("#annuityFinalSalary_" + elementId).text(parseFloat(purchaseDetail.annuityFinalSalary).toFixed(2));
                }
            }
        },

        loadSuggestionHtml: function () {
            //添加数量显示
            if(window.Purchase.suggestion.hasOwnProperty("suggestInfoVoList")) {
                var hlhj = "合理化建议" + "(" + window.Purchase.suggestion.suggestInfoVoList.length + ")";
            }else{
                var hlhj = "合理化建议(0)";
            }
            $("#hlhjyNum").empty();
            $("#hlhjyNum").append(hlhj);
            if(window.Purchase.suggestion.suggestInfoVoList.length === ""){
                $("#suggestionContent").empty();
                return;
            }
            var suggestionHtmls = "";
            var pageCount = 0;
            for (var i=0;i<window.Purchase.suggestion.suggestInfoVoList.length;i++){
                pageCount++;
                var elementId = "";
                var suggestionOne = window.Purchase.suggestion.suggestInfoVoList[i];
                if(suggestionOne.hasOwnProperty("id")){
                    elementId = suggestionOne.id;
                }else{
                    elementId = i;
                }
                var suggestionHtml = ' <li class="card" style="margin: 5px 2px;" id="suggestion_' + suggestionOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        合理化建议标题\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="rationalizationTitle_' + suggestionOne.id + '" class="resizable suggestionPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        合理化建议编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        上传日期\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="rationalizationCode_' + suggestionOne.id + '" class="resizable suggestionPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="uploadDate_' + suggestionOne.id + '" class="resizable suggestionPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + suggestionOne.code + '" class="button button-fill suggestionClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                suggestionHtmls += suggestionHtml;
            }
            $("#suggestionContent").empty();
            $("#suggestionContent").append(suggestionHtmls);
        },
        loadSuggestionData: function () {
            if(window.Purchase.suggestion.suggestInfoVoList.length === ""){
                $("#suggestionContent").empty;
                return;
            }
            for(var i=0; i<window.Purchase.suggestion.suggestInfoVoList.length;i++){
                var suggestionDetail = window.Purchase.suggestion.suggestInfoVoList[i];
                var elementId = "";
                if(suggestionDetail.hasOwnProperty("id")){
                    elementId = suggestionDetail.id;
                }else{
                    elementId = i;
                }
                if(suggestionDetail.hasOwnProperty("suggestTitle")){
                    $("#rationalizationTitle_"+elementId).text(window.Purchase.dealSpecial(suggestionDetail.suggestTitle));
                }
                if(suggestionDetail.hasOwnProperty("code")){
                    $("#rationalizationCode_"+elementId).text(window.Purchase.dealSpecial(suggestionDetail.code));
                }
                if(suggestionDetail.hasOwnProperty("applyTime")){
                    $("#uploadDate_"+elementId).text(window.Purchase.dealSpecial(suggestionDetail.applyTime).split("T")[0]);
                }

            }
        },

        loadCreditHtml: function () {
            //添加数量显示
            if(window.Purchase.credit.hasOwnProperty("values")) {
                var xdsp = "信贷审批" + "(" + window.Purchase.credit.values.length + ")";
            }else{
                var xdsp = "信贷审批(0)";
            }
            $("#xdspNum").empty();
            $("#xdspNum").append(xdsp);

            if(window.Purchase.credit.values.length === ""){
                $("#creditContent").empty();
                return;
            }
            var creditHtmls = "";
            var pageCount = 0;
            for (var i=0;i<window.Purchase.credit.values.length;i++){
                pageCount++;
                var elementId = "";
                var creditOne = window.Purchase.credit.values[i];

                var creditHtml = ' <li class="card" style="margin: 5px 2px;" id="credit_' + creditOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="chineseType_' + creditOne.id + '" class="resizable creditPopover"  readonly style="font-size: 15px;word-wrap:break-word;color:#505170;">类型 : ' + creditOne[0] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        流程编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        经办人姓名\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + creditOne.id + '" class="resizable creditPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + creditOne[2] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + creditOne.id + '" class="resizable creditPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + creditOne[4] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        流程描述\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="client_' + creditOne.id + '" class="resizable creditPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + creditOne[3] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + creditOne[2] + '_' + creditOne[1] + '" class="button button-fill creditClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                creditHtmls += creditHtml;
            }
            $("#creditContent").empty();
            $("#creditContent").append(creditHtmls);
        },

        loadLccpHtml: function () {
            //添加数量显示
            if( window.Purchase.lccp!== undefined&&window.Purchase.lccp.length>0) {
                var xdsp = "理财发行审批" + "(" + window.Purchase.lccp.length + ")";
            }else{
                var xdsp = "理财发行审批(0)";
            }

            $("#lccpNum").empty();
            $("#lccpNum").append(xdsp);

            if(window.Purchase.lccp == undefined){
                $("#lccpContent").empty();
                return;
            }
            var lccpHtmls = "";
            var pageCount = 0;
            for (var i=0;i<window.Purchase.lccp.length;i++){
                pageCount++;
                var elementId = "";
                var lccpOne = window.Purchase.lccp[i];
                lccpOne.applytime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(lccpOne.applytime).toString();

                var lccpHtml = ' <li class="card" style="margin: 5px 2px;" id="lccp_' + lccpOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        产品编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        产品名称\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        收益类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        发行对象\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.code) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.name) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.productTypeName) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.issueTargetName) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        预期收益率/净值\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请部门\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请日期\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.expectsincome) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.applybankName) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.applyuserName) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(lccpOne.applytime) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +

                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + lccpOne.code + '_' + lccpOne.code + '" class="button button-fill lccpClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                lccpHtmls += lccpHtml;
            }
            $("#lccpContent").empty();
            $("#lccpContent").append(lccpHtmls);
        },
        loadHbhMeetHtml: function () {
            if (window.Purchase.hbhMeetData.data == undefined) {
                var num = "行办会(0)";
                $("#hbhNum").empty();
                $("#hbhNum").append(num);
                $("#hbhAppliedNum").empty();
                $("#hbhAppliedNum").append(num);
                $("#hbhMeetContent").empty();
                $("#hbhMeetAppliedContent").empty();
                return;
            }
            var hbhHtmls = "";
            var hbhAppliedHtmls = "";
            var pageCount = 0;
            var hbhNum = 0;
            var hbhAppliedNum = 0;
            var sysDate = new Date(Date.parse(new Date()));
            for (var i = 0; i < window.Purchase.hbhMeetData.data.length; i++) {
                pageCount++;
                var hbhOne = window.Purchase.hbhMeetData.data[i];
                var meetHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            主题\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            参会时间\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + hbhOne.topic + '</div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + hbhOne.meetingtime + '</div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            参会人员\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            参会地点\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + hbhOne.usersName + '</div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + hbhOne.location + '</div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter" style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png" style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="detail_' + hbhOne.id + '" class="button button-fill meetApprovalPendingClass" style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                var meetTime = new Date(Date.parse((hbhOne.meetingtime).toString()));
                var time=(hbhOne.meetingtime).toString();
                time=time.replace(/-/g,':').replace(' ',':');
                time=time.split(':');
                var time1 = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
                if (sysDate <= time1) {
                    hbhNum++;
                    hbhHtmls += meetHtml;
                } else {
                    hbhAppliedNum++;
                    hbhAppliedHtmls += meetHtml;
                }
            }
            // 添加数量显示
            var hbh = "行办会" + "(" + hbhNum + ")";
            var hbhApplied = "行办会" + "(" + hbhAppliedNum + ")";
            $("#hbhNum").empty();
            $("#hbhNum").append(hbh);
            $("#hbhAppliedNum").empty();
            $("#hbhAppliedNum").append(hbhApplied);
            // 添加内容显示
            $("#hbhMeetContent").empty();
            $("#hbhMeetContent").append(hbhHtmls);
            $("#hbhMeetAppliedContent").empty();
            $("#hbhMeetAppliedContent").append(hbhAppliedHtmls);
        },

        loadDbhMeetHtml: function () {
            //添加数量显示
            if (window.Purchase.dbhMeetData.data !== undefined && window.Purchase.dbhMeetData.data !== null && window.Purchase.dbhMeetData.data.length > 0) {
                var dbh = "董事会" + "(" + window.Purchase.dbhMeetData.data.length + ")";
            } else {
                var dbh = "董事会(0)";
            }

            $("#dbhNum").empty();
            $("#dbhNum").append(dbh);

            if (window.Purchase.dbhMeetData.data == undefined) {
                $("#dbhMeetContent").empty();
                return;
            }
            var dbhHtmls = "";
            var pageCount = 0;
            var appliedFlag = 0;
            for (var i = 0; i < window.Purchase.dbhMeetData.data.length; i++) {
                pageCount++;
                var dbhOne = window.Purchase.dbhMeetData.data[i];
                var meetHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                    <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                        <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                            <div class="row">\n' +
                    '                                                                <div class="col-50 purchaseHomepage">\n' +
                    '                                                                    会议届次\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="col-50 purchaseHomepage">\n' +
                    '                                                                    发起时间\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="card-content">\n' +
                    '                                                        <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                            <div class="row">\n' +
                    '                                                                <div class="col-50">\n' +
                    '                                                                    <div class="item-input">\n' +
                    '                                                                        <div class="resizable" readonly\n' +
                    '                                                                             style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                            ' + dbhOne.name + '\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="col-50">\n' +
                    '                                                                    <div class="item-input">\n' +
                    '                                                                        <div class="resizable" readonly\n' +
                    '                                                                             style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                            ' + dbhOne.createTime + '\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="card-footer myCardFooter"\n' +
                    '                                                         style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                        <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                            <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                 style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                            <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                ' + pageCount + '\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                        <a href="#" id="detail_' + dbhOne.id + '_' + dbhOne.status + '_' + appliedFlag + '"\n' +
                    '                                                           class="button button-fill dbhMeetCheckingClass"\n' +
                    '                                                           style="width: 76px">详情</a>\n' +
                    '                                                    </div>\n' +
                    '                                                </li>';
                dbhHtmls += meetHtml;
            }
            // 添加内容显示
            $("#dbhMeetContent").empty();
            $("#dbhMeetContent").append(dbhHtmls);
        },

        loadSealHtml: function () {
            //添加数量显示
            if (window.Purchase.sealData.data !== undefined && window.Purchase.sealData.data !== null && window.Purchase.sealData.data.length > 0) {
                var yysp = "用印审批" + "(" + window.Purchase.sealData.data.length + ")";
            } else {
                var yysp = "用印审批(0)";
            }

            $("#yyspNum").empty();
            $("#yyspNum").append(yysp);

            if (window.Purchase.sealData.data == undefined) {
                $("#yyspContent").empty();
                return;
            }
            var yyspHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.sealData.data.length; i++) {
                pageCount++;
                var yyspOne = window.Purchase.sealData.data[i];
                var yyspHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-100 purchaseHomepage">\n' +
                    '                                                                            标题\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-100">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspOne.title + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请部门\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspOne.applicantName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspOne.applicantUnitName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            用印编号\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            用印类别\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspOne.code + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspOne.sealTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + yyspOne.code + '"\n' +
                    '                                                                   class="button button-fill sealCheckingClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                yyspHtmls += yyspHtml;
            }
            // 添加内容显示
            $("#yyspContent").empty();
            $("#yyspContent").append(yyspHtmls);
        },

        loadProcessBankHtml: function () {
            //添加数量显示
            var processBankHtmls = "";
            var pageCount = 0;
            for(var i = 0; i< window.Purchase.processBank.data.length;i++){
                pageCount++;
                var processBank = window.Purchase.processBank.data[i];
                var processBankHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-100 purchaseHomepage">\n' +
                    '                                                                            工作项名称\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-100">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + processBank.workitemName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请部门\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + processBank.applicantName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + processBank.applicantUnitName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            用印编号\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            用印类别\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + processBank.code + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + processBank.sealTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + processBank.code + '"\n' +
                    '                                                                   class="button button-fill sealCheckingClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                processBankHtmls += processBankHtml
            }
            // 添加内容显示
            $("#processBankContent").empty();
            $("#processBankContent").append(processBankHtmls);
        },

        //诉讼审批待办
        loadLitigationHtml: function () {
            //添加数量显示
            if (window.Purchase.litigation.data !== undefined && window.Purchase.litigation.data !== null && window.Purchase.litigation.data.length > 0) {
                var sssp = "诉讼审批" + "(" + window.Purchase.litigation.data.length + ")";
            } else {
                var sssp = "诉讼审批(0)";
            }

            $("#ssspNum").empty();
            $("#ssspNum").append(sssp);

            if (window.Purchase.litigation.data == undefined) {
                $("#ssspContent").empty();
                return;
            }
            var ssspHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.litigation.data.length; i++) {
                pageCount++;
                var ssspOne = window.Purchase.litigation.data[i];
                var ssspHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            贷款人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请时间\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.jkrName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.sqTime.split('T')[0] + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            经办人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            支行\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.khjlName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.bankName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="ssspID_' + ssspOne.bankCode + '_' + ssspOne.processInstID + '_' + ssspOne.workItemID+'_' + ssspOne.flssTsqkId + '_' + ssspOne.flssSqspId + '_' + ssspOne.type + '"\n' +
                    '                                                                   class="button button-fill litigationClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                ssspHtmls += ssspHtml;
            }
            // 添加内容显示
            $("#ssspContent").empty();
            $("#ssspContent").append(ssspHtmls);
        },

        loadSealAppliedHtml: function () {
            //添加数量显示
            if (window.Purchase.sealAppliedData.data !== undefined && window.Purchase.sealAppliedData.data !== null && window.Purchase.sealAppliedData.data.length > 0) {
                var yysp = "用印审批" + "(" + window.Purchase.sealAppliedData.data.length + ")";
            } else {
                var yysp = "用印审批(0)";
            }

            $("#yyspAppliedNum").empty();
            $("#yyspAppliedNum").append(yysp);

            if (window.Purchase.sealAppliedData.data == undefined) {
                $("#yyspAppliedContent").empty();
                return;
            }
            var yyspAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.sealAppliedData.data.length; i++) {
                pageCount++;
                var yyspAppliedOne = window.Purchase.sealAppliedData.data[i];
                var yyspAppliedHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-100 purchaseHomepage">\n' +
                    '                                                                            标题\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-100">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspAppliedOne.title + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请部门\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspAppliedOne.applicantName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspAppliedOne.applicantUnitName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            用印编号\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            用印类别\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspAppliedOne.code + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + yyspAppliedOne.sealTypeName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + yyspAppliedOne.code + '"\n' +
                    '                                                                   class="button button-fill sealHaveApplied"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                yyspAppliedHtmls += yyspAppliedHtml;
            }
            // 添加内容显示
            $("#yyspAppliedContent").empty();
            $("#yyspAppliedContent").append(yyspAppliedHtmls);
        },
        //机构性存款利率待审批
        loadInterestRateHtml: function () {
            //添加数量显示
            if (window.Purchase.interestRate.data !== undefined && window.Purchase.interestRate.data !== null && window.Purchase.interestRate.data.length > 0) {
                var cklvsp = "存款利率审批" + "(" + window.Purchase.interestRate.data.length + ")";
            } else {
                var cklvsp = "存款利率审批(0)";
            }

            $("#cklvNum").empty();
            $("#cklvNum").append(cklvsp);

            if (window.Purchase.interestRate.data == undefined) {
                $("#cklvContent").empty();
                return;
            }
            var cklvspHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.interestRate.data.length; i++) {
                pageCount++;
                var cklvspOne = window.Purchase.interestRate.data[i];
                var cklvspHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            审批编号\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请时间\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.code + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.applyTime.split('T')[0] + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请单位\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请人\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.applyBankName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.applyUserName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + cklvspOne.code + '" \n' +
                    '                                                                   class="button button-fill interestRateClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                cklvspHtmls += cklvspHtml;
            }
            // 添加内容显示
            $("#cklvContent").empty();
            $("#cklvContent").append(cklvspHtmls);
        },

        //机构性存款利率已审批
        loadInterestRateAppliedHtml: function () {
            //添加数量显示
            if (window.Purchase.interestRate.data !== undefined && window.Purchase.interestRate.data !== null && window.Purchase.interestRate.data.length > 0) {
                var cklvsp = "存款利率审批" + "(" + window.Purchase.interestRate.data.length + ")";
            } else {
                var cklvsp = "存款利率审批(0)";
            }

            $("#cklvNumApplied").empty();
            $("#cklvNumApplied").append(cklvsp);

            if (window.Purchase.interestRate.data == undefined) {
                $("#cklvContentApplied").empty();
                return;
            }
            var cklvspHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.interestRate.data.length; i++) {
                pageCount++;
                var cklvspOne = window.Purchase.interestRate.data[i];
                var cklvspHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            审批编号\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请时间\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.code + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.applyTime.split('T')[0] + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请单位\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请人\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.applyBankName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + cklvspOne.applyUserName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="code_' + cklvspOne.code + '"\n' +
                    '                                                                   class="button button-fill interestRateAppliedClass"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                cklvspHtmls += cklvspHtml;
            }
            // 添加内容显示
            $("#cklvContentApplied").empty();
            $("#cklvContentApplied").append(cklvspHtmls);
        },

        //法律诉讼审批已处理
        loadLitigationAppliedHtml : function(){
            //添加数量显示
            if (window.Purchase.litigationApplied.data !== undefined && window.Purchase.litigationApplied.data !== null && window.Purchase.litigationApplied.data.length > 0) {
                var sssp = "诉讼审批" + "(" + window.Purchase.litigationApplied.data.length + ")";
            } else {
                var sssp = "诉讼审批(0)";
            }

            $("#ssspAppliedNum").empty();
            $("#ssspAppliedNum").append(sssp);

            if (window.Purchase.litigationApplied.data == undefined) {
                $("#ssspAppliedContent").empty();
                return;
            }
            var ssspHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.litigationApplied.data.length; i++) {
                pageCount++;
                var ssspOne = window.Purchase.litigationApplied.data[i];
                var ssspHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            贷款人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            申请时间\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.jkrName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.sqTime.split('T')[0] + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            经办人\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50 purchaseHomepage">\n' +
                    '                                                                            支行\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-content">\n' +
                    '                                                                <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                                    <div class="row">\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.khjlName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="col-50">\n' +
                    '                                                                            <div class="item-input">\n' +
                    '                                                                                <div class="resizable" readonly\n' +
                    '                                                                                     style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                                    ' + ssspOne.bankName + '\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                            <div class="card-footer myCardFooter"\n' +
                    '                                                                 style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                                <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                                    <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                         style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                                    <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                        ' + pageCount + '\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <a href="#" id="ssspID_' + ssspOne.bankCode + '_' + ssspOne.processInstID + '_' + ssspOne.workItemID+'_' + ssspOne.flssTsqkId + '_' + ssspOne.flssSqspId + '_' + ssspOne.type + '"\n' +
                    '                                                                   class="button button-fill litigationHaveApplied"\n' +
                    '                                                                   style="width: 76px">详情</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </li>';
                ssspHtmls += ssspHtml;
            }
            // 添加内容显示
            $("#ssspAppliedContent").empty();
            $("#ssspAppliedContent").append(ssspHtmls);
        },

        loadDbhMeetAppliedHtml: function () {
            //添加数量显示
            if (window.Purchase.dbhMeetAppliedData.data !== undefined && window.Purchase.dbhMeetAppliedData.data !== null && window.Purchase.dbhMeetAppliedData.data.length > 0) {
                var dbhApplied = "董事会" + "(" + window.Purchase.dbhMeetAppliedData.data.length + ")";
            } else {
                var dbhApplied = "董事会(0)";
            }

            $("#dbhAppliedNum").empty();
            $("#dbhAppliedNum").append(dbhApplied);

            if (window.Purchase.dbhMeetAppliedData.data == undefined) {
                $("#dbhMeetAppliedContent").empty();
                return;
            }
            var dbhAppliedHtmls = "";
            var pageCount = 0;
            var appliedFlag = 1;
            for (var i = 0; i < window.Purchase.dbhMeetAppliedData.data.length; i++) {
                pageCount++;
                var dbhOne = window.Purchase.dbhMeetAppliedData.data[i];
                var meetHtml = '<li class="card" style="margin: 5px 2px;">\n' +
                    '                                                    <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                        <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                            <div class="row">\n' +
                    '                                                                <div class="col-50 purchaseHomepage">\n' +
                    '                                                                    会议届次\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="col-50 purchaseHomepage">\n' +
                    '                                                                    发起时间\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="card-content">\n' +
                    '                                                        <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                            <div class="row">\n' +
                    '                                                                <div class="col-50">\n' +
                    '                                                                    <div class="item-input">\n' +
                    '                                                                        <div class="resizable" readonly\n' +
                    '                                                                             style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                            ' + dbhOne.name + '\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="col-50">\n' +
                    '                                                                    <div class="item-input">\n' +
                    '                                                                        <div class="resizable" readonly\n' +
                    '                                                                             style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                            ' + dbhOne.createTime + '\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    <div class="card-content" style="background-color: whitesmoke">\n' +
                    '                                                        <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                            <div class="row">\n' +
                    '                                                                <div class="col-50 purchaseHomepage">\n' +
                    '                                                                    董办意见\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="col-50 purchaseHomepage">\n' +
                    '                                                                    董办时间\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="card-content">\n' +
                    '                                                        <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                            <div class="row">\n' +
                    '                                                                <div class="col-50">\n' +
                    '                                                                    <div class="item-input">\n' +
                    '                                                                        <div class="resizable" readonly\n' +
                    '                                                                             style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                            ' + dbhOne.dbLeader + '\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="col-50">\n' +
                    '                                                                    <div class="item-input">\n' +
                    '                                                                        <div class="resizable" readonly\n' +
                    '                                                                             style="font-size: 14px;word-wrap:break-word;color:#505170;">\n' +
                    '                                                                            ' + dbhOne.dbLeaderTime + '\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="card-footer myCardFooter"\n' +
                    '                                                         style="padding: 0px 15px 0px 0px ;">\n' +
                    '                                                        <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                            <img src="images/purchase/homePage/purchaseHomePage1.png"\n' +
                    '                                                                 style="width: 44px;height: 36px;padding-top:4px;">\n' +
                    '                                                            <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">\n' +
                    '                                                                ' + pageCount + '\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                        <a href="#" id="detail_' + dbhOne.id + '_' + dbhOne.status + '_' + appliedFlag + '"\n' +
                    '                                                           class="button button-fill dbhMeetHaveApplied"\n' +
                    '                                                           style="width: 76px">详情</a>\n' +
                    '                                                    </div>\n' +
                    '                                                </li>';
                dbhAppliedHtmls += meetHtml;
            }
            // 添加内容显示
            $("#dbhMeetAppliedContent").empty();
            $("#dbhMeetAppliedContent").append(dbhAppliedHtmls);
        },

        loadDepositRateHtml: function () {
            $("#dklldjspNum").empty();
            //列表为空时只返回标题
            var depositRateInfo = window.Purchase.depositRate;
            if(depositRateInfo.hasOwnProperty("sdo") == false){
                var dklldjsp = "利率定价审批(0)";
                $("#dklldjspNum").append(dklldjsp);
                $("#depositRateContent").empty();
                return;
            }

            var sdoList = [];

            if(depositRateInfo.sdo.length==undefined){
                sdoList.push(depositRateInfo.sdo);
            } else {
                sdoList = depositRateInfo.sdo;
            }
            var dklldjsp = "利率定价审批" + "(" + sdoList.length + ")";
            $("#dklldjspNum").append(dklldjsp);

            var depositRateHtmls = "";
            var pageCount = 0;

            for (var i=0;i<sdoList.length;i++){
                var elementId = "";
                pageCount++;
                var depositRateOne = sdoList[i];
                var depositRateHtml = ' <li class="card" style="margin: 5px 2px;" id="depositRate_' + depositRateOne.AplyNo + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        订单申请单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请客户名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AplyNo + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.AplyTp[depositRateOne.AplyTp] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起机构\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起日期\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttUrsNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttInstCd + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttDt + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + depositRateOne.AplyNo + '_' + depositRateOne.AplyTp + '" class="button button-fill depositRateClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                depositRateHtmls += depositRateHtml;
            }
            $("#depositRateContent").empty();
            $("#depositRateContent").append(depositRateHtmls);
        },
        loadBigDepositHtml: function () {
            $("#bigDepositjspNum").empty();
            //列表为空时只返回标题
            var depositRateInfo = window.Purchase.bigDeposit;
            if(depositRateInfo.hasOwnProperty("sdo") == false){
                var bigDepositjsp = "大额存单审批(0)";
                $("#bigDepositjspNum").append(bigDepositjsp);
                $("#bigDepositContent").empty();
                return;
            }

            var sdoList = [];

            if(depositRateInfo.sdo.length==undefined){
                sdoList.push(depositRateInfo.sdo);
            } else {
                sdoList = depositRateInfo.sdo;
            }
            var bigDepositjsp = "大额存单审批" + "(" + sdoList.length + ")";
            $("#bigDepositjspNum").append(bigDepositjsp);

            var depositRateHtmls = "";
            var pageCount=0;

            for (var i=0;i<sdoList.length;i++){
                pageCount++;
                var elementId = "";
                var depositRateOne = sdoList[i];
                var depositRateHtml = ' <li class="card" style="margin: 5px 2px;" id="depositRate_' + depositRateOne.AplyNo + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        大额存单申请单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请客户名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AplyNo + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.AplyTp[depositRateOne.AplyTp] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起机构\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起日期\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttUrsNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttInstCd + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttDt + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + depositRateOne.AplyNo + '_' + depositRateOne.AplyTp + '" class="button button-fill bigDepositClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                depositRateHtmls += depositRateHtml;
            }
            $("#bigDepositContent").empty();
            $("#bigDepositContent").append(depositRateHtmls);
        },

        loadSpRatexxcxHtml: function () {


            $("#spllxxcxNum").empty();
            //列表为空时只返回标题
            var spRateInfoQueryInfo = window.Purchase.spRateInfoQueryInfo;

            if(spRateInfoQueryInfo.hasOwnProperty("sdo") == false){
                var spllxxcxNum = "服务价格审批(0)";
                $("#spllxxcxNum").append(spllxxcxNum);
                $("#spllxxcxContent").empty();
                return;
            }
            var sdoList = [];
            //如果为undefined则传过来的是对象
            if(spRateInfoQueryInfo.sdo.length==undefined){
                sdoList.push(spRateInfoQueryInfo.sdo);
            } else {
                //否则为书组
                sdoList = spRateInfoQueryInfo.sdo;
            }
            var spllxxcxNum = "服务价格审批" + "(" + sdoList.length + ")";
            $("#spllxxcxNum").append(spllxxcxNum);

            //数据结果集暂定为空不设置
            var spRatexxcxHtmls = "";
            var pageCount = 0;
            for ( var i = 0 ; i < sdoList.length ; i++) {
                var depositRateOne = sdoList[i];
                pageCount++;
                var  spRatexxcxHtml = ' <li class="card" style="margin: 5px 2px;" id="depositRate_' + depositRateOne.AplyNo + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        定价申请单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请客户名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AplyNo + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.AplyTp[depositRateOne.AplyTp] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起机构\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        发起日期\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttUrsNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttInstCd + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.InttDt + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + depositRateOne.AplyNo + '" class="button button-fill spRateInfoQueryClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                spRatexxcxHtmls += spRatexxcxHtml;
            }
            $("#spllxxcxContent").empty();
            $("#spllxxcxContent").append(spRatexxcxHtmls);
        },

        loadHaveAppliedHtml: function () {
            //数量显示
            if(window.Purchase.haveApplied.hasOwnProperty("cgInfo")) {
                var cgyb = "采购审批" + "(" + window.Purchase.haveApplied.cgInfo.length + ")";
            }else{
                var cgyb = "采购审批(0)";
            }
            $("#cglcycl").empty();
            $("#cglcycl").append(cgyb);

            if (window.Purchase.haveApplied === "" || !window.Purchase.haveApplied.hasOwnProperty("cgInfo")) {
                $("#haveAppliedContent").empty();
                return;
            }
            //var jsonString = {"purchase":[{"purchaseNO":"cg20180122","purchaseTitle":"5万到30万流程测试","budgetType":"预算内","budgetNO":"123456789","approvedState":"申请人确认中","applicationSector":"总行营业部","applicationPerson":"钱莹冰","applicationTime":"2018.01.05"},{"purchaseNO":"cg20180120","purchaseTitle":"30万到60万流程测试","budgetType":"预算外","budgetNO":"156625522","approvedState":"单位负责人确认中","applicationSector":"七都支行","applicationPerson":"钱莹冰","applicationTime":"2018.01.04"},{"purchaseNO":"cg20171225","purchaseTitle":"60万到100万流程测试","budgetType":"预算内","budgetNO":"5682351222","approvedState":"申请人确认中","applicationSector":"总行营业部","applicationPerson":"钱莹冰","applicationTime":"2017.12.18"}]};

            var haveAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.haveApplied.cgInfo.length; i++) {
                pageCount++;
                var emlementId = "";
                var haveAppliedOne = window.Purchase.haveApplied.cgInfo[i];
                if (haveAppliedOne.hasOwnProperty("id")) {
                    emlementId = haveAppliedOne.id;
                } else {
                    emlementId = i;
                }
                var haveAppliedHtml = '<li class="card" style="margin: 5px 2px;" id="haveApplied_' + haveAppliedOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        采购编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        采购标题\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        预算类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        预算编号\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="purchaseNOApplied_' + haveAppliedOne.id + '" class="resizable haveAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="purchaseTitleApplied_' + haveAppliedOne.id + '" class="resizable haveAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="budgetTypeApplied_' + haveAppliedOne.id + '" class="resizable haveAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="budgetNOApplied_' + haveAppliedOne.id + '" class="resizable haveAppliedPopover " readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        审批状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请部门\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        申请人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        申请时间\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="approvedStateApplied_' + haveAppliedOne.id + '" class="resizable haveAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applicationSectorApplied_' + haveAppliedOne.id + '" class="resizable haveAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applicationPersonApplied_' + haveAppliedOne.id + '"  class="resizable haveAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-25 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applicationTimeApplied_' + haveAppliedOne.id + '"  class="resizable haveAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage1.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detailApplied_' + haveAppliedOne.code + '_'+ haveAppliedOne.applyuser + '" class="button button-fill haveAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                haveAppliedHtmls += haveAppliedHtml;
            }
            $("#haveAppliedContent").empty();
            $("#haveAppliedContent").append(haveAppliedHtmls);
            // $("#haveAppliedContent").html(haveAppliedHtmls);
        },
        loadHaveAppliedData: function () {
            //var jsonString = {"purchase":[{"purchaseNO":"cg20180122","purchaseTitle":"5万到30万流程测试","budgetType":"预算内","budgetNO":"123456789","approvedState":"申请人确认中","applicationSector":"总行营业部","applicationPerson":"钱莹冰","applicationTime":"2018.01.05"},{"purchaseNO":"cg20180120","purchaseTitle":"30万到60万流程测试","budgetType":"预算外","budgetNO":"156625522","approvedState":"单位负责人确认中","applicationSector":"七都支行","applicationPerson":"钱莹冰","applicationTime":"2018.01.04"},{"purchaseNO":"cg20171225","purchaseTitle":"60万到100万流程测试","budgetType":"预算内","budgetNO":"5682351222","approvedState":"申请人确认中","applicationSector":"总行营业部","applicationPerson":"钱莹冰","applicationTime":"2017.12.18"}]};
            if (window.Purchase.haveApplied === "" || !window.Purchase.haveApplied.hasOwnProperty("cgInfo")) {
                $("#haveAppliedContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.haveApplied.cgInfo.length; i++) {
                var emlementId = "";
                var haveAppliedDetailOne = window.Purchase.haveApplied.cgInfo[i];
                if (haveAppliedDetailOne.hasOwnProperty("id")) {
                    emlementId = haveAppliedDetailOne.id;
                } else {
                    emlementId = i;
                }
                if (haveAppliedDetailOne.hasOwnProperty("code")) {
                    $("#purchaseNOApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.code));
                }
                if (haveAppliedDetailOne.hasOwnProperty("name")) {
                    $("#purchaseTitleApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.name));
                }
                if (haveAppliedDetailOne.hasOwnProperty("ysTypeName")) {
                    $("#budgetTypeApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.ysTypeName));
                }
                if (haveAppliedDetailOne.hasOwnProperty("yscode")) {
                    $("#budgetNOApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.yscode));
                }
                if (haveAppliedDetailOne.hasOwnProperty("approveStatusName")) {
                    $("#approvedStateApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.approveStatusName));
                }
                if (haveAppliedDetailOne.hasOwnProperty("applybankName")) {
                    $("#applicationSectorApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.applybankName));
                }
                if (haveAppliedDetailOne.hasOwnProperty("applyuserName")) {
                    $("#applicationPersonApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.applyuserName));
                }

                if (haveAppliedDetailOne.hasOwnProperty("applytime")) {
                    $("#applicationTimeApplied_" + emlementId).text(window.Purchase.dealSpecial(haveAppliedDetailOne.applytime).replace(/T/g, ' ').replace(/-/g, ''));
                }
            }
        },

        loadSuperAppliedHtml: function () {
            //数量显示
            if(window.Purchase.superApplied.hasOwnProperty("dcdbInfoList")) {
                var dcdbNum = "督察督办" + "(" + window.Purchase.superApplied.dcdbInfoList.length + ")";
            }else{
                var dcdbNum = "督察督办(0)";
            }
            $("#dcdbycl").empty();
            $("#dcdbycl").append(dcdbNum);

            if (window.Purchase.superApplied.dcdbInfoList.length=== "" ) {
                $("#superAppliedContent").empty();
                return;
            }
            //var jsonString = {"purchase":[{"purchaseNO":"cg20180122","purchaseTitle":"5万到30万流程测试","budgetType":"预算内","budgetNO":"123456789","approvedState":"申请人确认中","applicationSector":"总行营业部","applicationPerson":"钱莹冰","applicationTime":"2018.01.05"},{"purchaseNO":"cg20180120","purchaseTitle":"30万到60万流程测试","budgetType":"预算外","budgetNO":"156625522","approvedState":"单位负责人确认中","applicationSector":"七都支行","applicationPerson":"钱莹冰","applicationTime":"2018.01.04"},{"purchaseNO":"cg20171225","purchaseTitle":"60万到100万流程测试","budgetType":"预算内","budgetNO":"5682351222","approvedState":"申请人确认中","applicationSector":"总行营业部","applicationPerson":"钱莹冰","applicationTime":"2017.12.18"}]};

            var superAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.superApplied.dcdbInfoList.length; i++) {
                pageCount++;
                var emlementId = "";
                var superAppliedOne = window.Purchase.superApplied.dcdbInfoList[i];
                if (superAppliedOne.hasOwnProperty("id")) {
                    emlementId = superAppliedOne.id;
                } else {
                    emlementId = i;
                }
                var superAppliedHtml = ' <li class="card" style="margin: 5px 2px;" id="superApplied_' + superAppliedOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        事项\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="matterNameApplied_' + superAppliedOne.id + '" class="resizable superAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        事项来源\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        主办部室\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="numberNameApplied_' + superAppliedOne.id + '" class="resizable superAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="matterSourceApplied_' + superAppliedOne.id + '" class="resizable superAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="hostDepartmentApplied_' + superAppliedOne.id + '"  class="resizable superAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage2.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + superAppliedOne.code + '" class="button button-fill superAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                superAppliedHtmls += superAppliedHtml;
            }
            $("#superAppliedContent").empty();
            $("#superAppliedContent").append(superAppliedHtmls);
        },
        loadSuperAppliedData: function () {
            if (window.Purchase.superApplied.dcdbInfoList.length=== "") {
                $("#superAppliedContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.superApplied.dcdbInfoList.length; i++) {
                var emlementId = "";
                var superAppliedDetailOne = window.Purchase.superApplied.dcdbInfoList[i];
                if (superAppliedDetailOne.hasOwnProperty("id")) {
                    emlementId = superAppliedDetailOne.id;
                } else {
                    emlementId = i;
                }
                if (superAppliedDetailOne.hasOwnProperty("name")) {
                    $("#matterNameApplied_" + emlementId).text(window.Purchase.dealSpecial(superAppliedDetailOne.name));
                }
                if (superAppliedDetailOne.hasOwnProperty("code")) {
                    $("#numberNameApplied_" + emlementId).text(window.Purchase.dealSpecial(superAppliedDetailOne.code));
                }
                if (superAppliedDetailOne.hasOwnProperty("origin")) {
                    $("#matterSourceApplied_" + emlementId).text(window.Purchase.dealSpecial(superAppliedDetailOne.origin));
                }

                if (superAppliedDetailOne.hasOwnProperty("maindepartment")) {
                    $("#hostDepartmentApplied_" + emlementId).text(window.Purchase.dealSpecial(superAppliedDetailOne.maindepartment));
                }
            }
        },

        loadDepositRateAppliedHtml: function () {
            $("#dklldjspAppliedNum").empty();
            //列表为空时只返回标题
            var depositRateInfo = window.Purchase.depositRateAppliedData;
            if(depositRateInfo.hasOwnProperty("sdo") == false){
                var dklldjsp = "利率定价审批(0)";
                $("#dklldjspAppliedNum").append(dklldjsp);
                $("#depositRateAppliedContent").empty();
                return;
            }
            var sdoList = [];

            if(depositRateInfo.sdo.length==undefined){
                sdoList.push(depositRateInfo.sdo);
            } else {
                sdoList = depositRateInfo.sdo;
            }
            var dklldjsp = "利率定价审批" + "(" + sdoList.length + ")";
            $("#dklldjspAppliedNum").append(dklldjsp);

            var depositRateHtmls = "";
            var pageCount="";

            for (var i=0;i<sdoList.length;i++){
                var elementId = "";
                pageCount++;
                var depositRateOne = sdoList[i];
                var depositRateHtml = ' <li class="card" style="margin: 5px 2px;" id="depositRate_' + depositRateOne.AplyNo + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        定价申请单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请客户名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AplyNo + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.AplyTp[depositRateOne.AplyTp] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        当前流程状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        审批岗名称\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        审批人名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CrnFlwSt + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AprvlPstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + depositRateOne.AplyNo + '" class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(depositRateOne.AprvrNm) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + depositRateOne.AplyNo + '_' + depositRateOne.AplyTp + '" class="button button-fill depositRateAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                depositRateHtmls += depositRateHtml;
            }
            $("#depositRateAppliedContent").empty();
            $("#depositRateAppliedContent").append(depositRateHtmls);
        },
        loadBigDepositAppliedHtml: function () {
            $("#bigDepositjspAppliedNum").empty();
            //列表为空时只返回标题
            var bigDepositInfo = window.Purchase.depositRateAppliedData;
            if(bigDepositInfo.hasOwnProperty("sdo") == false){
                var dklldjsp = "大额存单审批(0)";
                $("#bigDepositjspAppliedNum").append(dklldjsp);
                $("#bigDepositAppliedContent").empty();
                return;
            }
            var sdoList = [];

            if(bigDepositInfo.sdo.length==undefined){
                sdoList.push(bigDepositInfo.sdo);
            } else {
                sdoList = bigDepositInfo.sdo;
            }
            var dklldjsp = "大额存单审批" + "(" + sdoList.length + ")";
            $("#bigDepositjspAppliedNum").append(dklldjsp);

            var bigDepositHtmls = "";
            var pageCount=0;

            for (var i=0;i<sdoList.length;i++){
                pageCount++;
                var elementId = "";
                var bigDepositOne = sdoList[i];
                var bigDepositHtml = ' <li class="card" style="margin: 5px 2px;" id="bigDeposit_' + bigDepositOne.AplyNo + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        大额申请单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        客户经理名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + bigDepositOne.AplyNo + '" class="resizable bigDepositPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + bigDepositOne.AplyNo + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + bigDepositOne.AplyNo + '" class="resizable bigDepositPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.AplyTp[bigDepositOne.AplyTp] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + bigDepositOne.AplyNo + '" class="resizable bigDepositPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + bigDepositOne.CstMgrNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        当前流程状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        审批岗名称\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        审批人名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + bigDepositOne.AplyNo + '" class="resizable bigDepositPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + bigDepositOne.CrnFlwSt + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + bigDepositOne.AplyNo + '" class="resizable bigDepositPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + bigDepositOne.AprvlPstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + bigDepositOne.AplyNo + '" class="resizable bigDepositPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.dealSpecial(bigDepositOne.AprvrNm) + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + bigDepositOne.AplyNo + '_' + bigDepositOne.AplyTp + '" class="button button-fill bigDepositAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                bigDepositHtmls += bigDepositHtml;
            }
            $("#bigDepositAppliedContent").empty();
            $("#bigDepositAppliedContent").append(bigDepositHtmls);
        },

        loadSpRatexxcxAppliedHtml: function () {


            $("#spllxxcxNumApplied").empty();
            //列表为空时只返回标题
            var spRateInfoQueryInfo = window.Purchase.spRateInfoQueryInfo;

            if(spRateInfoQueryInfo.hasOwnProperty("sdo") == false){
                var spllxxcxNumApplied = "服务价格审批(0)";
                $("#spllxxcxNumApplied").append(spllxxcxNumApplied);
                $("#spllxxcxContentApplied").empty();
                return;
            }
            var sdoList = [];
            //如果为undefined则传过来的是对象
            if(spRateInfoQueryInfo.sdo.length==undefined){
                sdoList.push(spRateInfoQueryInfo.sdo);
            } else {
                //否则为书组
                sdoList = spRateInfoQueryInfo.sdo;
            }
            var spllxxcxNumApplied = "服务价格审批" + "(" + sdoList.length + ")";
            $("#spllxxcxNumApplied").append(spllxxcxNumApplied);

            //数据结果集暂定为空不设置
            var spRatexxcxHtmlsApplied = "";
            var pageCount = 0;
            for ( var i = 0 ; i < sdoList.length ; i++) {
                var depositRateOne = sdoList[i];
                pageCount++;
                var  spRatexxcxHtml = ' <li class="card" style="margin: 5px 2px;" id="depositRate_' + depositRateOne.AplyNo + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        定价申请单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        类型\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请客户名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AplyNo + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + window.Purchase.AplyTp[depositRateOne.AplyTp] + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        当前流程状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        当前流程状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        审批人名称\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.CrnFlwSt + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AprvlPstNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div class="resizable depositRatePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + depositRateOne.AprvrNm + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + depositRateOne.AplyNo + '" class="button button-fill spRateInfoQueryClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                spRatexxcxHtmlsApplied += spRatexxcxHtml;
            }
            $("#spllxxcxContentApplied").empty();
            $("#spllxxcxContentApplied").append(spRatexxcxHtmlsApplied);
        },

        loadLccpAppliedHtml: function () {
            //添加数量显示
            if( window.Purchase.lccp.length>0) {
                var xdsp = "理财发行审批" + "(" + window.Purchase.lccp.length + ")";
            }else{
                var xdsp = "理财发行审批(0)";
            }

            $("#lccpNumApplied").empty();
            $("#lccpNumApplied").append(xdsp);

            if(window.Purchase.lccp.length === undefined){
                $("#lccpAppliedContent").empty();
                return;
            }
            var lccpHtmls = "";
            var flowType = "lcFlow";
            var loadMoreWorkHtmls ='<div id="'+flowType+'" class="getMoreInfoClass" style="text-align: center;padding-top: 10px;padding-bottom:8px;display: block">\n'+
                '<a href="#" id="getMoreInfo" style="width:76px;">查看更多流程</a>\n' +
                '</div>\n'+
                '<div class="item-inner" style="padding-top: 1px;padding-bottom: 1px;min-height: 0px"></div>';

            var pageCount = 0;
            var loadLcWorkNum = (window.Purchase.lccp.length > 10) ? 10 : window.Purchase.lccp.length;
            for (var i=0;i<loadLcWorkNum;i++){
                pageCount++;
                var elementId = "";
                var lccpOne = window.Purchase.lccp[i];
                lccpOne.applytime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(lccpOne.applytime).toString();

                var lccpHtml = ' <li class="card" style="margin: 5px 2px;" id="lccp_' + lccpOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请部门\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        理财名称\n' +
                    '                                                    </div>\n' +
                    // '                                                    <div class="col-25 purchaseHomepage">\n' +
                    // '                                                        申请时间\n' +
                    // '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.applybankName + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.applyuserName + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.name + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    // '                                                    <div class="col-25 purchaseHomepage">\n' +
                    // '                                                        <div class="item-input">\n' +
                    // '                                                            <div  id="managerName_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.applytime + '</div>\n' +
                    // '                                                        </div>\n' +
                    // '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        流程编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        审批状态\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请日期\n' +
                    '                                                    </div>\n' +
                    // '                                                    <div class="col-25 purchaseHomepage">\n' +
                    // '                                                        理财编号\n' +
                    // '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.processid + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="managerName_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.approveStatusName + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="processId_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.applytime + '</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    // '                                                    <div class="col-25 purchaseHomepage">\n' +
                    // '                                                        <div class="item-input">\n' +
                    // '                                                            <div  id="managerName_' + lccpOne.id + '" class="resizable lccpPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">' + lccpOne.code + '</div>\n' +
                    // '                                                        </div>\n' +
                    // '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + lccpOne.code + '_' + lccpOne.code + '" class="button button-fill lccpAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                lccpHtmls += lccpHtml;
            }
            if(window.Purchase.lccp.length > 10){
                lccpHtmls += loadMoreWorkHtmls;
            }
            $("#lccpAppliedContent").empty();
            $("#lccpAppliedContent").append(lccpHtmls);
        },

        loadSuggestAppliedHtml: function () {
            //数量显示
            if(window.Purchase.suggestApplied.hasOwnProperty("suggestInfoVoList")){
                var hlhjyyb = "合理化建议" + "(" + window.Purchase.suggestApplied.suggestInfoVoList.length + ")";
            }else{
                var hlhjyyb = "合理化建议(0)"
            }
            $("#hlhjyycl").empty();
            $("#hlhjyycl").append(hlhjyyb);
            if(window.Purchase.suggestApplied.suggestInfoVoList.length === ""){
                $("#suggestionAppliedContent").empty();
                return;
            }
            var suggestAppliedHtmls = "";
            var pageCount = 0;
            for(var i =0;i<window.Purchase.suggestApplied.suggestInfoVoList.length;i++){
                pageCount++;
                var emlementId = "";
                var suggestAppliedOne = window.Purchase.suggestApplied.suggestInfoVoList[i];
                if (suggestAppliedOne.hasOwnProperty("id")) {
                    emlementId = suggestAppliedOne.id;
                } else {
                    emlementId = i;
                }
                var suggestAppliedHtml = ' <li class="card" style="margin: 5px 2px;" id="suggestApplied_' + suggestAppliedOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        合理化建议标题\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="rationalizationAppliedTitle_' + suggestAppliedOne.id + '" class="resizable suggestAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        合理化建议编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        上传日期\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="rationalizationAppliedCode_' + suggestAppliedOne.id + '" class="resizable suggestAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="uploadAppliedDate_' + suggestAppliedOne.id + '" class="resizable suggestAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage4.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + suggestAppliedOne.code + '" class="button button-fill suggestAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                suggestAppliedHtmls += suggestAppliedHtml;
            }
            $("#suggestionAppliedContent").empty();
            $("#suggestionAppliedContent").append(suggestAppliedHtmls);
        },
        loadSuggestAppliedData: function () {
            if(window.Purchase.suggestApplied.suggestInfoVoList.length=== ""){
                $("#suggestionAppliedContent").empty();
                return;
            }
            for (var i =0;i<window.Purchase.suggestApplied.suggestInfoVoList.length;i++){
                var emlementId = "";
                var suggestAppliedDetailOne = window.Purchase.suggestApplied.suggestInfoVoList[i];
                if (suggestAppliedDetailOne.hasOwnProperty("id")) {
                    emlementId = suggestAppliedDetailOne.id;
                } else {
                    emlementId = i;
                }
                if (suggestAppliedDetailOne.hasOwnProperty("suggestTitle")) {
                    $("#rationalizationAppliedTitle_" + emlementId).text(window.Purchase.dealSpecial(suggestAppliedDetailOne.suggestTitle));
                }
                if (suggestAppliedDetailOne.hasOwnProperty("code")) {
                    $("#rationalizationAppliedCode_" + emlementId).text(window.Purchase.dealSpecial(suggestAppliedDetailOne.code));
                }
                if (suggestAppliedDetailOne.hasOwnProperty("applyTime")) {
                    $("#uploadAppliedDate_" + emlementId).text(window.Purchase.dealSpecial(suggestAppliedDetailOne.applyTime).split("T")[0]);
                }
            }
        },


        loadEventWorkAppliedHtml: function () {
            //添加数量显示
            if(window.Purchase.eventWorkApplied.hasOwnProperty("data")) {
                var sjlcdbNum = "事件审批" + "(" + window.Purchase.eventWorkApplied.data.length + ")";
            }else{
                var sjlcdbNum = "事件审批(0)";
            }
            $("#sjlcdbycls1").empty();
            $("#sjlcdbycls1").append(sjlcdbNum);

            if (window.Purchase.eventWorkApplied === "" || !window.Purchase.eventWorkApplied.hasOwnProperty("data")) {
                $("#eventWorkAppliedContent").empty();
                return;
            }
            var eventWorkAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.eventWorkApplied.data.length; i++) {
                pageCount++;
                var elementId = "";
                var eventWorkAppliedOne = window.Purchase.eventWorkApplied.data[i];
                if (eventWorkAppliedOne.hasOwnProperty("eventId")) {
                    elementId = eventWorkAppliedOne.eventId;
                } else {
                    elementId = i;
                }

                var eventWorkAppliedHtml = ' <li class="card" style="margin: 5px 2px;" id="eventWorkApplied_' + elementId + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        工单号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        录入人\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        录入人机构\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="problemAplId_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="inputAplPerson_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="inputAplAgency_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        主题\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        描述\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        申请时间\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="problemAplTheme_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="problemAplDesc_' + elementId + '" class="resizable eventWorkItemPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="applyAplTimer_' + elementId + '" class="resizable eventWorkItemPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage3.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + eventWorkAppliedOne.eventId + '" class="button button-fill eventWorkAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                eventWorkAppliedHtmls += eventWorkAppliedHtml;

            }
            $("#eventWorkAppliedContent").empty();
            $("#eventWorkAppliedContent").append(eventWorkAppliedHtmls);
        },
        loadEventWorkAppliedData: function () {
            if (window.Purchase.eventWorkApplied === "" || !window.Purchase.eventWorkApplied.hasOwnProperty("data")) {
                $("#eventWorkAppliedContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.eventWorkApplied.data.length; i++) {
                var purchaseDetail = window.Purchase.eventWorkApplied.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("eventId")) {
                    elementId = purchaseDetail.eventId;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("eventId")) {
                    $("#problemAplId_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.eventId));
                    //log("范德萨范德萨:"+$("#problemId_" + elementId));
                }
                if (purchaseDetail.hasOwnProperty("reporter")) {
                    $("#inputAplPerson_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.reporter));
                }
                if (purchaseDetail.hasOwnProperty("reporterDept")) {
                    $("#inputAplAgency_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.reporterDept));
                }
                if (purchaseDetail.hasOwnProperty("eventName")) {
                    $("#problemAplTheme_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.eventName));
                }
                if (purchaseDetail.hasOwnProperty("theme")) {
                    $("#problemAplDesc_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.theme));
                }
                if (purchaseDetail.hasOwnProperty("createTime")) {
                    $("#applyAplTimer_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.createTime).replace(/T/g, ' ').replace(/-/g, ''));
                }

            }
        },

        loadReimburseAppliedHtml: function () {
            //添加数量显示
            if(window.Purchase.reimburseApplied.hasOwnProperty("data")) {
                var bxdlcdbNum = "报销单审批" + "(" + window.Purchase.reimburseApplied.data.length + ")";
            }else{
                var bxdlcdbNum = "报销单审批(0)";
            }
            $("#bxdlcdbycls1").empty();
            $("#bxdlcdbycls1").append(bxdlcdbNum);

            if (window.Purchase.reimburseApplied === "" || !window.Purchase.reimburseApplied.hasOwnProperty("data")) {
                $("#reimburseAppliedContent").empty();
                return;
            }
            var reimburseAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.reimburseApplied.data.length; i++) {
                pageCount++;
                var elementId = "";
                var reimburseAppliedOne = window.Purchase.reimburseApplied.data[i];
                if (reimburseAppliedOne.hasOwnProperty("code")) {
                    elementId = reimburseAppliedOne.code;
                } else {
                    elementId = i;
                }
                var reimburseAppliedHtml = ' <li class="card" style="margin: 5px 2px;" id="reimburseApplied_' + elementId + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        报销单编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        报销单日期\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        报销单金额\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="rBursesId_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="rBursesDate_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="rBursesMoney_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        费用归属部门\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        费用归属人员\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        摘要\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="deptMoneyNames_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="deptPeopleNames_' + elementId + '" class="resizable reimbursePopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="themes_' + elementId + '" class="resizable reimbursePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage3.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + reimburseAppliedOne.code + '" class="button button-fill reimburseClassAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                reimburseAppliedHtmls += reimburseAppliedHtml;

            }

            $("#reimburseAppliedContent").empty();
            $("#reimburseAppliedContent").append(reimburseAppliedHtmls);
        },

        loadReimburseAppliedData: function () {
            if (window.Purchase.reimburseApplied === "" || !window.Purchase.reimburseApplied.hasOwnProperty("data")) {
                $("#reimburseAppliedContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.reimburseApplied.data.length; i++) {
                var purchaseDetail = window.Purchase.reimburseApplied.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("code")) {
                    elementId = purchaseDetail.code;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("code")) {
                    $("#rBursesId_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.code));
                    //log("范德萨范德萨:"+$("#problemId_" + elementId));
                }
                if (purchaseDetail.hasOwnProperty("bxdTime")) {
                    $("#rBursesDate_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.bxdTime).split("T")[0]);
                }
                if (purchaseDetail.hasOwnProperty("applyDeptName")) {
                    $("#deptMoneyNames_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.applyDeptName));
                }
                //if (purchaseDetail.hasOwnProperty("attachNum")) {
                //$("#rBurseMoney_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.attachNum));
                //}
                if (purchaseDetail.hasOwnProperty("bxdMoney")) {
                    $("#rBursesMoney_" + elementId).text(purchaseDetail.bxdMoney);
                }
                if (purchaseDetail.hasOwnProperty("deptUserName")) {
                    $("#deptPeopleNames_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.deptUserName));
                }
                if (purchaseDetail.hasOwnProperty("summary")) {
                    $("#themes_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.summary));
                }

            }
        },

        loadSalaryApprovedHtml: function () {
            //添加数量显示
            if(window.Purchase.salaryApprove.hasOwnProperty("data")) {
                var gzspdb = "工资审批" + "(" + window.Purchase.salaryApprove.data.length + ")";
            }else{
                var gzspdb = "工资审批(0)";
            }
            $("#gzspycl").empty();
            $("#gzspycl").append(gzspdb);

            if (window.Purchase.salaryApprove.data.length === "") {
                $("#salaryApprovedContent").empty();
                return;
            }
            var salaryApproveHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.salaryApprove.data.length; i++) {
                pageCount++;
                var elementId = "";
                var salaryApproveOne = window.Purchase.salaryApprove.data[i];
                if (salaryApproveOne.hasOwnProperty("id")) {
                    elementId = salaryApproveOne.id;
                } else {
                    elementId = i;
                }
                var salaryApproveHtml = ' <li class="card" style="margin: 5px 2px;" id="salaryApprove_' + salaryApproveOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        工资审批年月\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-100 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="month_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        工资项\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        在岗人员\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        离岗人员\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="finalSalary" class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;">实发工资</div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="finalSalary_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="lgFinalSalary_' + salaryApproveOne.id + '"  class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        离职递 <br/>延支付\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        退休本<br/>行补贴\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        退休人<br/>员年金\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '										<div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="lzFinalSalary_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="bankSubsidyFinalSalary_' + salaryApproveOne.id + '" class="resizable salaryApprovePopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-33 purchaseHomepage" >\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="annuityFinalSalary_' + salaryApproveOne.id + '"  class="resizable salaryApprovePopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage2.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + salaryApproveOne.processId + '_' + salaryApproveOne.id + '_' + salaryApproveOne.month +'_2" class="button button-fill salaryApprovedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                salaryApproveHtmls += salaryApproveHtml;
            }
            $("#salaryApprovedContent").empty();
            $("#salaryApprovedContent").append(salaryApproveHtmls);
        },
        loadSalaryApprovedData: function () {
            if (window.Purchase.salaryApprove.data.length === "") {
                $("#salaryApprovedContent").empty();
                return;
            }
            for (var i = 0; i < window.Purchase.salaryApprove.data.length; i++) {
                var purchaseDetail = window.Purchase.salaryApprove.data[i];
                var elementId = "";
                if (purchaseDetail.hasOwnProperty("id")) {
                    elementId = purchaseDetail.id;
                } else {
                    elementId = i;
                }
                if (purchaseDetail.hasOwnProperty("month")) {
                    $("#month_" + elementId).text(window.Purchase.dealSpecial(purchaseDetail.month));
                }
                if (purchaseDetail.hasOwnProperty("finalSalary")) {
                    $("#finalSalary_" + elementId).text(parseFloat(purchaseDetail.finalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("lgFinalSalary")) {
                    $("#lgFinalSalary_" + elementId).text(parseFloat(purchaseDetail.lgFinalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("lzFinalSalary")) {
                    $("#lzFinalSalary_" + elementId).text(parseFloat(purchaseDetail.lzFinalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("bankSubsidyFinalSalary")) {
                    $("#bankSubsidyFinalSalary_" + elementId).text(parseFloat(purchaseDetail.bankSubsidyFinalSalary).toFixed(2));
                }
                if (purchaseDetail.hasOwnProperty("annuityFinalSalary")) {
                    $("#annuityFinalSalary_" + elementId).text(parseFloat(purchaseDetail.annuityFinalSalary).toFixed(2));
                }
            }
        },

        /*loadCreditAppliedHtml: function () {
            //数量显示
            if(window.Purchase.creditApplied.hasOwnProperty("data")) {
                var xdspNum = "信贷审批" + "(" + window.Purchase.creditApplied.data.length + ")";
            }else{
                var xdspNum = "信贷审批(0)";
            }
            $("#xdspycl").empty();
            $("#xdspycl").append(xdspNum);

            if (window.Purchase.creditApplied.data.length=== "" ) {
                $("#creditAppliedContent").empty();
                return;
            }
            var creditAppliedHtmls = "";
            var pageCount = 0;
            for (var i = 0; i < window.Purchase.creditApplied.data.length; i++) {
                pageCount++;
                var emlementId = "";
                var creditAppliedOne = window.Purchase.creditApplied.data[i];
                if (creditAppliedOne.hasOwnProperty("id")) {
                    emlementId = creditAppliedOne.id;
                } else {
                    emlementId = i;
                }
                var creditAppliedHtml = ' <li class="card" style="margin: 5px 2px;" id="creditApplied_' + creditAppliedOne.id + '">\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        业务编号\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        客户编号\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="businessNumApplied_' + creditAppliedOne.id + '" class="resizable creditAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div  id="customerNumApplied_' + creditAppliedOne.id + '" class="resizable creditAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px;background-color: whitesmoke">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        客户名称\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        申请人贷款卡号\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-content">\n' +
                    '                                            <div class="card-content-inner" style="padding: 10px">\n' +
                    '                                                <div class="row">\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="clientApplied_' + creditAppliedOne.id + '" class="resizable creditAppliedPopover"  readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                    <div class="col-50 purchaseHomepage">\n' +
                    '                                                        <div class="item-input">\n' +
                    '                                                            <div id="cardNumApplied_' + creditAppliedOne.id + '" class="resizable creditAppliedPopover" readonly style="font-size: 14px;word-wrap:break-word;color:#505170;"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="card-footer myCardFooter" style="padding: 5px 15px 0px 0px ;">\n' +
                    '                                            <div style="width: 50px;height: 40px;position: relative;vertical-align:text-bottom;">\n' +
                    '                                                <img src="images/purchase/homePage/purchaseHomePage2.png" style="width: 44px;height: 36px;padding-top:4px;">' +
                    '                                                <div style="font-size: 16px;margin: 0px;padding: 0px 0px 0px 8px;bottom: 0px;color: white;position: absolute;">' + pageCount + '</div>\n' +
                    '                                            </div>\n' +
                    '                                            <a href="#" id="detail_' + creditAppliedOne.code + '" class="button button-fill creditAppliedClass" style="width:76px;">详情</a>\n' +
                    '                                        </div>' +
                    '                                    </li>';
                creditAppliedHtmls += creditAppliedHtml;
            }
            $("#creditAppliedContent").empty();
            $("#creditAppliedContent").append(creditAppliedHtmls);
        },
        loadCreditAppliedData: function () {
            if(window.Purchase.creditApplied.data.length=== ""){
                $("#creditAppliedContent").empty();
                return;
            }
            for (var i =0;i<window.Purchase.creditApplied.data.length;i++){
                var emlementId = "";
                var creditAppliedDetailOne = window.Purchase.creditApplied.data[i];
                if (creditAppliedDetailOne.hasOwnProperty("id")) {
                    emlementId = creditAppliedDetailOne.id;
                } else {
                    emlementId = i;
                }
                if (creditAppliedDetailOne.hasOwnProperty("suggestTitle")) {
                    $("#rationalizationAppliedTitle_" + emlementId).text(window.Purchase.dealSpecial(creditAppliedDetailOne.suggestTitle));
                }
                if (creditAppliedDetailOne.hasOwnProperty("code")) {
                    $("#rationalizationAppliedCode_" + emlementId).text(window.Purchase.dealSpecial(creditAppliedDetailOne.code));
                }
                if (creditAppliedDetailOne.hasOwnProperty("applyTime")) {
                    $("#uploadAppliedDate_" + emlementId).text(window.Purchase.dealSpecial(creditAppliedDetailOne.applyTime));
                }
            }
        },*/

        dealSpecial: function (str) {
            if(str === undefined || str == null){
                return '';
            }
            return str.replace(/null/g, '').replace(/&nbsp;/g, '');
        }
    };
    window.Purchase = new Purchase();
})();