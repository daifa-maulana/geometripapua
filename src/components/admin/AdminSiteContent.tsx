import React, { useState } from 'react';
import {
  SiteSettings,
  ServiceDetail,
  Branch,
  Project,
  HeroSlide,
} from '../../types';
import {
  saveBranches as persistBranches,
  savePortfolio as persistPortfolio,
  saveServices as persistServices,
  saveSiteSettings as persistSiteSettings,
} from '../../lib/supabaseContent';
import ImageUploadField from './ImageUploadField';
import {
  Plus, Edit, Trash2, Save, X, Home, Wrench, MapPin, FolderKanban, Phone,
} from 'lucide-react';

type ContentTab = 'beranda' | 'layanan' | 'cabang' | 'portofolio' | 'kontak';

interface AdminSiteContentProps {
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  services: ServiceDetail[];
  setServices: React.Dispatch<React.SetStateAction<ServiceDetail[]>>;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  portfolio: Project[];
  setPortfolio: React.Dispatch<React.SetStateAction<Project[]>>;
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

  const tabs: { id: ContentTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'layanan', label: 'Layanan', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'cabang', label: 'Cabang', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'portofolio', label: 'Portofolio', icon: <FolderKanban className="w-3.5 h-3.5" /> },
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const cls =
    'w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black';
  return (
    <div>
      <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
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
    setSlideForm({ id: 0, src: '', alt: '', caption: '' });
  };

  const deleteSlide = (id: number) => {
    if (draft.hero.slides.length <= 1) {
      showNotif('Minimal harus ada 1 slide!', 'error');
      return;
    }
    updateHero({ slides: draft.hero.slides.filter((s) => s.id !== id) });
    showNotif('Slide dihapus.');
  };

