import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emailsState, addEmail } from "../redux/emailsSlice";

const Signup = () => {
  // some local state just for the input
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const emails = useSelector(emailsState);

  const handleFormSubmission = (e) => {
    //prevent the form from refreshing the page
    e.preventDefault();
    // from stack overflow, a regex to test emails
    // makes sure there arent any weird charcters, theres an @, a . and some sort of domain
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    // Regex.prototype.test returns true if it matches the RegEx
    // we want to do something if it doesn't
    if (!emailRegex.test(email)) {
      // alert with error
      window.alert("Please enter a valid email address");
    } else if (emails.includes(email)) {
      // use Redux to check if they've already signed up
      window.alert("We already have you in our system!");
    } else {
      dispatch(addEmail(email));
      window.alert(
        "Thank you for signing up! We'll let you know about more cute dogs!"
      );
    }
    // no matter what, reset state
    setEmail("");
  };

  return (
    <div className="signup">
      <h3>Sign up for our mailing list!</h3>
      <form id="signup-form" onSubmit={handleFormSubmission}>
        <input
          type="text"
          label="email"
          placeholder="Write your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;
