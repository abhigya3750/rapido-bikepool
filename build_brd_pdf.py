#!/usr/bin/env python3
import os
import sys
from pdf_builder import PDFDoc

def generate_brd():
    pdf = PDFDoc(title="Rapido Bikepool & Highway BRD", author="Senior Product Manager")
    
    # 1. Header Banner
    meta = [
        ("Doc Version", "v1.0 (Final)"),
        ("Initiative", "Project Parinda"),
        ("Author", "Principal PM"),
        ("Date", "August 2026")
    ]
    pdf.draw_header_banner(
        doc_type="Business Requirements Document (BRD)",
        main_title="Rapido Commute & Highway Bikepool",
        subtitle="Monetizing Organic P2P Commute Sharing & Intercity Bike Travel",
        meta_items=meta
    )
    
    # Section 1
    pdf.draw_heading1("01", "Executive Summary & Market Opportunity")
    pdf.draw_paragraph(
        "Across major Indian metropolitan tech hubs (Bengaluru, Hyderabad, Pune, Delhi-NCR, Chennai), thousands of private two-wheeler owners register on the Rapido Captain app not to work as full-time gig workers, but as daily office commuters seeking to offset steep fuel expenses (petrol at Rs 100+/L). However, because the current Captain app is designed strictly for commercial on-demand dispatch, these riders face severe friction."
    )
    
    pdf.draw_callout_box(
        "Market Problem Statement",
        "Commuters are hacking the commercial bike-taxi platform by canceling non-matching rides and calling customers offline. This leads to driver account penalties, poor passenger reliability, and lost revenue. Meanwhile, passengers face 50-70% higher surge pricing on autos and cabs during peak hours.",
        box_type="warning"
    )
    
    pdf.draw_heading2("Strategic Shift: Commercial Captain vs. Peer-to-Peer Commuter")
    pdf.draw_bullet_point("Driver Motivation", "Commercial Captains work for full-time livelihood; P2P Commuters ride for fuel cost recovery.")
    pdf.draw_bullet_point("Route Control", "Commercial rides are passenger-directed; P2P rides are 100% Host corridor-directed.")
    pdf.draw_bullet_point("Vehicle & Regulation", "Commercial operates under taxi permits; P2P operates under MoRTH non-commercial cost-sharing carpooling rules.")
    pdf.draw_bullet_point("Supply Acquisition", "Zero driver acquisition subsidies needed as commuter supply is organic and self-sustaining.")
    
    # Section 2
    pdf.draw_heading1("02", "Strategic Business Objectives & Core OKRs")
    pdf.draw_paragraph(
        "The objective of this initiative is to create a multi-million daily ride-share ecosystem with zero driver acquisition burn by formalizing peer bikepooling and intercity bike-sharing."
    )
    
    headers = ["Strategic Pillar", "Business Objective", "12-Month Target (OKR)"]
    rows = [
        ["Supply Liquidity", "Onboard verified white-plate commuter hosts", "150,000+ Active Hosts"],
        ["Match Efficiency", "Instant corridor match within 5-min lead window", ">= 72% Match Rate"],
        ["Zero-Detour SLA", "Strictly constrain host deviation from original path", "<= 400m average detour"],
        ["Safety & Identity", "Enterprise email and DigiLocker verification", ">= 85% Verified Users"],
        ["Gross Contribution", "Net platform take-rate per pooled seat", "14.5% - 16.0% Margin"]
    ]
    pdf.draw_table(headers, rows, col_widths=[110, 230, 165])
    
    # Section 3
    pdf.draw_heading1("03", "Product Scope & Offering Architecture")
    pdf.draw_paragraph(
        "The ecosystem encompasses two dedicated host offerings and one unified corridor passenger discovery experience:"
    )
    
    pdf.draw_heading2("Service Stream A: Rapido Commute (Intra-City 5km - 30km)")
    pdf.draw_bullet_point("Distance Constraint", "Strictly bounded between 5 km and 30 km to serve genuine office tech-corridors.")
    pdf.draw_bullet_point("Automated Cost-Sharing", "Rapido algorithm automatically calculates fair fuel-split fare (e.g. Rs 4.5/km + base). No surge pricing.")
    pdf.draw_bullet_point("5-Minute Countdown SLA", "Host publishes ride with a 5-minute departure countdown; co-riders book directly along the route.")
    pdf.draw_bullet_point("Corridor Landmark Hubs", "System snaps pick-up to major bus stops/metro gates on host path for zero detour.")
    
    pdf.draw_heading2("Service Stream B: Rapido Highway (Inter-City City-to-City)")
    pdf.draw_bullet_point("Distance Constraint", "Covering 30 km to 350 km (e.g., Bengaluru-Mysuru, Pune-Mumbai, Delhi-Jaipur).")
    pdf.draw_bullet_point("Advance Scheduling", "Mandatory minimum 1 hour advance booking (scheduled up to 7 days ahead).")
    pdf.draw_bullet_point("Host-Customized Pricing", "Host sets per-seat price within a regulated platform band (e.g., Rs 2.50 to Rs 4.00 per km).")
    pdf.draw_bullet_point("Luggage & Gear Specs", "Explicit declaration of spare ISI helmet, max 1 backpack (<7kg), and planned rest halts.")
    
    pdf.draw_heading2("Service Stream C: Passenger Corridor Discovery ('Find a Shared Ride')")
    pdf.draw_bullet_point("Corridor Search", "Passenger enters origin/drop; algorithm matches hosts passing within 400m of the path.")
    pdf.draw_bullet_point("Host Comparison Matrix", "Shows verified corporate ID badges, safety ratings (4.9/5), bike model, walking distance, and price.")
    
    # Section 4
    pdf.draw_heading1("04", "User Personas & Humanized Profiles")
    
    headers_p = ["Persona Profile", "Daily Travel Routine", "Core Pain Point", "Platform Value"]
    rows_p = [
        ["Rahul (27)\nIntra-City Host", "Senior Dev at Manyata Tech Park. Commutes 18km each way from HSR Layout.", "Spends Rs 4,500/mo on petrol. Hates commercial taxi detours.", "One-tap publish 5 mins before leaving; offsets 70% fuel with zero detour."],
        ["Aniket (25)\nInter-City Host", "Product Designer traveling Pune to Mumbai (150km) on alternate weekends.", "High expressway tolls and petrol costs; solo riding gets exhausting.", "Schedule trips 2 days ahead, set fair seat rate, filter verified co-riders."],
        ["Priya (23)\nCo-Rider Passenger", "Analyst traveling Indiranagar to Bellandur during peak rush hour.", "Auto surge (Rs 250+) and frequent cab cancellations.", "Safe, corporate-verified seat at Rs 65 (50% cheaper than cabs)."]
    ]
    pdf.draw_table(headers_p, rows_p, col_widths=[105, 135, 135, 130])
    
    # Section 5
    pdf.draw_heading1("05", "Regulatory, Trust & Safety Framework")
    pdf.draw_callout_box(
        "Statutory Compliance Under MoRTH Guidelines",
        "To comply with Central Motor Vehicle Carpooling Rules and protect private white-plate two-wheelers, the system strictly enforces a maximum of 2 shared rides per day per host and mandates pure cost-reimbursement pricing with zero commercial surge.",
        box_type="success"
    )
    pdf.draw_bullet_point("Corporate Email & ID Auth", "Two-step verification using company email (@company.com) and DigiLocker/Aadhaar integration.")
    pdf.draw_bullet_point("Rapido Pink Pool", "Women-only commute toggle allowing female hosts and co-riders to match exclusively with women.")
    pdf.draw_bullet_point("Mandatory Dual Helmet", "In-app pre-trip confirmation that both host and passenger possess ISI-certified helmets.")
    pdf.draw_bullet_point("Integrated Micro-Insurance", "Rs 5,00,000 personal accident cover automatically embedded into every pooled booking.")
    
    # Section 6
    pdf.draw_heading1("06", "Financial Model & Unit Economics")
    
    headers_econ = ["Metric Component", "Intra-City Pool (15 km)", "Inter-City Highway (150 km)"]
    rows_econ = [
        ["Passenger Total Price", "Rs 85.00 (vs Rs 180 auto)", "Rs 420.00 (vs Rs 750 bus)"],
        ["Host Fuel Reimbursement", "Rs 72.00 (Direct UPI payout)", "Rs 360.00 (Direct UPI payout)"],
        ["Rapido Platform Margin", "Rs 11.50 (13.5% take rate)", "Rs 55.00 (13.1% take rate)"],
        ["Micro-Insurance & Support", "Rs 1.50 per seat", "Rs 5.00 per seat"],
        ["Net Unit Margin per Ride", "Rs 11.50 (Zero CAC Burn)", "Rs 50.00 (Zero CAC Burn)"]
    ]
    pdf.draw_table(headers_econ, rows_econ, col_widths=[165, 170, 170])
    
    # Section 7
    pdf.draw_heading1("07", "Business Risks & Mitigation Matrix")
    headers_risk = ["Identified Risk", "Severity", "Strategic Mitigation Plan"]
    rows_risk = [
        ["Commercial Taxi Union Pushback", "High", "Strictly enforce 2 trips/day limit and non-surge fuel cost recovery to maintain non-commercial legal classification."],
        ["Host Late Dropouts / No-Shows", "Medium", "Implement Host Reliability Score. Late cancellations deduct reward points and freeze peak hosting privileges."],
        ["Off-Corridor Detour Disputes", "Medium", "Enforce predefined Corridor Pickup Landmarks (Metro gates, bus stops). Co-riders must walk to host path."],
        ["Highway High-Speed Safety", "High", "Mandate intercity gear verification (helmets/jackets), speed telemetry alerts (>90 km/h), and 24/7 SOS dispatch."]
    ]
    pdf.draw_table(headers_risk, rows_risk, col_widths=[140, 65, 300])
    
    # Section 8
    pdf.draw_heading1("08", "Phased Go-To-Market Roadmap")
    headers_gtm = ["Phase & Focus", "Timeline", "Target Corridors", "Success Target"]
    rows_gtm = [
        ["Phase 1: IT Corridor Pilot", "Weeks 1 - 6", "Outer Ring Road & Electronic City, Blr", "10,000 corporate rides; >=65% match"],
        ["Phase 2: Metro Expansion", "Weeks 7 - 14", "Bengaluru, Hyderabad, Pune, Delhi-NCR", "75,000 weekly pooled rides"],
        ["Phase 3: Highway Launch", "Weeks 15 - 22", "Top 15 Intercity Routes (Blr-Mys, Pune-Mum)", "2,500 weekend highway trips"],
        ["Phase 4: Enterprise Pass", "Weeks 23+", "SEZ Tech Parks (Infosys, Ecospace, Cyber City)", "Direct corporate payroll integration"]
    ]
    pdf.draw_table(headers_gtm, rows_gtm, col_widths=[125, 80, 165, 135])
    
    output_pdf = "/Users/abhigya3750/Downloads/Antigravitiy Workspace /Rapido project/Rapido_Bikepool_BRD.pdf"
    pdf.save(output_pdf)
    return output_pdf

if __name__ == "__main__":
    generate_brd()
