import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Quality() {
  const { t } = useTranslation('landing')
  return (
    <section className='text-center py-12 px-35 text-[#000000] max-w-2xl mx-auto'>
      <h2 className='py-5 text-5xl font-Medium'>
        {t('quality.title.start')} <span className='text-primary'>{t('quality.title.highlight')}</span>{' '}
        {t('quality.title.end')}
      </h2>
      <p className='text-[#555] mt-3 text-xl'>{t('quality.description')}</p>
    </section>
  )
}
