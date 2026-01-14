"use client";

import { useEffect, useState } from "react";
import { api, Cat } from "@/lib/api";

export default function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [years, setYears] = useState(1);
  const [breed, setBreed] = useState("");
  const [salary, setSalary] = useState(1000);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [salaryDraft, setSalaryDraft] = useState(0);

  async function loadCats() {
    setLoading(true);
    try {
      setCats(await api<Cat[]>("/cats"));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createCat() {
    if (!name || !breed) {
      setError("Please fill in codename and breed specialty");
      return;
    }
    try {
      await api("/cats", {
        method: "POST",
        body: JSON.stringify({
          name,
          years_of_experience: years,
          breed,
          salary,
        }),
      });
      setName(""); setBreed(""); setYears(1); setSalary(1000);
      setError("");
      loadCats();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function updateSalary(id: number) {
    try {
      await api(`/cats/${id}/salary`, {
        method: "PATCH",
        body: JSON.stringify({ salary: salaryDraft }),
      });
      setEditingId(null);
      loadCats();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function deleteCat(id: number) {
    if (!confirm("Decommission this agent from the agency?")) return;
    await api(`/cats/${id}`, { method: "DELETE" });
    loadCats();
  }

  useEffect(() => { loadCats(); }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
      
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">S.C.A. PERSONNEL</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Agent Database v4.0</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-800 shadow-sm animate-in fade-in zoom-in duration-300">
             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
             {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">


          <aside className="lg:col-span-4">
            <div className="sticky top-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                Recruitment
              </h2>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="ml-1 text-[11px] font-bold uppercase text-slate-500">Codename</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                    placeholder="e.g. Shadow"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="ml-1 text-[11px] font-bold uppercase text-slate-500">Breed specialty</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                    placeholder="e.g. Bengal"
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="ml-1 text-[11px] font-bold uppercase text-slate-500">Exp. Years</label>
                    <input
                      type="number"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                      value={years}
                      onChange={e => setYears(+e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="ml-1 text-[11px] font-bold uppercase text-slate-500">Salary ($)</label>
                    <input
                      type="number"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                      value={salary}
                      onChange={e => setSalary(+e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={createCat}
                  className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  Authorize Agent
                </button>
              </div>
            </div>
          </aside>


          <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-50 bg-slate-50/50 px-6 py-4 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>
                Active Personnel
              </h2>
              {loading && <span className="animate-pulse text-[10px] font-bold text-slate-400 uppercase">Updating Data...</span>}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="px-6 py-4">Agent Identification</th>
                    <th className="px-6 py-4">Expertise</th>
                    <th className="px-6 py-4 text-right">Compensation</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {cats.map(cat => (
                    <tr key={cat.id} className="group transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-mono text-[10px] font-bold text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                            ID{cat.id}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 tracking-tight">{cat.name}</p>
                            <p className="text-[11px] text-slate-400">{cat.years_of_experience}y service history</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {cat.breed}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editingId === cat.id ? (
                          <div className="flex justify-end items-center gap-2 animate-in slide-in-from-right-2">
                            <input
                              type="number"
                              className="w-24 rounded-lg border border-slate-300 bg-white px-2 py-1 text-right text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                              value={salaryDraft}
                              onChange={e => setSalaryDraft(+e.target.value)}
                              autoFocus
                            />
                            <button onClick={() => updateSalary(cat.id)} className="text-emerald-500 hover:scale-110 transition-transform"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></button>
                            <button onClick={() => setEditingId(null)} className="text-slate-300 hover:text-slate-600"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditingId(cat.id); setSalaryDraft(cat.salary); }}
                            className="group/btn relative font-mono text-sm font-bold text-slate-700 hover:text-slate-900"
                          >
                            ${cat.salary.toLocaleString()}
                            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-slate-900 transition-all group-hover/btn:w-full"></span>
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteCat(cat.id)}
                          className="rounded-lg p-2 text-slate-200 transition-all hover:bg-red-50 hover:text-red-500"
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cats.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2 text-slate-300">
                          <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="opacity-20"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                          <p className="text-sm font-medium">No agents found in sector</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}