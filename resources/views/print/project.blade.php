<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{{ $project->title }} - PDF</title>
    <style>
        @page {
            size: A4;
            margin: 8mm;
        }

        * { box-sizing: border-box; }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            color: #2c3e50;
            margin: 0;
            padding: 0;
            line-height: 1.4;
            background: #fff;
        }

        .header {
    text-align: center;
    margin-bottom: 25px;
    padding: 25px 0;
    border-bottom: 4px solid #a3845b;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    color: #2c3e50;
}

.brand {
    font-size: 34px; /* Bigger */
    font-weight: 900;
    color: #2c3e50;
    letter-spacing: 4px;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.logo-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 12px;
}

.logo {
    height: 55px; /* Bigger logo */
    width: auto;
}

.title {
    font-size: 36px; /* Bigger title */
    font-weight: 900;
    color: #2c3e50;
    margin: 12px 0;
    line-height: 1.1;
    text-transform: uppercase;
}

.meta {
    font-size: 16px;
    color: #555;
    margin-bottom: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

        .chip {
            background: #a3845b;
            color: white;
            padding: 6px 12px;
            font-size: 11px;
            border-radius: 15px;
            margin-right: 6px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 5px;
        }

        .hero {
            margin: 20px 0;
            text-align: center;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .hero img {
            width: 100%;
            height: 450px;
            object-fit: cover;
            object-position: center;
            display: block;
        }

        .content-row {
            display: table;
            width: 100%;
            border-collapse: separate;
            border-spacing: 20px 0;
            margin: 20px 0;
        }

        .content-left {
            display: table-cell;
            width: 70%;
            vertical-align: top;
            padding-right: 15px;
        }

        .content-right {
            display: table-cell;
            width: 30%;
            vertical-align: top;
            padding-left: 15px;
        }

        .description-section,
        .technical-section {
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 5px solid #a3845b;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .section-title {
            font-size: 16px;
            font-weight: 800;
            color: #2c3e50;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .paragraph {
            font-size: 13px;
            line-height: 1.7;
            color: #34495e;
            text-align: justify;
        }

        .kv {
            margin-bottom: 8px;
            padding: 5px 0;
            border-bottom: 1px dotted #bdc3c7;
        }

        .kv-label {
            font-size: 11px;
            color: #7f8c8d;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .kv-value {
            font-size: 13px;
            font-weight: 800;
            color: #2c3e50;
            margin-top: 3px;
        }


        .footer {
    position: fixed;
    bottom: 18mm;
    left: 8mm;
    right: 8mm;
    font-size: 14px; /* Increased from 12px */
    text-align: center;
    color: #2c3e50; /* Darker for readability */
    padding: 10px;
    border-top: 3px solid #a3845b;
    background: #f1f3f4;
    font-weight: 700;
    letter-spacing: 0.3px;
}

.contact-info {
    position: fixed;
    bottom: 5mm;
    left: 8mm;
    right: 8mm;
    text-align: center;
    font-size: 13px; /* Increased from 11px */
    color: #34495e;
    font-weight: 700;
    line-height: 1.6;
}

.contact-info span {
    display: inline-block;
    margin: 0 10px;
}


        .content-wrapper {
            margin-bottom: 25mm;
        }
    </style>
</head>
<body>
    <div class="content-wrapper">
        <div class="header">
            <div class="logo-section">
                @if($logoDataUri)
                    <img src="{{ $logoDataUri }}" alt="Atelier A1" class="logo" />
                @endif
                <div class="brand">ATELIER A1</div>
            </div>
            <div class="title">{{ $project->title }}</div>
            <div class="meta">
                @if($project->location) {{ $project->location }} @endif
                @if($project->year) • {{ $project->year }} @endif
                @if($project->achievement_status) • {{ $project->achievement_status }} @endif
            </div>
            <div>
                @php $categories = ($project->categories ?? []) ?: (($project->category ?? null) ? [ $project->category ] : []); @endphp
                @foreach($categories as $cat)
                    <span class="chip">{{ $cat->name ?? 'Sans catégorie' }}</span>
                @endforeach
            </div>
        </div>

        @if(count($images) > 0)
            <div class="hero">
                @php $mainImage = collect($images)->firstWhere('type', 'main'); @endphp
                @if($mainImage)
                    <img src="{{ $mainImage['data'] }}" alt="{{ $project->title }}" />
                @endif
            </div>
        @endif

        <div class="content-row">
            <div class="content-left">
                <div class="description-section">
                    <div class="section-title">Description du Projet</div>
                    <div class="paragraph">{{ $project->description ?? 'Aucune description disponible.' }}</div>
                </div>
            </div>

            <div class="content-right">
            <div class="technical-section">
    <div class="section-title">Informations Techniques</div>

    @if($project->client_name)
        <div class="kv">
            <div class="kv-label">Maître d'Ouvrage</div>
            <div class="kv-value">{{ $project->client_name }}</div>
        </div>
    @endif

    @if($project->architect)
        <div class="kv">
            <div class="kv-label">Architecte Principal</div>
            <div class="kv-value">{{ $project->architect }}</div>
        </div>
    @endif

    @if($project->contractor)
        <div class="kv">
            <div class="kv-label">Entrepreneur</div>
            <div class="kv-value">{{ $project->contractor }}</div>
        </div>
    @endif

    @if($project->sponsors)
        <div class="kv">
            <div class="kv-label">partenaires</div>
            <div class="kv-value">
                @foreach($project->sponsors as $sponsor)
                    <span>{{ $sponsor }}</span>@if(!$loop->last), @endif
                @endforeach
            </div>
        </div>
    @endif

    @if($project->surface_area)
        <div class="kv">
            <div class="kv-label">Surface</div>
            <div class="kv-value">{{ $project->surface_area }}</div>
        </div>
    @endif

    @if($project->project_cost)
        <div class="kv">
            <div class="kv-label">Montant des Travaux</div>
            <div class="kv-value">{{ $project->project_cost }}</div>
        </div>
    @endif

    @if($project->start_year || $project->end_year)
        <div class="kv">
            <div class="kv-label">Période de Réalisation</div>
            <div class="kv-value">
                {{ $project->start_year ?? '----' }} - {{ $project->end_year ?? '----' }}
            </div>
        </div>
    @endif

    @if($project->completion_date)
        <div class="kv">
            <div class="kv-label">Date d’Achèvement</div>
            <div class="kv-value">{{ $project->completion_date }}</div>
        </div>
    @endif

    @if($project->duration_months)
        <div class="kv">
            <div class="kv-label">Durée</div>
            <div class="kv-value">{{ $project->duration_months }} mois</div>
        </div>
    @endif

    @if($project->year)
        <div class="kv">
            <div class="kv-label">Année</div>
            <div class="kv-value">{{ $project->year }}</div>
        </div>
    @endif

    @if($project->achievement_status)
        <div class="kv">
            <div class="kv-label">Statut d’Achèvement</div>
            <div class="kv-value">{{ $project->achievement_status }}</div>
        </div>
    @endif

    @if($project->status)
        <div class="kv">
            <div class="kv-label">Statut</div>
            <div class="kv-value">{{ ucfirst($project->status) }}</div>
        </div>
    @endif
</div>

            </div>
        </div>

    </div>

    <div class="footer">
        © {{ date('Y') }} Atelier A1 - Architecture & Design | {{ config('app.url') }}
    </div>

    <div class="contact-info">
        <span> +212 5 22 47 49 91</span>
        <span> info@atelierA1.com</span>
        <span> 217 angle rue Fraternité et bd Zerktouni, 3ᵉ étage, 20 000 Casablanca</span>
    </div>
</body>
</html>
