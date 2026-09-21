import React from 'react';
import { Container } from './shared';
import Counter from '../ui/Counter';
import { proof } from '../../content/homeContent';

import amazonLogo from '../../assets/amazon.png';
import uberLogo from '../../assets/Uber.svg';
import swiggyLogo from '../../assets/swiggy.png';
import paytmLogo from '../../assets/Paytm.png';
import redbullLogo from '../../assets/RedBull.png';
import nestleLogo from '../../assets/nestle.png';
import pizzahutLogo from '../../assets/PizzaHut.jpg';
import budweiserLogo from '../../assets/Budweiser.png';
import gilletteLogo from '../../assets/Gillette.jpg';
import hersheysLogo from "../../assets/Hershey's.svg";
import nescafeLogo from '../../assets/Nescafe.png';
import relianceLogo from '../../assets/Reliance.png';
import myntraLogo from '../../assets/myntra.jpg';
import meeshoLogo from '../../assets/meesho.jpg';
import ndtvLogo from '../../assets/NDTV.png';
import indiatodayLogo from '../../assets/IndiaToday.png';
import hindustantimesLogo from '../../assets/HindustanTimes.jpg';
import tataLogo from '../../assets/tataWPL.jpg';
import apolloLogo from '../../assets/apollo.jpg';
import wowmomoLogo from '../../assets/WOWmomo.jpg';
import idpLogo from '../../assets/IDP.png';
import fixdermaLogo from '../../assets/FixDerma.avif';
import fastupLogo from '../../assets/FastUp.webp';
import hangyoLogo from '../../assets/Hangyo.jpg';
import flixbusLogo from '../../assets/flixbus.png';

const rowA = [
    ['Amazon', amazonLogo], ['Uber', uberLogo], ['Swiggy', swiggyLogo], ['Paytm', paytmLogo], ['Red Bull', redbullLogo],
    ['Nestlé', nestleLogo], ['Pizza Hut', pizzahutLogo], ['Budweiser', budweiserLogo], ['Gillette', gilletteLogo],
    ['Hershey’s', hersheysLogo], ['Nescafé', nescafeLogo], ['Reliance', relianceLogo],
];
const rowB = [
    ['Myntra', myntraLogo], ['Meesho', meeshoLogo], ['NDTV', ndtvLogo], ['India Today', indiatodayLogo],
    ['Hindustan Times', hindustantimesLogo], ['Tata WPL', tataLogo], ['Apollo', apolloLogo], ['Wow! Momo', wowmomoLogo],
    ['IDP', idpLogo], ['FixDerma', fixdermaLogo], ['Fast&Up', fastupLogo], ['Hangyo', hangyoLogo], ['FlixBus', flixbusLogo],
];

// Logos are repeated with "+" separators, as in the Quantara ecosystem wall.
const Row = ({ items, reverse = false }) => {
    const seq = [...items, ...items];
    return (
        <div className="marquee overflow-hidden" aria-hidden="true">
            <div className="marquee-track items-center" style={reverse ? { animationDirection: 'reverse', animationDuration: '85s' } : undefined}>
                {seq.map(([name, src], i) => (
                    <React.Fragment key={`${name}-${i}`}>
                        <div className="flex h-20 w-[168px] shrink-0 items-center justify-center px-6">
                            <img src={src} alt="" loading="lazy" className="logo-mono max-h-11 w-auto max-w-full object-contain" />
                        </div>
                        <span className="font-mono text-[18px] text-ink/30">+</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const SocialProof = () => (
    <section id="proof" className="relative bg-ink pb-10 pt-24 lg:pt-32">
        <Container>
            <div className="flex items-start justify-between gap-6">
                <h2 className="max-w-[22ch] text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-snug text-bone/90">
                    Trusted by 100+ brands across every consumer category.
                </h2>
                <span className="label text-stone">Ecosystem</span>
            </div>
        </Container>

        {/* Bone band on purpose: the brand logos are white-background files and multiply into it.
            Plain div (no transformed ancestor) so the blend group is not isolated. */}
        <div className="surface-bone mt-12 border-y border-ink/10 py-3">
            <Row items={rowA} />
            <Row items={rowB} reverse />
            <p className="sr-only">
                Brands include {[...rowA, ...rowB].map(([n]) => n).join(', ')}.
            </p>
        </div>

        <Container>
            <dl className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
                {proof.map((pr, i) => (
                    <div key={pr.label} className={`md:px-10 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-bone/12'}`}>
                        <dd className="display text-[clamp(3rem,7vw,6.5rem)] leading-none">
                            <Counter value={pr.value} prefix={pr.prefix} suffix={pr.suffix} />
                        </dd>
                        <dt className="label mt-4 text-stone">{pr.label}</dt>
                    </div>
                ))}
            </dl>
        </Container>
    </section>
);

export default SocialProof;
