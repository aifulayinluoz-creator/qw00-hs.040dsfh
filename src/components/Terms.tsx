import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('terms.title')}</h1>
      
      <div className="space-y-6">
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">1. Aceptación de los términos</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Al acceder y utilizar SketchShare, aceptas cumplir con estos términos y condiciones de uso. 
            Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar la plataforma.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">2. Cuentas de usuario</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. 
            Toda actividad que ocurra bajo tu cuenta es tu responsabilidad. Debes notificarnos 
            inmediatamente cualquier uso no autorizado.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">3. Contenido del usuario</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Conservas todos los derechos sobre el contenido que publicas en SketchShare. Al publicar contenido, 
            nos otorgas una licencia no exclusiva para mostrar, distribuir y promover tu contenido dentro de la plataforma.
          </p>
          <ul className="text-gray-400 text-sm list-disc list-inside mt-3 space-y-1">
            <li>El contenido debe ser original o tener los derechos necesarios</li>
            <li>No se permite contenido ofensivo, discriminatorio o ilegal</li>
            <li>Nos reservamos el derecho de eliminar contenido que viole estas normas</li>
          </ul>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">4. Conducta de la comunidad</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Esperamos que todos los usuarios mantengan un ambiente respetuoso y positivo. 
            El acoso, spam, suplantación de identidad y cualquier forma de comportamiento abusivo 
            resultará en la suspensión o eliminación de la cuenta.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">5. Propiedad intelectual</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            La plataforma SketchShare, incluyendo su diseño, logotipos y código fuente, 
            está protegida por derechos de propiedad intelectual. No puedes copiar, modificar 
            o distribuir ningún elemento de la plataforma sin autorización.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">6. Limitación de responsabilidad</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            SketchShare se proporciona "tal cual" sin garantías de ningún tipo. No somos responsables 
            de daños indirectos, incidentales o consecuentes derivados del uso de la plataforma.
          </p>
        </section>

        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">7. Modificaciones</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Los cambios entrarán en vigor inmediatamente después de su publicación. 
            El uso continuado de la plataforma constituye la aceptación de los términos modificados.
          </p>
        </section>

        <p className="text-xs text-gray-600 mt-8">
          Última actualización: Enero 2026
        </p>
      </div>
    </div>
  );
}
