<!DOCTYPE html>
<html>
<head>
	<title>Age Input Form</title>
</head>
<body>

	<h1>Please enter your age:</h1>

	<form>
		<label for="age">Age:</label>
		<input type="number" id="age" name="age">
		<button type="submit" onclick="submitAge(event)">Submit</button>
	</form>

	<!-- link to previous page -->

	<p>Click <a href="#" id="link" onclick="navigateToPage(event)">here</a> to go to another page.</p>
	
	<script>
		function submitAge(event) {
			event.preventDefault(); // Prevent the form from submitting

			var age = document.getElementById("age").value;

			if (age < 18) {
				alert("You are too young to use this service.");
			} else {
				alert("Your age is " + age);
			}
		}
	</script>

</body>
</html>
