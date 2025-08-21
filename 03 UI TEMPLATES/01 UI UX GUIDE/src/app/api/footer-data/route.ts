// src/app/api/footer-data/route.ts
import { NextResponse } from "next/server";

const footerData = {
    brand: {
        name: "UX/UI Hub",
        tagline: "Your portal for user experience and interface design. Discover case studies, tools, and pioneers shaping the digital world.",
        socialLinks: [
            {
                icon: "/images/home/footerSocialIcon/twitter.svg",
                dark_icon: "/images/home/footerSocialIcon/twitter_dark.svg",
                link: "https://twitter.com"
            },
            {
                icon: "/images/home/footerSocialIcon/linkedin.svg",
                dark_icon: "/images/home/footerSocialIcon/linkedin_dark.svg",
                link: "https://linkedin.com/in"
            },
            {
                icon: "/images/home/footerSocialIcon/dribble.svg",
                dark_icon: "/images/home/footerSocialIcon/dribble_dark.svg",
                link: "https://dribbble.com"
            },
            {
                icon: "/images/home/footerSocialIcon/instagram.svg",
                dark_icon: "/images/home/footerSocialIcon/instagram_dark.svg",
                link: "https://instagram.com"
            }
        ]
    },
    explore: {
        name: "Explore",
        links: [
            { name: "Case Studies", url: "/#casos-estudio" },
            { name: "UX/UI Tools", url: "/#herramientas" },
            { name: "Design Pioneers", url: "/#referentes" },
            { name: "Historical Milestones", url: "/#hitos" },
            { name: "Resources", url: "/recursos" }
        ]
    },
    learn: {
        name: "Learn",
        links: [
            { name: "What is UX/UI?", url: "/#aboutus" },
            { name: "Methodologies", url: "/metodologias" },
            { name: "Frequently Asked Questions", url: "/#faq" },
            { name: "Glossary", url: "/glosario" },
            { name: "Blog", url: "/blog" }
        ]
    },
    legal: {
        name: "Legal",
        links: [
            { name: "Terms & Conditions", url: "/terms-and-conditions" },
            { name: "Privacy Policy", url: "/privacy-policy" },
            { name: "Documentation", url: "/documentation" },
            { name: "Contact", url: "/contact" }
        ]
    },
    about: {
        name: "About the Project",
        description: "Informational website created as an academic project for Universidad Galileo.",
        details: [
            "Faculty of Communication Sciences",
            "Bachelor’s in Communication and Design",
            "Course: Web Design"
        ]
    },
    copyright: "©2025 UX/UI Hub - Academic Project, Universidad Galileo. All rights reserved."
};

export const GET = async () => {
  return NextResponse.json({
    footerData
  });
};