<template>
  <div class="bg-white text-gray-800 font-sans min-h-screen">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-8 py-4">
      <h1 class="text-2xl font-bold text-blue-600">Eraton</h1>
      <nav class="space-x-4">
        <a href="#product" class="text-gray-700 hover:text-blue-600">ผลิตภัณฑ์</a>
        <a href="#pricing" class="text-gray-700 hover:text-blue-600">ราคา</a>
        <a href="#story" class="text-gray-700 hover:text-blue-600">เรื่องราวของเรา</a>
        <router-link to="/login" class="text-blue-600 font-semibold">เข้าสู่ระบบ</router-link>
        <router-link to="/register">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">สมัครใช้งาน</button>
        </router-link>
      </nav>
    </header>

    <!-- Spacing for fixed navbar -->
    <div class="h-20"></div>

    <!-- Hero Section -->
    <section class="text-center py-20 bg-gray-50">
      <h2 class="text-4xl font-bold mb-4">ERP สำหรับธุรกิจ E-commerce</h2>
      <p class="text-lg text-gray-600 mb-6">ระบบจัดการร้านค้าออนไลน์อย่างครบวงจร เริ่มต้นง่าย เติบโตได้ไว</p>
      <router-link to="/register">
        <button class="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">เริ่มต้นฟรี</button>
      </router-link>
    </section>

    <!-- Product Section -->
    <section id="product" class="py-16 px-8 max-w-6xl mx-auto">
      <h3 class="text-3xl font-bold mb-8 text-center">ผลิตภัณฑ์ของเรา</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="border p-6 rounded shadow">
          <h4 class="text-xl font-semibold mb-2">จัดการออเดอร์</h4>
          <p class="text-gray-600">ติดตามออเดอร์แบบเรียลไทม์ รวมข้อมูลจากทุกช่องทางขายไว้ในที่เดียว</p>
        </div>
        <div class="border p-6 rounded shadow">
          <h4 class="text-xl font-semibold mb-2">ระบบสต็อก</h4>
          <p class="text-gray-600">ควบคุมสินค้าเข้า-ออก พร้อมรายงานสต็อกอัตโนมัติ ลดความผิดพลาดในการจัดส่ง</p>
        </div>
        <div class="border p-6 rounded shadow">
          <h4 class="text-xl font-semibold mb-2">บัญชีพื้นฐาน</h4>
          <p class="text-gray-600">บันทึกรายรับ-รายจ่าย สร้างรายงานการเงินเพื่อช่วยการตัดสินใจ</p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16 bg-gray-50 px-8 max-w-4xl mx-auto">
      <h3 class="text-3xl font-bold mb-8 text-center">แพ็กเกจราคา</h3>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="border p-6 rounded text-center shadow">
          <h4 class="text-xl font-semibold mb-2">เริ่มต้น</h4>
          <p class="text-3xl font-bold text-blue-600">ฟรี</p>
          <p class="text-gray-600 mb-4">เหมาะสำหรับร้านค้าที่เพิ่งเริ่มต้น</p>
          <ul class="text-left list-disc ml-6 text-gray-600">
            <li>ออเดอร์ไม่เกิน 50 รายการ/เดือน</li>
            <li>สต็อกสินค้าเบื้องต้น</li>
          </ul>
        </div>
        <div class="border p-6 rounded text-center shadow">
          <h4 class="text-xl font-semibold mb-2">โปร</h4>
          <p class="text-3xl font-bold text-blue-600">599 บาท/เดือน</p>
          <p class="text-gray-600 mb-4">สำหรับร้านที่เติบโตขึ้น</p>
          <ul class="text-left list-disc ml-6 text-gray-600">
            <li>ออเดอร์ไม่จำกัด</li>
            <li>ระบบบัญชีและรายงาน</li>
            <li>สนับสนุนลูกค้า 24/7</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section id="story" class="py-16 px-8 max-w-5xl mx-auto">
      <h3 class="text-3xl font-bold mb-8 text-center">เราเข้าใจผู้ประกอบการออนไลน์</h3>
      <div class="space-y-6 text-gray-700">
        <p><strong>จัดการออเดอร์ยุ่งยาก?</strong> Eraton ช่วยรวบรวมคำสั่งซื้อจากทุกแพลตฟอร์ม ไม่ว่าจะเป็น Facebook, Shopee หรือ Website ของคุณเอง</p>
        <p><strong>สต็อกหาย สินค้าขาด?</strong> ระบบของเราช่วยเตือนและคาดการณ์สต็อกแบบอัตโนมัติ ลดของเสีย เพิ่มกำไร</p>
        <p><strong>ไม่เก่งบัญชี?</strong> ไม่ต้องห่วง เราช่วยสร้างรายงานการเงินให้อัตโนมัติ ดูยอดขายและค่าใช้จ่ายได้ง่าย ๆ</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-8 text-gray-500 text-sm">
      &copy; 2025 Eraton. สงวนลิขสิทธิ์.
    </footer>
  </div>
</template>

<script setup>
// ไม่ต้องใช้ script ถ้าไม่มี logic
</script>
