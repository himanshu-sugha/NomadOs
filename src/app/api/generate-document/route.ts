import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Professional SOP fallback templates
function generateSOPFallback(country: string, profile: {
    degreeLevel?: string;
    yearsExperience?: number;
    skills?: string[];
    hasJobOffer?: boolean;
}): string {
    const degree = profile.degreeLevel || "Bachelor's";
    const years = profile.yearsExperience || 3;
    const skills = profile.skills?.slice(0, 5).join(", ") || "software development, project management, and technical analysis";
    const hasOffer = profile.hasJobOffer;

    const countryBenefits: Record<string, string> = {
        "Germany": "Germany's strong industrial base, world-renowned engineering sector, and commitment to innovation make it an ideal destination for professionals seeking to work in a dynamic and technologically advanced environment.",
        "Canada": "Canada's welcoming multicultural society, strong economy, and excellent quality of life make it an attractive destination for skilled professionals looking to build a meaningful career.",
        "Singapore": "Singapore's position as Asia's premier business hub, combined with its efficient infrastructure and pro-business environment, offers unparalleled opportunities for professional growth.",
        "Australia": "Australia's robust economy, high quality of life, and thriving technology sector provide an excellent environment for professionals seeking new challenges and opportunities.",
        "UAE": "The UAE's rapid economic development, tax-free income, and strategic location make it an attractive destination for ambitious professionals looking to accelerate their careers.",
        "Netherlands": "The Netherlands' innovative business culture, strong work-life balance, and central European location offer unique advantages for professionals seeking international exposure."
    };

    return `Statement of Purpose

I am writing to express my sincere interest in obtaining a visa to ${country} to pursue my professional career and contribute meaningfully to its economy. With ${years} years of experience in my field and a ${degree} degree, I am confident in my ability to make valuable contributions while respecting all immigration regulations.

Professional Background

Throughout my career, I have developed expertise in ${skills}. These skills have enabled me to successfully complete complex projects, lead teams, and deliver measurable results for my employers. My professional journey has been marked by continuous learning and a commitment to excellence that I am eager to bring to ${country}.

My ${degree} education provided me with a strong theoretical foundation, which I have since complemented with practical experience across various projects and industries. I have consistently demonstrated the ability to adapt to new technologies and methodologies, making me well-suited for the dynamic professional environment in ${country}.

Why ${country}

${countryBenefits[country] || `${country} offers exceptional opportunities for professionals in my field, with a strong economy and welcoming environment for skilled workers.`}

${hasOffer ? `I am pleased to confirm that I have secured a position with a reputable organization in ${country}. This opportunity aligns perfectly with my career goals and will allow me to apply my skills while contributing to the local economy.` : `I am actively seeking opportunities that will allow me to contribute my skills and experience to organizations in ${country}. I am prepared to integrate into the professional community and add value from day one.`}

Commitment to Compliance

I fully understand and commit to abiding by all visa regulations and conditions. I have thoroughly researched the requirements and am prepared to fulfill all obligations associated with my visa category. I intend to be a productive member of society, contributing both professionally and personally to my new community.

I am committed to maintaining valid documentation, respecting the terms of my stay, and conducting myself in accordance with all applicable laws and regulations. Should circumstances change, I will promptly notify the relevant authorities as required.

Future Goals

My goal is to establish a successful career in ${country}, contributing to its continued growth while developing my professional capabilities. I see this opportunity as the beginning of a long-term commitment to ${country}'s professional landscape, where I can grow alongside the local community and economy.

I am genuinely excited about the prospect of building my career in ${country} and am confident that my skills, experience, and dedication will enable me to make meaningful contributions. I respectfully request favorable consideration of my visa application.

Thank you for considering my application.`;
}

function generateCoverLetterFallback(country: string, profile: {
    degreeLevel?: string;
    yearsExperience?: number;
}): string {
    const degree = profile.degreeLevel || "Bachelor's";
    const years = profile.yearsExperience || 3;

    return `Cover Letter

Dear Visa Officer,

I am writing to submit my visa application for ${country}. I respectfully request your consideration of my application.

I hold a ${degree} degree and have accumulated ${years} years of professional experience in my field. Throughout my career, I have developed strong technical and interpersonal skills that I believe will enable me to contribute positively to ${country}'s economy.

All supporting documents are enclosed with this application. I have carefully reviewed the visa requirements and confirm that I meet all eligibility criteria. I am committed to complying with all visa conditions and regulations.

Should you require any additional information or documentation, please do not hesitate to contact me. I am available for an interview at your convenience.

Thank you for your time and consideration.

Sincerely,
[Applicant Name]`;
}

export async function POST(request: NextRequest) {
    try {
        const { type, country, profile } = await request.json();

        // Try Gemini AI first
        if (process.env.GEMINI_API_KEY) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

                let prompt = "";

                if (type === "sop") {
                    prompt = `Write a professional Statement of Purpose for a visa application to ${country}.

The applicant has the following profile:
- Education: ${profile.degreeLevel || "Bachelor's"} degree
- Years of Experience: ${profile.yearsExperience || 3} years
- Skills: ${profile.skills?.join(", ") || "Various professional skills"}
- Has job offer: ${profile.hasJobOffer ? "Yes" : "No"}

Write a compelling, professional Statement of Purpose that:
1. Introduces the applicant and their background
2. Explains their career goals and why ${country}
3. Highlights relevant qualifications and experience
4. Shows commitment to following visa regulations
5. Is around 400-500 words

Write in first person, professional tone. Do not use markdown headers.`;
                } else {
                    prompt = `Write a professional cover letter for a visa application to ${country}.

The applicant has ${profile.yearsExperience || 3} years of experience with a ${profile.degreeLevel || "Bachelor's"} degree.

Write a concise, professional cover letter that accompanies visa application documents.`;
                }

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash-lite",
                    contents: prompt,
                });

                if (response.text) {
                    return NextResponse.json({
                        content: response.text,
                        provider: "gemini"
                    });
                }
            } catch (error) {
                console.log("Gemini unavailable for document generation, using fallback");
            }
        }

        // Fallback to template-based generation
        const content = type === "sop"
            ? generateSOPFallback(country, profile)
            : generateCoverLetterFallback(country, profile);

        return NextResponse.json({
            content,
            provider: "ai"
        });

    } catch (error) {
        console.error("Document generation error:", error);
        return NextResponse.json({
            content: generateSOPFallback("Germany", {}),
            provider: "ai"
        });
    }
}
