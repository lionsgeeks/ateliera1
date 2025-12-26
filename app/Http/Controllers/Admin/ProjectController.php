<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
    }

    public function index(Request $request)
    {
        $perPage = 12;
        $projectQuery = \App\Models\Project::orderBy('created_at', 'desc');
        $projects = $projectQuery->paginate($perPage)->withQueryString();

        // Eager-load categories *after* pagination for efficiency
        $allCategoryIds = collect($projects->items())
            ->flatMap(function ($project) {
                return is_array($project->category_ids) ? $project->category_ids : [];
            })
            ->unique()
            ->filter()
            ->values();

        $categoriesById = \App\Models\Category::whereIn('id', $allCategoryIds)->get()->keyBy('id');

        // Append 'categories' attribute to each project item in the paginator
        $projects->getCollection()->transform(function ($project) use ($categoriesById) {
            $ids = is_array($project->category_ids) ? $project->category_ids : [];
            $project->categories = collect($ids)
                ->map(fn ($id) => $categoriesById->get((int) $id))
                ->filter()
                ->values();
            return $project;
        });

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

    public function create()
    {
        $categories = \App\Models\Category::active()->ordered()->get();

        return Inertia::render('admin/projects/create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_ids' => 'required|array|min:1',
            'category_ids.*' => 'exists:categories,id',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'start_year' => 'nullable|string|max:4',
            'end_year' => 'nullable|string|max:4',
            'description' => 'string',
            'achievement_status' => 'nullable|string|max:255',
            'surface_area' => 'nullable|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'delegated_client_name' => 'nullable|string|max:255',
            'project_cost' => 'nullable|string|max:255',
            'duration_months' => 'nullable|integer|min:0',
            'status' => 'in:active,inactive',
            'sort_order' => 'integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,gif,webp',
            'pdf' => 'nullable|mimes:pdf|max:20480',
            'partners' => 'nullable|array',
            'partners.*' => 'string|max:255',
            'institutional_partners' => 'nullable|array',
            'institutional_partners.*.name' => 'required_with:institutional_partners|string|max:255',
            'institutional_partners.*.url' => 'nullable|url|max:2048',
            'sponsors' => 'nullable|array',
            'sponsors.*' => 'string|max:255',
        ]);

        // Upload PDF if provided
        if ($request->hasFile('pdf')) {
            $pdfFile = $request->file('pdf');
            $filename = Str::uuid() . '.' . $pdfFile->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('projects', $pdfFile, $filename);
            $validated['pdf_path'] = '/storage/projects/' . $filename;
        }

        // Upload main image
        $imagePath = $this->imageUploadService->uploadImage($request->file('image'), 'projects', 95, 4000);
        $validated['image_path'] = $imagePath;

        // Upload gallery images if provided
        if ($request->hasFile('gallery_images')) {
            $galleryPaths = $this->imageUploadService->uploadMultipleWithThumbnails($request->file('gallery_images'), 'projects');
            $validated['gallery_images'] = $galleryPaths;
        }

        Project::create($validated);

        // Sync storage after image operations
        $this->syncStorage();

        return Redirect::route('admin.projects.index')->with('success', 'Project created successfully');
    }

    public function edit(Project $project)
    {
        $categories = \App\Models\Category::active()->ordered()->get();

        return Inertia::render('admin/projects/create', [
            'project' => $project,
            'categories' => $categories
        ]);
    }

    public function show(Project $project)
    {
        // Eager-load related categories for display convenience
        $categories = [];
        if (is_array($project->category_ids) && count($project->category_ids) > 0) {
            $categories = \App\Models\Category::whereIn('id', $project->category_ids)->get();
        }

        return Inertia::render('admin/projects/show', [
            'project' => $project,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'category_ids' => 'nullable|array|min:1',
            'category_ids.*' => 'exists:categories,id',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'start_year' => 'nullable|string|max:4',
            'end_year' => 'nullable|string|max:4',
            'description' => 'string',
            'achievement_status' => 'nullable|string|max:255',
            'surface_area' => 'nullable|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'delegated_client_name' => 'nullable|string|max:255',
            'project_cost' => 'nullable|string|max:255',
            'duration_months' => 'nullable|integer|min:0',
            'status' => 'in:active,inactive',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,gif',
            'pdf' => 'nullable|mimes:pdf|max:20480',
            'partners' => 'nullable|array',
            'partners.*' => 'string|max:255',
            'institutional_partners' => 'nullable|array',
            'institutional_partners.*.name' => 'required_with:institutional_partners|string|max:255',
            'institutional_partners.*.url' => 'nullable|url|max:2048',
            'sponsors' => 'nullable|array',
            'sponsors.*' => 'string|max:255',
        ]);

        // Upload new PDF if provided
        if ($request->hasFile('pdf')) {
            if ($project->pdf_path) {
                $storagePath = str_replace('/storage/', '', $project->pdf_path);
                Storage::disk('public')->delete($storagePath);
            }
            $pdfFile = $request->file('pdf');
            $filename = Str::uuid() . '.' . $pdfFile->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('projects', $pdfFile, $filename);
            $validated['pdf_path'] = '/storage/projects/' . $filename;
        }

        // Upload new main image if provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($project->image_path) {
                $this->imageUploadService->deleteImage($project->image_path);
            }
            $validated['image_path'] = $this->imageUploadService->uploadImage($request->file('image'), 'projects', 95, 4000);
        }

        // Upload new gallery images if provided (replace existing ones)
        if ($request->hasFile('gallery_images')) {
            // Delete old gallery images
            if ($project->gallery_images) {
                $this->imageUploadService->deleteMultipleImages($project->gallery_images);
            }
            $validated['gallery_images'] = $this->imageUploadService->uploadMultipleWithThumbnails($request->file('gallery_images'), 'projects');
        }

        $project->update($validated);

        // Sync storage after image operations
        $this->syncStorage();

        return Redirect::route('admin.projects.index')->with('success', 'Project updated successfully');
    }

    public function destroy(Project $project)
    {
        // Delete associated images
        if ($project->image_path) {
            $this->imageUploadService->deleteImage($project->image_path);
        }
        if ($project->gallery_images) {
            $this->imageUploadService->deleteMultipleImages($project->gallery_images);
        }
        if ($project->pdf_path) {
            $storagePath = str_replace('/storage/', '', $project->pdf_path);
            Storage::disk('public')->delete($storagePath);
        }

        $project->delete();

        return Redirect::route('admin.projects.index')->with('success', 'Project deleted successfully');
    }

    public function deleteGalleryImage(Project $project, $index)
    {
        try {
            $galleryImages = $project->gallery_images ?? [];

            if (!is_array($galleryImages) || !isset($galleryImages[$index])) {
                return response()->json(['success' => false, 'message' => 'Image not found!'], 404);
            }

            $imageToDelete = $galleryImages[$index];

            // Delete the image files (full and thumbnail)
            if (is_array($imageToDelete) && isset($imageToDelete['full']) && isset($imageToDelete['thumb'])) {
                $this->imageUploadService->deleteImage($imageToDelete['full']);
                $this->imageUploadService->deleteImage($imageToDelete['thumb']);
            } else {
                // Fallback for old format if any exist
                $this->imageUploadService->deleteImage($imageToDelete);
            }

            // Remove from array
            unset($galleryImages[$index]);

            // Reindex array to maintain proper indexing
            $galleryImages = array_values($galleryImages);

            // Update project
            $project->update(['gallery_images' => $galleryImages]);

            return response()->json([
                'success' => true,
                'message' => 'Gallery image deleted successfully!',
                'gallery_images' => $galleryImages
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting gallery image: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error deleting image: ' . $e->getMessage()], 500);
        }
    }

    public function addGalleryImage(Request $request, Project $project)
    {
        try {
            $request->validate([
                'gallery_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            ]);

            $galleryImages = $project->gallery_images ?? [];

            // Ensure it's an array
            if (!is_array($galleryImages)) {
                $galleryImages = [];
            }

            // Upload new image with compression and thumbnail
            $newImageData = $this->imageUploadService->uploadWithThumbnail(
                $request->file('gallery_image'),
                'projects',
                90,     // full quality
                2000,   // full max size
                75,     // thumb quality
                200     // thumb size
            );

            // Add to gallery
            $galleryImages[] = $newImageData;

            // Update project
            $project->update(['gallery_images' => $galleryImages]);

            // Sync storage after image operations
            $this->syncStorage();

            return response()->json([
                'success' => true,
                'message' => 'Gallery image added successfully!',
                'image_data' => $newImageData,
                'gallery_images' => $galleryImages
            ]);
        } catch (\Exception $e) {
            Log::error('Error adding gallery image: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error uploading image: ' . $e->getMessage()], 500);
        }
    }
}
