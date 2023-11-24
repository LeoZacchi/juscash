import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = ({ onRegister, onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const passwordStrengthMessages = () => {
    const { password } = formData;
    const messages = [];

    if (password.length === 0 && isPasswordFocused) {
      messages.push("A senha é obrigatória.");
    } else if (password.length > 0 && isPasswordFocused) {
      if (password.length < 8) {
        messages.push("A senha deve ter pelo menos 8 caracteres.");
      }

      if (!/\d/.test(password)) {
        messages.push("A senha deve conter pelo menos um número.");
      }

      if (!/[A-Za-z]/.test(password)) {
        messages.push("A senha deve conter pelo menos uma letra.");
      }

      if (!/[@$!%*#?&]/.test(password)) {
        messages.push("A senha deve conter pelo menos um caractere especial.");
      }
    }

    return messages;
  };

  const isPasswordValid = () => {
    return passwordStrengthMessages().length === 0;
  };

  const handleToggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
    setFormData({
      ...formData,
      name: "",
      confirmPassword: "",
    });
  };

  const handleRegister = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (!isPasswordValid()) {
      toast.error("A senha não atende aos requisitos mínimos!");
      return;
    }

    onRegister(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    toast.success("Cadastro realizado com sucesso!");
    setIsRegisterForm(false);
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      toast.error("Email e senha são obrigatórios!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      onLogin(formData);
      navigate("/dashboard");
    } else {
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <div className="container">
      <img
        src="./logo.png"
        alt="Descrição da imagem"
        style={{ width: "70%", marginBottom: "10px" }}
      />
      <form>
        {isRegisterForm && (
          <label className="label-right">
            Seu nome completo:
            <span className="required-marker">*</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        )}
        <label className="label-right">
          E-mail:
          <span className="required-marker">*</span>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="label-right">
          Senha:
          <span className="required-marker">*</span>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="form-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <FaEye style={{ color: "#000000" }} />
              ) : (
                <FaEyeSlash style={{ color: "#000000" }} />
              )}
            </button>
          </div>
          <div className="password-messages">
            {passwordStrengthMessages().map((message, index) => (
              <p key={index} className="invalid">
                {message}
              </p>
            ))}
          </div>
        </label>
        {isRegisterForm && (
          <label className="label-right">
            Confirme sua senha:
            <span className="required-marker">*</span>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <FaEye style={{ color: "#000000" }} />
                ) : (
                  <FaEyeSlash style={{ color: "#000000" }} />
                )}
              </button>
            </div>
          </label>
        )}
        <p
          type="button"
          onClick={handleToggleForm}
          style={{ cursor: "pointer" }}
        >
          {isRegisterForm
            ? "Já possui conta? Fazer login"
            : "Ainda não possui conta? Fazer cadastro"}
        </p>
        <button
          type="button"
          onClick={isRegisterForm ? handleRegister : handleLogin}
        >
          {isRegisterForm ? "Criar conta" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
