import React from 'react';
import { glyphs } from './icons';
import { flow } from '../../content/homeContent';

// Static "Outcome Flow" diagram: Consumer → Intent → Distribution → Engagement → Transaction.
// Used on solution and infrastructure pages (plan §7: Outcome Flow SVG).
const OutcomeFlow = ({ highlight }) => (
    <ol className="relative grid gap-4 md:grid-cols-5 md:gap-0" aria-label="Outcome flow">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-[46px] hidden border-t border-dashed border-bone/25 md:block" aria-hidden="true" />
        {flow.map((f, i) => {
            const on = highlight === undefined || highlight === f.id;
            return (
                <li key={f.id} className="relative flex items-center gap-5 md:flex-col md:text-center">
                    <span
                        className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-[22px] border bg-[#15130f] transition-colors"
                        style={{ borderColor: on ? 'rgba(216,138,67,.55)' : 'rgba(239,231,219,.14)' }}
                    >
                        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke={on ? '#D88A43' : '#EFE7DB'} strokeOpacity={on ? 1 : 0.6} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            {glyphs[f.id]}
                        </svg>
                        <span className="label absolute -top-2 left-3 bg-ink px-1.5 text-[9px] text-copper">0{i + 1}</span>
                    </span>
                    <div className="md:mt-5">
                        <h3 className="display text-[1.5rem]">{f.name}</h3>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-bone/55 md:px-3">{f.text}</p>
                    </div>
                </li>
            );
        })}
    </ol>
);

export default OutcomeFlow;
