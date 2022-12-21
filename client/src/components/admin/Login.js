import { useState } from "react";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    
      const res =  await axios.post('/auth/login', {...values})

      if(res.data.msg) {
            
        alert(res.data.msg)

    } else  {
        localStorage.setItem('firstLogin', true)
        window.location.href = '/'
        
    }





  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}

          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
