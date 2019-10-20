/*统一考试详情内容*/
(function () {
    function UnifiedExaminationDetailController() {
        this.paperId = "";
        this.schId = "";
        this.examWay = "";
        this.examTime = "";
        this.countExamion = 0;
        this.examionArr = "";
        this.InterExamClear = "";
        this.examAnswerJson = {};
    }
    UnifiedExaminationDetailController.prototype = {
        init: function () {
            var self = window.UnifiedExaminationDetailController;
            myApp.onPageAfterAnimation('unifiedExaminationControlDetail', function (page) {
                self.paperId = page.query.paperId;
                self.schId = page.query.schId;
                self.examWay = page.query.examWay;
                self.examTime = page.query.examTime;
                clearInterval(self.InterExamClear);
                $("#timeMinuteExam").text("00");
                $("#timeSecondExam").text("00");
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击开始考试
            $(document).off('click',"#examStartButton").on('click',"#examStartButton",function () {
                $("#examStartButton").hide();
                self.refreshExamPersonData(self.countExamion);
                self.refreshExamTimeCount();
                $("#examNextButton").show();
            });
            //点击下一题
            $(document).off('click',"#examNextButton").on('click',"#examNextButton",function () {
                if(self.examionArr[self.countExamion].examInscribe === "1"){
                    var countName = self.examionArr[self.countExamion].id;
                    var jsonValue = $('input[name="'+ countName +'"]:checked').val();
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.examAnswerJson[self.countExamion] = jsonValue;
                }else if(self.examionArr[self.countExamion].examInscribe === "2"){
                    var countName = self.examionArr[self.countExamion].id;
                    var jsonValue = "";
                    // var jsonValue = $('input[type="checkbox"][name="'+ countName +'"]').val();
                    $.each($('input:checkbox:checked'),function(){
                        jsonValue += $(this).val();
                    });
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.examAnswerJson[self.countExamion] = countName + "@" + jsonValue;
                }else if(self.examionArr[self.countExamion].examInscribe === "3"){
                    var countName = self.examionArr[self.countExamion].id;
                    var jsonValue = "";
                    var countFlag = $('input[name="'+ countName +'"]:checked').val();
                    if(countFlag == "1"){
                        jsonValue = countName + "@对";
                    }else if(countFlag == "2"){
                        jsonValue = countName + "@错";
                    }
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.examAnswerJson[self.countExamion] = jsonValue;log("查询提交答案"+JSON.stringify(self.examAnswerJson,null,4))
                }
                self.countExamion ++;
                self.refreshExamPersonData(self.countExamion);
            });
            //点击上一题
            $(document).off('click',"#exanProButton").on('click',"#exanProButton",function () {
                if(self.examionArr[self.countExamion].examInscribe === "1"){
                    var countName = self.examionArr[self.countExamion].id;
                    var jsonValue = $('input[name="'+ countName +'"]:checked').val();
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.examAnswerJson[self.countExamion] = jsonValue;
                }else if(self.examionArr[self.countExamion].examInscribe === "2"){
                    var countName = self.examionArr[self.countExamion].id;
                    var jsonValue = "";
                    // var jsonValue = $('input[type="checkbox"][name="'+ countName +'"]').val();
                    $.each($('input:checkbox:checked'),function(){
                        jsonValue += $(this).val();
                    });
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.examAnswerJson[self.countExamion] = countName + "@" + jsonValue;
                }else if(self.examionArr[self.countExamion].examInscribe === "3"){
                    var countName = self.examionArr[self.countExamion].id;
                    var jsonValue = "";
                    var countFlag = $('input[name="'+ countName +'"]:checked').val();
                    if(countFlag == "1"){
                        jsonValue = countName + "@对";
                    }else if(countFlag == "2"){
                        jsonValue = countName + "@错";
                    }
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.examAnswerJson[self.countExamion] = jsonValue;
                }
                self.countExamion --;
                self.refreshExamPersonData(self.countExamion);
            });
            //点击提交
            $(document).off('click',"#examCommitButton").on('click',"#examCommitButton",function () {
                self.refreshLastChoose();
            });

        },
        refreshData: function () {
            var self = this;
            var jsonData = {};
            if(self.isNull(self.examTime) === false){
                $("#examTime").text(self.examTime+"分钟");
            }
            jsonData.userCode = window.Constants.userCode;
            jsonData.paperId = self.paperId;
            jsonData.schId = self.schId;
            jsonData.examWay = self.examWay;
            log("发送请求"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appExamTy/queryExamTyById",jsonData,function (data) {
                if (self.isNull(data) === true) {
                    myApp.alert("考试题目异常,请联系服务人员");
                    MBIManager.getCurrView().router.back();
                    return;
                }
                log("考题查询"+JSON.stringify(data,null,4));
                self.examionArr = data;
            },function (jjData) {
                myApp.alert("服务异常");
            });
        },
        //加载考试
        refreshExamPersonData: function (count) {
            var self = this;
            if(count >= self.examionArr.length){
                return;
            }
            var data = self.examionArr[count];
            var examPersonHtml = "";
            if(data.examInscribe === "1"){
                examPersonHtml += '<div style="padding: 2% 4%;font-size: 16px;color: #000000;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +' '+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input id="www" type="radio" name="'+data.id +'" value="'+ data.id +'@A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareA+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@B" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareB+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareC+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareD+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>';
            }else if(data.examInscribe === "2"){
                examPersonHtml += '<div style="padding: 2% 4%;font-size: 16px;color: #000000;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +''+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareA+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="B" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareB+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareC+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareD+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>';
                if(self.isNull(data.examSpareE) === false){
                    examPersonHtml += '<div class="row" style="height: auto;">\n' +
                        '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="checkbox" name="'+data.id +'" value="E" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                        '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareE+'</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
                        '   </div>';
                }
                if(self.isNull(data.examSpareF) === false){
                    examPersonHtml += '<div class="row" style="height: auto;">\n' +
                        '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="checkbox" name="'+data.id +'" value="'+ data.id +'@D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                        '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareF+'</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
                        '   </div>';
                }
            }else if(data.examInscribe === "3"){
                examPersonHtml += '<div style="padding: 2% 4%;font-size: 16px;color: #000000;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +''+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: 44px;">\n' +
                    '<label class="col-80" style="height: 44px;padding-top: 2%;padding-left: 4%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="1" style="vertical-align:middle;height: 50%;width: 6%;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">对</span></label>\n' +
                    '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: 44px;">\n' +
                    '<label class="col-80" style="height: 44px;padding-top: 2%;padding-left: 4%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="2" style="vertical-align:middle;height: 50%;width: 6%;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">错</span></label>\n' +
                    '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    '   </div>\n' +
                    '   </div>';
            }
            $("#examionTitle").empty();
            $("#examionTitle").append(examPersonHtml);
            if(count == (self.examionArr.length - 1)){
                $("#examNextButton").hide();
                $("#examCommitButton").show();
            }else{
                $("#examNextButton").show();
            }
            if(self.countExamion == 0){
                $("#exanProButton").hide();
            }else{
                $("#exanProButton").show();
            }
            if(data.examInscribe === "1"){
                if(self.isNull(self.examAnswerJson[count]) === false){
                    $("input[name='"+data.id +"']").each(function() {
                        $("input:radio[value='"+ self.examAnswerJson[count] +"']").attr('checked','true');
                    });
                }
            }else if(data.examInscribe === "2"){
                if(self.isNull(self.examAnswerJson[count]) === false){
                    var comintMess = self.examAnswerJson[count].split("@")[1];log("数据"+comintMess)
                    $("input:checkbox[name='"+data.id +"']").each(function() {
                        if(comintMess.indexOf($(this).val()) >= 0){
                            $("input:checkbox[value='"+ $(this).val() +"']").attr('checked','true');
                        }
                    });
                }
            }else if(data.examInscribe === "3"){
                if(self.isNull(self.examAnswerJson[count]) === false){
                    var comintMess = self.examAnswerJson[count].split("@")[1];
                    if(comintMess == "对"){
                        $("input[name='"+data.id +"']").each(function() {
                            $("input:radio[value='1']").attr('checked','true');
                        });
                    } else if(comintMess == "错"){
                        $("input[name='"+data.id +"']").each(function() {
                            $("input:radio[value='2']").attr('checked','true');
                        });
                    }
                }
            }
        },
        //开始计时
        refreshExamTimeCount: function () {
            var self = this;
            var timeSecondExam = 0;
            var timeMinuteExam = 0;
            self.InterExamClear = setInterval(function () {
                //时间到了,提交
                var clearTime = $("#timeMinuteExam").text();
                if(clearTime >= self.examTime){
                    self.refreshLastChoose();
                }
                timeSecondExam++;
                if(timeSecondExam === 60){
                    timeMinuteExam++;
                    timeSecondExam = 0;
                }
                if(timeSecondExam < 10 ){
                    timeSecondExam = "0" + timeSecondExam;
                }
                if(timeMinuteExam < 10){
                    timeMinuteExam = "0" + timeMinuteExam;
                }
                $("#timeMinuteExam").text(timeMinuteExam);
                $("#timeSecondExam").text(timeSecondExam);
                if(timeSecondExam < 10 ){
                    timeSecondExam = parseInt(timeSecondExam);
                }
                if(timeMinuteExam < 10){
                    timeMinuteExam = parseInt(timeMinuteExam);
                }
            },1000);
        },
        //最后一步提交
        refreshLastChoose: function () {
            var self = this;
            if(self.examionArr[self.countExamion].examInscribe === "1"){
                var countName = self.examionArr[self.countExamion].id;
                var jsonValue = $('input[name="'+ countName +'"]:checked').val();
                if(self.isNull(jsonValue) === true){
                    jsonValue = countName + "@kong";
                }
                self.examAnswerJson[self.countExamion] = jsonValue;
            }else if(self.examionArr[self.countExamion].examInscribe === "2"){
                var countName = self.examionArr[self.countExamion].id;
                var jsonValue = "";
                // var jsonValue = $('input[type="checkbox"][name="'+ countName +'"]').val();
                $.each($('input:checkbox:checked'),function(){
                    jsonValue += $(this).val();
                });
                if(self.isNull(jsonValue) === true){
                    jsonValue = countName + "@kong";
                }
                self.examAnswerJson[self.countExamion] = countName + "@" + jsonValue;
            }else if(self.examionArr[self.countExamion].examInscribe === "3"){
                var countName = self.examionArr[self.countExamion].id;
                var jsonValue = "";
                var countFlag = $('input[name="'+ countName +'"]:checked').val();
                if(countFlag == "1"){
                    jsonValue = countName + "@对";
                }else if(countFlag == "2"){
                    jsonValue = countName + "@错";
                }
                if(self.isNull(jsonValue) === true){
                    jsonValue = countName + "@kong";
                }
                self.examAnswerJson[self.countExamion] = jsonValue;
            }
            myApp.confirm('请您确认是否提交', '提交', function () {
                self.refreshCommitExam();
            });
        },
        //提交
        refreshCommitExam: function () {
            var self = this;
            clearInterval(self.InterExamClear);
            var jsonData = {};
            var jsonArr = Common.getValArr(self.examAnswerJson);log("提交结果字符串"+JSON.stringify(jsonArr,null,4))
            jsonData.userCode = window.Constants.userCode;
            jsonData.paperId = self.paperId;
            jsonData.schId = self.schId;
            jsonData.examWay = self.examWay;
            jsonData.answer = jsonArr.join(",");
            NetManager.httpReq("appExamTy/getExamTyAnswers",jsonData,function (jjData) {
                log("提交题目列表"+JSON.stringify(jjData,null,4))
                if(self.isNull(jjData) === true){
                    return;
                }
                myApp.alert(jjData, '确定', function () {
                    MBIManager.getCurrView().router.back();
                });
            },function () {

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
    window.UnifiedExaminationDetailController = new UnifiedExaminationDetailController();
})();

