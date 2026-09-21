import React from 'react';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../components/home/Hero';
import SocialProof from '../components/home/SocialProof';
import OutcomesScene from '../components/home/OutcomesScene';
import MeshFeatures from '../components/home/MeshFeatures';
import FlowStack from '../components/home/FlowStack';
import SolutionsTable from '../components/home/SolutionsTable';
import InfraFan from '../components/home/InfraFan';
import CaseStudies from '../components/home/CaseStudies';
import Coverage from '../components/home/Coverage';
import FinalCTA from '../components/home/FinalCTA';

// Section flow follows plan §4, staged like the Quantara template:
// 01 Hero · 02 Social proof · 03 Outcomes (pinned tray) · 04 Consumer Mesh (features + flow stack) ·
// 05 Solutions (tier table) · 06 Infrastructure (fan) · 07 Case studies · 08 Coverage · 09 Final CTA
const PariHome = () => {
    usePageMeta({
        title: 'Parivestra | Outcome Infrastructure for Consumer Brands',
        description: 'Parivestra connects millions of consumer touchpoints across digital, communities, creators and the physical world, and engineers them toward measurable business outcomes.',
        path: '/',
    });

    return (
        <div className="min-h-screen bg-ink font-sans text-bone">
            <PariNavbar />
            <main className="pb-[72px] lg:pb-0">
                <Hero />
                <SocialProof />
                <OutcomesScene />
                <MeshFeatures />
                <FlowStack />
                <SolutionsTable />
                <InfraFan />
                <CaseStudies />
                <Coverage />
                <FinalCTA />
            </main>
            <PariFooter />
        </div>
    );
};

export default PariHome;
