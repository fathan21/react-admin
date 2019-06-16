import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';


// app
import Admin from '../../views/App/Admin/';
import AdminForm from '../../views/App/AdminForm/';
import Karyawan from '../../views/App/Karyawan/';
import KaryawanForm from '../../views/App/KaryawanForm/';
import IzinKerja from '../../views/App/IzinKerja/';
import IzinKerjaForm from '../../views/App/IzinKerjaForm/';
import AlatBerat from '../../views/App/AlatBerat/';
import AlatBeratForm from '../../views/App/AlatBeratForm/';
import KecelakaanKerja from '../../views/App/KecelakaanKerja/';
import KecelakaanKerjaForm from '../../views/App/KecelakaanKerjaForm/';
import KaryawanChart from '../../views/App/KaryawanChart/';
import IzinKerjaChart from '../../views/App/IzinKerjaChart/';
import AlatBeratChart from '../../views/App/AlatBeratChart/';
import KecelakaanKerjaChart from '../../views/App/KecelakaanKerjaChart/';
import KaryawanReport from '../../views/App/KaryawanReport/';
import IzinKerjaReport from '../../views/App/IzinKerjaReport/';
import AlatBeratReport from '../../views/App/AlatBeratReport/';
import KecelakaanKerjaReport from '../../views/App/KecelakaanKerjaReport/';

class Full extends Component {
  render() {
    const token = localStorage.getItem('token_nanang');
    if (token=='' || token==null || token==undefined) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>

                <Route path="/admin/list" name="Admin" component={Admin}/>
                <Route path="/admin/form" name="AdminForm" component={AdminForm}/>
                <Route path="/karyawan/report" name="KaryawanReport" component={KaryawanReport}/>

                <Route path="/karyawan/list" name="Karyawan" component={Karyawan}/>
                <Route path="/karyawan/form" name="KaryawanForm" component={KaryawanForm}/>
                <Route path="/karyawan/chart" name="KaryawanChart" component={KaryawanChart}/>

                <Route path="/izin_kerja/list" name="IzinKerja" component={IzinKerja}/>
                <Route path="/izin_kerja/form" name="IzinKerjaForm" component={IzinKerjaForm}/>
                <Route path="/izin_kerja/chart" name="IzinKerjaChart" component={IzinKerjaChart}/>
                <Route path="/izin_kerja/report" name="IzinKerjaReport" component={IzinKerjaReport}/>

                <Route path="/alat_berat/list" name="AlatBerat" component={AlatBerat}/>
                <Route path="/alat_berat/form" name="AlatBeratForm" component={AlatBeratForm}/>
                <Route path="/alat_berat/chart" name="AlatBeratChart" component={AlatBeratChart}/>
                <Route path="/alat_berat/report" name="AlatBeratReport" component={AlatBeratReport}/>

                <Route path="/kecelakaan_kerja/list" name="KecelakaanKerja" component={KecelakaanKerja}/>
                <Route path="/kecelakaan_kerja/form" name="KecelakaanKerjaForm" component={KecelakaanKerjaForm}/>
                <Route path="/kecelakaan_kerja/chart" name="KecelakaanKerjaChart" component={KecelakaanKerjaChart}/>
                <Route path="/kecelakaan_kerja/report" name="KecelakaanKerjaReport" component={KecelakaanKerjaReport}/>

                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Full;
