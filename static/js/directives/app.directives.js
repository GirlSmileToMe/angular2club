(function () {
    var directives=angular.module('app.directives',[]);

    directives.directive('unique',uniqueDirecitve);

    function uniqueDirecitve($parse,user) {
        return {
            require:'?^ngModel',
            link:function (scope,element,attr,ngModel) {
                var field=attr.unique;
                var isUnique=false;
                var getNgModel=$parse(attr.ngModel);

                element.bind('blur',function () {
                    var value=getNgModel(scope);

                    if(isUnique||!value){
                        return;
                    }

                    user.unique(field,value)
                        .success(function (resp) {
                            console.log(resp);
                            ngModel.$setValidity('unique',true);
                            isUnique=true;
                        })
                        .error(function (err) {
                            console.log(err);
                            ngModel.$setValidity('unique',false);
                            isUnique=true;
                        });
                });

                element.bind('input',function () {
                    isUnique=false;
                });
            }
        };
    }

    directives.directive('languageMenu',languageMenuDirective);

    function languageMenuDirective ($translate) {
        return {
            link:function (scope,element) {
                var langs=[
                    {text:'中文',value:'zh_CN',isChecked:true},
                    {text:'English',value:'en',isChecked:false},
                ];

                scope.openMenu=function($mdOpenMenu, ev) {
                  $mdOpenMenu(ev);
                };

                scope.changeLang=function (lang) {
                    $translate.use(lang.value);
                    angular.forEach(langs, function(item) {
                        item.isChecked=false;
                    });

                    lang.isChecked=true;
                };

                scope.langs=langs;
            }
        }
    }

})();