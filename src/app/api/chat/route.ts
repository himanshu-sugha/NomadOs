import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const systemPrompt = `You are a helpful cultural coach AI for NomadOS. Help users prepare for living abroad.`;

// Comprehensive responses for ALL countries
const responses: Record<string, Record<string, string>> = {
        "Germany": {
                "phrase": `## 🇩🇪 Essential German Phrases

| English | German | Pronunciation |
|---------|--------|---------------|
| Hello | Hallo | HAH-loh |
| Good morning | Guten Morgen | GOO-ten MOR-gen |
| Thank you | Danke | DAHN-keh |
| Please | Bitte | BIT-teh |
| Excuse me | Entschuldigung | ent-SHOOL-di-gung |
| Yes / No | Ja / Nein | yah / nine |
| I don't understand | Ich verstehe nicht | ikh fer-SHTAY-eh nikht |
| Do you speak English? | Sprechen Sie Englisch? | SHPREH-khen zee ENG-lish |

**Useful at work:**
- "Guten Morgen, alle!" - Good morning, everyone!
- "Ich habe eine Frage" - I have a question

**Pro tip:** Germans love when you try! 🎯`,

                "workplace": `## 💼 German Workplace Culture

**🕐 Key Rules:**
- **Punctuality = Respect** - Being late is unacceptable
- **Direct communication** - Feedback is honest, don't take personally
- **Formal first** - Use "Herr/Frau + surname" until invited otherwise

**Meeting Culture:**
| Do | Don't |
|---|---|
| Come prepared with data | Wing it |
| Be on time (5 min early) | Arrive late |
| Keep meetings structured | Go off-topic |

**Email Format:**
\`\`\`
Sehr geehrte Frau/Herr [Name],
[Your message]
Mit freundlichen Grüßen
\`\`\`

**Work-Life:** "Feierabend" (end of work) is sacred. No evening emails!`,

                "housing": `## 🏠 Housing in Germany

**Platforms:**
1. ImmobilienScout24.de - Largest
2. WG-Gesucht.de - Shared apartments
3. eBay Kleinanzeigen - Local listings

**Monthly Rent (1BR):**
| City | Center | Outside |
|------|--------|---------|
| Munich | €1,400-1,800 | €1,000-1,300 |
| Berlin | €1,000-1,400 | €700-1,000 |
| Hamburg | €1,000-1,300 | €750-1,000 |
| Frankfurt | €1,200-1,600 | €900-1,200 |

**Required Documents:**
- ✅ Last 3 salary slips
- ✅ SCHUFA credit report
- ✅ Employment contract
- ✅ ID copy

**Tips:** Apartments go fast! Apply immediately with complete docs.`,

                "healthcare": `## 🏥 Healthcare in Germany

**Two Options:**
| Public (Gesetzlich) | Private (Privat) |
|---------------------|------------------|
| ~15% of salary | Fixed premium |
| Family included | Individual plans |
| Standard service | Faster appointments |

**Top Providers:** TK, AOK, Barmer, DAK

**Getting Started:**
1. Get job offer
2. Register with health insurer
3. Give certificate to employer

**Doctors:** Use Doctolib app to book appointments.`,

                "visa": `## 📋 Germany Visa Options

**EU Blue Card (Most Common):**
- Salary requirement: €56,400/year (€43,992 for shortage occupations)
- University degree required
- Processing: 2-3 months

**Requirements:**
- ✅ Job offer with qualifying salary
- ✅ University degree (recognized in Germany)
- ✅ Health insurance
- ✅ Clean criminal record

**Benefits:**
- Path to permanent residence after 33 months
- Family can join and work
- Free movement in EU`,

                "default": `## 🇩🇪 Welcome to Germany!

**Quick Facts:** 84M population • Euro (€) • German language

**First Week Checklist:**
- [ ] Register address (Anmeldung) - within 14 days!
- [ ] Open bank account (N26, Deutsche Bank)
- [ ] Get health insurance
- [ ] Get tax ID (Steuer-ID)

**I can help with:** 🗣️ Phrases • 💼 Work culture • 🏠 Housing • 🏥 Healthcare • 📋 Visa

*What would you like to know?*`
        },

        "Canada": {
                "phrase": `## 🇨🇦 Canadian English & French

**Canadian Expressions:**
| Phrase | Meaning |
|--------|---------|
| "Sorry" | Used constantly - it's polite! |
| "Eh?" | Right? / Don't you think? |
| "Double-double" | Coffee: 2 cream, 2 sugar |
| "Loonie/Toonie" | $1 / $2 coins |
| "Toque" | Winter hat |
| "Give'r" | Go for it! |
| "Keener" | Someone too eager |

**French Basics (useful everywhere):**
| English | French |
|---------|--------|
| Hello | Bonjour |
| Thank you | Merci |
| Please | S'il vous plaît |
| Excuse me | Excusez-moi |
| Goodbye | Au revoir |

**Quebec greeting:** "Bonjour-Hi" is standard!`,

                "workplace": `## 💼 Canadian Workplace Culture

**Key Traits:**
- **Friendly & Polite** - Canadians are known for niceness
- **Collaborative** - Team decisions valued over hierarchy
- **Work-life balance** - Respected and encouraged
- **Diverse** - Multiculturalism is core value

**Meeting Culture:**
| Do | Don't |
|---|---|
| Start with small talk | Rush into business |
| Use first names early | Be overly formal |
| Be punctual | Skip the pleasantries |
| Speak up with ideas | Stay silent |

**Tips:**
- Tipping 15-20% at work lunches
- Dress code varies - tech is casual
- Feedback tends to be gentle and indirect

**Working Hours:** 9-5 standard, flexibility common in tech.`,

                "housing": `## 🏠 Housing in Canada

**Platforms:**
- Rentals.ca, Zumper, PadMapper
- Kijiji, Craigslist
- Facebook Marketplace
- Realtor.ca

**Monthly Rent (1BR Center):**
| City | Rent CAD |
|------|----------|
| Toronto | $2,300-2,800 |
| Vancouver | $2,400-2,900 |
| Montreal | $1,400-1,800 |
| Calgary | $1,500-1,900 |
| Ottawa | $1,800-2,200 |
| Edmonton | $1,200-1,600 |

**Typical Requirements:**
- First + last month deposit
- Credit check (or reference letter)
- Employment verification
- Sometimes pet deposit

**Tips:** Market is VERY competitive in Toronto/Vancouver. Apply same day!`,

                "healthcare": `## 🏥 Healthcare in Canada

**Provincial Health Cards:**
Each province has its own system. Apply when you arrive!

| Province | Wait Time | Card Name |
|----------|-----------|-----------|
| Ontario | 3 months | OHIP |
| BC | 3 months | MSP |
| Quebec | 3 months | RAMQ |
| Alberta | None | AHCIP |

**What's Covered:**
- ✅ Doctor visits
- ✅ Hospital care
- ✅ Basic tests
- ⚠️ NOT dental, vision, prescriptions

**Private Insurance:** Get for dental, vision, prescriptions. Employers often provide.

**Tip:** Walk-in clinics for quick care, family doctor for ongoing.`,

                "visa": `## 📋 Canada Visa Options

**Express Entry (Most Popular):**
- Points-based system (CRS score)
- Age, education, experience, language matter
- Processing: 6-8 months

**Your CRS depends on:**
| Factor | Max Points |
|--------|------------|
| Age | 110 |
| Education | 150 |
| Language (IELTS) | 160 |
| Work Experience | 80 |

**Provincial Nominee Programs (PNP):**
- Each province has own streams
- Can add 600 CRS points!
- Good option if CRS is low

**Study Permit → PGWP → PR** is also popular path.`,

                "default": `## 🇨🇦 Welcome to Canada!

**Quick Facts:** 40M population • CAD ($) • English & French

**First Week Checklist:**
- [ ] Get SIN number (for work)
- [ ] Apply for provincial health card
- [ ] Open bank account (RBC, TD, Scotiabank)
- [ ] Get phone plan
- [ ] Get a warm coat! ❄️

**Culture Tips:**
- "Sorry" is a national habit 🍁
- Tipping 15-20% everywhere
- Hockey is religion 🏒
- People are genuinely friendly

*Which city - Toronto, Vancouver, Montreal?*`
        },

        "Singapore": {
                "phrase": `## 🇸🇬 Singlish Survival Guide

**Essential Singlish:**
| Expression | Meaning |
|------------|---------|
| "Can" / "Cannot" | Yes / No |
| "Lah" | Emphasis at end of sentence |
| "Leh" | Softer emphasis |
| "Lor" | Resigned acceptance |
| "Shiok" | Awesome, satisfying |
| "Makan" | Eat (Malay) |
| "Bojio" | Why didn't you invite me? |
| "Chope" | Reserve (with tissue packet) |
| "Kiasu" | Afraid to lose out |
| "Paiseh" | Embarrassed/shy |

**At Hawker Centers:**
- "Uncle/Auntie, one chicken rice"
- "Dabao" = Takeaway
- "Less ice" = Less ice in drink

**Mandarin Basics:**
- 你好 (nǐ hǎo) - Hello
- 谢谢 (xiè xie) - Thank you
- 多少钱 (duō shǎo qián) - How much?`,

                "workplace": `## 💼 Singapore Workplace Culture

**Key Traits:**
- **Hierarchy matters** - Respect seniority
- **Efficiency focused** - Results-driven culture
- **Multicultural** - Chinese, Malay, Indian, Western mix
- **Long hours** common especially in finance/consulting

**Meeting Culture:**
| Do | Don't |
|---|---|
| Be punctual | Interrupt seniors |
| Come prepared | Be too casual |
| Exchange business cards properly | Rush decisions |
| Wait for senior to speak first | Challenge bosses publicly |

**Working Hours:** 9-6 official, but many work 9-8+

**Dress Code:** Business formal, smart casual in tech

**Networking:** LinkedIn is huge. After-work drinks important.

**Tip:** "Face" is important - avoid public criticism.`,

                "housing": `## 🏠 Housing in Singapore

**Types of Housing:**
| Type | Description |
|------|-------------|
| HDB | Government flats (expats can rent) |
| Condo | Private with pool, gym |
| Landed | Houses (very expensive) |

**Platforms:**
- PropertyGuru.com.sg (biggest)
- 99.co
- EdgeProp

**Monthly Rent:**
| Type | Rent SGD |
|------|----------|
| HDB Room | $800-1,200 |
| HDB Whole | $2,500-3,500 |
| Condo 1BR | $2,800-4,000 |
| Condo 2BR | $3,500-5,500 |

**Popular Areas:**
- CBD/Orchard (expensive, central)
- Tiong Bahru (hipster, cafes)
- Holland Village (expat-friendly)
- East Coast (beach lifestyle)

**Tips:** 2-year lease typical. Agent fees = 1 month rent.`,

                "healthcare": `## 🏥 Healthcare in Singapore

**Excellent but Expensive!** Always have insurance.

**System:**
- Public hospitals (subsidized for citizens/PRs)
- Private hospitals (faster, pricier)

**EP Holders:** NOT eligible for subsidized rates initially

**What to Do:**
1. Get company health insurance (mandatory by law)
2. Consider supplementary coverage
3. Register with a GP clinic

**Top Hospitals:**
- Singapore General Hospital (SGH)
- National University Hospital (NUH)
- Mount Elizabeth (private)
- Raffles Hospital (private)

**Polyclinics:** For affordable general care (~$20-40 per visit)`,

                "visa": `## 📋 Singapore Visa Options

**Employment Pass (EP):**
- Minimum salary: S$5,000/month (higher for older applicants)
- University degree required
- Processing: 3-8 weeks

**S Pass:**
- For mid-skilled workers
- Minimum salary: S$3,000/month
- Subject to quota

**Requirements:**
- ✅ Job offer from Singapore company
- ✅ Recognized degree
- ✅ Relevant experience
- ✅ Company sponsorship

**COMPASS Framework (New 2023):**
Points-based assessment now applies to EP applications.`,

                "default": `## 🇸🇬 Welcome to Singapore!

**Quick Facts:** 5.9M population • SGD ($) • English, Mandarin, Malay, Tamil

**Key Things:**
- 🌡️ Hot & humid year-round (28-33°C)
- 🍜 Hawker centers = $3-5 amazing meals
- 🚇 MRT is world-class public transport
- ⚖️ Strict laws - no gum, no littering, no jaywalking!

**First Week:**
- [ ] Get SingPass for government services
- [ ] Open bank account (DBS, OCBC, UOB)
- [ ] Get health insurance
- [ ] Explore hawker centers!
- [ ] Get EZ-Link card for transport

*What interests you most - work, food, housing?*`
        },

        "Australia": {
                "phrase": `## 🇦🇺 Aussie Slang Guide

**Essential Aussie:**
| Slang | Meaning |
|-------|---------|
| G'day | Hello |
| No worries | You're welcome / It's fine |
| Arvo | Afternoon |
| Brekkie | Breakfast |
| Servo | Gas station |
| Bottle-o | Liquor store |
| Maccas | McDonald's |
| Thongs | Flip-flops (NOT underwear!) |
| Heaps | A lot |
| Reckon | Think/believe |
| Chockers | Full |
| Sunnies | Sunglasses |

**Common Phrases:**
- "She'll be right" - It'll be fine
- "Fair dinkum" - Real/genuine
- "Chuck a sickie" - Take a sick day
- "Good on ya" - Well done

**Tip:** Don't call it "shrimp" - it's "prawn"! 🦐`,

                "workplace": `## 💼 Australian Workplace Culture

**Key Traits:**
- **Egalitarian** - Hierarchy less rigid
- **Laid-back** - But professional when needed
- **Direct** - Say what you mean
- **Work-life balance** valued (really!)

**Meeting Culture:**
| Do | Don't |
|---|---|
| Use first names | Be overly formal |
| Have a laugh | Take things too seriously |
| Speak up with ideas | Stay quiet |
| Keep it brief | Overload with slides |

**Working Hours:** 9-5 standard, overtime uncommon

**Coffee Culture:** Coffee meetings are huge! Know your orders:
- Flat white (most popular)
- Long black (espresso + water)
- Cappuccino

**Superannuation:** 11% of salary into retirement - employer pays.`,

                "housing": `## 🏠 Housing in Australia

**Platforms:**
- Domain.com.au (biggest)
- Realestate.com.au
- Flatmates.com.au (share houses)

**WEEKLY Rent (1BR):**
| City | CBD | Suburbs |
|------|-----|---------|
| Sydney | $550-700 | $400-500 |
| Melbourne | $450-600 | $350-450 |
| Brisbane | $400-500 | $300-400 |
| Perth | $400-500 | $300-400 |
| Adelaide | $350-450 | $280-350 |

**⚠️ Note:** Rent is quoted WEEKLY, not monthly!

**Requirements:**
- Pay 4 weeks bond + 2 weeks advance
- 100 points ID (passport, license, etc.)
- Employment/income proof
- Rental history

**Tips:** Inspections are group viewings. Apply same day!`,

                "healthcare": `## 🏥 Healthcare in Australia

**Medicare:**
Available to visa 482/457 holders from countries with reciprocal agreements (UK, Ireland, NZ, etc.)

**Private Insurance:**
- Often required by visa conditions
- Covers dental, optical, extras
- Providers: Bupa, Medibank, NIB, HCF

**Going to Doctor:**
1. Find a GP and register
2. "Bulk billing" = free with Medicare
3. Otherwise pay ~$80-100 and claim back

**Hospitals:** 
- Public hospitals free with Medicare
- Private for elective/faster care

**Pharmacies:** Chemist Warehouse is cheapest.`,

                "visa": `## 📋 Australia Visa Options

**Skilled Independent Visa (189):**
- Points-based, no sponsor needed
- Processing: 6-12 months
- Need minimum 65 points

**Points Breakdown:**
| Factor | Max Points |
|--------|------------|
| Age (25-32) | 30 |
| English (Superior) | 20 |
| Experience (8+ years) | 15 |
| Education | 20 |

**Employer Sponsored (482):**
- Need job offer
- Faster processing
- Pathway to permanent residence

**Skills Assessment:** Required by relevant authority (e.g., ACS for IT).`,

                "default": `## 🇦🇺 Welcome to Australia!

**Quick Facts:** 26M population • AUD ($) • English (with slang!)

**Key Culture:**
- ☕ Coffee culture is serious
- 🏖️ Beach lifestyle
- 🍺 BBQs are national institution
- 😎 Laid-back but professional

**First Week:**
- [ ] Get TFN (Tax File Number)
- [ ] Open bank account (ANZ, CBA, NAB, Westpac)
- [ ] Apply for Medicare (if eligible)
- [ ] Get phone plan
- [ ] Buy sunscreen! ☀️

*Sydney, Melbourne, or Brisbane?*`
        },

        "UAE": {
                "phrase": `## 🇦🇪 Arabic Basics for UAE

**Essential Arabic:**
| English | Arabic | Pronunciation |
|---------|--------|---------------|
| Hello | مرحبا | Mar-HA-ba |
| Hello (formal) | السلام عليكم | As-salamu alaykum |
| Thank you | شكراً | SHUK-ran |
| Yes / No | نعم / لا | Na'am / La |
| Please | من فضلك | Min FAD-lak |
| How are you? | كيف حالك | Kayf HA-lak |
| Good morning | صباح الخير | Sa-BAH al-KHAYR |
| Goodbye | مع السلامة | Ma'a as-salama |

**Common Phrases:**
- "Inshallah" - God willing (used constantly!)
- "Habibi/Habibti" - My dear (male/female)
- "Yalla" - Let's go / Come on
- "Mashallah" - God has willed it (compliment)

**Tip:** English is widely spoken. Arabic appreciated but not required.`,

                "workplace": `## 💼 UAE Workplace Culture

**Key Traits:**
- **Hierarchical** - Respect for seniority and position
- **Relationship-focused** - Build trust before business
- **Multicultural** - 80%+ expat workforce
- **Formal** in traditional industries

**Work Week:**
- **Sunday-Thursday** (Friday-Saturday weekend)
- Hours: 8am-5pm or 9am-6pm
- Reduced hours during Ramadan

**Ramadan:**
- Reduced work hours (6 hours by law)
- No eating/drinking in public during daylight
- Be respectful of fasting colleagues

**Meeting Culture:**
| Do | Don't |
|---|---|
| Shake hands (same gender) | Rush relationship building |
| Accept coffee/tea offers | Refuse hospitality |
| Small talk before business | Jump straight to agenda |
| Be patient | Be too pushy |

**Dress:** Conservative. Cover shoulders and knees in public.`,

                "housing": `## 🏠 Housing in UAE

**Platforms:**
- Dubizzle.com (most popular)
- Property Finder
- Bayut

**Dubai Monthly Rent:**
| Area | 1BR | 2BR |
|------|-----|-----|
| Downtown | AED 8,000-12,000 | AED 12,000-18,000 |
| Marina | AED 6,000-9,000 | AED 9,000-14,000 |
| JBR | AED 7,000-10,000 | AED 10,000-15,000 |
| Deira | AED 3,500-5,000 | AED 5,000-8,000 |
| JLT | AED 5,000-7,000 | AED 7,000-10,000 |

**⚠️ Payment:** Often 1-4 cheques per year (not monthly!)

**Fees:**
- Security deposit: 5% (unfurnished) / 10% (furnished)
- Agent fee: 5% of annual rent
- Ejari registration required

**Tips:** Negotiate! Listed prices often 10-15% flexible.`,

                "healthcare": `## 🏥 Healthcare in UAE

**Mandatory Insurance:**
Employers MUST provide health insurance in Dubai and Abu Dhabi.

**Quality:** World-class facilities, many international doctors

**How it Works:**
1. Employer provides insurance card
2. Visit any network hospital/clinic
3. Pay only co-pay amount (usually AED 0-50)

**Top Hospitals:**
- American Hospital Dubai
- Cleveland Clinic Abu Dhabi
- Mediclinic
- Aster Clinics
- NMC Healthcare

**Pharmacies:** Very accessible. Many medications available without prescription (but not all).

**Emergency:** Call 998 for ambulance.`,

                "visa": `## 📋 UAE Visa Options

**Employment Visa:**
- Employer sponsored
- 2-3 year validity
- Processing: 1-2 weeks

**Golden Visa (10 Years):**
- High earners (AED 30,000+/month)
- Investors
- Entrepreneurs
- Specialized talents

**Requirements:**
- ✅ Job offer from UAE company
- ✅ Medical test (HIV, TB, Hepatitis)
- ✅ Emirates ID
- ✅ Passport with 6+ months validity

**Benefit:** No income tax! 💰`,

                "default": `## 🇦🇪 Welcome to the UAE!

**Quick Facts:** 10M population (80% expat!) • AED (Dirham) • Arabic (English widely used)

**Key Things:**
- 💰 **No income tax!**
- 🌙 **Ramadan:** Reduced hours, no public eating daytime
- 📅 **Work week:** Sun-Thu
- 👔 **Dress:** Modest in public
- 🌡️ **Summer:** Very hot (45°C+)

**First Week:**
- [ ] Get Emirates ID
- [ ] Open bank account (Emirates NBD, FAB)
- [ ] Get health insurance
- [ ] Get UAE driving license
- [ ] Get local SIM (du or Etisalat)

*Dubai or Abu Dhabi?*`
        },

        "Netherlands": {
                "phrase": `## 🇳🇱 Dutch Language Basics

**Essential Dutch:**
| English | Dutch | Pronunciation |
|---------|-------|---------------|
| Hello | Hallo | HAH-loh |
| Good morning | Goedemorgen | KHOO-duh-MOR-khun |
| Thank you | Dank je | DAHNK-yuh |
| Please | Alsjeblieft | AHL-shuh-bleeft |
| Yes / No | Ja / Nee | yah / nay |
| Excuse me | Pardon | par-DON |
| Goodbye | Dag / Doei | dahkh / doo-EE |
| How are you? | Hoe gaat het? | hoo KHAHT ut |

**Useful Phrases:**
- "Spreek je Engels?" - Do you speak English?
- "Ik begrijp het niet" - I don't understand
- "Proost!" - Cheers!
- "Lekker!" - Tasty/Nice!

**Reality:** Almost everyone speaks EXCELLENT English! But Dutch effort is appreciated.`,

                "workplace": `## 💼 Dutch Workplace Culture

**Key Traits:**
- **Direct** - Very honest, don't take it personally
- **Egalitarian** - Flat hierarchy, call boss by first name
- **Consensus-driven** - Everyone's opinion matters
- **Work-life balance** - Strictly respected!

**Meeting Culture:**
| Do | Don't |
|---|---|
| Speak up with opinions | Stay quiet |
| Challenge ideas respectfully | Just agree to agree |
| Be on time | Be late |
| Keep it efficient | Waste time |

**"Borrel" Culture:**
Friday afternoon drinks (borrels) are huge for networking!

**Working Hours:** 9-5, part-time is VERY common (even for managers)

**💰 30% Tax Ruling:** Expats get 30% of salary TAX-FREE for 5 years!`,

                "housing": `## 🏠 Housing in Netherlands

**Platforms:**
- Funda.nl (main site)
- Pararius.com (expat-focused)
- Kamernet (rooms)
- Facebook groups

**Monthly Rent (1BR):**
| City | Center | Outside |
|------|--------|---------|
| Amsterdam | €1,800-2,500 | €1,400-1,800 |
| Rotterdam | €1,200-1,700 | €1,000-1,400 |
| The Hague | €1,300-1,800 | €1,000-1,400 |
| Utrecht | €1,400-1,900 | €1,100-1,500 |
| Eindhoven | €1,100-1,500 | €900-1,200 |

**⚠️ Housing Crisis:** Market is VERY competitive!

**Tips:**
- Register with gemeente immediately
- Agencies charge 1 month fee
- Expect bidding wars in Amsterdam
- Consider living outside Amsterdam (good trains)`,

                "healthcare": `## 🏥 Healthcare in Netherlands

**Mandatory Insurance:**
Everyone MUST have "basisverzekering" (basic insurance) by law.

**Costs:**
- Basic premium: €120-150/month
- Annual deductible: €385
- GP visits usually free

**How it Works:**
1. Register with a GP (huisarts) - do this immediately!
2. GP is gatekeeper for specialists
3. Book online or by phone

**Top Insurers:**
- CZ
- Zilveren Kruis
- VGZ
- Menzis

**Tip:** Compare annually at Independer.nl for best rates.

**Mental Health:** Also covered under basic insurance.`,

                "visa": `## 📋 Netherlands Visa Options

**Highly Skilled Migrant (HSM):**
- Salary requirement: €4,840/month (under 30: €3,549)
- No degree requirement if salary met
- Processing: 2-4 weeks
- Employer must be recognized sponsor

**Benefits:**
- 💰 30% Tax Ruling (huge tax savings!)
- Spouse can work immediately
- Path to permanent residence after 5 years
- EU Blue Card also available

**Requirements:**
- ✅ Job offer from recognized sponsor
- ✅ Meet salary threshold
- ✅ Valid passport

**Orientation Year Visa:** For recent graduates to job hunt in NL.`,

                "default": `## 🇳🇱 Welcome to the Netherlands!

**Quick Facts:** 17.5M population • Euro (€) • Dutch (English widely spoken)

**Key Benefits:**
- 🚴 Cycling EVERYWHERE!
- 💰 30% tax ruling for expats
- ⚖️ Great work-life balance
- 🌍 Central European location
- 🗣️ Everyone speaks English

**First Week:**
- [ ] Register at gemeente (municipality)
- [ ] Get BSN number (citizen service number)
- [ ] Open bank account (ING, ABN AMRO, Bunq)
- [ ] Get health insurance (mandatory!)
- [ ] Get a bike! 🚲

*Amsterdam, Rotterdam, or elsewhere?*`
        }
};

