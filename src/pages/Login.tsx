import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Schema,
  Message,
  useToaster,
  Panel,
  Loader,
} from "rsuite";
import { useAuthStore } from "../presentation/store/useAuthStore";

interface LoginForm {
  document: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const toaster = useToaster();

  const [formValue, setFormValue] = useState<LoginForm>({
    document: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const model = Schema.Model({
    document: Schema.Types.StringType().isRequired("El usuario es obligatorio"),
    password: Schema.Types.StringType().isRequired(
      "La contraseña es obligatoria"
    ),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await login(formValue.document, formValue.password);

      if (!result) {
        toaster.push(
          <Message type="error" closable>
            {"Error al iniciar sesión"}
          </Message>,
          { placement: "topEnd" }
        );

        return;
      }
      toaster.push(
        <Message type="success" closable>
          Inicio de sesión exitoso
        </Message>,
        { placement: "topEnd" }
      );

      navigate("/home");
    } catch (error: TypeError | any | unknown) {
      toaster.push(
        <Message type="error" closable>
          {error.message || "Error al iniciar sesión"}
        </Message>,
        { placement: "topEnd" }
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formValue.document.trim() !== "" && formValue.password.trim() !== "";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f7f7fa",
        width: "100%",
      }}
    >
      <Panel bordered shaded style={{ width: 400, padding: 30 }}>
        <h3 style={{ textAlign: "center", marginBottom: 30 }}>
          Iniciar Sesión
        </h3>

        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as LoginForm)}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="document">
            <Form.ControlLabel>Usuario</Form.ControlLabel>
            <Form.Control
              name="document"
              placeholder="Ingresa tu usuario"
              autoComplete="username"
            />
            <Form.HelpText>Requerido</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Contraseña</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <Form.HelpText>Requerido</Form.HelpText>
          </Form.Group>

          <Form.Group>
            <Button
              appearance="primary"
              block
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading ? <Loader content="Iniciando sesión..." /> : "Ingresar"}
            </Button>
          </Form.Group>
        </Form>
        <div style={{ marginTop: 8 }}>
          <Link to={"/register"}>
            <p style={{ textAlign: "center", marginBottom: 30 }}>
              Crear una cuenta
            </p>
          </Link>
        </div>
      </Panel>
    </div>
  );
};

export default LoginPage;
