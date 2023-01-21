import{_ as a,c as e,o as n,a as s}from"./app.8c70127c.js";const g=JSON.parse('{"title":"Bagaimana caranya untuk build KernelSU?","description":"","frontmatter":{},"headers":[{"level":2,"title":"Build Kernel","slug":"build-kernel","link":"#build-kernel","children":[{"level":3,"title":"Menyinkronkan source code kernel","slug":"menyinkronkan-source-code-kernel","link":"#menyinkronkan-source-code-kernel","children":[]},{"level":3,"title":"Build","slug":"build","link":"#build","children":[]}]},{"level":2,"title":"Build Kernel dengan KernelSU","slug":"build-kernel-dengan-kernelsu","link":"#build-kernel-dengan-kernelsu","children":[]}],"relativePath":"id_ID/guide/how-to-build.md"}'),l={name:"id_ID/guide/how-to-build.md"},r=s(`<h1 id="bagaimana-caranya-untuk-build-kernelsu" tabindex="-1">Bagaimana caranya untuk build KernelSU? <a class="header-anchor" href="#bagaimana-caranya-untuk-build-kernelsu" aria-hidden="true">#</a></h1><p>Pertama, Anda harus membaca dokumen resmi Android untuk membangun kernel:</p><ol><li><a href="https://source.android.com/docs/setup/build/building-kernels" target="_blank" rel="noreferrer">Building Kernels</a></li><li><a href="https://source.android.com/docs/core/architecture/kernel/gki-release-builds" target="_blank" rel="noreferrer">GKI Release Builds</a></li></ol><blockquote><p>Halaman ini untuk perangkat GKI, jika Anda menggunakan kernel lama, silakan lihat <a href="./how-to-integrate-for-non-gki.html">cara mengintegrasikan KernelSU untuk kernel lama</a></p></blockquote><h2 id="build-kernel" tabindex="-1">Build Kernel <a class="header-anchor" href="#build-kernel" aria-hidden="true">#</a></h2><h3 id="menyinkronkan-source-code-kernel" tabindex="-1">Menyinkronkan source code kernel <a class="header-anchor" href="#menyinkronkan-source-code-kernel" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://android.googlesource.com/kernel/manifest</span></span>
<span class="line"><span style="color:#FFCB6B;">mv</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">kernel_manifest.xm</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.repo/manifests</span></span>
<span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">manifest.xml</span></span>
<span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sync</span></span>
<span class="line"></span></code></pre></div><p><code>&lt;kernel_manifest.xml&gt;</code> adalah berkas manifes yang dapat menentukan build secara unik, Anda dapat menggunakan manifes tersebut untuk melakukan build yang dapat diprediksikan ulang. Anda harus mengunduh berkas manifes dari <a href="https://source.android.com/docs/core/architecture/kernel/gki-release-builds" target="_blank" rel="noreferrer">Google GKI release builds</a></p><h3 id="build" tabindex="-1">Build <a class="header-anchor" href="#build" aria-hidden="true">#</a></h3><p>Silakan periksa <a href="https://source.android.com/docs/setup/build/building-kernels" target="_blank" rel="noreferrer">official docs</a> terlebih dahulu.</p><p>Sebagai contoh, kita perlu build image kernel aarch64:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">LTO</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">thin</span><span style="color:#A6ACCD;"> BUILD_CONFIG</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">common/build.config.gki.aarch64</span><span style="color:#A6ACCD;"> build/build.sh</span></span>
<span class="line"></span></code></pre></div><p>Jangan lupa untuk menambahkan flag <code>LTO=thin</code>, jika tidak, maka build akan gagal jika memori komputer Anda kurang dari 24GB.</p><p>Mulai dari Android 13, kernel dibuild oleh <code>bazel</code>:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">tools/bazel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--config=fast</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">//common:kernel_aarch64_dist</span></span>
<span class="line"></span></code></pre></div><h2 id="build-kernel-dengan-kernelsu" tabindex="-1">Build Kernel dengan KernelSU <a class="header-anchor" href="#build-kernel-dengan-kernelsu" aria-hidden="true">#</a></h2><p>Jika Anda dapat build kernel dengan sukses, maka build KernelSU sangatlah mudah, jalankan perintah ini di root dir kernel source:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-LSs</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://raw.githubusercontent.com/tiann/KernelSU/main/kernel/setup.sh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span></span>
<span class="line"></span></code></pre></div><p>Dan kemudian build ulang kernel dan Anda akan mendapatkan image kernel dengan KernelSU!</p>`,19),o=[r];function i(t,p,c,d,u,k){return n(),e("div",null,o)}const C=a(l,[["render",i]]);export{g as __pageData,C as default};