$(function() {
	$('.signup .input.submit').click(function() {
		var email = $('.signup .input.email').text();
		var $message = $('.signup .message');

		var mailchimpAccount = '5081c2ff841600cd87a25a458',
			mailchimpListID = '0fd016514a';
			
		$.ajax({
			type: 'GET',
			url: '//codogo.us13.list-manage.com/subscribe/post-json?u=' + mailchimpAccount + '&amp;id=' + mailchimpListID + '&c=?',
			data: 'EMAIL='+email,
			dataType    : 'jsonp',
			error       : function(err) {
				$message.addClass('error').text('Something went wrong. Please try again later.');
			},
			success     : function(data) {
				data.result === 'success' ? $message.addClass('success').text('Awesome. Please check your inbox to verify your email.') : $message.addClass('error').text('Please enter a valid email address.');
			}
		})
	});

	$('.signup .input.email').keyup(function(event){
		if(event.keyCode == 13){
			$("#signup .input.submit").click();
		}
	});
});