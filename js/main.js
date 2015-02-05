var main = {
	init: function(){
		registrationForm.init();
	}
}

var registrationForm = {
	init: function(){
		$('#btn-submit').click(function(){
			if( registrationForm.isValid() ){
				
				var options = {
					url: 'register.json',
					dataType: 'json',
					success: function(resp){
						window.location.href = resp.dest;
					}
				}
				$.ajax(options);
			}
		});
	},
	isValid: function(){
		var firstname = $('input[name="firstname"]').val();
		var lastname = $('input[name="lastname"]').val();
		var email = $('input[name="email"]').val();
		var password = $('input[name="password"]').val();
		
		var isValid = true; 
		$('input', '.required').each(function(){
			if( !$(this).val() ){
				$('.alert, li.required-fields', '#registrationForm').show();
				$(this).closest('.form-group').addClass('has-error');
				isValid = false;
			}else{
				$(this).closest('.form-group').removeClass('has-error');
			}
		});
		
		if( $('.has-error').length == 0 ){
			$('li.required-fields', '#registrationForm').hide();
		}
		
		if( !registrationForm.validateEmail(email) ){
			$('.alert, li.invalid-email', '#registrationForm').show();
			$('input[name="email"]').closest('.form-group').addClass('has-error');
			isValid = false;
		}else{
			$('li.invalid-email', '#registrationForm').hide();
			$('input[name="email"]').closest('.form-group').removeClass('has-error');
		}
		
		if( isValid ){
			$('.alert', '#registrationForm').hide();
		}
		
		return isValid;
	},
	validateEmail: function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
}