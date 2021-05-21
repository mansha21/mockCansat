#include <Adafruit_BMP280.h>
Adafruit_BMP280 bmp; // I2C Interface
#include <Servo.h>
#include <EEPROM.h>
Servo servop; Servo servoh;

int par=11;int heat=9;
float mp=A0;
String temp,alti,pres,ve,sp;
float te,pr,rho,Pa,al,P;
// parameters for averaging and offset
int offset = 0;
int offset_size = 10;
int veloc_mean_size = 20;
int zero_span = 2;
int t=0,i=1;
int stage_addr=0,packet_addr=2,calib_addr=4;



void setup() {
  Serial.begin(9600);
  /* Default settings from datasheet. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
  for (int ii=0;ii<offset_size;ii++){
    offset += analogRead(A0)-(1023/2);
  }
  offset /= offset_size;
  servop.attach(par);servoh.attach(heat);
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

  EEPROM.write(stage_addr,0);
  EEPROM.put(packet_addr,1);
}
/*ISR(TIMER1_COMPA_vect)
{
  if(t==2 || t==3)
  {
      Serial.println(sp);
  }
}*/
void alt()
{
    te=bmp.readTemperature();temp=String(te);
    pr=(bmp.readPressure()/100);pres=String(pr);
    al=bmp.readAltitude(P);alti=String(al);
}

void mpx()
{
  float adc=0.0; float vel=0.0;
   for (int ii=0;ii<veloc_mean_size;ii++){
    adc+= analogRead(mp)-offset;
  }
  adc/=veloc_mean_size;te+=273;
  rho=(pr*100)/(287.058*te);
  if (adc<512){
      vel= -sqrt((-10000.0*((adc/1023.0)-0.5))/rho);
    } 
    else{
      vel=sqrt((10000.0*((adc/1023.0)-0.5))/rho);
    }
    ve=String(vel);
}

void loop() 
{
 sp="";
 P=EEPROM.get(calib_addr,P);
 t=EEPROM.read(stage_addr);
 i=EEPROM.get(packet_addr,i);
 if(t==0)
 {
  while(Serial.available()==0);
  P=Serial.read();
  EEPROM.put(calib_addr,P);
  t++;
  EEPROM.update(stage_addr,t);
 }
 else if(t==1)
 {
  while(Serial.available()==0);
  if (Serial.read()=="START")
  t++;
  EEPROM.update(stage_addr,t);
 }
 else if(t==2 || t==3)
 {
  alt();
  mpx(); 
  String i1=String(i);
  sp=i1+",SP,"+alti+","+temp+","+ve;
  i++;
  EEPROM.update(packet_addr,i);
  if(t==2)
  {
    if(al<=500)
    {
      servoh.write(45);
      servop.write(45);
      t++;
      EEPROM.update(stage_addr,t);
    }
  }
  if(al<=5)
  t++;
  EEPROM.update(stage_addr,t);
  
  delay(500);
 }

}