  return (
    <div className="space-y-8 text-left">
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">
          Hero Banner (Bagian Merah)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul Baris 1" value={draft.hero.headlineLine1} onChange={(v) => updateHero({ headlineLine1: v })} />
          <Field label="Judul Baris 2" value={draft.hero.headlineLine2} onChange={(v) => updateHero({ headlineLine2: v })} />
        </div>
        <Field label="Tagline" value={draft.hero.tagline} onChange={(v) => updateHero({ tagline: v })} />
        <Field label="Deskripsi" value={draft.hero.description} onChange={(v) => updateHero({ description: v })} multiline rows={2} />

        <div className="border-t border-brand-gray-4 pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase text-brand-gray-2">Slide Gambar Hero</span>
            <button
              onClick={() => openSlideForm()}
              className="bg-brand-red hover:bg-brand-red-hover text-white py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Tambah Slide
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {draft.hero.slides.map((slide) => (
              <div key={slide.id} className="border border-brand-gray-4 rounded-lg overflow-hidden group relative">
                <img src={slide.src} alt={slide.alt} className="w-full h-20 object-cover" />
                <div className="p-2">
                  <p className="text-[9px] font-bold text-brand-black truncate">{slide.caption}</p>
                </div>
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openSlideForm(slide)} className="bg-white p-1 rounded shadow cursor-pointer">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button onClick={() => deleteSlide(slide.id)} className="bg-rose-50 p-1 rounded shadow cursor-pointer">
                    <Trash2 className="w-3 h-3 text-brand-red" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">
          Konten Halaman Beranda
        </h3>
        <Field
          label="Ticker (pisahkan dengan koma)"
          value={draft.home.tickerItems.join(', ')}
          onChange={(v) => updateHome({ tickerItems: v.split(',').map((s) => s.trim()).filter(Boolean) })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul Layanan" value={draft.home.servicesTitle} onChange={(v) => updateHome({ servicesTitle: v })} />
          <Field label="Judul Keunggulan" value={draft.home.whyTitle} onChange={(v) => updateHome({ whyTitle: v })} />
        </div>
        <Field label="Subjudul Layanan" value={draft.home.servicesSubtitle} onChange={(v) => updateHome({ servicesSubtitle: v })} multiline />
        <Field label="Subjudul Keunggulan" value={draft.home.whySubtitle} onChange={(v) => updateHome({ whySubtitle: v })} multiline />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul Produk Unggulan" value={draft.home.productsTitle} onChange={(v) => updateHome({ productsTitle: v })} />
          <Field label="Judul Brand" value={draft.home.brandsTitle} onChange={(v) => updateHome({ brandsTitle: v })} />
        </div>
        <Field label="Subjudul Produk" value={draft.home.productsSubtitle} onChange={(v) => updateHome({ productsSubtitle: v })} multiline />
        <Field label="Judul Jaringan Cabang" value={draft.home.branchesTitle} onChange={(v) => updateHome({ branchesTitle: v })} />
        <Field label="Catatan Cabang" value={draft.home.branchesNote} onChange={(v) => updateHome({ branchesNote: v })} multiline />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul CTA Bawah" value={draft.home.ctaTitle} onChange={(v) => updateHome({ ctaTitle: v })} />
          <Field label="Subjudul CTA" value={draft.home.ctaSubtitle} onChange={(v) => updateHome({ ctaSubtitle: v })} />
        </div>
      </section>

      <button
        onClick={() => onSave(draft)}
        className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
      >
        <Save className="w-4 h-4" /> Simpan Pengaturan Beranda
      </button>

      {showSlideModal && (
        <SlideModal
          slideForm={slideForm}
          setSlideForm={setSlideForm}
          editing={!!editingSlide}
          onSave={saveSlide}
          onClose={closeSlideModal}
          showNotif={showNotif}
        />
      )}
    </div>
  );
}

function SlideModal({
  slideForm,
  setSlideForm,
  editing,
  onSave,
  onClose,
  showNotif,
}: {
  slideForm: HeroSlide;
  setSlideForm: React.Dispatch<React.SetStateAction<HeroSlide>>;
  editing: boolean;
  onSave: () => void;
  onClose: () => void;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white border border-brand-gray-3 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
          <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-brand-gray-5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-display font-black text-xl mb-4">{editing ? 'Edit Slide' : 'Tambah Slide Baru'}</h3>
          <div className="space-y-4">
            <ImageUploadField
              label="Gambar Slide"
              value={slideForm.src}
              onChange={(v) => setSlideForm((s) => ({ ...s, src: v }))}
              onUploadSuccess={() => showNotif('Gambar slide berhasil diunggah!')}
              onUploadError={(m) => showNotif(m, 'error')}
              maxWidth={1200}
            />
            <Field label="Alt Text" value={slideForm.alt} onChange={(v) => setSlideForm((s) => ({ ...s, alt: v }))} />
            <Field label="Caption" value={slideForm.caption} onChange={(v) => setSlideForm((s) => ({ ...s, caption: v }))} />
            <button onClick={onSave} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">
              Simpan Slide
            </button>
          </div>
        </div>
      </div>
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
  const [editing, setEditing] = useState<ServiceDetail | null>(null);
  const [form, setForm] = useState<ServiceDetail | null>(null);

  const openForm = (svc?: ServiceDetail) => {
    if (svc) {
      setEditing(svc);
      setForm({ ...svc, bullets: [...svc.bullets] });
    } else {
      setEditing(null);
      setForm({
        id: `svc-${Date.now()}`,
        num: String(services.length + 1).padStart(2, '0'),
        title: '',
        iconName: 'ShoppingBag',
        image: '',
        description: '',
        bullets: [],
      });
    }
  };

  const handleSave = () => {
    if (!form || !form.title.trim()) {
      showNotif('Judul layanan wajib diisi!', 'error');
      return;
    }
    const payload = { ...form, image: form.image?.trim() || undefined };
    const updated = editing
      ? services.map((s) => (s.id === editing.id ? payload : s))
      : [...services, payload];
    onSave(updated);
    setForm(null);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (services.length <= 1) {
      showNotif('Minimal 1 layanan harus ada!', 'error');
      return;
    }
    if (window.confirm('Hapus layanan ini?')) {
      onSave(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-brand-gray-2">Kelola layanan yang tampil di Beranda & halaman Layanan.</p>
        <button onClick={() => openForm()} className="bg-brand-red text-white py-2 px-4 rounded-lg text-xs font-bold uppercase flex items-center gap-1 cursor-pointer">
          <Plus className="w-4 h-4" /> Tambah Layanan
        </button>
      </div>
      <div className="bg-white border border-brand-gray-4 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-brand-gray-5 border-b border-brand-gray-4 text-[10px] font-black uppercase text-brand-gray-2">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Judul</th>
              <th className="py-3 px-4 w-28 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-4">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-brand-red-pale/10">
                <td className="py-3 px-4 font-bold">{s.num}</td>
                <td className="py-3 px-4">
                  <span className="font-black text-brand-black">{s.title}</span>
                  <p className="text-[10px] text-brand-gray-2 line-clamp-1">{s.description}</p>
                </td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button onClick={() => openForm(s)} className="p-2 bg-brand-gray-5 rounded-lg cursor-pointer hover:bg-brand-black hover:text-white">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 bg-rose-50 rounded-lg cursor-pointer hover:bg-brand-red hover:text-white">
                    <Trash2 className="w-3.5 h-3.5 text-brand-red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={() => { setForm(null); setEditing(null); }} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-display font-black text-xl mb-4">{editing ? 'Edit Layanan' : 'Tambah Layanan'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nomor" value={form.num} onChange={(v) => setForm({ ...form, num: v })} />
                  <Field label="Judul *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
                </div>
                <Field label="Deskripsi" value={form.description} onChange={(v) => setForm({ ...form, description: v })} multiline />
                <Field
                  label="Poin Layanan (satu per baris)"
                  value={form.bullets.join('\n')}
                  onChange={(v) => setForm({ ...form, bullets: v.split('\n').map((s) => s.trim()).filter(Boolean) })}
                  multiline
                  rows={5}
                />
                <ImageUploadField
                  label="Gambar Layanan"
                  value={form.image || ''}
                  onChange={(v) => setForm({ ...form, image: v })}
                  onUploadSuccess={() => showNotif('Gambar layanan berhasil diunggah!')}
                  onUploadError={(m) => showNotif(m, 'error')}
                />
                <button onClick={handleSave} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">
                  Simpan Layanan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
  const [editing, setEditing] = useState<Branch | null>(null);
  const [form, setForm] = useState<Branch | null>(null);

  const openForm = (br?: Branch) => {
    if (br) {
      setEditing(br);
      setForm({ ...br });
    } else {
      setEditing(null);
      setForm({ id: `b-${Date.now()}`, name: '', region: '', address: '', phone: '+62 822-6286-5676', image: '' });
    }
  };

  const handleSave = () => {
    if (!form || !form.name.trim()) {
      showNotif('Nama cabang wajib diisi!', 'error');
      return;
    }
    const payload = { ...form, image: form.image?.trim() || undefined };
    const updated = editing
      ? branches.map((b) => (b.id === editing.id ? payload : b))
      : [...branches, payload];
    onSave(updated);
    setForm(null);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (branches.length <= 1) {
      showNotif('Minimal 1 cabang harus ada!', 'error');
      return;
    }
    if (window.confirm('Hapus cabang ini?')) {
      onSave(branches.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-brand-gray-2">Kelola cabang yang tampil di Beranda & halaman Tentang.</p>
        <button onClick={() => openForm()} className="bg-brand-red text-white py-2 px-4 rounded-lg text-xs font-bold uppercase flex items-center gap-1 cursor-pointer">
          <Plus className="w-4 h-4" /> Tambah Cabang
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((b) => (
          <div key={b.id} className="bg-white border border-brand-gray-4 rounded-xl overflow-hidden hover:border-brand-red transition-colors">
            <div className="h-24 bg-brand-gray-5">
              {b.image ? <img src={b.image} alt={b.name} className="w-full h-full object-cover" /> : (
                <div className="w-full h-full flex items-center justify-center text-brand-gray-3"><MapPin className="w-6 h-6" /></div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-sm text-brand-black">{b.name} {b.isHQ && <span className="text-brand-red text-[9px]">HQ</span>}</h4>
                  <p className="text-[10px] text-brand-gray-2">{b.region}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openForm(b)} className="p-1.5 bg-brand-gray-5 rounded cursor-pointer"><Edit className="w-3 h-3" /></button>
                  <button onClick={() => handleDelete(b.id)} className="p-1.5 bg-rose-50 rounded cursor-pointer"><Trash2 className="w-3 h-3 text-brand-red" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={() => { setForm(null); setEditing(null); }} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
              <h3 className="font-display font-black text-xl mb-4">{editing ? 'Edit Cabang' : 'Tambah Cabang'}</h3>
              <div className="space-y-4">
                <Field label="Nama Kota *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Wilayah" value={form.region} onChange={(v) => setForm({ ...form, region: v })} />
                <Field label="Alamat" value={form.address} onChange={(v) => setForm({ ...form, address: v })} multiline />
                <Field label="Telepon" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input type="checkbox" checked={!!form.isHQ} onChange={(e) => setForm({ ...form, isHQ: e.target.checked })} />
                  Kantor Pusat (HQ)
                </label>
                <ImageUploadField
                  label="Foto Cabang"
                  value={form.image || ''}
                  onChange={(v) => setForm({ ...form, image: v })}
                  onUploadSuccess={() => showNotif('Gambar cabang berhasil diunggah!')}
                  onUploadError={(m) => showNotif(m, 'error')}
                />
                <button onClick={handleSave} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">
                  Simpan Cabang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Project | null>(null);

  const openForm = (proj?: Project) => {
    if (proj) {
      setEditing(proj);
      setForm({ ...proj });
    } else {
      setEditing(null);
      setForm({
        id: `proj-${Date.now()}`,
        title: '',
        category: '',
        location: '',
        client: '',
        year: String(new Date().getFullYear()),
        emoji: '📊',
        image: '',
        description: '',
      });
    }
  };

  const handleSave = () => {
    if (!form || !form.title.trim()) {
      showNotif('Judul proyek wajib diisi!', 'error');
      return;
    }
    const payload = { ...form, image: form.image?.trim() || undefined };
    const updated = editing
      ? portfolio.map((p) => (p.id === editing.id ? payload : p))
      : [...portfolio, payload];
    onSave(updated);
    setForm(null);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus proyek ini?')) {
      onSave(portfolio.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-brand-gray-2">Kelola portofolio proyek di halaman Portofolio.</p>
        <button onClick={() => openForm()} className="bg-brand-red text-white py-2 px-4 rounded-lg text-xs font-bold uppercase flex items-center gap-1 cursor-pointer">
          <Plus className="w-4 h-4" /> Tambah Proyek
        </button>
      </div>
      <div className="bg-white border border-brand-gray-4 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-brand-gray-5 border-b border-brand-gray-4 text-[10px] font-black uppercase text-brand-gray-2">
              <th className="py-3 px-4">Proyek</th>
              <th className="py-3 px-4">Klien</th>
              <th className="py-3 px-4 w-28 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-4">
            {portfolio.map((p) => (
              <tr key={p.id} className="hover:bg-brand-red-pale/10">
                <td className="py-3 px-4">
                  <span className="font-black text-brand-black">{p.emoji} {p.title}</span>
                  <p className="text-[10px] text-brand-gray-2">{p.category} · {p.location}</p>
                </td>
                <td className="py-3 px-4 text-brand-gray-2">{p.client}</td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button onClick={() => openForm(p)} className="p-2 bg-brand-gray-5 rounded-lg cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 bg-rose-50 rounded-lg cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-brand-red" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm" onClick={() => { setForm(null); setEditing(null); }} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-display font-black text-xl mb-4">{editing ? 'Edit Proyek' : 'Tambah Proyek'}</h3>
              <div className="space-y-4">
                <Field label="Judul *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Kategori" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
                  <Field label="Emoji" value={form.emoji} onChange={(v) => setForm({ ...form, emoji: v })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Lokasi" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
                  <Field label="Klien" value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
                </div>
                <Field label="Tahun" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
                <Field label="Deskripsi" value={form.description} onChange={(v) => setForm({ ...form, description: v })} multiline rows={4} />
                <ImageUploadField
                  label="Foto Proyek"
                  value={form.image || ''}
                  onChange={(v) => setForm({ ...form, image: v })}
                  onUploadSuccess={() => showNotif('Gambar proyek berhasil diunggah!')}
                  onUploadError={(m) => showNotif(m, 'error')}
                />
                <button onClick={handleSave} className="w-full bg-brand-red text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer">
                  Simpan Proyek
                </button>
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
  const updateServicesPage = (patch: Partial<typeof draft.servicesPage>) =>
    setDraft((d) => ({ ...d, servicesPage: { ...d.servicesPage, ...patch } }));
  const updatePortfolioPage = (patch: Partial<typeof draft.portfolioPage>) =>
    setDraft((d) => ({ ...d, portfolioPage: { ...d.portfolioPage, ...patch } }));

  return (
    <div className="space-y-8 text-left">
      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Halaman Kontak</h3>
        <Field label="Judul Halaman" value={draft.contact.pageTitle} onChange={(v) => updateContact({ pageTitle: v })} />
        <Field label="Subjudul" value={draft.contact.pageSubtitle} onChange={(v) => updateContact({ pageSubtitle: v })} multiline />
        <Field label="Alamat" value={draft.contact.address} onChange={(v) => updateContact({ address: v })} multiline />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Telepon" value={draft.contact.phone} onChange={(v) => updateContact({ phone: v })} />
          <Field label="WhatsApp (tanpa +)" value={draft.contact.whatsapp} onChange={(v) => updateContact({ whatsapp: v })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" value={draft.contact.email} onChange={(v) => updateContact({ email: v })} />
          <Field label="Website" value={draft.contact.website} onChange={(v) => updateContact({ website: v })} />
        </div>
        <Field label="URL Embed Google Maps" value={draft.contact.mapEmbedUrl} onChange={(v) => updateContact({ mapEmbedUrl: v })} multiline />
      </section>

      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Halaman Tentang</h3>
        <Field label="Judul Halaman" value={draft.about.pageTitle} onChange={(v) => updateAbout({ pageTitle: v })} />
        <Field label="Subjudul" value={draft.about.pageSubtitle} onChange={(v) => updateAbout({ pageSubtitle: v })} multiline />
        <Field label="Deskripsi Perusahaan" value={draft.about.companyDescription} onChange={(v) => updateAbout({ companyDescription: v })} multiline rows={4} />
        <Field label="Visi" value={draft.about.vision} onChange={(v) => updateAbout({ vision: v })} multiline />
        <Field label="Misi" value={draft.about.mission} onChange={(v) => updateAbout({ mission: v })} multiline />
      </section>

      <section className="bg-white border border-brand-gray-4 rounded-xl p-6 space-y-4">
        <h3 className="font-display font-black text-lg text-brand-black border-b border-brand-gray-4 pb-3">Judul Halaman Lainnya</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul Halaman Layanan" value={draft.servicesPage.pageTitle} onChange={(v) => updateServicesPage({ pageTitle: v })} />
          <Field label="Judul Halaman Portofolio" value={draft.portfolioPage.pageTitle} onChange={(v) => updatePortfolioPage({ pageTitle: v })} />
        </div>
        <Field label="Subjudul Layanan" value={draft.servicesPage.pageSubtitle} onChange={(v) => updateServicesPage({ pageSubtitle: v })} multiline />
        <Field label="Subjudul Portofolio" value={draft.portfolioPage.pageSubtitle} onChange={(v) => updatePortfolioPage({ pageSubtitle: v })} multiline />
      </section>

      <button
        onClick={() => onSave(draft)}
        className="bg-brand-red hover:bg-brand-red-hover text-white py-3 px-8 rounded-lg text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
      >
        <Save className="w-4 h-4" /> Simpan Kontak & Tentang
      </button>
    </div>
  );
}
