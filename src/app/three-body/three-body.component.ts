import {Component, OnInit} from '@angular/core';
import {SocketService} from '../service/socket.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-three-body',
  templateUrl: './three-body.component.html',
  styleUrls: ['./three-body.component.css']
})
export class ThreeBodyComponent implements OnInit {

  public gif: string;
  mRef = 1.989e+30;
  m1 = 1.1;
  m2 = 0.907;
  m3 = 1.0;

  tRef = 1285221297.6;
  tOrb = 20;

  pRef = 5.326e+12;
  xC1 = -0.5;
  yC1 = 0;
  zC1 = 0;

  xC2 = 0.5;
  yC2 = 0;
  zC2 = 0;

  xC3 = 0;
  yC3 = 1;
  zC3 = 0;

  vRef = 30000;

  xC1v = 0.01;
  yC1v = 0.01;
  zC1v = 0;

  xC2v = -0.05;
  yC2v = 0;
  zC2v = -0.1;

  xC3v = 0;
  yC3v = -0.01;
  zC3v = 0;

  fontSizeControl = new FormControl(this.mRef, Validators.min(0));
  fontSizeControl2 = new FormControl(this.m1, Validators.min(0));
  fontSizeControl3 = new FormControl(this.m2, Validators.min(0));
  fontSizeControl4 = new FormControl(this.m3, Validators.min(0));

  fontSizeControlTRef = new FormControl(this.tRef, Validators.min(0));
  fontSizeControlPer = new FormControl(this.tOrb, Validators.min(0));

  formNotExistDistance = new FormControl(this.pRef, Validators.min(0));

  formXPC1 = new FormControl(this.xC1, Validators.nullValidator);
  formYPC1 = new FormControl(this.yC1, Validators.nullValidator);
  formZPC1 = new FormControl(this.zC1, Validators.nullValidator);

  formXPC2 = new FormControl(this.xC2, Validators.nullValidator);
  formYPC2 = new FormControl(this.yC2, Validators.nullValidator);
  formZPC2 = new FormControl(this.zC2, Validators.nullValidator);

  formXPC3 = new FormControl(this.xC3, Validators.nullValidator);
  formYPC3 = new FormControl(this.yC3, Validators.nullValidator);
  formZPC3 = new FormControl(this.zC3, Validators.nullValidator);

  formNotExistVelocity = new FormControl(this.vRef, Validators.min(0));

  formXVC1 = new FormControl(this.xC1v, Validators.nullValidator);
  formYVC1 = new FormControl(this.yC1v, Validators.nullValidator);
  formZVC1 = new FormControl(this.zC1v, Validators.nullValidator);

  formXVC2 = new FormControl(this.xC2v, Validators.nullValidator);
  formYVC2 = new FormControl(this.yC2v, Validators.nullValidator);
  formZVC2 = new FormControl(this.zC2v, Validators.nullValidator);

  formXVC3 = new FormControl(this.xC3v, Validators.nullValidator);
  formYVC3 = new FormControl(this.yC3v, Validators.nullValidator);
  formZVC3 = new FormControl(this.zC3v, Validators.nullValidator);

  myForm: FormGroup;

  img: string;

  isWaiting = false;

  constructor(private socket: SocketService, private fb: FormBuilder) {
    this.socket.outEven.subscribe(res => {
      console.log(res);
      if (res.isGif) {
        this.gif = res.res;
      } else {
        this.img = res.res;
      }
      if (this.gif !== '') {
        this.isWaiting = false;
      }
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      mRef: this.fontSizeControl,
      m1: this.fontSizeControl2,
      m2: this.fontSizeControl3,
      m3: this.fontSizeControl4,

      tRef: this.fontSizeControlTRef,
      tOrb: this.fontSizeControlPer,

      pRef: this.formNotExistDistance,
      xC1: this.formXPC1,
      yC1: this.formYPC1,
      zC1: this.formZPC1,

      xC2: this.formXPC2,
      yC2: this.formYPC2,
      zC2: this.formZPC2,

      xC3: this.formXPC3,
      yC3: this.formYPC3,
      zC3: this.formZPC3,

      vRef: this.formNotExistVelocity,

      xC1v: this.formXVC1,
      yC1v: this.formYVC1,
      zC1v: this.formZVC1,

      xC2v: this.formXVC2,
      yC2v: this.formYVC2,
      zC2v: this.formZVC2,

      xC3v: this.formXVC3,
      yC3v: this.formYVC3,
      zC3v: this.formZVC3
    });
    this.sendPositions();
  }

  sendPositions(): void {
    if (this.gif !== '') {
      this.gif = '';
    }
    if (!this.isWaiting) {
      this.socket.sendMessage('img', {
        masses: [this.m1, this.m2, this.m3],
        positions: [this.xC1, this.yC1, this.zC1,
          this.xC2, this.yC2, this.zC2,
          this.xC3, this.yC3, this.zC3]
      });
    }
  }


  submit(): void {
    this.gif = '';
    this.isWaiting = true;
    this.socket.sendMessage('event', {
      masseRef: this.mRef,
      masses: [this.m1, this.m2, this.m3],
      tRef: this.tRef,
      t: this.tOrb,
      disRef: this.pRef,
      positions: [this.xC1, this.yC1, this.zC1,
        this.xC2, this.yC2, this.zC2,
        this.xC3, this.yC3, this.zC3],
      velRef: this.vRef,
      velocities: [this.xC1v, this.yC1v, this.zC1v,
        this.xC2v, this.yC2v, this.zC2v,
        this.xC3v, this.yC3v, this.zC3v],
      id: Date.now()
    });
  }
}
