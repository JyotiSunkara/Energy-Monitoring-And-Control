import minimalmodbus
import serial
import os
import time

delay=60

instrument = minimalmodbus.Instrument('/dev/ttyUSB0',1)
instrument.serial.baudrate= 9600
instrument.serial.bytesize = 8
instrument.serial.parity = 'N'
instrument.serial.stopbits = 1
instrument.serial.timeout = 0.5
#instrument.debug = True
'''
f = open('helloworld.txt','w')
f.write('hello world')
f.close()
1016 VoltAVGLN                  1139, 1140 PowerFactorAvg               1008 PowerSum
1018 VoltR     1163     CurrentA    1141, 1142 PowerFactorA                     1010 PowerA             1101, 1102      EnergyA
1020 VoltY     1165     CurrentB        1143, 1144 PowerFactorB                 1012 PowerB             1103, 1104      EnerygB
1022 VoltB     1167     CurrentC        1145, 1146 PowerFactorC                 1014 PowerC             1105, 1106      EnergyC
'''

addrname=["TimeStamp","VoltAvgLN","VoltR","VoltY","VoltB","CurrentR","CurrentY","CurrentB",\
                        "PFSum","PFR","PFY","PFB","PowerSum","PowerR","PowerY","PowerB",\
                        "EnergySum","EnergyPosSum","EnergyR","EnergyY","EnergyB"]
addr =[1016,1018,1020,1022,1162,1164,1166,\
                1138,1140,1142,1144,1008,1010,1012,1014,\
                1000,1002,1100,1102,1104]
res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
i = 0
while True:
        filename = '/home/pi/energy'+str(time.strftime('%m-%d-%Y'))+'.csv'
        f = open(filename,'a')
        for x in range(len(addrname)):
                f.write(str(addrname[x]))
                f.write(',')
        f.write('\n')
        f.close()
        next_rec_time = round(time.time() + delay)
        try:
                for x in range(len(addr)):
                        temp=instrument.read_registers(addr[x],numberOfRegisters=2)
                        #print temp
                        regStr = chr(temp[1]>>8) + chr(temp[1]&0x00FF) + chr(temp[0]>>8) + chr(temp[0]&0x00FF)
                        #print regStr
                        flt = minimalmodbus._bytestringToFloat(regStr)
                        res[x] = flt
                f = open(filename,'a')
                f.write(str(time.strftime('%m-%d-%Y %H:%M:%S'))+',')
                for x in range(len(addr)):
                        f.write(str(res[x]))
                        f.write(',')
                f.write('\n')
                f.close()
                i = i+1
                print (i)
        except:
                res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                f = open(filename,'a')
                f.write(str(time.strftime('%m-%d-%Y %H:%M:%S'))+',')
                for x in range(len(addr)):
                        f.write(str(res[x]))
                        f.write(',')
                f.write('\n')
                f.close()

        Nextrecord_time_delay = next_rec_time - time.time()
        roundedtimeDelay = Nextrecord_time_delay
        if roundedtimeDelay <= 0:
                        roundedtimeDelay = 2
        time.sleep(roundedtimeDelay)