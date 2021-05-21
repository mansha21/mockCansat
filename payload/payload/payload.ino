#include <Adafruit_BMP280.h>
Adafruit_BMP280 bmp; // I2C Interface
#include <Servo.h>
#include <EEPROM.h>
Servo servop; Servo servoh;

int par=11;int heat=9;
//servo pins...11 for parachute and 9 for heat sheild

float mp=A0; //input pin for mpxv7002dp

String temp,alti,pressure,ve,sp; 
//temp for temperature, alti for altitude and sp is for the science payload data string

float te,pr,rho,Pa,al,P;    
 /*
  * these variables are for storing the float values of the sensor data to use in calculations and the above strings to append them into the data packet
    the variable P will store the initial pressure value which will be given for by the carrier to mark as the refference point for altitude 
*/

// parameters for averaging and offset in mpxv7002dp
int offset = 0;
int offset_size = 10;
int veloc_mean_size = 20;
int zero_span = 2;

int t=0,i=1;
// the variable t will control different stages of flight and i is the data packet count

int stage_addr=0,packet_addr=2,calib_addr=4; 
// these are the eeprom addresses, stage is for t, packet is for i, calib is to store the initial pressure value
// to serve as the refference point for altitude

void setup() {
  Serial.begin(9600);
  /* Default settings from datasheet for bmp280. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
  for (int ii=0;ii<offset_size;ii++){
    offset += analogRead(A0)-(1023/2);
  }
  offset /= offset_size;
  servop.attach(par);servoh.attach(heat);  //creating servo objects
  
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

  EEPROM.write(stage_addr,0);  //writing initial values of payload stage and packet count to eeprom
  EEPROM.put(packet_addr,1);
}

/*
 * ISR(TIMER1_COMPA_vect)              I've commented these lines for now as the servo library also uses timer 1
{
  if(t==2 || t==3)                    I'm still trying to figure out how to use timer 2 for 1Hz interrupt
  {
      Serial.println(sp);
  }
}
*/

void alt()  //the bmp280 function
{
    te=bmp.readTemperature();temp=String(te);        // temperature reading in celcius
    pr=(bmp.readPressure()/100);pressure=String(pr); //pressure reading in pascal
    al=bmp.readAltitude(P);alti=String(al);          //altitude reading in mtr
}

void mpx()     //mpxv7002dp function for air speed
{
  float adc=0.0; float vel=0.0;               //we'll average out a few readings
   for (int ii=0;ii<veloc_mean_size;ii++){
    adc+= analogRead(mp)-offset;
  }
  adc/=veloc_mean_size;te+=273;
  rho=(pr*100)/(287.058*te);
  if (adc<512){
      vel= -sqrt((-10000.0*((adc/1023.0)-0.5))/rho); //velocity conversion
    } 
    else{
      vel=sqrt((10000.0*((adc/1023.0)-0.5))/rho);
    }
    ve=String(vel);
}

void loop() 
{
 sp=""; //the data packet string
 P=EEPROM.get(calib_addr,P);  //the sensor calibration data, packet count and software state will be stored in eeprom and read at the begining of the loop to 
 t=EEPROM.read(stage_addr);   // retrieve last state in case of system reset
 i=EEPROM.get(packet_addr,i);

 //0th state...take the calibration value and store it in P
 if(t==0)                  
 {
  while(Serial.available()==0);
  P=Serial.read();
  EEPROM.put(calib_addr,P);
  t++;
  EEPROM.update(stage_addr,t);
 }

 // 1st state for payload...when commanded, move on to next stage and start telemetry
 else if(t==1)           
 {
  while(Serial.available()==0);
  if (Serial.read()=="START")
  t++;
  EEPROM.update(stage_addr,t);
 }

 //2nd and 3rd stage, to transmit telemetry and release heat shield
 else if(t==2 || t==3)
 {
  alt();
  mpx(); 
  String i1=String(i);
  sp=i1+",SP,"+alti+","+temp+","+ve; //telemetry data string
  i++;
  EEPROM.update(packet_addr,i); //updating packet count
  if(t==2)  //if the height becomes <=500...heat sheild will be dropped and parachute released 
  {
    if(al<=500)
    {
      servoh.write(45); //open the servo locks for heat sheild and parachute
      servop.write(45);
      t++;
      EEPROM.update(stage_addr,t);
    }
  }
  if(al<=5) // if the altitude becomes less than 5m...stop all functions
  t++;
  EEPROM.update(stage_addr,t);
  
  delay(500);
 }

}
