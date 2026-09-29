import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('privacy.title')}</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">1. Información que recopilamos</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            En SketchShare, recopilamos información que nos proporcionas directamente al crear una cuenta, 
            publicar contenido, interactuar con otros usuarios y utilizar nuestras funciones. Esto incluye:
          </p>
          <ul className="text-gray-400 text-sm list-disc list-inside mt-3 space-y-1">
            <li>Información de perfil (nombre, foto, biografía)</li>
            <li>Contenido que publicas (dibujos, descripciones, comentarios)</li>
            <li>Datos de uso y preferencias</li>
            <li>Información del dispositivo y navegador</li>
          </ul>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">2. Cómo usamos tu información</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Utilizamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios, 
            personalizar tu experiencia, conectar con otros artistas y garantizar la seguridad de la plataforma.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">3. Compartición de datos</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            No vendemos tu información personal a terceros. Compartimos datos únicamente cuando es necesario 
            para proporcionar el servicio, cumplir obligaciones legales o con tu consentimiento expreso.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">4. Seguridad</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información, 
            incluyendo cifrado HTTPS, almacenamiento seguro y acceso restringido a los datos.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">5. Tus derechos</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tienes derecho a acceder, rectificar, eliminar y portar tus datos personales. También puedes 
            oponerte al procesamiento de tus datos y solicitar la limitación del tratamiento.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">6. Cookies</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar 
            nuestros servicios. Puedes gestionar tus preferencias de cookies en cualquier momento.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">7. Contacto</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Para cualquier consulta sobre esta política de privacidad, puedes contactarnos en: 
            privacy@sketchshare.app
          </p>
        </section>

        <p className="text-xs text-gray-600 mt-8">
          Última actualización: Enero 2026
        </p>
      </div>
    </div>
  );
}
