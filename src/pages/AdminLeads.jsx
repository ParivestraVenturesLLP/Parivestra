import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeads, updateLeadStatus } from '../services/adminApi';
import AdminTabs from '../components/AdminTabs';
import LeadDetailModal from '../components/LeadDetailModal';

const STATUSES = ['new', 'contacted', 'qualified', 'closed'];

const statusColors = {
    new: 'bg-[#FF4500]/15 text-[#FF4500] border-[#FF4500]/30',
    contacted: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    qualified: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    closed: 'bg-green-500/15 text-green-500 border-green-500/30',
};

const statCardStyles = {
    total: { icon: 'fa-solid fa-users', color: '#9999FE' },
    new: { icon: 'fa-solid fa-star', color: '#FF4500' },
    contacted: { icon: 'fa-solid fa-phone', color: '#3B82F6' },
    qualified: { icon: 'fa-solid fa-thumbs-up', color: '#F59E0B' },
    closed: { icon: 'fa-solid fa-circle-check', color: '#22C55E' },
};

const AdminLeads = () => {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedLead, setSelectedLead] = useState(null);

    const password = sessionStorage.getItem('pari_admin_pw');

    useEffect(() => {
        if (!password) {
            navigate('/admin/login');
            return;
        }

        (async () => {
            try {
                const result = await getLeads(password);
                setLeads(result.leads || []);
            } catch (err) {
                if (err.status === 401) {
                    sessionStorage.removeItem('pari_admin_pw');
                    navigate('/admin/login');
                    return;
                }
                setError(err.message || 'Failed to load leads.');
            } finally {
                setLoading(false);
            }
        })();
    }, [password, navigate]);

    const handleStatusChange = async (id, status) => {
        const previous = leads;
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
        setSelectedLead((prev) => (prev && prev.id === id ? { ...prev, status } : prev));

        try {
            await updateLeadStatus(id, status, password);
        } catch (err) {
            setLeads(previous);
            setError(err.message || 'Failed to update status.');
        }
    };

    const stats = useMemo(() => {
        const counts = { total: leads.length, new: 0, contacted: 0, qualified: 0, closed: 0 };
        leads.forEach((l) => {
            if (counts[l.status] !== undefined) counts[l.status] += 1;
        });
        return counts;
    }, [leads]);

    const visibleLeads = leads.filter((l) => {
        if (filter !== 'all' && l.status !== filter) return false;
        if (!search.trim()) return true;
        const q = search.trim().toLowerCase();
        return [l.name, l.brand_name, l.email, l.phone, l.service_required, l.source]
            .some((v) => (v || '').toLowerCase().includes(q));
    });

    return (
        <div className="min-h-screen bg-(--pari-bg-primary) text-(--pari-text-primary) px-6 py-10">
            <div className="max-w-300 mx-auto">
                <AdminTabs />
                <h1 className="text-[26px] font-bold mb-8">Leads CRM</h1>

                {/* Stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {['total', ...STATUSES].map((key) => (
                        <div
                            key={key}
                            className="bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl p-5 shadow-sm dark:shadow-none"
                        >
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                                style={{ background: `${statCardStyles[key].color}22` }}
                            >
                                <i className={`${statCardStyles[key].icon} text-[15px]`} style={{ color: statCardStyles[key].color }}></i>
                            </div>
                            <div className="text-[26px] font-bold text-(--pari-text-primary) leading-none mb-1">{stats[key]}</div>
                            <div className="text-[12px] text-(--pari-text-secondary) font-medium uppercase tracking-wide">
                                {key === 'total' ? 'Total Leads' : key.charAt(0).toUpperCase() + key.slice(1)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search + filter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-(--pari-text-secondary)"></i>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, brand, email, phone..."
                            className="w-full bg-(--pari-bg-secondary) border border-(--pari-border) rounded-lg pl-10 pr-4 py-2.5 text-[13px] text-(--pari-text-primary) placeholder:text-(--pari-text-secondary)/60 focus:outline-none focus:border-[#FF4500]/50 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <label htmlFor="status-filter" className="text-[13px] text-(--pari-text-secondary)">Status:</label>
                        <select
                            id="status-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-(--pari-bg-secondary) border border-(--pari-border) rounded-lg px-3 py-2.5 text-[13px] text-(--pari-text-primary) focus:outline-none"
                        >
                            <option value="all">All</option>
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && (
                    <p className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-medium rounded-lg">{error}</p>
                )}

                {loading ? (
                    <p className="text-[14px] text-(--pari-text-secondary)">Loading leads...</p>
                ) : visibleLeads.length === 0 ? (
                    <p className="text-[14px] text-(--pari-text-secondary)">No leads found.</p>
                ) : (
                    <div className="overflow-x-auto border border-(--pari-border) rounded-2xl">
                        <table className="w-full text-[13px] border-collapse">
                            <thead>
                                <tr className="bg-(--pari-bg-secondary) text-left">
                                    {['Lead', 'Contact', 'Interested In', 'Source', 'Received', 'Status'].map((h) => (
                                        <th key={h} className="px-4 py-3 font-semibold text-(--pari-text-secondary) uppercase tracking-wide text-[11px] whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {visibleLeads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        onClick={() => setSelectedLead(lead)}
                                        className="border-t border-(--pari-border) hover:bg-(--pari-bg-secondary)/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#FF4500] to-[#FF6B35] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                                                    {(lead.name || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-(--pari-text-primary)">{lead.name}</div>
                                                    <div className="text-[12px] text-(--pari-text-secondary)">{lead.brand_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-(--pari-text-secondary)">
                                            <div>{lead.phone}</div>
                                            <div className="text-[12px]">{lead.email}</div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">{lead.service_required}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-md bg-(--pari-bg-primary) border border-(--pari-border) text-[11px] font-medium text-(--pari-text-secondary)">{lead.source}</span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-(--pari-text-secondary)">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                className={`px-2.5 py-1.5 rounded-lg border text-[12px] font-semibold focus:outline-none ${statusColors[lead.status] || ''}`}
                                            >
                                                {STATUSES.map((s) => (
                                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <LeadDetailModal
                lead={selectedLead}
                onClose={() => setSelectedLead(null)}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default AdminLeads;
