"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tag, Sparkles, Clock, ArrowRight, Ticket } from "lucide-react";
import Button from "@/components/Button";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const PromoBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  // Target: 12 Desember 2026 pukul 23:59:59 WIB (UTC+7)
  const targetDate = new Date("2026-12-12T23:59:59+07:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-[#24170F] text-[#FAF6EE] border-b border-[#8C6F56]/60 shadow-md">
      {/* Background Ornament Pattern & Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#C59B4B_0.5px,transparent_0.5px)] opacity-10 [background-size:16px_16px]" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59B4B]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#8C6F56]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Text Block */}
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            {/* Small Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2F1F15] border border-[#C59B4B]/40 rounded-[2px] text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase text-[#DFC183]">
              <Tag className="w-3 h-3 text-[#C59B4B]" />
              <span>Warehouse Cleaner Event</span>
              <span className="text-[#C59B4B]">✦</span>
              <span>Hanya Sampai 12 Desember</span>
            </div>

            {/* Large Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF6EE] tracking-wide leading-tight">
              Flash Sale 12.12
            </h2>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#D8C7B5] leading-relaxed max-w-xl">
              Gudang kami sedang dibersihkan. Ratusan artefak vintage langka dilepas dengan harga spesial, hanya sampai 12 Desember. Setelah itu, koleksi ini tidak akan kembali lagi.
            </p>
          </div>

          {/* Right Block: Countdown Timer & CTA Buttons */}
          <div className="flex flex-col items-center lg:items-end gap-5 w-full lg:w-auto">
            
            {/* Countdown Box */}
            <div className="p-4 bg-[#1B110B] border border-[#8C6F56]/50 rounded-[2px] shadow-vintage">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#C59B4B] mb-2.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Batas Waktu Flash Sale:</span>
              </div>

              {!isClient ? (
                <div className="text-xs text-[#9E8B7A] font-sans text-center py-2">
                  Menghitung mundur...
                </div>
              ) : timeLeft.isExpired ? (
                <div className="px-4 py-2 bg-[#2E1810] border border-[#C56B4B]/40 text-[#E5A08D] text-xs font-serif text-center">
                  Event Telah Berakhir
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="bg-[#2A1D15] border border-[#C59B4B]/40 px-2.5 py-1.5 rounded-[2px] min-w-[54px]">
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFC183] leading-none">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-sans tracking-widest uppercase text-[#9E8B7A] mt-1 block">
                      Hari
                    </span>
                  </div>

                  <div className="bg-[#2A1D15] border border-[#C59B4B]/40 px-2.5 py-1.5 rounded-[2px] min-w-[54px]">
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFC183] leading-none">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-sans tracking-widest uppercase text-[#9E8B7A] mt-1 block">
                      Jam
                    </span>
                  </div>

                  <div className="bg-[#2A1D15] border border-[#C59B4B]/40 px-2.5 py-1.5 rounded-[2px] min-w-[54px]">
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFC183] leading-none">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-sans tracking-widest uppercase text-[#9E8B7A] mt-1 block">
                      Menit
                    </span>
                  </div>

                  <div className="bg-[#2A1D15] border border-[#C59B4B]/40 px-2.5 py-1.5 rounded-[2px] min-w-[54px]">
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFC183] leading-none">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-sans tracking-widest uppercase text-[#9E8B7A] mt-1 block">
                      Detik
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                variant="gold"
                size="md"
                href="/promo"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                <span>Lihat Semua Promo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="secondary"
                size="md"
                href="/promo#kupon"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-3.5 h-3.5 text-[#8C6F56]" />
                <span>Klaim Kupon</span>
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
