import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

export default function Header() {

  const location = useLocation();

  return (

    <header className="w-full border-b border-cyan-500/20 bg-[#081120]/80 backdrop-blur-md shadow-lg shadow-cyan-500/5">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* LOGO */}
        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="Costa Automation"
            className="w-20 h-20 object-contain
            drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]
            hover:scale-105
            transition-all duration-300"
          />

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-white">

              Costa{" "}

              <span className="text-cyan-400">
                Automation
              </span>

            </h1>

            <p className="text-sm text-gray-400">
              Sistema Inteligente de Orçamentos
            </p>

          </div>

        </div>

        {/* MENU */}
        <div className="flex flex-wrap items-center gap-3">

          {/* NOVO ORÇAMENTO */}
          <Link
            to="/"
            className={`px-5 py-3 rounded-xl font-semibold transition-all ${
              location.pathname === "/"
                ? "bg-cyan-500 text-black"
                : "bg-[#0B1120] border border-cyan-500/20 text-white hover:border-cyan-400"
            }`}
          >
            Novo Orçamento
          </Link>

          {/* HISTÓRICO */}
          <Link
            to="/historico"
            className={`px-5 py-3 rounded-xl font-semibold transition-all ${
              location.pathname === "/historico"
                ? "bg-cyan-500 text-black"
                : "bg-[#0B1120] border border-cyan-500/20 text-white hover:border-cyan-400"
            }`}
          >
            Histórico
          </Link>

          {/* STATUS */}
          <div className="hidden md:flex items-center gap-3 ml-2">

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="text-sm text-gray-300">
              Sistema Online
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}