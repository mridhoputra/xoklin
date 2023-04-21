const formatRupiah = (value) => {
  if (value) {
    const numberString = value.toString().replace(/[^,\d]/g, '').toString()
    const split = numberString.split(',')
    const remainder = split[0].length % 3
    let rupiah = split[0].substr(0, remainder)
    const thousand = split[0].substr(remainder).match(/\d{3}/gi)

    if (thousand) {
      const separator = remainder ? '.' : ''
      rupiah += separator + thousand.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
    return rupiah ? 'Rp' + rupiah : 0
  } else {
    return 'Rp. 0'
  }
}

export default formatRupiah
