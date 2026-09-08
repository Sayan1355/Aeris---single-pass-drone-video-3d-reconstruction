🚁 AERIS — Single-Pass Drone Video 3D Reconstruction Platform

From a single flight. To a complete digital twin.

AERIS is an AI-enabled UAV reconstruction and geospatial intelligence platform designed to transform single-pass drone video and flight telemetry into georeferenced, metrically accurate 3D environments.

The platform is designed for scenarios where repeated drone passes, extensive image overlap, or traditional photogrammetric flight planning are impractical — including rapid mapping, infrastructure inspection, disaster assessment, strategic-area mapping, construction monitoring, and digital-twin generation.

✨ Overview

Traditional 3D reconstruction often depends on:

multiple drone passes
high image overlap
cross-track camera baselines
carefully planned flight paths
extensive Ground Control Points
significant post-processing

AERIS addresses the single-pass reconstruction problem by combining geometric estimation, neural depth priors, dynamic-object masking, Gaussian reconstruction, surface meshing, and georeferencing.

The system is designed around a hybrid:

Geometric Foundation + Neural Prior + Gaussian Metrology

architecture.

🎯 Problem Statement

A single forward drone flight provides limited viewing angles and insufficient cross-track parallax for conventional Structure-from-Motion (SfM) and Multi-View Stereo (MVS).

At the same time, real-world UAV data introduces additional problems:

Challenge	Impact
Limited viewing angles	Occluded surfaces and incomplete reconstruction
Motion blur	Poor feature matching
Video compression	Reduced visual quality
Variable illumination	Inconsistent appearance
Dynamic objects	Ghosting and reconstruction artifacts
GPS inaccuracies	Georeferencing errors
Sensor noise	Pose instability
Processing latency	Delayed situational awareness
Occlusions	Missing surfaces
Limited GCP availability	Reduced metric accuracy

These constraints are explicitly part of the project specification.

💡 Proposed Solution

AERIS processes a single-pass UAV video stream together with available flight and sensor metadata.

The system reconstructs:

3D terrain
buildings
rooftops
facades
roads
infrastructure
vegetation
obstacles
dense point clouds
textured 3D meshes
geospatial raster products
calibrated camera trajectories
QA and accuracy metrics

The resulting outputs are designed for visualization, measurement, GIS analysis, and downstream digital-twin applications.

🧩 Platform Architecture
                         ┌──────────────────────────────┐
                         │         UAV / EDGE           │
                         │                              │
                         │  Camera + GNSS + IMU        │
                         │  Flight Metadata             │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                         ┌──────────────────────────────┐
                         │       DATA INGESTION         │
                         │                              │
                         │ Video + Telemetry            │
                         │ Chunked Upload                │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │          CORE PROCESSING               │
                    │                                        │
                    │  Temporal Workflow Orchestration       │
                    │  Go Control Plane                       │
                    │  Python / CUDA CV Workers               │
                    └────────────────┬───────────────────────┘
                                     │
                                     ▼
              ┌──────────────────────────────────────────────────┐
              │              RECONSTRUCTION PIPELINE             │
              │                                                  │
              │  1. Frame Curation                               │
              │  2. Pose Estimation                              │
              │  3. Dynamic Masking                              │
              │  4. Metric Depth                                 │
              │  5. 3DGS + Dense Reconstruction                  │
              │  6. Surface Meshing                              │
              │  7. Georeferencing                               │
              │  8. Product Generation                           │
              └─────────────────────┬────────────────────────────┘
                                    │
                                    ▼
                 ┌───────────────────────────────────────┐
                 │         ARTIFACT STORAGE               │
                 │                                       │
                 │ MinIO S3                              │
                 │ PostgreSQL + PostGIS                  │
                 │ NATS JetStream                        │
                 └──────────────────┬────────────────────┘
                                    │
                                    ▼
             ┌────────────────────────────────────────────────┐
             │              AERIS WEB CONSOLE                 │
             │                                                │
             │ React + TypeScript                             │
             │ Three.js / React Three Fiber                    │
             │ CesiumJS / Resium                               │
             │                                                │
             │ Mission Management                             │
             │ Reconstruction                                 │
             │ Digital Twin                                   │
             │ Geospatial Intelligence                        │
             │ Products                                       │
             │ QA / Accuracy                                  │
             │ Telemetry                                      │
             └────────────────────────────────────────────────┘

