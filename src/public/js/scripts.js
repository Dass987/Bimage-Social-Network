$("#btn-like").click(function (e) {
	
	e.preventDefault();

	let imageId = $(this).data('id');

	$.post('/images/' + imageId + '/like')
		.done(data => {
			console.log(data);
			$(".likes-count").text(data.likes);
		});

});

$("#btn-delete").click(function (e) {
	
	e.preventDefault();
	let $this = $(this);

	const response = confirm('Are you sure you want to delete this image?');

	if (response) {
		
		let imageId = $this.data('id');
		
		$.ajax({
			url: '/images/' + imageId,
			type: 'DELETE'
		})
		.done(function (result) {
			$this.html('Deleted<i class="material-icons right">check</i>');
		});

	} else {

	}

});