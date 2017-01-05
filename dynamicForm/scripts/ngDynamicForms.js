/**
 * Created by Rajinda on 6/13/2016.
 */

mainApp.controller('FormBuilderCtrl',function FormBuilderCtrl($scope,ticketService,$anchorScroll)
{
    $anchorScroll();
	$scope.addNew = false;$scope.isProgress = false;$scope.isLoading = false;

	$scope.createForm = function () {
		$scope.addNew = !$scope.addNew;
	};

	$scope.showAlert = function (tittle, content) {

		new PNotify({
			title: tittle,
			text: content,
			type: 'success',
			styling: 'bootstrap3'
		});
	};

	$scope.showError = function (tittle,content) {

		new PNotify({
			title: tittle,
			text: content,
			type: 'error',
			styling: 'bootstrap3'
		});
	};

	$scope.saveForm = function(formName,data){
		$scope.isProgress =true;
		var postData = {
			"name": formName,
			"fields":[]
		};

		angular.forEach(data,function(item){
			item.title = item.field;
			postData.fields.push(item);
		});

		ticketService.SaveForm(postData).then(function (response) {
			if(response){
				$scope.showAlert("Save Form", "Save Successfully");
				$scope.fields = [];
				$scope.formName="";
				$scope.LoadFormList();
			}
			else{
				$scope.showError("Save Form", "Fail To Save Form Data.");
			}
			$scope.isProgress=false;
		}, function (error) {
			$scope.showError("Save Form", "Fail To Save Form Data.");
		});
	};

	$scope.LoadFormList = function(){
		$scope.isLoading=true;
		ticketService.LoadFormList().then(function (response) {
			if(response){
				$scope.formList=response;
			}
			else{
				$scope.showError("Load Form", "Fail To Load Form List.");
			}
			$scope.isLoading=false;
		}, function (error) {
			$scope.showError("Load Form", "Fail To Load Form List.");
		});

	};

	$scope.saveProfileForm = function()
	{
		var obj = {
			ticket_form : $scope.currentTicketForm,
			profile_form : $scope.currentProfileForm
		};

		if($scope.currentProfileForm || $scope.currentTicketForm)
		{
			//Update
			ticketService.updateFormProfile(obj).then(function(resp)
			{
				if(resp && resp.IsSuccess)
				{
					$scope.showAlert("Operation Successful", "Form Profile Saved Successfully");

				}
				else
				{
					$scope.showError("Error updating profile", "Fail To Update Profile");
				}

			}).catch(function(err)
			{
				$scope.showError("Error updating profile", "Fail To Update Profile");

			})
		}
		else
		{
			//Save

			ticketService.saveFormProfile(obj).then(function(resp)
			{
				if(resp && resp.IsSuccess)
				{
					$scope.showAlert("Operation Successful", "Form Profile Saved Successfully");

				}
				else
				{
					$scope.showError("Error saving profile", "Fail To Save Profile");
				}

			}).catch(function(err)
			{
				$scope.showError("Error saving profile", "Fail To Save Profile");

			})
		}
	};

	var getFormProfileData = function()
	{
		ticketService.getFormProfile().then(function(resp)
		{
			if(resp && resp.Result)
			{
				if(resp.Result.profile_form)
				{
					$scope.currentProfileForm = resp.Result.profile_form._id;
				}
				if(resp.Result.ticket_form)
				{
					$scope.currentTicketForm = resp.Result.ticket_form._id;
				}

			}

		}).catch(function(err)
		{
			$scope.showError("Error loading profile", "Fail To Load Profile");

		})
	};
	$scope.LoadFormList();
	getFormProfileData();

	$scope.newField = {};
	/*$scope.fields = [ {
		type : 'text',
		field : 'Name',
		description : 'Please enter your name',
		id : 1
	} ];*/
	$scope.fields = [];
	$scope.editing = false;
	$scope.tokenize = function(slug1, slug2) {
		var result = slug1;
		result = result.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
		result = result.replace(/-/gi, "_");
		result = result.replace(/\s/gi, "-");
		if (slug2) {
			result += '-' + $scope.token(slug2);
		}
		return result;
	};
	$scope.saveField = function() {
		console.log("entered save");
		if (!$scope.newField.field){
			$scope.showError("Design Form", "Please Enter Field Name.");
			return;
		}
		if (!$scope.newField.id){
			$scope.showError("Design Form", "Please Select ID.");
			return;
		}
		if (!$scope.newField.type){
			$scope.showError("Design Form", "Please Select Field Type.");
			return;
		}


		if ($scope.newField.type == 'checkboxes') {
			$scope.newField.value = {};
		}
		if ($scope.editing !== false) {
			$scope.fields[$scope.editing] = $scope.newField;
			$scope.editing = false;
		} else {
			$scope.fields.push($scope.newField);
		}
		$scope.newField = {
			id : 0
		};
	};
	$scope.editField = function(field) {
		$scope.editing = $scope.fields.indexOf(field);
		$scope.newField = field;
	};
	$scope.splice = function(field, fields) {
		fields.splice(fields.indexOf(field), 1);
	};
	$scope.addOption = function() {
		if ($scope.newField.values === undefined) {
			$scope.newField.values = [];
		}
		$scope.newField.values.push({
			id : 0
		});
	};
	$scope.typeSwitch = function(type) {
		/*if (angular.Array.indexOf(['checkboxes','select','radio'], type) === -1)
			return type;*/
		if (type == 'checkboxes')
			return 'multiple';
		if (type == 'select')
			return 'multiple';
		if (type == 'radio')
			return 'multiple';

		return type;
	}
});

app.directive('ngDynamicForm', function () { 
    return { 
        // We limit this directive to attributes only.
         restrict : 'A',

        // We will not replace the original element code
        replace : false,
        
        // We must supply at least one element in the code 
        templateUrl : 'dynamicForm/view/template/dynamicForms.html',
    } 
});
