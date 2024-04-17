import { useState } from "react";
import auth from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");
  const [show, setShow] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, pass, accepted);
    // reset error
    setErr("");
    // reset success
    setSuc("");

    if (pass.length < 6) {
      setErr("Password should be of 6 characters or long");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      setErr("Password should contain atleast one uppercase character");
      return;
    } else if (!accepted) {
      setErr("Please accept our terms and condition");
    }

    // create user
    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        console.log(result.user);
        setSuc("User created suucessfully");
        
        // update profile
        updateProfile(result.user,{
            displayName:name,
            photoURL:"https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=> console.log('profile updated'))
        .catch(error => console.log(error))

        // send verification email
        sendEmailVerification(result.user)
        .then(() => {
          alert("please check your email and verify your account");
        });
      })
      .catch((error) => {
        console.log(error);
        setErr(error.message);
      });
  };
  return (
    <div className="">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-8">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full py-2 px-4"
            type="text"
            name="name"
            id=""
            placeholder="Your name"
          />
          <input
            className="mb-4 w-full py-2 px-4"
            type="email"
            name="email"
            id=""
            placeholder="Enter email"
          />
          <br />
          <div className="relative border">
            <input
              className="w-full py-2 px-4"
              type={show ? "text" : "password"}
              name="password"
              id=""
              placeholder="Enter password"
            />
            <span
              className="absolute top-3 right-2"
              onClick={() => setShow(!show)}
            >
              {show ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="ml-2">
              {" "}
              Accept our terms and conditions
            </label>
          </div>
          <br />
          <input
            className="btn text-white btn-secondary mb-4 w-full py-2 px-4"
            type="submit"
            value="Submit"
          />
        </form>
        {err && <p className="text-red-300">{err}</p>}
        {suc && <p className="text-green-300">{suc}</p>}
        <p>
          Already have an account? Please <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
