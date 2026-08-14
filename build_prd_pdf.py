#!/usr/bin/env python3
import os
import sys
from pdf_builder import PDFDoc

def generate_prd():
    pdf = PDFDoc(title="Rapido Bikepool & Highway PRD", author="Senior Product Manager")
    
    # 1. Header Banner
    meta = [
        ("Doc Version", "v1.0 (Ready)"),
        ("Product Line", "Rapido Commute & Highway"),
        ("Lead PM", "Senior PM (Mobility)"),
        ("Target Release", "Q4 2026")
    ]
    pdf.draw_header_banner(
        doc_type="Product Requirements Document (PRD)",
        main_title="Rapido Bikepool & Highway Product Specs",
        subtitle="Feature Specifications, User Stories, System Logic & Acceptance Criteria",
        meta_items=meta
    )
    
    # Section 1
    pdf.draw_heading1("01", "Product Overview & Context")
    pdf.draw_paragraph(
        "This Product Requirements Document (PRD) defines the end-to-end specifications for Rapido's peer-to-peer Bikepooling ecosystem. It enables private two-wheeler owners to monetize empty pillion seats during daily office commutes and intercity trips with zero detours, while giving budget commuters verified, route-matched rides at 50% lower fares than traditional cabs and autos."
    )
    
    pdf.draw_callout_box(
        "Product Vision Statement",
        "Build India's largest non-commercial peer-to-peer two-wheeler commute and highway network that unlocks organic commuter supply, eliminates driver subsidies, and delivers deterministic corridor transit.",
        box_type="info"
    )
    
    # Section 2
    pdf.draw_heading1("02", "Product Goals, Non-Goals & Success Metrics")
    pdf.draw_heading2("Core Product Goals")
    pdf.draw_bullet_point("Frictionless Host Setup", "Enable any private bike owner to list a commute in under 30 seconds.")
    pdf.draw_bullet_point("Deterministic Corridor Matching", "Achieve >=70% match rate along transit corridors with <=400m detour.")
    pdf.draw_bullet_point("Safety & Verification Shield", "Ensure >=85% of rides occur between corporate-verified or Govt-ID verified peers.")
    
    pdf.draw_heading2("Explicit Non-Goals (Out of Scope Phase 1)")
    pdf.draw_bullet_point("Door-to-Door Detours", "App will not force hosts into narrow alleys. Passengers walk to Corridor Pickup Landmarks.")
    pdf.draw_bullet_point("Forced Dispatch", "No algorithmic forced ride assignment. All matches are 100% voluntary.")
    
    headers_kpi = ["Success Metric", "Target SLA / Goal", "Business Impact"]
    rows_kpi = [
        ["North Star Metric", "Weekly Pooled Commute KM Shared", "Direct indicator of network liquidity & GMV"],
        ["Corridor Match Rate", ">= 70% of total searches", "High conversion & low search abandonment"],
        ["Zero-Detour Adherence", "<= 350 meters avg. walking distance", "Protects host commute speed & convenience"],
        ["Host Retention", ">= 55% hosts posting >=3 rides/week", "Organic, self-sustaining supply base"],
        ["Cancellation Rate", "<= 4.5% within 15 min of departure", "Ensures high rider reliability during rush hour"]
    ]
    pdf.draw_table(headers_kpi, rows_kpi, col_widths=[140, 160, 205])
    
    # Section 3
    pdf.draw_heading1("03", "Epic 1: Intra-City Commute Ride Hosting (5-30 km)")
    pdf.draw_paragraph(
        "Enables daily bike owners to list their office commute with a 5-minute countdown and automatic non-surge pricing."
    )
    pdf.draw_bullet_point("US 1.1 Distance Validation", "Requires 5.0 km to 30.0 km route. Rejects micro-hops (<5km) and routes >30km to Highway mode.")
    pdf.draw_bullet_point("US 1.2 Automated Pricing", "Platform locks fare: Base Rs 15 + (Dist x Rs 4.5/km). Non-negotiable cost-recovery math.")
    pdf.draw_bullet_point("US 1.3 5-Min Live Countdown", "Host activates 5:00 min timer. Co-riders book instantly. If no match at 00:00, host proceeds solo.")
    pdf.draw_bullet_point("US 1.4 Corridor Landmarks", "Snaps pickup to major transit hubs (Metro gates, bus stops). Enforces zero detour.")
    
    # Section 4
    pdf.draw_heading1("04", "Epic 2: Inter-City Highway Ride Hosting (City-to-City)")
    pdf.draw_paragraph(
        "Enables riders traveling between cities (30-350 km) to schedule trips in advance and split highway costs."
    )
    pdf.draw_bullet_point("US 2.1 Advance Scheduling", "Mandatory booking lead time of >= 1 hour prior to departure (can be scheduled up to 7 days ahead).")
    pdf.draw_bullet_point("US 2.2 Guardrailed Price Slider", "Host sets per-seat price within platform-bounded range (Rs 2.00 - Rs 3.80 per km).")
    pdf.draw_bullet_point("US 2.3 Gear & Luggage Checklist", "Explicit declaration: Extra ISI helmet provided, max 1 backpack (<7kg), and planned rest halts.")
    pdf.draw_bullet_point("US 2.4 Profile Review Mode", "Host can review co-traveler's verified company badge and rating before confirming request.")
    
    # Section 5
    pdf.draw_heading1("05", "Epic 3: Passenger Corridor Discovery & Matching Engine")
    pdf.draw_bullet_point("US 3.1 Polyline Match Query", "Searches active & scheduled host polylines passing within <=400m of pickup and <=500m of drop.")
    pdf.draw_bullet_point("US 3.2 Host Comparison Card", "Displays host photo, company badge (e.g. Infosys), rating (4.9/5), bike model, walking dist & price.")
    pdf.draw_bullet_point("US 3.3 OTP Start & Cashless Payout", "4-digit OTP activates live GPS telemetry. Trip completion automatically credits host UPI/wallet.")
    
    # Section 6
    pdf.draw_heading1("06", "Trust, Safety & Regulatory Architecture")
    pdf.draw_callout_box(
        "Compliance & Safety Moat",
        "1. White-Plate Compliance: Strict max 2 rides/day per host.\n2. Dual Verification: Corporate email (@company.com) + DigiLocker KYC.\n3. Pink Pool: Women-only matching option.\n4. Dual Helmet: Mandatory pre-trip ISI helmet check.\n5. Live SOS & Telemetry: Automatic anomaly detection if route deviates >1 km.",
        box_type="success"
    )
    
    # Section 7
    pdf.draw_heading1("07", "Cancellation & SLA Penalty Matrix")
    headers_cancel = ["Trigger Scenario", "Cancelled By", "Time Window", "Action / Penalty"]
    rows_cancel = [
        ["Advance Cancellation", "Host", "> 30 min before departure", "Zero penalty; Passenger auto-rematched."],
        ["Late Host Cancellation", "Host", "< 15 min before departure", "Rs 50 fee deducted from next payout + 24h freeze."],
        ["Passenger No-Show", "Passenger", "> 5 min past meeting time", "Rs 30 compensation transferred to Host."],
        ["Expired 5-Min Timer", "System", "Timer reaches 00:00 without match", "Zero penalty; Host proceeds safely on solo ride."]
    ]
    pdf.draw_table(headers_cancel, rows_cancel, col_widths=[125, 75, 125, 180])
    
    # Section 8
    pdf.draw_heading1("08", "Telemetry & Event Tracking Taxonomy")
    headers_event = ["Event Name", "Trigger Action", "Key Payload Properties"]
    rows_event = [
        ["bikepool_host_publish", "Host lists commute ride", "service_type, distance_km, is_5min_timer, origin, destination"],
        ["bikepool_corridor_search", "Passenger searches route", "pickup_lat_lng, drop_lat_lng, matches_found_count"],
        ["bikepool_card_selected", "Passenger taps host card", "host_user_id, host_rating, corporate_verified, fare_delta"],
        ["bikepool_ride_started", "Host inputs 4-digit OTP", "booking_id, host_id, passenger_id, start_time_delay"],
        ["bikepool_ride_settled", "Host taps complete trip", "distance_actual, gmv_amount, host_payout, rating_submitted"]
    ]
    pdf.draw_table(headers_event, rows_event, col_widths=[140, 135, 230])
    
    output_pdf = "/Users/abhigya3750/Downloads/Antigravitiy Workspace /Rapido project/Rapido_Bikepool_PRD.pdf"
    pdf.save(output_pdf)
    return output_pdf

if __name__ == "__main__":
    generate_prd()
