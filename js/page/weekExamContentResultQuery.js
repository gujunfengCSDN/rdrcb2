/*每周一考具体考题答案查询*/
(function () {
    function WeekExamContentResultQueryController() {
        this.initWeekExamListResultsQuery = "0";
        this.countResult = 0;
        this.weekExamResultCode = "";
        this.questionResultArr = "";
    }
    WeekExamContentResultQueryController.prototype = {
        init: function () {
            var self = window.WeekExamContentResultQueryController;
            myApp.onPageAfterAnimation('weekExamContentDetailquery', function (page) {
                self.weekExamResultCode = page.query.examContentId;
                self.countResult = 0;
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击下一题
            $(document).off('click',"#nextQuestionResult").on('click',"#nextQuestionResult",function () {
                self.countResult ++;
                self.refreshQuestionTask(self.countResult);
            });
            //点击上一题
            $(document).off('click',"#proQuestionResult").on('click',"#proQuestionResult",function () {
                self.countResult --;
                self.refreshQuestionTask(self.countResult);
            });
        },
        refreshData: function () {
            var self = this;
            // var count = 0;
            var jsonData = {};
            jsonData.id = self.weekExamResultCode;
            NetManager.httpReq("appWeekExamDetail/getAppWeekDetail",jsonData,function (jjData) {
                log("获取题目列表"+JSON.stringify(jjData,null,4))
                if(self.isNull(jjData) === true){
                    return;
                }
                self.questionResultArr = jjData;
                self.refreshQuestionTask(self.countResult);
            },function () {

            })
        },
        refreshQuestionTask: function (count) {
            var self = this;
            if(count >= self.questionResultArr.length){
                return;
            }
            var data = self.questionResultArr[count];
            var examQuestion = "";
            if(data.examInscribeName === "单选题"){
                examQuestion += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +''+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareA+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="B" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareB+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareC+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
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

            if(self.isNull(data.userAnswer)===false){
                $("#chooseAnswer").text(data.userAnswer);
            }
            $("#examQusetionQueryTask").empty();
            $("#examQusetionQueryTask").append(examQuestion);
            if(count == (self.questionResultArr.length - 1)){
                $("#nextQuestionResult").hide();
            }else{
                $("#nextQuestionResult").show();
            }
            if(self.countChange == 0){
                $("#proQuestionResult").hide();
            }else{
                $("#proQuestionResult").show();
            }
            $("[name='"+data.id+"']").attr("disabled", true);
            if(data.examInscribeName === "单选题"){
                if(self.isNull(data.examAnswer) === false){
                    $("input[name='"+data.id +"']").each(function() {
                        $("input:radio[value='"+ data.examAnswer +"']").attr('checked','true');
                    });
                }
            }else if(data.examInscribeName === "多选题"){
                if(self.isNull(data.examAnswer) === false){
                    var comintMess = data.examAnswer;log("数据"+comintMess)
                    $("input:checkbox[name='"+data.id +"']").each(function() {
                        if(comintMess.indexOf($(this).val()) >= 0){
                            $("input:checkbox[value='"+ $(this).val() +"']").attr('checked','true');
                        }
                    });
                }
            }else if(data.examInscribeName === "判断题"){
                if(self.isNull(data.examAnswer) === false){
                    var comintMess = data.examAnswer;
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
        isNull: function (str) {
            if (str === undefined || str === "" || str === "null" || str === "undefined") {
                return true;
            } else {
                return false;
            }
        },
    };
    window.WeekExamContentResultQueryController = new WeekExamContentResultQueryController();
})();
