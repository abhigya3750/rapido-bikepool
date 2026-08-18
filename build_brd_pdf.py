#!/usr/bin/env python3
"""
Compiles the Executive Corporate BRD (Business Requirements Document) into a clean, readable PDF.
Follows top-tier corporate strategy document standards (concise, humanized, high-impact).
"""

import os
from pdf_builder import PDFDoc

def build_brd_pdf(output_path):
    doc = PDFDoc(title="Rapido RidePool — Executive BRD", author="Senior Product Manager")
    
    # -------------------------------------------------------------
    # PAGE 1: HEADER & EXECUTIVE SUMMARY (THE COMMUTER LOOPHOLE)
    # -------------------------------------------------------------
    meta = [
        ("Product", "Rapido RidePool"),
        ("Doc Type", "Executive BRD v2.0"),
        ("Target", "Founders & VP Product"),
        ("Status", "Approved Proposal")
    ]
    doc.draw_header_banner(
        doc_type="BUSINESS REQUIREMENTS DOCUMENT",
        main_title="Rapido RidePool: City Commute & Highway",
        subtitle="Formalizing Organic Commuter Bike-Sharing into a Dedicated P2P Platform",
        meta_items=meta
    )
    
    doc.draw_heading1("1", "Executive Summary: The Ground Reality & Organic Loophole")
    doc.draw_paragraph(
        "Every day across major Indian tech hubs (Bengaluru, Hyderabad, Pune, Indore), thousands of two-wheeler owners commute to work alone while spending over Rs 3,500/month on petrol. To offset this daily cost, an increasing number of regular working professionals are onboarding onto the commercial Rapido Captain app."
    )
    doc.draw_paragraph(
        "However, they are not full-time commercial drivers. When a bike owner commutes from Vijay Nagar to Palasia (or Sector R to Scheme 54), they open Rapido solely to cherry-pick a co-rider traveling in their exact corridor. They reject all other rides, call passengers asking 'Where are you going?', and share their pillion seat to cover 70% to 100% of their daily petrol cost."
    )
    
    doc.draw_callout_box(
        "The Market Opportunity for Rapido",
        "Instead of forcing casual commuters into a commercial taxi flow (which distorts supply and causes high cancellations), Rapido can formalize this organic behavior into a dedicated, zero-commission Peer-to-Peer RidePool platform directly inside the consumer app.",
        box_type="warning"
    )
    
    doc.draw_heading1("2", "The Core Problem Statement & Market Friction")
    
    table_headers = ["Stakeholder", "Friction on Current Commercial App", "Business Impact"]
    table_rows = [
        ["Bike Owner (Host)", "Algorithm sends 3 km detours; penalized for rejecting off-route commercial rides.", "Frustration, high cancellations, calls asking 'Where to go?'."],
        ["Passenger (Co-Rider)", "Suffers sudden cancellations; pays high peak-hour commercial taxi/auto surge fares.", "Unpredictable daily transit; paying Rs 160+ for Rs 40 routes."],
        ["Rapido (Platform)", "Supply metric distortion during rush hours; missed peer-to-peer network effects.", "High cancellation rates; missed revenue in daily commuter pooling."]
    ]
    doc.draw_table(table_headers, table_rows, col_widths=[110, 220, 175])
    
    # -------------------------------------------------------------
    # PAGE 2: THE TWO PRODUCT OFFERINGS & USER PERSONAS
    # -------------------------------------------------------------
    doc.start_new_page()
    
    doc.draw_heading1("3", "The Two Core Product Offerings")
    
    doc.draw_heading2("Offering 1: Share a Ride (Unified Passenger Flow)")
    doc.draw_bullet_point("Auto Distance Routing", "Passenger enters origin and destination. The platform automatically detects whether the route is an Inside City Commute (<=30 km) or Highway Intercity (>30 km).")
    doc.draw_bullet_point("Corridor Match & Trust", "Displays verified hosts already riding along that path with ratings, corporate company badges (Infosys, TCS), and real passenger feedback.")
    doc.draw_bullet_point("Safety Shield & In-Trip HUD", "Mandatory dual ISI helmet confirmation, 4-digit start OTP (7842), and live GPS telemetry with active speedometer.")
    
    doc.draw_heading2("Offering 2: Host a Ride (Two-Wheeler Owner Flow)")
    doc.draw_bullet_point("A. Inside City Commute (5 to 30 km)", "Host enters start and office destination -> system calculates fair fuel split (e.g. Rs 52.00) -> 5-minute live matching radar -> direct zero-commission wallet payout.")
    doc.draw_bullet_point("B. City-to-City Highway (>30 km)", "Scheduled >=1 hour in advance (e.g. Indore to Bhopal, 195 km) with a dynamic seat price slider (Rs 260 - Rs 520), luggage limits, and planned refreshment halts.")
    
    doc.draw_heading1("4", "Target User Personas & Real-World Scenarios")
    
    persona_headers = ["Persona", "Profile & Route", "Pain Point", "RidePool Outcome"]
    persona_rows = [
        ["Rahul Sharma (28)\nCommuter Host", "Software Engineer at Infosys.\nMahalaxmi Nagar -> Scheme 54 (8.2 km)", "Spends Rs 3,500/mo on fuel. Refuses commercial taxi driving.", "Starts 5-min timer -> picks Ananya at bus stop -> earns Rs 52/day (saves Rs 1,400/mo)."],
        ["Ananya K. (24)\nDaily Passenger", "IT Analyst at TCS.\nVijay Nagar -> Scheme 54 (8 km)", "Daily auto surge is Rs 160+; commercial cabs cancel.", "Books seat on verified bike for Rs 43 -> reaches office in 12 mins with ISI helmet."],
        ["Vikram Joshi (31)\nHighway Rider", "Regional Sales Manager.\nIndore -> Bhopal Highway (195 km)", "Bus takes 4.5 hrs; private cabs cost Rs 2,800+.", "Shares seat on Royal Enfield Himalayan for Rs 360 -> splits fuel with verified peer."]
    ]
    doc.draw_table(persona_headers, persona_rows, col_widths=[95, 135, 135, 140])
    
    # -------------------------------------------------------------
    # PAGE 3: PLATFORM ECONOMICS, GOVERNANCE & BUSINESS KPIS
    # -------------------------------------------------------------
    doc.start_new_page()
    
    doc.draw_heading1("5", "Platform Economics & Non-Commercial Cost Recovery")
    doc.draw_paragraph(
        "To ensure compliance with Indian Motor Vehicle guidelines and maintain a pure peer-to-peer cost-sharing model, Rapido RidePool operates on transparent cost recovery:"
    )
    
    doc.draw_callout_box(
        "Pricing & Unit Economics Formula",
        "Passenger Total Fare = Base Fuel Share [Rs 15 + (Distance x Rs 3.40/km)] + Platform Safety Fee (Rs 5.00)\n"
        "* Zero Surge Policy: 100% immune to peak-hour or weather price surging.\n"
        "* 100% Host Retention: Host receives the entire fuel cost share without commercial commission deductions.",
        box_type="info"
    )
    
    doc.draw_heading1("6", "Strategic Business KPIs for Rapido Leadership")
    
    kpi_headers = ["Metric", "Baseline (Commercial)", "RidePool Target (6-Month)", "Strategic Value"]
    kpi_rows = [
        ["Daily Commute Trips", "~15k (organic misuse)", "150,000+ daily pooled trips", "Monetizes high-density tech park corridors."],
        ["Personal Supply Onboarded", "0 (reluctant to do taxi)", "50,000+ verified bike owners", "Massive fleet expansion with zero acquisition cost."],
        ["Corridor Cancellation Rate", "18% on commercial cabs", "< 3% on P2P commute pool", "High predictability and user trust."],
        ["Carbon Footprint Offset", "N/A", "450+ metric tons CO2 / month", "Promotes sustainable green urban mobility."]
    ]
    doc.draw_table(kpi_headers, kpi_rows, col_widths=[110, 115, 140, 140])
    
    doc.draw_callout_box(
        "Executive Recommendation",
        "Launch Rapido RidePool as a hero tab in top tech corridors (Indore AB Road, Bengaluru ORR, Hyderabad HITEC City). Pair with the live interactive prototype to validate pilot launch.",
        box_type="success"
    )
    
    doc.save(output_path)

if __name__ == "__main__":
    out = os.path.join(os.path.dirname(__file__), "Rapido_Bikepool_BRD.pdf")
    build_brd_pdf(out)
