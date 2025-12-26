<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        $categories = $query
            ->ordered()
            ->paginate(15);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            // Create directory if it doesn't exist
            $uploadPath = public_path('storage/categories');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            // Resize and save image
            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img->scaleDown(800, 600);
            $img->save($uploadPath . '/' . $filename, 85);

            $validated['image_path'] = 'storage/categories/' . $filename;
        }

        Category::create($validated);

        // Sync storage after image operations
        $this->syncStorage();

        return Redirect::route('admin.categories.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('admin/categories/create', [
            'category' => $category
        ]);
    }

    /**
     * Get category data for modal editing
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
                'description' => 'nullable|string|max:1000',
                'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
                'sort_order' => 'nullable|integer|min:0',
                'is_active' => 'nullable|boolean',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
            ]);

            // Convert string boolean values
            if (isset($validated['is_active'])) {
                $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->expectsJson()) {
                $errorMessages = [];
                foreach ($e->errors() as $messages) {
                    $errorMessages = array_merge($errorMessages, $messages);
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed: ' . implode(', ', $errorMessages),
                    'errors' => $e->errors()
                ], 422);
            }
            throw $e;
        }
        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($category->image_path && file_exists(public_path($category->image_path))) {
                    unlink(public_path($category->image_path));
                }

                $image = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

                // Create directory if it doesn't exist
                $uploadPath = public_path('storage/categories');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }

                // Resize and save image
                $manager = new ImageManager(new Driver());
                $img = $manager->read($image);
                $img->scaleDown(800, 600);
                $img->save($uploadPath . '/' . $filename, 85);

                $validated['image_path'] = 'storage/categories/' . $filename;
            }

            $category->update($validated);

            // Sync storage after image operations
            $this->syncStorage();

            // Return JSON response for AJAX requests (modal)
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Category updated successfully!',
                    'category' => $category->fresh()
                ]);
            }

            return Redirect::route('admin.categories.index');
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error updating category: ' . $e->getMessage()
                ], 500);
            }
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Category $category)
    {
        // Check if category has projects (via JSON)
        $projectsCount = \App\Models\Project::whereJsonContains('category_ids', (int) $category->id)->count();

        if ($projectsCount > 0) {
            if ($request->expectsJson() || $request->wantsJson() || $request->ajax() || $request->header('X-Inertia')) {
                return response()->json([
                    'success' => false,
                    'error' => "Cannot delete category '{$category->name}' because it has {$projectsCount} project(s). Please reassign or delete the projects first."
                ], 422);
            }
            return Redirect::back()->withErrors(['error' => "Cannot delete category '{$category->name}' because it has {$projectsCount} project(s). Please reassign or delete the projects first."]);
        }

        // Delete image if exists
        if ($category->image_path && file_exists(public_path($category->image_path))) {
            unlink(public_path($category->image_path));
        }

        $category->delete();

        if ($request->expectsJson() || $request->wantsJson() || $request->ajax() || $request->header('X-Inertia')) {
            return response()->json(['success' => true, 'message' => 'Category deleted successfully']);
        }

        return Redirect::route('admin.categories.index');
    }

    /**
     * Delete category image
     */
    public function deleteImage(Category $category)
    {
        if ($category->image_path && file_exists(public_path($category->image_path))) {
            unlink(public_path($category->image_path));
        }

        $category->update(['image_path' => null]);

        return response()->json(['success' => true, 'message' => 'Image deleted successfully']);
    }
}
