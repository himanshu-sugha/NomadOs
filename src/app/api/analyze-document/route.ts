import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const documentType = formData.get("type") as string || "passport";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        console.log("Processing file:", file.name, "Type:", file.type, "Size:", file.size);

        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const mimeType = file.type || "image/jpeg";

        // Try OCR.space for text extraction
        try {
            const ocrFormData = new FormData();
            ocrFormData.append("base64Image", `data:${mimeType};base64,${base64}`);
            ocrFormData.append("language", "eng");
            ocrFormData.append("isOverlayRequired", "false");
            ocrFormData.append("detectOrientation", "true");
            ocrFormData.append("scale", "true");
            ocrFormData.append("OCREngine", "2");

            const ocrResponse = await fetch("https://api.ocr.space/parse/image", {
                method: "POST",
                headers: { "apikey": "helloworld" },
                body: ocrFormData,
            });

            const ocrResult = await ocrResponse.json();

            if (ocrResult.ParsedResults && ocrResult.ParsedResults.length > 0) {
                const extractedText = ocrResult.ParsedResults[0].ParsedText || "";

                if (extractedText.trim().length > 5) {
                    const structuredData = parseExtractedText(extractedText, documentType);

                    return NextResponse.json({
                        success: true,
                        data: structuredData,
                        provider: "ocr.space",
                        rawText: extractedText
                    });
                }
            }
        } catch (ocrError) {
            console.error("OCR.space error:", ocrError);
        }

        return NextResponse.json({
            success: true,
            data: getDemoData(documentType),
            provider: "demo"
        });

    } catch (error) {
        console.error("Document analysis error:", error);
        return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 });
    }
}

function parseExtractedText(text: string, type: string): Record<string, unknown> {
    const lines = text.split(/[\n\r]+/).filter(l => l.trim().length > 0);
    const result: Record<string, unknown> = {};
    const textLower = text.toLowerCase();

    // Common pattern extractions
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = text.match(/[\+]?[0-9]{1,2}[-\s]?[0-9]{10}|[\+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}/);
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    const githubMatch = text.match(/github\.com\/[\w-]+/i);
    const dateMatches = text.match(/\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/g);
    const aadhaarMatch = text.match(/\d{4}\s*\d{4}\s*\d{4}/);

    // Skip words - things that are NOT names
    const skipWords = ["government", "india", "republic", "aadhaar", "unique", "identification", "authority", "steer", "male", "female"];

    // For Aadhaar cards, look for name after specific patterns
    if (type === "passport") {
        // Look for name - usually after specific markers on Aadhaar
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const lineLower = line.toLowerCase();

            // Skip government/official headers
            if (skipWords.some(w => lineLower.includes(w))) continue;
            if (line.match(/^\d/)) continue; // Skip lines starting with numbers
            if (line.length < 3 || line.length > 40) continue;
            if (line.includes("@")) continue; // Skip emails
            if (line.includes("/") && line.match(/\d/)) continue; // Skip dates

            // This is likely a name
            result["Name"] = line;
            break;
        }

        // Extract DOB
        const dobMatch = text.match(/DOB\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i);
        if (dobMatch) {
            result["Date of Birth"] = dobMatch[1];
        } else if (dateMatches && dateMatches.length > 0) {
            result["Date of Birth"] = dateMatches[0];
        }

        // Extract gender
        if (textLower.includes("male") && !textLower.includes("female")) {
            result["Gender"] = "Male";
        } else if (textLower.includes("female")) {
            result["Gender"] = "Female";
        }

        // Aadhaar number
        if (aadhaarMatch) {
            result["Document Number"] = aadhaarMatch[0];
        }

        // Country
        if (textLower.includes("india")) {
            result["Country"] = "India";
        }
    }

    // Always extract these if found
    if (emailMatch) result["Email"] = emailMatch[0];
    if (phoneMatch) result["Phone"] = phoneMatch[0];
    if (linkedinMatch) result["LinkedIn"] = linkedinMatch[0];
    if (githubMatch) result["GitHub"] = githubMatch[0];

    // Extract location
    const locationMatch = text.match(/([A-Z][a-z]+),?\s*([A-Z]\.?[A-Z]\.?)\s*[-–]?\s*\d{5,6}/);
    if (locationMatch) {
        result["Location"] = locationMatch[0];
    }

    if (type === "work") {
        // Look for name at the start
        for (const line of lines.slice(0, 3)) {
            const cleanLine = line.trim();
            if (cleanLine.length > 2 && cleanLine.length < 40 &&
                !cleanLine.includes("@") && !cleanLine.match(/^\d/) &&
                !cleanLine.toLowerCase().includes("resume")) {
                result["Name"] = cleanLine;
                break;
            }
        }

        // Extract skills
        const skillPatterns = [
            "javascript", "typescript", "python", "java", "c++", "c#", "go", "rust", "ruby", "php",
            "react", "angular", "vue", "next.js", "node.js", "express", "django", "flask",
            "mongodb", "postgresql", "mysql", "redis", "firebase",
            "aws", "azure", "docker", "kubernetes", "git", "html", "css", "tailwind"
        ];

        const foundSkills: string[] = [];
        for (const skill of skillPatterns) {
            if (textLower.includes(skill.toLowerCase())) {
                foundSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
            }
        }
        if (foundSkills.length > 0) {
            result["Skills"] = foundSkills;
        }

        // Job titles
        const jobPatterns = [
            /software\s*(?:engineer|developer)/i,
            /web\s*developer/i,
            /full\s*stack/i,
            /frontend|backend/i,
            /data\s*(?:scientist|engineer|analyst)/i,
        ];

        for (const pattern of jobPatterns) {
            const match = text.match(pattern);
            if (match) {
                result["Role"] = match[0];
                break;
            }
        }

        // Experience
        const expMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)/i);
        if (expMatch) {
            result["Experience"] = `${expMatch[1]} years`;
        }
    }

    result["_documentType"] = type;

    return result;
}

function getDemoData(documentType: string) {
    switch (documentType) {
        case "passport":
            return {
                "Name": "Alex Johnson",
                "Country": "United States",
                "Document Number": "X12345678",
                "Date of Birth": "1990-05-15",
            };
        case "work":
            return {
                "Name": "Alex Johnson",
                "Role": "Senior Software Engineer",
                "Company": "Tech Corp Inc.",
                "Skills": ["JavaScript", "Python", "React"],
            };
        default:
            return { "Status": "Document processed" };
    }
}
