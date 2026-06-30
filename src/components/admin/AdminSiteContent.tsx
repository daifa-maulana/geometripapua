import React, { useEffect, useRef, useState } from 'react';
import {
  SiteSettings,
  ServiceDetail,
  Branch,
  Project,
  HeroSlide,
  BrandItem,
  Partner,
} from '../../types';
import {
  saveBranches as persistBranches,
  savePortfolio as persistPortfolio,
  saveServices as persistServices,
  saveSiteSettings as persistSiteSettings,
  saveBrandsData as persistBrands,
  savePartnersData as persistPartners,
} from '../../lib/supabaseContent';
import { DEFAULT_SITE_SETTINGS } from '../../lib/siteContent';
import ImageUploadField from './ImageUploadField';
import {
  Plus, Edit, Trash2, Save, X, Home, Wrench, MapPin, FolderKanban, Phone, Award, Globe,
} from 'lucide-react';

type ContentTab = 'beranda' | 'layanan' | 'cabang' | 'portofolio' | 'kontak' | 'brands';

interface AdminSiteContentProps {
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  services: ServiceDetail[];
  setServices: React.Dispatch<React.SetStateAction<ServiceDetail[]>>;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  portfolio: Project[];
  setPortfolio: React.Dispatch<React.SetStateAction<Project[]>>;
  brands: BrandItem[];
  setBrands: React.Dispatch<React.SetStateAction<BrandItem[]>>;
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  showNotif: (message: string, type?: 'success' | 'error') => void;
}

export default function AdminSiteContent({
  siteSettings,
  setSiteSettings,
  services,
  setServices,
  branches,
  setBranches,
  portfolio,
  setPortfolio,
  brands,
  setBrands,
  partners,
  setPartners,
  showNotif,
}: AdminSiteContentProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>('beranda');

  const saveSettings = async (updated: SiteSettings) => {
    setSiteSettings(updated);
    try {
      await persistSiteSettings(updated);
      showNotif('Pengaturan halaman berhasil disimpan!');
    } catch {
      showNotif('Gagal menyimpan pengaturan halaman ke Supabase.', 'error');
    }
  };

  const saveServices = async (updated: ServiceDetail[]) => {
    setServices(updated);
    try {
      await persistServices(updated);
      showNotif('Data layanan berhasil disimpan!');
    } catch {
      showNotif('Gagal menyimpan data layanan ke Supabase.', 'error');
    }
  };

  const saveBranches = async (updated: Branch[]) => {
    setBranches(updated);
    try {
      await persistBranches(updated);
      showNotif('Data cabang berhasil disimpan!');
    } catch {
      showNotif('Gagal menyimpan data cabang ke Supabase.', 'error');
    }
  };

  const savePortfolio = async (updated: Project[]) => {
    setPortfolio(updated);
    try {
      await persistPortfolio(updated);
      showNotif('Data portofolio berhasil disimpan!');
    } catch {
      showNotif('Gagal menyimpan data portofolio ke Supabase.', 'error');
    }
  };

  const saveBrands = async (updated: BrandItem[]) => {
    setBrands(updated);
    try {
      await persistBrands(updated);
      showNotif('Data brand berhasil disimpan!');
    } catch {
      showNotif('Gagal menyimpan brand ke Supabase.', 'error');
    }
  };

  const savePartners = async (updated: Partner[]) => {
    setPartners(updated);
    try {
      await persistPartners(updated);
      showNotif('Data mitra berhasil disimpan!');
    } catch {
      showNotif('Gagal menyimpan mitra ke Supabase.', 'error');
    }
  };

  const tabs: { id: ContentTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'layanan', label: 'Layanan', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'cabang', label: 'Cabang', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'portofolio', label: 'Portofolio', icon: <FolderKanban className="w-3.5 h-3.5" /> },
    { id: 'brands', label: 'Brand & Mitra', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'kontak', label: 'Kontak & Tentang', icon: <Phone className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-brand-gray-4 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-brand-red text-white shadow-sm'
                : 'bg-white border border-brand-gray-4 text-brand-gray-2 hover:border-brand-red hover:text-brand-red'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'beranda' && (
        <BerandaTab
          settings={siteSettings}
          onSave={saveSettings}
          showNotif={showNotif}
        />
      )}
      {activeTab === 'layanan' && (
        <LayananTab services={services} onSave={saveServices} showNotif={showNotif} />
      )}
      {activeTab === 'cabang' && (
        <CabangTab branches={branches} onSave={saveBranches} showNotif={showNotif} />
      )}
      {activeTab === 'portofolio' && (
        <PortofolioTab portfolio={portfolio} onSave={savePortfolio} showNotif={showNotif} />
      )}
      {activeTab === 'brands' && (
        <BrandsMitraTab
          settings={siteSettings}
          onSaveSettings={saveSettings}
          brands={brands}
          onSaveBrands={saveBrands}
          partners={partners}
          onSavePartners={savePartners}
          showNotif={showNotif}
        />
      )}
      {activeTab === 'kontak' && (
        <KontakTab settings={siteSettings} onSave={saveSettings} showNotif={showNotif} />
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  autoFocus?: boolean;
}) {
  const cls =
    'w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black';
  return (
    <div>
      <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={cls} autoFocus={autoFocus} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} autoFocus={autoFocus} />
      )}
    </div>
  );
}

