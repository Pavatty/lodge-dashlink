import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 p-10 text-slate-200">
        <h2 className="text-3xl font-light mb-4">Bienvenue dans ton Espace</h2>
        <p className="text-slate-400">Sélectionne un espace dans le menu latéral pour charger tes modules.</p>
      </div>
    </main>
  )
}
