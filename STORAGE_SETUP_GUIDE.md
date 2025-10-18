# Supabase Storage Setup Guide

## Quick Start

A new page has been created to help you set up the storage bucket for instructor images: `/storage-setup`

Visit this page for a complete step-by-step guide with visual instructions.

---

## Manual Setup Steps

### 1. Access Supabase Dashboard
- Go to https://supabase.com and log in
- Navigate to your project: `https://kvkdfcjckonwovunbaug.supabase.co`
- Click on **Storage** in the left sidebar

### 2. Create the Avatar Bucket
- Click the **"New bucket"** button (top right)
- Enter bucket name: `avatar`
- **Enable "Public bucket"** (toggle switch to ON)
- Click **"Create bucket"**

### 3. Verify Bucket Configuration
The bucket should be:
- Name: `avatar`
- Public: Yes (enabled)
- Status: Active

### 4. Test the Upload
Once the bucket is created, you can test it by:

#### Option A: Using the Storage Setup Page
1. Visit `/storage-setup` in your application
2. Click "Check Storage Buckets" to verify the bucket exists
3. Click "Upload Sample Image" to test upload functionality

#### Option B: Using the Instructor Profile Page
1. Visit `/instructor-profile`
2. Hover over the image area
3. Click the camera icon to upload your instructor photo

#### Option C: Using the Admin Upload Page
1. Visit `/admin-upload`
2. Click the "Trainer Images" tab
3. Use the upload interface to select and upload your image

---

## Troubleshooting

### Bucket Check Fails
- Verify bucket name is exactly `avatar` (lowercase)
- Ensure "Public bucket" is enabled
- Check that Supabase credentials in `.env` are correct

### Upload Fails
- Image must be under 5MB
- Supported formats: JPG, PNG, WebP
- Check internet connection
- Verify the `avatar` bucket exists and is public

### Image Doesn't Display
- Confirm bucket is set to "Public"
- Check browser console for CORS errors
- Verify the image URL is accessible

---

## Image Guidelines

For best results with instructor photos:
- **Size**: 800x600 pixels or higher
- **Format**: JPG, PNG, or WebP
- **Max file size**: 5MB
- **Quality**: Use high-quality professional photo
- **Lighting**: Good lighting with clear background

---

## Technical Details

### Storage Location
- Bucket: `avatar`
- Files: `instructor-[timestamp].[extension]`
- Access: Public (read-only)

### Automatic Image Selection
The system automatically uses the most recent image with filename starting with `instructor-`

### Environment Variables
Already configured in `.env`:
```
VITE_SUPABASE_URL=https://kvkdfcjckonwovunbaug.supabase.co
VITE_SUPABASE_ANON_KEY=[configured]
```

---

## Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Visit `/storage-setup` for guided setup
3. Verify Supabase dashboard shows bucket correctly
4. Test with the "Upload Sample Image" button on setup page
