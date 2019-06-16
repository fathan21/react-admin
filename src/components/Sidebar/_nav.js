export default {
  items: [

    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        //variant: 'info',
        //text: 'NEW'
      }
    },
    {
      name: 'Karyawan',
      url: '/karyawan',
      icon: 'icon-people',
      children: [
        {
          name: 'List',
          url: '/karyawan/List',
          icon: 'icon-people'
        },
        {
            name: 'Grafik',
            url: '/karyawan/chart',
            icon: 'icon-people'
        }
      ]
    },
    {
      name: 'Izin Kerja',
      url: '/izin_kerja',
      icon: 'icon-hourglass',
      children: [
        {
          name: 'List',
          url: '/izin_kerja/List',
          icon: 'icon-hourglass'
        },
        {
            name: 'Grafik',
            url: '/izin_kerja/chart',
            icon: 'icon-hourglass'
        }
      ]
    },
    {
      name: 'Alat Berat',
      url: '/alat_berat/List',
      icon: 'icon-handbag',
      children: [
        {
          name: 'List',
          url: '/alat_berat/List',
          icon: 'icon-handbag'
        },
        {
            name: 'Grafik',
            url: '/alat_berat/chart',
            icon: 'icon-handbag'
        }
      ]
    },
    {
      name: 'Kecelakaan Kerja',
      url: '/kecelakaan_kerja/List',
      icon: 'icon-folder',
      children: [
        {
          name: 'List',
          url: '/kecelakaan_kerja/List',
          icon: 'icon-folder'
        },
        {
            name: 'Grafik',
            url: '/kecelakaan_kerja/chart',
            icon: 'icon-folder'
        }
      ]
    },
    ,
    {
      name: 'Laporan',
      url: '/laporan/List',
      icon: 'icon-list',
      children: [
        {
          name: 'Karyawan',
          url: '/karyawan/report',
          icon: 'icon-list'
        },
       {
       name: 'Alat Berat',
       url: '/alat_berat/report',
       icon: 'icon-list'
       },
       {
       name: 'Izin Kerja',
       url: '/izin_kerja/report',
       icon: 'icon-list'
       },
       {
       name: 'Kecelakaan Kerja',
       url: '/kecelakaan_kerja/report',
       icon: 'icon-list'
       }
      ]
    },
    {
      name: 'Admin',
      url: '/admin/List',
      icon: 'icon-user',
    },

  ]
};
