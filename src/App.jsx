import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase/firebaseConfig";

import Header from "./components/layout/Header";
import BudgetForm from "./components/forms/BudgetForm";
import ServiceTable from "./components/tables/ServiceTable";
import TotalCard from "./components/ui/TotalCard";
import ActionButtons from "./components/ui/ActionButtons";

import logo from "./assets/logo.png";

export default function App() {

  // =========================
  // ROUTE PARAM
  // =========================
  const { id } = useParams();

  // =========================
  // STATES
  // =========================
  const [loading, setLoading] =
    useState(false);

  const [items, setItems] = useState([
    {
      id: 1,
      type: "Serviço",
      name: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const [discount, setDiscount] =
    useState(0);

  const [clientName, setClientName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [description, setDescription] =
    useState("");

  // =========================
  // CAMPOS TÉCNICOS
  // =========================
  const [projectCategory, setProjectCategory] =
    useState("");

  const [projectObjective, setProjectObjective] =
    useState("");

  const [serviceScope, setServiceScope] =
    useState("");

  const [priorityLevel, setPriorityLevel] =
    useState("");

  const [proposalValidity, setProposalValidity] =
    useState("");

  const [technicalResponsible, setTechnicalResponsible] =
    useState("");

  // =========================
  // NOVOS CAMPOS
  // =========================
  const [installationLocations, setInstallationLocations] =
    useState("");

  const [technicalNotes, setTechnicalNotes] =
    useState("");

  const [includedServices, setIncludedServices] =
    useState("");

  const [generalConditions, setGeneralConditions] =
    useState("");

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {

    setClientName("");

    setPhone("");

    setAddress("");

    setDescription("");

    setDiscount(0);

    // =========================
    // RESET CAMPOS TÉCNICOS
    // =========================
    setProjectCategory("");

    setProjectObjective("");

    setServiceScope("");

    setPriorityLevel("");

    setProposalValidity("");

    setTechnicalResponsible("");

    // =========================
    // RESET NOVOS CAMPOS
    // =========================
    setInstallationLocations("");

    setTechnicalNotes("");

    setIncludedServices("");

    setGeneralConditions("");

    setItems([
      {
        id: 1,
        type: "Serviço",
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // =========================
  // LOAD EDITION
  // =========================
  useEffect(() => {

    async function loadBudget() {

      // =========================
      // NOVO ORÇAMENTO
      // =========================
      if (!id) {

        resetForm();

        return;
      }

      try {

        setLoading(true);

        const docRef =
          doc(db, "orcamentos", id);

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          const data =
            docSnap.data();

          setClientName(
            data.clientName || ""
          );

          setPhone(
            data.phone || ""
          );

          setAddress(
            data.address || ""
          );

          setDescription(
            data.description || ""
          );

          // =========================
          // LOAD CAMPOS TÉCNICOS
          // =========================
          setProjectCategory(
            data.projectCategory || ""
          );

          setProjectObjective(
            data.projectObjective || ""
          );

          setServiceScope(
            data.serviceScope || ""
          );

          setPriorityLevel(
            data.priorityLevel || ""
          );

          setProposalValidity(
            data.proposalValidity || ""
          );

          setTechnicalResponsible(
            data.technicalResponsible || ""
          );

          // =========================
          // LOAD NOVOS CAMPOS
          // =========================
          setInstallationLocations(
            data.installationLocations || ""
          );

          setTechnicalNotes(
            data.technicalNotes || ""
          );

          setIncludedServices(
            data.includedServices || ""
          );

          setGeneralConditions(
            data.generalConditions || ""
          );

          setItems(
            data.items || []
          );

          setDiscount(
            data.discount || 0
          );
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    loadBudget();

  }, [id]);

  // =========================
  // TOTAL
  // =========================
  const subtotal =
    items.reduce((acc, item) => {

      const quantity =
        Number(item.quantity || 0);

      const price =
        Number(item.price || 0);

      return acc + (
        quantity * price
      );

    }, 0);

  const total =
    subtotal -
    Number(discount || 0);

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        <p className="text-cyan-400 text-xl">
          Carregando orçamento...
        </p>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#050816] text-white">

      <Header />

      <main className="p-4 md:p-10">

        <div className="max-w-7xl mx-auto">

          <div
            id="budget-pdf"
            className="border border-cyan-500/20 bg-[#0B1120] rounded-3xl p-5 md:p-10 shadow-2xl"
          >

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-10 border-b border-cyan-500/20 pb-6">

              <img
                src={logo}
                alt="Costa Automation"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />

              <div>

                <h2 className="text-2xl md:text-3xl font-bold text-white">

                  Costa{" "}

                  <span className="text-cyan-400">
                    Automation
                  </span>

                </h2>

                <p className="text-gray-400">
                  Sistema Inteligente de Orçamentos
                </p>

              </div>

            </div>

            {/* TITULO */}
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">

              {id
                ? "Editar Orçamento"
                : "Sistema de Orçamentos"}

            </h2>

            <p className="text-gray-400 mb-10">

              {id
                ? "Atualize as informações do orçamento."
                : "Plataforma premium da Costa Automation."}

            </p>

            {/* FORM */}
            <BudgetForm
              clientName={clientName}
              setClientName={setClientName}

              phone={phone}
              setPhone={setPhone}

              address={address}
              setAddress={setAddress}

              description={description}
              setDescription={setDescription}

              projectCategory={projectCategory}
              setProjectCategory={setProjectCategory}

              projectObjective={projectObjective}
              setProjectObjective={setProjectObjective}

              serviceScope={serviceScope}
              setServiceScope={setServiceScope}

              priorityLevel={priorityLevel}
              setPriorityLevel={setPriorityLevel}

              proposalValidity={proposalValidity}
              setProposalValidity={setProposalValidity}

              technicalResponsible={technicalResponsible}
              setTechnicalResponsible={setTechnicalResponsible}

              installationLocations={installationLocations}
              setInstallationLocations={setInstallationLocations}

              technicalNotes={technicalNotes}
              setTechnicalNotes={setTechnicalNotes}

              includedServices={includedServices}
              setIncludedServices={setIncludedServices}

              generalConditions={generalConditions}
              setGeneralConditions={setGeneralConditions}
            />

            {/* TABLE */}
            <ServiceTable
              items={items}
              setItems={setItems}
            />

            {/* TOTAL */}
            <TotalCard
              items={items}
              discount={discount}
              setDiscount={setDiscount}
            />

            {/* ACTIONS */}
            <ActionButtons
              budgetId={id}

              clientName={clientName}

              phone={phone}

              address={address}

              description={description}

              projectCategory={projectCategory}

              projectObjective={projectObjective}

              serviceScope={serviceScope}

              priorityLevel={priorityLevel}

              proposalValidity={proposalValidity}

              technicalResponsible={technicalResponsible}

              installationLocations={installationLocations}

              technicalNotes={technicalNotes}

              includedServices={includedServices}

              generalConditions={generalConditions}

              items={items}

              discount={discount}

              total={total}
            />

          </div>

        </div>

      </main>

    </div>
  );
}