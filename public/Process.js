//Send event and data for socket.io
function LoadContacts() {
	$.post("/loadContacts", function(contacts){
		$("#listContacts").html("List Contact Actuelle : ");
		contacts.forEach(function(i){
			console.log(i);
			$("#listContacts").append("<div class = 'id'>" + i.id + ":" + i.name + "</div>");
		});
	});	
}

$(document).ready(function(){
	LoadContacts()

	$("#btnAdd").click(function(){
		const _contact = {
			id : $("#txtId").val(),
			name : $("#txtName").val()
		}
		console.log('here')
		$.ajax({
			url: '/addContact',
			type: 'POST',
			data: _contact,
			success: function(response){
			}
		})

		$("#txtId").val('');
		$("#txtName").val('');
		LoadContacts()
	});
});