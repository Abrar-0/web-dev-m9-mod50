import auth from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        console.log(email,pass)
        // create user
        createUserWithEmailAndPassword(auth,email,pass)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
      <div className="">
        <div className="mx-auto md:w-1/2">
          <h2 className="text-3xl mb-8">Please Register</h2>
          <form onSubmit={handleRegister}> 
            <input className="mb-4 w-3/4 py-2 px-4" type="email" name="email" id="" placeholder="Enter email"/>
            <br />
            <input className="mb-4 w-3/4 py-2 px-4" type="password" name="password" id="" placeholder="Enter password"/>
            <br />
            <input className="btn text-white btn-secondary mb-4 w-3/4 py-2 px-4" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
};

export default Register;
