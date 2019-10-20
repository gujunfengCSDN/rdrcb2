/*考试题库学习*/
(function () {
    function ExamQuestionDetailController() {
        this.examQuestionTaskId = "";
    }
    ExamQuestionDetailController.prototype = {
        init: function () {
            var self = window.ExamQuestionDetailController;
            myApp.onPageAfterAnimation('ExamQuestionDetail', function (page) {
                self.examQuestionTaskId = page.query.examQuestionId;
                self.refreshData();
                self.clickEvent();
            });

        },
        clickEvent: function () {
            var self = this;
            // 点击具体详情
            // $(document).off('click',".internalDetail").on('click',".internalDetail",function () {
            //     var internalRegulaId = $(this).attr("id");
            //     if (self.initInternalRegulaList === "1") {
            //         var url = "content/page/internalRegulationDetail.html?internalRegulaId=" + internalRegulaId;
            //         MBIManager.getCurrView().router.loadPage(url);
            //     } else {
            //         self.initInternalRegulaList = "1";
            //         var url = "content/page/internalRegulationDetail.html?internalRegulaId=" + internalRegulaId;
            //         MBIManager.getCurrView().router.loadPage(url);
            //         window.WeekExamContentController.init();
            //     }
            // });
        },
        refreshData: function () {
            var self = this;
            var jsonData = {};
            var examQuestionDetail = "";
            jsonData.id = self.examQuestionTaskId;
            NetManager.httpReq("appLearningExamListAct/getExamDetailForAppById", jsonData, function (jjData) {
                if (self.isNull(jjData) === true) {
                    return;
                }
                log("考试题库详情" + JSON.stringify(jjData, null, 4))
                var data = jjData;
                if(data.examInscribeName === "单选题"){
                    examQuestionDetail += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+data.examDesign +'</div>\n' +
                        '<div class="row" style="height: auto;">\n' +
                        '<label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="radio" name="'+data.id +'" value="'+ data.id +'@A" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
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
                    examQuestionDetail += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+data.examDesign +'</div>\n' +
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
                        '   <div class="row" style="height: auto;">\n' +
                        '   <label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="checkbox" name="'+data.id +'" value="C" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                        '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareC+'</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
                        '   </div>\n' +
                        '   <div class="row" style="height: auto;">\n' +
                        '   <label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                        '   <input type="checkbox" name="'+data.id +'" value="D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                        '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareD+'</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
                        '   </div>';
                    if(self.isNull(data.examSpareE) === false){
                        examQuestionDetail += '   <div class="row" style="height: auto;">\n' +
                            '   <label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                            '   <input type="checkbox" name="'+data.id +'" value="E" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                            '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                            '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareE+'</span></label>\n' +
                            // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                            // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                            // '   </div>\n' +
                            '   </div>';
                    }
                    if(self.isNull(data.examSpareF) === false){
                        examQuestionDetail += '   <div class="row" style="height: auto;">\n' +
                            '   <label class="col-100" style="height: 100%;padding: 2% 2%;">\n' +
                            '   <input type="checkbox" name="'+data.id +'" value="'+ data.id +'@D" style="vertical-align:middle;height: 24px;width: 20px;">\n' +
                            '   <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                            '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">'+data.examSpareF+'</span></label>\n' +
                            // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                            // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                            // '   </div>\n' +
                            '   </div>';
                    }
                }else if(data.examInscribeName === "判断题"){
                    examQuestionDetail += '<div style="padding: 2% 4%;font-size: 16px;color: #8a8a8a;">'+data.examDesign +'</div>\n' +
                        '<div class="row" style="height: 44px;">\n' +
                        '<label class="col-100" style="height: 44px;padding-top: 2%;padding-left: 4%;">\n' +
                        '   <input type="radio" name="'+data.id +'" value="1" style="vertical-align:middle;height: 50%;width: 6%;">\n' +
                        '    <!--<img src="" style="height: 25px;width: 25px;vertical-align: middle;">-->\n' +
                        '       <span class="item-title" style="font-size: 16px;color: #8a8a8a;">对</span></label>\n' +
                        // '   <div class="col-20" style="height: 44px;text-align: center;padding-top: 2%">\n' +
                        // '   <!--<input type="radio" name="my-checkbox" style="vertical-align:-webkit-baseline-middle;height: 50%;width: 30%;" >-->\n' +
                        // '   </div>\n' +
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

                $("#examQuestionDetailList").empty();
                $("#examQuestionDetailList").append(examQuestionDetail);
                $("[name='"+data.id+"']").attr("disabled", true);
                if(self.isNull(data.examInscribeName) === false){
                    $("#questionType").val(data.examInscribeName);
                }
                if(self.isNull(data.busName) === false){
                    $("#associatedBusiness").val(data.busName);
                }
                if(self.isNull(data.examScore) === false){
                    $("#points").val(data.examScore);
                }
                if(self.isNull(data.examInaccessibleName) === false){
                    $("#degreeDifficulty").val(data.examInaccessibleName);
                }
                if(self.isNull(data.examOkanswer) === false){
                    $("#examChooseAnswer").text(data.examOkanswer);
                }
            }, function (data) {
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
    window.ExamQuestionDetailController = new ExamQuestionDetailController();
})();