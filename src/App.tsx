import { useState, useCallback } from 'react';

// Types
interface FormData {
  buildingFunction: string;
  buildingFunctionCustom: string;
  background: string;
  backgroundCustom: string;
  geographicLocation: string;
  geographicLocationCustom: string;
  timeOfDay: string;
  weather: string;
  additionalData: string;
}

const BUILDING_FUNCTIONS = [
  { value: '', label: '-- Pilih Fungsi Bangunan --' },
  { value: 'Kompleks Pabrik / Industri', label: '🏭 Kompleks Pabrik / Industri' },
  { value: 'Sekolah / Kampus', label: '🏫 Sekolah / Kampus' },
  { value: 'Apartemen / Hunian Vertikal', label: '🏢 Apartemen / Hunian Vertikal' },
  { value: 'Rumah Sakit / Fasilitas Kesehatan', label: '🏥 Rumah Sakit / Fasilitas Kesehatan' },
  { value: 'Perkantoran', label: '🏬 Perkantoran' },
  { value: 'Hotel / Resort', label: '🏨 Hotel / Resort' },
  { value: 'Pusat Perbelanjaan / Mall', label: '🛒 Pusat Perbelanjaan / Mall' },
  { value: 'Gudang / Logistik', label: '📦 Gudang / Logistik' },
  { value: 'Stadion / Arena Olahraga', label: '🏟️ Stadion / Arena Olahraga' },
  { value: 'Tempat Ibadah', label: '🕌 Tempat Ibadah' },
  { value: 'Bandara / Terminal', label: '✈️ Bandara / Terminal' },
  { value: 'Rumah Tinggal / Villa', label: '🏠 Rumah Tinggal / Villa' },
  { value: 'Camp / Asrama', label: '🏕️ Camp / Asrama' },
  { value: 'Laboratorium / Riset', label: '🔬 Laboratorium / Riset' },
  { value: 'custom', label: '✏️ Lainnya (ketik manual)' },
];

const BACKGROUNDS = [
  { value: '', label: '-- Pilih Background --' },
  { value: 'Landscape hijau dengan pepohonan dan taman', label: '🌳 Landscape hijau dengan pepohonan dan taman' },
  { value: 'Area urban perkotaan dengan jalan dan trotoar', label: '🏙️ Area urban perkotaan dengan jalan dan trotoar' },
  { value: 'Area parkir dengan kendaraan', label: '🅿️ Area parkir dengan kendaraan' },
  { value: 'Landscape gersang / semi-arid', label: '🏜️ Landscape gersang / semi-arid' },
  { value: 'Area waterfront / tepi pantai', label: '🏖️ Area waterfront / tepi pantai' },
  { value: 'Area pegunungan / perbukitan', label: '⛰️ Area pegunungan / perbukitan' },
  { value: 'Area suburban dengan rumah-rumah sekitar', label: '🏘️ Area suburban dengan rumah-rumah sekitar' },
  { value: 'Area industri dengan bangunan pabrik sekitar', label: '🏗️ Area industri dengan bangunan pabrik sekitar' },
  { value: 'Plaza / area publik terbuka', label: '🏛️ Plaza / area publik terbuka' },
  { value: 'Hutan tropis / vegetasi lebat', label: '🌴 Hutan tropis / vegetasi lebat' },
  { value: 'custom', label: '✏️ Lainnya (ketik manual)' },
];

