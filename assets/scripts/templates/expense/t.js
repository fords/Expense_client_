var $ = function(selector){
	return document.querySelectorAll(selector);
}
var Spliter = function (config) {
    this.val = config.val;
	$mythis = this;
}
function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}
Spliter.prototype = {
    constructor: Spliter,
    init:function ()  {
		if(typeof(Storage) !== "undefined") {
			if(localStorage['friends'] == null){
				var FriendList = [];
				localStorage.setItem('friends',JSON.stringify(FriendList));
			}else{
				$mythis.loadFriends();
			}
			if(localStorage['lists'] == null){
				var MoneyList = [];
				localStorage.setItem('lists',JSON.stringify(MoneyList));
			}else{
				$mythis.loadLists();
			}
		}else{
			alert('LocalStorage not supported!!');
		}
    },
    loadThisName: function(e){
    	$('.EnterFriendDetails')[0].style.display = 'block';
    	$('.EnterListDetails')[0].style.display = 'none';
    	$('#frSubmit')[0].style.display = 'none';
    	$('#frSave')[0].style.display = 'inline-block';
    	var index = e.target.parentNode;
    	index = index.getAttribute('data-attr');
    	var frtemp = JSON.parse(localStorage['friends']);
    	$('#friendName')[0].value = frtemp[index].Name;
    	$mythis.val = index;
    },
    saveThisName: function(index){
    	var fr = JSON.parse(localStorage['friends']);
    	fr[index].Name = $('#friendName')[0].value;
    	localStorage.setItem('friends',JSON.stringify(fr));
    	$mythis.loadFriends();
    	setTimeout($mythis.clearFrName,100);
    },
    deleteThisName: function(e){
    	var index = e.target.parentNode.getAttribute('data-attr');
    	var fr = JSON.parse(localStorage['friends']);
    	fr.splice(index,1);
    	localStorage.setItem('friends',JSON.stringify(fr));
    	$mythis.loadFriends();
    },
    loadFriends: function(){
    	var fr = localStorage['friends'];
    	fr = JSON.parse(fr);
    	$('.myFriend ul')[0].innerHTML = '';
		for(i in fr){
			var thisLi = document.createElement('li');
			var name = document.createElement('span');
			name.appendChild(document.createTextNode(fr[i].Name));
			var editName = document.createElement('a');
			editName.href = 'javascript:;';
			editName.addEventListener('click',$mythis.loadThisName,false);
			editName.appendChild(document.createTextNode('Edit'));
			var deleteName = document.createElement('a');
			deleteName.href = 'javascript:;';
			deleteName.addEventListener('click',$mythis.deleteThisName,false);
			deleteName.appendChild(document.createTextNode('Delete'));
			thisLi.appendChild(name);
			thisLi.appendChild(editName);
			thisLi.appendChild(deleteName);
			thisLi.setAttribute('data-attr',i);
			$('.myFriend ul')[0].appendChild(thisLi);
		}
    },
    showDetails: function(e){
    	e.target.parentNode.children[1].style.display = 'block';
    	e.target.parentNode.children[2].style.display = 'none';
    },
    clearForm: function(){
    	$('#listName')[0].value = '';
    	$('#listAmount')[0].value = '';
    	for ( var i = 0, l = $('#listFriends')[0].options.length, o; i < l; i++ ){
			o = $('#listFriends')[0].options[i];
			o.selected = false;
		}
    },
    editList: function(e){
    	var fr = localStorage['lists'];
    	fr = JSON.parse(fr);
    	fr[e].Desc = $('#listName')[0].value;
		fr[e].Amount =  $('#listAmount')[0].value;
		var partners = [];
		for(var t in $('#listFriends')[0].selectedOptions){
			partners.push($('#listFriends')[0].selectedOptions[t].text);
		}
    	fr[e].Friends = partners;
    	localStorage.setItem('lists',JSON.stringify(fr));
    	$mythis.loadLists();
    	setTimeout($mythis.clearForm,100)
    },
    loadFriendListinBill:function(){
    	var frtemp = JSON.parse(localStorage['friends']);
    	$('#listFriends')[0].innerHTML = '';
    	for(var i in frtemp){
		var options = document.createElement('option');
			options.value = frtemp[i].Name;
			options.text = frtemp[i].Name;
			$('#listFriends')[0].appendChild(options);
		}
    },
    editDetails: function(e){
    	$('#lsSubmit')[0].style.display = 'none';
    	$('#lsChange')[0].style.display = 'block';
    	$('.EnterFriendDetails')[0].style.display = 'none';
    	$('.EnterListDetails')[0].style.display = 'block';
    	var bill = e.target.parentNode;
    	var index = bill.children[0].getAttribute('data-attr');
    	var fr = localStorage['lists'];
    	fr = JSON.parse(fr);
    	console.log(index);
    	setTimeout($mythis.loadFriendListinBill,100);
    	$('#listName')[0].value = fr[index].Desc;
    	$('#listAmount')[0].value = fr[index].Amount;
    	fr[index].Friends = cleanArray(fr[index].Friends);
    	$mythis.val = index;

    	for ( var i = 0, l = $('#listFriends')[0].options.length, o; i < l; i++ ){
			o = $('#listFriends')[0].options[i];
			if ( fr[index].Friends.indexOf( o.text ) != -1 ){
				o.selected = true;
			}
		}
    },
    deleteDetails: function(e){
    	var bill = e.target.parentNode;
    	var index = bill.children[0].getAttribute('data-attr');
    	var fr = localStorage['lists'];
    	fr = JSON.parse(fr);
    	console.log(index);
    	fr.splice(index,1);
    	localStorage.setItem('lists',JSON.stringify(fr));
    	$mythis.loadLists();
    },
    loadLists: function(){
    	var fr = localStorage['lists'];
    	fr = JSON.parse(fr);
    	$('.myLists ul')[0].innerHTML = '';
		for(i in fr){
			var thisLi = document.createElement('li')
			var Name = document.createElement('div');
			Name.className = 'ListDescription';
			Name.setAttribute('data-attr',i)
			Name.appendChild(document.createTextNode(fr[i].Desc));
			thisLi.appendChild(Name);
			var showmore = document.createElement('a');
			showmore.href = 'javascript:;';
			showmore.addEventListener('click',$mythis.showDetails,false);
			showmore.appendChild(document.createTextNode('Show Detail'));

			var EditList = document.createElement('a');
			EditList.href = 'javascript:;';
			EditList.addEventListener('click',$mythis.editDetails,false);
			EditList.appendChild(document.createTextNode('Edit Bill'));

			var DeleteList = document.createElement('a');
			DeleteList.href = 'javascript:;';
			DeleteList.addEventListener('click',$mythis.deleteDetails,false);
			DeleteList.appendChild(document.createTextNode('Delete Bill'));

			var moreDetails = document.createElement('div');
			moreDetails.style.display = 'none';
			var showFriendsDivision = document.createElement('div');
			showFriendsDivision.className = 'NeedToPay';
			var testArr = fr[i].Friends;
			fr[i].Friends = cleanArray(testArr);
			var thisFriendsAmount = parseInt(fr[i].Amount)/parseInt(fr[i].Friends.length);
			thisFriendsAmount = thisFriendsAmount.toFixed(2);
			for(var y in fr[i].Friends){

				var thisFr = fr[i].Friends[y];
				var frName = document.createElement('span')
				if(thisFr){
					frName.appendChild(document.createTextNode(thisFr + ' has to pay: ' + thisFriendsAmount));
					showFriendsDivision.appendChild(frName);
					thisLi.appendChild(showFriendsDivision);
				}
			}
			thisLi.appendChild(showmore);
			thisLi.appendChild(EditList);
			thisLi.appendChild(DeleteList);
			$('.myLists ul')[0].appendChild(thisLi);

		}
    },
    clearFrName: function(){
    	$('#friendName')[0].value = '';
    },
    addFriend: function(){
    	var fr = localStorage.getItem('friends');
		fr = JSON.parse(fr);
		var myFriend = $('#friendName')[0].value;
		fr.push({'Name':myFriend})
    	localStorage.setItem('friends',JSON.stringify(fr));
    	$mythis.loadFriends();
    	setTimeout($mythis.clearFrName,100)
    },
    addList: function(){
    	var fr = localStorage.getItem('lists');
		fr = JSON.parse(fr);
		var myListdetails = $('#listName')[0].value;
		var myListAmount = $('#listAmount')[0].value;
		var partners = [];
		for(var t in $('#listFriends')[0].selectedOptions){
			partners.push($('#listFriends')[0].selectedOptions[t].text);
		}
		fr.push({'Desc':myListdetails,'Amount':myListAmount,'Friends':partners})
    	localStorage.setItem('lists',JSON.stringify(fr));
    	setTimeout($mythis.clearForm,100)
    	$mythis.loadLists();
    }
}



