//网络和协议通讯管理
(function () {
    "use strict";
    function NetManager() {
        this.flagC = true;
        this.ip = "55.213.192.155"; //生产环境ip地址
        this.port = "8989";//生产环境端口号
        this.userCode = "";
    }

    NetManager.prototype = {
        // //测试服IP
        // getIPTest:function(){
        //     var ip = window.NetManager.ipTest;
        //     if(useLocalAddress){
        //         ip =window.NetManager.ipTestLocal;
        //     }
        //     return ip;
        // },
        // //模拟正式服IP
        // getIPTestFormal:function () {
        //     var ip = window.NetManager.ipTestFormal;
        //     if(useLocalAddress){
        //         ip =window.NetManager.ipTestFormalLocal;
        //     }
        //     return ip;
        // },
        //正式服IP
        getIPFormal:function(){
            var ip = window.NetManager.ip;
            if(useLocalAddress){
                ip =window.NetManager.ip;
            }
            return ip;
        },
        setServerIp:function(serverIp){
            window.NetManager.ip = serverIp;
            AppOp.setAppData(Constants.AppSaveName.ServerIp,serverIp);
        },
        //http消息请求
        httpReq:function(reqName,jsonData,successCb,failCb){
            var self = this;
            self.doHttpReq(reqName,jsonData,successCb,failCb);
            // AppOp.getAppData(Constants.AppSaveName.AccountAutoTokenChanging,function(accountAutoTokenChanging){
            //     // "true"+apploginBySSO
            //     if(accountAutoTokenChanging !== "true" || reqName === Constants.HttpReqName.AppLoginWithoutLogin){
            //         AppOp.getAppData(Constants.AppSaveName.AccountToken,function(tokenVal){
            //             self.doHttpReq(tokenVal,reqName,jsonData,successCb,failCb);
            //         });
            //     }
            // });
        },

        doHttpReqL:function(url,cb,errorCb){
            var self = this;
            //外网测试地址
            // var url = 'http://222.92.218.141:8080/dshFileDown/file.jsonp';
            //内网测试地址
            // var url = 'http://192.168.88.65:8080/dshFileDown/file.jsonp';
            //内网生产地址
            // var url = 'http://192.168.55.86:8080/dshFileDown/file.jsonp';
            // myApp.alert("reqName:"+reqName+" jsonData:"+jsonData);
            // var url = 'http://'+window.NetManager.ip+':'+window.NetManager.port+'/dshFileDown/file.jsonp';
            // alert(url);
            $.ajax({
                type: "post",
                data: "",
                url: url,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback:"callback",
                // timeout: 10000,
                success: function (data) {
                    log("成功数据"+JSON.stringify(data,null,4));
                    if(_.isFunction(cb)){
                        cb(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    error("requestServerStatusByJsonP error:"+textStatus+" errorThrown:"+errorThrown);
                    if(_.isFunction(errorCb)){
                        errorCb(jqXHR, textStatus, errorThrown);
                    }
                }
            });
        },
        doHttpReq:function(reqName,jsonData,successCb,failCb){
            var self = this;
            // if(token === null || token === undefined){
            //     token = "";
            // }
            // jsonData.token = token;

            jsonData = JSON.stringify(jsonData);log("数据"+jsonData)

            // var url = 'http://'+window.NetManager.ip+':'+window.NetManager.port+'/icc/'+reqName+'.nut';
            var url = 'http://58.213.192.155:8989/icc/'+reqName+'.nut';
            // myApp.alert("reqName:"+reqName+" jsonData:"+jsonData);
            // alert(url);
            $.ajax({
                type : 'POST',
                dataType: 'json',
                data : jsonData,
                async : true,
                url : url,
                // timeout: 10000,
                success : function(msg){
                    log("日志"+JSON.stringify(msg,null,4))
                    if (msg.success === true) {
                        // error(JSON.stringify(msg));
                        // log("请求"+reqName+"成功!");
                        // log(reqName+"内容："+JSON.stringify(text.data, null, 4));
                        if(msg.hasOwnProperty("data")){
                            successCb(msg.data);
                        }else{
                            successCb("");
                        }
                    } else {
                        error(msg.data);
                        if(_.isFunction(failCb)){
                            failCb(msg.data);
                        }
                        if(msg.data.errorCode === Constants.errorCode_100){    //100 通用操作的提示
                            if(msg.data.errorDesc !== ""){
                                myApp.alert(msg.data.errorDesc);
                            }
                        }else if(msg.data.errorCode === Constants.errorCode_0){  //-1 非正常异常，需要log出errorMsg方便调试
                            error("错误码-1:errorMsg:"+msg.data.errorMsg+" errorDesc:"+msg.data.errorDesc);
                            if(isDebugMode){
                                // myApp.alert("错误码-1:errorMsg:"+msg.data.errorMsg+" errorDesc:"+msg.data.errorDesc);
                            }
                        }else{
                            if(msg.data.errorCode ===Constants.errorCode_101 && self.flagC){
                                AppOp.hideLoading();
                                self.flagC = false;
                                myApp.alert(msg.data.errorDesc,function(){
                                    AppOp.setAppData(Constants.AppSaveName.AccountToken, "0");
                                    AppOp.setAppData(Constants.AppSaveName.AccountAutoToken, "0");
                                    AppOp.needLogout();
                                    AppOp.openApp("0");
                                });
                            }else if(msg.data.errorCode === Constants.errorCode_102){
                                myApp.alert(msg.data.errorDesc,"登录");
                            }else if(msg.data.errorCode ===Constants.errorCode_103){
                                myApp.alert("你没有查看权限。", function ( ) {
                                    AppOp.openApp("0");
                                });
                            }else if(msg.data.errorCode === Constants.errorCode_104){
                                // myApp.alert("对不起，您没有操作权限!!!");
                                /*if(msg.data.errorDesc !== ""){   不再提示无权限，因为大多数人都没有
                                 myApp.alert(msg.data.errorDesc);
                                 }*/
                            }else if(msg.data.errorCode===Constants.errorCode_105||msg.data.errorCode===Constants.errorCode_106||msg.data.errorCode===Constants.errorCode_107){
                                if(msg.data.errorDesc !== ""){
                                    myApp.alert(msg.data.errorDesc);
                                }
                            }
                        }
                    }
                },
                error :  function (jqXHR, textStatus, errorThrown) {
                    // myApp.alert("请求"+reqName+"失败-error,textStatus:" + textStatus + " jqXHR:" + jqXHR + " errorThrown:" + errorThrown);
                    if(_.isFunction(failCb)){
                        failCb("请求"+reqName+"失败error,textStatus:" + textStatus + " jqXHR:" + jqXHR + " errorThrown:" + errorThrown);
                    }
                    error("请求"+reqName+"失败error,textStatus:" + textStatus + " jqXHR:" + jqXHR + " errorThrown:" + errorThrown);
                },
            });
        },
        //获取服务器额外信息（如服务器是否在维护中）
        requestServerStatusByJsonP:function(cb,errorCb){
            $.ajax({
                // url : 'http://'+this.ip+':'+this.noticePort+'/jsonp/server_flag.jsonp',
                url : 'http://'+window.NetManager.ip+':'+window.NetManager.noticePort+'/jsonp/server_flag.jsonp?v='+Math.random(),
                type: "post",
                data: "",
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback:"callback",
                success: function (data) {
                    log(data);
                    if(_.isFunction(cb)){
                        cb(data);
                    }
                    // myApp.alert("SERVER_UPDATE_FLAG:"+data.SERVER_UPDATE_FLAG);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    error("requestServerStatusByJsonP error:"+textStatus+" errorThrown:"+errorThrown);
                    if(_.isFunction(errorCb)){
                        errorCb(jqXHR, textStatus, errorThrown);
                    }
                }
            });
        },
        //测试
        requestServerInfo:function(url,jsonData,cb){
            /*var jsonData = {"user":"bruce","password":"123"};
             jsonData = JSON.stringify(jsonData);*/
            $.ajax({
                // url : 'http://127.0.0.1:8000/postTest?name=DDD&pwd=EEE',
                url : url,
                type: "post",
                /*beforeSend:function (xhr) {
                 xhr.setRequestHeader("Cookie",jsonData.JSESSIONID)
                 },*/
                /*headers: {
                 'Cookie':jsonData.JSESSIONID
                 },*/
                dataType: 'json',
                data : {},
                success: function (data) {
                    log("数据"+JSON.stringify(data,null,4));
                    if(cb !== undefined){
                        cb(data);
                    }
                    // myApp.alert("SERVER_UPDATE_FLAG:"+data.SERVER_UPDATE_FLAG);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    error("requestServerInfo error:"+textStatus+" errorThrown:"+errorThrown)
                }
            });
        },
        //测试
        requestServer:function(url,jsonData,cb){
            //var jsonData = {"user":"bruce","password":"123"};
            //jsonData = JSON.stringify(jsonData);

            $.ajax({
                // url : 'http://127.0.0.1:8000/postTest?name=DDD&pwd=EEE',
                url : url,
                type: "post",
                dataType: 'json',
                data : jsonData,
                success: function (data) {log("获取流程银行"+JSON.stringify(data,null,4))
                    //log("网页申请成功 " + JSON.stringify(data, null, 4));
                    if(data.rtCode === "1"){
                        if(cb !== undefined){
                            cb(data);
                        }
                    }else{
                        myApp.alert("流程银行接口登陆失败")
                    }

                    // myApp.alert("SERVER_UPDATE_FLAG:"+data.SERVER_UPDATE_FLAG);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    error("requestServerInfo error:"+textStatus+" errorThrown:"+errorThrown)
                }
            });
        }

    };

    window.NetManager = new NetManager();
})();