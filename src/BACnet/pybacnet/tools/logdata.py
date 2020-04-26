#!/usr/bin/env python2
import sys, urllib2, json, os, pprint, time
import datetime
from pymongo import MongoClient
client = MongoClient('127.0.0.1', 27017)
db = client.ac_data_2
collection = db.acwisejson
#os.system("rm test.json")
#os.system("python bacnet-scan.py")
#time.sleep(10)
data = json.load(open("test.json"))
#print(data)
result = data[0]
objects = result["objs"]
#print(len(objects))
objects = objects[1:len(objects)-4]
acwisejson = {}
j=0
# for i in range(0,77):
acwisejson['ac_000']=objects[j:j+28]
j = j+28
acwisejson['ac_001']=objects[j:j+28]
j = j+28
acwisejson['ac_002']=objects[j:j+28]
j = j+28
acwisejson['ac_003']=objects[j:j+28]
j = j+28
acwisejson['ac_004']=objects[j:j+28]
j = j+28
acwisejson['ac_005']=objects[j:j+28]
j = j+28
acwisejson['ac_006']=objects[j:j+28]
j = j+28
acwisejson['ac_007']=objects[j:j+28]
j = j+28
acwisejson['ac_008']=objects[j:j+28]
j = j+28
acwisejson['ac_009']=objects[j:j+28]
j = j+28
acwisejson['ac_010']=objects[j:j+28]
j = j+28
acwisejson['ac_011']=objects[j:j+28]
j = j+28
acwisejson['ac_012']=objects[j:j+28]
j = j+28
acwisejson['ac_013']=objects[j:j+28]
j = j+28
acwisejson['ac_014']=objects[j:j+28]
j = j+28
acwisejson['ac_015']=objects[j:j+28]
j = j+28
acwisejson['ac_016']=objects[j:j+28]
j = j+28
acwisejson['ac_017']=objects[j:j+28]
j = j+28
acwisejson['ac_018']=objects[j:j+28]
j = j+28
acwisejson['ac_019']=objects[j:j+28]
j = j+28
acwisejson['ac_020']=objects[j:j+28]
j = j+28
acwisejson['ac_021']=objects[j:j+28]
j = j+28
acwisejson['ac_022']=objects[j:j+28]
j = j+28
acwisejson['ac_023']=objects[j:j+28]
j = j+28
acwisejson['ac_024']=objects[j:j+28]
j = j+28
acwisejson['ac_025']=objects[j:j+28]
j = j+28
acwisejson['ac_026']=objects[j:j+28]
j = j+28
acwisejson['ac_027']=objects[j:j+28]
j = j+28
acwisejson['ac_028']=objects[j:j+28]
j = j+28
acwisejson['ac_029']=objects[j:j+28]
j = j+28
acwisejson['ac_030']=objects[j:j+28]
j = j+28
acwisejson['ac_031']=objects[j:j+28]
j = j+28
acwisejson['ac_032']=objects[j:j+28]
j = j+28
acwisejson['ac_033']=objects[j:j+28]
j = j+28
acwisejson['ac_034']=objects[j:j+28]
j = j+28
acwisejson['ac_035']=objects[j:j+28]
j = j+28
acwisejson['ac_036']=objects[j:j+28]
j = j+28
acwisejson['ac_037']=objects[j:j+28]
j = j+28
acwisejson['ac_038']=objects[j:j+28]
j = j+28
acwisejson['ac_039']=objects[j:j+28]
j = j+28
acwisejson['ac_040']=objects[j:j+28]
j = j+28
acwisejson['ac_041']=objects[j:j+28]
j = j+28
acwisejson['ac_042']=objects[j:j+28]
j = j+28
acwisejson['ac_043']=objects[j:j+28]
j = j+28
acwisejson['ac_044']=objects[j:j+28]
j = j+28
acwisejson['ac_045']=objects[j:j+28]
j = j+28
acwisejson['ac_046']=objects[j:j+28]
j = j+28
acwisejson['ac_047']=objects[j:j+28]
j = j+28
acwisejson['ac_048']=objects[j:j+28]
j = j+28
acwisejson['ac_049']=objects[j:j+28]
j = j+28
acwisejson['ac_050']=objects[j:j+28]
j = j+28
acwisejson['ac_051']=objects[j:j+28]
j = j+28
acwisejson['ac_052']=objects[j:j+28]
j = j+28
acwisejson['ac_053']=objects[j:j+28]
j = j+28
acwisejson['ac_054']=objects[j:j+28]
j = j+28
acwisejson['ac_055']=objects[j:j+28]
j = j+28
acwisejson['ac_056']=objects[j:j+28]
j = j+28
acwisejson['ac_057']=objects[j:j+28]
j = j+28
acwisejson['ac_058']=objects[j:j+28]
j = j+28
acwisejson['ac_059']=objects[j:j+28]
j = j+28
acwisejson['ac_060']=objects[j:j+28]
j = j+28
acwisejson['ac_061']=objects[j:j+28]
j = j+28
acwisejson['ac_062']=objects[j:j+28]
j = j+28
acwisejson['ac_063']=objects[j:j+28]
j = j+28
acwisejson['ac_064']=objects[j:j+28]
j = j+28
acwisejson['ac_065']=objects[j:j+28]
j = j+28
acwisejson['ac_066']=objects[j:j+28]
j = j+28
acwisejson['ac_067']=objects[j:j+28]
j = j+28
acwisejson['ac_068']=objects[j:j+28]
j = j+28
acwisejson['ac_069']=objects[j:j+28]
j = j+28
acwisejson['ac_070']=objects[j:j+28]
j = j+28
acwisejson['ac_071']=objects[j:j+28]
j = j+28
acwisejson['ac_072']=objects[j:j+28]
j = j+28
acwisejson['ac_073']=objects[j:j+28]
j = j+28
acwisejson['ac_074']=objects[j:j+28]
j = j+28
acwisejson['ac_075']=objects[j:j+28]
j = j+28
acwisejson['ac_076']=objects[j:j+28]

# for i in range(0,28):
    # print(acwisejson[76][i])
    # print

print acwisejson['ac_001']

AC_status = {}
AC_status_instances = {}
Setpoint_temp = {}
j = 9
ac_input_map = {}
for i in range(0, 77):
	AC_status[i] = objects[j]
        ac_input_map[i]=int(AC_status[i]['name'][-2]+AC_status[i]['name'][-1])
	AC_status_instances[i]=AC_status[i]['props']
	Setpoint_temp[i] = objects[j+8]
	j = j + 28
# for i in range(0,77):
    # print(i,AC_status[i])
# for i in AC_status_instances:
	# print(i,ac_input_map[i],AC_status_instances[i])
acno = ac_input_map[58]
# print(type(acno))
# print(AC_status[58]['name'][-1])
collection.insert(acwisejson)
