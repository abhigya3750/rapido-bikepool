#!/usr/bin/env python3
"""
Compiles the Executive Corporate PRD (Product Requirements Document) into a clean, readable PDF.
Follows modern corporate PRD standards (Uber/Rapido/Airbnb style: concise, wireframe-backed, high-density).
"""

import os
from pdf_builder import PDFDoc

def build_prd_pdf(output_path):
    doc = PDFDoc(title="Rapido RidePool — Executive PRD", author="Senior Product Manager")
    
    # -------------------------------------------------------------
    # PAGE 1: HEADER & SYSTEM ARCHITECTURE
    # -------------------------------------------------------------
    meta = [
        ("Product", "Rapido RidePool"),
        ("Doc Type", "Executive PRD v2.0"),
        ("Target", "Eng Leads & Designers"),
        ("Version", "2.0 (Production Ready)")
    ]
    doc.draw_header_banner(
        doc_type="PRODUCT REQUIREMENTS DOCUMENT",
        main_title="Rapido RidePool: City Commute & Highway",
        subtitle="End-to-End Product Specifications, Flow State Machines & Technical Rules",
        meta_items=meta
    )
    
    doc.draw_heading1("1", "Product Objectives & Strategic Scope")
    doc.draw_paragraph(
        "Rapido RidePool introduces a formal peer-to-peer two-wheeler sharing ecosystem inside the primary consumer app. It serves daily urban commuters (5-30 km) and highway intercity travelers (>30 km) through automated matching and transparent cost recovery."
    )
    
    doc.draw_callout_box(
        "Core Value Proposition",
        "* For Hosts: Offset 70% to 100% of daily fuel costs without commercial driving obligations.\n"
        "* For Passengers: 50% cheaper corridor transit with verified peers and zero surge pricing.\n"
        "* For Rapido: Massive new supply network with zero driver acquisition costs.",
        box_type="info"
    )
    
    doc.draw_heading1("2", "Unified Passenger Flow: 'Share a Ride'")
    doc.draw_paragraph(
        "The passenger flow is unified into a single intelligent entry point that automatically detects route distance:"
    )
    doc.draw_bullet_point("Step 1 (Route Entry & Auto-Detection)", "User enters pickup and drop points. Routes <=30 km automatically activate Inside City Commute mode; routes >30 km activate Highway Intercity mode.")
    doc.draw_bullet_point("Step 2 (Pickup Landmark Pin)", "Interactive map centers on green 'Pickup Point' bubble marker pointing to the nearest direct arterial road bus stop (120m walk).")
    doc.draw_bullet_point("Step 3 (Matching Hosts Discovery)", "Displays co-riders on route with vehicle model, star rating (4.9), corporate badge (Infosys, TCS), and real written reviews.")
    doc.draw_bullet_point("Step 4 (Rapido Safety Shield)", "Mandatory dual ISI helmet confirmation and corporate verification check before booking.")
    doc.draw_bullet_point("Step 5 (Active Trip HUD & Speedometer)", "4-digit start OTP (7842) -> live moving bike marker -> dynamic speedometer (38-44 km/h) -> bilateral 5-star rating.")
    
    # -------------------------------------------------------------
    # PAGE 2: COMPLETE 5-STEP HOST LIFECYCLE (CITY COMMUTE)
    # -------------------------------------------------------------
    doc.start_new_page()
    
    doc.draw_heading1("3", "Complete 5-Step Host Lifecycle (Inside City: 5–30 km)")
    doc.draw_paragraph(
        "The Host experience eliminates commercial taxi friction and automates the entire daily commute sharing lifecycle:"
    )
    
    host_headers = ["Lifecycle Step", "System Action & UI Screen", "User Experience Outcome"]
    host_rows = [
        ["1. Route Setup & Range Check", "Host enters origin & office destination. System validates 5 to 30 km range.", "Calculates exact fuel split earnings (Rs 52.00) and displays fuel offset badge."],
        ["2. 5-Min Hosting Radar", "Host taps 'Start 5-Min Hosting Timer'. Radial countdown radar activates on map.", "Broadcasts route to nearby commuters. Match alert arrives at 3s ('Ananya K. at Bus Stop')."],
        ["3. Host Pickup Navigation", "Host taps 'Accept & Pick Up'. Map routes host directly to passenger's bus stop.", "Displays ETA (~2 mins), landmark info, and masked in-app chat/call tools."],
        ["4. Start OTP Verification", "Host arrives at spot -> enters 4-digit code shown on passenger's app (7842).", "PIN verification ensures correct rider boarding before ride start."],
        ["5. Host In-Trip & Settlement", "Active HUD displays speed (42 km/h), distance (7.8 km), and passenger on pillion.", "Host taps 'Reached Destination' -> Rs 52.00 credited to wallet with 0% take-rate -> rates passenger."]
    ]
    doc.draw_table(host_headers, host_rows, col_widths=[120, 205, 180])
    
    doc.draw_heading1("4", "Host Flow B: City-to-City Highway (>30 km)")
    doc.draw_bullet_point("Advance Scheduling", "Intercity trips are scheduled >= 1 hour in advance (e.g. Indore to Bhopal, 195 km).")
    doc.draw_bullet_point("Dynamic Price Slider", "Host sets seat price bounded by fair fuel guardrails (Min Rs 260, Suggested Rs 360, Max Rs 520).")
    doc.draw_bullet_point("Gear & Halt Checklist", "Host declares spare ISI helmet, luggage allowance (< 7 kg standard backpack), and planned highway refreshment halts.")
    doc.draw_bullet_point("Active Highway Dashboard", "Live listing feed shows co-traveler requests (e.g. Vikram Joshi, Wipro) -> Host accepts -> confirmed travel voucher.")
    
    # -------------------------------------------------------------
    # PAGE 3: TECHNICAL FORMULAS, SAFETY & ACCEPTANCE CRITERIA
    # -------------------------------------------------------------
    doc.start_new_page()
    
    doc.draw_heading1("5", "Technical Pricing Logic & Distance Guardrails")
    
    doc.draw_callout_box(
        "Automated Pricing Formulas",
        "* Inside City Host Payout = Round(15 + [Distance in km x Rs 4.50]) -> 100% credited to host wallet.\n"
        "* Passenger Total Fare = Round(15 + [Distance in km x Rs 3.40]) + Rs 5.00 Platform & Insurance Fee.\n"
        "* Distance Rules: Minimum 5.0 km (prevents walk cannibalization); Maximum 30.0 km for City Pool.\n"
        "* Zero Surge Policy: 100% immune to peak-hour, traffic, or weather surge pricing.",
        box_type="info"
    )
    
    doc.draw_heading1("6", "Safety, Trust & Compliance Engine")
    doc.draw_bullet_point("Dual ISI Helmet Check", "Pre-ride modal requires host and passenger to confirm sanitized ISI helmet availability.")
    doc.draw_bullet_point("Corporate Verification", "Email verification (@company.com) + DigiLocker Govt ID badge displayed on profiles.")
    doc.draw_bullet_point("Telemetry & SOS", "Live speed monitoring (38-44 km/h) and one-tap emergency SOS connected to Rapido response.")
    
    doc.draw_heading1("7", "Engineering Acceptance Criteria")
    
    ac_headers = ["Module", "Acceptance Criteria", "Status"]
    ac_rows = [
        ["Unified Distance Engine", "Auto-switches to City Pool (<=30km) or Highway (>30km) upon destination change.", "Verified & Live"],
        ["5-Min Host Radar", "Accurate countdown timer with zero-penalty cancellation if no match occurs.", "Verified & Live"],
        ["OTP Handshake", "Trip start locked until host enters matching 4-digit passenger OTP (7842).", "Verified & Live"],
        ["Responsive Layout", "Auto-scales to 100% full-screen (100dvh) on mobile and centers on web browsers.", "Verified & Live"]
    ]
    doc.draw_table(ac_headers, ac_rows, col_widths=[125, 275, 105])
    
    doc.save(output_path)

if __name__ == "__main__":
    out = os.path.join(os.path.dirname(__file__), "Rapido_Bikepool_PRD.pdf")
    build_prd_pdf(out)