The backend architecture separates the Go control plane, Temporal workflow orchestration, Python/CUDA computer-vision workers, object storage, PostgreSQL/PostGIS, and NATS telemetry infrastructure. The browser communicates with the backend through REST and consumes geospatial/3D artifacts rather than connecting directly to NATS or Temporal.

🖥️ Frontend

The AERIS frontend is an operator-grade aerospace and geospatial intelligence console.

It is not intended to be a generic administrative dashboard.

The UI focuses on:

3D visualization
mission operations
spatial intelligence
reconstruction monitoring
telemetry
product inspection
QA validation
mission history
system configuration
🧭 Frontend Modules
Module	Route	Purpose
Landing Experience	/	Cinematic AERIS introduction and 3D reconstruction visualization
Mission Hub	/hub	Operational overview of active missions
Missions	/missions	Mission creation, configuration and management
Reconstruction	/pipeline	Monitor the 8-stage reconstruction pipeline
3D Digital Twin	/digital-twin	Explore reconstructed 3D environments
Geospatial Intelligence	/geospatial	GIS analysis and spatial measurements
Products	/products	Generated reconstruction products and exports
QA / Accuracy	/qa	Reconstruction quality and validation
Live Telemetry	/telemetry	UAV flight and sensor monitoring
Mission History	/history	Historical mission archive
Settings	/settings	Platform/system configuration
🌌 Cinematic Landing Page

The landing experience is built around the project's core concept:

FROM A SINGLE FLIGHT. TO A COMPLETE DIGITAL TWIN.

The hero contains:

interactive 3D terrain
dense point-cloud visualization
UAV flight path
camera pose markers
reconstruction wireframe
telemetry HUD
mission status
digital-twin visualization modes
pointer-reactive 3D interaction
animated UAV
scanning/reconstruction effects
responsive camera movement

The 3D environment is based on the original Stitch-generated Three.js scene and has been integrated into the React application.

🛰️ Mission Hub

The Mission Hub provides the operator with a high-level operational view.

It presents:

active mission information
processing progress
pipeline status
telemetry
flight trajectory
mission metadata
recent missions
reconstruction state

The purpose is to answer:

"What is happening right now?"

🗂️ Missions

The dedicated Missions workspace handles mission management.

Capabilities include:

mission archive
mission search
status filtering
mission selection
mission metadata
active mission inspection
mission creation workflow
platform information
survey area
GSD
flight metadata
sensor configuration
mission status

The Missions module answers:

"What missions do I have, and how do I manage them?"

⚙️ Reconstruction Command Center

The Reconstruction module visualizes the processing pipeline.

VIDEO INGEST
     │
     ▼
1. FRAME CURATION
     │
     ▼
2. POSE ESTIMATION
     │
     ▼
3. DYNAMIC MASKING
     │
     ▼
4. METRIC DEPTH
     │
     ▼
5. 3DGS + DENSE RECONSTRUCTION
     │
     ▼
6. SURFACE MESHING
     │
     ▼
7. GEOREFERENCING
     │
     ▼
8. PRODUCT GENERATION

The underlying project specification defines the same eight-stage processing lifecycle.

The frontend provides visual monitoring of:

frame curation
camera trajectory
camera poses
reconstruction progress
point cloud
terrain
wireframe
depth
classification
stage metrics
pipeline status
🌍 3D Digital Twin

The Digital Twin module provides an immersive 3D environment.

Supported visualization layers include:

Digital Twin Mesh
Dense Point Cloud
Flight Trajectory
Camera Poses
Survey Boundary
DEM Terrain Mesh
DSM Grid
Orthomosaic

Visualization modes include:

REALISTIC
POINT CLOUD
WIREFRAME
ELEVATION
CLASSIFIED

The inspector provides information such as:

object coordinates
elevation
dimensions
confidence
polygon count
GSD
asset format
reconstruction status
🗺️ Geospatial Intelligence

The Geospatial workspace combines 3D reconstruction with GIS analysis.

