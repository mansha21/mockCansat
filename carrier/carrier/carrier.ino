#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <Adafruit_BMP280.h>
#include <Servo.h>
Adafruit_BMP280 bmp; // I2C Interface
#include "MPU9250.h"
MPU9250 mpu;
#include <EEPROM.h>

int RXPin = 4;
int TXPin = 5;
int buzzer=7;
float la,lo,te,pr,P,pitch,roll,yaw,al,la_fix,lo_fix,a,c,d,del_la,del_lo,t_t;
String ho,mi,se,ce,temp,pres,alti;
String ti,l1,l2,p_p,r_p,y_p,CP;
float magx,magy,magz,xhor,yhor,m_p,m_r,heading,ip;
float pi=3.14159,esc=3.924; //constants...pi and the voltage to be provided to the esc during powered flight
int t=0,s=0,s1=0,pc=1,e=1,R=6371008.8,Ta=0; //the variable t will control different stages of flight
int stage_addr=0,packet_addr=1,calib_addr=3,la_addr=7,lo_addr=11,s1_addr=15,e_addr=16;// these are all addresses for storing data in eeprom

TinyGPSPlus gps;
SoftwareSerial gpsSerial(RXPin, TXPin); //as the hardware serial pins are connected to xbee, I'll be using software serial for gps
Servo ESC; Servo wings; Servo tail; Servo payload; // Servo objects...for 3 servo motors and the esc

void setup()
{
  Serial.begin(9600);
  gpsSerial.begin(9600);
  Wire.begin();
  ESC.attach(3,1000,2000);tail.attach(9);wings.attach(10);payload.attach(11);
  pinMode(buzzer,OUTPUT);
  /* Default settings from datasheet. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
  EEPROM.write(stage_addr,0);
  EEPROM.put(packet_addr,1);
  EEPROM.write(s1_addr,0);
  EEPROM.write(e_addr,e);
  //set timer1 interrupt at 1Hz
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 1hz increments
  OCR1A = 15624;// = (16*10^6) / (1*1024) - 1 (must be <65536)
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  // Set CS10 and CS12 bits for 1024 prescaler
  TCCR1B |= (1 << CS12) | (1 << CS10);  
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);
}

/*ISR(TIMER1_COMPA_vect)
{
  if(t==3 || t==3 || t==5)
  {
     Serial.println(CP+","+SP);
  }
}*/

void gpsInfo()
{
  l1="";
  l2="";
  ti="";
  if (gps.location.isValid())
  {
    la= gps.location.lat();
    lo=gps.location.lng();
    l1=String(la);
    l2=String(lo);
  }
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10)  ho="0"+String(gps.time.hour());
    else  ho=String(gps.time.hour());
    if (gps.time.minute() < 10) mi="0"+String(gps.time.minute());
   else mi=String(gps.time.minute());
    if (gps.time.second() < 10) se="0"+String(gps.time.second());
    else se=String(gps.time.second());
    ti=ho+":"+mi+":"+se;
  }
}
void imu()
{
    te=(bmp.readTemperature()+273);temp=String(te);
    pr=(bmp.readPressure()/100);pres=String(pr);
    al=bmp.readAltitude(P);alti=String (al);
    yaw=mpu.getYaw();y_p=String(yaw);
    pitch=mpu.getPitch();p_p=String(pitch);
    roll=mpu.getRoll();r_p=String(roll);
    magx=mpu.getMagX();
    magy=mpu.getMagY();
    magz=mpu.getMagZ();
    m_p=-roll*pi/180;
    m_r=pitch*pi/180;
    xhor=magx*cos(m_p)+magy*sin(m_r)*sin(m_p)-magz*cos(m_r)*sin(m_p);
    yhor=magy*cos(m_r)+magz*sin(m_r);
    heading=atan2(yhor,xhor)*180/pi;
}
void loop()
{
  String pc1=String(pc);
  CP="";String SP="";
   P=EEPROM.get(calib_addr,P);
   t=EEPROM.read(stage_addr);
   pc=EEPROM.get(packet_addr,pc);
   la_fix=EEPROM.get(la_addr,la_fix);
   lo_fix=EEPROM.get(lo_addr,lo_fix);
  if(t==0)
  {
    while(Serial.available()==0);
    if(Serial.read()=="CALIBRATE")
    {
      for(int i=1;i<=10;i++)
      {
        ip+=(bmp.readPressure()/100);
      }
      P=ip/10;
      Serial.print(P);
      EEPROM.put(calib_addr,P);
      t++;
      EEPROM.update(stage_addr,t);
    }
  }
  else if(t==1)
  {
    imu();
    if(al<=2000);
    else
    {
      t++;
      EEPROM.update(stage_addr,t);
    }
  }
  else if(t==2)
  {
    delay(1000);
    wings.write(80);
    imu();
    t_t=1.5*sqrt(heading-90);
    delay(2000);
    tail.write(10);
    s=round(t_t);
    t++;
    EEPROM.update(stage_addr,t);
  }
  else if(t==3)
  {
    imu();
    gpsInfo();
    if(s1<s);
    else
    {
      tail.write(5);
    }
    CP=ti+","+pc1+",C,"+alti+","+l1+","+l2+","+p_p+","+r_p+","+y_p;
    Serial.println(CP);
    pc++;
    EEPROM.update(packet_addr,pc);
    delay(1000);
    if(al<=1510)
    t++;
    EEPROM.update(stage_addr,t);
    s1++;
    EEPROM.update(s1_addr,s1);
  }
  else if(t==4)
  {
    imu();
    gpsInfo();
    if(e==1)
    {
      esc=map(esc,0,5,0,180);
      ESC.write(esc);
      la_fix=la;lo_fix=lo;
      EEPROM.write(la_addr,la_fix);EEPROM.write(lo_addr,lo_fix);
      e++;
      EEPROM.update(e_addr,e);
      tail.write(0);
      if(Ta<s);
      else
      tail.write(5);
    }
    CP=ti+","+pc1+",C,"+alti+","+l1+","+l2+","+p_p+","+r_p+","+y_p;
    del_la=la-la_fix;del_lo=lo-lo_fix;
    del_la*=pi/180;del_lo*=pi/180;
    a=(sin(del_la/2))*(sin(del_la/2))+(cos(la_fix))*(cos(la))*(sin(del_lo))*(sin(del_lo));
    c=2*atan2(sqrt(a),sqrt(1-a));
    d=R*c;
    if(d>=295)
    {
      ESC.write(0);
      payload.write(45);
      Serial.println("START");
      t++;
      EEPROM.update(stage_addr,t);
    }
    delay(1000);
    pc++;
    EEPROM.update(packet_addr,pc);
    Ta++;
  }
  else if(t==5)
  {
    imu();
    gpsInfo();
    CP=ti+","+pc1+",C,"+alti+","+l1+","+l2+","+p_p+","+r_p+","+y_p;
    SP=Serial.read();
    delay(1000);
    if(al<5)
    {
      t++;
     EEPROM.update(stage_addr,t);
    } 
  }
  else if(t==6)
  {
     tone(buzzer, 1000); 
     delay(1000);       
     noTone(buzzer);     
     delay(1000);       
  }
}
