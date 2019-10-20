//平台首页
(function () {
    "use strict";

    function Portal() {
        this.portalView = null;
        this.getvailateCodeFlag = false;
        this.subKeyPad = null;
        this.lastDoSafeKeyPadTime = 0;
        this.isloginClick = false;
        this.reloadCb = null;
        //只能平台页面使用
        this.serverStatus = null;       //服务器额外信息
        this.jsonAppRight = "";         //应用权限json
        this.unreadChat = 0;
        this.unreadTodo = 0;
        this.unreaddsh = 0;
        this.flag = "1"; //1-有更新 2-最新版
        this.state = "";
        this.version = "";
        this.url = "";
        this.urlIOS = "";
       this.versionIos="";
        this.updateDesc = "";
        this.updateDescIos = "";

    }

    Portal.prototype = {
        initPortal: function () {

            AppOp.setAppData(Constants.AppSaveName.IsLoginSuccess, "0");
            AppOp.setAppData(Constants.AppSaveName.AccountAutoTokenChanging, "false");

            if (isFormalService) {
                NetManager.setServerIp(NetManager.getIPFormal());
            } else {
                AppOp.getAppData(Constants.AppSaveName.ServerIp,function(val){
                    if(val !== undefined && val !== ""){
                        NetManager.setServerIp(val);
                    }else{
                        NetManager.setServerIp(NetManager.getIPTestFormal());
                    }
                });
            }
            this.initPortalHtml();
            this.regEventPortal();
            this.startLogin();

        },
        //初始化页面信息
        initPortalHtml: function () {
            //初始化
            this.portalView = myApp.addView('#rootView', {
                swipeBackPage: false,
                domCache: true,
                dynamicNavbar: true
            });

            $("#sidePor").height($("#sidePor").width() * 61 / 390);
            $("#bgPor").height($("#bgPor").width() * 157 / 477);
            var innerHeight = window.innerHeight - 44;
            $("#sideIconP").width($("#sideIconP").height() * 286 / 40);
            $("#pageInfo").height(innerHeight - $("#ad1").height());
            var hi = ($("#pageInfo").height() - $("#appInfo").height() - 40 - 14) / 2;
            $("#textInfo").css("paddingTop", hi + "px");


        },
        regEventPortal: function () {
            //注册事件
            myApp.onPageAfterAnimation('login-screen', this.onPageInitLoginScreen);
            myApp.onPageAfterAnimation('versionInfoPage', this.onPageVersionInfo);
            myApp.onPageAfterAnimation('feedbackViewPage',this.onPagefeedbackView);
            //注册点击事件
            // $("#divApp_1").click(this.onClickApp1);
            //
            // $("#divApp_dls").click(this.onClickAppdls);

            $(".sideIcon").click(function () {
                AppOp.openSideMenu();
            });

            Common.addCommonEvent("portal", "onActive", function () {

                var self = window.Portal;
                var portalView = window.Portal.portalView;

                if(isIos){
                        AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                        AppOp.setAppBackgroundColor(Constants.StatusBarColor.iosPortalWhite);
                }
                if (portalView !== undefined && portalView.activePage !== undefined) {
                    if (portalView.activePage.name === Constants.PageName.Login) {
                        // self.doSafeKeyPad();
                    } else {
                        window.AppOp.getAppData(Constants.AppSaveName.IsLoginSuccess, function (IsLoginSuccess) {
                            if(IsLoginSuccess === "0"){
                                return;
                            }
                            // self.checkDsh();
                            // self.checkToDo();
                            // self.checkChart();
                        });
                    }
                }
            });

            $(document).on("click", "#checkVersion", function () {
                //myApp.alert("当前已是最新版本", "提示");
                if(self.state==="1"){
                    if(self.flag==="1"){
                        myApp.alert("当前已是最新版本", "提示");
                        return;
                    }else{
                        window.AppOp.updateApk(self.version, self.updateDesc,self.url);
                    }
                }else if(self.state==="2"){
                    if(self.flag==="1"){
                        myApp.alert("当前已是最新版本", "提示");
                        return;
                    }else{
                        window.AppOp.update(self.versionIos, self.updateDescIos,self.urlIOS);
                    }
                }
            });
        },
        //开始登陆流程
        startLogin: function () {
            var self = window.Portal;
            //1.需要获取维护中的服务器额外信息 NetManager.requestServerStatusByJsonP
            // NetManager.requestServerStatusByJsonP(function (data) {
            //     self.serverStatus = data;
            //     // data.SERVER_UPDATE_FLAG 1 服务器运行中 0 服务器维护中
            //     if (data["SERVER_UPDATE_FLAG"] === "1") {
                    //判断是否需要指纹登录，还是密码登录
                    if (isPc) {
                        window.Portal.openLoginPage();
                    } else {
                        AppOp.getAppData(Constants.AppSaveName.BiometryType,function(biometryType){
                            if(biometryType ==="touchID" || biometryType ==="faceID"){
                                AppOp.getAppData(Constants.AppSaveName.BiometrySwitchState, function (val) {
                                    if (val === "true") {
                                        //需要指纹登录
                                        //判断有存用户密码
                                        AppOp.getAppData(Constants.AppSaveName.AccountAutoToken, function (autoToken) {
                                            if (autoToken !== "0" && autoToken !== "") {
                                                // // 如果上次登录的时间距离现在超过一定时间（比如2天），则不要触发：gestureLock，而是让用户输入用户名和密码登录。
                                                // AppOp.getAppData("loginLastTime", function (loginLastTime) {
                                                //     loginLastTime = parseInt(loginLastTime);
                                                //     // if (new Date().getTime() - loginLastTime < 2 * 24 * 3600 * 1000) {
                                                //     var now = new Date().getTime();
                                                //     if (now - loginLastTime < 10 * 60 * 1000) {
                                                //         window.AppOp.setAppData("touchLastTime",now.toString());
                                                //         AppOp.gestureLock("gestureLockForgetCbWhenLogin", "gestureLockSuccessCbWhenLogin");
                                                //     } else {
                                                //
                                                //         window.Portal.openLoginPage();
                                                //     }
                                                // }
                                                window.AppOp.setAppData("touchLastTime",new Date().getTime().toString());
                                                AppOp.gestureLock("gestureLockForgetCbWhenLogin", "gestureLockSuccessCbWhenLogin");
                                            } else {
                                                window.Portal.openLoginPage();
                                            }
                                        });
                                    } else {
                                        window.Portal.tryDoLoginAutoWhenCloseGesture();
                                    }
                                });
                            }else{
                                window.Portal.tryDoLoginAutoWhenCloseGesture();
                            }
                        });
                    }
                // } else {
                //     //服务器维护中
                //     window.Portal.openLoginPage();
                // }
            // }, function (jqXHR, textStatus, errorThrown) {
            //     if(jqXHR.readyState === 4 && jqXHR.status === 404 && jqXHR.statusText === "error" && textStatus === "error" && errorThrown === "error"){
            //         self.reloadCb = function(){
            //             //提示网络异常，隐藏登录按钮，显示重新加载按钮
            //             $("#btnLogin").hide();
            //             $("#btnReload").show();
            //             $("#ts").text("网络状态有待提升，点击下面按钮重试");
            //             $("#ts").css("display", "block");
            //         }
            //     }
            //     //服务器维护中
            //     window.Portal.openLoginPage();
            // });
        },
        //未开启指纹登录时，尝试自动登录（已经登录过一次后，如果token未失效，可以自动登录）
        tryDoLoginAutoWhenCloseGesture:function(){
            AppOp.getAppData(Constants.AppSaveName.AccountAutoToken, function (autoToken) {
                if (autoToken !== "0" && autoToken !== "") {
                    gestureLockSuccessCbWhenLogin();
                } else {
                    window.Portal.openLoginPage();
                }
            });
        },
        //打开登录页面
        openLoginPage: function () {
            window.Portal.portalView.router.loadPage("content/login.html");
            $("#toolbar").hide();
            //window.Portal.portalView.router.loadPage("content/login.html");
        },
        //检测版本更新
        checkVersionUpdate: function () {
            //监测是否要更新版本
            if (isPc) {
                return;
            }
            NetManager.httpReq(Constants.HttpReqName.GetAndroidVersion, {}, function (data) {
                if (myApp.device.android) {
                    var version = data.VERSION;
                    var updateDesc = data.UPDATE_DESC;
                    var url = data.URL;         //安卓更新apk的下载地址
                    if(pad.toString() === "true"){
                        version = data.VERSION_PAD;
                        updateDesc = data.UPDATE_DESC_PAD;
                        url = data.URL_PAD;
                    }
                    if(version !== undefined && updateDesc !== undefined && url !== undefined){
                        window.AppOp.updateApk(version, updateDesc,url);
                    }
                } else if (myApp.device.ios) {
                    var versionIos = data.VERSION_IOS;
                    var updateDescIos = data.UPDATE_DESC_IOS;
                    var urlIOS = data.URL_IOS;
                    if(versionIos !== undefined && updateDescIos !== undefined && urlIOS !== undefined){
                        window.AppOp.update(versionIos, updateDescIos,urlIOS);
                    }
                }
            }, function () {
            });
        },
        //登录界面打开后
        onPageInitLoginScreen: function (page) {
            var self = window.Portal;
            $("#btnReload").hide();
            $("#btnLogin").show();

            AppOp.hideLoading();
            self.checkVersionUpdate();
            AppOp.getAppData("localHtml5", function (value) {
                if (value === "false") {
                    myApp.alert("开发与调试模式");
                }
            });

            //测试服显示服务器列表
            if (!isFormalService) {
                $("#serverSelect").show();
            }
            AppOp.getAppData(Constants.AppSaveName.BiometryType,function(biometryType){
                if(biometryType ==="touchID" || biometryType ==="faceID"){
                    window.AppOp.getAppData(Constants.AppSaveName.BiometrySwitchState, function (val) {
                        if (val === "true") {
                            AppOp.getAppData(Constants.AppSaveName.AccountAutoToken, function (autoToken) {
                                if (autoToken !== "0" && autoToken !== "") {
                                    if(biometryType ==="faceID"){
                                        $("#btnFingerPrint").text("使用面容登录")
                                    }else if(biometryType ==="touchID"){
                                        $("#btnFingerPrint").text("使用指纹登录")
                                    }
                                    $("#btnFingerPrint").show();
                                }else{
                                    $("#btnFingerPrint").hide();
                                }
                            });
                        }else{
                            $("#btnFingerPrint").hide();
                        }
                    });
                }else{
                    $("#btnFingerPrint").hide();
                }
            });
            AppOp.setStatusBarColor(Constants.StatusBarColor.Login);

            if (self.serverStatus && self.serverStatus["SERVER_UPDATE_FLAG"] === "1") {
                $("#ts").text("系统正在维护中");
                $("#ts").css("display", "block");
            } else {
                $("#ts").css("display", "none");
            }
            //安全键盘
            // window.Portal.safeKeyPad();


            setTimeout(function () {
                $("#loginDiv").height($(window).height());
            }, 333);

            if (isApp && myApp.device.android === true) {
                var innerHeight;
                var checkInnerHeightTimer;
                var checkInnerHeight = function () {
                    if (window.innerHeight > (innerHeight + 10)) {
                        $("#loginDiv").css("bottom", "0px");
                        $("#loginDiv").height($(window).height());
                        clearInterval(checkInnerHeightTimer);
                    }
                };
                var startCheck = function () {
                    //alert("startCheck");
                    setTimeout(function () {
                        innerHeight = window.innerHeight;
                        clearInterval(checkInnerHeightTimer);
                        checkInnerHeightTimer = setInterval(checkInnerHeight, 200);
                    }, 1200);
                };
                $("#loginName").focus(function () {
                    // $("#loginName").css("background-color","#FFFFCC");
                    $("#loginDiv").css("bottom", "50px");
                    startCheck();
                });
                $("#loginName").blur(function () {
                    // $("#loginName").css("background-color","#D6D6FF");
                    $("#loginDiv").css("bottom", "0px");
                    $("#loginDiv").height($(window).height());
                    clearInterval(checkInnerHeightTimer);
                });
                $("#loginPass").focus(function () {
                    // $("#loginPass").css("background-color","#FFFFCC");
                    $("#loginDiv").css("bottom", "150px");
                    startCheck();
                });
                $("#loginPass").blur(function () {
                    // $("#loginPass").css("background-color","#D6D6FF");
                    $("#loginDiv").css("bottom", "0px");
                    $("#loginDiv").height($(window).height());
                    clearInterval(checkInnerHeightTimer);
                });
                $("#loginYZM").focus(function () {
                    // $("#loginName").css("background-color","#FFFFCC");
                    $("#loginDiv").css("bottom", "150px");
                    // myApp.alert( $("#loginDiv").css("bottom"));
                    startCheck();
                });
                $("#loginYZM").blur(function () {
                    // $("#loginName").css("background-color","#D6D6FF");
                    $("#loginDiv").css("bottom", "0px");
                    $("#loginDiv").height($(window).height());
                    clearInterval(checkInnerHeightTimer);
                });
            }

            var pageContainer = $(page.container);
            var btnLogin = $("#btnLogin");
            var btnForget = $("#btnForget");


            $("#sidelog").height($("#sidelog").width() * 47 / 337);
            // $("#bglog").height($("#bglog").width() * 323 / 888);
            $("#yzmImage").height($("#yzmImage").width() * 28 / 80);
            var mleft = $("#loginName").css("marginLeft")
            $("#loginYZM").css("marginLeft", mleft);
            $(".ccsk-input").css("marginLeft", mleft);
            if (!isApp) {
                var AccountName = $.cookie(Constants.AppSaveName.AccountName);
                // var pwd = $.cookie(Constants.AppSaveName.AccountPwd);
                $("#loginName").val(AccountName);
                // $("#loginPass").val(pwd);
            } else {
                AppOp.getAppData(Constants.AppSaveName.AccountName, function (val) {
                    if (val !== undefined && val !== "" && val !== null) {
                        $("#loginName").val(val);
                    }
                });
                // AppOp.getAppData(Constants.AppSaveName.AccountPwd,function(val){
                //     if(val !== undefined && val !== "" && val !== null){
                //         $("#loginPass").val(val);
                //     }
                // });
            }

            if(self.reloadCb !== null){
                self.reloadCb();
                self.reloadCb = null;
            }
            $("#btnReload").on('click',function(){
                //重新登录
                if(isApp){
                    AppOp.reload();
                }else{
                    window.location.href = Common.getUrlBase() + "portal.html";
                }
            });

            $("#btnFingerPrint").on('click',function () {
                self.portalView.router.back();
                $("#toolbar").show();
                AppOp.gestureLock("gestureLockForgetCbWhenLogin", "gestureLockSuccessCbWhenLogin");
            });
            $("#btnYZM").on('click', function () {
                var self = window.Portal;
                var userId = $("#loginName").val();
                if (userId === undefined || userId === "") {
                    myApp.alert("请输入用户名", "登录");
                    return;
                }

                if (self.getvailateCodeFlag === true) {
                    myApp.alert("验证码发送中,请勿重复点击", "登录");
                    return;
                } else {
                    self.getvailateCodeFlag = true;
                }

                var data1 = {userId: userId};
                NetManager.httpReq(Constants.HttpReqName.SendSms, data1, function (data) {

                    var djs = 59;
                    $("#djs").css("display", "block");
                    $("#btnYZM").css("display", "none");
                    $("#yzmDiv").css("padding-top", "0px");
                    var xh = setInterval(function () {
                        $("#djsSpan").text("重发" + djs + "");
                        djs--;
                    }, 1000)
                    setTimeout(function () {
                        $("#djs").css("display", "none");
                        $("#btnYZM").css("display", "block");
                        $("#yzmDiv").css("padding-top", "10px");
                        clearInterval(xh);
                        self.getvailateCodeFlag = false;
                        $("#djsSpan").text("重发60");
                    }, 60000)

                }, function (data) {
                    self.getvailateCodeFlag = false;
                    // myApp.alert(data,"登录");//error deal
                });
            });

            // $("#btnTest").click(function () {
            //     window.Portal.doLoginAuto();
            // });

            //点击登录按钮
            btnLogin.on('click', function () {
                if (self.isloginClick === true) {
                    return;
                }
                // if(isFormalService === false){
                //     //设置登录服务器ip信息
                //     var selectIp = $("#serverIp").val();
                //     if(selectIp === "test"){
                //         NetManager.setServerIp(NetManager.getIPTest());
                //     }else if(selectIp === "testFormal"){
                //         NetManager.setServerIp(NetManager.getIPTestFormal());
                //     }
                // }

                var userId = $("#loginName").val();
                var vailateCode = $("#loginYZM").val();
                if ($("#yzm").css("display") === "block" && vailateCode === "") {
                    myApp.alert("请输入验证码", "登录");
                    return;
                }
                var userPwd = $("#PasswordS2").val();
                if (userPwd === undefined || userPwd === "") {
                    myApp.alert("请输入密码", "登录");
                    return;
                }

                self.doLogin(userId, userPwd);

            });

            //忘记密码
            btnForget.on('click', function () {
                var userId = $("#loginName").val();//获取用户名
                if(isFormalService === false){
                    //设置登录服务器ip信息
                    var selectIp = $("#serverIp").val();
                    if(selectIp === "test"){
                        NetManager.setServerIp(NetManager.getIPTest());
                    }else if(selectIp === "testFormal"){
                        NetManager.setServerIp(NetManager.getIPTestFormal());
                    }
                }
                self.doLoginForget(userId);
            });

        },



        onPageVersionInfo : function(){

            NetManager.httpReq(Constants.HttpReqName.GetAndroidVersion, {}, function (data) {
                if (myApp.device.android) {
                    if(pad.toString() === "true"){
                        $("#version").text(appVersion);
                        self.state = "1";
                        self.version = parseInt(data.VERSION_PAD);
                        self.updateDesc = data.UPDATE_DESC_PAD;
                        self.url = data.URL_PAD;
                    }else {
                        $("#version").text(appVersion);
                        self.state = "1";
                        self.version = parseInt(data.VERSION);
                        self.updateDesc = data.UPDATE_DESC;
                        self.url = data.URL;
                    }
                    //获取前端版本号，判断app版本号与服务器是否一致
                    if (parseInt(appVersionCode) < self.version) {
                        $("#showdetail").css("display","block");
                        self.flag="2";
                    }else{
                        $("#showdetail2").css("display","block");
                        self.flag="1";
                    }
                }else if (myApp.device.ios) {
                    $("#version").text(appVersion);
                    self.state="2";
                    self.versionIos = parseInt(data.VERSION_IOS);
                    self.updateDescIos = data.UPDATE_DESC_IOS;
                    self.urlIOS = data.URL_IOS;
                    //获取前端版本号，判断app版本号与服务器是否一致
                    if (parseInt(appVersionCode)<self.versionIos) {
                        $("#showdetail").css("display","block");
                        self.flag="2";
                    }else{
                        $("#showdetail2").css("display","block");
                        self.flag="1";
                    }
                }
            }, function () {
            });
            // $(document).on("click", "#checkVersion", function () {
            // // $("#checkVersion").on('click', function () {
            //     if(state==="1"){
            //         if(flag==="1"){
            //             myApp.alert("当前已是最新版本", "提示");
            //             return;
            //         }else{
            //             window.AppOp.updateApk(version, updateDesc);
            //         }
            //     }else if(state==="2"){
            //         if(flag==="1"){
            //             myApp.alert("当前已是最新版本", "提示");
            //             return;
            //         }else{
            //             window.AppOp.update(versionIos, updateDescIos);
            //         }
            //     }
            //     //获取公共字典版本号
            //     //获取当前客户端版本号
            //     //如果版本号一致,则提示已是最新版本,否则提示更新
            //
            // });
        },


        onPagefeedbackView:function(){

            $("#submitPhopo").on('click', function () {
                AppOp.updateHeadImage();
            });

            $("#submitAdvice").on('click', function () {
                var advice = $("#advice").val();
                if(advice=== undefined || advice === ""){
                    myApp.alert("建议不能为空","提示");
                    return;
                }

                //获取图片
                var phone1 = $("#phone1").val();
                var phone2 = $("#phone2").val();
                var phone3 = $("#phone3").val();
                //获取用户id
                var userId="";
                AppOp.getAppData(Constants.AppSaveName.AccountName, function (val) {
                    if (val !== undefined && val !== "" && val !== null) {
                        userId = val;
                    }
                });
                //存入数据库
                var data1 = {};
                data1.userId = userId;
                data1.content = advice;
                //data1.phone1 = phone1;
                //data1.phone2 = phone2;
                //data1.phone3 = phone3;
                NetManager.httpReq(Constants.HttpReqName.SubmitUserAdvice, data1, function (data) {
                    if (data==="1") {
                        myApp.alert("建议提交成功", "提示");
                        window.Portal.portalView.router.back();
                    }
                }),function(){

                }
            })

        },



        doLoginAuto: function () {
            var self = window.Portal;
            AppOp.getAppData(Constants.AppSaveName.AccountName, function (userId) {
                if(userId === ""){
                    myApp.alert("userId为空");
                    self.openLoginPage();
                    return;
                }
                // AppOp.getAppData(Constants.AppSaveName.AccountAutoToken, function (autoToken) {
                    NetManager.httpReq(Constants.HttpReqName.AppLoginWithoutLogin, {
                        userId: userId,
                        // autoToken: autoToken,
                        // versionId:appVersion,
                        // tokenType:pad.toString()==="true"?"1":"0"
                    }, function (data) {
                        log("指纹登陆显示"+ JSON.stringify(data,null,4));
                        //app入口权限配置
                        // 管理驾驶舱：MBI，人事查询：PM，待办事项权限：Schedule
                       // data.rightInfo = JSON.stringify({"MBI":"1","PM":"1","Schedule":"1","Performance":"1","Chat":"1"});
                       //  self.jsonAppRight = data.rightInfo;
                        self.currUserId = data.loginCode;
                        // AppOp.setAppData("appRight", JSON.stringify(data.rightInfo));

                        AppOp.setAppData(Constants.AppSaveName.AccountName, data.loginCode);
                        // AppOp.setAppData(Constants.AppSaveName.AccountAutoToken, data.autoToken);
                        // AppOp.setAppData(Constants.AppSaveName.AccountToken, data.token);
                        /*var jsonData = {};
                        jsonData.userName = data.userId;
                        window.NetManager.requestServer(window.NetManager.processBankLocal,jsonData,function (cb) {
                            log("登陆接口返回数据"+JSON.stringify(cb,null,4));
                            window.Portal.processData = cb;
                            //AppOp.setAppData(window.Constants.processUrl,cb);
                            if(self.processData.count >0){
                                $("#processBankTodoNum").text(self.processData.count);
                                $("#imgProcessBank").show();
                            }
                        });*/
                        var timeStr = new Date().getTime().toString();
                        AppOp.setAppData("loginLastTime", timeStr);

                        if (myApp.device.ios) {
                            AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                        } else {
                            AppOp.setStatusBarColor(Constants.StatusBarColor.AndroidColor1);
                        }
                        AppOp.hideLoading();
                        AppOp.setAppData(Constants.AppSaveName.IsLoginSuccess, "1");
                        self.checkVersionUpdate();

                        //IOS推送注册
                        self.regIOSPush(data.token);

                    }, function (data) {
                        AppOp.hideLoading();
                        myApp.alert("doLoginAuto errorDesc："+data.errorDesc+" errorCode:"+data.errorCode);
                        window.AppOp.setAppData(Constants.AppSaveName.IsLoginSuccess, "0");
                        window.AppOp.setAppData(Constants.AppSaveName.AccountAutoTokenChanging, "false");
                        window.AppOp.setAppData(Constants.AppSaveName.AccountToken, "0");
                        window.AppOp.setAppData(Constants.AppSaveName.AccountAutoToken, "0");
                        window.AppOp.needLogout();
                        window.AppOp.setStatusBarColor(Constants.StatusBarColor.Login);
                        window.AppOp.reload();
                        // self.openLoginPage();
                    });
                });
            // });
        },
        doLogin: function (userId, userPwd) {
            // myApp.alert("doLogin AccountPwd:"+userPwd.length);
            var self = window.Portal;
            self.isloginClick = true;
            var btnLogin = $("#btnLogin");
            btnLogin.text("登录中");

            var userData = {user: {loginCode: userId, password: userPwd}};

            AppOp.setAppData(Constants.AppSaveName.AccountUserCode, userId);
            AppOp.setAppData(Constants.AppSaveName.AccountPwd, userPwd);
            // alert("1:"+JSON.stringify(data));
            NetManager.httpReq("appLogin/appLogin", userData, function (data) {
                log("密码登陆显示"+ JSON.stringify(data,null,4));
                self.currUserId = data.loginCode;
                //app入口权限配置

                AppOp.setAppData(Constants.AppSaveName.AccountName, data.loginCode);
                AppOp.getAppData(Constants.AppSaveName.AccountName,function (fuc) {
                    window.Constants.userCode = fuc;
                });
                // window.Constants.userCode = data.loginCode;
                // AppOp.setAppData(Constants.AppSaveName.AccountToken, data.token);
                // AppOp.setAppData(Constants.AppSaveName.AccountAutoToken, data.autoToken);
                var timeStr = new Date().getTime().toString();
                AppOp.setAppData("loginLastTime", timeStr);

                self.portalView.router.back();
                $("#toolbar").show();
                $("#main_navbar_title1").show();
                myApp.sizeNavbars("#view-1");
                window.IndexController.init();
                AppOp.hideLoading();
                if (myApp.device.ios) {
                    AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                } else {
                    AppOp.setStatusBarColor(Constants.StatusBarColor.AndroidColor1);
                }
                AppOp.setAppData(Constants.AppSaveName.IsLoginSuccess, "1");

                //IOS推送注册
                self.regIOSPush(data.token);

            }, function (data) {
                $("#btnLogin").text("登录");
                self.isloginClick = false;
                if (data.errorCode === Constants.errorCode_105 || data.errorCode === Constants.errorCode_106 || data.errorCode === Constants.errorCode_107) {
                    $("#ts").text("点击获取验证码，发送验证码到手机");
                    $("#ts").css("display", "block");
                    $("#yzm").css("display", "block");
                }
            });
        },
        doLoginForget: function (userId) {
            var url = "content/pswForget.html?userId=" + userId;
            window.Portal.portalView.router.loadPage(url);
        },
        safeKeyPad: function () {
            var self = this;
            // $.ccsk_ready(self.doSafeKeyPad);
        },
        // doSafeKeyPad: function () {
        //     var self = window.Portal;
        //     var now = new Date().getTime();
        //     if (now - self.lastDoSafeKeyPadTime < 5 * 60 * 1000) {
        //         self.lastDoSafeKeyPadTime = now;
        //         return;
        //     }
        //     self.lastDoSafeKeyPadTime = now;
        //     // var ip = NetManager.getIPTest();
        //     if (isFormalService) {
        //         var ip = NetManager.getIPFormal();
        //     }
        //     var ParentKeyPad2 = $.getCCSKeyPad('http://' + ip + ':8989/icc/sys/servlet/SecurityKeyboardServlet', "Normal");//大小写字母+数字键盘
        //     self.subKeyPad = ParentKeyPad2.init({
        //         elementId: "PasswordS2",
        //         placeholder: "请输入您的密码",
        //         length: 12,
        //         input_style: {
        //             width: 200,
        //             height: 34
        //         }
        //     });
        // },
        onSafeKeyboardHide: function () {
            $("#loginDiv").css("bottom", "0px");
            $('.ccsk-scroll-padding').remove();
            // log("onSafeKeyboardHide");
        },
        onSafeKeyboardShow: function () {
            $("#loginDiv").css("bottom", "120px");
            // log("onSafeKeyboardShow");
        },

        checkToDo: function () {
            var self = window.Portal;
            var jsondata = {};
            //0105
            NetManager.httpReq("schedule/appCommon/getScheduleTotalNum", jsondata, function (data) {
                log("内容：" + JSON.stringify(data, null, 4));
                if (data.resultStatus < 0) {
                    $("#img311").hide();
                    self.unreadTodo = 0;
                    // myApp.alert("查询待办工作失败")
                } else if (data.resultStatus === "0") {
                    $("#img311").hide();
                    self.unreadTodo = 0;
                } else {
                    $("#img311").show();
                    $("#todoNum").text(data.resultStatus);
                    self.unreadTodo = data.resultStatus;
                }
                self.updateBadgeOther();
            }, function () {
                $("#img311").hide();
                // myApp.alert("查询待办工作失败")
                self.unreadTodo = 0;
                self.updateBadgeOther();
            });
        },
        //注册ios推送信息
        regIOSPush:function(token){
            // AppOp.getAppData("pushToken",function(value){
            //     var regData = {token: token,pushToken:value,deviceType:myApp.device.ios?"1":"2"};
            //     NetManager.httpReq(Constants.HttpReqName.RegisterPushToken, regData, function (data) {
            //         // alert("RegisterPushToken success");
            //     }, function (data) {
            //         alert("regIOSPush err:"+data);
            //     });
            // });
        },
        //注销ios推送信息
        unRegIOSPush:function(token){
            // var regData = {token: token};
            // NetManager.httpReq(Constants.HttpReqName.NullifyPushToken, regData, function (data) {
            //     // alert("NullifyPushToken success");
            // }, function (data) {
            //
            // });
        },

        //测试模块更新
        testModuleUpdate:function(){
            var moduleName = "zExample";
            var moduleInfo = "web/app/zExample@103@index.html@http://wjrcbmbi.mysticone.com:8000/zExample.zip"; //测试数据，需要通过服务器请求获得
            AppOp.moduleUpdate(moduleName,moduleInfo);
        },
        testOpenModule:function(){
            var moduleName = "zExample";
            var moduleHtmlName = "index.html";
            AppOp.openModuleActivity(moduleName,moduleHtmlName);
        },
        testOpenRemoteWeb:function(){
            // AppOp.openRemoteWebActivity("http://222.92.218.141:8080/mbi/");
            //大零售 http://mcrm_wj.tunnel.qydev.com/mcrm_wj/mcrm_marketing/index.html?userId=0771
            AppOp.openRemoteWebActivity("http://222.92.218.141:18080/mcrm_wj/mcrm_marketing/pages/homePage/mainPage.html");

        }
    };

    window.Portal = new Portal();
})();

$(window).resize(function () {
    var loginDiv = $("#loginDiv");
    loginDiv.height(screenHeight);
});

function onSafeKeyboardHide() {
    try {
        window.Portal.onSafeKeyboardHide();
    } catch (e) {

    }
}

function onSafeKeyboardShow() {
    try {
        window.Portal.onSafeKeyboardShow();
    } catch (e) {

    }
}

//登录时指纹验证成功
function gestureLockSuccessCbWhenLogin() {
    window.AppOp.setAppData("touchLastTime",new Date().getTime().toString());

    window.Portal.doLoginAuto();
}

//登录时指纹验证失败
function gestureLockForgetCbWhenLogin() {
    window.AppOp.setAppData("touchLastTime",new Date().getTime().toString());
    window.Portal.openLoginPage();
    // myApp.alert("登录失败，请密码登录！");
}