It provides:

Cesium-based visualization
survey boundary
flight trajectory
camera positions
coverage visualization
orthomosaic layer
DSM
DTM
3D reconstruction
classified points
distance measurement
area measurement
elevation analysis
terrain profile
CRS information
temporal mission controls

This allows the operator to move from:

3D visualization → spatial analysis → measurable intelligence

📦 Products & Export Center

The reconstruction pipeline can generate multiple geospatial and 3D products.

The project's defined output specification includes the following artifacts.

ID	Product	Format	Purpose
O-1	Georeferenced Textured 3D Mesh	glTF / GLB / OBJ / 3D Tiles	Digital twins and 3D GIS
O-2	Dense Classified Point Cloud	LAS / LAZ / PLY	Semantic spatial analysis
O-3	Orthomosaic	GeoTIFF / COG	High-resolution mapping
O-4	DSM / DTM	Float32 GeoTIFF	Elevation analysis
O-5	Calibrated Trajectory & Poses	COLMAP / GeoJSON	Camera and flight reconstruction
O-6	Confidence & Coverage Rasters	UInt8 GeoTIFF	Spatial confidence
O-7	QA & Accuracy Report	JSON / PDF	Validation
O-8	In-Flight Live Stream	MJPEG / WebRTC / GeoJSON	Situational awareness
O-9	Provenance Manifest	Signed JSON	Artifact traceability
O-10	Measurement Vectors	GeoJSON	Distance, area and volume
✅ QA & Accuracy

AERIS includes a dedicated QA/accuracy workspace.

The defined evaluation criteria include:

ID	Metric	Passing Target	Stretch Target
E-1	Absolute Positional Accuracy	≤ 0.50 m with PPK / ≤ 2.0 m GNSS-only	≤ 0.25 m
E-2	Relative Structural Accuracy	≤ 2× GSD	≤ 1× GSD
E-3	Geometric Fidelity	F-score ≥ 0.80	F-score ≥ 0.90
E-4	Surface Coverage	≥ 90%	≥ 96%
E-5	Texture Quality	PSNR ≥ 20 dB / SSIM ≥ 0.82	PSNR ≥ 24 dB / SSIM ≥ 0.90
E-6	Dynamic Artifact Suppression	≤ 2 artifacts/km²	0
E-7	Processing Latency	Draft ≤ 20 min / Final ≤ 3 h	Draft ≤ 15 min / Final ≤ 2 h
E-8	Degraded Sensor Robustness	RMSE ≤ 2.0 m	RMSE ≤ 1.0 m

These thresholds are taken directly from the project specification.

📡 Live Telemetry

The Telemetry workspace is designed as an aerospace flight-operations console.

It monitors:

UAV position
altitude
speed
heading
battery
GNSS status
RTK status
camera status
mission progress
reconstruction progress
telemetry graphs
event feed
system health
flight corridor

The current frontend uses local simulated telemetry for UI development.

Backend/NATS integration is intentionally separated from the frontend implementation.

🕘 Mission History

Mission History provides an operational archive containing:

historical missions
mission status
survey area
platform
GSD
quality scores
processing information
mission dates
mission details
mini-map visualization
quality trends

Operators can navigate from historical missions into:

Mission
   ├── Reconstruction
   ├── Digital Twin
   ├── Products
   └── QA
🧠 Technical Reconstruction Strategy

AERIS uses a hybrid reconstruction strategy.

1. Metric Pose Estimation

VIO provides an initial trajectory, followed by SfM and bundle adjustment incorporating GNSS/PPK and barometric constraints.

2. Dynamic Object Masking

Moving objects such as:

vehicles
pedestrians
animals

are identified and masked before photometric optimization.

3. Metric Depth

Monocular depth models provide depth priors for areas where traditional reconstruction is weak.

4. Dense Reconstruction

Two complementary tracks are specified:

Fast Track

Streaming TSDF
      ↓
Draft Mesh

Survey Track

Depth-Regularized 3DGS
      ↓
Dense Reconstruction
5. Meshing & Georeferencing

Screened Poisson reconstruction generates continuous surfaces, followed by georeferencing through a 7-parameter Helmert transformation into WGS84/ECEF or UTM coordinate systems.

