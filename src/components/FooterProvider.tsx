"use client";

import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer';
import Navbar from './Navbar';

const FooterProvider = ({ children }: { children: React.ReactNode }) => {

    const path = usePathname()

    const isVisible = path.startsWith('/dashboard')

    return (
        <>
            {!isVisible && <Navbar />}
            {children}
            {!isVisible && <Footer />}
        </>
    )
}

export default FooterProvider