from flask import Flask, render_template, url_for, request, redirect, jsonify
from pybacnet import bacnet
import json
import os
import time
path = "/home/lingam/pybacnet/tools"
os.chdir(path)
os.system("rm test.json")
os.system("python bacnet-scan.py")
time.sleep(60)
data = json.load(open("test.json"))
print (data)
result = data[0]
objects = result["objs"]
objects = objects[1:len(objects)-4]
print len(objects)
j = 1
AC_status = {}
Room_temp = {}
Setpoint_temp = {}
for i in range(0, 77):
	AC_status[i] = objects[j]
	Room_temp[i] = objects[j+7]
	Setpoint_temp[i] = objects[j+8]
	j = j + 28
for i in range(0, 77):
	print(AC_status[i])
	print(Setpoint_temp[i])
	print("\n")
