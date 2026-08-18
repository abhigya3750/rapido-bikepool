#!/usr/bin/env python3
"""
Compiles the Streamlined BRD into a clean, concise 2-page PDF.
Focuses strictly on the user problem, commuter loophole, and core product offerings.
"""

import os
from pdf_builder import PDFDoc

def build_brd_pdf(output_path):
    doc = PDFDoc(title="Rapido RidePool — BRD", author="Senior Product Manager")
    
    # -------------------------------------------------------------
    # PAGE 1: HEADER & EXECUTIVE SUMMARY (THE COMMUTER LOOPHOLE)
    # -------------------------------------------------------------
    meta = [
        ("Product", "Rapido RidePool"),
        ("Doc Type", "BRD v2.1"),
        ("Focus", "Commuter P2P Sharing"),
        ("Status", "Product Ready")
    ]
    doc.draw_header_banner(
        doc_type="BUSINESS REQUIREMENTS DOCUMENT",
        main_title="Rapido RidePool: City Commute & Highway",
        subtitle="Formalizing Organic Commuter Bike-Sharing into a Dedicated P2P Feature",
        meta_items=meta
    )
    
    doc.draw_heading1("1", "Executive Summary: The Ground Reality & Commuter Loophole")
    doc.draw_paragraph(
        "Every day across Indian cities (Bengaluru, Hyderabad, Pune, Indore), thousands of two-wheeler owners commute from home to work, college, or marketplaces while spending significant money on daily petrol (Rs 100+/L). To offset this daily cost, an increasing number of everyday bike owners are onboarding onto the Rapido rider app."
    )
    doc.draw_paragraph(
        "However, they are not full-time commercial drivers. When a bike owner travels from Vijay Nagar to Palasia (or Sector R to Scheme 54), they open the rider app solely to find a co-traveler heading in their exact same direction. They reject off-route rides, call passengers asking 'Where are you going?', and share their pillion seat to cover 70% to 100% of their daily petrol cost."
    )
    
    doc.draw_callout_box(
        "The Product Opportunity for Rapido",
        "Instead of forcing casual commuters into a commercial taxi flow (which causes friction, cancellations, and phone calls), Rapido can launch a dedicated Peer-to-Peer RidePool & Highway Sharing feature where any commuter heading somewhere can easily share or host a ride.",
        box_type="warning"
    )
    
    doc.draw_heading1("2", "Problem Statement & User Friction")
    
    table_headers = ["User Type", "Friction on Current App", "Real-World Impact"]
    table_rows = [
        ["Bike Owner (Host)\n(Any daily commuter)", "Algorithm sends 3 km detours; penalized for rejecting off-route commercial rides.", "Frustration, repeated cancellations, calls asking 'Where to go?'."],
        ["Passenger (Co-Rider)\n(Anyone needing a ride)", "Suffers sudden ride cancellations; pays expensive commercial peak surge fares.", "Unpredictable daily commute; paying Rs 160+ for Rs 40 routes."]
    ]
    doc.draw_table(table_headers, table_rows, col_widths=[140, 205, 160])
    
    # -------------------------------------------------------------
    # PAGE 2: THE TWO PRODUCT OFFERINGS & USER PERSONAS
    # -------------------------------------------------------------
    doc.start_new_page()
    
    doc.draw_heading1("3", "The Two Core Product Offerings")
    
    doc.draw_heading2("Offering 1: Share a Ride (Passenger Flow)")
    doc.draw_bullet_point("Auto Distance Routing", "Passenger enters pickup and destination. The system automatically detects whether the route is an Inside City Commute (5-30 km) or Highway Intercity (>30 km).")
    doc.draw_bullet_point("Corridor Match & Trust", "Displays verified hosts already riding along that path with ratings (4.9), vehicle model, and real passenger reviews.")
    doc.draw_bullet_point("Safety Shield & In-Trip HUD", "Mandatory dual ISI helmet confirmation, 4-digit start OTP (7842), and live GPS tracking with active speedometer.")
    
    doc.draw_heading2("Offering 2: Host a Ride (Two-Wheeler Owner Flow)")
    doc.draw_bullet_point("A. Inside City Commute (5 to 30 km)", "Any commuter enters start and destination -> system calculates fair fuel split (e.g. Rs 52.00) -> 5-minute live matching radar -> direct wallet payout.")
    doc.draw_bullet_point("B. City-to-City Highway (>30 km)", "Scheduled >=1 hour in advance (e.g. Indore to Bhopal, 195 km) with a dynamic seat price slider (Rs 260 - Rs 520), luggage limits, and planned refreshment halts.")
    
    doc.draw_heading1("4", "Target User Personas & Scenarios")
    
    persona_headers = ["Persona", "Profile & Route", "Pain Point", "RidePool Outcome"]
    persona_rows = [
        ["Rahul Sharma (28)\nCommuter Host", "Everyday Commuter.\nMahalaxmi Nagar -> Scheme 54 (8.2 km)", "Spends Rs 3,500/mo on fuel. Refuses commercial taxi driving.", "Starts 5-min timer -> picks Ananya at bus stop -> earns Rs 52/day (saves Rs 1,400/mo)."],
        ["Ananya K. (24)\nDaily Passenger", "Daily Commuter.\nVijay Nagar -> Scheme 54 (8 km)", "Daily auto surge is Rs 160+; commercial cabs cancel.", "Books seat on verified bike for Rs 43 -> reaches destination in 12 mins with ISI helmet."],
        ["Vikram Joshi (31)\nHighway Rider", "Traveling Professional.\nIndore -> Bhopal Highway (195 km)", "Bus takes 4.5 hrs; private cabs cost Rs 2,800+.", "Shares seat on Royal Enfield Himalayan for Rs 360 -> splits fuel with fellow traveler."]
    ]
    doc.draw_table(persona_headers, persona_rows, col_widths=[105, 135, 130, 135])
    
    doc.save(output_path)

if __name__ == "__main__":
    out = os.path.join(os.path.dirname(__file__), "Rapido_Bikepool_BRD.pdf")
    build_brd_pdf(out)