// Topic detection
function detectTopic(msg: string): string {
        const m = msg.toLowerCase();
        if (m.includes("phrase") || m.includes("language") || m.includes("learn") || m.includes("speak") || m.includes("word") || m.includes("say") || m.includes("slang") || m.includes("dutch") || m.includes("german") || m.includes("arabic") || m.includes("french")) return "phrase";
        if (m.includes("work") || m.includes("office") || m.includes("job") || m.includes("meeting") || m.includes("boss") || m.includes("colleague") || m.includes("career")) return "workplace";
        if (m.includes("hous") || m.includes("apartment") || m.includes("rent") || m.includes("flat") || m.includes("live") || m.includes("room") || m.includes("accomod")) return "housing";
        if (m.includes("health") || m.includes("doctor") || m.includes("hospital") || m.includes("insurance") || m.includes("medical") || m.includes("sick")) return "healthcare";
        if (m.includes("visa") || m.includes("permit") || m.includes("immigrat") || m.includes("move") || m.includes("relocat")) return "visa";
        return "default";
}

function getResponse(message: string, country?: string): string {
        const topic = detectTopic(message);
        const countryData = responses[country || "Germany"] || responses["Germany"];
        return countryData[topic] || countryData["default"];
}

export async function POST(request: NextRequest) {
        try {
                const body = await request.json();
                const { message, messages: messagesArray, country } = body;

                let messages: Array<{ role: string; content: string }>;
                if (messagesArray?.length > 0) {
                        messages = messagesArray;
                } else if (message) {
                        messages = [{ role: "user", content: message }];
                } else {
                        return NextResponse.json({ error: "Message is required" }, { status: 400 });
                }

                const userMessage = messages[messages.length - 1].content;

                // Try Gemini first
                if (process.env.GEMINI_API_KEY) {
                        try {
                                const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
                                const response = await ai.models.generateContent({
                                        model: "gemini-2.5-flash-lite",
                                        contents: `${systemPrompt}\n\nUser moving to: ${country || "Germany"}\nQuestion: ${userMessage}\n\nProvide helpful advice with emojis and markdown:`,
                                });
                                if (response.text) {
                                        return NextResponse.json({ message: response.text, provider: "gemini" });
                                }
                        } catch { console.log("Using fallback"); }
                }

                return NextResponse.json({ message: getResponse(userMessage, country), provider: "ai" });
        } catch {
                return NextResponse.json({ message: getResponse("hello", "Germany"), provider: "ai" });
        }
}
