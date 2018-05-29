//Send event and data for socket.io
function LoadContacts() {
	$.post("/loadContacts", function(contacts){
		$("#listContacts").html("List Contact Actuelle : ");
		contacts.forEach(function(i){
			$("#listContacts").append("<div class = 'id'>" + i.id + ":" + i.name + "</div>");
		});
		$("#cbListContact").empty();
		var combo = document.getElementById('cbListContact');
		var length = combo.options.length;

		contacts.forEach(function(i){
			var opt = document.createElement('option');
			opt.innerHTML = i.id;
			opt.value = i.id;
			combo.appendChild(opt);
		});
	});	
}

function SendToServer(_url, _type, _id, _name) {
	const _contact = {
		id : _id,
		name : _name
	}

	$.ajax({
		url: _url,
		type: _type,
		data: _contact,
		success: function(response){
		}
	})
	LoadContacts();
}

$(document).ready(function(){
	$("#listContacts").hide();

	$("#btnLister").click(function () {
		$("#listContacts").show(1000);
	});

	$("#btnHide").click(function () {
		$("#listContacts").hide(1000);
	});

	LoadContacts()

	$("#btnAdd").click(function(){
		SendToServer('addContact', 'POST', $("#txtId").val(), $("#txtName").val())
		$("#txtId").val('');
		$("#txtName").val('');
	});

	$("#btnModify").click(function(){
		SendToServer('ModifyContact', 'POST', $("#cbListContact").val(), $("#txtNameOfID").val());
		$("#txtNameOfID").val('');
	});

	$("#btnDelete").click(function(){
		SendToServer('DeleteContact','DELETE', $("#cbListContact").val(), '');
	});
});