📥 Input Data
Required
Input	Description
Drone Video	1080p / 4K video
GPS	UAV position information
Flight Metadata	Flight and camera metadata
Optional
Input	Purpose
IMU	Improved pose estimation
Barometric Altitude	Vertical constraints
Camera Intrinsics	Camera calibration
RTK / PPK	High-precision georeferencing

These inputs are defined by the project requirements.

🛠️ Technology Stack
Frontend
Technology	Purpose
React	UI framework
TypeScript	Type safety
Vite	Development/build tooling
Tailwind CSS	Styling
Three.js	3D rendering
React Three Fiber	React-based Three.js
Drei	R3F utilities
CesiumJS	Geospatial visualization
Resium	React integration for Cesium
Recharts	Telemetry and analytics charts
Zustand	State management
Phosphor Icons	UI iconography
Current development environment
Node.js 22.x
npm 10.x
React 19.x
Vite 8.x
TypeScript 6.x
🧱 Backend Technology Stack

The complete platform architecture uses:

Layer	Technology
Control Plane	Go
Workflow	Temporal
Database	PostgreSQL + PostGIS
Message Bus	NATS JetStream
Object Storage	MinIO
CV Runtime	Python
GPU Framework	PyTorch / CUDA
SfM	COLMAP / PyCOLMAP
Point Cloud	Open3D / Trimesh / Laspy
Geospatial	GDAL / Rasterio / PyProj
Video	FFmpeg / OpenCV
Containers	Docker / Podman / Kubernetes

The backend specification defines these components and their roles.

🔌 Backend Integration Architecture

The frontend is designed to communicate with the backend through APIs.

                 AERIS FRONTEND
                       │
                       │ REST / JSON
                       ▼
              ┌──────────────────┐
              │   mission-svc    │
              │    :8080         │
              └────────┬─────────┘
                       │
                       ▼
                 PostgreSQL
                   + PostGIS


        3D / GIS ASSETS
               │
               ▼
             MinIO
               │
               ▼
       ┌─────────────────┐
       │ React / Cesium  │
       │ Three.js Viewer │
       └─────────────────┘

The browser is intentionally not responsible for implementing:

Temporal
NATS
backend workers
CUDA processing
database access
gRPC service logic

Those responsibilities belong to the backend architecture. The specified browser integration uses REST for mission control and object storage for 3D/geospatial artifacts.

🚀 Installation
1. Clone Repository
git clone <YOUR-REPOSITORY-URL>
cd single-pass-drone-video-3d-reconstruction

If this repository contains only the frontend:

cd frontend

or enter your actual frontend directory.

🐧 Debian / Ubuntu

The complete platform specification requires Git, Docker/Podman, Go, Node.js/npm, uv, FFmpeg and optionally tmux.

Install dependencies
sudo apt update

sudo apt install -y \
  git \
  curl \
  build-essential \
  ffmpeg \
  tmux \
  pkg-config \
  libgl1-mesa-glx \
  libglib2.0-0

For the full backend platform:

sudo apt install -y \
  golang \
  nodejs \
  npm
Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

Reload shell:

source ~/.bashrc

Verify:

git --version
node --version
npm --version
go version
ffmpeg -version
uv --version
🏹 Arch Linux

Install the required system packages:

sudo pacman -Syu --needed \
  git \
  curl \
  base-devel \
  ffmpeg \
  tmux \
  go \
  nodejs \
  npm

Verify:

git --version
node --version
npm --version
go version
ffmpeg -version

Install uv:

curl -LsSf https://astral.sh/uv/install.sh | sh

Reload shell:

source ~/.bashrc

The Arch dependency set follows the project's Linux setup specification.

💻 Frontend-Only Setup

If you are running the current frontend independently:

cd frontend

Install dependencies:

npm install

Start development server:

npm run dev

Vite will display the local development URL, normally:

http://localhost:5173

If port 5173 is already occupied, Vite may automatically select another port such as:

http://localhost:5174

or another available port.

🏗️ Production Build

Run:

npm run build

This generates:

dist/
├── index.html
└── assets/
🔍 TypeScript Validation

