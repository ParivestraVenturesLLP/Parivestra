import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminTools, createTool, updateTool, deleteTool } from '../services/adminApi';
import AdminTabs from '../components/AdminTabs';

const emptyForm = { name: '', description: '', icon: '', displayOrder: 0 };

const AdminTools = () => {
    const navigate = useNavigate();
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTool, setNewTool] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(emptyForm);

    const password = sessionStorage.getItem('pari_admin_pw');

    const loadTools = async () => {
        try {
            const result = await getAdminTools(password);
            setTools(result.tools || []);
        } catch (err) {
            if (err.status === 401) {
                sessionStorage.removeItem('pari_admin_pw');
                navigate('/admin/login');
                return;
            }
            setError(err.message || 'Failed to load tools.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!password) {
            navigate('/admin/login');
            return;
        }
        loadTools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, navigate]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTool.name.trim()) return;

        try {
            await createTool({ ...newTool, displayOrder: Number(newTool.displayOrder) || 0 }, password);
            setNewTool(emptyForm);
            loadTools();
        } catch (err) {
            setError(err.message || 'Failed to create tool.');
        }
    };

    const startEdit = (tool) => {
        setEditingId(tool.id);
        setEditForm({
            name: tool.name,
            description: tool.description || '',
            icon: tool.icon || '',
            displayOrder: tool.display_order ?? 0,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm(emptyForm);
    };

    const saveEdit = async (id) => {
        try {
            await updateTool(id, { ...editForm, displayOrder: Number(editForm.displayOrder) || 0 }, password);
            cancelEdit();
            loadTools();
        } catch (err) {
            setError(err.message || 'Failed to update tool.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTool(id, password);
            setTools((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete tool.');
        }
    };

    return (
        <div className="min-h-screen bg-(--pari-bg-primary) text-(--pari-text-primary) px-6 py-10">
            <div className="max-w-300 mx-auto">
                <AdminTabs />
                <h1 className="text-[26px] font-bold mb-8">Tools Dashboard</h1>

                {error && (
                    <p className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-medium rounded-lg">{error}</p>
                )}

                {/* Add tool form */}
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10 bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl p-5">
                    <input
                        type="text"
                        placeholder="Tool name"
                        value={newTool.name}
                        onChange={(e) => setNewTool((f) => ({ ...f, name: e.target.value }))}
                        className="md:col-span-1 bg-(--pari-bg-primary) border border-(--pari-border) rounded-lg px-3 py-2 text-[13px] focus:outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newTool.description}
                        onChange={(e) => setNewTool((f) => ({ ...f, description: e.target.value }))}
                        className="md:col-span-2 bg-(--pari-bg-primary) border border-(--pari-border) rounded-lg px-3 py-2 text-[13px] focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Icon class e.g. fa-solid fa-video"
                        value={newTool.icon}
                        onChange={(e) => setNewTool((f) => ({ ...f, icon: e.target.value }))}
                        className="md:col-span-1 bg-(--pari-bg-primary) border border-(--pari-border) rounded-lg px-3 py-2 text-[13px] focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Order"
                        value={newTool.displayOrder}
                        onChange={(e) => setNewTool((f) => ({ ...f, displayOrder: e.target.value }))}
                        className="md:col-span-1 bg-(--pari-bg-primary) border border-(--pari-border) rounded-lg px-3 py-2 text-[13px] focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="md:col-span-5 mt-1 px-6 py-2.5 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[13px] font-semibold rounded-lg hover:from-[#E03D00] hover:to-[#FF4500] transition-all"
                    >
                        Add Tool
                    </button>
                </form>

                {loading ? (
                    <p className="text-[14px] text-(--pari-text-secondary)">Loading tools...</p>
                ) : tools.length === 0 ? (
                    <p className="text-[14px] text-(--pari-text-secondary)">No tools yet.</p>
                ) : (
                    <div className="overflow-x-auto border border-(--pari-border) rounded-2xl">
                        <table className="w-full text-[13px] border-collapse">
                            <thead>
                                <tr className="bg-(--pari-bg-secondary) text-left">
                                    {['Order', 'Icon', 'Name', 'Description', ''].map((h) => (
                                        <th key={h} className="px-4 py-3 font-semibold text-(--pari-text-secondary) uppercase tracking-wide text-[11px] whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tools.map((tool) => (
                                    <tr key={tool.id} className="border-t border-(--pari-border) hover:bg-(--pari-bg-secondary)/50 transition-colors align-top">
                                        {editingId === tool.id ? (
                                            <>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={editForm.displayOrder}
                                                        onChange={(e) => setEditForm((f) => ({ ...f, displayOrder: e.target.value }))}
                                                        className="w-16 bg-(--pari-bg-primary) border border-(--pari-border) rounded px-2 py-1 text-[13px] focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={editForm.icon}
                                                        onChange={(e) => setEditForm((f) => ({ ...f, icon: e.target.value }))}
                                                        className="w-40 bg-(--pari-bg-primary) border border-(--pari-border) rounded px-2 py-1 text-[13px] focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                                                        className="w-40 bg-(--pari-bg-primary) border border-(--pari-border) rounded px-2 py-1 text-[13px] focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={editForm.description}
                                                        onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                                                        className="w-full bg-(--pari-bg-primary) border border-(--pari-border) rounded px-2 py-1 text-[13px] focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <button onClick={() => saveEdit(tool.id)} className="text-green-500 font-semibold mr-3">Save</button>
                                                    <button onClick={cancelEdit} className="text-(--pari-text-secondary) font-semibold">Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-4 py-3">{tool.display_order}</td>
                                                <td className="px-4 py-3"><i className={`${tool.icon} text-[#FF4500]`}></i></td>
                                                <td className="px-4 py-3 font-medium whitespace-nowrap">{tool.name}</td>
                                                <td className="px-4 py-3 text-(--pari-text-secondary)">{tool.description}</td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <button onClick={() => startEdit(tool)} className="text-[#FF4500] font-semibold mr-3">Edit</button>
                                                    <button onClick={() => handleDelete(tool.id)} className="text-red-500 font-semibold">Delete</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTools;
