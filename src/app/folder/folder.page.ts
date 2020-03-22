import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {getCode, getName } from 'country-list'
import { ModalController } from '@ionic/angular';
import { AboutPage } from '../about/about.page';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;


  info = {
    "country": "",
  "cases": 0,
  "todayCases": 0,
  "deaths": 0,
  "todayDeaths": 0,
  "recovered": 0,
  "active": 0,
  "critical": 0,
  "casesPerOneMillion": 0
  };

  constructor(private activatedRoute: ActivatedRoute,public modalController: ModalController) { }

  ngOnInit() {
    
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.folder == 'worldwide') {
      axios.get('https://coronavirus-19-api.herokuapp.com/all').then(res => {
        this.info = res.data;
      });
    } else {
      axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + this.folder).then(res => {
        this.info = res.data;
      });
    }
  }


  flagImg(name) {
    
    return getCode(name);
    
    
  }


  async about() {
    const modal = await this.modalController.create({
      component: AboutPage,
      swipeToClose: true
    });
    return await modal.present();
  }


}
