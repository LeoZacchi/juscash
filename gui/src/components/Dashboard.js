import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles.css";
import LeadFormModal from "./LeadFormModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statuses = {
  1: "Cliente Potencial",
  2: "Dados Confirmados",
  3: "Análise do Lead",
};

const Dashboard = ({ onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(storedLeads);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    if (canMoveToStatus(sourceStatus, destinationStatus)) {
      const updatedLeads = [...leads];
      const movedLead = updatedLeads.find(
        (lead) => lead.id === Number(result.draggableId)
      );
      movedLead.status = destinationStatus;

      setLeads(updatedLeads);
      localStorage.setItem("leads", JSON.stringify(updatedLeads));
    }
  };

  const canMoveToStatus = (source, destination) => {
    if (source === destination) return true;
    if (source === 1 && destination === 2) return true;
    if (source === 2 && destination === 3) return true;
    return false;
  };

  const handleAddLead = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const handleAddLeadSubmit = (formData) => {
    const newLead = {
      id: leads.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: 1,
      opportunities: formData.opportunities,
    };

    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);

    localStorage.setItem("leads", JSON.stringify(updatedLeads));

    toast.success("Lead Cadastrada com sucesso!");

    handleCloseModal();
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <img
          src="./logo.png"
          alt="Descrição da imagem"
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <div className="button-container">
          <button onClick={onLogout}>Sair</button>
          <button onClick={handleAddLead}>Adicionar Lead</button>
        </div>
      </div>
      <div className="dashboard">
        <LeadFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddLeadSubmit}
          leadDetails={selectedLead}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(statuses).map((statusId) => (
            <Droppable key={statusId} droppableId={Number(statusId)}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="status-column"
                >
                  <h3>{statuses[statusId]}</h3>
                  {leads
                    .filter((lead) => lead.status === Number(statusId))
                    .map((lead, index) => (
                      <Draggable
                        key={lead.id.toString()}
                        draggableId={lead.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="lead-item"
                            onClick={() => handleLeadClick(lead)}
                          >
                            {lead.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default Dashboard;
