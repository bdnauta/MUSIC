// NOTE: You must obtain a Google Maps Platform API Key with the "Map Tiles API" enabled.
// Get one here: https://console.cloud.google.com/
const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';

// Set the default Google API key for Cesium
Cesium.GoogleMaps.defaultApiKey = GOOGLE_API_KEY;

// Initialize the Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    // We disable the base layer picker since we are using Google 3D Tiles as the primary source.
    baseLayerPicker: false,
    // Disable other default widgets for a cleaner UI
    timeline: false,
    animation: false,
    selectionIndicator: false,
    infoBox: false,
    // Keep the globe and sky atmosphere enabled for context
    globe: true,
    scene3DOnly: true
});

// Remove the default base layer (Bing Maps or other) if desired,
// though Cesium usually requires a base layer.
// Google 3D Tiles will likely cover most of the land.

async function loadTileset() {
    try {
        // Load the Google Photorealistic 3D Tiles
        // This function creates a Cesium3DTileset tailored for the Google API.
        const tileset = await Cesium.createGooglePhotorealistic3DTileset();

        // Add the tileset to the scene's primitives collection
        viewer.scene.primitives.add(tileset);

        // CONFIGURATION: Maximum Screen Space Error (SSE)
        // ------------------------------------------------
        // maximumScreenSpaceError is a critical parameter for balancing performance and visual quality.
        // It determines the maximum error (in pixels) allowed before Cesium refines a tile to a higher level of detail.
        //
        // - LOW VALUE (e.g., 2-8): Higher Visual Quality.
        //   Tiles refine sooner, showing more detail. Increases CPU/GPU usage and network bandwidth.
        // - HIGH VALUE (e.g., 32-64): Better Performance.
        //   Tiles stay at lower resolution longer. Reduces load on the system.
        //
        // The default is usually 16.
        tileset.maximumScreenSpaceError = 16;

        // Fly to the Grand Canyon to demonstrate LoD loading
        // Coordinates: roughly 36.0544° N, 112.1401° W
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-112.1401, 36.0544, 2500), // Lon, Lat, Height (meters)
            orientation: {
                heading: Cesium.Math.toRadians(0.0), // North
                pitch: Cesium.Math.toRadians(-20.0), // Look down
                roll: 0.0
            },
            duration: 5 // Flight duration in seconds
        });

    } catch (error) {
        console.error('Error loading Google Photorealistic 3D Tiles:', error);
        alert('Failed to load tileset. Check console for details.');
    }
}

// Start the loading process
loadTileset();
