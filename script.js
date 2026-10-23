/* =====================================================
   SCRIPT.JS
   File ini berisi 4 tugas:
   1. Membuka/menutup menu di HP
   2. Memberi bayangan pada navbar saat di-scroll
   3. Memunculkan elemen dengan animasi saat di-scroll
   4. Mengubah isi form menjadi pesan WhatsApp
   (+ mengisi tahun otomatis di footer)
   ===================================================== */


// ---------- DATA UTAMA ----------
// Nomor WhatsApp pakai format internasional: 62 menggantikan 0 di depan.
// 082123460024  ->  6282123460024
const NOMOR_WA = "6282123460024";


// ---------- 1. MENU DI HP ----------
// Ambil dua elemen dari HTML berdasarkan id-nya
const tombolMenu = document.getElementById("menuBtn");
const daftarMenu = document.getElementById("navLinks");

// Saat tombol ☰ diklik: kalau menu tertutup jadi terbuka, begitu sebaliknya
tombolMenu.addEventListener("click", function () {
  daftarMenu.classList.toggle("open");
});

// Saat salah satu menu diklik, tutup menunya supaya nggak menutupi layar
daftarMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    daftarMenu.classList.remove("open");
  });
});


// ---------- 2. BAYANGAN NAVBAR SAAT SCROLL ----------
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  // Kalau halaman sudah turun lebih dari 10px, pasang class "scrolled"
  // (CSS-nya yang bikin bayangan muncul). Kalau di paling atas, lepas lagi.
  const sudahTurun = window.scrollY > 10;
  navbar.classList.toggle("scrolled", sudahTurun);
});


// ---------- 3. ANIMASI MUNCUL SAAT SCROLL ----------
// IntersectionObserver = "penjaga" yang memantau apakah sebuah elemen
// sudah masuk ke layar atau belum.
const penjaga = new IntersectionObserver(function (daftarElemen) {
  daftarElemen.forEach(function (item, urutan) {

    if (item.isIntersecting) {
      // Elemen sudah kelihatan di layar -> tambahkan class "show".
      // Jeda 80 milidetik per urutan supaya kartu muncul satu-satu.
      setTimeout(function () {
        item.target.classList.add("show");
      }, urutan * 80);

      // Sekali muncul cukup, berhenti memantau elemen ini
      penjaga.unobserve(item.target);
    }

  });
}, { threshold: 0.15 });   // 0.15 = muncul saat 15% elemen sudah terlihat

// Suruh si penjaga memantau semua elemen yang punya class "reveal"
document.querySelectorAll(".reveal").forEach(function (elemen) {
  penjaga.observe(elemen);
});


// ---------- 4. FORM -> PESAN WHATSAPP ----------
const formPesan = document.getElementById("orderForm");

formPesan.addEventListener("submit", function (event) {

  // Cegah halaman reload (perilaku bawaan form)
  event.preventDefault();

  // Ambil isian dari form. trim() membuang spasi kosong di awal/akhir.
  const nama    = document.getElementById("nama").value.trim();
  const layanan = document.getElementById("pilihlayanan").value;
  const catatan = document.getElementById("catatan").value.trim();

  // Susun isi pesan. Tanda *bintang* bikin tulisan tebal di WhatsApp.
  let pesan = "Halo Kak, saya " + nama + ". Saya mau pesan layanan *" + layanan + "*.";

  // Catatan opsional: hanya ditambahkan kalau diisi
  if (catatan !== "") {
    pesan += "\n\nCatatan: " + catatan;
  }
  pesan += "\n\nTerima kasih!";

  // encodeURIComponent mengubah spasi dan karakter khusus agar aman dipakai di link
  const linkWA = "https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(pesan);

  // Buka WhatsApp di tab baru
  window.open(linkWA, "_blank");
});


// ---------- TAHUN OTOMATIS DI FOOTER ----------
// Supaya nggak perlu edit manual tiap tahun baru
document.getElementById("year").textContent = new Date().getFullYear();