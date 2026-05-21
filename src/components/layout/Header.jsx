import logo from "../../assets/logo.png"

export default function Header() {
  return (
    <header className="w-full border-b border-cyan-500/20 bg-[#081120]/80 backdrop-blur-md shadow-lg shadow-cyan-500/5">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="Costa Automation"
            className="w-24 h-24 object-contain 
            drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]
            hover:scale-105
            transition-all duration-300"
          />

          <div>

            <h1 className="text-3xl font-bold text-white">
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

        <div className="hidden md:flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-sm text-gray-300">
            Sistema Online
          </span>

        </div>

      </div>

    </header>
  )
}