var initSpliter = new Spliter({
	val:20
});
initSpliter.init();
$('.AddFriend')[0].addEventListener("click", function(){
	$('.listform')[1].style.display = 'none';
	$('.EnterFriendDetails')[0].style.display = 'block';
	$('#frSave')[0].style.display = 'none';
	$('#frSubmit')[0].style.display = 'inline-block';
},false);
$('.AddLists')[0].addEventListener("click", function(){
	$('.listform')[0].style.display = 'none';
	$('#lsSubmit')[0].style.display = 'block';
    $('#lsChange')[0].style.display = 'none';
	$('#listName')[0].value = '';
	$('#listAmount')[0].value = '';
	initSpliter.loadFriendListinBill();
	$('.EnterListDetails')[0].style.display = 'block';
},false);
$('#frSave')[0].addEventListener("click", function(){validateFr(1)},false);
$('#frSubmit')[0].addEventListener("click", function(){validateFr(0)},false);
$('#lsSubmit')[0].addEventListener("click", function(){validateList(0);},false);
$('#lsChange')[0].addEventListener("click", function(){validateList(1);},false);
var validateFr = function(type){
	var fl = true;
	if($('#friendName')[0].value == ''){
		fl = false;
	}
	if(fl){
		if(type == 0){
			initSpliter.addFriend();
		}else if(type == 1){
			initSpliter.saveThisName(initSpliter.val);
		}
	}
	return fl;
}
var validateList = function(type){
	var flag = true;
	var name = $('#listName')[0].value;
	var amount = $('#listAmount')[0].value;
	var list = $('#listFriends')[0].selectedOptions;
	if(name == ''){
		flag = false;
	}
	if(amount == ''){
		flag = false;
	}
	if(list.length == 0){
		flag = false;
	}
	if(flag){
		if(type == 0){
			initSpliter.addList();
		}else if(type == 1){
			initSpliter.editList(initSpliter.val);
		}
	}
	return flag;
}
