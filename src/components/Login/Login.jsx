import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [suc, setSuc] = useState("");
  const [err, setErr] = useState("");
  const emailRef = useRef(null);

  const handleReset = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("reset pass", emailRef.current.value);
      return;
    }
    else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        console.log('please write a valid email')
        return;
    }
    // swnd validation email
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert('please check your email')
    })
    .catch(error =>{
        console.log(error.message)
    })
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    console.log(email, pass);
    // reset error and success
    setSuc("");
    setErr("");


    // add validation
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified){
            setSuc("Logged in successfully");
        }
        else{
            alert('Please verify your account')
        }
      })
      .catch((error) => {
        setErr(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleReset}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {err && <p className="text-red-600">{err}</p>}
          {suc && <p className="text-green-600">{suc}</p>}
          <p>
            New to this website? Please <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
``;
