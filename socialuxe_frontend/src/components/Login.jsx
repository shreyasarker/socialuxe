import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { client } from '../client.js';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import bgVideo from '../assets/bg-video.mp4';

const Login = () => {
  const navigate = useNavigate();

  const responseMessage = (response) => {
    const user = jwt_decode(response.credential);
    localStorage.setItem('user', user);
    const {name, aud, picture} = user;
    
    const doc = {
      _id: aud,
      _type: 'user',
      username: name,
      image: picture
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace: true});
    })
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <div id="hero-section" className="max-w-4xl">
      <div className="flex justify-center px-4 md-w-3/4 lg:w-2/3 mx-auto text-center">
        <img src={logo} alt="Logo" width={90} />
        <h2 className="text-4xl sm:text-5xl md:text-5xl leading-tight text-center text-gray-100 mt-4">
          <b>Socialuxe</b>
        </h2>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </div>
    <div id="video-overlay"></div>
    <video autoPlay muted loop id="video">
      <source src={bgVideo} type="video/mp4"/>
    </video>
  </GoogleOAuthProvider>
  )
}

export default Login
