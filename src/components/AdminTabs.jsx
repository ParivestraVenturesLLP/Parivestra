import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { to: '/admin', label: 'Leads' },
    { to: '/admin/tools', label: 'Tools' },
];

const AdminTabs = () => {
    const location = useLocation();

    return (
        <div className="flex items-center gap-2 mb-8">
            {tabs.map((tab) => (
                <Link
                    key={tab.to}
                    to={tab.to}
                    className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors ${location.pathname === tab.to
                        ? 'bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white'
                        : 'bg-(--pari-bg-secondary) text-(--pari-text-secondary) hover:text-(--pari-text-primary)'
                        }`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
};

export default AdminTabs;