function BerandaTab({
  settings,
  onSave,
  showNotif,
}: {
  settings: SiteSettings;
  onSave: (s: SiteSettings) => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [draft, setDraft] = useState(settings);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideForm, setSlideForm] = useState<HeroSlide>({ id: 0, src: '', alt: '', caption: '' });

  const updateHero = (patch: Partial<typeof draft.hero>) =>
    setDraft((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
  const updateHome = (patch: Partial<typeof draft.home>) =>
    setDraft((d) => ({ ...d, home: { ...d.home, ...patch } }));

  const openSlideForm = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setSlideForm({ ...slide });
    } else {
      setEditingSlide(null);
      setSlideForm({ id: Date.now(), src: '', alt: '', caption: '' });
    }
    setShowSlideModal(true);
  };

  const saveSlide = () => {
    if (!slideForm.src.trim()) {
      showNotif('Gambar slide wajib diisi!', 'error');
      return;
    }
    const slides = editingSlide
      ? draft.hero.slides.map((s) => (s.id === editingSlide.id ? slideForm : s))
      : [...draft.hero.slides, slideForm];
    updateHero({ slides });
    setShowSlideModal(false);
    setEditingSlide(null);
    showNotif('Slide hero disimpan!');
  };

  const closeSlideModal = () => {
    setShowSlideModal(false);
    setEditingSlide(null);
  };

  const deleteSlide = (id: number) => {
    if (window.confirm('Hapus slide ini?')) {
      updateHero({ slides: draft.hero.slides.filter((s) => s.id !== id) });
      showNotif('Slide dihapus.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Hero Slider</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {draft.hero.slides.map((slide) => (
            <div key={slide.id} className="relative group">
              <div className="aspect-video bg-brand-gray-5 rounded-lg overflow-hidden border border-brand-gray-4">
                {slide.src ? (
                  <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-gray-3 text-xs">No Image</div>
                )}
              </div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => openSlideForm(slide)} className="flex-1 bg-brand-gray-5 hover:bg-brand-gray-4 border border-brand-gray-4 py-2 px-3 rounded-lg text-[10px] font-bold uppercase cursor-pointer">
                  <Edit className="w-3 h-3 inline mr-1" /> Edit
                </button>
                <button onClick={() => deleteSlide(slide.id)} className="bg-rose-50 hover:bg-rose-100 border border-rose-100 py-2 px-3 rounded-lg cursor-pointer">
                  <Trash2 className="w-3 h-3 text-brand-red" />
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => openSlideForm()} className="aspect-video bg-brand-gray-5 hover:bg-brand-gray-4 border-2 border-dashed border-brand-gray-4 rounded-lg flex flex-col items-center justify-center cursor-pointer">
            <Plus className="w-6 h-6 text-brand-gray-3 mb-2" />
            <span className="text-[10px] font-bold uppercase text-brand-gray-3">Tambah Slide</span>
          </button>
        </div>
      </section>

      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Home Section</h3>
        <Field label="Judul Utama" value={draft.home.title} onChange={(v) => updateHome({ title: v })} />
        <Field label="Subjudul" value={draft.home.subtitle} onChange={(v) => updateHome({ subtitle: v })} />
        <Field label="Deskripsi" value={draft.home.description} onChange={(v) => updateHome({ description: v })} multiline rows={4} />
        <Field label="Teks CTA Button" value={draft.home.ctaText} onChange={(v) => updateHome({ ctaText: v })} />
        <Field label="Link CTA Button" value={draft.home.ctaLink} onChange={(v) => updateHome({ ctaLink: v })} />
      </section>

      <button onClick={() => onSave(draft)} className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer">
        <Save className="w-4 h-4" /> Simpan Pengaturan Beranda
      </button>

      {showSlideModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={closeSlideModal} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
              <button onClick={closeSlideModal} className="absolute right-4 top-4 p-2 rounded-full hover:bg-brand-gray-5 cursor-pointer"><X className="w-5 h-5" /></button>
              <h3 className="font-display font-black text-xl mb-5">{editingSlide ? 'Edit Slide' : 'Tambah Slide Baru'}</h3>
              <div className="space-y-4">
                <ImageUploadField label="Gambar Slide" value={slideForm.src || ''} onChange={(v) => setSlideForm({ ...slideForm, src: v })} onUploadSuccess={() => showNotif('Gambar slide berhasil diunggah!')} onUploadError={(m) => showNotif(m, 'error')} />
                <Field label="Alt Text" value={slideForm.alt || ''} onChange={(v) => setSlideForm({ ...slideForm, alt: v })} />
                <Field label="Caption" value={slideForm.caption || ''} onChange={(v) => setSlideForm({ ...slideForm, caption: v })} multiline rows={2} />
                <button onClick={saveSlide} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">Simpan Slide</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LayananTab({
  services,
  onSave,
  showNotif,
}: {
  services: ServiceDetail[];
  onSave: (s: ServiceDetail[]) => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [draft, setDraft] = useState(services);

  const updateService = <K extends keyof ServiceDetail>(index: number, field: K, value: ServiceDetail[K]) => {
    const updated = [...draft];
    updated[index] = { ...updated[index], [field]: value } as ServiceDetail;
    setDraft(updated);
  };

  const addService = () => {
    setDraft([
      ...draft,
      {
        id: `service-${Date.now()}`,
        num: String(draft.length + 1).padStart(2, '0'),
        title: '',
        description: '',
        iconName: '',
        image: '',
        bullets: [],
      },
    ]);
  };

  const deleteService = (index: number) => {
    if (window.confirm('Hapus layanan ini?')) {
      setDraft(draft.filter((_, i) => i !== index));
      showNotif('Layanan dihapus.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-black text-lg text-brand-black">Layanan</h3>
        <button onClick={addService} className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Tambah Layanan
        </button>
      </div>

      {draft.map((service, index) => (
        <div key={service.id} className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-brand-gray-4 pb-3">
            <h4 className="font-display font-black text-sm text-brand-black">Layanan #{index + 1}</h4>
            <button onClick={() => deleteService(index)} className="bg-rose-50 hover:bg-rose-100 border border-rose-100 p-2 rounded-lg cursor-pointer">
              <Trash2 className="w-4 h-4 text-brand-red" />
            </button>
          </div>
          <Field label="Nomor Layanan" value={service.num} onChange={(v) => updateService(index, 'num', v)} />
          <Field label="Judul Layanan" value={service.title} onChange={(v) => updateService(index, 'title', v)} />
          <ImageUploadField
            label="Gambar Layanan"
            value={service.image || ''}
            onChange={(v) => updateService(index, 'image', v)}
            onUploadSuccess={() => showNotif('Gambar layanan berhasil diunggah!')}
            onUploadError={(m) => showNotif(m, 'error')}
          />
          <Field label="Deskripsi" value={service.description} onChange={(v) => updateService(index, 'description', v)} multiline rows={3} />
          <Field label="Nama Icon (lucide-react)" value={service.iconName} onChange={(v) => updateService(index, 'iconName', v)} />
          <Field
            label="Butir Layanan (pisahkan baris baru)"
            value={service.bullets.join('\n')}
            onChange={(v) => updateService(index, 'bullets', v.split('\n').map((item) => item.trim()).filter(Boolean))}
            multiline
            rows={4}
          />
        </div>
      ))}

      <button onClick={() => onSave(draft)} className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer">
        <Save className="w-4 h-4" /> Simpan Layanan
      </button>
    </div>
  );
}

function CabangTab({
  branches,
  onSave,
  showNotif,
}: {
  branches: Branch[];
  onSave: (b: Branch[]) => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [draft, setDraft] = useState(branches);
  const [newBranchId, setNewBranchId] = useState<string | null>(null);
  const newBranchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!newBranchId) return;
    const target = newBranchRef.current;
    const timeout = window.setTimeout(() => {
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setNewBranchId(null);
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [newBranchId]);

  const updateBranch = (index: number, field: keyof Branch, value: string) => {
    const updated = [...draft];
    updated[index] = { ...updated[index], [field]: value };
    setDraft(updated);
  };

  const addBranch = () => {
    const branch = {
      id: `branch-${Date.now()}`,
      name: '',
      region: '',
      image: '',
      address: '',
      phone: '',
      email: '',
      website: ''
    };
    setDraft([branch, ...draft]);
    setNewBranchId(branch.id);
  };

  const deleteBranch = (index: number) => {
    if (window.confirm('Hapus cabang ini?')) {
      setDraft(draft.filter((_, i) => i !== index));
      showNotif('Cabang dihapus.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display font-black text-lg text-brand-black">Cabang</h3>
          <p className="text-[11px] text-brand-gray-2 mt-1 max-w-2xl">
            Tambahkan dan sunting data cabang dengan website, region, telepon, email, dan alamat. Data ini akan membantu admin memahami struktur jaringan cabang lebih cepat.
          </p>
        </div>
        <button onClick={addBranch} className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Tambah Cabang
        </button>
      </div>

      {draft.map((branch, index) => (
        <div
          key={branch.id}
          ref={branch.id === newBranchId ? newBranchRef : null}
          className="bg-white border border-brand-gray-4 rounded-xl p-4 space-y-3"
        >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-brand-gray-4 pb-3">
            <div>
              <h4 className="font-display font-black text-sm text-brand-black">
                {branch.name ? `Cabang ${branch.name}` : `Cabang #${index + 1}`}
              </h4>
              <p className="text-[11px] text-brand-gray-2 mt-1">
                Lengkapi data cabang dengan region, website, telepon, email, dan alamat agar lebih mudah dipelajari.
              </p>
            </div>
            <button onClick={() => deleteBranch(index)} className="bg-rose-50 hover:bg-rose-100 border border-rose-100 p-2 rounded-lg cursor-pointer text-brand-red">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <Field label="Nama Cabang" value={branch.name} onChange={(v) => updateBranch(index, 'name', v)} autoFocus={branch.id === newBranchId} />
            <Field label="Region Cabang" value={branch.region} onChange={(v) => updateBranch(index, 'region', v)} />
            <ImageUploadField
              label="Gambar Cabang"
              value={branch.image || ''}
              onChange={(v) => updateBranch(index, 'image', v)}
              onUploadSuccess={() => showNotif('Gambar cabang berhasil diunggah!')}
              onUploadError={(m) => showNotif(m, 'error')}
            />
            <Field label="Website Cabang" value={branch.website || ''} onChange={(v) => updateBranch(index, 'website', v)} />
            <Field label="Telepon" value={branch.phone} onChange={(v) => updateBranch(index, 'phone', v)} />
            <Field label="Email" value={branch.email || ''} onChange={(v) => updateBranch(index, 'email', v)} />
            <Field label="Alamat" value={branch.address} onChange={(v) => updateBranch(index, 'address', v)} multiline rows={2} />
          </div>
        </div>
      ))}

      <button onClick={() => onSave(draft)} className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer">
        <Save className="w-4 h-4" /> Simpan Cabang
      </button>
    </div>
  );
}

function PortofolioTab({
  portfolio,
  onSave,
  showNotif,
}: {
  portfolio: Project[];
  onSave: (p: Project[]) => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [draft, setDraft] = useState(portfolio);

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...draft];
    updated[index] = { ...updated[index], [field]: value };
    setDraft(updated);
  };

  const addProject = () => {
    setDraft([...draft, { id: `project-${Date.now()}`, title: '', description: '', image: '', category: '' }]);
  };

  const deleteProject = (index: number) => {
    if (window.confirm('Hapus proyek ini?')) {
      setDraft(draft.filter((_, i) => i !== index));
      showNotif('Proyek dihapus.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-black text-lg text-brand-black">Portofolio</h3>
        <button onClick={addProject} className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Tambah Proyek
        </button>
      </div>

      {draft.map((project, index) => (
        <div key={project.id} className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-brand-gray-4 pb-3">
            <h4 className="font-display font-black text-sm text-brand-black">Proyek #{index + 1}</h4>
            <button onClick={() => deleteProject(index)} className="bg-rose-50 hover:bg-rose-100 border border-rose-100 p-2 rounded-lg cursor-pointer">
              <Trash2 className="w-4 h-4 text-brand-red" />
            </button>
          </div>
          <Field label="Judul Proyek" value={project.title} onChange={(v) => updateProject(index, 'title', v)} />
          <Field label="Deskripsi" value={project.description} onChange={(v) => updateProject(index, 'description', v)} multiline rows={3} />
          <Field label="Kategori" value={project.category} onChange={(v) => updateProject(index, 'category', v)} />
          <ImageUploadField label="Gambar Proyek" value={project.image || ''} onChange={(v) => updateProject(index, 'image', v)} onUploadSuccess={() => showNotif('Gambar proyek berhasil diunggah!')} onUploadError={(m) => showNotif(m, 'error')} />
        </div>
      ))}

      <button onClick={() => onSave(draft)} className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer">
        <Save className="w-4 h-4" /> Simpan Portofolio
      </button>
    </div>
  );
}

function BrandsMitraTab({
  settings,
  onSaveSettings,
  brands,
  onSaveBrands,
  partners,
  onSavePartners,
  showNotif,
}: {
  settings: SiteSettings;
  onSaveSettings: (s: SiteSettings) => void;
  brands: BrandItem[];
  onSaveBrands: (b: BrandItem[]) => void;
  partners: Partner[];
  onSavePartners: (p: Partner[]) => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [draftSettings, setDraftSettings] = useState(settings);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [brandForm, setBrandForm] = useState<BrandItem>({ name: '', origin: '', logo: '' });

  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerForm, setPartnerForm] = useState<Partner>({ id: '', name: '', logo: '', description: '', category: '' });

  const openBrandForm = (brand?: BrandItem) => {
    if (brand) {
      setEditingBrand(brand);
      setBrandForm({ ...brand });
    } else {
      setEditingBrand(null);
      setBrandForm({ name: '', origin: '', logo: '' });
    }
    setShowBrandModal(true);
  };

  const saveBrand = () => {
    if (!brandForm.name.trim()) { showNotif('Nama brand wajib diisi!', 'error'); return; }
    const updatedBrands = editingBrand
      ? brands.map((b) => b.name === editingBrand.name && b.origin === editingBrand.origin ? brandForm : b)
      : [...brands, brandForm];
    onSaveBrands(updatedBrands);
    setShowBrandModal(false);
    setEditingBrand(null);
    setBrandForm({ name: '', origin: '', logo: '' });
  };

  const deleteBrand = (name: string, origin: string) => {
    if (window.confirm(`Hapus brand "${name}"?`)) {
      onSaveBrands(brands.filter((b) => !(b.name === name && b.origin === origin)));
    }
  };

  const openPartnerForm = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setPartnerForm({ ...partner });
    } else {
      setEditingPartner(null);
      setPartnerForm({ id: `partner-${Date.now()}`, name: '', logo: '', description: '', category: '' });
    }
    setShowPartnerModal(true);
  };

  const savePartner = () => {
    if (!partnerForm.name.trim()) { showNotif('Nama mitra wajib diisi!', 'error'); return; }
    const updatedPartners = editingPartner
      ? partners.map((p) => p.id === editingPartner.id ? partnerForm : p)
      : [...partners, partnerForm];
    onSavePartners(updatedPartners);
    setShowPartnerModal(false);
    setEditingPartner(null);
    setPartnerForm({ id: '', name: '', logo: '', description: '', category: '' });
  };

  const deletePartner = (id: string, name: string) => {
    if (window.confirm(`Hapus mitra "${name}"?`)) {
      onSavePartners(partners.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* BRAND DISTRIBUTOR */}
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-brand-gray-4 pb-3">
          <div>
            <h3 className="font-display font-black text-lg text-brand-black">Brand Distributor</h3>
            <p className="text-[11px] text-brand-gray-2 mt-0.5">Logo brand yang tampil sebagai marquee di Beranda.</p>
          </div>
          <button onClick={() => openBrandForm()} className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer shrink-0">
            <Plus className="w-3 h-3" /> Tambah Brand
          </button>
        </div>
        {brands.length === 0 ? (
          <div className="py-10 text-center text-brand-gray-3 text-sm">Belum ada brand. Klik "Tambah Brand".</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {brands.map((br, idx) => (
              <div key={idx} className="border border-brand-gray-4 rounded-xl p-3 flex flex-col items-center text-center group relative hover:border-brand-red transition-colors">
                <div className="w-full h-14 flex items-center justify-center bg-brand-gray-5 rounded-lg mb-2 overflow-hidden">
                  {br.logo
                    ? <img src={br.logo} alt={br.name} className="h-10 w-auto max-w-full object-contain" />
                    : <span className="font-display font-black text-xs text-brand-gray-3 uppercase tracking-wider">{br.name.slice(0,4)}</span>
                  }
                </div>
                <span className="font-display font-black text-xs text-brand-black leading-tight">{br.name}</span>
                {br.origin && <span className="text-[9px] text-brand-gray-2 uppercase font-bold mt-0.5">{br.origin}</span>}
                <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openBrandForm(br)} className="bg-white p-1.5 rounded-lg shadow-sm border border-brand-gray-4 cursor-pointer"><Edit className="w-3 h-3" /></button>
                  <button onClick={() => deleteBrand(br.name, br.origin)} className="bg-rose-50 p-1.5 rounded-lg shadow-sm border border-rose-100 cursor-pointer"><Trash2 className="w-3 h-3 text-brand-red" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MITRA STRATEGIS */}
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-brand-gray-4 pb-3">
          <div>
            <h3 className="font-display font-black text-lg text-brand-black">Mitra Strategis</h3>
            <p className="text-[11px] text-brand-gray-2 mt-0.5">Mitra yang tampil di halaman Beranda.</p>
          </div>
          <button onClick={() => openPartnerForm()} className="bg-brand-red hover:bg-brand-red-hover text-white py-2 px-4 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer shrink-0">
            <Plus className="w-3 h-3" /> Tambah Mitra
          </button>
        </div>
        {partners.length === 0 ? (
          <div className="py-10 text-center text-brand-gray-3 text-sm">Belum ada mitra. Klik "Tambah Mitra".</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partners.map((p) => (
              <div key={p.id} className="border border-brand-gray-4 rounded-xl p-4 flex items-center gap-3 group relative hover:border-brand-red transition-colors">
                <div className="w-14 h-14 bg-brand-gray-5 rounded-xl flex items-center justify-center shrink-0 border border-brand-gray-4 overflow-hidden">
                  {p.logo ? <img src={p.logo} alt={p.name} className="w-full h-full object-contain p-1" /> : <Award className="w-5 h-5 text-brand-gray-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-display font-black text-sm text-brand-black block truncate">{p.name}</span>
                  {p.description && <span className="text-[10px] text-brand-gray-2 block line-clamp-1 mt-0.5">{p.description}</span>}
                  {p.category && <span className="text-[9px] font-bold text-brand-red uppercase tracking-wider mt-1 block">{p.category}</span>}
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button onClick={() => openPartnerForm(p)} className="bg-brand-gray-5 p-1.5 rounded-lg cursor-pointer border border-brand-gray-4"><Edit className="w-3 h-3" /></button>
                  <button onClick={() => deletePartner(p.id, p.name)} className="bg-rose-50 p-1.5 rounded-lg cursor-pointer border border-rose-100"><Trash2 className="w-3 h-3 text-brand-red" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Pengaturan Footer</h3>
        <Field label="Deskripsi Perusahaan di Footer" value={draftSettings.footer.companyDescription} onChange={(v) => setDraftSettings({ ...draftSettings, footer: { ...draftSettings.footer, companyDescription: v } })} multiline rows={3} />
        <Field label="Layanan di Footer (satu per baris)" value={draftSettings.footer.services.join('\n')} onChange={(v) => setDraftSettings({ ...draftSettings, footer: { ...draftSettings.footer, services: v.split('\n').map(s => s.trim()).filter(Boolean) } })} multiline rows={5} />
        <div className="border-t border-brand-gray-4 pt-4">
          <span className="text-xs font-black uppercase text-brand-gray-2 block mb-3">Media Sosial</span>
          {draftSettings.footer.socialLinks.map((link, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-3 mb-2 items-end">
              <Field label="Platform" value={link.platform} onChange={(v) => { const u = [...draftSettings.footer.socialLinks]; u[idx] = { ...u[idx], platform: v }; setDraftSettings({ ...draftSettings, footer: { ...draftSettings.footer, socialLinks: u } }); }} />
              <Field label="URL" value={link.url} onChange={(v) => { const u = [...draftSettings.footer.socialLinks]; u[idx] = { ...u[idx], url: v }; setDraftSettings({ ...draftSettings, footer: { ...draftSettings.footer, socialLinks: u } }); }} />
              <div className="flex gap-1 items-end pb-1">
                <button onClick={() => { const u = draftSettings.footer.socialLinks.filter((_, i) => i !== idx); setDraftSettings({ ...draftSettings, footer: { ...draftSettings.footer, socialLinks: u } }); }} className="p-2 bg-rose-50 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-brand-red" /></button>
              </div>
            </div>
          ))}
          <button onClick={() => { const u = [...draftSettings.footer.socialLinks, { platform: '', url: '', icon: 'Globe' }]; setDraftSettings({ ...draftSettings, footer: { ...draftSettings.footer, socialLinks: u } }); }} className="mt-2 bg-brand-gray-5 hover:bg-brand-gray-4 border border-brand-gray-4 py-2 px-4 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer">
            <Plus className="w-3 h-3" /> Tambah Sosial Media
          </button>
        </div>
      </section>

      <button onClick={() => onSaveSettings(draftSettings)} className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer">
        <Save className="w-4 h-4" /> Simpan Pengaturan Footer
      </button>

      {/* MODAL BRAND */}
      {showBrandModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={() => { setShowBrandModal(false); setEditingBrand(null); }} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
              <button onClick={() => { setShowBrandModal(false); setEditingBrand(null); }} className="absolute right-4 top-4 p-2 rounded-full hover:bg-brand-gray-5 cursor-pointer"><X className="w-5 h-5" /></button>
              <h3 className="font-display font-black text-xl mb-5">{editingBrand ? 'Edit Brand' : 'Tambah Brand Baru'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nama Brand *" value={brandForm.name} onChange={(v) => setBrandForm({ ...brandForm, name: v })} />
                  <Field label="Asal Negara" value={brandForm.origin} onChange={(v) => setBrandForm({ ...brandForm, origin: v })} />
                </div>
                <ImageUploadField label="Logo Brand" value={brandForm.logo || ''} onChange={(v) => setBrandForm({ ...brandForm, logo: v })} onUploadSuccess={() => showNotif('Logo brand berhasil diunggah!')} onUploadError={(m) => showNotif(m, 'error')} />
                <button onClick={saveBrand} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">Simpan Brand</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MITRA */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={() => { setShowPartnerModal(false); setEditingPartner(null); }} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
              <button onClick={() => { setShowPartnerModal(false); setEditingPartner(null); }} className="absolute right-4 top-4 p-2 rounded-full hover:bg-brand-gray-5 cursor-pointer"><X className="w-5 h-5" /></button>
              <h3 className="font-display font-black text-xl mb-5">{editingPartner ? 'Edit Mitra' : 'Tambah Mitra Baru'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nama Mitra *" value={partnerForm.name} onChange={(v) => setPartnerForm({ ...partnerForm, name: v })} />
                  <Field label="Kategori" value={partnerForm.category || ''} onChange={(v) => setPartnerForm({ ...partnerForm, category: v })} />
                </div>
                <ImageUploadField label="Logo Mitra" value={partnerForm.logo || ''} onChange={(v) => setPartnerForm({ ...partnerForm, logo: v })} onUploadSuccess={() => showNotif('Logo mitra berhasil diunggah!')} onUploadError={(m) => showNotif(m, 'error')} />
                <Field label="Deskripsi" value={partnerForm.description || ''} onChange={(v) => setPartnerForm({ ...partnerForm, description: v })} multiline rows={2} />
                <button onClick={savePartner} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">Simpan Mitra</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KontakTab({
  settings,
  onSave,
  showNotif,
}: {
  settings: SiteSettings;
  onSave: (s: SiteSettings) => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [draft, setDraft] = useState(settings);

  const updateContact = (patch: Partial<typeof draft.contact>) =>
    setDraft((d) => ({ ...d, contact: { ...d.contact, ...patch } }));
  const updateAbout = (patch: Partial<typeof draft.about>) =>
    setDraft((d) => ({ ...d, about: { ...d.about, ...patch } }));

  return (
    <div className="space-y-6 text-left">
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Informasi Kontak</h3>
        <Field label="Alamat Perusahaan" value={draft.contact.address} onChange={(v) => updateContact({ address: v })} multiline rows={2} />
        <Field label="Email" value={draft.contact.email} onChange={(v) => updateContact({ email: v })} />
        <Field label="Telepon" value={draft.contact.phone} onChange={(v) => updateContact({ phone: v })} />
        <Field label="WhatsApp" value={draft.contact.whatsapp} onChange={(v) => updateContact({ whatsapp: v })} />
      </section>

      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Tentang Perusahaan</h3>
        <Field label="Judul Tentang" value={draft.about.title} onChange={(v) => updateAbout({ title: v })} />
        <Field label="Deskripsi Tentang" value={draft.about.description} onChange={(v) => updateAbout({ description: v })} multiline rows={4} />
      </section>

      <button onClick={() => onSave(draft)} className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer">
        <Save className="w-4 h-4" /> Simpan Kontak & Tentang
      </button>
    </div>
  );
}