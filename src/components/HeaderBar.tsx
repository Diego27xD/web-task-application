import { Button } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { useEffect } from "react";
import { useAuthStore } from "../presentation/store/useAuthStore";

interface HeaderBarProps {
  userName: string;
  onAddTask: () => void;
  onLogout: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  userName,
  onAddTask,
  onLogout,
}) => {
  const authStore = useAuthStore();
  useEffect(() => {
    authStore.checkStatus();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: "20px",
        gap: "15px",
      }}
    >
      <Button appearance="primary" startIcon={<PlusIcon />} onClick={onAddTask}>
        Nueva Tarea
      </Button>
      <span style={{ fontWeight: "bold" }}>{userName}</span>
      <Button appearance="subtle" onClick={onLogout}>
        Salir
      </Button>
    </div>
  );
};
