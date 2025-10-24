import { Modal, Form, Schema, SelectPicker, Button } from "rsuite";
import type { Task } from "./TaskCard";

export interface Option {
  label: string;
  value: number;
}

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  formValue: Task;
  setFormValue: (task: Task) => void;
  categories: Option[];
  priorities: Option[];
  statuses: Option[];
  editing: boolean;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSave,
  formValue,
  setFormValue,
  categories,
  priorities,
  statuses,
  editing,
}) => {
  const model = Schema.Model({
    titulo: Schema.Types.StringType().isRequired("El título es obligatorio"),
    descripcion: Schema.Types.StringType().isRequired(
      "La descripción es obligatoria"
    ),
    IdCategoria: Schema.Types.NumberType().isRequired(
      "Seleccione una categoría"
    ),
    IdPrioridad: Schema.Types.NumberType().isRequired(
      "Seleccione una prioridad"
    ),
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{editing ? "Editar Tarea" : "Nueva Tarea"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={(v) => setFormValue(v as Task)}
        >
          <Form.Group controlId="titulo">
            <Form.ControlLabel>Título</Form.ControlLabel>
            <Form.Control name="titulo" placeholder="Título de la tarea" />
          </Form.Group>

          <Form.Group controlId="descripcion">
            <Form.ControlLabel>Descripción</Form.ControlLabel>
            <Form.Control
              name="descripcion"
              placeholder="Describe la tarea..."
            />
          </Form.Group>

          <Form.Group controlId="IdCategoria">
            <Form.ControlLabel>Categoría</Form.ControlLabel>
            <Form.Control
              name="IdCategoria"
              accepter={SelectPicker}
              data={categories}
              style={{ width: "100%" }}
              placeholder="Selecciona una categoría"
            />
          </Form.Group>

          <Form.Group controlId="IdPrioridad">
            <Form.ControlLabel>Prioridad</Form.ControlLabel>
            <Form.Control
              name="IdPrioridad"
              accepter={SelectPicker}
              data={priorities}
              style={{ width: "100%" }}
              placeholder="Selecciona una prioridad"
            />
          </Form.Group>

          {editing && (
            <Form.Group controlId="IdStatus">
              <Form.ControlLabel>Estatus</Form.ControlLabel>
              <Form.Control
                name="IdStatus"
                accepter={SelectPicker}
                data={statuses}
                style={{ width: "100%" }}
                placeholder="Selecciona un estatus"
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={() => onSave(formValue)}>
          Guardar
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
