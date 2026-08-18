#!/usr/bin/env python3
"""
Compiles the Streamlined PRD into a clean, concise 2-page PDF.
Focuses on the end-to-end user flows, complete host lifecycle, and acceptance criteria.
"""

import os
from pdf_builder import PDFDoc

def build_prd_pdf(output_path):
    doc = PDFDoc(title="Rapido RidePool — PRD", author="Senior Product Manager")
    
    # -------------------------------------------------------------
    # PAGE 1: HEADER & SYSTEM ARCHITECTURE
    # -------------------------------------------------------------
    meta = [
        ("Product", "Rapido RidePool"),
        ("Doc Type", "PRD v2.1"),
        ("Focus", "P2P Flow & Specs"),
        ("Status", "Production Spec")
    ]
    doc.draw_header_banner(
        doc_type="PRODUCT REQUIREMENTS DOCUMENT",
        main_title="Rapido RidePool: City Commute & Highway",
        subtitle="End-to-End Product Specifications, Flow State Machines & Wireframe Rules",
        meta_items=meta
    )
    
    doc.draw_heading1("1", "Product Scope & Core Value Proposition")
    doc.draw_paragraph(
        "Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform for daily city commuters (5-30 km) and highway intercity travelers (>30 km)."
    )
    doc.draw_paragraph(
        "Any person with a two-wheeler heading somewhere can host a ride to offset petrol expenses, and any passenger heading the same way can share the ride."
    )
    
    doc.draw_heading1("2", "Unified Passenger Flow: 'Share a Ride'")
    doc.draw_bullet_point("Step 1 (Route Entry & Auto-Detection)", "User enters pickup and destination. Routes <=30 km automatically activate Inside City Commute mode; routes >30 km activate Highway Intercity mode.")
    doc.draw_bullet_point("Step 2 (Pickup Landmark Pin)", "Interactive map centers on green 'Pickup Point' bubble marker pointing to the nearest direct arterial road bus stop (120m walk).")
    doc.draw_bullet_point("Step 3 (Matching Hosts Discovery)", "Displays co-riders on route with vehicle model, star rating (4.9), trust badges, and real written reviews.")
    doc.draw_bullet_point("Step 4 (Rapido Safety Shield)", "Mandatory dual ISI helmet confirmation and identity check before booking.")
    doc.draw_bullet_point("Step 5 (Active Trip HUD & Speedometer)", "4-digit start OTP (7842) -> live moving bike marker -> dynamic speedometer (38-44 km/h) -> bilateral 5-star rating.")
    
    # -------------------------------------------------------------
    # PAGE 2: COMPLETE 5-STEP HOST LIFECYCLE & ACCEPTANCE CRITERIA
    # -------------------------------------------------------------
    doc.start_new_page()
    
    doc.draw_heading1("3", "Complete 5-Step Host Lifecycle (Inside City: 5–30 km)")
    
    host_headers = ["Lifecycle Step", "System Action & UI Screen", "User Experience Outcome"]
    host_rows = [
        ["1. Route Setup & Range Check", "Host enters origin & destination. System validates 5 to 30 km range.", "Calculates exact fuel split compensation (Rs 52.00) and displays fuel offset badge."],
        ["2. 5-Min Hosting Radar", "Host taps 'Start 5-Min Hosting Timer'. Radial countdown radar activates on map.", "Broadcasts route to nearby commuters. Match alert arrives at 3s ('Ananya K. at Bus Stop')."],
        ["3. Host Pickup Navigation", "Host taps 'Accept & Pick Up'. Map routes host directly to passenger's bus stop.", "Displays ETA (~2 mins), landmark info, and masked in-app chat/call tools."],
        ["4. Start OTP Verification", "Host arrives at spot -> enters 4-digit code shown on passenger's app (7842).", "PIN verification ensures correct rider boarding before ride start."],
        ["5. Host In-Trip & Settlement", "Active HUD displays speed (42 km/h), distance (7.8 km), and passenger on pillion.", "Host taps 'Reached Destination' -> Rs 52.00 credited to wallet -> rates passenger."]
    ]
    doc.draw_table(host_headers, host_rows, col_widths=[120, 205, 180])
    
    doc.draw_heading1("4", "Host Flow B: City-to-City Highway (>30 km)")
    doc.draw_bullet_point("Advance Scheduling", "Intercity trips are scheduled >= 1 hour in advance (e.g. Indore to Bhopal, 195 km).")
    doc.draw_bullet_point("Dynamic Price Slider", "Host sets seat price bounded by fair fuel guardrails (Min Rs 260, Suggested Rs 360, Max Rs 520).")
    doc.draw_bullet_point("Gear & Halt Checklist", "Host declares spare ISI helmet, luggage allowance (< 7 kg standard backpack), and planned highway refreshment halts.")
    
    doc.draw_heading1("5", "Engineering Acceptance Criteria")
    
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
