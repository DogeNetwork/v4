function login() {
      var password = document.getElementById("password").value;
      var errorMessage = document.getElementById("error-message");

      if (password === "duontop") {
        location.href = '/app';
        errorMessage.textContent = ""; // Clear error message
        localStorage.setItem('pass', 'correct');
      } else {
        errorMessage.textContent = "Incorrect password. Please try again.";
      }

      return false; // Prevent form submission
    }
