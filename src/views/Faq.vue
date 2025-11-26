<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 md:py-12 px-4">
    <div class="max-w-6xl mx-auto space-y-8 md:space-y-10">
      <div class="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
        <div class="space-y-5">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-blue-700 bg-white border border-blue-100 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            FAQ • Why is it safe?
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Kenapa aman nyimpen password di Gembols?
          </h1>
          <p class="text-gray-700 text-base md:text-lg leading-relaxed">
            Kami pakai enkripsi AES 256-bit sebelum data dikirim. Artinya, yang terkirim ke server cuma teks acak yang bahkan kami sendiri tidak bisa baca tanpa kunci yang kamu pegang.
          </p>

          <div class="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-lg space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-500 text-white font-bold text-lg grid place-items-center shadow-md shrink-0">
                AES
              </div>
              <div class="space-y-2">
                <h3 class="text-lg font-semibold text-gray-900">Enkripsi AES 256-bit</h3>
                <p class="text-gray-700 leading-relaxed">
                  Setiap password dikunci dengan standar industri (dipakai bank & pemerintah). Kunci enkripsi dibuat unik per akun, disimpan aman di sisi kamu, bukan di server.
                </p>
              </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-3">
              <div class="feature-card">
                <h4>Zero-knowledge</h4>
                <p>Kami tidak pernah melihat isi password karena yang tersimpan hanya hasil enkripsi.</p>
              </div>
              <div class="feature-card">
                <h4>Proteksi multi-lapis</h4>
                <p>Transport dienkripsi (HTTPS), storage dienkripsi (AES), akses pakai token.</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <router-link
              to="/register"
              class="px-5 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition w-full sm:w-auto text-center"
            >
              Mulai daftar gratis
            </router-link>
            <router-link
              to="/login"
              class="px-5 py-3 rounded-xl border border-blue-200 text-blue-700 font-semibold bg-white hover:border-blue-400 transition shadow-sm w-full sm:w-auto text-center"
            >
              Sudah punya akun? Masuk
            </router-link>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Analogi singkat</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex gap-3">
                <span class="text-blue-500 font-bold">01</span>
                <p><strong>Brankas + gembok bank.</strong> AES 256-bit = gembok baja kelas bank. Server hanya menyimpan brankasnya, kunci gemboknya tetap di tanganmu.</p>
              </li>
              <li class="flex gap-3">
                <span class="text-blue-500 font-bold">02</span>
                <p><strong>Puzzle tanpa gambar.</strong> Data yang tersimpan cuma potongan puzzle acak. Tanpa kunci, tidak ada yang tahu gambarnya.</p>
              </li>
              <li class="flex gap-3">
                <span class="text-blue-500 font-bold">03</span>
                <p><strong>Kunci ganda.</strong> Akses akun perlu token login + kunci enkripsi. Jadi walau seseorang melihat server, yang terlihat hanya deretan karakter tidak bermakna.</p>
              </li>
            </ul>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-4 shadow">
              <p class="text-sm text-blue-700 font-semibold mb-1">Apa yang kami simpan</p>
              <p class="text-gray-800">Hasil enkripsi (ciphertext) + metadata dasar yang tidak sensitif.</p>
            </div>
            <div class="bg-white border border-gray-100 rounded-2xl p-4 shadow">
              <p class="text-sm text-blue-700 font-semibold mb-1">Apa yang tidak kami simpan</p>
              <p class="text-gray-800">Password mentah, kunci dekripsi, atau akses ke akun tanpa token kamu.</p>
            </div>
          </div>

          <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <p class="text-sm text-gray-600">Siap coba?</p>
              <p class="text-gray-900 font-semibold">Buat akun sekarang dan simpan 10 password pertamamu gratis.</p>
            </div>
            <router-link
              to="/register"
              class="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition whitespace-nowrap w-full sm:w-auto text-center"
            >
              Daftar sekarang
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../style.css";
.feature-card {
  @apply bg-white border border-gray-100 rounded-xl p-4 shadow;
}
</style>
