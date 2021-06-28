import React, { lazy, Suspense } from 'react';
import Loading from '../Loading/Loading';

const Hero = lazy(() => import('./Hero/Hero'));
const Equipo = () => {
    
    return (
        
        <Suspense fallback={<Loading />}>
            <Hero/>
        </Suspense>
        
    )
}

export default Equipo
