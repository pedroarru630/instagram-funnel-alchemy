
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MeuProprioPerfil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new input flow
    navigate('/meu-proprio-perfil-input');
  }, [navigate]);

  return null;
};

export default MeuProprioPerfil;
