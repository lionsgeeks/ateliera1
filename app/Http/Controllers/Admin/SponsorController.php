<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sponsor;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SponsorController extends Controller
{
    public function index()
    {
        $sponsors = Sponsor::ordered()->get();
        return Inertia::render('admin/sponsors/index', [
            'sponsors' => $sponsors
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/sponsors/create');
    }

    public function store(Request $request, ImageUploadService $uploader)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'nullable|url|max:1000',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            // no sort order
            'is_active' => 'nullable|boolean',
        ]);

        $validated['logo_path'] = $uploader->uploadImage($request->file('logo'), 'sponsors', 85, 800);
        unset($validated['sort_order']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        Sponsor::create($validated);

        // Sync storage after image operations
        $this->syncStorage();

        return Redirect::route('admin.sponsors.index');
    }

    public function edit(Sponsor $sponsor)
    {
        return Inertia::render('admin/sponsors/edit', [
            'sponsor' => $sponsor
        ]);
    }

    public function update(Request $request, Sponsor $sponsor, ImageUploadService $uploader)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'nullable|url|max:1000',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            // no sort order
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('logo')) {
            if ($sponsor->logo_path) {
                $uploader->deleteImage($sponsor->logo_path);
            }
            $validated['logo_path'] = $uploader->uploadImage($request->file('logo'), 'sponsors', 85, 800);
        }

        $sponsor->update($validated);

        // Sync storage after image operations
        $this->syncStorage();

        return Redirect::route('admin.sponsors.index');
    }

    public function destroy(Sponsor $sponsor, ImageUploadService $uploader)
    {
        if ($sponsor->logo_path) {
            $uploader->deleteImage($sponsor->logo_path);
        }
        $sponsor->delete();
        return Redirect::route('admin.sponsors.index');
    }
}


