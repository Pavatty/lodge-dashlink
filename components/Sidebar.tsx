'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface Workspace {
  id: string
  name: string
  type: 'personal' | 'educational' | 'professional'
  slug: string
}

export default function Sidebar() {
  const supabase = createClient()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkspaces() {
      // Récupère les espaces via la table pivot workspace_members grâce à notre RLS
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          id,
          name,
          type,
          slug
        `)

      if (data) {
        setWorkspaces(data as any)
        // Par défaut, on active le premier espace (souvent le personnel)
        if (data.length > 0) setActiveWorkspace(data[0] as any)
      }
      setLoading(false)
    }

    fetchWorkspaces()
  } locke, [])

  if (loading) return <div className="p-4 text-slate-400 text-sm">Chargement de Lodge OS...</div>

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
      {/* Header de l'application */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
          LODGE OS
        </h1>
        <p className="text-xs text-slate-400 mt-1">Social Operating System</p>
      </div>

      {/* Sélecteur d'espaces (Workspaces) */}
      <div className="p-4 flex-1 space-y-6">
        <div>
          <label className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Mes Espaces
          </label>
          <div className="mt-2 space-y-1">
            {workspaces.map((ws) => {
              const isActive = activeWorkspace?.id === ws.id
              return (
                <button
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg shadow-blue-900/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="mr-3 text-base">
                    {ws.type === 'personal' && '🏠'}
                    {ws.type === 'educational' && '🎓'}
                    {ws.type === 'professional' && '💼'}
                  </span>
                  <span className="truncate">{ws.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Profil de l'utilisateur en bas */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-white text-sm">
          K
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-200 truncate">Karim</p>
          <p className="text-xs text-slate-500 truncate">Espace Personnel actif</p>
        </div>
      </div>
    </aside>
  )
}