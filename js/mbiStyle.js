(function () {
    "use strict";

    function MBIStyle() {
        this.currStyle = "1";
        this.screenAspectRatio = 0;
    }

    MBIStyle.prototype = {
        initStyle: function () {
            var self = window.MBIStyle;
            AppOp.getAppData(Constants.AppSaveName.StyleType, function (styleType) {
                log("initStyle:" + styleType);
                if(styleType===""){
                    self.currStyle = "1";
                }else{
                    self.currStyle = styleType.toString();
                }

                if(isIos){
                    if(  self.currStyle ==="2"){
                        AppOp.setStatusBarColor(Constants.StatusBarColor.iosBlackColor);
                        AppOp.setAppBackgroundColor(Constants.StatusBarColor.iosBlackColor);
                    }else{
                        AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                        AppOp.setAppBackgroundColor(Constants.StatusBarColor.White);
                    }
                }
                self.screenAspectRatio =screenWidth/screenHeight
                self.refreshImage(self.currStyle);
                self.refreshStyle(self.currStyle);
                self.refreshHighChartsStyle(self.currStyle);
                if(pad===true){
                    self.refreshIpadHighChartsStyle(self.screenAspectRatio);
                }

                // Common.triggerAll(Common.event_filterConfirm);
            });

            // var layouts = 'layout-dark layout-white';
            // var themes = 'theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray';
            // var myLayouts = ["","dark"];
            // var myThemes = ["blue","blue"];
            $(".btnStyle").on("click", function () {
                var self = window.MBIStyle;
                var idStr = $(this).attr("id").toString();
                var currStyle = parseInt(idStr.split("_")[1]).toString();
                log("btnStyle clicked:" + currStyle);
                self.currStyle =currStyle;
                if(isIos){
                    if(  self.currStyle ==="2"){
                        AppOp.setStatusBarColor(Constants.StatusBarColor.iosBlackColor);
                        AppOp.setAppBackgroundColor(Constants.StatusBarColor.iosBlackColor);
                    }else{
                        AppOp.setStatusBarColor(Constants.StatusBarColor.White);
                        AppOp.setAppBackgroundColor(Constants.StatusBarColor.White);
                    }
                }
                self.refreshImage(currStyle);
                // $$('body').removeClass(layouts).addClass('layout-' + myLayouts[index]);
                // $$('body').removeClass(themes).addClass('theme-' + myThemes[index]);
                self.refreshStyle(currStyle);
                self.refreshHighChartsStyle(currStyle);
                AppOp.setAppData(Constants.AppSaveName.StyleType, currStyle)
                Common.triggerAll(Common.event_filterConfirm);
                // window.IndexController.refreshMainData();


            });


        },
        refreshImage: function (styleId) {
            this.currStyle = styleId;
            log("styleId:" + styleId);
            if (styleId === "1") {
                $("#img1").attr("src", "images/login/bxz.png");
                $("#img2").attr("src", "images/login/hbx.png");
            } else if(styleId === "2") {
                $("#img1").attr("src", "images/login/bbx.png");
                $("#img2").attr("src", "images/login/hxz.png");
            }
        },
        refreshStyle: function (styleId) {
            var self = window.MBIStyle;
            this.currStyle = styleId;

            var myCssRules = document.styleSheets[5].cssRules;
            var len = myCssRules.length;
            for (var i = 0; i < len; i++) {
                var myCssRule = myCssRules[i];
                var val1 = "";
                var val2 = "";
                if (myCssRule.selectorText) {
                    self.refreshCommonStyle(myCssRule,styleId);
                    self.refreshMainPageStyle(myCssRule,styleId);
                    self.refreshCommonPageStyle(myCssRule,styleId);
                    self.refreshMpaPageStyle(myCssRule,styleId)
                    self.refreshGeneralPageStyle(myCssRule,styleId);
                    self.refreshFocusPageStyle(myCssRule,styleId);
                    self.refreshPadCommonPageStyle(myCssRule,self.screenAspectRatio);
                    self.refreshPadMainPageStyle(myCssRule,self.screenAspectRatio);
                    self.refreshPadTopicPageStyle(myCssRule,self.screenAspectRatio);
                    self.refreshPadTotalPageStyle(myCssRule,self.screenAspectRatio);
                    // switch (myCssRule.selectorText) {
                    //     // case ".style-navbar-background":
                    //     //     val1 = styleId === "1" ? "#f7f7f8" : "#515368";
                    //     //     myCssRule.style["background-color"] = val1;
                    //     //     break;
                    //     // case ".style-toolbar-inner-background":
                    //     //     val1 = styleId === "1" ? "#f7f7f8" : "#515368";
                    //     //     myCssRule.style["background-color"] = val1;
                    //     //     break;
                    //     // case ".style-common-text":
                    //     //     val1 = styleId === "1" ? "#000000" : "#ffffff";
                    //     //     myCssRule.style["color"] = val1;
                    //     //     break;
                    //     // case ".style-card-title":
                    //     //     val1 = styleId === "1" ? "#4d708e" : "#3f4a6a";
                    //     //     myCssRule.style["background-color"] = val1;
                    //     //     break;
                    //
                    //     //首页变色
                    //
                    // }
                    self.refreshPadCommonStyle(myCssRule,styleId);
                    self.refreshPadGeneralPageStyle(myCssRule,styleId);
                }
            }

        },
        //通用页面样式
        refreshCommonStyle:function (myCssRule,styleId) {
            var val1 = "";
            switch (myCssRule.selectorText) {
                case ".style-navbar-background":
                    val1 = styleId === "1" ? "#f7f7f8" : "#515368";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-toolbar-inner-background":
                    val1 = styleId === "1" ? "#f7f7f8" : "#515368";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-common-text":
                    val1 = styleId === "1" ? "#000000" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-card-title":
                    val1 = styleId === "1" ? "#4d708e" : "#3f4a6a";
                    myCssRule.style["background-color"] = val1;
                    break;
                case "i.tabbar-demo-icon-1":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_10.svg)";
                    break;
                case ".active i.tabbar-demo-icon-1":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_11.svg)";
                    break;
                case "i.tabbar-demo-icon-2":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_20.svg)";
                    break;
                case ".active i.tabbar-demo-icon-2":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_21.svg)";
                    break;
                case "i.tabbar-demo-icon-3":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_30.svg)";
                    break;
                case ".active i.tabbar-demo-icon-3":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_31.svg)";
                    break;
                case "i.tabbar-demo-icon-4":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_40.svg)";
                    break;
                case ".active i.tabbar-demo-icon-4":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab"+styleId+"_41.svg)";
                    break;
                case ".style-common-div":
                    val1 = styleId === "1" ? "#f7f7f8" : "#393A4C";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-cardContent-div":
                    val1 = styleId === "1" ? "#ffffff" : "#393A4C";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-common-span":
                    val1 = styleId === "1" ? "#f7f7f8" : "#3F4A6A";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-common-span":
                    val1 = styleId === "1" ? "#f7f7f8" : "#393A4C";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".setting":
                    myCssRule.style["background-image"] = "url(../images/homePage/icon" + styleId + "2.svg)";
                    break;
                case ".tabbar a.active":
                    val1 = styleId === "1" ? "#e52c2a" : "#44deec";
                    myCssRule.style["color"] = val1;
                    break;
                case ".content-block-inner::after":
                    val1 = styleId === "1" ? "#c8c7cc" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".content-block-inner::before":
                    val1 = styleId === "1" ? "#c8c7cc" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".list-block ul::before":
                    val1 = styleId === "1" ? "#c8c7cc" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".list-block ul::after":
                    val1 = styleId === "1" ? "#c8c7cc" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".list-block .item-inner::after":
                    val1 = styleId === "1" ? "#c8c7cc" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".list-block .item-inner::before":
                    val1 = styleId === "1" ? "#c8c7cc" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;


            }
        },
        //首页页面样式
        refreshMainPageStyle:function (myCssRule,styleId) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-navbar-watermark":
                    val1 = styleId === "1" ? "#f1f1f3" : "#4e5062";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-page-background":
                    val1 = styleId === "1" ? "#f7f7f8" : "#2A292E";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-index-text":
                    val1 = styleId === "1" ? "#3383ef" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-ebank-text":
                    val1 = styleId === "1" ? "#4e4f6d" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-international-text":
                    val1 = styleId === "1" ? "#1c7fc3" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-indexTitle-text":
                    val1 = styleId === "1" ? "#5f607a" : "#44dcea";
                    myCssRule.style["color"] = val1;
                    break;

                case ".indexContent1":
                    myCssRule.style["background-image"] = "url(../images/homePage/indexBk" + styleId + "2.png)";
                    break;
                case ".indexContent2":
                    myCssRule.style["background-image"] = "url(../images/homePage/indexBk" + styleId + "3.png)";
                    break;
                case ".dlContent":
                    myCssRule.style["background-image"] = "url(../images/homePage/indexBk" + styleId + "4.png)";
                    break;
                case ".titleBg":
                    myCssRule.style["background-image"] = "url(../images/homePage/bg" + styleId + ".png)";
                    break;
                case ".indexImg":
                    myCssRule.style["background-image"] = "url(../images/homePage/indexLine" + styleId + ".png)";
                    break;
                case ".style-indexVal-text":
                    val1 = styleId === "1" ? "#27c008" : "#0af94e";
                    myCssRule.style["color"] = val1;
                    break;

            }
        },
        //通用页面样式card/mpa
        refreshCommonPageStyle:function (myCssRule,styleId) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-commoncard-title":
                    val1 = styleId === "1" ? "aliceblue" : "#3f4a6a";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-mpa-text":
                    val1 = styleId === "1" ? "#8e8e93" : "#f7f7f8";
                    myCssRule.style["color"] = val1;
                    break;
            }
        },
        //综合页面样式
        refreshGeneralPageStyle:function (myCssRule,styleId) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-topic-title":
                    val1 = styleId === "1" ? "#007aff" : "#c9cfe4";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-general-title":
                    val1 = styleId === "1" ? "#3383ef" : "#44dcea";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-ebank-title":
                    val1 = styleId === "1" ? "#2358b8" : "#44dcea";
                    myCssRule.style["color"] = val1;
                    break;
                case ".card-header::after":
                    val1 = styleId === "1" ? "#e1e1e1" : "#64647e";
                    myCssRule.style["background-color"] = val1;
                    break;
            }
        },
        //关注页面样式
        refreshFocusPageStyle:function (myCssRule,styleId) {
            var val1 = "";
            switch (myCssRule.selectorText) {
                case ".style-focus-title":
                    val1 = styleId === "1" ? "#3582ed" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;
                case ".button":
                    val1 = styleId === "1" ? "#007aff" : "#01bffe";
                    myCssRule.style["color"] = val1;
                    break;
                case "i.icon.icon-back":
                    myCssRule.style["background-image"] = "url(../images/homePage/tab/tab" + styleId + ".svg)";
                    break;
                case ".style-navbar-icon":
                    val1 = styleId === "1" ? "#007aff" : "#c8cfe5";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-btn-text":
                    val1 = styleId === "1" ? "#5f607a" : "#dce3fa";
                    myCssRule.style["color"] = val1;
                    break;
                case "select":
                    val1 = styleId === "1" ? "#000000" : "#dce3fa";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-select-text":
                    val1 = styleId === "1" ? "#000000" : "#dce3fa";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-table-one":
                    val1 = styleId === "1" ? "#f5f5f5" : "#262734";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-table-two":
                    val1 = styleId === "1" ? "#ffffff" : "#323344";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-table-title":
                    val1 = styleId === "1" ? "#ffffff" : "#454658";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-table-text":
                    val1 = styleId === "1" ? "#000" : "#d4dbf2";
                    myCssRule.style["color"] = val1;
                    break;
            }
        },
        refreshMpaPageStyle:function (myCssRule,styleId) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-mpa-text":
                    val1 = styleId === "1" ? "#8e8e93" : "#f7f7f8";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-mpa-val":
                    val1 = styleId === "1" ? "#394ff3" : "#44deec";
                    myCssRule.style["color"] = val1;
                    break;

                case ".style-compareMax-val":
                    val1 = styleId === "1" ? "blue" : "#0cf84e";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-maxValue-val":
                    val1 = styleId === "1" ? "#394ff3" : "#50b0eb";
                    myCssRule.style["color"] = val1;
                    break;
                case ".style-mpaTitle-text":
                    val1 = styleId === "1" ? "#007aff" : "#c9cfe4";
                    myCssRule.style["color"] = val1;
                    break;

            }
        },
        refreshHighChartsStyle: function (currStyle) {
            if (currStyle === "2") {
                var theme2 = {
                    // colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                    //     '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                    chart: {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                            stops: [
                                [0, '#393A4C'],
                                [1, '#393A4C']
                            ]
                        },

                        // style: {
                        //     fontFamily: '\'Unica One\', sans-serif'
                        // },
                        // plotBorderColor: '#606063'
                    },
                    title: {
                        style: {
                            color: '#E0E0E3',
                            // textTransform: 'uppercase',
                            // fontSize: '20px'
                        }
                    },
                    pane: {
                        // startAngle: -150,
                        // endAngle: 150,
                        background: {
                            backgroundColor: '#393A4C',
                            // borderWidth: 0,
                            // outerRadius: '105%',
                            // innerRadius: '103%'
                        },
                    },
                    // subtitle: {
                    //     style: {
                    //         color: '#E0E0E3',
                    //         textTransform: 'uppercase'
                    //     }
                    // },
                    xAxis: {
                        // gridLineColor: '#707073',
                        labels: {
                            style: {
                                color: '#E0E0E3'
                            }
                        },
                        // lineColor: '#707073',
                        // minorGridLineColor: '#505053',
                        // tickColor: '#707073',
                        title: {
                            style: {
                                color: '#E0E0E3'

                            }
                        }
                    },
                    yAxis: {
                        gridLineColor: '#64647e',
                        labels: {
                            style: {
                                color: '#E0E0E3'
                            }
                        },
                        // lineColor: '#E33029',
                        // minorGridLineColor: '#E33029',
                        // tickColor: '#E33029',
                        // tickWidth: 1,
                        title: {
                            style: {
                                color: '#E0E0E3'
                            }
                        }
                    },
                    // tooltip: {
                    //     backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    //     style: {
                    //         color: '#F0F0F0'
                    //     }
                    // },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                color: '#E8F3F9'
                            },
                            // marker: {
                            //     lineColor: '#333'
                            // }
                        },
                        // boxplot: {
                        //     fillColor: '#505053'
                        // },
                        // candlestick: {
                        //     lineColor: 'white'
                        // },
                        // errorbar: {
                        //     color: 'white'
                        // }
                    },
                    legend: {
                        itemStyle: {
                            color: '#E0E0E3'
                        },
                        // itemHoverStyle: {
                        //     color: '#FFF'
                        // },
                        // itemHiddenStyle: {
                        //     color: '#606063'
                        // }
                    },
                    // credits: {
                    //     style: {
                    //         color: '#666'
                    //     }
                    // },
                    // labels: {
                    //     style: {
                    //         color: '#707073'
                    //     }
                    // },
                    //
                    // drilldown: {
                    //     activeAxisLabelStyle: {
                    //         color: '#F0F0F3'
                    //     },
                    //     activeDataLabelStyle: {
                    //         color: '#F0F0F3'
                    //     }
                    // },
                    //
                    // navigation: {
                    //     buttonOptions: {
                    //         symbolStroke: '#DDDDDD',
                    //         theme: {
                    //             fill: '#505053'
                    //         }
                    //     }
                    // },
                    //
                    // // scroll charts
                    // rangeSelector: {
                    //     buttonTheme: {
                    //         fill: '#505053',
                    //         stroke: '#000000',
                    //         style: {
                    //             color: '#CCC'
                    //         },
                    //         states: {
                    //             hover: {
                    //                 fill: '#707073',
                    //                 stroke: '#000000',
                    //                 style: {
                    //                     color: 'white'
                    //                 }
                    //             },
                    //             select: {
                    //                 fill: '#000003',
                    //                 stroke: '#000000',
                    //                 style: {
                    //                     color: 'white'
                    //                 }
                    //             }
                    //         }
                    //     },
                    //     inputBoxBorderColor: '#505053',
                    //     inputStyle: {
                    //         backgroundColor: '#333',
                    //         color: 'silver'
                    //     },
                    //     labelStyle: {
                    //         color: 'silver'
                    //     }
                    // },
                    //
                    // navigator: {
                    //     handles: {
                    //         backgroundColor: '#666',
                    //         borderColor: '#AAA'
                    //     },
                    //     outlineColor: '#CCC',
                    //     maskFill: 'rgba(255,255,255,0.1)',
                    //     series: {
                    //         color: '#7798BF',
                    //         lineColor: '#A6C7ED'
                    //     },
                    //     xAxis: {
                    //         gridLineColor: '#505053'
                    //     }
                    // },
                    //
                    // scrollbar: {
                    //     barBackgroundColor: '#808083',
                    //     barBorderColor: '#808083',
                    //     buttonArrowColor: '#CCC',
                    //     buttonBackgroundColor: '#606063',
                    //     buttonBorderColor: '#606063',
                    //     rifleColor: '#FFF',
                    //     trackBackgroundColor: '#404043',
                    //     trackBorderColor: '#404043'
                    // },
                    //
                    // // special colors for some of the
                    // legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                    // background2: '#505053',
                    // dataLabelsColor: '#B0B0B3',
                    // textColor: '#C0C0C0',
                    // contrastTextColor: '#F0F0F3',
                    // maskColor: 'rgba(255,255,255,0.3)'
                };
                Highcharts.setOptions(theme2);
            } else {
                var theme1 = {
                    chart: {
                        backgroundColor: '#fff',
                        // style: {
                        //     fontFamily: '\'Unica One\', sans-serif'
                        // },
                        // plotBorderColor: '#606063'
                    },
                    title: {
                        style: {
                            color: '#333333',
                            // textTransform: 'uppercase',
                            // fontSize: '20px'
                        }
                    },
                    pane: {
                        // startAngle: -150,
                        // endAngle: 150,
                        background: {
                            backgroundColor: '#fff',
                            // borderWidth: 0,
                            // outerRadius: '105%',
                            // innerRadius: '103%'
                        },
                    },
                    // subtitle: {
                    //     style: {
                    //         color: '#E0E0E3',
                    //         textTransform: 'uppercase'
                    //     }
                    // },
                    xAxis: {
                        // gridLineColor: '#707073',
                        labels: {
                            style: {
                                color: '#666666'
                            }
                        },
                        // lineColor: '#707073',
                        // minorGridLineColor: '#505053',
                        // tickColor: '#707073',
                        title: {
                            style: {
                                color: '#666666'

                            }
                        }
                    },
                    yAxis: {
                        gridLineColor: '#e6e6e6',
                        labels: {
                            style: {
                                color: '#666666'
                            }
                        },
                        // lineColor: '#707073',
                        // minorGridLineColor: '#505053',
                        // tickColor: '#707073',
                        // tickWidth: 1,
                        title: {
                            style: {
                                color: '#666666'
                            }
                        }
                    },
                    // tooltip: {
                    //     backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    //     style: {
                    //         color: '#F0F0F0'
                    //     }
                    // },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                color: null
                            },
                            // marker: {
                            //     lineColor: '#333'
                            // }
                        },
                        // boxplot: {
                        //     fillColor: '#505053'
                        // },
                        // candlestick: {
                        //     lineColor: 'white'
                        // },
                        // errorbar: {
                        //     color: 'white'
                        // }
                    },
                    legend: {
                        itemStyle: {
                            color: '#333333'
                        },
                        // itemHoverStyle: {
                        //     color: '#FFF'
                        // },
                        // itemHiddenStyle: {
                        //     color: '#606063'
                        // }
                    },
                    // credits: {
                    //     style: {
                    //         color: '#666'
                    //     }
                    // },
                    // labels: {
                    //     style: {
                    //         color: '#707073'
                    //     }
                    // },
                    //
                    // drilldown: {
                    //     activeAxisLabelStyle: {
                    //         color: '#F0F0F3'
                    //     },
                    //     activeDataLabelStyle: {
                    //         color: '#F0F0F3'
                    //     }
                    // },
                    //
                    // navigation: {
                    //     buttonOptions: {
                    //         symbolStroke: '#DDDDDD',
                    //         theme: {
                    //             fill: '#505053'
                    //         }
                    //     }
                    // },
                    //
                    // // scroll charts
                    // rangeSelector: {
                    //     buttonTheme: {
                    //         fill: '#505053',
                    //         stroke: '#000000',
                    //         style: {
                    //             color: '#CCC'
                    //         },
                    //         states: {
                    //             hover: {
                    //                 fill: '#707073',
                    //                 stroke: '#000000',
                    //                 style: {
                    //                     color: 'white'
                    //                 }
                    //             },
                    //             select: {
                    //                 fill: '#000003',
                    //                 stroke: '#000000',
                    //                 style: {
                    //                     color: 'white'
                    //                 }
                    //             }
                    //         }
                    //     },
                    //     inputBoxBorderColor: '#505053',
                    //     inputStyle: {
                    //         backgroundColor: '#333',
                    //         color: 'silver'
                    //     },
                    //     labelStyle: {
                    //         color: 'silver'
                    //     }
                    // },
                    //
                    // navigator: {
                    //     handles: {
                    //         backgroundColor: '#666',
                    //         borderColor: '#AAA'
                    //     },
                    //     outlineColor: '#CCC',
                    //     maskFill: 'rgba(255,255,255,0.1)',
                    //     series: {
                    //         color: '#7798BF',
                    //         lineColor: '#A6C7ED'
                    //     },
                    //     xAxis: {
                    //         gridLineColor: '#505053'
                    //     }
                    // },
                    //
                    // scrollbar: {
                    //     barBackgroundColor: '#808083',
                    //     barBorderColor: '#808083',
                    //     buttonArrowColor: '#CCC',
                    //     buttonBackgroundColor: '#606063',
                    //     buttonBorderColor: '#606063',
                    //     rifleColor: '#FFF',
                    //     trackBackgroundColor: '#404043',
                    //     trackBorderColor: '#404043'
                    // },
                    //
                    // // special colors for some of the
                    // legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                    // background2: '#505053',
                    // dataLabelsColor: '#B0B0B3',
                    // textColor: '#C0C0C0',
                    // contrastTextColor: '#F0F0F3',
                    // maskColor: 'rgba(255,255,255,0.3)'
                };
                Highcharts.setOptions(theme1);
            }
        },

        refreshIpadHighChartsStyle: function (ratio) {
            if (ratio < "0.66") {
                var theme2 = {
                    // colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                    //     '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                    title: {
                        y: 105,
                        x:-45,
                    },
                    plotOptions: {
                        pie: {
                            size: "140",
                        },
                    },
                    legend: {
                        y:40,
                        x:0,
                    },
                    pane: {
                        size: '135%',
                    },
                };
                Highcharts.setOptions(theme2);
            } else {
                var theme1 = {
                    title: {
                        y: 120,
                        x:-65,
                    },
                    pane: {
                        size: '150%',
                    },
                    plotOptions: {
                        pie: {
                            size: "180",
                        },
                    },
                    legend: {
                        y:40,
                        x:-30,
                    }
                };
                Highcharts.setOptions(theme1);
            }
        },
        refreshPadCommonPageStyle:function (myCssRule,ratio) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-padCommonTitle-text":
                    val1 = ratio < "0.66" ? "13px" : "15px";
                    myCssRule.style["font-size"] = val1;
                    break;
            }
        },
        refreshPadMainPageStyle:function (myCssRule,ratio) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-padIndexTitle-text":
                    val1 = ratio  <"0.66" ? "13px" : "15px";
                    myCssRule.style["fontSize"] = val1;
                    break;
                case ".style-padIndexNextTitle-text":
                    val1 = ratio  <"0.66" ? "11px" : "14px";
                    myCssRule.style["fontSize"] = val1;
                    break;
                case ".style-padIndexValue-text":
                    val1 = ratio <"0.66" ? "12px" : "14px";
                    myCssRule.style["fontSize"] = val1;
                    break;
                case ".style-padDetailTitle-text":
                    val1 = ratio < "0.66" ? "13px" : "14px";
                    myCssRule.style["fontSize"] = val1;
                    break;
                case ".style-padDetailNextTitle-text":
                    val1 = ratio < "0.66" ? "12px" : "13px";
                    myCssRule.style["fontSize"] = val1;
                    break;
                case ".style-padDetailValue-text":
                    val1 = ratio <"0.66" ? "12px" : "15px";
                    myCssRule.style["fontSize"] = val1;
                    break;
            }

        },
        refreshPadTopicPageStyle:function (myCssRule,ratio) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-padTopicText-text":
                    val1 = ratio < "0.66" ? "12px" : "14px";
                    myCssRule.style["font-size"] = val1;
                    break;
                case ".style-padTopicMpa-text":
                    val1 = ratio < "0.66" ? "12px" : "15px";
                    myCssRule.style["font-size"] = val1;
                    break;

            }
        },
        refreshPadTotalPageStyle:function (myCssRule,ratio) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-padTotalText-text":
                    val1 = ratio < "0.66" ? "12px" : "14px";
                    myCssRule.style["font-size"] = val1;
                    break;
                case ".style-padTotalRisk-text":
                    val1 = ratio < "0.66" ? "12px" : "15px";
                    myCssRule.style["font-size"] = val1;
                    break;

            }
        },

        //pad通用页面样式
        refreshPadCommonStyle:function (myCssRule,styleId){
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-navbar-background":
                    val1 = styleId === "1" ? "#f7f7f8" : "#515368";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-toolbar-inner-background":
                    val1 = styleId === "1" ? "#f7f7f8" : "#515368";
                    myCssRule.style["background-color"] = val1;
                    break;
                case ".style-common-text":
                    val1 = styleId === "1" ? "#000000" : "#ffffff";
                    //val1 = styleId === "1" ? "#515368" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;


            }
        },
        
        //pad综合页面样式
        refreshPadGeneralPageStyle:function (myCssRule,styleId) {
            var val1="";
            switch (myCssRule.selectorText) {
                case ".style-ebank-title":
                    val1 = styleId === "1" ? "#f7f7f8" : "#393A4C";
                    myCssRule.style["background-color"] = val1;
                    break;
                /*case ".style-padTotal-text" :
                    val1 = styleId === "1" ? "#f7f7f8" : "#000000";
                    myCssRule.style["background-color"] = val1;
                    break;*/
                case ".style-padTotalText-text" :
                    val1 = styleId === "1" ? "#f7f7f8" : "#393A4C";
                    myCssRule.style["background-color"] = val1;
                    break;

                case ".style-padTotalCommom-text":
                    val1 = styleId === "1" ?"#4e4f6d" : "#ffffff";
                    myCssRule.style["color"] = val1;
                    break;

                case ".style-padTotalRisk-text" :
                    val1 = styleId === "1" ? "#f7f7f8" : "#393A4C";
                    myCssRule.style["background-color"] = val1;
                    break;
            }
        }
    };

    window.MBIStyle = new MBIStyle();
})();