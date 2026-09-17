# Construction Matrix 🏗️

> **Structural Steel Wires, Rebar & Cost Estimation Engine for Indian Civil & Infrastructure Construction**

`Construction Matrix` is a web application designed to calculate structural rebar steel, steel binding wire requirements, and itemized cost estimation in **Indian Rupees (₹)** based on plot area, floor levels, room counts, and load specifications.

---

## 🌟 Key Features

- **Structural Steel Wire & Rebar Calculations**:
  - **Steel Binding Wires (18 & 20 SWG Annealed, GI Rust-Proof & SS Wire)**: Weight in kg, 25kg coil counts, and length in meters & feet.
  - **Diameter-wise Bar Schedule**: 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, and 32mm TMT bars calculated using IS 456 formula ($W = \frac{d^2}{162}$ kg/m).
- **Multi-Category Construction Standards**:
  - 🏡 **Residential Buildings**: Houses, Duplexes, Villas, Apartments.
  - 🏢 **Commercial Complexes & Industrial Warehouses**.
  - 🚂 **Railway & Heavy Infrastructure**: Railway Bridges & Viaducts (IRS Concrete Bridge Code), Highway Flyovers (IRC 112), and Box Culverts.
- **Indian Market Pricing & Unit Rates (₹)**:
  - Real-time rate sliders for TMT Steel (₹/kg), Binding Wire (₹/kg), and Bar Bending Labour (₹/kg).
  - Indian numbering formatting (`₹ Lakhs` & `₹ Crores`).
- **Interactive 3D/2D Simulator**:
  - Building elevations, Railway Bridge viaduct piers, pier caps, prestressed girders, and GI binding wire joint knot details.
- **Official Bill of Quantities (BOQ) PDF Export**:
  - 1-click printable and downloadable PDF estimation sheet.

---

## 🚀 Quick Start & Local Setup

```bash
# Clone the repository
git clone https://github.com/dharana20/Construction-Matrix.git

# Change directory
cd Construction-Matrix

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📐 Civil Engineering Specifications Used

- **IS 456:2000**: Code of Practice for Plain and Reinforced Concrete.
- **IS 1786**: High Strength Deformed Steel Bars and Wires.
- **IS 2502**: Code of Practice for Bending and Fixing of Bars for Concrete Reinforcement.
- **IRS Concrete Bridge Code**: Standard Specifications for Railway Bridges.
- **IRC 112**: Code of Practice for Concrete Road Bridges.

---

## 📜 License

MIT License &copy; Construction Matrix