Run:

npx tsc --noEmit

A successful result should contain no TypeScript errors.

Recommended workflow:

npm install
npx tsc --noEmit
npm run build
npm run dev
🧪 Full Platform Setup

If running the complete backend architecture rather than only the frontend, the project specification provides:

chmod +x setup.sh dev.sh
./setup.sh

The setup script is designed to validate dependencies, start infrastructure services, initialize MinIO buckets, prepare Python environments, install frontend dependencies, and compile Go services.

Then:

./dev.sh

Or without tmux:

./dev.sh --no-tmux

🔌 Local Service Ports

When running the complete backend platform:

Service	Port
Mission Control REST	8080
Mission Control gRPC	50051
Video Ingestion HTTP	8081
Video Ingestion gRPC	50052
Web Operator UI	5173
Temporal Web UI	8233
Temporal gRPC	7233
MinIO API	9000
MinIO Console	9001
PostgreSQL	5432
NATS	4222
NATS Monitoring	8222

These endpoints come from the project's defined service architecture.

🧪 Testing
Frontend
npm test

Type validation:

npx tsc --noEmit

Production build:

npm run build
🧪 Backend Tests

For the complete platform:

(cd services/mission-svc && go test -v ./...)
(cd services/ingest-svc && go test -v ./...)
(cd services/telemetry-worker && go test -v ./...)
(cd workflows && go test -v ./...)
(cd scripts/tests && go test -v ./...)

Python workers:

(cd workers/cv-python && uv run pytest tests/)

Frontend:

(cd frontend/web && npm test)

The project specification defines these as the automated unit/integration validation commands.

🎥 Synthetic E2E Test

Generate a synthetic 1080p video:

mkdir -p scripts/tests/testdata

ffmpeg \
  -f lavfi \
  -i testsrc=duration=5:size=1920x1080:rate=30 \
  scripts/tests/testdata/drone_pass_sample.mp4 \
  -y

Run the control-plane simulation:

go run scripts/tests/e2e_control_plane_mock.go \
  -mission-addr localhost:50051 \
  -ingest-addr localhost:50052 \
  -video scripts/tests/testdata/drone_pass_sample.mp4

The specified test simulates mission registration, chunked video ingestion, checksum verification, telemetry events, and Temporal workflow initiation.

📁 Suggested Repository Structure
single-pass-drone-video-3d-reconstruction/
│
├── frontend/
│   └── web/
│       ├── src/
│       │   ├── features/
│       │   │   ├── landing/
│       │   │   ├── missions/
│       │   │   ├── mission-hub/
│       │   │   ├── reconstruction/
│       │   │   ├── digital-twin/
│       │   │   ├── geospatial/
│       │   │   ├── products/
│       │   │   ├── qa/
│       │   │   ├── telemetry/
│       │   │   ├── history/
│       │   │   └── settings/
│       │   │
│       │   ├── components/
│       │   ├── App.tsx
│       │   └── index.css
│       │
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── services/
│   ├── mission-svc/
│   ├── ingest-svc/
│   └── telemetry-worker/
│
├── workflows/
│
├── workers/
│   └── cv-python/
│
├── proto/
│
├── scripts/
│   └── tests/
│
├── setup.sh
├── dev.sh
└── README.md

If your GitHub repository currently contains only the frontend, simply omit the backend directories until they are merged.

🎨 Design Philosophy

AERIS intentionally avoids a conventional SaaS aesthetic.

The interface combines:

Aerospace Operations
telemetry
flight status
mission control
sensor state
operational indicators
Geospatial Intelligence
coordinates
CRS
survey boundaries
elevation
coverage
spatial measurements
Computational Visualization
point clouds
reconstruction meshes
camera trajectories
3D Gaussian-style reconstruction
depth visualization
Digital Twin
interactive 3D environments
object inspection
measurements
temporal comparison
spatial intelligence
🔐 Data & Security Considerations

The platform architecture is designed to support controlled/air-gapped deployments.

The backend specification includes:

S3-compatible object storage
SHA-256 artifact checksums
cryptographic provenance
immutable mission records
atomic object commits
isolated processing workers
geospatially indexed storage

