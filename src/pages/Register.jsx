import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";

import {auth, db, storage} from "../firebase";

const Register = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [per, setPer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Messenger Clone - Register";
  });

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({...prev, img: downloadURL}));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(`image uploading is ${per || "not"} running.`);

  const handleInput = (e) => {
    const {id, value} = e.target;
    setData({...data, [id]: value});
  };

  const isMatch =
    !data.username ||
    !data.name ||
    !data.email ||
    !data.phone ||
    !data.password ||
    !data.address ||
    !data.country ||
    !data.bio;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const obj = {...data};
      delete obj.password;
      await setDoc(doc(db, "users", res.user.uid), {
        ...obj,
        timestamp: serverTimestamp(),
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
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
        <Paper elevation={8} style={{marginTop: "50px", width: "80%"}}>
          <div
            style={{
              padding: "25px",
              borderRadius: 10,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Register to Messenger Clone
            </Typography>
            <div>
              <Avatar
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="avatar"
                style={{width: 100, height: 100, marginBottom: 5}}
              />
            </div>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label htmlFor="file">
                Profile Image
                <CloudUploadOutlined
                  style={{display: "block", fontSize: 100}}
                />
              </label>
              <Input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{display: "none"}}
              />
            </Box>
            <form
              onSubmit={handleRegister}
              style={{
                marginTop: 20,
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  type="text"
                  required
                  id="username"
                  label="Username"
                  onChange={handleInput}
                />
                <TextField
                  type="text"
                  required
                  id="name"
                  label="Full Name"
                  onChange={handleInput}
                />
              </div>
              <div style={{marginBottom: 10}}>
                <TextareaAutosize
                  required
                  id="bio"
                  onChange={handleInput}
                  minRows={10}
                  cols={52}
                  placeholder="Enter your bio"
                  styles={{borderRadius: "10px"}}
                />
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  type="email"
                  required
                  id="email"
                  label="Email Address"
                  onChange={handleInput}
                />
                <TextField
                  type="text"
                  required
                  id="phone"
                  label="Phone Number"
                  onChange={handleInput}
                />
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  type="password"
                  required
                  id="password"
                  label="Password"
                  onChange={handleInput}
                  style={{width: "100%"}}
                />
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  type="text"
                  required
                  id="address"
                  label="Address"
                  onChange={handleInput}
                />
                <TextField
                  type="text"
                  require
                  id="country"
                  label="Country"
                  onChange={handleInput}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={isMatch}
                style={{width: "fit-content", marginBottom: 10}}
                type="submit"
              >
                Register
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
              style={{fontSize: "16px", fontWeight: "bold"}}
            >
              Already have an account?{" "}
              <Link to="/login" style={{textDecoration: "none"}}>
                Login
              </Link>
            </Typography>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default Register;
