(function () {
    function WeekExamContentController() {
        this.countChange = 0;
        this.weekExamCode = "";
        this.weekExamState = "";
        this.questionArr = "";
        this.anuswerJson = {};
    }
    WeekExamContentController.prototype = {
        init: function () {
            var self = window.WeekExamContentController;
            myApp.onPageAfterAnimation('weekExamContentDetail', function (page) {
                self.weekExamCode = page.query.examContentId;
                self.weekExamState = page.query.examContentCount;
                self.countChange = 0;
                self.refreshData();
                self.clickEvent();
            });

        },
        clickEvent: function () {
            var self = this;
            //点击下一题
            $(document).off('click',"#nextQuestion").on('click',"#nextQuestion",function () {
                if(self.questionArr[self.countChange].examInscribeName === "单选题"){
                    var countName = self.questionArr[self.countChange].id;
                    var jsonValue = $('input[name="'+ countName +'"]:checked').val();
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.anuswerJson[self.countChange] = jsonValue;
                }else if(self.questionArr[self.countChange].examInscribeName === "多选题"){
                    var countName = self.questionArr[self.countChange].id;
                    var jsonValue = "";
                    // var jsonValue = $('input[type="checkbox"][name="'+ countName +'"]').val();
                    $.each($('input:checkbox:checked'),function(){
                        jsonValue += $(this).val();
                    });
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.anuswerJson[self.countChange] = countName + "@" + jsonValue;
                }else if(self.questionArr[self.countChange].examInscribeName === "判断题"){
                    var countName = self.questionArr[self.countChange].id;
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
                    self.anuswerJson[self.countChange] = jsonValue;
                }
                self.countChange ++;
                self.refreshQuestionTask(self.countChange);
            });
            //点击上一题
            $(document).off('click',"#proQuestion").on('click',"#proQuestion",function () {
                if(self.questionArr[self.countChange].examInscribeName === "单选题"){
                    var countName = self.questionArr[self.countChange].id;
                    var jsonValue = $('input[name="'+ countName +'"]:checked').val();
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.anuswerJson[self.countChange] = jsonValue;
                }else if(self.questionArr[self.countChange].examInscribeName === "多选题"){
                    var countName = self.questionArr[self.countChange].id;
                    var jsonValue = "";
                    // var jsonValue = $('input[type="checkbox"][name="'+ countName +'"]').val();
                    $.each($('input:checkbox:checked'),function(){
                        jsonValue += $(this).val();
                    });
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.anuswerJson[self.countChange] = countName + "@" + jsonValue;
                }else if(self.questionArr[self.countChange].examInscribeName === "判断题"){
                    var countName = self.questionArr[self.countChange].id;
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
                    self.anuswerJson[self.countChange] = jsonValue;
                }
                self.countChange --;
                self.refreshQuestionTask(self.countChange);
            });
            //点击提交
            $(document).off('click',"#commitQuestion").on('click',"#commitQuestion",function () {
                if(self.questionArr[self.countChange].examInscribeName === "单选题"){
                    var countName = self.questionArr[self.countChange].id;
                    var jsonValue = $('input[name="'+ countName +'"]:checked').val();
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.anuswerJson[self.countChange] = jsonValue;
                }else if(self.questionArr[self.countChange].examInscribeName === "多选题"){
                    var countName = self.questionArr[self.countChange].id;
                    var jsonValue = "";
                    // var jsonValue = $('input[type="checkbox"][name="'+ countName +'"]').val();
                    $.each($('input:checkbox:checked'),function(){
                        jsonValue += $(this).val();
                    });
                    if(self.isNull(jsonValue) === true){
                        jsonValue = countName + "@kong";
                    }
                    self.anuswerJson[self.countChange] = countName + "@" + jsonValue;
                }else if(self.questionArr[self.countChange].examInscribeName === "判断题"){
                    var countName = self.questionArr[self.countChange].id;
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
                    self.anuswerJson[self.countChange] = jsonValue;
                }
                myApp.confirm('请您确认是否提交', '提交', function () {
                    self.refreshCommit();
                });
            });
        },
        refreshData: function () {
            var self = this;
            // var count = 0;
            var jsonData = {};
            jsonData.id = self.weekExamCode;
            NetManager.httpReq("appWeekExamDetail/getAppWeekDetail",jsonData,function (jjData) {
                log("获取题目列表"+JSON.stringify(jjData,null,4))
                if(self.isNull(jjData) === true){
                    myApp.alert("考试题目异常,请联系服务人员");
                    MBIManager.getCurrView().router.back();
                    return;
                }
                self.questionArr = jjData;
                self.refreshQuestionTask(self.countChange);
            },function () {

            })
        },
        //加载考题页面
        refreshQuestionTask: function (count) {
            var self = this;
            if(count >= self.questionArr.length){
                return;
            }
            var data = self.questionArr[count];
            var examQuestion = "";
            if(data.examInscribeName === "单选题"){
                examQuestion += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +' '+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input id="www" type="radio" name="'+data.id +'" value="'+ data.id +'@A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareA+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@B" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareB+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareC+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareD+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>';
            }else if(data.examInscribeName === "多选题"){
                examQuestion += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +''+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareA+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="B" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareB+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareC+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="checkbox" name="'+data.id +'" value="D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareD+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>';
                if(self.isNull(data.examSpareE) === false){
                    examQuestion += '<div class="row" style="height: auto;">\n' +
                        '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="checkbox" name="'+data.id +'" value="E" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                        '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareE+'</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
                        '   </div>';
                }
                if(self.isNull(data.examSpareF) === false){
                    examQuestion += '<div class="row" style="height: auto;">\n' +
                        '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="checkbox" name="'+data.id +'" value="'+ data.id +'@D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                        '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareF+'</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
                        '   </div>';
                }
            }else if(data.examInscribeName === "判断题"){
                examQuestion += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +''+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: 44px;">\n' +
                    '<label class="col-80" style="height: 44px;padding-top: 2%;padding-left: 4%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="1" style="vertical-align:middle;height: 50%;width: 6%;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">对</span></label>\n' +
                    '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: 44px;">\n' +
                    '<label class="col-80" style="height: 44px;padding-top: 2%;padding-left: 4%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="2" style="vertical-align:middle;height: 50%;width: 6%;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">错</span></label>\n' +
                    '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    '   </div>\n' +
                    '   </div>';
            }

            $("#examQusetionTask").empty();
            $("#examQusetionTask").append(examQuestion);
            if(self.weekExamState == "0"){
                if(count == (self.questionArr.length - 1)){
                    $("#nextQuestion").hide();
                    $("#commitQuestion").show();
                }else{
                    $("#nextQuestion").show();
                }
                if(self.countChange == 0){
                    $("#proQuestion").hide();
                }else{
                    $("#proQuestion").show();
                }
                log("查看数组"+JSON.stringify(self.anuswerJson[count],null,4));
                if(data.examInscribeName === "单选题"){
                    if(self.isNull(self.anuswerJson[count]) === false){
                        $("input[name='"+data.id +"']").each(function() {
                            $("input:radio[value='"+ self.anuswerJson[count] +"']").attr('checked','true');
                        });
                    }
                }else if(data.examInscribeName === "多选题"){
                    if(self.isNull(self.anuswerJson[count]) === false){
                        var comintMess = self.anuswerJson[count].split("@")[1];log("数据"+comintMess)
                        $("input:checkbox[name='"+data.id +"']").each(function() {
                            if(comintMess.indexOf($(this).val()) >= 0){
                                $("input:checkbox[value='"+ $(this).val() +"']").attr('checked','true');
                            }
                        });
                    }
                }else if(data.examInscribeName === "判断题"){
                    if(self.isNull(self.anuswerJson[count]) === false){
                        var comintMess = self.anuswerJson[count].split("@")[1];
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
            }else if(self.weekExamState == "1"){
                $("[name='"+data.id+"']").attr("disabled", true);
                if(count == (self.questionArr.length - 1)){
                    $("#nextQuestion").hide();
                }else{
                    $("#nextQuestion").show();
                }
                if(self.countChange == 0){
                    $("#proQuestion").hide();
                }else{
                    $("#proQuestion").show();
                }
                if(data.examInscribeName === "单选题"){
                    if(self.isNull(self.questionArr[count].userAnswer) === false){
                        var questionNewAn = self.questionArr[count].id +"@"+ self.questionArr[count].userAnswer;
                        $("input[name='"+data.id +"']").each(function() {
                            $("input:radio[value='"+ questionNewAn +"']").attr('checked','true');
                        });
                    }
                }else if(data.examInscribeName === "多选题"){
                    if(self.isNull(self.questionArr[count].userAnswer) === false){
                        var comintMess = self.questionArr[count].userAnswer;log("数据"+comintMess)
                        $("input:checkbox[name='"+data.id +"']").each(function() {
                            if(comintMess.indexOf($(this).val()) >= 0){
                                $("input:checkbox[value='"+ $(this).val() +"']").attr('checked','true');
                            }
                        });
                    }
                }else if(data.examInscribeName === "判断题"){
                    if(self.isNull(self.questionArr[count].userAnswer) === false){
                        var comintMess = self.questionArr[count].userAnswer;
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
            }

        },
        //提交
        refreshCommit: function () {
            var self = this;
            var jsonData = {};
            var jsonArr = Common.getValArr(self.anuswerJson);log("提交结果字符串"+JSON.stringify(jsonArr,null,4))
            jsonData.appWeekExamId = self.weekExamCode;
            jsonData.answer = jsonArr.join(",");
            NetManager.httpReq("appWeekExamDetail/getAppExamAnswer",jsonData,function (jjData) {
                log("提交题目列表"+JSON.stringify(jjData,null,4))
                if(self.isNull(jjData) === true){
                    return;
                }
                if(jjData == "10000"){
                    myApp.alert('操作成功', '提交', function () {
                        MBIManager.getCurrView().router.back();
                    });
                }
            },function () {

            })
        },
        isNull: function (str) {
            if (str === undefined || str == "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.WeekExamContentController = new WeekExamContentController();
})();
