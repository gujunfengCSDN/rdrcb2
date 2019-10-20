//常量枚举
(function () {
    "use strict";

    function Constants() {
        this.userCode = "";
        this.errorCode_0 = "-1";             //-1 非正常异常，需要log出errorMsg方便调试
        this.errorCode_100 = "100";          //100 通用操作的提示
        this.errorCode_101 = "101";          //101 账号在其他地方被登录
        this.errorCode_102 = "102";          //102 账号输入错误超过次数，锁定1小时
        this.errorCode_103 = "103";          //103 APP应用权限。用户无权限查看
        this.errorCode_104 = "104";          //104 没有查看简历的权限
        this.errorCode_105 = "105";          //105 登录设备非上次登录设备，需要手机验证
        this.errorCode_106 = "106";          //106 上次登录时间至当天已间隔超过30天，需要手机验证
        this.errorCode_107 = "107";          //107 首次登陆，需要手机验证
        this.processUrl = "";
        this.errorCodeTip = {
            "101": "账号在其他地方被登录",
            "102": "账号输入错误超过次数，锁定1小时",
            "103": "用户无权限查看",
            "104": "没有查看简历的权限",
            "105": "登录设备非上次登录设备，需要手机验证",
            "106": "上次登录时间至当天已间隔超过30天，需要手机验证",
            "107": "首次登陆，需要手机验证",
        };

        //应用存储名称
        this.AppSaveName = {
            AccountUserCode:"AccountUserCode",
            AccountName: "AccountName",
            AccountPwd: "AccountPwd",
            AccountToken: "AccountToken",
            AccountAutoToken: "AccountAutoToken",
            AccountAutoTokenChanging: "AccountAutoTokenChanging",
            AccountLastLoginTime: "AccountLastLoginTime",
            LoginData:"LoginData",
            DepartmentStr: "DepartmentStr",
            EmployeeStr: "EmployeeStr",
            SwitchState: "SwitchState",
            BiometrySwitchState:"BiometrySwitchState",
            GestureState: "GestureState",
            ServerIp: "ServerIp",
            BiometryType:"biometryType",
            LoginLastTime:"LoginLastTime",           //上次登录时间
            IsLoginSuccess:"IsLoginSuccess",
            StyleType:"StyleType",                            //样式类型1:白色。2:黑色
            EmailName:"EmailName",
            EmailPwd:"EmailPwd"
        };
        Object.freeze(this.AppSaveName);

        //指标类型：0:节点；1:表格;2:饼图;3:单值曲线图;31:多值曲线图;4:单值柱状图;41:多值柱状图;5:数值;6:仪表盘;7:面积图;8:条形图）
        this.ModuleType = {
            Node: "0",
            Table: "1",
            Pie: "2",
            LineOne: "3",
            LineMulti: "31",
            LineDynamic: "32",
            ColumnOne: "4",
            ColumnMulti: "41",
            Num: "5",
            GaugeBoard: "6",//速度仪
            Area: "7",
            Bar: "8",
            Compare: "9",        //比值
            PieSp: "10",         //环形图
            PieDouble: "11",      //双层饼
            StackBar: "12",       //堆叠条形图
            HistogramMixLine: "13", //柱状图和折线图混合图
            Pie3D: "14",//3d饼图
            HisMixLineNoReapt: "15", //柱状图和折线图（柱状图不堆叠）
            HisAndLineNoReapt: "22", //柱状图和折线图
            VariablePie: "16",//玫瑰图（可变宽度的环形图）
            PieGraph: "17",//扇形图
            Dashboard: "18",//仪表盘
            SingleDialDashboard: "19" ,//单刻度仪表盘
            Solidgauge:"23",//活动图图
            StackColumn:"24",//堆叠柱状图
            Pyramid:"25" ,//金字塔图
            Areaspline:"26",//曲线面积图
            Column3D:"21",//3d柱状图

            GaugeBoardDetal: "27",//速度仪详细
        };
        Object.freeze(this.ModuleType);

        //页面名称
        this.PageName = {
            CommonModel: "commonModel",
            DlRealTime: "dlRealTime",
            IndexPage1: "index-1",
            IndexPage2: "index-2",
            IndexPage3: "index-3",
            IndexPage4: "index-4",
            Portal: "portal",
            SettingDataPage: "settingDataPage",
            Login: "login-screen",
            MpaModel: "mpaModel",
            CollectModel: "collectModel",
            PersonnelInfo: "personnelInfo",
            Person: "person",
            AutoCompleteRadio: "autocomplete-radio",
            WorkToDo : "purchase",
            PurchaseDetail: "procurementDetail",
            CirculationLog: "circulationLogInfo",
            DlRealTimeCommon: "dlRealTimeCommon",
            CommonDlRealTime : "commonDlRealTime",
            SuperviseDetail:"superviseDetail",
            CirculationLogForDCDBInfo:"circulationLogForDCDBInfo",
            SuggestionDetail:"suggestionDetail",
            CirculationLogForSuggestionInfo:"circulationLogForSuggestionInfo",
            SuperviseAddress:"superviseAddress",
            SuggestionAdress:"suggestionAdress",
            CreditDetail:"creditDetail",
            CirculationLogForDepositRate:"circulationLogForDepositRateInfo",
            DepositRateAddress:"depositRateAdress",
            DepositRateDetail:"depositRateDetail",
            LccpDetail:"lccpDetail",
            CirculationLogForLccp:"circulationLogForLccpInfo",
            DealWorkList:"dealWorkList",
            Adress:"adress",     //采购选人页面
            LoanTrialMeeting:"loanTrialMeeting",     //贷审会页面
            LoanTrialMeetingListInfo:"loanTrialMeetingListInfo",     //贷审会列表页面
            DshNextDetailList:"dshNextDetailList",     //贷审会集团公司页面
            ShowPhotos:"showPhotosDetail",     //贷审会客户详情页面
            BankMeetDetail:"bankMeetDetail",     //行办会详情页面
            DirectorMeetDetail:"directorMeetDetail" ,    //董办会详情页面
            BigDepositDetail:"bigdepositDetail",
            SealDetail:"sealDetail",    // 用印审批详情页面
            CirculationLogForSealInfo:"circulationLogForSealInfo",    // 用印审批流转日志页面
            SealAddress:"sealAddress",    // 用印审批指派页面
            SpRateInfoQueryDetail:"SpRateInfoQueryDetail"   //服务价格审批
        };
        Object.freeze(this.PageName);

        //协议名称
        this.HttpReqName = {
            AppLogin: "appLoginBySSO",        //登录
            AppLoginWithoutLogin: "appLoginWithoutLogin",    //免密登录
            GetAndroidVersion: "appModel/getAndriodVersion",       //获取安卓和ios版本信息
            SendSms: "sendSms",
            DelUserLoginDevice: "appManage/protocol/appUserLoginDevice/delUserLoginDevice",
            RegisterPushToken:"push/registerPushToken",
            NullifyPushToken:"push/nullifyPushToken",
            GetYZM:"getYZM",
            ForgetPwd:"forgetPwd",
            getMailInfo:"getMailInfo",
            SaveCzjl:"appManage/userCZJL/saveCzjl",
            SaveUserAction:"appManage/userAction/saveUserAction",
            SubmitUserAdvice:"sysUser/userAdvice/submitUserAdvice"
        };
        Object.freeze(this.HttpReqName);

        this.StatusBarColor = {
            White: "#ffffff",
            Login: "#ffffff",
            AndroidColor1: "#afafaf",
            iosBlackColor:"#515368",
            iosToDoWhite:"#f0eff5",
            iosPortalWhite:"#ffffff"

        };
        Object.freeze(this.StatusBarColor);

        this.CardTemplateType = {
            Template1:"Template1"
        };
        Object.freeze(this.CardTemplateType);
        //http head前置
        this.serverReqConstant = {
            getDoneDbhMeetingsByCodeLimit:10, //获取已办会议列表数量限制
            serviceCnlTp:"02060000", //渠道类型
            serviceCnsmrSysId:"101100", //消费方系统编号
            serviceFileFlg:"0", //标识
            /**消费方系统编号*/
            CNSMR_SYS_ID : "101100",
            //查询服务
            QUERY_SERVER:"50013000009",
            //处理流程（提交，否决，退回）服务
            DEAL_SERVER:"50012000005",
            //SvcScn
            SVC_SCN01:"01",
            SVC_SCN02:"02",
            SVC_SCN03:"03",
            SVC_SCN04:"04",
            SVC_SCN05:"05",
            SVC_SCN06:"06",
            SVC_SCN07:"07",
            SVC_SCN08:"08",
            SVC_SCN09:"09",
            SVC_SCN10:"10"

        };

        //ws和http接口名称
        this.reqID = {

            //移动oa培训及会议
            unreadNoticeTZ: "unreadNoticeTZ",//未阅会议通知
            readNoticeTZ: "readNoticeTZ",//已阅会议通知
            getEntityByProcessInstID:"getEntityByProcessInstID",//查看详情接口
            readStatusTZ: "readStatusTZ", //修改会议阅读状态
            unreadNoticeGG: "unreadNoticeGG",//查询未阅公告
            readNoticeGG: "readNoticeGG",//查询已阅公告
            readStatusGG: "readStatusGG",//修改公告阅读状态
            getRoutineByAssEmpCode: "getRoutineByAssEmpCode",//我的交办列表查询

            //待阅及已阅
            unread4dy:"unread4dy", //查看待阅列表
            downloadFileList:"dfmsDownloadFileList",//下载附件
            read4dy:"read4dy", //查看已阅列表
            oaCursor: "oaCursor",//查询代办
            // getEntityByProcessInstID: "getEntityByProcessInstID",//根据流程实例id查询实体信息
            queryWorkitemsByProcid: "queryWorkitemsByProcid",//根据流程实例id查询所有工作项
            getworkflowByProcessInstID: "getworkflowByProcessInstID",//根据流程实例ID查询缓存信息
            getApprovalOpinionByEmpCode: "getApprovalOpinionByEmpCode",

            oaSelectUserName:"oaSelectUserName",
            oaSelectUserInfo:"oaSelectUserInfo",


            //交办
            sign4bmfzrRountineProcess:"sign4bmfzrRountineProcess",
            doworkRountineProcess:"doworkRountineProcess",
            check4bmfzrRountineProcess:"check4bmfzrRountineProcess",
            check4jbrRountineProcess:"check4jbrRountineProcess",
            //科函
            checkLetter4Bmglc:"checkLetter4Bmglc",
            checkLetter4Yjbmhq:"checkLetter4Yjbmhq",
            //收文
            checkReceive4Bgszr:"checkReceive4Bgszr",
            checkReceive4Zbld:"checkReceive4Zbld",
            checkReceive4Swglgagain:"checkReceive4Swglgagain",
            checkReceive4Ldps:"checkReceive4Ldps",
            //消息公告
            checkNotice4ManagerLeader:"checkNotice4ManagerLeader",
            //会议通知部门负责人审批
            checkBankmeeting4Bmglc: "checkBankmeeting4Bmglc",
            //发文
            check4bmglcDispatchProcess:"check4bmglcDispatchProcess",
            check4flswgDispatchProcess:"check4flswgDispatchProcess",
            check4flhgbDispatchProcess:"check4flhgbDispatchProcess",
            check4yjbmhqDispatchProcess:"check4yjbmhqDispatchProcess",
            check4secreatyDispatchProcess:"check4secreatyDispatchProcess",
            check4bgsleaderDispatchProcess:"check4bgsleaderDispatchProcess",
            check4fgldDispatchProcess:"check4fgldDispatchProcess",
            check4signDispatchProcess:"check4signDispatchProcess",
            rejectSaveDispatchProces:"DispatchProces",//驳回
            dfmsDownloadFileList: "dfmsDownloadFileList",//获取下载文件列表

            // getEntityByProcessInstID: "getEntityByProcessInstID",
        };
        Object.freeze(this.reqID);

        this.fileLoad = {
            encode: "1",
            //会议与通知
            bankMeeting:{
                originType: "oa",
                originValue: "bankmeeting",
            },
            //公告
            notice:{
                originType: "oa",
                originValue: "notice",
            },
            //发文
            dispatch:{
                originType: "oa",
                originValue: "dispatch",
            },
            //收文
            receive:{
                originType: "oa",
                originValue: "receive",
            },
            //交办
            routine:{
                originType: "oa",
                originValue: "routine",
            },
        };
        Object.freeze(this.fileLoad);
    }

    Constants.prototype = {
        initConstants: function () {
        },

    };


    window.Constants = new Constants();
})();

