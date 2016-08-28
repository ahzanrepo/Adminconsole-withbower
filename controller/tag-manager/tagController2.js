/**
 * Created by Pawan on 8/24/2016.
 */
mainApp.controller('tagcontroller2', function ($scope,$rootScope,$state,$uibModal, jwtHelper,authService,tagBackendService)
{
    var  tree, treedata_avm=[];

    $scope.my_data=[];
    $scope.newChildObject={};
    $scope.tagCategories=[];
    $scope.currentCatID="";


    $scope.showAlert = function (tittle,content,type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };


    $scope.loadTagDetails = function (tagID,callback) {
        if(tagID)
        {
            tagBackendService.getTagDetails(tagID).then(function (response) {

                if(!response.data.IsSuccess)
                {
                    callback(new Error("Error"),null);

                }
                else
                {
                    callback(null,response.data.Result);

                }
            }), function (error) {
                console.log("Tag detail picking error ",error);
                callback(error,null);
            }


        }
        else
        {
            callback(new Error("Invalid Tag"),null);
        }

    };

    $scope.childTreeGenerator= function (childTags,motherBranch) {

        for(var i=0;i<childTags.length;i++)
        {
            $scope.loadTagDetails(childTags[i], function (error,tagResponse) {
                if(error)
                {
                    console.log(error);
                }
                else
                {

                    var newChild=$scope.try_adding_a_branch(motherBranch,tagResponse);

                    if(tagResponse.tags.length>0)
                    {
                        $scope.childTreeGenerator(tagResponse.tags,newChild)
                    }


                }
            });
        }
    }

    $scope.loadCategoryData = function () {
        tagBackendService.getTagCategories().then(function (response) {

            if(!response.data.IsSuccess)
            {

                console.info("Error in adding new Application "+response.data.Exception);

                //$scope.showAlert("Error",)
            }
            else
            {
                $scope.tagCategories=response.data.Result;
            }

        }), function (error) {
            console.info("Error in adding new Application "+error);


        }


    };

    $scope.saveNewTagData = function (parentTag,newTagData) {

        var rootBranch=tree.get_first_branch();
        if(rootBranch==parentTag)
        {
            tagBackendService.saveAndAttachNewTagToCategory(rootBranch._id,newTagData).then(function (response) {

                if(response)
                {
                    if(!response.data.IsSuccess)
                    {
                        console.log("New Tag adding failed");
                        $scope.showAlert("Error","New tag adding failed","error");
                    }
                    else
                    {
                        console.log("New Tag adding succeeded");
                        $scope.showAlert("Success","New Tag added successfully","success");
                        newTagData._id=response.data.Result.newTagID;
                        $scope.try_adding_a_branch(parentTag,newTagData);
                    }
                }
                else
                {
                    console.log("New Tag adding failed");
                    $scope.showAlert("Error","New tag adding failed","error");

                }


            }), function (error) {
                console.log("New Tag adding to category failed",error);
                $scope.showAlert("Error","New tag adding failed","error");
            }

        }
        else
        {
            tagBackendService.saveAndAttachNewTag(parentTag._id,newTagData).then(function (response) {

                if(response)
                {
                    if(!response.data.IsSuccess)
                    {
                        console.log("New Tag adding failed");
                        $scope.showAlert("Error","New tag adding failed","error");
                    }
                    else
                    {
                        console.log("New Tag adding succeeded");
                        $scope.showAlert("Success","New Tag added successfully","success");
                        newTagData._id=response.data.Result.newTagID;
                        $scope.try_adding_a_branch(parentTag,newTagData);
                    }
                }
                else
                {
                    console.log("New Tag adding failed");
                    $scope.showAlert("Error","New tag adding failed","error");
                }


            }), function (error) {
                console.log("New Tag adding failed",error);
                $scope.showAlert("Error","New tag adding failed","error");

            }
        }







    };

    $scope.deleteTag = function () {
        var selectedBranch;
        selectedBranch = tree.get_selected_branch();

        var rootBranch = tree.get_first_branch();

        var parent_ID = selectedBranch.parent_id;


        if(!parent_ID)
        {
            console.log("You cannot delete this Tag/Tag category");
        }
        else
        {
            if(parent_ID==rootBranch._id)
            {
                tagBackendService.detachTagFromCategory(parent_ID,selectedBranch._id).then(function (response) {
                    console.log("success");
                    $scope.showAlert("Success","Tag detached from Category successfully","success");
                    $state.reload();
                }), function (error) {
                    console.log("error");
                    $scope.showAlert("Error","Tag detached from Category failed","error");
                };
            }
            else
            {
                tagBackendService.detachTagFromTag(parent_ID,selectedBranch._id).then(function (response) {
                    console.log("success");
                    $scope.showAlert("Success","Tag detached from Tag successfully","success");
                    $state.reload();
                }), function (error) {
                    console.log("error");
                    $scope.showAlert("Error","Tag detached from Tag failed","error");
                };
            }
        }


    }


    $scope.showModal= function (selectedBranch) {
        //modal show
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/tag-manager/partials/tagModal.html',
            controller: 'NewChildTagController',
            size: 'sm',
            resolve: {
                parentTag: function () {
                    return selectedBranch;
                },
                saveNewTagData : function () {
                    return $scope.saveNewTagData;
                }
            }
        });
    };


    $scope.$watch('my_data', function() {

    });


    $scope.loadCategoryData();

    $scope.my_tree_handler = function(branch) {
        var _ref;
        $scope.output = "You selected: " + branch.label;
        if ((_ref = branch.data) != null ? _ref.description : void 0) {
            return $scope.output += '(' + branch.data.description + ')';
        }
    };

    $scope.my_data = treedata_avm;


    $scope.my_tree = tree = {};

    $scope.try_async_load = function() {
        $scope.my_data = [];
        $scope.doing_async = true;
        return $timeout(function() {
            if (Math.random() < 0.5) {
                $scope.my_data = treedata_avm;
            } else {
                $scope.my_data = treedata_geography;
            }
            $scope.doing_async = false;
            return tree.expand_all();
        }, 1000);
    };

    $scope.showNewChildModal = function () {
        var selectedBranch;
        selectedBranch = tree.get_selected_branch();

        var rootBranch=tree.get_first_branch();


        if(selectedBranch)
        {
            console.log(selectedBranch.label+ " Selected");
            $scope.showModal(selectedBranch);
        }
        else
        {
            console.log("Branch selection error");
        }



    };

    $scope.treeBuilder = function () {
        if(!$scope.currentCatID)
        {
            console.log("Invalid Category");
            $scope.showAlert("Error","Invalid Category","error");
        }
        else
        {
            $scope.my_data=[];
            $scope.newChildObject={};
            treedata_avm=[];
            tagBackendService.getTagCategory($scope.currentCatID).then(function (response) {

                if(!response.data.IsSuccess)
                {

                    console.info("Error in adding new Application "+response.data.Exception);
                    $scope.showAlert("Error","Invalid Category Data found","error");

                    //$scope.showAlert("Error",)
                }
                else
                {
                    console.log("Success");
                    console.log(response.data.Result);

                    var rootData=
                    {
                        label: response.data.Result.name,
                        _id: response.data.Result._id,
                        children:[]


                    }
                    var childTags=response.data.Result.tags;
                    treedata_avm.push(rootData);
                    console.log("Tree data found ",JSON.stringify(treedata_avm));
                    $scope.my_data = treedata_avm;
                    $scope.my_tree_handler(treedata_avm[0]);

                    $scope.childTreeGenerator(childTags,treedata_avm[0]);





                }

            }), function (error) {
                console.info("Error in adding new Application "+error);
                $scope.showAlert("Error","Invalid Category","error");


            }
        }

    };



    return $scope.try_adding_a_branch = function(currentBranch,childDetails) {

        var parentBranch = tree.get_selected_branch();

        return tree.add_branch(currentBranch, {
            label: childDetails.name,
            _id:childDetails._id,
            parent_id:currentBranch._id,
            children:[]

        });
    };




});

mainApp.controller("NewChildTagController", function ($scope,$rootScope, $uibModalInstance,parentTag,saveNewTagData) {


    $scope.showModal=true;

    $scope.ok = function () {
        var childTag =
        {
            name:$scope.tagNameData,
            descricption : $scope.tagDesc
        }
        saveNewTagData(parentTag,childTag);
        $scope.showModal=false;
        $uibModalInstance.close();

    };

    $scope.saveNewTag= function () {

        var childTag =
        {
            name:$scope.tagNameData,
            descricption : $scope.tagDesc
        }
        saveNewTagData(parentTag,childTag);
        $scope.showModal=false;
        $uibModalInstance.close();


    };

    $scope.closeModal = function () {
        saveNewTagData(parentTag,null);
        $scope.showModal=false;
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        saveNewTagData(parentTag,null);
        $scope.showModal=false;
        $uibModalInstance.dismiss('cancel');
    };



});