const GEOGRAPHIC_LOCATIONS = [
  { value: '', label: '-- Pilih Lokasi Geografis --' },
  { value: 'Jakarta, Indonesia (Tropis, dataran rendah)', label: '🇮🇩 Jakarta, Indonesia (Tropis, dataran rendah)' },
  { value: 'Surabaya, Indonesia (Tropis panas, pesisir)', label: '🇮🇩 Surabaya, Indonesia (Tropis panas, pesisir)' },
  { value: 'Bandung, Indonesia (Sub-tropis, dataran tinggi)', label: '🇮🇩 Bandung, Indonesia (Sub-tropis, dataran tinggi)' },
  { value: 'Bali, Indonesia (Tropis, pulau)', label: '🇮🇩 Bali, Indonesia (Tropis, pulau)' },
  { value: 'Medan, Indonesia (Tropis, dekat gunung)', label: '🇮🇩 Medan, Indonesia (Tropis, dekat gunung)' },
  { value: 'Kalimantan, Indonesia (Tropis, hutan hujan)', label: '🇮🇩 Kalimantan, Indonesia (Tropis, hutan hujan)' },
  { value: 'Papua, Indonesia (Tropis, pegunungan)', label: '🇮🇩 Papua, Indonesia (Tropis, pegunungan)' },
  { value: 'Singapore (Tropis, urban)', label: '🇸🇬 Singapore (Tropis, urban)' },
  { value: 'Dubai, UAE (Arid, gurun)', label: '🇦🇪 Dubai, UAE (Arid, gurun)' },
  { value: 'Tokyo, Japan (Sub-tropis, urban)', label: '🇯🇵 Tokyo, Japan (Sub-tropis, urban)' },
  { value: 'London, UK (Temperate, berawan)', label: '🇬🇧 London, UK (Temperate, berawan)' },
  { value: 'New York, USA (Temperate, 4 musim)', label: '🇺🇸 New York, USA (Temperate, 4 musim)' },
  { value: 'Sydney, Australia (Sub-tropis, pesisir)', label: '🇦🇺 Sydney, Australia (Sub-tropis, pesisir)' },
  { value: 'custom', label: '✏️ Lainnya (ketik manual)' },
];

const TIME_OPTIONS = [
  { value: '', label: '-- Pilih Waktu --' },
  { value: 'Pagi hari (Golden Hour, 06:00-08:00)', label: '🌅 Pagi hari (Golden Hour, 06:00-08:00)' },
  { value: 'Siang hari (10:00-14:00, matahari tinggi)', label: '☀️ Siang hari (10:00-14:00, matahari tinggi)' },
  { value: 'Sore hari (Golden Hour, 16:00-18:00)', label: '🌇 Sore hari (Golden Hour, 16:00-18:00)' },
  { value: 'Senja / Twilight (18:00-19:30)', label: '🌆 Senja / Twilight (18:00-19:30)' },
  { value: 'Malam hari (20:00+, pencahayaan buatan)', label: '🌃 Malam hari (20:00+, pencahayaan buatan)' },
  { value: 'Fajar / Dawn (05:00-06:00)', label: '🌄 Fajar / Dawn (05:00-06:00)' },
];

