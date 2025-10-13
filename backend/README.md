# Backend Setup for AI Image Captioning

This Flask backend uses the BLIP (Bootstrapping Language-Image Pre-training) model to generate captions for images.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install required dependencies:**
   ```bash
   pip install flask flask-cors transformers pillow torch torchvision
   ```

## Running the Backend

1. **Start the Flask server:**
   ```bash
   python app.py
   ```

2. **The server will start on:** `http://localhost:5000`

3. **Verify it's running:**
   - You should see: `Running on http://127.0.0.1:5000`

## Important Notes

### CORS Configuration

The backend is configured to accept requests from any origin. For production, you should restrict this:

```python
CORS(app, resources={r"/caption": {"origins": "https://yourdomain.com"}})
```

### Model Download

On first run, the BLIP model (~1GB) will be downloaded automatically. This may take a few minutes depending on your internet connection.

### Testing the Backend

You can test the backend using curl:

```bash
curl -X POST http://localhost:5000/caption \
  -H "Content-Type: application/json" \
  -d '{"image": "BASE64_ENCODED_IMAGE_HERE"}'
```

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console, ensure:
1. The Flask server is running
2. CORS is properly configured in `app.py`
3. Your frontend is making requests to `http://localhost:5000/caption`

### Model Loading Errors

If the model fails to load:
1. Check your internet connection (for initial download)
2. Ensure you have enough disk space (~2GB)
3. Try clearing the transformers cache: `~/.cache/huggingface/`

### Memory Issues

The BLIP model requires significant RAM. If you encounter memory errors:
1. Close other applications
2. Consider using a smaller model variant
3. Ensure you have at least 4GB of free RAM

## API Endpoint

### POST `/caption`

**Request Body:**
```json
{
  "image": "BASE64_ENCODED_IMAGE_STRING"
}
```

**Success Response (200):**
```json
{
  "caption": "Generated caption text"
}
```

**Error Responses:**
- `400`: No image data provided or invalid image data
- `500`: Caption generation failed or unexpected error

## Frontend Integration

The frontend is already configured to connect to this backend. Make sure:
1. The Flask server is running on `http://localhost:5000`
2. Upload an image in the frontend
3. Click "Generate Caption"
4. The caption will appear below the image

## Production Deployment

For production deployment, consider:
1. Using a production WSGI server (gunicorn, uWSGI)
2. Setting up proper CORS restrictions
3. Implementing rate limiting
4. Adding authentication
5. Using HTTPS
6. Deploying to a cloud platform (AWS, Google Cloud, Azure, Heroku)
