import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from "sweetalert2";
import { Box, TextField, Button, Typography, Paper, Container } from "@mui/material";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

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

                window.location.href = "/";
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: 2
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={10}
                    sx={{
                        padding: 4,
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        textAlign: "center"
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#4a148c' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Please login to your account
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={form.email}
                            onChange={handleChange}
                            required
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={form.password}
                            onChange={handleChange}
                            required
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 4,
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: 2,
                                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                                boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .3)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                }
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};
export default Login;