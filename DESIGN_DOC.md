# AI Art Project Design Document

This document outlines the design and architecture of an interactive, web-based ASCII art representation of the Earth.

## Data Acquisition

This section details the plan for acquiring satellite imagery using the Google Maps Tile API.

### Authentication

- **API Key:** A Google Cloud Platform API key with the Maps Tile API enabled will be required.
- **Security:** The API key will be restricted to the domain of the web application to prevent unauthorized use.

### Tile Requests

- **Endpoint:** The `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}` endpoint will be used to fetch 2D satellite tiles.
- **Parameters:**
    - `z`: Zoom level.
    - `x`: X coordinate of the tile.
    - `y`: Y coordinate of the tile.
- **Session Token:** A session token will be used to reduce costs.

### Caching

- **Client-Side:** The browser's cache will be utilized to store recently accessed tiles.
- **Server-Side:** A server-side cache (e.g., Redis) will be implemented to store frequently requested tiles, reducing latency and API usage.

## Image Transformation

This section outlines the pipeline for converting satellite images into isometric ASCII art.

### 1. Isometric Conversion

- **Model:** The Nano Banana image generation model will be used for this task.
- **Process:** Each satellite tile will be processed through an image-to-image transformation prompt to convert the top-down view into an isometric perspective.
- **Prompt Engineering:** The prompt will be carefully engineered to maintain geographical features and consistency across tiles.

### 2. Grayscale Conversion

- **Method:** The converted isometric image will be transformed into grayscale.
- **Algorithm:** A standard luminosity method (e.g., `0.299*R + 0.587*G + 0.114*B`) will be applied to each pixel.

### 3. ASCII Mapping

- **Character Set:** A character set of varying density (e.g., `' .,:;irsXA253hMHGS#9B&@'`) will be used to represent different shades of gray.
- **Mapping:** The grayscale value of each pixel will be mapped to a character in the set, creating the final ASCII art tile.

## Web Interface

This section describes the user interface and rendering approach for the interactive ASCII Earth model.

### User Interactions

- **Panning:** Users will be able to pan the map by clicking and dragging.
- **Zooming:** Zooming will be handled via the mouse wheel or pinch gestures on touch devices.
- **Location Search:** An optional search bar could be implemented to allow users to jump to a specific location.

### Rendering

- **Grid-Based Layout:** The ASCII art tiles will be rendered in a grid-based layout using HTML `div` or `pre` elements.
- **Dynamic Loading:** Tiles will be loaded dynamically as the user pans and zooms, creating a seamless experience.
- **Performance:** The rendering engine will be optimized to handle a large number of tiles without performance degradation.

## System Architecture

This section provides a high-level overview of the system architecture and data flow.

### Architecture

- **Frontend:** A single-page application (SPA) built with a modern JavaScript framework (e.g., React, Vue, or Svelte).
- **Backend:** A lightweight backend server (e.g., Node.js with Express) to handle API requests and caching.
- **APIs:**
    - **Google Maps Tile API:** For fetching satellite imagery.
    - **Nano Banana API:** For image-to-image transformation.

### Data Flow

1. The frontend sends a request to the backend for a specific set of ASCII art tiles.
2. The backend checks its cache for the requested tiles.
3. If a tile is not in the cache, the backend fetches the satellite image from the Google Maps Tile API.
4. The backend sends the satellite image to the Nano Banana API for isometric conversion.
5. The backend converts the isometric image to grayscale and then to ASCII art.
6. The backend stores the ASCII art tile in its cache and sends it to the frontend.
7. The frontend renders the ASCII art tile in the grid-based layout.
