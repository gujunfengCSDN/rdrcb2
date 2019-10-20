/*统一考试成绩详情内容*/
(function () {
    function UnifiedExaminResultDetailController() {
        this.paperId = "";
        this.schId = "";
        this.examWay = "";
        this.examTime = "";
        this.examResultCount = 0;
        this.examionResultArr = "";
    }
    UnifiedExaminResultDetailController.prototype = {
        init: function () {
            var self = window.UnifiedExaminResultDetailController;
            myApp.onPageAfterAnimation('unifiedExaminResultControlDetail', function (page) {
                self.paperId = page.query.paperId;
                self.schId = page.query.schId;
                self.examWay = page.query.examWay;
                self.examTime = page.query.examTime;
                self.refreshData();
                self.clickEvent();
            });
        },
        clickEvent: function () {
            var self = this;
            //点击下一题
            $(document).off('click',"#examNextResultButton").on('click',"#examNextResultButton",function () {
                self.examResultCount ++;
                self.refreshExamPersonData(self.examResultCount);
            });
            //点击上一题
            $(document).off('click',"#exanProResultButton").on('click',"#exanProResultButton",function () {
                self.examResultCount --;
                self.refreshExamPersonData(self.examResultCount);
            });
        },
        refreshData: function () {
            var self = this;
            // if(self.isNull(self.examTime) === false){
            //     $("#examTimeResult").text(self.examTime);
            // }
            // if(self.isNull(self.examTime) === false){
            //     $("#examScoreResult").text();
            // }
            // if(self.isNull(self.examTime) === false){
            //     $("#userScoreResult").text();
            // }
            // if(self.isNull(self.examTime) === false){
            //     $("#examResultCorrect").text();
            // }
            var jsonData = {};
            jsonData.userCode = window.Constants.userCode;
            jsonData.paperId = self.paperId;
            jsonData.schId = self.schId;
            jsonData.examWay = self.examWay;
            log("发送请求"+JSON.stringify(jsonData,null,4))
            NetManager.httpReq("appExamTy/queryTyHisById",jsonData,function (data) {
                if (self.isNull(data) === true) {
                    myApp.alert("考试题目异常,请联系服务人员");
                    MBIManager.getCurrView().router.back();
                    return;
                }
                log("考题成绩查询"+JSON.stringify(data,null,4));
                self.examionResultArr = data;
                self.refreshExamPersonData(self.examResultCount);
            },function (jjData) {
                myApp.alert("服务异常");
            });
        },
        //加载考试
        refreshExamPersonData: function (count) {
            var self = this;
            if(count >= self.examionResultArr.length){
                return;
            }
            var data = self.examionResultArr[count];log("加载已考详情内容"+JSON.stringify(data,null,4))
            var examPersonHtml = "";
            if(data.examInscribe === "1"){
                examPersonHtml += '<div style="padding: 2% 4%;font-size: 16px;color: #000000;">'+ (count+1) +''+ "、" +''+ "(" +' '+ data.examInscribeName +' '+ ")" +' '+data.examDesign +'</div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input id="www" type="radio" name="'+data.id +'" value="A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareA+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="B" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareB+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                    '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                    '       <span class="item-title" style="font-size: 16px;color: #000000;">'+data.examSpareC+'</span></label>\n' +
                    // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                    // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                    // '   </div>\n' +
                    '   </div>\n' +
                    '<div class="row" style="height: auto;">\n' +
                    '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                    '   <input type="radio" name="'+data.id +'" value="D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
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
            $("#examionResultTitle").empty();
            $("#examionResultTitle").append(examPersonHtml);
            if(self.isNull(data.userAnswer)===false){
                $("#examChooseAnswer").text(data.userAnswer);
            }
            if(count == (self.examionResultArr.length - 1)){
                $("#examNextResultButton").hide();
            }else{
                $("#examNextResultButton").show();
            }
            if(self.examResultCount == 0){
                $("#exanProResultButton").hide();
            }else{
                $("#exanProResultButton").show();
            }
            $("[name='"+data.id+"']").attr("disabled", true);
            if(data.examInscribe === "1"){
                if(self.isNull(data.examAnswer) === false){
                    $("input[name='"+data.id +"']").each(function() {
                        $("input:radio[value='"+ data.examAnswer +"']").attr('checked','true');
                    });
                }
            }else if(data.examInscribe === "2"){
                if(self.isNull(data.examAnswer) === false){
                    var comintMess = data.examAnswer;log("数据"+comintMess)
                    $("input:checkbox[name='"+data.id +"']").each(function() {
                        if(comintMess.indexOf($(this).val()) >= 0){
                            $("input:checkbox[value='"+ $(this).val() +"']").attr('checked','true');
                        }
                    });
                }
            }else if(data.examInscribe === "3"){
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
    window.UnifiedExaminResultDetailController = new UnifiedExaminResultDetailController();
})();

