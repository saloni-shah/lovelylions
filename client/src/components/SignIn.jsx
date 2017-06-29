import React from 'react';
import $ from 'jquery';

const SignIn = (props) => (
  <div className="sign-in">
    <h3>Sign In</h3>
    <form>
      <input type="text" placeholder="userName" />
      <input type="text" placeholder="password" />
      <button type="submit">submit</button>
      <a href="/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Facebook</a>

      &nbsp; &nbsp;<a href="/logout" class="btn btn-primary">Logout</a>
    </form>
  </div>
);

export default SignIn;
