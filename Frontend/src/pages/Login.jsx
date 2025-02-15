function Login() {
    return (
      <>
      <h1>Login</h1>
      <RegistrationForm/>
      </>
    )
  }


function RegistrationForm() {

    function handleSubmit(event) {
       event.preventDefault();
       const form = event.target;
       alert(`Username: ${form.username.value}`);
    }
  
    return (
       <form onSubmit={handleSubmit}>
          <p>
             <label htmlFor="username">
                Username?
             </label>
             <input 
                type="text" 
                id="username" />
          </p>
          <input type="submit" value="Register" />
       </form>
    );
  }

  export default Login;