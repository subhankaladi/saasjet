import React from 'react'

const Footer = () => {
    return (
        <>
            {/* FOOTER */}
            <footer className="border-t border-white/10 py-8 text-center text-white/50">
                <p>© {new Date().getFullYear()} SaasJet – Open-source SaaS Starter Kit.</p>
            </footer>
        </>
    )
}

export default Footer