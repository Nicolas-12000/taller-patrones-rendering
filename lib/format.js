const TIME_ZONE = 'America/Bogota'

export const formatDateTime = (value) =>
  new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: TIME_ZONE,
  }).format(value)

export const formatNumber = (value, digits = 1) =>
  new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
