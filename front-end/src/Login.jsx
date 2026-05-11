import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from "sweetalert2";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", form);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Redirecting to home page...',
                    timer: 1500,
                    showConfirmButton: false
                });
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.response?.data?.message || "Something went wrong"
            });
        }
    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    marginLeft: "300px"
                }}
            >



                <p style={{ marginTop: "10px" }}> Please Login in into your Account</p>
                <form onSubmit={handleSubmit}>

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </Button>

                </form>

            </Paper>

        </Box>
    );
};

export default Login;