The defined provenance manifest uses signed JSON and SHA-256 checksums to connect generated artifacts to their source inputs.

🎯 Target Applications

AERIS can support:

Application	Example
Strategic Mapping	Border / restricted-area mapping
Disaster Response	Rapid damage assessment
Infrastructure	Roads, bridges and utility inspection
Construction	Progress monitoring
Urban Planning	City-scale spatial analysis
Archaeology	Site documentation
Digital Twins	3D asset generation
Mission Planning	Reconnaissance and spatial planning

These applications are part of the original project specification.

📊 Why Single-Pass Reconstruction?

Traditional photogrammetry:

Multiple Flights
      +
High Image Overlap
      +
Cross-Track Baselines
      +
Extensive Processing
      ↓
3D Reconstruction

AERIS:

ONE UAV FLIGHT
      +
VIDEO
      +
GNSS / SENSOR DATA
      ↓
Frame Curation
      ↓
Pose Estimation
      ↓
Dynamic Masking
      ↓
Metric Depth
      ↓
3DGS + Dense Reconstruction
      ↓
Surface Mesh
      ↓
Georeferencing
      ↓
Digital Twin + GIS Products

The central technical challenge is that a forward single-pass flight is fundamentally degenerate for classical SfM/MVS because of limited cross-track baseline and transverse parallax.

🏆 Quality Targets

AERIS is designed around measurable reconstruction quality rather than purely visual output.

Core targets include:

Absolute Georeferencing
        ↓
Relative Structural Accuracy
        ↓
Geometric Fidelity
        ↓
Surface Coverage
        ↓
Texture Quality
        ↓
Dynamic Artifact Suppression
        ↓
Processing Latency
        ↓
Sensor Robustness

This makes the platform suitable for applications where metric accuracy and traceability matter in addition to visualization.

🛣️ Roadmap
Phase 1 — Foundation
 AERIS design system
 Application shell
 Navigation
 Status system
Phase 2 — Mission Operations
 Mission Hub
 Mission Management
Phase 3 — Reconstruction
 Reconstruction Command Center
 Pipeline visualization
 3D reconstruction viewport
Phase 4 — Digital Twin
 Interactive 3D Digital Twin
 Layers
 Measurements
 Temporal controls
Phase 5 — Geospatial
 Cesium GIS workspace
 Coverage analysis
 Terrain analysis
 Spatial measurements
Phase 6 — Products
 Product library
 3D assets
 Raster products
 Export workflow
Phase 7 — QA
 Accuracy metrics
 Acceptance matrix
 Confidence analysis
 Certification workflow
Phase 8 — Telemetry
 UAV telemetry
 Flight monitoring
 System health
 Telemetry graphs
Phase 9 — History
 Mission archive
 Historical analysis
 Mission inspection
Phase 10 — Settings
 System configuration
 Platform settings
Phase 11 — Visual Integration
 Landing page
 Stitch-based 3D scene
 Global visual consistency
 Animation
 Responsive behavior
 Premium interaction polish
Phase 12 — Backend Integration
 Mission API integration
 Real video ingestion
 Real pipeline status
 Live telemetry integration
 Real 3D Tiles / glTF assets
 Real LAS/LAZ products
 Real orthomosaic/DSM/DTM layers
 Backend-driven QA metrics
 Authentication / authorization
🤝 Frontend / Backend Responsibility
Frontend

Responsible for:

UI
│
├── Mission Management
├── Visualization
├── 3D
├── GIS
├── Telemetry Display
├── QA Visualization
├── Product Management
└── Operator Experience
Backend

Responsible for:

Processing
│
├── Video Ingestion
├── Telemetry
├── SfM
├── Dynamic Masking
├── Depth
├── 3DGS
├── Meshing
├── Georeferencing
├── Product Generation
└── QA Computation

The architecture intentionally separates these responsibilities.

📜 License

Add your project's chosen license here.

Example:

MIT License

Replace this section with the actual license your team intends to use before publishing.

👨‍💻 Development

Built with a focus on:

Performance · Spatial Intelligence · 3D Visualization · Accuracy · Operator Experience

⭐ AERIS

One flight.
One pass.
One complete digital twin.
