(function(){

	var app = angular.module('myQuiz',[]);
    app.controller('QuizController',['$scope','$http','$sce',function($scope,$http,$sec){
        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered =0;
        $scope.percentage=0;

        $http.get('data.json').then(function(quizData){
            $scope.myQuestions=quizData.data;
            $scope.totalQuestions=$scope.myQuestions.length;
        });

        //index of parent and index of answerm parameters
                  $scope.selectAnswer=function (qIndex,aIndex) {
                 /// alert(qIndex + 'and' + aIndex)
                      // we are setting question state variable equal to questionstate of the question that was answerewd by index.
                  var questionState =$scope.myQuestions[qIndex].questionState;
                      if(questionState != 'answered'){
                           $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                          var correctAnswer=$scope.myQuestions[qIndex].correct;
                          $scope.myQuestions[qIndex].correctAnswer=correctAnswer;
                          if(aIndex===correctAnswer){
                              $scope.myQuestions[qIndex].correctness='correct';
                              $scope.score+=1;
                          } else{
                              $scope.myQuestions[qIndex].correctness='incorrect';
                          }
                          $scope.myQuestions[qIndex].questionState='answered';
                      }
                       $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
                  }
           $scope.isSelected =function(qIndex,aIndex){
               //add a function called on the individual answer thats come over here and checked isselected
               // so once we select the indivaul answer isselected  is going to return true if the selectedanswer=indexanswer
               return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
           }
        $scope.isCorrect =function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        $scope.selectContinue = function(){
            return $scope.activeQuestion += 1;
        }

        $scope.createShareLinks=function (percentage) {
            var url='http:/codifydesign.com';
            var emailLink = '<a class="btn email" href="mailto:?subject=try to beat my score!&amp=i scored a '+percentage+'% in quiz ' +
                'about staurn. try to beat my score at '+url+'.">Email a friend </a>';
            var twitterLink = '<a  class="btn twitter" target="_blank"  href="http://twitter.com/share/text= I sscored a '+percentage+'%' +
                ' on quiz about saturn try to beat my score at &amp;hashtags=SaturnQuiz&amp;url='+url+'">Tweet your score </a>';
            var newMarkup = emailLink + twitterLink;
            return $sce.trustAsHtml(newMarkup);


        }
    }]);

})();