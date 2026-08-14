#!/usr/bin/env python3
"""
Lightweight, zero-dependency PDF generator for Executive BRD & PRD documents.
Converts structured document sections into standard PDF 1.4.
"""

import sys
import zlib
import re

class PDFDoc:
    def __init__(self, title="Document", author="Senior Product Manager"):
        self.title = title
        self.author = author
        self.pages = []
        self.objects = []
        self.width = 595.28  # A4 width in points
        self.height = 841.89 # A4 height in points
        self.margin_x = 45.0
        self.margin_top = 45.0
        self.margin_bottom = 45.0
        self.content_w = self.width - 2 * self.margin_x
        
        # State
        self.current_page_stream = []
        self.cursor_y = self.height - self.margin_top
        self.page_num = 1
        
    def start_new_page(self):
        if self.current_page_stream:
            # Add footer to current page before finalizing
            self._draw_footer(self.page_num)
            self.pages.append("".join(self.current_page_stream))
            self.current_page_stream = []
            self.page_num += 1
        self.cursor_y = self.height - self.margin_top
        
    def _draw_footer(self, page_num):
        # Draw thin footer line and page number
        stream = []
        stream.append("0.85 0.88 0.92 RG 0.75 w\n")
        stream.append(f"{self.margin_x} {self.margin_bottom - 10} m {self.width - self.margin_x} {self.margin_bottom - 10} l S\n")
        stream.append("0.55 0.60 0.68 rg\n")
        stream.append("BT\n/F1 8 Tf\n")
        stream.append(f"{self.margin_x} {self.margin_bottom - 22} Td (Rapido Confidential | {self._escape(self.title)}) Tj\n")
        stream.append("ET\n")
        stream.append("BT\n/F1 8 Tf\n")
        stream.append(f"{self.width - self.margin_x - 45} {self.margin_bottom - 22} Td (Page {page_num}) Tj\n")
        stream.append("ET\n")
        self.current_page_stream.append("".join(stream))

    def _check_page_break(self, required_height):
        if self.cursor_y - required_height < self.margin_bottom:
            self.start_new_page()

    def _escape(self, text):
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    def draw_header_banner(self, doc_type, main_title, subtitle, meta_items):
        self._check_page_break(110)
        stream = []
        
        # Brand top bar
        stream.append("1.0 0.87 0.0 rg\n") # Rapido Yellow #FFDF00
        stream.append(f"{self.margin_x} {self.cursor_y - 4} {self.content_w} 4 re f\n")
        self.cursor_y -= 14
        
        # Document Type Badge
        badge_text = doc_type.upper()
        stream.append("0.06 0.09 0.16 rg\n") # Dark Slate #0F172A
        stream.append(f"{self.margin_x} {self.cursor_y - 14} 160 14 re f\n")
        stream.append("1.0 0.87 0.0 rg\n") # Yellow text
        stream.append("BT\n/F2 8 Tf\n")
        stream.append(f"{self.margin_x + 8} {self.cursor_y - 10} Td ({self._escape(badge_text)}) Tj\n")
        stream.append("ET\n")
        self.cursor_y -= 22
        
        # Main Title
        stream.append("0.06 0.09 0.16 rg\n")
        stream.append("BT\n/F2 18 Tf\n")
        stream.append(f"{self.margin_x} {self.cursor_y - 14} Td ({self._escape(main_title)}) Tj\n")
        stream.append("ET\n")
        self.cursor_y -= 22
        
        # Subtitle
        stream.append("0.35 0.42 0.52 rg\n")
        stream.append("BT\n/F1 10.5 Tf\n")
        stream.append(f"{self.margin_x} {self.cursor_y - 10} Td ({self._escape(subtitle)}) Tj\n")
        stream.append("ET\n")
        self.cursor_y -= 18
        
        # Meta Box
        stream.append("0.97 0.98 0.99 rg 0.88 0.91 0.94 RG 0.8 w\n")
        stream.append(f"{self.margin_x} {self.cursor_y - 26} {self.content_w} 26 re B\n")
        
        col_w = self.content_w / len(meta_items)
        for i, (lbl, val) in enumerate(meta_items):
            bx = self.margin_x + (i * col_w) + 8
            stream.append("0.55 0.62 0.72 rg\n")
            stream.append("BT\n/F2 7 Tf\n")
            stream.append(f"{bx} {self.cursor_y - 10} Td ({self._escape(lbl.upper())}) Tj\n")
            stream.append("ET\n")
            
            stream.append("0.06 0.09 0.16 rg\n")
            stream.append("BT\n/F2 8.5 Tf\n")
            stream.append(f"{bx} {self.cursor_y - 20} Td ({self._escape(val)}) Tj\n")
            stream.append("ET\n")
            
        self.cursor_y -= 36
        self.current_page_stream.append("".join(stream))

    def draw_heading1(self, num_str, title_str):
        self._check_page_break(42)
        stream = []
        self.cursor_y -= 10
        
        # Number pill
        stream.append("1.0 0.87 0.0 rg\n") # Yellow pill
        stream.append(f"{self.margin_x} {self.cursor_y - 14} 24 15 re f\n")
        stream.append("0.0 0.0 0.0 rg\n")
        stream.append("BT\n/F2 9.5 Tf\n")
        stream.append(f"{self.margin_x + 5} {self.cursor_y - 10} Td ({self._escape(num_str)}) Tj\n")
        stream.append("ET\n")
        
        # Title text
        stream.append("0.06 0.09 0.16 rg\n")
        stream.append("BT\n/F2 13 Tf\n")
        stream.append(f"{self.margin_x + 32} {self.cursor_y - 10} Td ({self._escape(title_str)}) Tj\n")
        stream.append("ET\n")
        
        # Underline
        stream.append("0.88 0.91 0.94 RG 1.0 w\n")
        stream.append(f"{self.margin_x} {self.cursor_y - 18} m {self.margin_x + self.content_w} {self.cursor_y - 18} l S\n")
        
        self.cursor_y -= 26
        self.current_page_stream.append("".join(stream))

    def draw_heading2(self, title_str):
        self._check_page_break(28)
        stream = []
        self.cursor_y -= 6
        stream.append("0.12 0.16 0.24 rg\n")
        stream.append("BT\n/F2 11 Tf\n")
        stream.append(f"{self.margin_x} {self.cursor_y - 9} Td ({self._escape(title_str)}) Tj\n")
        stream.append("ET\n")
        self.cursor_y -= 16
        self.current_page_stream.append("".join(stream))

    def draw_paragraph(self, text, font_size=9.5, color=(0.15, 0.20, 0.28)):
        words = text.split()
        lines = []
        cur_line = []
        max_chars_per_line = int(self.content_w / (font_size * 0.52))
        
        for w in words:
            if len(" ".join(cur_line + [w])) <= max_chars_per_line:
                cur_line.append(w)
            else:
                lines.append(" ".join(cur_line))
                cur_line = [w]
        if cur_line:
            lines.append(" ".join(cur_line))
            
        line_h = font_size * 1.35
        total_h = len(lines) * line_h + 6
        self._check_page_break(total_h)
        
        stream = [f"{color[0]} {color[1]} {color[2]} rg\n"]
        for line in lines:
            stream.append("BT\n")
            stream.append(f"/F1 {font_size} Tf\n")
            stream.append(f"{self.margin_x} {self.cursor_y - font_size} Td ({self._escape(line)}) Tj\n")
            stream.append("ET\n")
            self.cursor_y -= line_h
            
        self.cursor_y -= 4
        self.current_page_stream.append("".join(stream))

    def draw_bullet_point(self, title, text, font_size=9.0):
        combined = f"{title}: {text}" if title else text
        words = combined.split()
        lines = []
        cur_line = []
        max_chars = int((self.content_w - 18) / (font_size * 0.52))
        
        for w in words:
            if len(" ".join(cur_line + [w])) <= max_chars:
                cur_line.append(w)
            else:
                lines.append(" ".join(cur_line))
                cur_line = [w]
        if cur_line:
            lines.append(" ".join(cur_line))
            
        line_h = font_size * 1.35
        total_h = len(lines) * line_h + 3
        self._check_page_break(total_h)
        
        stream = []
        # Bullet dot
        stream.append("1.0 0.77 0.0 rg\n") # Rapido amber
        stream.append(f"{self.margin_x + 4} {self.cursor_y - font_size + 2} 4 4 re f\n")
        
        for i, line in enumerate(lines):
            stream.append("0.18 0.23 0.32 rg\n")
            stream.append("BT\n")
            if i == 0 and title:
                stream.append(f"/F2 {font_size} Tf\n")
            else:
                stream.append(f"/F1 {font_size} Tf\n")
            stream.append(f"{self.margin_x + 14} {self.cursor_y - font_size} Td ({self._escape(line)}) Tj\n")
            stream.append("ET\n")
            self.cursor_y -= line_h
            
        self.cursor_y -= 2
        self.current_page_stream.append("".join(stream))

    def draw_callout_box(self, title, text, box_type="warning"):
        colors = {
            "warning": {"bg": (1.0, 0.98, 0.92), "border": (0.96, 0.62, 0.07), "title": (0.57, 0.25, 0.05)},
            "info":    {"bg": (0.94, 0.96, 1.0),  "border": (0.23, 0.51, 0.96), "title": (0.12, 0.25, 0.69)},
            "success": {"bg": (0.94, 0.99, 0.96), "border": (0.13, 0.77, 0.37), "title": (0.09, 0.40, 0.20)},
        }.get(box_type, {"bg": (0.95, 0.95, 0.95), "border": (0.5, 0.5, 0.5), "title": (0.2, 0.2, 0.2)})
        
        words = text.split()
        lines = []
        cur_line = []
        max_chars = int((self.content_w - 24) / (8.5 * 0.52))
        for w in words:
            if len(" ".join(cur_line + [w])) <= max_chars:
                cur_line.append(w)
            else:
                lines.append(" ".join(cur_line))
                cur_line = [w]
        if cur_line:
            lines.append(" ".join(cur_line))
            
        box_h = 24 + len(lines) * 11.5 + 8
        self._check_page_break(box_h + 8)
        
        stream = []
        # Box background
        bg = colors["bg"]
        stream.append(f"{bg[0]} {bg[1]} {bg[2]} rg\n")
        stream.append(f"{self.margin_x} {self.cursor_y - box_h} {self.content_w} {box_h} re f\n")
        
        # Left border line
        bd = colors["border"]
        stream.append(f"{bd[0]} {bd[1]} {bd[2]} rg\n")
        stream.append(f"{self.margin_x} {self.cursor_y - box_h} 4 {box_h} re f\n")
        
        # Title
        tt = colors["title"]
        stream.append(f"{tt[0]} {tt[1]} {tt[2]} rg\n")
        stream.append("BT\n/F2 9.5 Tf\n")
        stream.append(f"{self.margin_x + 12} {self.cursor_y - 14} Td ({self._escape(title)}) Tj\n")
        stream.append("ET\n")
        
        # Text lines
        stream.append("0.20 0.26 0.35 rg\n")
        curr_y = self.cursor_y - 25
        for line in lines:
            stream.append("BT\n/F1 8.5 Tf\n")
            stream.append(f"{self.margin_x + 12} {curr_y} Td ({self._escape(line)}) Tj\n")
            stream.append("ET\n")
            curr_y -= 11.5
            
        self.cursor_y -= (box_h + 8)
        self.current_page_stream.append("".join(stream))

    def draw_table(self, headers, rows, col_widths=None):
        num_cols = len(headers)
        if not col_widths:
            col_widths = [self.content_w / num_cols] * num_cols
            
        # Calculate row heights
        row_heights = []
        parsed_rows = []
        
        for row in rows:
            max_lines = 1
            cell_lines_list = []
            for idx, cell in enumerate(row):
                w = col_widths[idx]
                max_c = max(10, int((w - 10) / (8.0 * 0.50)))
                words = str(cell).split()
                lines = []
                cur = []
                for wd in words:
                    if len(" ".join(cur + [wd])) <= max_c:
                        cur.append(wd)
                    else:
                        lines.append(" ".join(cur))
                        cur = [wd]
                if cur:
                    lines.append(" ".join(cur))
                cell_lines_list.append(lines if lines else [""])
                max_lines = max(max_lines, len(lines))
            parsed_rows.append(cell_lines_list)
            row_heights.append(max(18, max_lines * 10.5 + 8))
            
        total_table_h = 22 + sum(row_heights) + 10
        self._check_page_break(min(total_table_h, 80)) # Ensure at least header + first row fits
        
        stream = []
        # Header background
        stream.append("0.06 0.09 0.16 rg\n")
        stream.append(f"{self.margin_x} {self.cursor_y - 20} {self.content_w} 20 re f\n")
        
        # Header text
        stream.append("1.0 1.0 1.0 rg\n")
        cur_x = self.margin_x
        for i, h in enumerate(headers):
            stream.append("BT\n/F2 8.5 Tf\n")
            stream.append(f"{cur_x + 6} {self.cursor_y - 13} Td ({self._escape(h)}) Tj\n")
            stream.append("ET\n")
            cur_x += col_widths[i]
            
        self.cursor_y -= 20
        
        # Rows
        for r_idx, r_data in enumerate(parsed_rows):
            rh = row_heights[r_idx]
            self._check_page_break(rh)
            
            # Alternating background
            if r_idx % 2 == 1:
                stream.append("0.96 0.97 0.98 rg\n")
                stream.append(f"{self.margin_x} {self.cursor_y - rh} {self.content_w} {rh} re f\n")
                
            # Border bottom
            stream.append("0.88 0.91 0.94 RG 0.5 w\n")
            stream.append(f"{self.margin_x} {self.cursor_y - rh} m {self.margin_x + self.content_w} {self.cursor_y - rh} l S\n")
            
            cur_x = self.margin_x
            for c_idx, lines in enumerate(r_data):
                stream.append("0.15 0.20 0.28 rg\n")
                line_y = self.cursor_y - 11
                for ln in lines:
                    stream.append("BT\n/F1 8.0 Tf\n")
                    stream.append(f"{cur_x + 6} {line_y} Td ({self._escape(ln)}) Tj\n")
                    stream.append("ET\n")
                    line_y -= 10.0
                cur_x += col_widths[c_idx]
                
            self.cursor_y -= rh
            
        self.cursor_y -= 8
        self.current_page_stream.append("".join(stream))

    def save(self, filepath):
        self.start_new_page() # finalize last page
        
        objects = []
        
        # 1. Catalog
        objects.append("<< /Type /Catalog /Pages 2 0 R >>")
        
        # 2. Pages
        page_refs = [f"{4 + i * 2} 0 R" for i in range(len(self.pages))]
        objects.append(f"<< /Type /Pages /Kids [{' '.join(page_refs)}] /Count {len(self.pages)} >>")
        
        # 3. Fonts
        objects.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
        objects.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")
        
        # Add Pages & Content streams
        for i, p_stream in enumerate(self.pages):
            c_idx = 5 + i * 2
            p_idx = 4 + i * 2
            
            # Page Object
            objects.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {self.width} {self.height}] /Contents {c_idx} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>")
            
            # Content Stream
            compressed = zlib.compress(p_stream.encode('latin1'))
            stream_obj = f"<< /Length {len(compressed)} /Filter /FlateDecode >>\nstream\n".encode('latin1') + compressed + b"\nendstream"
            objects.append(stream_obj)
            
        # Write PDF binary
        with open(filepath, "wb") as f:
            f.write(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
            offsets = []
            
            for i, obj in enumerate(objects):
                offsets.append(f.tell())
                obj_num = i + 1
                if isinstance(obj, bytes):
                    f.write(f"{obj_num} 0 obj\n".encode('latin1') + obj + b"\nendobj\n")
                else:
                    f.write(f"{obj_num} 0 obj\n{obj}\nendobj\n".encode('latin1'))
                    
            xref_offset = f.tell()
            f.write(f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode('latin1'))
            for off in offsets:
                f.write(f"{off:010d} 00000 n \n".encode('latin1'))
                
            f.write(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF".encode('latin1'))
            
        print(f"Successfully generated PDF: {filepath} ({len(self.pages)} pages)")

if __name__ == "__main__":
    print("PDF Builder ready")
