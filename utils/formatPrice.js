import i18n from "../i18n";

export const formatPrice = (value) =>{
    const lang = i18n.language;

    const locale = lang === 'fr' ? 'fr-CA' : 'en-CA';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'CAD'
    }).format(value);
}