import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Schema,
  Message,
  useToaster,
  Panel,
  Loader,
} from "rsuite";
import { authRegister } from "../presentation/services/auth/auth-actions";

interface RegisterForm {
  nombreCompleto: string;
  usuario: string;
  password: string;
  confirmarPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const toaster = useToaster();

  const [formValue, setFormValue] = useState<RegisterForm>({
    nombreCompleto: "",
    usuario: "",
    password: "",
    confirmarPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const model = Schema.Model({
    nombreCompleto: Schema.Types.StringType().isRequired(
      "El nombre completo es obligatorio"
    ),
    usuario: Schema.Types.StringType().isRequired("El usuario es obligatorio"),
    password: Schema.Types.StringType()
      .isRequired("La contraseña es obligatoria")
      .minLength(6, "Debe tener al menos 6 caracteres"),
    confirmarPassword: Schema.Types.StringType()
      .addRule(
        (value, data) => value === data.password,
        "Las contraseñas no coinciden"
      )
      .isRequired("Debe confirmar la contraseña"),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await authRegister(
        formValue.usuario,
        formValue.nombreCompleto,
        formValue.password
      );

      if (result) {
        toaster.push(
          <Message type="success" closable>
            Usuario registrado exitosamente. Ahora puedes iniciar sesión.
          </Message>,
          { placement: "topEnd" }
        );

        navigate("/");
      }
    } catch (error: any) {
      toaster.push(
        <Message type="error" closable>
          {error.message || "Error al registrar el usuario"}
        </Message>,
        { placement: "topEnd" }
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formValue.nombreCompleto.trim() !== "" &&
    formValue.usuario.trim() !== "" &&
    formValue.password.trim() !== "" &&
    formValue.confirmarPassword.trim() !== "";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f7f7fa",
      }}
    >
      <Panel bordered shaded style={{ width: 420, padding: 30 }}>
        <h3 style={{ textAlign: "center", marginBottom: 30 }}>
          Registro de Usuario
        </h3>

        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as RegisterForm)}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="nombreCompleto">
            <Form.ControlLabel>Nombre Completo</Form.ControlLabel>
            <Form.Control
              name="nombreCompleto"
              placeholder="Tu nombre completo"
            />
          </Form.Group>

          <Form.Group controlId="usuario">
            <Form.ControlLabel>Usuario</Form.ControlLabel>
            <Form.Control
              name="usuario"
              placeholder="Crea un nombre de usuario"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Contraseña</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Form.HelpText>Debe tener al menos 6 caracteres</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="confirmarPassword">
            <Form.ControlLabel>Confirmar Contraseña</Form.ControlLabel>
            <Form.Control
              name="confirmarPassword"
              type="password"
              placeholder="Repite la contraseña"
              autoComplete="new-password"
            />
          </Form.Group>

          <Form.Group>
            <Button
              appearance="primary"
              block
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <Loader content="Registrando usuario..." />
              ) : (
                "Registrarse"
              )}
            </Button>
          </Form.Group>

          <Form.Group>
            <Button
              appearance="link"
              block
              onClick={() => navigate("/")}
              disabled={loading}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </Form.Group>
        </Form>
      </Panel>
    </div>
  );
};

export default RegisterPage;