const WEATHER_OPTIONS = [
  { value: '', label: '-- Pilih Cuaca --' },
  { value: 'Cerah cerah, langit biru bersih', label: '☀️ Cerah cerah, langit biru bersih' },
  { value: 'Berawan sebagian, langit dengan awan putih', label: '⛅ Berawan sebagian, langit dengan awan putih' },
  { value: 'Mendung / overcast, langit abu-abu', label: '☁️ Mendung / overcast, langit abu-abu' },
  { value: 'Hujan ringan, permukaan basah reflektif', label: '🌧️ Hujan ringan, permukaan basah reflektif' },
  { value: 'Hujan deras, atmosfer dramatis', label: '🌧️ Hujan deras, atmosfer dramatis' },
  { value: 'Berkabut / foggy, atmosfer misterius', label: '🌫️ Berkabut / foggy, atmosfer misterius' },
  { value: 'Badai petir, atmosfer intens', label: '⛈️ Badai petir, atmosfer intens' },
  { value: 'Setelah hujan, puddle dan refleksi', label: '🌈 Setelah hujan, puddle dan refleksi' },
];

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    buildingFunction: '',
    buildingFunctionCustom: '',
    background: '',
    backgroundCustom: '',
    geographicLocation: '',
    geographicLocationCustom: '',
    timeOfDay: '',
    weather: '',
    additionalData: '',
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFieldValue = (field: string, customField: string): string => {
    if (formData[field as keyof FormData] === 'custom') {
      return formData[customField as keyof FormData] || 'Tidak ditentukan';
    }
    return formData[field as keyof FormData] || 'Tidak ditentukan';
  };

  const generatePrompt = useCallback(() => {
    const buildingFunc = getFieldValue('buildingFunction', 'buildingFunctionCustom');
    const background = getFieldValue('background', 'backgroundCustom');
    const geoLocation = getFieldValue('geographicLocation', 'geographicLocationCustom');
    const time = formData.timeOfDay || 'Tidak ditentukan';
    const weather = formData.weather || 'Tidak ditentukan';
    const additional = formData.additionalData;

    const prompt = `# PROMPT RENDERING ARSITEKTUR REALISTIK

## INSTRUKSI UTAMA (HIGHEST PRIORITY RULES)
Transform the uploaded sketch/massing model image into a photorealistic architectural rendering that looks like a real photograph. The output must be indistinguishable from an actual photograph taken on-site.

### 🚨 ABSOLUTE RULE - READ THIS FIRST:
You MUST NOT change the composition or ANY object in the reference image. This is the #1 rule and overrides all other instructions.

- DO NOT modify, move, resize, rotate, add, or remove ANY object that exists in the reference image
- DO NOT alter the composition, arrangement, or spatial relationships of ANY elements
- The reference image is SACRED - treat every pixel of existing content as unchangeable
- You may ONLY enhance existing elements with realistic textures/materials WITHOUT changing their form
- You may ONLY add new content to areas that are COMPLETELY EMPTY/BLANK in the reference
- EXCEPTION: You may modify specific elements ONLY if the user has EXPLICITLY requested it in the "ADDITIONAL CUSTOM REQUIREMENTS" section below. No other modifications are permitted.

## FUNGSI BANGUNAN
This building complex functions as: ${buildingFunc}
Apply appropriate architectural details, signage, materials, and design elements consistent with this building function.

## GEOMETRI LOCK - COMPOSITION & PERSPECTIVE (ABSOLUTE RULE)
CRITICAL: Before rendering, perform a thorough geometric and compositional analysis of the reference image:

### PERSPECTIVE LOCK:
1. Identify and LOCK all vanishing points (1-point, 2-point, or 3-point perspective)
2. Preserve ALL existing lines, edges, and proportions exactly as shown in the reference
3. Maintain the exact camera angle, height, and field of view
4. Do NOT alter, shift, or modify ANY geometric relationship between building elements
5. All vertical lines must remain vertical (unless perspective dictates otherwise)
6. All horizontal lines must converge to their correct vanishing points
7. The scale and proportion of every element must remain identical to the reference
8. DO NOT add, remove, or reposition any structural element that exists in the reference image

### COMPOSITION LOCK:
9. The OVERALL COMPOSITION must remain IDENTICAL to the reference image
10. Every object's position, size, orientation, and relationship to other objects MUST be preserved
11. The visual balance, focal points, and spatial arrangement must not change
12. Foreground, midground, and background elements must maintain their exact placement
13. Do NOT crop, extend, or alter the frame/boundary of the image in any way
14. Do NOT add new objects into the composition unless the area is completely empty AND no existing object is affected
15. The "visual weight" and hierarchy of elements must remain unchanged

## STRICT PRESERVATION RULE (MANDATORY)
⚠️ CRITICAL RULE: You are STRICTLY PROHIBITED from making ANY changes to the composition and objects in the reference image.

### ABSOLUTE PROHIBITIONS:
- Do NOT alter, move, resize, rotate, or reposition ANY object or element that exists in the reference image
- Do NOT add, remove, or modify ANY architectural element (walls, roofs, windows, doors, columns, beams, etc.)
- Do NOT change the shape, silhouette, outline, or massing of ANY building or structure
- Do NOT add, remove, or modify ANY object (trees, vehicles, people, furniture, signage, etc.) that appears in the reference
- Do NOT change the spatial relationship, relative position, or scale between ANY elements
- Do NOT alter the composition, framing, or arrangement of ANY visual elements
- Do NOT modify colors, materials, or textures of existing elements (unless explicitly requested in ADDITIONAL DATA)
- Do NOT add any new objects that would overlap, cover, or obscure existing elements in the reference image

### WHAT YOU MAY DO:
- You may ONLY add details, textures, materials, and environmental elements to areas that are COMPLETELY EMPTY or BLANK in the reference image
- You may ONLY modify elements that are EXPLICITLY specified in the "ADDITIONAL CUSTOM REQUIREMENTS" section below
- If the user requests changes to specific elements in the additional data, those specific changes are ALLOWED, but ONLY for those explicitly mentioned elements

### EXCEPTION CLAUSE:
The ONLY exception to these rules is when the user EXPLICITLY requests changes in the "ADDITIONAL CUSTOM REQUIREMENTS" section. In that case:
- Only the SPECIFICALLY MENTIONED elements may be modified
- All other elements must still follow the strict preservation rules
- The modification must be limited to exactly what was requested, nothing more

## BACKGROUND & ENVIRONMENT (for empty areas only)
Fill all empty/blank areas in the reference image with the following background:
${background}

Ensure seamless integration between the building and its surroundings. The transition must be natural and photorealistic.

## GEOGRAPHIC LOCATION & VEGETATION
Geographic location: ${geoLocation}

Based on this location:
- Use vegetation types that are NATIVE and AUTHENTIC to this geographic area
- Apply correct tree species, plant types, and landscaping appropriate for this region
- Match soil color, ground cover, and natural elements to the actual location
- Consider the local architectural context and neighboring building styles if applicable
- Apply culturally appropriate urban furniture and street elements if visible

## TIME & WEATHER CONDITIONS
Time of day: ${time}
Weather: ${weather}

Apply appropriate:
- Sun angle and shadow direction consistent with the specified time
- Color temperature of light (warm golden for golden hour, cool blue for overcast, etc.)
- Atmospheric effects (haze, humidity, rain drops, fog density as appropriate)
- Surface reflections and wetness if weather involves rain
- Sky gradient and cloud formations matching the weather condition
- Interior lighting visible through windows (more visible at night/twilight)

## MATERIAL & TEXTURE SPECIFICATION
- Apply photorealistic material textures with proper PBR (Physically Based Rendering) qualities
- Include surface imperfections, weathering, and micro-details for realism
- Glass should show proper reflections of surroundings and sky
- Concrete, metal, wood, and other materials must show authentic surface characteristics
- Include proper ambient occlusion in corners and junctions

## RENDERING QUALITY SETTINGS
- Resolution: Ultra high detail
- Camera: DSLR-quality, 35mm-50mm equivalent focal length
- Depth of field: Slight, keeping entire building in focus
- Color grading: Natural, photorealistic color science
- Dynamic range: HDR-quality with proper exposure
- Anti-aliasing: Perfect, no jagged edges
- Global illumination: Physically accurate light bouncing and color bleeding

${additional ? `## ADDITIONAL CUSTOM REQUIREMENTS (USER-SPECIFIED EXCEPTIONS)
The following are EXPLICIT exceptions granted by the user. ONLY these specific modifications are allowed:
${additional}

⚠️ IMPORTANT: Any modification NOT listed above is STRICTLY PROHIBITED. All other elements from the reference image must remain completely unchanged.
` : `## NO ADDITIONAL MODIFICATIONS REQUESTED
The user has NOT requested any modifications to existing elements. ALL elements in the reference image must be preserved EXACTLY as-is without any changes whatsoever. Only empty/blank areas may be filled with environmental context.
`}## OUTPUT REQUIREMENTS
The final image must:
1. Look like a photograph taken with a professional camera on-site
2. Have consistent lighting across all elements
3. Show proper atmospheric perspective (distant elements slightly hazier)
4. Include subtle environmental details (dust particles, light rays, etc.)
5. Have no AI artifacts, warping, or unrealistic elements
6. Maintain EXACT geometric fidelity to the reference image
7. Preserve EVERY SINGLE OBJECT and its exact position from the reference image
8. Maintain the IDENTICAL composition - no element may be moved, added, or removed
9. All existing objects must be rendered with enhanced realism but UNCHANGED in form, position, and proportion
10. The only differences between the reference and output should be: (a) added realism/detail to empty areas, (b) enhanced material textures on existing surfaces, and (c) any EXPLICITLY requested changes in the additional data section

## FINAL VERIFICATION CHECKLIST
Before finalizing the output, verify:
☐ Every object from the reference is present in the exact same position
☐ No new objects have been placed on top of existing elements
☐ The composition is identical to the reference
☐ All geometric relationships are preserved
☐ Only empty areas have been filled with contextual elements
☐ Any modifications match EXACTLY what was requested in additional data (if any)
☐ No elements have been accidentally removed, hidden, or obscured`;

    setGeneratedPrompt(prompt);
    setCopied(false);
  }, [formData]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = generatedPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const sections = [
    {
      id: 0,
      title: 'Fungsi Bangunan',
      icon: '🏗️',
      description: 'Tentukan fungsi utama bangunan untuk konteks yang tepat',
    },
    {
      id: 1,
      title: 'Background & Lingkungan',
      icon: '🌿',
      description: 'Atur area kosong pada gambar referensi',
    },
    {
      id: 2,
      title: 'Lokasi Geografis',
      icon: '📍',
      description: 'Tentukan lokasi untuk vegetasi & iklim yang sesuai',
    },
    {
      id: 3,
      title: 'Waktu & Cuaca',
      icon: '🌤️',
      description: 'Kondisi pencahayaan dan atmosfer',
    },
    {
      id: 4,
      title: 'Data Tambahan',
      icon: '📝',
      description: 'Informasi tambahan sesuai kebutuhan',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
            🎨
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Render Prompt Generator
            </h1>
            <p className="text-xs text-slate-400">Sketch to Photorealistic Rendering</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm text-slate-300">
                <strong className="text-blue-300">Cara Penggunaan:</strong> Isi konfigurasi di bawah ini,
                lalu generate prompt AI yang komprehensif untuk mengubah gambar sket/massing menjadi rendering fotorealistik.
                Prompt yang dihasilkan memiliki aturan ketat untuk mempertahankan geometri dan tidak menambahkan objek di area yang sudah terisi.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-5">
            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    activeSection === section.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="hidden sm:inline">{section.title}</span>
                </button>
              ))}
            </div>

            {/* Form Sections */}
            <div className="space-y-6">
              {/* Section 0: Building Function */}
              {activeSection === 0 && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🏗️</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">Fungsi Bangunan</h2>
                      <p className="text-xs text-slate-400">Tentukan fungsi utama bangunan/kompleks</p>
                    </div>
                  </div>
                  
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Jenis Fungsi Bangunan
                  </label>
                  <select
                    value={formData.buildingFunction}
                    onChange={(e) => handleChange('buildingFunction', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    {BUILDING_FUNCTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {formData.buildingFunction === 'custom' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Ketik Fungsi Bangunan
                      </label>
                      <input
                        type="text"
                        value={formData.buildingFunctionCustom}
                        onChange={(e) => handleChange('buildingFunctionCustom', e.target.value)}
                        placeholder="Contoh: Kompleks Pergudangan Modern..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  )}

                  <div className="mt-4 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">💡 Tips:</strong> Fungsi bangunan mempengaruhi detail arsitektur, 
                      material, signage, dan elemen kontekstual yang akan ditambahkan AI pada area kosong.
                    </p>
                  </div>
                </div>
              )}

              {/* Section 1: Background */}
              {activeSection === 1 && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🌿</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">Background & Lingkungan</h2>
                      <p className="text-xs text-slate-400">Isi area kosong pada gambar referensi</p>
                    </div>
                  </div>
                  
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Background / Lingkungan Sekitar
                  </label>
                  <select
                    value={formData.background}
                    onChange={(e) => handleChange('background', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    {BACKGROUNDS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {formData.background === 'custom' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Deskripsikan Background
                      </label>
                      <textarea
                        value={formData.backgroundCustom}
                        onChange={(e) => handleChange('backgroundCustom', e.target.value)}
                        placeholder="Deskripsikan area kosong yang ingin diisi pada gambar referensi..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>
                  )}

                  <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-300">
                      <strong>⚠️ Penting:</strong> Background hanya akan ditambahkan pada area yang KOSONG pada gambar referensi. 
                      Elemen yang sudah ada pada gambar TIDAK akan ditimpa atau diubah.
                    </p>
                  </div>
                </div>
              )}

              {/* Section 2: Geographic Location */}
              {activeSection === 2 && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📍</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">Lokasi Geografis</h2>
                      <p className="text-xs text-slate-400">Vegetasi & iklim sesuai lokasi nyata</p>
                    </div>
                  </div>
                  
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lokasi Geografis
                  </label>
                  <select
                    value={formData.geographicLocation}
                    onChange={(e) => handleChange('geographicLocation', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    {GEOGRAPHIC_LOCATIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {formData.geographicLocation === 'custom' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Ketik Lokasi Geografis
                      </label>
                      <input
                        type="text"
                        value={formData.geographicLocationCustom}
                        onChange={(e) => handleChange('geographicLocationCustom', e.target.value)}
                        placeholder="Contoh: Nairobi, Kenya (Tropis, dataran tinggi 1800mdpl)..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  )}

                  <div className="mt-4 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">🌱 Efek Lokasi:</strong> AI akan menyesuaikan jenis vegetasi, 
                      warna tanah, iklim visual, dan elemen kontekstual sesuai lokasi geografis yang dipilih.
                    </p>
                  </div>
                </div>
              )}

              {/* Section 3: Time & Weather */}
              {activeSection === 3 && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🌤️</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">Waktu & Cuaca</h2>
                      <p className="text-xs text-slate-400">Kondisi pencahayaan dan atmosfer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Waktu dalam Hari
                      </label>
                      <select
                        value={formData.timeOfDay}
                        onChange={(e) => handleChange('timeOfDay', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      >
                        {TIME_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Kondisi Cuaca
                      </label>
                      <select
                        value={formData.weather}
                        onChange={(e) => handleChange('weather', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      >
                        {WEATHER_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">🎬 Efek:</strong> Waktu dan cuaca mempengaruhi arah bayangan, 
                      temperatur warna, refleksi permukaan, dan atmosfer keseluruhan rendering.
                    </p>
                  </div>
                </div>
              )}

              {/* Section 4: Additional Data */}
              {activeSection === 4 && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📝</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">Data Tambahan</h2>
                      <p className="text-xs text-slate-400">Informasi tambahan sesuai kebutuhan</p>
                    </div>
                  </div>
                  
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Data / Instruksi Tambahan
                  </label>
                  <textarea
                    value={formData.additionalData}
                    onChange={(e) => handleChange('additionalData', e.target.value)}
                    placeholder={`Contoh instruksi tambahan:\n- Material fasad: kombinasi kaca dan ACP warna silver\n- Tambahkan landscape design dengan kolam refleksi di depan\n- Style arsitektur: modern industrial\n- Tambahkan signage perusahaan di fasad utama\n- Warna dominan: putih dan abu-abu\n- Tambahkan human scale figures untuk referensi skala\n- dll.`}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  />

                  <div className="mt-4 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">📋 Contoh data tambahan:</strong> Spesifikasi material, 
                      gaya arsitektur, elemen landscape khusus, signage, human figures, kendaraan, 
                      detail interior yang terlihat, preferensi color grading, referensi style, dll.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  disabled={activeSection === 0}
                  className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
                >
                  ← Sebelumnya
                </button>
                <span className="text-xs text-slate-500">
                  {activeSection + 1} / {sections.length}
                </span>
                {activeSection < sections.length - 1 ? (
                  <button
                    onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                    className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-all text-sm"
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <button
                    onClick={generatePrompt}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm"
                  >
                    ✨ Generate Prompt
                  </button>
                )}
              </div>
            </div>

            {/* Quick Generate Button */}
            <div className="mt-6">
              <button
                onClick={generatePrompt}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>✨</span>
                <span>Generate Prompt Rendering</span>
              </button>
            </div>
          </div>

          {/* Right Panel - Preview & Output */}
          <div className="lg:col-span-7">
            {/* Configuration Summary */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                📋 Ringkasan Konfigurasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SummaryItem
                  label="Fungsi Bangunan"
                  value={getFieldValue('buildingFunction', 'buildingFunctionCustom')}
                />
                <SummaryItem
                  label="Background"
                  value={getFieldValue('background', 'backgroundCustom')}
                />
                <SummaryItem
                  label="Lokasi"
                  value={getFieldValue('geographicLocation', 'geographicLocationCustom')}
                />
                <SummaryItem
                  label="Waktu"
                  value={formData.timeOfDay || 'Belum dipilih'}
                />
                <SummaryItem
                  label="Cuaca"
                  value={formData.weather || 'Belum dipilih'}
                />
                <SummaryItem
                  label="Data Tambahan"
                  value={formData.additionalData ? `${formData.additionalData.substring(0, 50)}...` : 'Tidak ada'}
                />
              </div>
            </div>

            {/* Rules Reminder */}
            <div className="bg-red-500/5 rounded-2xl border border-red-500/20 p-5 mb-6">
              <h3 className="text-sm font-semibold text-red-300 mb-3 flex items-center gap-2">
                <span>⚠️</span> Aturan Ketat dalam Prompt (Strict Rules)
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">●</span>
                  <span><strong className="text-red-300">DILARANG KERAS</strong> mengubah komposisi, posisi, ukuran, atau orientasi objek APAPUN yang ada di gambar referensi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">●</span>
                  <span><strong className="text-red-300">DILARANG</strong> menambahkan, menghapus, atau memodifikasi elemen arsitektur yang sudah ada (dinding, atap, jendela, pintu, kolom, dll)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">●</span>
                  <span><strong className="text-red-300">DILARANG</strong> menambahkan benda apapun yang menutupi/menimpa elemen yang sudah ada di gambar referensi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">●</span>
                  <span>HANYA boleh mengisi area yang BENAR-BENAR KOSONG pada gambar referensi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">●</span>
                  <span>Geometri, perspektif, dan komposisi WAJIB dipertahankan persis seperti referensi (LOCK TOTAL)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">●</span>
                  <span>Semua garis, bentuk, proporsi, dan hubungan spasial harus identik dengan gambar asli</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">●</span>
                  <span><strong className="text-green-300">PENGECUALIAN:</strong> Perubahan hanya diperbolehkan JIKA diminta secara eksplisit di kolom "Data Tambahan"</span>
                </li>
              </ul>
            </div>

            {/* Generated Prompt Output */}
            {generatedPrompt && (
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/80">
                  <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <span>📄</span> Prompt yang Dihasilkan
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      copied
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                    }`}
                  >
                    {copied ? (
                      <>
                        <span>✅</span>
                        <span>Ter-copy!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!generatedPrompt && (
              <div className="bg-slate-800/30 rounded-2xl border border-slate-700/30 p-12 text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold text-slate-400 mb-2">
                  Prompt Belum Dihasilkan
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Lengkapi konfigurasi di sebelah kiri, lalu klik tombol "Generate Prompt Rendering" 
                  untuk menghasilkan prompt AI yang komprehensif.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>AI Render Prompt Generator — Sketch to Photorealistic Architecture Rendering</p>
          <p className="mt-1">Prompt dioptimalkan untuk Midjourney, DALL-E, Stable Diffusion, dan AI image generator lainnya</p>
        </div>
      </footer>
    </div>
  );
}

// Summary Item Component
function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/20">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-sm text-slate-300 truncate" title={value}>
        {value}
      </p>
    </div>
  );
}
