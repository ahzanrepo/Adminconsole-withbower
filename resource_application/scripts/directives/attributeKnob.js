/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("resourceskill", function ($filter, $uibModal, resourceService) {

    return {
        restrict: "EAA",
        scope: {
            selectedAttribute: "=",
            'deleteAttributedrictive':'&'
        },

        templateUrl: 'resource_application/partials/template/attributeKnob.html',

        link: function (scope, element, attributes) {

            if(!scope.selectedAttribute.Percentage){
                scope.selectedAttribute.Percentage=0;
            }
            scope.knobValue = 0;
            scope.$watch("knobValue",
            function (newValue, oldValue) {
                $("#"+scope.selectedAttribute.AttributeId).val(newValue).trigger("change");
            }
            );

            scope.knobValue = scope.selectedAttribute.Percentage;

            scope.deleteAttribute = function (item) {
                scope.deleteAttributedrictive(item);
            };

            <!-- jQuery Knob -->
            $(".knob").knob({

                change: function(value) {
                    /*console.log("change : " + value);*/
                },
                release: function(value) {
                    //console.log(this.$.attr('value'));
                    scope.selectedAttribute.savedObj.Percentage=value;
                    resourceService.UpdateAttributesAttachToResource(scope.selectedAttribute).then(function (response) {

                        if (response.IsSuccess) {
                            console.log("UpdateAttributesAttachToResource : " + value);
                        }
                        else {

                        }
                    }, function (error) {
                        console.info("AssignTaskToResource err" + error);
                    });
                    console.log("release : " + value);


                },
                cancel: function() {
                    console.log("cancel : ", this);
                },
                format : function (value) {
                 return value + '%';
                 },
                draw: function() {

                    // "tron" case
                    if (this.$.data('skin') == 'tron') {

                        this.cursorExt = 0.3;

                        var a = this.arc(this.cv) // Arc
                            ,
                            pa // Previous arc
                            , r = 1;

                        this.g.lineWidth = this.lineWidth;

                        if (this.o.displayPrevious) {
                            pa = this.arc(this.v);
                            this.g.beginPath();
                            this.g.strokeStyle = this.pColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                            this.g.stroke();
                        }

                        this.g.beginPath();
                        this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                        this.g.stroke();

                        this.g.lineWidth = 2;
                        this.g.beginPath();
                        this.g.strokeStyle = this.o.fgColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                        this.g.stroke();
                        return false;
                    }
                }
            });


        }

    }
});