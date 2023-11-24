import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

Modal.setAppElement("#root");

const LeadFormModal = ({ isOpen, onClose, onSubmit, leadDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    opportunities: [
      "Todos",
      "Honorários Sucumbenciais",
      "Honorários Contratuais",
      "Honorários Dativos",
      "Crédito do Autor",
    ],
  });

  useEffect(() => {
    if (leadDetails) {
      setFormData({
        name: leadDetails?.name ?? "",
        email: leadDetails?.email ?? "",
        phone: leadDetails?.phone ?? "",
        opportunities: leadDetails?.opportunities ?? [],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        opportunities: [
          "Todos",
          "Honorários Sucumbenciais",
          "Honorários Contratuais",
          "Honorários Dativos",
          "Crédito do Autor",
        ],
      });
    }
  }, [leadDetails, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        if (value === "Todos") {
          const updatedOpportunities = checked
            ? [
                "Todos",
                "Honorários Sucumbenciais",
                "Honorários Contratuais",
                "Honorários Dativos",
                "Crédito do Autor",
              ]
            : [];
          return {
            ...prevData,
            opportunities: updatedOpportunities,
          };
        } else {
          const updatedOpportunities = checked
            ? [...prevData.opportunities, value]
            : prevData.opportunities.filter((item) => item !== value);

          const allSelected = prevData.opportunities.includes("Todos");
          return {
            ...prevData,
            opportunities: allSelected
              ? updatedOpportunities.filter((item) => item !== "Todos")
              : updatedOpportunities,
          };
        }
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      opportunities: [
        "Todos",
        "Honorários Sucumbenciais",
        "Honorários Contratuais",
        "Honorários Dativos",
        "Crédito do Autor",
      ],
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Adicionar Lead"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "400px",
          margin: "auto",
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose}>X</button>
      </div>
      <h2>{leadDetails ? "Lead" : "Novo Lead"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome Completo:
          <span className="required-marker">*</span>
          <input
            type="text"
            name="name"
            value={leadDetails ? leadDetails.name : formData.name}
            onChange={handleChange}
            disabled={!!leadDetails}
          />
        </label>
        <label>
          Email:
          <span className="required-marker">*</span>
          <input
            type="text"
            name="email"
            value={leadDetails ? leadDetails.email : formData.email}
            onChange={handleChange}
            disabled={!!leadDetails}
          />
        </label>
        <label>
          Telefone:
          <span className="required-marker">*</span>
          <InputMask
            mask="(99) 99999-9999"
            maskChar={null}
            type="tel"
            name="phone"
            value={leadDetails ? leadDetails.phone : formData.phone}
            onChange={handleChange}
            disabled={!!leadDetails}
          />
        </label>
        <label>Oportunidades:</label>
        <label>
          <input
            type="checkbox"
            name="Todos"
            value="Todos"
            checked={formData.opportunities.includes("Todos")}
            onChange={handleChange}
            disabled={!!leadDetails}
            style={{ width: "3%" }}
          />
          Todos
        </label>
        <label>
          <input
            type="checkbox"
            name="Honorários Sucumbenciais"
            value="Honorários Sucumbenciais"
            checked={formData.opportunities.includes(
              "Honorários Sucumbenciais"
            )}
            onChange={handleChange}
            disabled={!!leadDetails}
            style={{ width: "3%" }}
          />
          Honorários Sucumbenciais
        </label>
        <label>
          <input
            type="checkbox"
            name="Honorários Contratuais"
            value="Honorários Contratuais"
            checked={formData.opportunities.includes("Honorários Contratuais")}
            onChange={handleChange}
            disabled={!!leadDetails}
            style={{ width: "3%" }}
          />
          Honorários Contratuais
        </label>
        <label>
          <input
            type="checkbox"
            name="Honorários Dativos"
            value="Honorários Dativos"
            checked={formData.opportunities.includes("Honorários Dativos")}
            onChange={handleChange}
            disabled={!!leadDetails}
            style={{ width: "3%" }}
          />
          Honorários Dativos
        </label>
        <label>
          <input
            type="checkbox"
            name="Crédito do Autor"
            value="Crédito do Autor"
            checked={formData.opportunities.includes("Crédito do Autor")}
            onChange={handleChange}
            disabled={!!leadDetails}
            style={{ width: "3%" }}
          />
          Crédito do Autor
        </label>
        {!leadDetails && <button type="submit">Adicionar</button>}
      </form>
    </Modal>
  );
};

export default LeadFormModal;
