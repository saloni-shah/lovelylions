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

// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
      
//     }
//   }

//   componentDidMount() { 
//     $.ajax({
//       url: '/auth/facebook', 
//       type: 'GET',
//       dataType: 'json',
//       success: (data) => {
//         console.log(data);
//       },
//       error: (err) => {
//         console.log('err', err);
//       }
//     });
//   }

//   render () {
//     return (<div>
//       <h1>Movie Collector</h1>
     
//     </div>)
//   }
// }


export default SignIn;
