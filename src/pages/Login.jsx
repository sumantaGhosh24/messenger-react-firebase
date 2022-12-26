import {useContext, useState, useEffect} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";

import {auth} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isEmpty = !email || !password;

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);

  useEffect(() => {
    document.title = "Messenger Clone - Login";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload: user});
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={8} style={{width: "80%"}}>
          <div
            style={{
              padding: "50px",
              borderRadius: 10,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login to Messenger Clone
            </Typography>
            <form
              onSubmit={handleLogin}
              style={{
                marginTop: 20,
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
                width: "80%",
              }}
            >
              <TextField
                type="text"
                required
                id="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                style={{marginBottom: 10}}
              />
              <TextField
                type="password"
                required
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{marginBottom: 10}}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={isEmpty}
                style={{width: "fit-content", marginBottom: 10}}
                type="submit"
              >
                Login
              </Button>
              {error && (
                <Typography
                  variant="button"
                  style={{
                    backgroundColor: "#ea9191",
                    padding: 5,
                    borderRadius: 10,
                    color: "#f9dfdf",
                  }}
                >
                  {error}
                </Typography>
              )}
            </form>
            <Typography
              variant="body2"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Don't have an account?{" "}
              <Link to="/register" style={{textDecoration: "none"}}>
                Register
              </Link>
            </Typography>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default Login;
