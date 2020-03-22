import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {getCode, getName } from 'country-list'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Worldwide',
      url: '/app/worldwide',
      icon: 'globe',
      total: 0,
      deathes: 0,
      recoveries: 0
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public loading = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  public temppages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    console.warn('\
    ***********************************************\n \
    THIS APP IS DEVELOPED AND DESIGNED BY : AHMADEV\n \
    EMAIL: me@ahmadev.com \n \
    ***********************************************\n \
    \
    ');
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    axios.get('https://coronavirus-19-api.herokuapp.com/countries').then(data => {
      console.log(data.data);
      let countries = data.data;
      for (let i = 0; i < countries.length; i++) {
        this.appPages.push({
          title: countries[i].country,
          url: '/app/' + countries[i].country,
          icon: 'globe',
          total: countries[i].cases,
          deathes: countries[i].deaths,
          recoveries: countries[i].recovered
        })

      }
      this.temppages = this.appPages;

    });
    axios.get('https://coronavirus-19-api.herokuapp.com/all').then(resp => {
      this.appPages[0].total = resp.data.cases
    })

  }


  search(q) {
    
    
    if (q.length != 0) {
      this.appPages = this.temppages.filter(x=> x.title.toLowerCase().includes(q.srcElement.value.toLowerCase()));
    } else {
      this.appPages = this.temppages
    }
  }


  flagImg(name) {
    return getCode(name); 
  }
}
